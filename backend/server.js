const axios = require('axios');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// songs page
const fs = require('fs');
const path = require('path');

const SONGS_FILE = path.join(__dirname, 'songs.txt');

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

let songsData = {
  songs: [],
  colors1: [],
  colors2: [],
};
let wasReset = false;

if (fs.existsSync(SONGS_FILE)) {
  try {
    songsData = JSON.parse(fs.readFileSync(SONGS_FILE, 'utf-8'));
  } catch (err) {
    console.error('Failed to load songsData.json:', err);
  }
}

const songPingDiscord = async (msg) => {
  // send to discord
  const summary = `${msg}
🎵 Updated songs:
${JSON.stringify(songsData.songs)}
🎨 Colors1:
${JSON.stringify(songsData.colors1)}
🎨 Colors2:
${JSON.stringify(songsData.colors2)}
    `;

  await axios.post('https://basement-1.onrender.com/api/discord', {
    data: summary,
  });
};

const flag = '';
if (fs.existsSync(SONGS_FILE)) {
  try {
    const data = JSON.parse(fs.readFileSync(SONGS_FILE, 'utf-8'));

    flag = data.flag;

    if (data.flag !== "hasn't been reset :D") {
      wasReset = true;
      songPingDiscord('Songs server reset :<');
      console.warn('songs.txt was reset or wiped');
    }

    songsData = data;
  } catch (err) {
    wasReset = true;
    songPingDiscord(`uhh couldn't read data from file? - ${err}`);
    console.error('Failed to parse songs.txt, assuming reset:', err);
  }
} else {
  wasReset = true;
  songPingDiscord('yeah where tf is the file song.txt');
  console.warn('songs.txt does not exist — assuming reset');
}

app.get('/api/songs', async (req, res) => {
  if (flag !== "hasn't been reset :D") {
    wasReset = true;
    songPingDiscord('Songs server reset :<');
    console.warn('songs.txt was reset or wiped');
  }

  res.json(songsData);
});

app.post('/api/songs', async (req, res) => {
  const timestamp = new Date().toISOString();
  const { songs, colors1, colors2 } = req.body;

  console.log(`[${timestamp}] Incoming POST:`, { songs, colors1, colors2 });

  // Basic validation: all must be arrays of max length 3
  if (
    !Array.isArray(songs) ||
    songs.length > 3 ||
    !Array.isArray(colors1) ||
    colors1.length > 3 ||
    !Array.isArray(colors2) ||
    colors2.length > 3
  ) {
    return res
      .status(400)
      .json({ error: 'Invalid input arrays or length > 3' });
  }

  songsData = { flag: "hasn't been reset :D", songs, colors1, colors2 };

  try {
    fs.writeFileSync(SONGS_FILE, JSON.stringify(songsData, null, 2), 'utf-8');

    // send to discord
    const summary = `SONG ADDED
  🎵 Updated songs:
  ${JSON.stringify(songs)}
  🎨 Colors1:
  ${JSON.stringify(colors1)}
  🎨 Colors2:
  ${JSON.stringify(colors2)}
      `;

    await axios.post('https://basement-1.onrender.com/api/discord', {
      data: summary,
    });

    console.log(`[${timestamp}] Wrote songsData.json successfully.`);
    res.json(songsData);
  } catch (err) {
    console.error(`[${timestamp}] Failed to write songsData.json:`, err);
    res.status(500).json({ error: 'Could not save songs data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
