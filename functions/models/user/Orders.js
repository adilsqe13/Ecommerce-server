const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrdersSchema = new Schema({
    userId: {
        type: String,
        ref: 'user'
    },
    OrderDetails: [{
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        fullAddress: [{
            addredd: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            house: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            postalCode: {
                type: Number,
                required: true
            }
        }],
    }],
    products: {
        type: Object,
        required: true
    },
    msg: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('orders', OrdersSchema);