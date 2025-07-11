import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import SettingsPanel from './SettingsPanel.jsx';
import FakeEqualizer from './FakeEqualizer.jsx';
import Snackbar from './Snackbar.jsx';
import ColorThief from 'colorthief';

import pattern1 from './pattern1.svg';
import pattern2 from './pattern2.svg';
import pattern3 from './pattern3.svg';

import Box from '@mui/material/Box';

const BACKEND_URL = 'https://basement-1.onrender.com/api/songs';
// const BACKEND_URL = 'http://localhost:5000/api/songs'; // for testing

export default function SongWall() {
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);
  const [colors1, setColors1] = useState([]);
  const [colors2, setColors2] = useState([]);
  const [locked, setLocked] = useState([false, false, false]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(BACKEND_URL);
        const fetchedSongs = res.data.songs || [];
        const fetchedColors1 = res.data.colors1 || [];
        const fetchedColors2 = res.data.colors2 || [];

        setSongs(fetchedSongs);
        setColors1(fetchedColors1);
        setColors2(fetchedColors2);
      } catch (err) {
        console.error('Failed to fetch songs and colors:', err);
        // set fallback defaults here
        setSongs([]);
        setColors1([]);
        setColors2([]);
      }
    };

    fetchData();
  }, []);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [brightness, setBrightness] = useState(0);

  const replaceWithFIFO = (prev, newItem, locked) => {
    const unlockedIndexes = prev.map((_, i) => i).filter((i) => !locked[i]);
    if (unlockedIndexes.length === 0) return prev;
    const indexToRemove = unlockedIndexes[0];
    const next = prev.filter((_, i) => i !== indexToRemove);
    return [...next, newItem];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.includes('spotify.com') || !getEmbedUrl(input)) {
      setSnackbarMsg('Invalid link! Please enter a valid Spotify link.');
      setSnackbarVisible(true);

      setTimeout(() => {
        setSnackbarVisible(false);
      }, 3000);

      console.log('debugging');
      console.log(songs);
      console.log(colors1);
      console.log(colors2);
      console.log(locked);
      return;
    }

    const lockedIndexes = [];
    let lastUnlockedIndex = 0;
    locked.forEach((locked, index) =>
      locked === true
        ? lockedIndexes.push(index)
        : (lastUnlockedIndex = Math.max(lastUnlockedIndex, index))
    );

    if (lockedIndexes.length === songs.length || lastUnlockedIndex === -1) {
      setSnackbarMsg('All songs are locked! Unlock one to add a new track.');
      setSnackbarVisible(true);

      setTimeout(() => {
        setSnackbarVisible(false);
      }, 3000);

      return;
    }

    try {
      const imageUrl = await fetchSpotifyOGImage(input);
      const hexColors = await getColorsFromImage(imageUrl);

      const updatedSongs = replaceWithFIFO(songs, input, locked);
      const updatedColors1 = replaceWithFIFO(colors1, hexColors[0], locked);
      const updatedColors2 = replaceWithFIFO(colors2, hexColors[1], locked);

      setSongs(updatedSongs);
      setColors1(updatedColors1);
      setColors2(updatedColors2);
      setLocked((prev) => replaceWithFIFO(prev, false, locked));

      await axios.post(BACKEND_URL, {
        songs: updatedSongs,
        colors1: updatedColors1,
        colors2: updatedColors2,
      });

      setInput('');
    } catch (err) {
      console.error('Submission failed:', err);
      setSnackbarMsg('Something went wrong. Try again!');
      setSnackbarVisible(true);
      setTimeout(() => setSnackbarVisible(false), 3000);
    }
  };

  const getEmbedUrl = (url) => {
    const match = url.match(/track\/(\w+)/);
    return match ? `https://open.spotify.com/embed/track/${match[1]}` : null;
  };

  // const getTrackId = (url) => {
  //   const match = url.match(/track\/([a-zA-Z0-9]+)/);
  //   return match ? match[1] : null;
  // };

  // const getAlbumImageUrl = (trackId) => `https://i.scdn.co/image/${trackId}`;

  const fetchSpotifyOGImage = async (trackUrl) => {
    const res = await fetch(`https://open.spotify.com/oembed?url=${trackUrl}`);
    const data = await res.json();
    return data.thumbnail_url;
  };

  const getColorsFromImage = (imgUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = imgUrl;

      img.onload = () => {
        try {
          const colorThief = new ColorThief();
          const palette = colorThief.getPalette(img, 2); // 2 dominant colors
          const hex = palette.map(
            (rgb) =>
              `#${rgb.map((x) => x.toString(16).padStart(2, '0')).join('')}`
          );
          resolve(hex);
        } catch (err) {
          reject(err);
        }
      };

      img.onerror = reject;
    });
  };

  const bgPatterns = [pattern1, pattern2, pattern3];
  const columnColors = ['#D8A7B1', '#A3B18A', '#7A9E9F'];

  const hexToRgba = (hex, alpha) => {
    if (!hex) {
      return;
    }
    const match = hex.replace('#', '').match(/.{2}/g);
    if (!match) return hex;
    const [r, g, b] = match.map((x) => parseInt(x, 16));
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const [hovered, setHovered] = useState(null);

  const swapColorsAtIndex = (i) => {
    setColors1((prev) => {
      const copy = [...prev];
      const temp = copy[i];
      copy[i] = colors2[i];
      return copy;
    });

    setColors2((prev) => {
      const copy = [...prev];
      copy[i] = colors1[i];
      return copy;
    });
  };

  const titleGradient = [
    colors2[0] || '#D8A7B1',
    colors2[1] || '#7A9E9F',
    colors2[2] || '#7A9E9F',
  ];

  const [mode, setMode] = useState(1);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center p-10 text-white">
      {/* Background stripes, absolute and full screen, behind content */}
      {/* bg-gradient-to-br from-[#1e1e2f] via-[#2d2d44] to-[#1e1e2f] */}
      {/* bg-gradient-to-br from-[#e1e1d0] via-[#d3d3aa] to-[#e1e1d0] */}
      <div className="absolute inset-0 flex bg-gradient-to-br from-[#1e1e2f] via-[#2d2d44] to-[#1e1e2f] h-full pointer-events-auto gap-2 p-1">
        {[0, 1, 2].map((idx) => (
          <div
            key={idx}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            className="bg-opacity-60 transform transition-all duration-1000 ease-in-out"
            style={{
              backgroundColor:
                // idx === 0 ? '#D8A7B1' : idx === 1 ? '#A3B18A' : '#7A9E9F',
                idx === 0
                  ? hexToRgba(colors1 ? colors1[0] : '#D8A7B1', 1) // change opacity if you want, careful of bg blending tho
                  : idx === 1
                  ? colors1[1]
                    ? colors1[1]
                    : '#A3B18A'
                  : colors1[2]
                  ? colors1[2]
                  : '#7A9E9F',
              flexGrow: hovered === null ? 1 : hovered === idx ? 1.5 : 1,
              transitionProperty: 'flex-grow, transform',
            }}
          />
        ))}
      </div>

      <h1
        onClick={() => navigate('/Basement')}
        className="relative text-5xl font-extrabold mb-10 px-6 text-center tracking-tight cursor-pointer transition duration-500 ease-in-out hover:scale-105"
        style={{ position: 'absolute', top: '50px' }}
      >
        <span
          className="bg-clip-text text-transparent transition-all duration-500 hover:brightness-125"
          style={{
            backgroundImage: `linear-gradient(135deg, ${titleGradient.join(
              ', '
            )})`,
            backgroundSize: '200% 200%',
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.7)',
          }}
        >
          🎶 Communal Spotify Wall 🎵
        </span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="z-10 flex gap-4 mb-8 w-full max-w-xl"
        style={{ position: 'absolute', top: '125px' }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste Spotify track link"
          className="px-4 py-2 rounded-lg text-black flex-1 focus:outline-none shadow-md"
        />
        <button
          type="submit"
          className="z-10 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold shadow-md"
        >
          Submit
        </button>
      </form>

      <Snackbar
        visible={snackbarVisible}
        message={snackbarMsg}
        onClose={() => setSnackbarVisible(false)}
      />

      <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">
        {songs.map((url, i) => {
          const embedUrl = getEmbedUrl(url);
          const bgColor = hexToRgba(
            columnColors ? colors2[i % 3] : '#ffffff',
            0.6
          );
          // const bgImage = bgPatterns[i % 3];

          return embedUrl ? (
            <div key={i} className="flex flex-col items-center gap-2">
              <div
                key={i}
                className={`bg-cover bg-center rounded-xl p-4 transform transition duration-300 hover:scale-105 shadow-2xl border border-white/10 cursor-pointer`}
                // style={{ backgroundImage: `url(${bgImage})` }}
                style={{ backgroundColor: bgColor }}
              >
                <iframe
                  title={'frame ' + i}
                  src={embedUrl}
                  width="100%"
                  height="152"
                  allow="encrypted-media"
                  className="rounded-lg shadow-md"
                />

                <div className="mt-4 flex justify-center gap-2">
                  <button
                    onClick={() => swapColorsAtIndex(i)}
                    className="w-5 h-5 rounded-full border-2 border-white shadow-md hover:scale-110 hover:border-blue-400 transition-all"
                    style={{ backgroundColor: colors1[i] }}
                    title="Current background color"
                  ></button>
                  <button
                    onClick={() => swapColorsAtIndex(i)}
                    className="w-5 h-5 rounded-full border-2 border-white shadow-md hover:scale-110 hover:border-blue-400 transition-all"
                    style={{ backgroundColor: colors2[i] }}
                    title="Alternate color"
                  ></button>
                </div>
              </div>
              <button
                onClick={() => {
                  const updated = [...locked];
                  updated[i] = !updated[i];
                  setLocked(updated);
                }}
                className={`group mt-6 px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 shadow-md backdrop-blur-sm
    ${
      locked[i]
        ? 'bg-red-500/30 hover:bg-red-500/50'
        : 'bg-green-500/30 hover:bg-green-500/50'
    }
  `}
              >
                <span className="text-white text-sm">
                  {locked[i] ? 'Locked' : 'Unlocked'}
                </span>
                <span
                  className={`transition-transform duration-500 text-lg ${
                    locked[i] ? 'rotate-0' : 'rotate-180 scale-110'
                  }`}
                >
                  {locked[i] ? '🔒' : '🔓'}
                </span>
              </button>
            </div>
          ) : null;
        })}
      </div>
      <div style={{ position: 'absolute', bottom: '25px' }}>
        <FakeEqualizer colors={colors2} mode={mode} brightness={brightness} />
      </div>
      <SettingsPanel
        colors={colors2}
        mode={mode}
        setMode={setMode}
        brightness={brightness}
        setBrightness={setBrightness}
      />
    </div>
  );
}
