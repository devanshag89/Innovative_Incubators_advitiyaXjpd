const express = require('express');
const router = express.Router();
const { saveMedia, getMedia,deleteMedia } = require('../controllers/talentMediaController');

// Route to save media (videos or posts)
router.post('/saveMedia', saveMedia);

// Route to get media (videos and posts) for a talent
router.get('/getMedia', getMedia);

router.delete('/deleteMedia', deleteMedia);

module.exports = router;
