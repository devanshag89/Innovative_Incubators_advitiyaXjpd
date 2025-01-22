const nodemailer = require("nodemailer");
const HireRequest = require("../models/HireRequest");
const Client = require("../models/Client"); // Assuming you have a Client model
const Talent = require("../models/Talent"); // Assuming you have a Talent model

// Create a new hire request
const sendHireRequest = async (req, res) => {
  try {
    const { clientId, talentId, message } = req.body;

    // Check if the client and talent exist
    const client = await Client.findById(clientId);
    const talent = await Talent.findById(talentId);

    if (!client || !talent) {
      return res.status(404).json({ message: "Client or Talent not found" });
    }

    // Create and save the hire request
    const hireRequest = new HireRequest({
      clientId,
      talentId,
      message,
      status: "pending", // Default status is pending
    });

    await hireRequest.save();

    // Send email notification to the admin
    sendEmailNotification(client, talent, hireRequest);

    res.status(201).json({ message: "Hire request sent successfully", hireRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending hire request" });
  }
};

// Email notification function
const sendEmailNotification = async (client, talent, hireRequest) => {
  try {
    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service (e.g., Gmail, SendGrid, etc.)
      auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.ADMIN_EMAIL, // Admin's email address
      subject: "New Hire Request Notification",
      text: `
        A new hire request has been sent:
        
        Client: ${client.name} (${client.email})
        Talent: ${talent.name} (${talent.email})
        Message: ${hireRequest.message || "No message"}
        
        Please review the request in the admin dashboard.
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent to admin successfully");
  } catch (error) {
    console.error("Error sending email notification:", error);
  }
};

module.exports = { sendHireRequest };
