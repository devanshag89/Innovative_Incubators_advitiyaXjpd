const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Talent = require("../models/Talent");
const sendNotification = require("../utils/sendNotification");
const crypto = require("crypto");

// Send OTP to Talent's email
const sendOTP = async (email) => {
  const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

  console.log(`OTP for ${email}: ${otp}`);
  return { otp, otpExpiry };
};

// Talent Signup
const talentSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if talent already exists
    const existingTalent = await Talent.findOne({ email });
    if (existingTalent) {
      return res.status(400).json({ message: "Talent already registered" });
    }

    // Send OTP
    const { otp, otpExpiry } = await sendOTP(email);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save talent with OTP and hashed password
    const newTalent = new Talent({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
    });

    await newTalent.save();

    res.status(201).json({ message: "Talent registered. OTP sent to email." });
  } catch (error) {
    res.status(500).json({ message: "Error during signup", error: error.message });
  }
};

// Verify OTP
const verifyTalentOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const talent = await Talent.findOne({ email });

    if (!talent || talent.otp !== otp || new Date() > talent.otpExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // OTP verified, remove OTP fields
    talent.otp = undefined;
    talent.otpExpiry = undefined;
    await talent.save();

    res.status(200).json({ message: "OTP verified. Signup complete." });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error: error.message });
  }
};

// Talent Login
const talentLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find talent by email
    const talent = await Talent.findOne({ email });
    if (!talent) {
      return res.status(404).json({ message: "Talent not found" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, talent.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: talent._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error during login", error: error.message });
  }
};

// Add Talent Profile with Photo
const addTalentProfile = async (req, res) => {
  try {
    const {  phoneNo, category, skills, personalDescription } = req.body;
    const profilePhoto = req.file ? req.file.path : null; // Profile photo URL from Cloudinary

    const newTalent = new Talent({
      phoneNo,
      category,
      skills,
      personalDescription,
      profilePhoto,
    });

    await newTalent.save();
    res.status(201).json({ message: 'Talent profile created successfully', talent: newTalent });

  } catch (err) {
    console.error('Error creating talent profile:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { talentSignup, verifyTalentOTP, talentLogin, addTalentProfile };
