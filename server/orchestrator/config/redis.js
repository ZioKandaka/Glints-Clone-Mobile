const Redis = require("ioredis");

const redis = new Redis({
    host: process.env.HOST,
    port: process.env.PORT,
    password: process.env.HOST,
});

module.exports= redis

