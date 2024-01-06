const express = require('express');
const router = express.Router();
const Sellers = require('../../models/seller/SellerProfile');
const Users = require('../../models/user/UserProfile');


// Route: Get all sellers  using: GET , Admin login required
router.get("/getAllSellers", async (req, res) => {
  try {
    const sellers = await Sellers.find();
    res.json(sellers);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route: Get all users  using: GET , Admin login required
router.get("/getAllUsers", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});


module.exports = router;