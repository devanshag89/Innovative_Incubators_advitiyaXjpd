const express = require("express");
const { clientSignup, clientLogin, hireTalent, verifyClientOTP } = require("../controllers/clientController");

const router = express.Router();

// Client Signup route
router.post("/client-signup", clientSignup);

// Client Login route
router.post("/client-login", clientLogin);

router.post("/verify-client-otp", verifyClientOTP)

// Hire Talent route
router.post("/hire", hireTalent);

module.exports = router;
