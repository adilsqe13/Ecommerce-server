const express = require('express');
const router = express.Router();
const SellerProducts = require('../../models/seller/SellerProducts');
const Carts = require('../../models/user/Cart');
const fetchseller = require('../../middleware/fetchseller');

const multer = require('multer');
const path = require('path');
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads")
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   }
// })

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    // Use the original file name with a timestamp to avoid overwriting files
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage })

// Route-1: Get all the sales using: GET , Login required
router.get("/get-products", fetchseller, async (req, res) => {
  try {
    const sellerProducts = await SellerProducts.find({ sellerId: req.seller.id });
    res.json(sellerProducts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
})

//Route-2: Add seller product using: POST , Login required
router.post('/add-product', fetchseller, upload.single('image'), async (req, res) => {
  try {
    const imageName = req.file.filename;
    const { productName, category, subCategory, price, stockQuantity } = req.body
    const product = new SellerProducts({
      image: imageName, productName, category, subCategory, price, stockQuantity, sellerId: req.seller.id
    })
    const saveProduct = await product.save()
    success = true;
    res.json({ success, saveProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route-3: Delete a product using: DELETE , Login required
router.delete("/delete-product", fetchseller, async (req, res) => {
  try {
    const { productId } = req.body;
    await SellerProducts.deleteOne({ _id: productId });
    await Carts.deleteOne({ productId: productId });
    success = true;
    res.json({ success });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route-4: Update product using: PUT , Login required
router.put('/update-product', upload.single('image'), fetchseller, async (req, res) => {
  try {
    const imageName = req.file.filename;
    const { productName, category, subCategory, price, stockQuantity, productId } = req.body
    await SellerProducts.updateOne({ _id: productId }, { $set: { image: imageName, productName: productName, category: category, subCategory: subCategory, price: price, stockQuantity: stockQuantity } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//Route-5: Get a  product using: GET , Login required
router.get('/get-a-product/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await SellerProducts.find({ _id: productId });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;