const { ObjectId } = require("mongodb");
const { MongoClient } = require("mongodb");

const mongoUrl = process.env.MONGO_URL;

const client = new MongoClient(mongoUrl);

client.connect();

let db = client.db("serverUser");

class Controller {
  static async fetchUsers(req, res, next) {
    try {
      let collection = await db.collection("serverUser");
      let results = await collection.find({}).toArray();
      //   console.log(results);
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchById(req, res, next) {
    try {
      let { id } = req.params;
      let collection = await db.collection("serverUser");
      let results = await collection.findOne({ _id: new ObjectId(id) });
      //   console.log(results);
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
    }
  }

  static async createUser(req, res, next) {
    try {
      //   console.log(req.body, "INI BOD");
      let collection = await db.collection("serverUser");

      let { username, email, password, role, phoneNumber, address } = req.body;

      let result = await collection.insertOne({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      let { id } = req.params;
      let collection = await db.collection("serverUser");
      let results = await collection.deleteOne({ _id: new ObjectId(id) });
      //   console.log(results);
      res.status(200).json(results);
    } catch (error) {}
  }
}

module.exports = Controller;
