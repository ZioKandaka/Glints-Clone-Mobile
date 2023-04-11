const axios = require("axios");
const ORIGIN = process.env.USER_ORIGIN || "http://localhost:4001";
const redis = require("../config/redis");

const userTypeDefs = `
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type Query {
    userById(id: ID!): User
    getUsers: [User]
  }

  type MessageDelete {
    acknowledged: Boolean
    deletedCount: String
  }

  type MessageCreate { 
    acknowledged: Boolean, insertedId: String 
  }

  type Mutation {
    createUser(username: String, email: String, password: String, role: String, phoneNumber: String, address: String): MessageCreate
    deleteUser(id: ID!): MessageDelete
  }
`;

const userResolvers = {
  Query: {
    async userById(parent, { id }) {
      try {
        let inMemory = await redis.get("users:" + id);
        if (inMemory) {
          // console.log(JSON.parse(inMemory))
          return JSON.parse(inMemory);
        }

        let { data } = await axios({
          method: "GET",
          url: ORIGIN + "/" + id,
        });

        await redis.set("users:" + id, JSON.stringify(data));

        return data;
      } catch (error) {
        console.log(error.response.data);
        return error.response.data;
      }
    },

    async getUsers() {
      try {
        let inMemory = await redis.get("users:all");
        if (inMemory) {
          // console.log(JSON.parse(inMemory))
          return JSON.parse(inMemory);
        }

        let { data } = await axios({
          method: "GET",
          url: ORIGIN,
        });
        await redis.set("users:all", JSON.stringify(data));
        // console.log("FETCH ULANG")
        return data;
      } catch (error) {
        console.log(error.response.data);
        return error.response.data;
      }
    },
  },
  Mutation: {
    async createUser(
      parent,
      { username, email, password, role, phoneNumber, address }
    ) {
      try {
        const { data } = await axios({
          method: "POST",
          url: ORIGIN,
          data: { username, email, password, role, phoneNumber, address },
        });
        // console.log(data);
        redis.del("users:all");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser(parent, { id }) {
      try {
        let { data } = await axios({
          method: "DELETE",
          url: ORIGIN + "/" + id,
        });
        // console.log(data, "INI DATA");
        redis.del("users:" + id);
        return data;
      } catch (error) {
        console.log(error.response.data);
        return error.response.data;
      }
    },
  },
};

module.exports = { userTypeDefs, userResolvers };
