const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["confirmé", "annulé", "en attente"], default: "en attente" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
