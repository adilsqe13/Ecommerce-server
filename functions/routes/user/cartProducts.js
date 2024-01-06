const express = require('express');
const router = express.Router();
const Carts = require('../../models/user/Cart');
const fetchuser = require('../../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
let success = false;

// Route: Get user's cart products using: GET "/api/user/cart-products". Login required
router.get('/cart-products', fetchuser, async (req, res) => {
    try {
        const userCartProducts = await Carts.find({
            $and: [
                { userId: req.user.id },
                { purchased: 'NO' }
            ]
        });
        success = false;
        if (userCartProducts.length === 0) {
            success = false;
        } else {
            success = true;
        }

        res.json({ userCartProducts, success });
    } catch (error) {
        console.error(error);
        success = false;
        res.json(success);
    }
});

// Route: Update payment method using: PUT "/api/user/set-payment-method". Login required
router.put('/set-payment-method', fetchuser, async (req, res) => {
    try {
        const { selectedMethod } = req.body;
        const userCartProducts = await Carts.updateMany({ userId: req.user.id }, { $set: { paymentMethod: selectedMethod } })
        res.json(userCartProducts);
    } catch (error) {
        console.error(error);
    }
});

// Route: Update shipping address using: PUT "/api/user/save-shipping-address". Login required
router.put('/save-shipping-address', [
    body('address', 'Enter a valid address').isLength({ min: 1 }),
    body('city', 'Enter a valid city name').isLength({ min: 1 }),
    body('state', 'Enter valid state name').isLength({ min: 1 }),
    body('postalCode', 'Enter a valid postal code').isLength({ min: 6 }),

], fetchuser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        const { address, city, state, postalCode } = req.body;
        const userCartProducts = await Carts.updateMany({ userId: req.user.id }, { $set: { address: address, city: city, state: state, postalCode: postalCode } })
        success = true;
        res.json({ userCartProducts, success });
    } catch (error) {
        console.error(error);
        success = false;
        res.json(success);
    }
});

module.exports = router;