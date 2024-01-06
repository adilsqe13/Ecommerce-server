const express = require('express');
const router = express.Router();
const Seller = require('../../models/seller/SellerProfile');
const fetchseller = require('../../middleware/fetchseller');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "myNameIsKhan";
let success = false;

// Route-1: Register a seller using: POST "/api/auth/register". No login required
router.post('/register', [
    body('fullName', 'Enter a valid name').isLength({ min: 5 }),
    body('companyName', 'Enter a valid company name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 character').isLength({ min: 5 }),
    body('mobile', 'Mobile number must be atleast 10 character').isLength({ min: 10 }),
    body('companyAddress', 'Enter a valid address').isLength({ min: 5 }),

], async (req, res) => {
    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }

    //Check whether the seller with this email exist already
    try {
        let seller = await Seller.findOne({ email: req.body.email });
        if (seller) {
            success = false;
            return res.status(400).json({ success, error: 'Sorry a seller with this email is already exist' });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //Create a new seller
        seller = await Seller.create({
            fullName: req.body.fullName,
            companyName: req.body.companyName,
            password: secPass,
            email: req.body.email,
            mobile: req.body.mobile,
            companyAddress: req.body.companyAddress,
        });

        const data = {
            seller: {
                id: seller.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken: authToken, sellerFullName: seller.fullName });

    } catch (error) {
        success = false;
        console.log(error.message);
        res.status(500).send(success + "Internal server error");
    }
});

//Route-2: Authenticate a seller using: POST "/api/auth/seller/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blanck').exists()
], async (req, res) => {
    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        let seller = await Seller.findOne({ email });
        if (!seller) {
            success = false;
            return res.status(400).json({ success, error: 'Please try to login with correct credential' });
        }
        const passwordCompare = await bcrypt.compare(password, seller.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: 'Please try to login with correct credential' });
        }

        const data = {
            seller: {
                id: seller.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken: authToken, sellerFullName: seller.fullName });

    } catch (error) {
        console.log(error.message);
        res.status(500).send(success + "Internal server error");

    }

});

//Route-3: Get seller's profile using: GET "/api/auth/seller/get-seller-profile". Login required
router.get('/get-seller-profile', fetchseller, async (req, res) => {
    try {
        const seller = await Seller.find({ _id: req.seller.id });
        res.json(seller);
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;