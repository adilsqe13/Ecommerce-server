const jwt = require('jsonwebtoken');
const JWT_SECRET = "myNameIsKhan";

const fetchseller = (req, res, next) => {
    // Get the seller from the JWT token and add it to the request
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: 'Please authenticate a valid token' })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.seller = data.seller;
        next();

    } catch (error) {
        res.status(401).send({ error: 'Please authenticate a valid token' });
    }
}

module.exports = fetchseller;

