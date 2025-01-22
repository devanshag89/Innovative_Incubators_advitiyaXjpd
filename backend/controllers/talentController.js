const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Talent = require("../models/Talent");
const sendNotification = require("../utils/sendNotification");
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const crypto = require('crypto');




const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Sender's email address (should be in .env)
    pass: process.env.EMAIL_PASSWORD, // App password or email password (should be in .env)
  },
});


const sendEmail = async (to, subject, text) => {
  if (!to) {
    throw new Error("Recipient email is missing!");
  }
  console.log(process.env.EMAIL)
  const mailOptions = {
    from: process.env.EMAIL,  // Sender's email address
    to,  // Recipient email (ensure it's not undefined)
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};


const sendOTP = async (email) => {
  if (!email) {
    throw new Error("Email is required to send OTP!");
  }

  const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

  const mailOptions = {
    from: process.env.EMAIL, // Sender's email address
    to: email, // Recipient email
    subject: "Your OTP for Talent Registration",
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}: ${otp}`);
    return { otp, otpExpiry };
  } catch (error) {
    console.error("Failed to send OTP:", error);
    throw new Error("Failed to send OTP. Please try again.");
  }
};


const talentSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }


    const existingTalent = await Talent.findOne({ email });
    if (existingTalent) {
      return res.status(400).json({ message: "Talent already registered" });
    }


    const { otp, otpExpiry } = await sendOTP(email);
    const hashedPassword = await bcrypt.hash(password, 12);


    const newTalent = new Talent({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
    });

    await newTalent.save();


    return res.status(201).json({ message: "Talent registered. OTP sent to email." });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Error during signup", error: error.message });
  }
};


const verifyTalentOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const talent = await Talent.findOne({ email });

    if (!talent || talent.otp !== otp || new Date() > talent.otpExpiry) {
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


const talentLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const talent = await Talent.findOne({ email });
    if (!talent) {
      return res.status(404).json({ message: "Talent not found" });
    }



    if (!talent.isOtpVerified) {
      return res.status(400).json({ message: "Please verify your OTP before logging in." });
    }


    const isMatch = await bcrypt.compare(password, talent.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: talent._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    res.status(200).json({
      message: "Login successful",
      token,
      email,
      isProfileComplete: talent.isProfileComplete,
    });
    console.log({ message: "Login successful", token, email });
  } catch (error) {
    res.status(500).json({ message: "Error during login", error: error.message });
  }
};


const addTalentProfile = async (req, res) => {
  const { email, phone, bio, profilePicture, selectedSubSkills } = req.body;
  console.log(req.body);

  // Validate required fields
  if (!email || !phone || !bio || !profilePicture || !selectedSubSkills.length) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Find the user by email
    const user = await Talent.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user's profile
    user.phoneNo = phone;
    user.personalDescription = bio;
    user.profilePhoto = profilePicture;
    user.skills = selectedSubSkills;

    user.isProfileComplete = true;

    // Save the updated user to the database
    const updatedUser = await user.save();

    const adminEmail = process.env.ADMIN_EMAIL;
    await sendEmail(
      adminEmail,
      "New Talent Registration",
      `A new talent has registered:\nName: ${user.name}\nEmail: ${email}\nPhone: ${phone}\nSkills: ${selectedSubSkills}\nDiscription: ${bio}\nPlease review their profile.`
    );

    res.status(200).json({
      message: "Profile updated successfully",
      isProfileComplete: updatedUser.isProfileComplete,

      user: updatedUser, // Return updated user details
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "An error occurred while updating the profile." });
  }
};


const getTalent = async (req, res) => {
  const { email } = req.query;

  try {
    const talent = await Talent.findOne({ email });
    if (!talent) {
      return res.status(404).json({ message: "Talent not found" });
    }

    res.status(200).json({ message: "Talent profile retrieved successfully", talent });
  } catch (error) {
    console.error("Error retrieving talent profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  talentSignup,
  verifyTalentOTP,
  talentLogin,
  addTalentProfile,
  getTalent,
};