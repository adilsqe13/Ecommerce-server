const express = require('express');
const router = express.Router(); 
const Carts = require('../../models/user/Cart');
const fetchseller = require('../../middleware/fetchseller');
 
 // Route-1: Get all seller Orders using: GET , Login required
 router.get("/seller-orders", fetchseller, async(req,res)=>{
    try {
        const orders = await Carts.find({
           $and:[ {sellerId: req.seller.id},
            {purchased: 'YES'}]
          });
      res.json(orders);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  });


  module.exports = router;