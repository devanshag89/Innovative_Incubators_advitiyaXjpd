const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Talent = require("../models/Talent");
const sendNotification = require("../utils/sendNotification");
const nodemailer = require('nodemailer'); 
const twilio = require('twilio'); 
const crypto = require('crypto');




// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Sender's email address (should be in .env)
    pass: process.env.EMAIL_PASSWORD, // App password or email password (should be in .env)
  },
});

// Helper: Send Email Notification
const sendEmail = async (to, subject, text) => {
  if (!to) {
    throw new Error("Recipient email is missing!");
  }

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

// Helper: Send OTP
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

// Talent Signup
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
    const { otp, otpExpiry } = await sendOTP(email); // Ensure sendOTP is implemented correctly
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save the new talent
    const newTalent = new Talent({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
    });

    await newTalent.save();

    // Notify Admin
    const adminEmail = process.env.ADMIN_EMAIL;
    await sendEmail(
      adminEmail,
      "New Talent Registration",
      `A new talent has registered:\nName: ${name}\nEmail: ${email}\nPlease review their profile.`
    );

    // Send a single success response
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

    // OTP verified, remove OTP fields
    talent.otp = undefined;
    talent.otpExpiry = undefined;
    talent.isOtpVerified = true;
    await talent.save();

    // Generate JWT token
    const token = jwt.sign({ id: talent._id, email: talent.email }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.status(200).json({
      message: "OTP verified. Signup complete.",
      token, // Include the JWT token in the response
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
    const talent = await Talent.findOne({ email });
    if (!talent) {
      return res.status(404).json({ message: "Talent not found" });
    }

    // if (talent.approvalStatus !== "approved") {
    //   return res.status(403).json({ message: "Your profile is not approved yet." });
    // }


    // Check if the user is verified
    if (!talent.isOtpVerified) {
      return res.status(400).json({ message: "Please verify your OTP before logging in." });
    }


    const isMatch = await bcrypt.compare(password, talent.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: talent._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error during login", error: error.message });
  }
};

// Add Talent Profile




const addTalentProfile = async (req, res) => {
  try {
    const { phoneNo, category, skills, personalDescription } = req.body;
    const profilePhoto = req.file ? req.file.path : null; // Profile photo URL from Cloudinary


  try {
    const newTalent = new Talent({
      phoneNo,
      category,
      skills,
      personalDescription,
      profilePhoto,

    });

    await newTalent.save();
    res.status(201).json({ message: "Talent profile created successfully", talent: newTalent });
  } catch (error) {
    console.error("Error creating talent profile:", error);
    res.status(500).json({ message: "Internal server error" });

      password: 'innovative'
    };
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

// Approve Talent
const approveTalent = async (req, res) => {
  const { talentId } = req.body;

  try {
    const talent = await Talent.findById(talentId);
    if (!talent) {
      return res.status(404).json({ message: "Talent not found" });
    }

    talent.approvalStatus = "approved";
    await talent.save();

    await sendEmail(talent.email, "Profile Approved", "Congratulations! Your profile has been approved.");

    res.status(200).json({ message: "Talent approved successfully" });
  } catch (error) {
    console.error("Approval Error:", error);
    res.status(500).json({ message: "Error during approval" });
  }
};

// Reject Talent
const rejectTalent = async (req, res) => {
  const { talentId } = req.body;

  try {
    const talent = await Talent.findById(talentId);
    if (!talent) {
      return res.status(404).json({ message: "Talent not found" });
    }


    await sendEmail(talent.email, "Profile Rejected", "Unfortunately, your profile has been rejected.");

    await Talent.findByIdAndDelete(talentId);

    res.status(200).json({ message: "Talent rejected and removed successfully" });
  } catch (error) {
    console.error("Rejection Error:", error);
    res.status(500).json({ message: "Error during rejection" });
  }
};

// Get Talent by Email
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
  approveTalent,
  rejectTalent,
  getTalent,
};