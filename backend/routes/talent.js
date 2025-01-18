const router=require('express').Router();
const talentSchema=require('../models/talent');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary=require('../config/cloudinary')
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'talent_profiles',  
      allowed_formats: ['jpg', 'jpeg', 'png'],  
    },
  });

const upload = multer({ storage });
 

router.post('/addTalent',upload.single('profilePhoto'),async (req,res)=>{
    try{
  
   const{name,
    email,
    phoneNo,
    category,
    skills,
    personalDescription,
  } = req.body;

  const profilePhoto = req.file ? req.file.path : null;


  const newTalent = new Talent({
    name,
    email,
    phoneNo,
    category,
    skills,
    personalDescription,
    profilePhoto,
  });

  await newTalent.save();
        
}catch(err){
    console.error('Error creating talent profile:', err);
    res.status(500).json({ error: 'Internal server error' });
}

})

module.exports=router;