const express = require("express");
const {
  talentSignup,
  verifyTalentOTP,
  talentLogin,
  addTalentProfile,
  getTalent,
} = require("../controllers/talentController");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const authMiddleware = require("../AuthMiddlewares/authMiddleware");

const cloudinary = require("cloudinary").v2;
require("dotenv").config();



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "talent_profiles",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

const router = express.Router();


router.post("/talentsignup", talentSignup);


router.post("/talentverify-otp", verifyTalentOTP);

router.post("/talentlogin", talentLogin);


router.post("/addtalent", authMiddleware, addTalentProfile);


router.get("/gettalent", getTalent);

module.exports = router;