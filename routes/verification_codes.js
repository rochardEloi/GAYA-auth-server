const VerificationController = require("../controllers/verification_codes")
const router = require('express').Router();


router.get("/", VerificationController.getVerificationCodesByOrganisationID)
router.put("/", VerificationController.createOrUpdateVfCodes)
 

module.exports=router