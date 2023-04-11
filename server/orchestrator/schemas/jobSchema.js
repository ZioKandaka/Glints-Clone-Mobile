const axios = require("axios");
const ORIGIN = process.env.ORIGIN || "http://localhost:4002";
const USER_ORIGIN = process.env.USER_ORIGIN || "http://localhost:4001";
const redis = require("../config/redis");

const jobTypeDefs = `#graphql
  type Company {
    id: ID
    name: String
    companyLogo: String
    location: String
    email: String
    description: String
  }

  type Author {
    _id: ID
    username: String
    email: String
    role: String
    address: String
    phoneNumber: String
  }

  type Skills {
    id: ID
    jobId: Int
    name: String
    level: String
  }  

  type Job {
    id: ID
    _id: String
    title: String
    companyId: Int
    minimumSalary: String
    maximumSalary: String
    minimumExperience: Int
    maximumExperience: Int
    postDate: String
    category: String
    jobType: String
    description: String
    updatedDate: String
    Skills: [Skills]
    Company: Company
    Author: Author
  }

  type Query {
    getJobs: [Job]
    getJobDetail(id: ID!): Job
  }

  input newSkills {
    name: String
    level: String
  }

  input postData {
    _id: String
    title: String
    companyId: Int
    minimumSalary: Int
    maximumSalary: Int
    minimumExperience: Int
    maximumExperience: Int
    postDate: String
    category: String
    jobType: String
    description: String
    Skills: [newSkills]
  }

  input patchData {
    id: ID
    _id: String
    title: String
    companyId: Int
    minimumSalary: Int
    maximumSalary: Int
    minimumExperience: Int
    maximumExperience: Int
    postDate: String
    category: String
    jobType: String
    description: String
    Skills: [newSkills]
  }

  type Message {
    message: String
  }


  type Mutation {
    postJob(postData: postData): Message
    patchJob(patchData: patchData): Message
    deleteJob(id: ID!): Message
  }
`;

const jobResolvers = {
  Query: {
    async getJobs() {
      try {
        let inMemory = await redis.get("jobs:all");
        if (inMemory) {
          // console.log(JSON.parse(inMemory))
          // redis.del("jobs:all");
          return JSON.parse(inMemory);
        }

        const { data } = await axios({
          method: "GET",
          url: ORIGIN + "/jobs",
        });

        for (let el of data) {
          const { data: Author } = await axios({
            method: "GET",
            url: USER_ORIGIN + "/" + el._id,
          });
          el.Author = Author;
        }

        await redis.set("jobs:all", JSON.stringify(data));

        return data;
      } catch (error) {
        console.error(error);
        return err.response.data;
      }
    },

    async getJobDetail(parent, { id }) {
      try {
        let inMemory = await redis.get("jobs:" + id);
        if (inMemory) {
          // console.log(JSON.parse(inMemory))
          // redis.del("jobs:" + id);
          return JSON.parse(inMemory);
        }
        console.log(id);
        let { data: job } = await axios({
          method: "GET",
          url: ORIGIN + "/jobs/" + id,
        });
        // console.log(job);

        let { data: Author } = await axios({
          method: "GET",
          url: USER_ORIGIN + "/" + job._id,
        });
        // console.log(Author)
        job.Author = Author;
        // console.log(job);

        await redis.set("jobs:" + id, JSON.stringify(job));

        return job;
      } catch (error) {
        console.log(err.response.data);
        return err.response.data;
      }
    },
  },
  Mutation: {
    async postJob(parent, args) {
      try {
        const { postData } = args;
        console.log(postData);
        const { data } = await axios({
          method: "POST",
          url: ORIGIN + "/jobs",
          data: postData,
        });
        redis.del("jobs:all");
        return data;
      } catch (error) {
        console.log(error.response.data);
        return error.response.data;
      }
    },

    async deleteJob(parent, args) {
      try {
        const { id } = args;
        const { data } = await axios({
          method: "DELETE",
          url: ORIGIN + "/jobs/" + id,
        });
        redis.del("jobs:" + id);
        return data;
      } catch (error) {
        console.log(error.response.data);
        return error.response.data;
      }
    },

    async patchJob(parent, args) {
      try {
        const { patchData } = args;
        const { data } = await axios({
          method: "PATCH",
          url: ORIGIN + "/jobs/" + patchData.id,
          data: patchData,
        });
        redis.del("jobs:all");
        return data;
      } catch (error) {
        console.log(error.response.data);
        return error.response.data;
      }
    },
  },
};

module.exports = { jobTypeDefs, jobResolvers };
