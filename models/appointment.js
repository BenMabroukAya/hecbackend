// appointment will be modified as administrator's order
// it will be like a simple message sended directly to admin's mail box 
// it could be a feedback , a question , an appointment request 
// there will be two textholder one for email (required) and the other for message to send (required)

const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["confirmé", "annulé", "en attente"], default: "en attente" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
