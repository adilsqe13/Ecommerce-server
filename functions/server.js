const serverless = require('serverless-http');
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://user123:Addilsqe13@cluster0.vrujhwg.mongodb.net/test';
// const connectToDtabase = require("./db");
const express = require('express');
const cors = require('cors');
// const port = 5000;

// require database connection 
// const dbConnect = require("./db");
// execute database connection 
// dbConnect();
mongoose
    .connect(
        mongoURI,
      {
        //   these are options to ensure that the connection is done properly
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    )
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });

// connectToDtabase();
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

