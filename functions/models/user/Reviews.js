const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewsSchema = new Schema({
    productId: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('reviews', ReviewsSchema);