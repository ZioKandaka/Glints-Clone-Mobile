'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.Company, {foreignKey: "companyId"})
      Job.hasMany(models.Skill, {foreignKey: "jobId"})
    }
  }
  Job.init({
    _id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "UserId is required"},
        notEmpty: {msg: "UserId is required"}
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Title is required"},
        notEmpty: {msg: "Title is required"}
      }
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "Please select company"},
        notEmpty: {msg: "Please select company"}
      }
    },
    minimumSalary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "Minimum salary is required"},
        notEmpty: {msg: "Minimum salary is required"}
      }
    },
    maximumSalary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "Maximum salary is required"},
        notEmpty: {msg: "Maximum salary is required"}
      }
    },
    minimumExperience: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "Minimum experience is required"},
        notEmpty: {msg: "Minimum experience is required"}
      }
    },
    maximumExperience: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "Maximum experience is required"},
        notEmpty: {msg: "Maximum experience is required"}
      }
    },
    postDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {msg: "Post date is required"},
        notEmpty: {msg: "Post date is required"}
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Category is required"},
        notEmpty: {msg: "Category is required"}
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    jobType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Job type is required"},
        notEmpty: {msg: "Job type is required"}
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {msg: "Please provide description for the job"},
        notEmpty: {msg: "Please provide description for the job"}
      }
    },
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};