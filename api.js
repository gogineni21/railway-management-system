const express = require('express');
const router = express.Router();

// Import models
const Ticket = require('../models/Ticket');
const Train = require('../models/Train');
const Passenger = require('../models/Passenger');

// Book a Ticket
router.post('/book-ticket', (req, res) => {
    const { name, age, gender, trainNumber } = req.body;

    // Validate the input
    if (!name || !age || !gender || !trainNumber) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    // Validate that the age is a number
    if (isNaN(age) || age <= 0) {
        return res.status(400).json({ message: 'Age must be a valid number!' });
    }

    // Check if the train exists
    Train.findOne({ trainNumber })
        .then(train => {
            if (!train) {
                return res.status(404).json({ message: 'Train not found!' });
            }

            // Create a new passenger
            const newPassenger = new Passenger({
                name,
                age,
                gender,
                trainNumber,
                trainName: train.trainName,
                origin: train.origin,
                destination: train.destination,
                departureTime: train.departureTime,
                arrivalTime: train.arrivalTime
            });

            // Save passenger information
            newPassenger.save()
                .then(() => {
                    res.json({ message: 'Ticket booked successfully!' });
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ message: 'Error booking ticket' });
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error fetching train details' });
        });
});

// Get All Passengers
router.get('/passengers', (req, res) => {
    Passenger.find()
        .then(passengers => {
            res.json(passengers);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error fetching passengers' });
        });
});

// Get All Trains
router.get('/trains', (req, res) => {
    Train.find()
        .then(trains => {
            res.json(trains);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error fetching trains' });
        });
});

module.exports = router;
