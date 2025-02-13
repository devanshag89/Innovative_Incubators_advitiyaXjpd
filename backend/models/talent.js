const mongoose = require('mongoose');

const talentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNo: { type: String, required: false },
    category: { type: String, required: false },
    skills: { type: [String], required: false },
    personalDescription: { type: String, required: false },
    profilePhoto: { type: Object, required: false },
    skillVideos: { type: [String], default: [] },
    posts: { type: [String], default: [] },
    password: { type: String, required: true },
    otp: { type: String, required: false },
    otpExpiry: { type: Date, required: false },
    isOtpVerified: { type: Boolean, default: false },
    isProfileComplete: { type: Boolean, default: false },
    approvalStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);


const Talent = mongoose.models.Talent || mongoose.model('Talent', talentSchema);

module.exports = Talent;