const express = require('express');
const router = express.Router();
const UserProfile = require('../../models/user/UserProfile');
const Carts = require('../../models/user/Cart');
const fetchuser = require('../../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
let success = false;

// Route: Update a  user profie using: PUT "/api/user/save-shipping-address". Login required
router.put('/update-profile', [
    body('fullName', 'Enter a valid name').isLength({ min: 1 }),
    body('email', 'Enter a valid email').isEmail(),
    body('mobile', 'Enter a valid mobile number').isLength({ max: 13 }),
    body('address', 'Enter a valid address').isLength({ min: 5 }),
    body('state', 'Enter valid state').isLength({ min: 1 }),

], fetchuser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        const { fullName, email, mobile, address, state } = req.body;
        await UserProfile.updateOne({ _id: req.user.id }, { $set: { fullName: fullName, email: email, mobile: mobile, address: address, state: state } });
        const updatedProfile = await UserProfile.find({ _id: req.user.id });
        success = true;
        res.json({ success, updatedProfile });
    } catch (error) {
        console.error(error);
        success = false;
        res.json(success);
    }
});

// Route: DELETE a user account using: DELETE "/api/user/delete-account". Login required
router.delete('/delete-account', fetchuser, async (req, res) => {
    try {
        await UserProfile.deleteOne({ _id: req.user.id });
        await Carts.deleteMany({ userId: req.user.id });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;