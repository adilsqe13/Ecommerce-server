const serverless = require('serverless-http');
const connectToDtabase = require("./db");
const express = require('express');
const cors = require('cors');
// const port = 5000;

// connectToDtabase();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://user123:Addilsqe13@cluster0.vrujhwg.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
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

