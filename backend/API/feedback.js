const express = require('express');
const router = express.Router();
const Feedback = require('../Model/FeedbackSchema');
const mongoose = require('mongoose');


router.post('/post', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const feedback = new Feedback({ name, email, phone, message });
        const result = await feedback.save();
        res.status(201).json(result);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});


router.get('/get', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const result = await Feedback.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        res.json(result);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;