const axios = require('axios');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🎉 is your backend running? Then you better go catch it! 🏃‍♂️');
});

// app.get('/api/secret', (req, res) => {
//   res.json({ message: process.env.MY_SECRET || 'No secret found' });
// });

app.post('/api/discord', async (req, res) => {
  const { data } = req.body;

  const body = {
    content: 'Message Received',
    tts: false,
    color: 'white',
    embeds: [
      {
        description: data,
      },
    ],
  };

  try {
    await axios.post(process.env.DISCORD_WEBHOOK_URL, body);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to send to Discord:', error.message);
    res.status(500).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
