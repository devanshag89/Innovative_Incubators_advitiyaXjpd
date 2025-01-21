const express = require('express');
const router = express.Router();
const { saveMedia, getMedia } = require('../controllers/talentMediaController');

// Route to save media (videos or posts)
router.post('/saveMedia', saveMedia);

// Route to get media (videos and posts) for a talent
router.get('/getMedia', getMedia);

module.exports = router;
