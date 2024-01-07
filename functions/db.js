require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://adilsqe13:Addilsqe13@cluster0.36jsksi.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to the database');
  });

  module.exports = async function connectToDatabase() {
    await new Promise((resolve) => {
      db.once('open', resolve);
    });
    return db;
  };