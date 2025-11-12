const mongoose = require('mongoose');

const PassengerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  trainNumber: String
});

module.exports = mongoose.model('Passenger', PassengerSchema);
