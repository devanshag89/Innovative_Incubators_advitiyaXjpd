const express = require("express");
const router = express.Router();
const { sendHireRequest } = require("../controllers/hireController");

// Route to send a hire request
router.post("/sendHireRequest", sendHireRequest);

module.exports = router;
