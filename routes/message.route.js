const express = require('express');
const router = express.Router();
const Message = require('../models/message');
require('dotenv').config();


// Create a new message
/*router.post('/', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const saved = await newMessage.save();

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(saved.email);

    if (isEmail) {
      const nodemailer = require('nodemailer');

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
        
      });

      const mailOptions = {
        from: 'tonemail@gmail.com',
        to: saved.email,
        subject: 'Confirmation de votre message / rendez-vous',
        text: `Bonjour,\n\nNous avons bien reçu votre message :\n\n${saved.message}\n\nNous vous contacterons bientôt.\n\nHEC Electricité`
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log('Mail envoyé à', saved.email);
      } catch (err) {
        console.error('Erreur email :', err.message);
      }
    }

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});*/

router.post('/', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const saved = await newMessage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get message by ID
router.get('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a message by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Message.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Message not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


//  Delete a message
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
