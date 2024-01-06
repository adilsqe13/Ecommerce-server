const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const ownerEmail = "adilsqe13@gmail.com";
const ownerPassword = "123456789";
const ownerName = 'MD ADIL ALAM';
const jwt = require('jsonwebtoken');
const JWT_SECRET = "myNameIsAdmin";
let success = false;

//Route: Authenticate an Admin using: POST "/api/auth/admin/admin-login". No login required
router.post('/admin-login', [
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
        if (email === ownerEmail && password === ownerPassword) {
            const authToken = jwt.sign(ownerEmail, JWT_SECRET);
            success = true;
            res.json({ success, authToken: authToken, adminFullName: ownerName });
        } else {
            success = false;
            return res.status(400).json({ success, error: 'Please try to login with correct credential' });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).send(success + "Internal server error");

    }

});

module.exports = router;