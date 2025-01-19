const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Talent = require("../models/talent");
const sendNotification = require("../utils/sendNotification");
const nodemailer = require('nodemailer'); 
const twilio = require('twilio'); 
const crypto = require("crypto");
 


// Send OTP to Talent's email
const sendOTP = async (email) => {
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  // Hash the OTP
  const hashedOtp = await bcrypt.hash(otp, 12);

  // Configure the email transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // Use environment variable for email
      pass: process.env.EMAIL_PASSWORD, // Use environment variable for password
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
    console.log(`OTP for ${email}: ${otp}`);
    return { otp: hashedOtp, otpExpiry };
};

const talentSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingTalent = await Talent.findOne({ email });
    if (existingTalent) {
      return res.status(400).json({ message: "Talent already registered" });
    }

    // Generate OTP and hash password
    const { otp, otpExpiry } = await sendOTP(email); // Implement `sendOTP` logic separately
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save talent
    const newTalent = new Talent({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
    });

    await newTalent.save();

    res.status(201).json({ message: "Vrify OTP sent to your email." });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Error during signup", error: error.message });
  }
};


const verifyTalentOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const talent = await Talent.findOne({ email });

    if (!talent) {
      return res.status(400).json({ message: "User not found" });
    }

    const isOtpValid = await bcrypt.compare(otp, talent.otp);
    if (!isOtpValid || new Date() > talent.otpExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    talent.otp = undefined;
    talent.otpExpiry = undefined;
    talent.isOtpVerified = true;
    await talent.save();

    const token = jwt.sign({ id: talent._id, email: talent.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "OTP verified. Signup complete.",
      token,
    });
  } catch (error) {
    console.error("OTP Verification Error:", error);
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

    // Check if the user is verified
    if (!talent.isOtpVerified) {
      return res.status(400).json({ message: "Please verify your OTP before logging in." });
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




const addTalentProfile = async (req, res) => {
  try {
    const { phoneNo, category, skills, personalDescription } = req.body;
    const profilePhoto = req.file ? req.file.path : null; // Profile photo URL from Cloudinary

    const newTalent = new Talent({
      phoneNo,
      category,
      skills,
      personalDescription,
      profilePhoto,
      password: 'innovative'
    });
    await newTalent.save();

    // Twilio Credentials from your account
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const fromWhatsApp = `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`;  
    const toWhatsApp = 'whatsapp:+917860254396'; 

    // Initialize Twilio client
    const client = new twilio(accountSid, authToken);

    // Send WhatsApp message via Twilio
    const message = await client.messages.create({
      from: fromWhatsApp,
      to: toWhatsApp,
      body: `A new talent profile has been created:\n\n
             Phone No: ${phoneNo}\n
             Category: ${category}\n
             Skills: ${skills}\n
             Description: ${personalDescription}\n
             Please review the profile and approve or reject it.`
    });

    console.log('WhatsApp notification sent:', message.sid);

    // Respond back with success message
    res.status(201).json({ message: 'Talent profile sent successfully via WhatsApp', talent: newTalent });

  } catch (err) {
    console.error('Error creating talent profile:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTalent=async(req,res)=>{
   try{
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: 'Email is required as a query parameter' });
    }
    const talent = await Talent.findOne({ email });

    if (!talent) {
      return res.status(404).json({ error: 'Talent profile not found' });
    }

    res.status(200).json({ message: 'Talent profile retrieved successfully', talent });
  } 
  catch (err) {
    console.error('Error retrieving talent profile:', err);
    res.status(500).json({ error: 'Internal server error' });
  }


}


module.exports = { talentSignup, verifyTalentOTP, talentLogin, addTalentProfile,getTalent };
