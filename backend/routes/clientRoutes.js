const express = require("express");
const { clientSignup, clientLogin, hireTalent, verifyClientOTP } = require("../controllers/clientController");

const router = express.Router();


router.post("/client-signup", clientSignup);


router.post("/client-login", clientLogin);

router.post("/verify-client-otp", verifyClientOTP)

router.post("/hire", hireTalent);

module.exports = router;
