require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/api', (req, res) => {
  // Serve HTML file for the root path
  const filePath = path.join(__dirname, 'index.html');
  res.sendFile(filePath);
});

app.get('/', (req, res) => {
  // Respond to API GET request
  const responseData = '<h1>Hello from API!</h1>';
  res.send(responseData);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
