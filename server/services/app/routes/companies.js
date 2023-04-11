const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controllers');
const errorHandler = require('../middlewares/errorHandler')
const authentication = require('../middlewares/authentication');

router.get("/", Controller.getCompanies)

// router.use(authentication)

router.post("/", Controller.postCompany)
router.delete("/:id", Controller.deleteCompany)
router.patch("/:id", Controller.patchCompany)

module.exports = router