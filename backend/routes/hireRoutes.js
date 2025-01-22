
const express = require('express');
const router = express.Router();
const { sendHireRequest, getHireRequests, respondHireRequest } = require('../controllers/hireController');

router.post('/sendHireRequest', sendHireRequest);
router.get('/getHireRequests', getHireRequests);
router.post('/respondHireRequest', respondHireRequest);

module.exports = router;
