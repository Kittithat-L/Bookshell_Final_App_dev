const mongoose = require('mongoose');

const FeedbackScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    phone: {
        type: String,
        match: [/^\d{10}$/, 'Phone number must be 10 digits']
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', FeedbackScheme, 'feedbacks');

module.exports = Feedback;