const express = require('express');
const router = express.Router();
const Favorite = require('../Model/favoriteSchema');
const mongoose = require('mongoose');

router.post('/post', async (req, res) => {
    try {
        const { userId, bookId, bookTitle } = req.body;

        if (!userId || !bookId || !bookTitle) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const favorite = new Favorite({ userId, bookId, bookTitle });
        const result = await favorite.save();
        res.status(201).json(result);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.get('/get/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId format' });
        }

        const objectIdUserId = new mongoose.Types.ObjectId(userId);
        const favorites = await Favorite.find({ userId: objectIdUserId });
        res.json(favorites);
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

        const result = await Favorite.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        res.json(result);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;