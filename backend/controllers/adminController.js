const Talent = require("../models/Talent");


const approveTalentProfile = async (req, res) => {
  try {
    const { talentId } = req.body;

    const pendingTalent = await Talent.findById(talentId);
    if (!pendingTalent) {
      return res.status(404).json({ error: 'Talent profile not found' });
    }

    // Save the talent to the Talent database
    pendingTalent.approvalStatus = "approved";
    await pendingTalent.save();

    // Save the talent ID in the admin database
    await Admin.updateOne({}, { $push: { approvedTalents: approvedTalent._id } }, { upsert: true });

    // Remove the pending talent (if stored in a separate collection)
    await Talent.findByIdAndDelete(talentId);

    res.status(200).json({ message: 'Talent profile approved successfully' });
  } catch (err) {
    console.error('Error approving talent profile:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const rejectTalentProfile = async (req, res) => {
  try {
    const { talentId } = req.body;

    const pendingTalent = await Talent.findById(talentId);
    if (!pendingTalent) {
      return res.status(404).json({ error: 'Talent profile not found' });
    }

    // Remove the pending talent (if stored in a separate collection)
    await Talent.findByIdAndDelete(talentId);

    res.status(200).json({ message: 'Talent profile rejected successfully' });
  } catch (err) {
    console.error('Error rejecting talent profile:', err);
    res.status(500).json({ error: 'Internal server error' });
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
    res.status(200).json({talents: approvedTalents});
  } catch (error) {
    console.error("Error fetching approved talents:", error);
    res.status(500).json({
      message: "Error retrieving approved talents",
      error: error.message,
    });
  }
};



module.exports = { approveTalentProfile, rejectTalentProfile, getApprovedTalents, getPendingTalents };
