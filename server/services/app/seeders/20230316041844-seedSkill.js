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
    let data = [
      {
        "id": 1,
        "jobId": 1,
        "name": "Javascript",
        "level": "Beginner"
      },
      {
        "id": 2,
        "jobId": 2,
        "name": "Golang",
        "level": "Intermediate"
      },
      {
        "id": 3,
        "jobId": 3,
        "name": "Swift",
        "level": "Advance"
      },
      {
        "id": 4,
        "jobId": 4,
        "name": "Management",
        "level": "Advance"
      },
      {
        "id": 5,
        "jobId": 5,
        "name": "Business Acumen",
        "level": "Beginner"
      },
      {
        "id": 6,
        "jobId": 6,
        "name": "Marketing",
        "level": "Advance"
      },
      {
        "id": 7,
        "jobId": 7,
        "name": "Management",
        "level": "Intermediate"
      },
      {
        "id": 8,
        "jobId": 1,
        "name": "MongoDB",
        "level": "Intermediate"
      },
      {
        "id": 9,
        "jobId": 2,
        "name": "React",
        "level": "Advance"
      },
      {
        "name": "Driving",
        "level": "Intermediate",
        "jobId": 8,
        "id": 10
      },
      {
        "name": "Management",
        "level": "Advance",
        "jobId": 10,
        "id": 11
      },
      {
        "name": "Business",
        "level": "Intermediate",
        "jobId": 10,
        "id": 12
      },
      {
        "name": "Engineering",
        "level": "Advance",
        "jobId": 10,
        "id": 13
      },
      {
        "name": "Phyton",
        "level": "Advance",
        "jobId": 12,
        "id": 16
      }
    ]

    let skill = data.map(el => {
      delete el.id
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
    
    await queryInterface.bulkInsert("Skills", skill)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Skills", null, {})
  }
};
