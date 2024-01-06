const express = require('express');
const router = express.Router();
const Reviews = require('../../models/user/Reviews');
const SellerProducts = require('../../models/seller/SellerProducts');
const fetchuser = require('../../middleware/fetchuser');

//Route: Add review using: POST , Login required
router.post('/add-review', fetchuser, async (req, res) => {
  try {
    const { productId, reviewInput, userFullName, rating } = req.body;
    const reviewObject = new Reviews({
      productId: productId,
      customerName: userFullName,
      review: reviewInput,
      rating: rating
    })
    await reviewObject.save();
    const allReviews = await Reviews.find({ productId: productId });
    let rate = 0;
    for (let i = 0; i < allReviews.length; i++) {
      rate += allReviews[i].rating;
    }
    const avgRate = rate / allReviews.length.toFixed(2);
    await SellerProducts.updateOne({ _id: productId }, { $set: { rating: avgRate } });

    success = true;
    res.json({ success });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//Route: Show reviews using: GET , No Login required
router.get('/show-reviews/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviews = await Reviews.find({ productId: productId });
    success = true;
    res.json({ success, reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;