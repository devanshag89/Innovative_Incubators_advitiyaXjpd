const Talent = require("../models/Talent");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});


const sendEmail = async (to, subject, text) => {
  if (!to) {
    throw new Error("Recipient email is missing!");
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to,
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

const getApprovedTalents = async (req, res) => {
  try {
    // Fetch all records where status is "approved"
    const approvedTalents = await Talent.find({ approvalStatus: "approved" });

    // Send the retrieved records as a response
    res.status(200).json({
      message: "Approved talents retrieved successfully",
      talents: approvedTalents,
    });
  } catch (error) {
    console.error("Error fetching approved talents:", error);
    res.status(500).json({
      message: "Error retrieving approved talents",
      error: error.message,
    });
  }
};

const getPendingTalents = async (req, res) => {
  try {
    // Fetch all records where status is "approved"
    const approvedTalents = await Talent.find({ approvalStatus: "pending" });
    // Send the retrieved records as a response
    res.status(200).json({ talents: approvedTalents });
  } catch (error) {
    console.error("Error fetching approved talents:", error);
    res.status(500).json({
      message: "Error retrieving approved talents",
      error: error.message,
    });
  }
};



module.exports = { approveTalent, rejectTalent, getApprovedTalents, getPendingTalents };
