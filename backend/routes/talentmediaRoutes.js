const express = require('express');
const router = express.Router();
const { saveMedia, getMedia, deleteMedia } = require('../controllers/talentMediaController');


router.post('/saveMedia', saveMedia);


router.get('/getMedia', getMedia);

router.delete('/deleteMedia', deleteMedia);

module.exports = router;
