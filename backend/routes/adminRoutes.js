const express = require("express");
const router = express.Router();

const {approveTalentProfile,rejectTalentProfile, getPendingTalents, getApprovedTalents} =require('../controllers/adminController')


 
router.post('/approve-talent', approveTalentProfile);
router.post('/reject-talent', rejectTalentProfile);
router.get('/get-pending-talents', getPendingTalents);
router.get('/get-approved-talents', getApprovedTalents);



module.exports=router;