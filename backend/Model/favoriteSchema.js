const mongoose = require('mongoose');

const FavouriteScheme = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
        index: true
    },
    bookId: {
        type: String,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Favorite = mongoose.model('Favorites', FavouriteScheme, 'Favorite');

module.exports = Favorite;