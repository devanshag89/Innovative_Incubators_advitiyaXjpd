const express = require("express");
const router = express.Router();

const {approveTalent,rejectTalent, getPendingTalents, getApprovedTalents} =require('../controllers/adminController')


 
router.post('/approve-talent', approveTalent);
router.post('/reject-talent', rejectTalent);
router.get('/get-pending-talents', getPendingTalents);
router.get('/get-approved-talents', getApprovedTalents);



module.exports=router;