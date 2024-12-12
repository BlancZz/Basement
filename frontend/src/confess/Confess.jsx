'use client';
import React from 'react';
import { ThemeContext } from '../ThemeContext';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

import '../App.css';

const Confess = () => {
  const navigate = useNavigate();
  // const { mode } = useTheme();

  const [gif, setGif] = React.useState(
    'https://media.giphy.com/media/FTGah7Mx3ss04PcasF/giphy.gif'
  );
  const [text, setText] = React.useState('Will you go out with me?');
  const [accepted, setAccepted] = React.useState(false);
  const [rejected, setRejected] = React.useState(false);

  const [initY, setInitY] = React.useState(-1);

  const dateIdeas = [
    'cook dinner together',
    'go for a moonlit walk on the beach',
    'have a picnic in the park',
    'learn a dance together',
    'explore a botanical garden',
    'attend a concert',
    'visit an art gallery',
    'have a sleepover',
    'run a movie marathon night at home',
    // 'Take a scenic train ride',
    'go to a cat cafe',
    'go on a shopping trip together',
    'attend a musical',
    'visit a museum',
    'have a board games night at home',
    'go on a bike ride together',
    'plan a themed dinner night at home',
    'attend a theatre performance',
    'go on a scenic drive',
    'visit a cafe or dessert shop',
    'take an art or ceramics class',
    'do some sports? Sports sports sports? Badminton, volleyball, table tennis, pool',
    'have a karaoke night at home',
    'go on a ferry ride',
    'visit a bookstore (like Kino) and pick out books for each other',
    'visit Taronga Zoo',
    'visit the aquarium',
    'play some coop games',
    'paint together and switch boards every few minutes',
    'crochet together',
    'have an anime/Kdrama marathon night',
    'competitive wii sports',
    'roleplay characters',
  ];

  const handleYesClick = () => {
    if (!accepted) {
      setAccepted(true);
      setText('Yaaaaaaaaaaayyy! See you soon!!');
      setGif('https://media.giphy.com/media/UMon0fuimoAN9ueUNP/giphy.gif');
    } else {
      const randomIndex = Math.floor(Math.random() * dateIdeas.length);
      const selectedDateIdea = dateIdeas[randomIndex];

      alert(`Wanna ${selectedDateIdea}?`);
    }
  };

  const handleNo = (noBtn) => {
    const { width, height, x, y } = noBtn.getBoundingClientRect();

    if (!rejected) {
      setRejected(true);
      setInitY(y);

      const maxX = window.innerWidth - width;
      const maxY = window.innerHeight - height - y;

      noBtn.style.left = `${Math.floor(Math.random() * maxX)}px`;
      noBtn.style.top = `${Math.floor(Math.random() * maxY) - y + height}px`;
      noBtn.style.position = `absolute`;
    } else {
      const maxX = window.innerWidth - width;
      const maxY = window.innerHeight - height;

      noBtn.style.left = `${Math.floor(Math.random() * maxX)}px`;
      noBtn.style.top = `${Math.floor(Math.random() * maxY) - initY}px`;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: 'whitesmoke',
        fontFamily: '"Leckerli One", cursive',
        fontSize: 'large',
        backgroundColor: 'rgb(246, 211, 217)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '0rem',
          left: '0',
          typography: 'h3',
          margin: '1rem',
          marginLeft: '2rem',
          cursor: 'pointer',
        }}
        onClick={() => {
          navigate('/');
        }}
      >
        <span id="confessTItle">
          <p id="confessParagraph">pls pls pls</p>
        </span>
      </Box>
      <div
        class="wrapper"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alighnItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h2
          class="question"
          style={{
            textAlign: 'center',
            fontSize: '1.5em',
            color: '#e94d58',
            margin: ' 15px 0',
            fontFamily: 'Playwrite, cursive',
            fontWeight: 'bold',
          }}
        >
          {text}
        </h2>
        <img class="gif" alt="gif" src={gif} />
      </div>
      <div
        class="btn-group"
        style={{
          width: '100vw',
          height: '50px',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '55px',
        }}
      >
        <Box
          sx={{
            // position: 'absolute',
            width: '150px',
            height: 'inherit',
            fontSize: '1.2em',
            color: 'white',
            borderRadius: '30px',
            outline: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 4px gray',
            border: '2px solid #e94d58',
            backgroundColor: '#e94d58',
            marginRight: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.25s ease',
            transform: 'translateX(-4px) translateY(-4px)',
            '&:hover': {
              width: '150px',
              height: 'inherit',
              fontSize: '1.2em',
              color: 'white',
              borderRadius: '30px',
              outline: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 4px gray',
              border: '2px solid #e94d58',
              background: '#e94d58',
              marginRight: '2rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'all 0.25s ease',
              transform: 'translateX(0px) translateY(0px)',
              boxShadow: '0px 0px 0px #b7f3ff',
            },
          }}
          onClick={(e) => {
            handleYesClick();
          }}
        >
          {accepted ? "Let's go!" : 'Yes'}
        </Box>
        <Box
          sx={{
            // position: 'absolute',
            left: 0,
            width: '150px',
            height: 'inherit',
            fontSize: '1.2em',
            color: 'white',
            borderRadius: '30px',
            outline: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 4px gray',
            border: '2px solid #e94d58',
            background: 'white',
            color: '#e94d58',
            display: accepted ? 'none' : 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.15s ease',
          }}
          onMouseOver={(e) => {
            handleNo(e.target);
          }}
        >
          No
        </Box>
      </div>

      <script src="script.js"></script>
    </Box>
  );
};

export default Confess;
