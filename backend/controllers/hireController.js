const nodemailer = require("nodemailer");
const HireRequest = require("../models/HireRequest");
const Client = require("../models/Client");
const Talent = require("../models/Talent");


const sendHireRequest = async (req, res) => {
  try {
    const { clientEmail, talentId, message } = req.body;


    const client = await Client.findOne({ email: clientEmail });
    const talent = await Talent.findById(talentId);

    if (!client || !talent) {
      return res.status(404).json({ message: "Client or Talent not found" });
    }


    const hireRequest = new HireRequest({
      clientId: client._id,
      talentId,
      message,
      status: "pending",
    });

    await hireRequest.save();


    sendEmailNotification(client, talent, hireRequest);

    res.status(201).json({ message: "Hire request sent successfully", hireRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending hire request" });
  }
};


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
