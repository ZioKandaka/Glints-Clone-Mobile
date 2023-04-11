'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      _id: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      companyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Companies',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      minimumSalary: {
        type: Sequelize.INTEGER
      },
      maximumSalary: {
        type: Sequelize.INTEGER
      },
      minimumExperience: {
        type: Sequelize.INTEGER
      },
      maximumExperience: {
        type: Sequelize.INTEGER
      },
      postDate: {
        type: Sequelize.DATE
      },
      category: {
        type: Sequelize.STRING
      },
      jobType: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Jobs');
  }
};