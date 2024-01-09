const mongoose = require('mongoose');
const { Schema } = mongoose;

const SellerProductsSchema = new Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller'
    },
    productName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stockQuantity: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default:0
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('sellers-products', SellerProductsSchema);