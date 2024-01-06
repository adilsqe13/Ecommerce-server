const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    userId: {
        type: String,
        ref: 'user'
    },
    productId: {
        type: String,
        required: true
    },
    sellerId: {
        type: String,
        required: true
    },
    product: {
        type: Object,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    amount: {
        type: Number,
        default: function () {
            return this.quantity * this.product[0].price;
        },
    },
    paymentMethod: {
        type: String,
        default: 'None',
    },
    purchased: {
        type: String,
        default: 'NO',
    },
    address: {
        type: String,
        default: 'None',
    },
    city: {
        type: String,
        default: 'None',
    },
    state: {
        type: String,
        default: 'None',
    },
    postalCode: {
        type: Number,
        default: 000000,
    },

    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('carts', CartSchema);