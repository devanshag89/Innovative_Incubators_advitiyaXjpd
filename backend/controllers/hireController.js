const nodemailer = require("nodemailer");
const HireRequest = require("../models/HireRequest");
const Client = require("../models/Client");
const Talent = require("../models/Talent");

// Create a new hire request
const sendHireRequest = async (req, res) => {
  try {
    const { clientEmail, talentId, message } = req.body;

    // Check if the client and talent exist
    const client = await Client.findOne({ email: clientEmail }); // Find by email
    const talent = await Talent.findById(talentId);

    if (!client || !talent) {
      return res.status(404).json({ message: "Client or Talent not found" });
    }

    // Create and save the hire request
    const hireRequest = new HireRequest({
      clientId: client._id,  // Use the _id of the client after finding by email
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
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "New Hire Request Notification",
      text: `
        A new hire request has been sent:
        
        Client: ${client.name} (${client.email})
        Talent: ${talent.name} (${talent.email})
        Message: ${hireRequest.message || "No message"}
        
        Please review the request in the admin dashboard.
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent to admin successfully");
  } catch (error) {
    console.error("Error sending email notification:", error);
  }
};

// Get all pending hire requests for a talent
const getHireRequests = async (req, res) => {
  try {
    const { talentId } = req.query;
    const requests = await HireRequest.find({ talentId, status: "pending" });
    res.status(200).json({ requests });
  } catch (error) {
    console.error("Error fetching hire requests:", error);
    res.status(500).json({ message: "Error fetching hire requests" });
  }
};

// Respond to a hire request (accept/reject)
const respondHireRequest = async (req, res) => {
  try {
    const { requestId, response } = req.body;
    const hireRequest = await HireRequest.findById(requestId);

    if (!hireRequest) {
      return res.status(404).json({ message: "Hire request not found" });
    }

    hireRequest.status = response === "accept" ? "hired" : "rejected";
    await hireRequest.save();

    res.status(200).json({ message: `Hire request ${response}ed successfully`, hireRequest });
  } catch (error) {
    console.error("Error responding to hire request:", error);
    res.status(500).json({ message: "Error responding to hire request" });
  }
};

module.exports = { sendHireRequest, getHireRequests, respondHireRequest };
