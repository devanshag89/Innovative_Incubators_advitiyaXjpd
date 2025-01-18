const express = require("express");
const { clientSignup, clientLogin, hireTalent } = require("../controllers/clientController");

const router = express.Router();

// Client Signup route
router.post("/clientsignup", clientSignup);

// Client Login route
router.post("/clientlogin", clientLogin);

// Hire Talent route
router.post("/hire", hireTalent);

module.exports = router;
