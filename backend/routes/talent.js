const router=require('express').Router();
const talentSchema=require('../models/talent');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
  api_key: process.env.CLOUDINARY_API_KEY,       
  api_secret: process.env.CLOUDINARY_API_SECRET,  
});
 

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'talent_profiles',  
      allowed_formats: ['jpg', 'jpeg', 'png'],  
    },
  });

const upload = multer({ storage });
 

 
router.post('/addtalent',upload.single('profilePhoto'),async (req,res)=>{
    try{
  
   const{name,
    email,
    phoneNo,
    category,
    skills,
    personalDescription,
  } = req.body;

  const profilePhoto = req.file ? req.file.path : null;


  const newTalent = new talentSchema({
    name,
    email,
    phoneNo,
    category,
    skills,
    personalDescription,
    profilePhoto,
  });

  await newTalent.save();
  res.status(201).json({ message: 'Talent profile created successfully', talent: newTalent });
        
}catch(err){
    console.error('Error creating talent profile:', err);
    res.status(500).json({ error: 'Internal server error' });
}

})

// router.get('/gettalent',async(req,res)=>{
//     const user=await talentSchema.findById({})
// })

module.exports=router;