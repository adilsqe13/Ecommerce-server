// my-function.js
const mongoose = require('./db'); // Assuming db.js is in the same directory

exports.handler = async (event, context) => {
  try {
    // Ensure database connection before performing operations
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB connection not ready');
    }

    // Your serverless function logic here

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' }),
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
