# Ecommerce Website Backend

Welcome to the backend of our eCommerce website! This project serves as the backend server for our eCommerce platform, providing APIs for managing products, orders, users, and other backend functionalities.

## Features

- RESTful APIs for managing products, orders, users, and authentication
- MongoDB integration for data storage
- Express.js framework for routing and middleware
- JWT (JSON Web Tokens) for secure authentication
- Error handling and input validation
- Integration with payment gateways (optional)
- Sending transactional emails (optional)

## Installation

1. Clone the repository:


2. Navigate into the project directory:


3. Install dependencies:


4. Configure environment variables:

   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/ecommerce
     JWT_SECRET=your_secret_key_here
     ```

## Usage

1. Start the server:


2. The server will start running on the port specified in the `.env` file (default is 3000).

## API Documentation

The API documentation can be found in the `docs` directory.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose (ODM for MongoDB)
- JWT (JSON Web Tokens) for authentication
- Express-validator for input validation
- Payment gateway integration (optional)



