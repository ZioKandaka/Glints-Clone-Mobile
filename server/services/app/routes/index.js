const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controllers');
const errorHandler = require('../middlewares/errorHandler')
const authentication = require('../middlewares/authentication');

const jobs = require("./jobs")
const companies = require("./companies")

router.get("/", (req, res, next) => {
    res.status(200).json({message: "OK"})
})
router.post("/login", Controller.login)
router.post("/register", Controller.register)

router.use("/jobs", jobs)
router.use("/companies", companies)



router.use(errorHandler)

module.exports = router