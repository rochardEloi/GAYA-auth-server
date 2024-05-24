const router = require('express').Router();
const vaController = require("../controllers/verification_assignments")


router.get("/", vaController.getAssignment)


module.exports = router