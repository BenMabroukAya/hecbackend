// Create : /
// GetAll : /
// GetById : /:id
// Update : /:id
// DeleteById : /:id

const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');

// Create a new appointment
router.post('/', async (req, res) => {
    try {
        const { client, date, status } = req.body;
        const appointment = new Appointment({ client, date, status });
        await appointment.save();
        res.status(201).json({ message: 'Appointment created successfully', appointment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('client');
        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get a single appointment by ID
router.get('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate('client');
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an appointment
router.put('/:id', async (req, res) => {
    try {
        const { client, date, status } = req.body;
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, { client, date, status }, { new: true });
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment updated successfully', appointment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an appointment
router.delete('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
