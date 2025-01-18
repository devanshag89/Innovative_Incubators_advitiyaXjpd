const express = require("express");
const { talentSignup, verifyTalentOTP, talentLogin } = require("../controllers/talentController");

const router = express.Router();

// Talent Signup
router.post("/signup", talentSignup);

// Verify OTP
router.post("/verify-otp", verifyTalentOTP);

// Talent Login
router.post("/login", talentLogin);

module.exports = router;
