const express = require('express');
const router = express.Router();
const { submitContactForm, fetchContactMessages } = require('../controllers/contactController');


router.post('/submit', submitContactForm);
router.get('/fetch-messages', fetchContactMessages)

module.exports = router;
