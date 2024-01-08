require('dotenv').config();
const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51OD0ZASG3BK2RYvP74JJFSQySC6QB8BiWnV3flC4a6L87t20M6IrCvBLDcoTTPew439724W8T3OOcUNhGTY7cayT00345lyq7o');
const fetchuser = require('../../middleware/fetchuser');
const SellerProducts = require('../../models/seller/SellerProducts');
const Carts = require('../../models/user/Cart');

// Route: Cart Checkout api ,  Login required
router.post('/checkout-session', fetchuser, async (req, res) => {
    try {
        const cartProducts = req.body;
        const lineItems = cartProducts.map((product) => {
            const gstRate = 0.18; // 18% GST
            const unitPrice = product.product[0].price * (1 + gstRate); // Calculate unit price with GST
            const unitAmount = Math.round(unitPrice * 100); // Convert to cents
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: product.product[0].productName
                    },
                    unit_amount: unitAmount,
                },
                quantity: product.quantity
            }
        });
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT}/order-success`,
            cancel_url: `${process.env.CLIENT}/cancel`,
        });
        res.json({ id: session.id });
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

// Route: Buy Now api ,  Login required
router.post('/checkout-session-buyNow', fetchuser, async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const gstRate = 0.18; // 18% GST
        const unitPrice = product.price * (1 + gstRate); // Calculate unit price with GST
        const unitAmount = Math.round(unitPrice * 100); // Convert to cents

        const lineItems = [{
            price_data: {
                currency: 'inr',
                product_data: {
                    name: product && product.productName ? product.productName : 'Default Name',
                },
                unit_amount: unitAmount,
            },
            quantity: quantity,
        }];

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT}/order-successfull`,
            cancel_url: `${process.env.CLIENT}/cancel`,
        });
        res.json({ id: session.id });
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

// Route: Upddate product as purchased YES on  cart after order confirmation
router.put('/order-success', fetchuser, async (req, res) => {
    try {
        await Carts.updateMany({ userId: req.user.id }, { $set: { purchased: 'YES' } });
    } catch (error) {
        console.log(error);
    }
});

// Route: Add product on cart and update purchased YES after order confirmation
router.put('/order-successfull/:productId', fetchuser, async (req, res) => {
    try {
        const productId = req.params.productId;
        const sellerProduct = await SellerProducts.find({ _id: productId });
        const cartProduct = new Carts({ userId: req.user.id, productId: productId, product: sellerProduct });
        const newCartProduct = await cartProduct.save();
        await Carts.updateOne({ _id: newCartProduct._id }, { $set: { purchased: 'YES' } });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
