require('dotenv').config();
const serverless = require('serverless-http');
const connectToDtabase = require("./db");
const express = require('express');
const cors = require('cors');
const port = process.env.PORT;

connectToDtabase();
const app = express();


// middle-Ware
app.use(express.json());
app.use(cors());


//Available Routes
app.use(`${process.env.NETLIFY_API}/auth/seller`, require('./routes/seller/sellerAuth'));
app.use(`${process.env.NETLIFY_API}/seller`, require('./routes/seller/sellerProducts'));
app.use(`${process.env.NETLIFY_API}/auth/user`, require('./routes/user/userAuth'));
app.use(`${process.env.NETLIFY_API}`, require('./routes/getAllProducts'));
app.use(`${process.env.NETLIFY_API}/user`, require('./routes/user/addToCart'));
app.use(`${process.env.NETLIFY_API}/user`, require('./routes/user/cartProducts'));
app.use(`${process.env.NETLIFY_API}/user`, require('./routes/user/checkout'));
app.use(`${process.env.NETLIFY_API}/user`, require('./routes/user/myOrders'));
app.use(`${process.env.NETLIFY_API}/user`, require('./routes/user/addReview'));
app.use(`${process.env.NETLIFY_API}/auth/admin`, require('./routes/admin/adminAuth'));
app.use(`${process.env.NETLIFY_API}/admin`, require('./routes/admin/dashboard'));
app.use(`${process.env.NETLIFY_API}/user`, require('./routes/user/profile'));
app.use(`${process.env.NETLIFY_API}/seller`, require('./routes/seller/sellerOrders'));


// Connect to the server
app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);
});

module.exports.handler = serverless(app);

