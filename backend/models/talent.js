const mongoose = require("mongoose");

const talentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String, required: false },
  otpExpiry: { type: Date, required: false },
});

module.exports = mongoose.model("Talent", talentSchema);
