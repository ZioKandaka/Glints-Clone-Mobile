'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = require("./dataJob.json")

    let jobs = data.map(el => {
      delete el.id
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
    
    await queryInterface.bulkInsert("Jobs", jobs)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Jobs", null, {})
  }
};
