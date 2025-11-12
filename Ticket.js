const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  passengerName: { type: String, required: true },
  passengerAge: { type: Number, required: true },
  passengerGender: { type: String, required: true },
  trainNumber: { type: String, required: true },
  seatNumber: { type: String, required: true }
});

module.exports = mongoose.model('Ticket', ticketSchema);
