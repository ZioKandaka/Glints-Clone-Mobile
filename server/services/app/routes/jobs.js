const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controllers');
const errorHandler = require('../middlewares/errorHandler')
const authentication = require('../middlewares/authentication');

router.get("/", Controller.getJobs)
router.get("/:id", Controller.getJobDetail)

// router.use(authentication)
router.post("/", Controller.postJob)
router.delete("/:id", Controller.deleteJob)
router.patch("/:id", Controller.patchJob)

module.exports = router