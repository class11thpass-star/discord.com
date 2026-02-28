const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const imagePath = path.join(__dirname, '../public/malicious.png');
  res.setHeader('Content-Type', 'image/png');
  res.sendFile(imagePath);
};
