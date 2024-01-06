require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to the database');
});

// Export a function that returns the database connection
module.exports = async function connectToDatabase() {
  return new Promise((resolve, reject) => {
    // If the database connection is already established, resolve immediately
    if (mongoose.connection.readyState === 1) {
      console.log('Database connection already open');
      resolve(db);
    } else {
      // If not, wait for the 'open' event or handle errors
      db.once('open', () => {
        console.log('Database connection established');
        resolve(db);
      });

      db.on('error', (error) => {
        console.error('MongoDB connection error:', error);
        reject(error);
      });
    }
  });
};
