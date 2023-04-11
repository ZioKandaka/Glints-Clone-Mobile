const { Company, User, Job, Skill, sequelize } = require("../models/index");
const bcrypt = require("bcrypt");
const { createToken } = require("../middlewares/jwt");
const { Op } = require("sequelize");
const timeSetter = require("../helpers/timeConvert");
const dotSeparator = require("../helpers/dotSeparator");

class Controller {
  static async getJobs(req, res, next) {
    try {
      let filter = req.query.filter;
      // console.log(filter, "INI FILTER");
      let input = {
        include: [Company, Skill],
        where: {},
      };
      if (filter) {
        input.where = {
          title: { [Op.iLike]: `%${filter}%` },
        };
      }
      // console.log(input, "INI INPUT");

      let jobs = await Job.findAll(input);
      jobs.forEach((el) => {
        el.postDate = timeSetter(el.postDate);
        el.dataValues.updatedDate = timeSetter(el.updatedAt);
        el.dataValues.minimumSalaryFormatted = dotSeparator(el.minimumSalary);
        el.minimumSalary = dotSeparator(el.minimumSalary);
        el.maximumSalary = dotSeparator(el.maximumSalary);
        el.dataValues.maximumSalaryFormatted = dotSeparator(el.maximumSalary);
        // console.log(el.dataValues.updatedDate);
      });

      res.status(200).json(jobs);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getJobDetail(req, res, next) {
    try {
      let id = req.params.id;
      let job = await Job.findByPk(id, {
        include: [Company, Skill],
      });
      if (!job) {
        throw { name: "notFound" };
      }

      job.postDate = timeSetter(job.postDate);
      job.dataValues.updatedDate = timeSetter(job.updatedAt);
      job.dataValues.minimumSalaryFormatted = dotSeparator(job.minimumSalary);
      job.minimumSalary = dotSeparator(job.minimumSalary);
      job.maximumSalary = dotSeparator(job.maximumSalary);
      job.dataValues.maximumSalaryFormatted = dotSeparator(job.maximumSalary);
      console.log(job);

      res.status(200).json(job);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async postJob(req, res, next) {
    const t = await sequelize.transaction();
    try {
      let {
        _id,
        title,
        companyId,
        minimumSalary,
        maximumSalary,
        minimumExperience,
        maximumExperience,
        category,
        jobType,
        description,
        Skills,
      } = req.body;
      console.log(req.body);
      // let _id = req.user.id;
      let postDate = new Date();

      let newJob = await Job.create(
        {
          _id,
          title,
          companyId,
          minimumSalary,
          maximumSalary,
          minimumExperience,
          maximumExperience,
          category,
          jobType,
          description,
          postDate,
        },
        { transaction: t }
      );
      //   console.log(newJob);
      Skills.forEach((el) => (el.jobId = newJob.id));

      //skills validation
      let newSkills = await Skill.bulkCreate(Skills, {
        transaction: t,
        validate: true,
      });

      await t.commit();
      res.status(201).json({ message: title + " has been added to system" });
    } catch (err) {
      // console.log(err.errors[0].errors.errors[0].message, err.name);
      console.log(err);
      await t.rollback();
      next(err);
    }
  }

  static async deleteJob(req, res, next) {
    try {
      let id = req.params.id;
      let job = await Job.findByPk(id);
      if (!job) {
        throw { name: "notFound" };
      }
      await job.destroy();
      res.status(200).json({ message: job.title + " has been deleted " });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async patchJob(req, res, next) {
    const t = await sequelize.transaction();
    try {
      let {
        _id,
        title,
        companyId,
        minimumSalary,
        maximumSalary,
        minimumExperience,
        maximumExperience,
        category,
        jobType,
        description,
        Skills,
      } = req.body;
      let id = req.params.id;

      let job = await Job.findByPk(id);
      // console.log(job, "masuk");

      if (!job) {
        throw { name: "notFound" };
      }

      let editedJob = await Job.update(
        {
          _id,
          title,
          companyId,
          minimumSalary,
          maximumSalary,
          minimumExperience,
          maximumExperience,
          category,
          jobType,
          description,
        },
        {
          where: { id: id },
          transaction: t,
        }
      );

      //skills
      let deletedSkills = await Skill.destroy({
        where: {
          jobId: id,
        },
        transaction: t,
      });
      Skills.forEach((el) => (el.jobId = id));

      let newSkills = await Skill.bulkCreate(Skills, {
        transaction: t,
        validate: true,
      });

      await t.commit();
      res.status(201).json({ message: title + " has been edited" });
    } catch (err) {
      await t.rollback();
      console.log(err);
      next(err);
    }
  }

  //companies
  static async getCompanies(req, res, next) {
    try {
      let companies = await Company.findAll({
        include: Job,
      });

      companies = companies.map((el) => {
        el.dataValues.createdDate = timeSetter(el.createdAt);
        el.dataValues.updatedDate = timeSetter(el.updatedAt);
        return el;
      });

      res.status(200).json(companies);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async postCompany(req, res, next) {
    try {
      let { name, companyLogo, location, email, description } = req.body;
      let newCompany = await Company.create({
        name,
        companyLogo,
        location,
        email,
        description,
      });

      res.status(201).json({ message: `Company ${name} has been created` });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async deleteCompany(req, res, next) {
    try {
      // console.log("MASUK");
      let id = req.params.id;
      let company = await Company.findByPk(id);
      if (!company) {
        throw { name: "notFound" };
      }
      await company.destroy();
      res.status(200).json({ message: company.name + " has been deleted" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async patchCompany(req, res, next) {
    try {
      let id = req.params.id;
      let { name, companyLogo, location, email, description } = req.body;

      let company = await Company.findByPk(id);
      if (!company) {
        throw { name: "notFound" };
      }

      let newCompany = await Company.update(
        {
          name,
          companyLogo,
          location,
          email,
          description,
        },
        { where: { id: id } }
      );

      res.status(201).json({ message: `Company ${name} has been edited` });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  //register & login
  static async register(req, res, next) {
    try {
      let { username, email, password, phoneNumber, address, role } = req.body;

      let newUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
        role,
      });

      res.status(201).json({ message: "Account created" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      // console.log(req.body, "OKOKOK");
      let { email, password } = req.body;
      if (!email) {
        throw { name: "emailRequired" };
      }
      if (!password) {
        throw { name: "passwordRequired" };
      }

      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        // console.log('error di email')
        throw { name: "InvalidCredential" };
      }

      if (await bcrypt.compare(password, user.password)) {
        const access_token = createToken({ userId: user.id, email: email });
        // console.log('masuk', '<<<<<<<<<<<<')
        res.status(200).json({
          access_token: access_token,
          userId: user.id,
          role: user.role,
          username: user.username,
        });
      } else {
        throw { name: "InvalidCredential" };
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
