const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Client = require("../models/Client");
const HireRequest = require("../models/HireRequest");
const Talent =require('../models/talent')
const sendNotification = require("../utils/sendNotification");

// Client Registration
const clientSignup = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    // Check if client already exists
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: "Client already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new client
    const newClient = new Client({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    await newClient.save();

    // Send success response
    res.status(201).json({ message: "Client registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error during registration", error: error.message });
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
  
    res.status(200).json({ message: "Login successful", token });
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



module.exports = { clientSignup, clientLogin, hireTalent };
