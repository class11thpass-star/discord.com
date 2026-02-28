const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    const imagePath = path.join(__dirname, '../public/malicious.png');

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.setHeader('Content-Type', 'image/png');
    res.sendFile(imagePath);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      details: error.message
    });
  }
};
