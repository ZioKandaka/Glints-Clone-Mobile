const axios = require("axios");
const ORIGIN = process.env.ORIGIN || "http://localhost:4001";

const jobTypeDefs = `
  type Job {
    id: Int
    _id: String
    title: String
    companyId: Int
    minimumSalary: Int
    maximumSalary: Int
    minimumExperience: Int
    maximumExperience: Int
    postDate: Date
    category: String
    jobType: String
    description: String
  }

  type Company {
    id: 
  }

  type Query {
    userById(id: ID!): User
    getUsers: [User]
  }

  type Mutation {
    createUser(username: String, email: String, password: String, role: String, phoneNumber: String, address: String): User
    deleteUser(id: ID!): User
  }
`;

const jobResolvers = {
  Query: {
    async getJobs() {},
    
    async getJobDetail(parent, { id }) {},

    async getCompanies() {},
},
  Mutation: {
    async postJob() {},

    async deleteJob() {},

    async patchJob() {},

    async postCompany() {},

    async deleteCompany() {},

    async patchCompany() {},
  },
};

module.exports = { userTypeDefs, userResolvers };
