const express = require("express")
const app = express()
const { Job, Company, User } = require("../models/index")
const {createToken, decodeToken} = require('../middlewares/jwt')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


async function authentication(req, res, next) {
    try {
        let access_token = req.headers.access_token
        if (!access_token) {
          throw { name: "invalidToken" }
        }

        let decoded = decodeToken(access_token)
        // console.log(decoded, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<');

        const user = await User.findByPk(decoded.userId)
        if (!user) {
          throw { name: "InvalidCredential" }
        }
        req.user = {
          id: user.id,
          email: user.email,
          role: user.role
        }
        next()
      } catch (err) {
        console.log(err)
        next(err)
      }
}


module.exports = authentication