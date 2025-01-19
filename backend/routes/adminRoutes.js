const express = require("express");
const router = express.Router();

const {handleTalent,approveTalentProfile,rejectTalentProfile} =require('../controllers/adminController')


 
router.post('/approve-talent', approveTalentProfile);
router.post('/reject-talent', rejectTalentProfile);



module.exports=router;