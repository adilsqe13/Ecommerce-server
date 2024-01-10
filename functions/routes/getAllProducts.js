const express = require('express');
const router = express.Router();
const SellerProducts = require('../models/seller/SellerProducts');

// Route-1: Get all the Products using: GET , No login required
router.get("/get-all-products", async (req, res) => {
  try {
    const allProducts = await SellerProducts.find();
    res.json(allProducts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route-2: Get a Product using: GET , No login required
router.get("/product-page/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await SellerProducts.findOne({ _id: productId });
    res.json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route-3: Get men's all the Products using: GET , No login required
router.get("/get-mens-all-products", async (req, res) => {
  try {
    const allProducts = await SellerProducts.find({ category: "Mens" });
    res.json(allProducts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route-4: Get women's all the Products using: GET , No login required
router.get("/get-womens-all-products", async (req, res) => {
  try {
    const allProducts = await SellerProducts.find({ category: "Womens" });
    res.json(allProducts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route-5: Get kid's all the Products using: GET , No login required
router.get("/get-kids-all-products", async (req, res) => {
  try {
    const allProducts = await SellerProducts.find({ category: "Kids" });
    res.json(allProducts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route-6: Get men's shirts using: GET , No login required
router.get("/get-mens-shirts", async (req, res) => {
  try {
    const allProducts = await SellerProducts.find({ category: "Mens", subCategory: "gentsShirt" });
    res.json(allProducts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route-7: Get men's pants using: GET , No login required
router.get("/get-mens-pants", async (req, res) => {
  try {
    const allProducts = await SellerProducts.find({ category: "Mens", subCategory: "gentsPant" });
    res.json(allProducts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route-8: Get men's hoodies using: GET , No login required
router.get("/get-mens-hoodies", async (req, res) => {
  try {
    const allProducts = await SellerProducts.find({ category: "Mens", subCategory: "gentsHoody" });
    res.json(allProducts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route-9: Get women's tops using: GET , No login required
router.get("/get-womens-tops", async (req, res) => {
  try {
    const allProducts = await SellerProducts.find({ category: "Womens", subCategory: "girlsTop" });
    res.json(allProducts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route-10: Get women's pants using: GET , No login required
router.get("/get-womens-pants", async (req, res) => {
  try {
    const allProducts = await SellerProducts.find({ category: "Womens", subCategory: "LadiesPant" });
    res.json(allProducts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route-11: Get women's dresses using: GET , No login required
router.get("/get-womens-dresses", async (req, res) => {
  try {
    const allProducts = await SellerProducts.find({ category: "Womens", subCategory: "LadiesDress" });
    res.json(allProducts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});


module.exports = router;