const serverless = require('serverless-http');
const connectToDtabase = require("./db");
const express = require('express');
const cors = require('cors');
// const port = 5000;

connectToDtabase();
const app = express();


// middle-Ware
app.use(express.json());
app.use(cors());
// app.use('/uploads', express.static('uploads'));

//Available Routes
app.use('/api/auth/seller', require('./routes/seller/sellerAuth'));
app.use('/api/seller', require('./routes/seller/sellerProducts'));
app.use('/api/auth/user', require('./routes/user/userAuth'));
app.use('/api', require('./routes/getAllProducts'));
app.use('/api/user', require('./routes/user/addToCart'));
app.use('/api/user', require('./routes/user/cartProducts'));
app.use('/api/user', require('./routes/user/checkout'));
app.use('/api/user', require('./routes/user/myOrders'));
app.use('/api/user', require('./routes/user/addReview'));
app.use('/api/auth/admin', require('./routes/admin/adminAuth'));
app.use('/api/admin', require('./routes/admin/dashboard'));
app.use('/api/user', require('./routes/user/profile'));
app.use('/api/seller', require('./routes/seller/sellerOrders'));


// Connect to the server
// app.listen(port, ()=>{
//     console.log(`Server is running at port ${port}`);
// });

module.exports.handler = serverless(app);

