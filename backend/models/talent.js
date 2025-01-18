const mongoose = require('mongoose');

const talentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNo: { type: String, required: false },
  category: { type: String, required: false },
  skills: { type: [String], required: false },
  personalDescription: { type: String, required: false },
  profilePhoto: { type: String, required: false }, // Cloudinary URL
  password: { type: String, required: true },
  otp: { type: String, required: false },
  otpExpiry: { type: Date, required: false },
});


module.exports = mongoose.model('Talent', talentSchema);
