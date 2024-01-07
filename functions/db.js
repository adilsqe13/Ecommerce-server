const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://user123:Addilsqe13@cluster0.vrujhwg.mongodb.net/test?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = connectToMongoDB;





// require('dotenv').config();
// const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://user123:Addilsqe13@cluster0.vrujhwg.mongodb.net/test?retryWrites=true&w=majority';

// mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
  
//   const db = mongoose.connection;
//   db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//   db.once('open', () => {
//     console.log('Connected to the database');
//   });

//   module.exports = async function connectToDatabase() {
//     await new Promise((resolve) => {
//       db.once('open', resolve);
//     });
//     return db;
//   };