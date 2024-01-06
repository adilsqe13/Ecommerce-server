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
app.use('/.netlify/functions/server/api/auth/seller', require('./routes/seller/sellerAuth'));
app.use('/.netlify/functions/server/api/seller', require('./routes/seller/sellerProducts'));
app.use('/.netlify/functions/server/api/auth/user', require('./routes/user/userAuth'));
app.use('/.netlify/functions/server/api', require('./routes/getAllProducts'));
app.use('/.netlify/functions/server/api/user', require('./routes/user/addToCart'));
app.use('/.netlify/functions/server/api/user', require('./routes/user/cartProducts'));
app.use('/.netlify/functions/server/api/user', require('./routes/user/checkout'));
app.use('/.netlify/functions/server/api/user', require('./routes/user/myOrders'));
app.use('/.netlify/functions/server/api/user', require('./routes/user/addReview'));
app.use('/.netlify/functions/server/api/auth/admin', require('./routes/admin/adminAuth'));
app.use('/.netlify/functions/server/api/admin', require('./routes/admin/dashboard'));
app.use('/.netlify/functions/server/api/user', require('./routes/user/profile'));
app.use('/.netlify/functions/server/api/seller', require('./routes/seller/sellerOrders'));


// Connect to the server
// app.listen(port, ()=>{
//     console.log(`Server is running at port ${port}`);
// });

module.exports.handler = serverless(app);

