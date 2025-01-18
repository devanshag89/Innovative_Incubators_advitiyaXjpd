const express = require("express");
const { clientSignup, clientLogin, hireTalent } = require("../controllers/clientController");

const router = express.Router();

// Client Signup route
router.post("/signup", clientSignup);

// Client Login route
router.post("/login", clientLogin);

// Hire Talent route
router.post("/hire", hireTalent);

module.exports = router;
