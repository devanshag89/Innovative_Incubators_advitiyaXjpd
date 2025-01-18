const mongoose = require("mongoose");

const hireRequestSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  talentId: { type: mongoose.Schema.Types.ObjectId, ref: "Talent", required: true },
  message: { type: String, required: false },
  status: { type: String, default: "pending" }, // pending, accepted, rejected
});

module.exports = mongoose.model("HireRequest", hireRequestSchema);
