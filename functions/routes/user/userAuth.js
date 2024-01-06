const express = require('express');
const router = express.Router();
const User = require('../../models/user/UserProfile');
const fetchuser = require('../../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "myNameIsKhan";
let success = false;

// Route-1: Register a seller using: POST "/api/auth/register". No login required
router.post('/register', [
    body('fullName', 'Enter a valid name').isLength({ min: 1 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 character').isLength({ min: 5 }),
    body('mobile', 'Mobile number will be 10 digit ').isLength({ max: 10 }),
    body('address', 'Enter a valid address').isLength({ min: 5 }),
    body('state', 'Enter valid address').isLength({ min: 5 }),
    body('postalCode', 'Enter a valid postal code').isLength({ min: 6 }),

], async (req, res) => {
    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }

    //Check whether the user with this email exist already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false;
            return res.status(400).json({ success, error: 'Sorry a user with this email is already exist' });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //Create a new user
        user = await User.create({
            fullName: req.body.fullName,
            password: secPass,
            email: req.body.email,
            mobile: req.body.mobile,
            address: req.body.address,
            state: req.body.state,
            postalCode: req.body.postalCode,
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken: authToken, userFullName: user.fullName });

    } catch (error) {
        success = false;
        console.log(error.message);
        res.status(500).send(success + "Internal server error");
    }
});

// Route-2: Authenticate a user using: POST "/api/auth/user/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blanck').exists()
], async (req, res) => {
    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: 'Please try to login with correct credentials' });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: 'Please try to login with correct credentials' });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken: authToken, userFullName: user.fullName });

    } catch (error) {
        console.log(error.message);
        res.status(500).send(success + "Internal server error");

    }

});

// Route-3: Get user's profile using: GET "/api/auth/user/get-user-profile". Login required
router.get('/get-user-profile', fetchuser, async (req, res) => {
    try {
        const user = await User.find({ _id: req.user.id });
        res.json(user);
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;