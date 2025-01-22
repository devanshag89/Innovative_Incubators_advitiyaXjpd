const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  password: { type: String, required: true },
  otp: { type: String, required: false },
  otpExpiry: { type: Date, required: false },
  isOtpVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("Client", clientSchema);
