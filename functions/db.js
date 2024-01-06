// db.js

const connectToDatabase = require('./connectedToDatabase');

exports.handler = async (event, context) => {
  try {
    // Ensure database connection before performing operations
    await connectToDatabase();

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
