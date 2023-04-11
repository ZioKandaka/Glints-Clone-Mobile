'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Skill.belongsTo(models.Job, {foreignKey: "jobId"})
    }
  }
  Skill.init({
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "Job ID is required"},
        notEmpty: {msg: "Job ID is required"}
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Skill name is required"},
        notEmpty: {msg: "Skill name is required"}
      }
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Please select skill level"},
        notEmpty: {msg: "Please select skill level"}
      }
    },
  }, {
    sequelize,
    modelName: 'Skill',
  });
  return Skill;
};