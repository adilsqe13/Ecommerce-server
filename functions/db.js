require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://user123:Addilsqe13@cluster0.vrujhwg.mongodb.net/test';

async function dbConnect() {

  // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
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
}
module.exports.handler = dbConnect;

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