const serverless = require('serverless-http');
const express = require('express');
const app = express();
const router = express.Router();

//GET
router.get('/', (req, res) =>{
    res.send('APP IS RUNNING...');
});

router.post('/add', (req, res) =>{
    res.send('New record added');
});

//Available Routes
app.use('/.netlify/functions/server', router);
module.exports.handler = serverless(app);

