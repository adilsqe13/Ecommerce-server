const express = require('express');
const router = express.Router(); 
const Carts = require('../../models/user/Cart');
const fetchuser = require('../../middleware/fetchuser');
 
 // Route-1: Get all the Orders using: GET , No login required
 router.get("/my-orders", fetchuser, async(req,res)=>{
    try {
        const orders = await Carts.find({
            $and: [
                { userId: req.user.id },
                { purchased: 'YES' }
            ]
        });
      res.json(orders);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  });


  module.exports = router;