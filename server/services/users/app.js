const express = require("express");
const Controller = require("./controller/controller");
const app = express();
const port = process.env.PORT || 4001;
app.use(express.urlencoded({extended: true}))
app.use(express.json())
const cors = require('cors')
app.use(cors())

const MongoClient = require("mongodb").MongoClient;
const mongoUrl = "mongodb+srv://ziokaelani:Td6YS9WdXwIpjRdt@cluster1.ebtsm8s.mongodb.net/?retryWrites=true&w=majority";
// Td6YS9WdXwIpjRdt
const client = new MongoClient(mongoUrl);

client.connect();

let db = client.db("serverUser");

app.get("/", Controller.fetchUsers);
app.get("/:id", Controller.fetchById);

app.post("/", Controller.createUser);
app.delete("/:id", Controller.deleteUser)

app.listen(port, () => {
  console.log(`Server listening on port ${port} users`);
});
