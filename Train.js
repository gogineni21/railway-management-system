const mongoose = require('mongoose');

const TrainSchema = new mongoose.Schema({
  trainNumber: String,
  trainName: String,
  origin: String,
  destination: String,
  departureTime: String,
  arrivalTime: String
});

module.exports = mongoose.model('Train', TrainSchema);
