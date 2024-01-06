const express = require('express');
const router = express.Router();
const SellerProducts = require('../../models/seller/SellerProducts');
const Carts = require('../../models/user/Cart');
const fetchuser = require('../../middleware/fetchuser');

//Route: Add product to cart using: POST , Login required
router.post('/add-to-cart', fetchuser, async (req, res) => {
  try {
    const { productId } = req.body
    const product = await SellerProducts.find({ _id: productId });
    const cartProduct = new Carts({ userId: req.user.id, productId: productId, sellerId: product[0].sellerId, product: product });
    const saveProduct = await cartProduct.save();
    success = true;
    res.json({ success, saveProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//Route: Cart product quantity decrease using: PUT , Login required
router.put('/add-to-cart', fetchuser, async (req, res) => {
  try {
    const { cartProductId, increament } = req.body;
    let inc = 0;
    if (increament === 1) {
      inc = 1;
    } else if (increament === -1) {
      inc = -1;
    }

    let updatedCartProduct = await Carts.updateOne({ _id: cartProductId }, { $inc: { quantity: inc } });
    const product = await Carts.findOne({ _id: cartProductId });
    const newAmount = await product.product[0].price * product.quantity;
    updatedCartProduct = await Carts.updateOne({ _id: cartProductId }, { $set: { amount: newAmount } });
    success = true;
    res.json({ success, updatedCartProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//Route: Cart product delete using: DELETE , Login required
router.delete('/add-to-cart', fetchuser, async (req, res) => {
  try {
    const { cartProductId } = req.body;
    const updatedCartProduct = await Carts.deleteOne({ _id: cartProductId });
    success = true;
    res.json({ success, updatedCartProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;