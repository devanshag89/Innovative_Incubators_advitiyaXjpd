const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Client = require("../models/Client");
const HireRequest = require("../models/HireRequest");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const sendNotification = require("../utils/sendNotification");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});


const sendOTP = async (email) => {
  if (!email) {
    throw new Error("Email is required to send OTP!");
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
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


const clientSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }


    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: "Client already registered" });
    }


    const { otp, otpExpiry } = await sendOTP(email);
    const hashedPassword = await bcrypt.hash(password, 12);


    const newClient = new Client({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
    });

    await newClient.save();


    return res.status(201).json({ message: "Client registered. OTP sent to email." });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Error during signup", error: error.message });
  }
};


const verifyClientOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const client = await Client.findOne({ email });

    if (!client || client.otp !== otp || new Date() > client.otpExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // OTP verified, remove OTP fields
    client.otp = undefined;
    client.otpExpiry = undefined;
    client.isOtpVerified = true;
    await client.save();

    // Generate JWT token
    const token = jwt.sign({ id: client._id, email: client.email }, process.env.JWT_SECRET, {
      expiresIn: "5m", // Token expires in 1 hour
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

// Client Login
const clientLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find client by email
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }


    // Generate JWT token
    const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", email, token });
  } catch (error) {
    res.status(500).json({ message: "Error during login", error: error.message });
  }
};

// Hire Talent Request
const hireTalent = async (req, res) => {
  const { clientId, talentId, message } = req.body;

  try {
    // Find client and talent
    const client = await Client.findById(clientId);
    const talent = await Talent.findById(talentId);
    if (!client || !talent || talent.status !== "approved") {
      return res.status(404).json({ message: "Client or Talent not found, or Talent not approved" });
    }

    // Create hire request
    const hireRequest = new HireRequest({
      clientId,
      talentId,
      message,
    });

    await hireRequest.save();

    // Notify admin via WhatsApp
    const adminPhoneNumber = process.env.ADMIN_PHONE_NUMBER;
    const hireMessage = `New hire request from ${client.name} for ${talent.name}. Message: ${message || "No message"}`;
    sendNotification(hireMessage, adminPhoneNumber);

    res.status(201).json({ message: "Hire request submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error during hire request", error: error.message });
  }
};





module.exports = { clientSignup, clientLogin, hireTalent, verifyClientOTP };
