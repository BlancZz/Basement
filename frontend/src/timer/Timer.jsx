'use client';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { useTheme } from '../ThemeContext';

import Box from '@mui/material/Box';

// import Snackbar from '@mui/material/Snackbar';

const Timer = () => {
  const navigate = useNavigate();
  // const { mode } = useTheme();

  const min = 60;
  const hr = 60 * min;
  const day = 24 * hr;
  const year = 365.25 * day;

  // time at 50ms intervals for sensitive values
  const [time, setTime] = React.useState(0);
  // time at ACCURATE 1s intervals for accuracy on insensitive values
  const [accuracy, setAccuracy] = React.useState(0);

  const bps = 75 / min;
  const breathsPS = 18 / min;
  const blinksPS = 20 / min;
  const birthsPS = 267 / min;
  const deathsPS = 106 / min;
  const earthKMPS = 0.485;
  const sunKMPS = 107000 / hr;
  const milkyKMPS = 828000 / hr;
  const moonAwayNMPS = 37800000 / year;
  const starsBorn = 275000000 / day;
  const aus2020LifeExpS = 83.2 * year;

  const [water, setWater] = React.useState(0);
  const [waterText, setWaterText] = React.useState('');

  const waterTexts = [
    'aha got you to drink water',
    'good job',
    'nice',
    "okay that's enough",
    "yep that's enough",
    "that's enough",
    'alright stop',
    'alright stop',
    'alright stop',
    'please stop',
    'for your sake',
    'please stop for your sake',
    "you're clicking this without actually drinking aren't you",
    "why're you doing this",
    "there's no prize",
    'stop',
    'stop it',
    'cease',
    'halt',
    '...',
    '...',
    '...',
    '...',
    '...',
    '...',
    '...',
    'will you stop if I give you a prize?',
    'okay last message for real then',
    "congrats you psycho, here's a medal 🥇",
    "congrats you psycho, here's a medal 🥇",
  ];

  const waters = [
    '🚱',
    '💧',
    '💧💧',
    '💧💧💧',
    '💦',
    '💦',
    '💦',
    '🥤',
    '🥤',
    '🥤',
    '🥛',
    '🥛',
    '🥛',
    '🧃',
    '🧃',
    '🧃',
    '🏊‍♀️',
    '🏊‍♀️',
    '🏊‍♀️',
    '🏊‍♀️',
    '🌊',
    '🌊',
    '🌊',
    '🌊',
    '🌊',
    '🌊',
    '🌊',
    '🤨',
    '🤨',
    '🏆',
  ];

  const [clockIndex, setClockIndex] = React.useState(0);
  const [clock, setClock] = React.useState('🕛');
  const clocks = [
    '🕛',
    '🕐',
    '🕑',
    '🕒',
    '🕓',
    '🕔',
    '🕕',
    '🕖',
    '🕗',
    '🕘',
    '🕙',
    '🕚',
  ];

  const heart = '💝';
  const exhale = '😮';
  const inhale = '😐';
  const air = '💨';
  const blink = '😑';
  const baby = '👶';
  const coffin = '⚰️';
  const angel = '👼';

  const earths = ['🌎', '🌏', '🌍'];

  const [moon, setMoon] = React.useState('🌑');
  const [moonIndex, setMoonIndex] = React.useState(0);
  const moons = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];

  const sun = '☀️';
  const milkyWay = '🌌';
  const stars = ['⭐', '✨', '🌠'];

  const sandglass = '⏳';
  const ages = ['👶', '👦', '🧑', '👨', '👨‍🦳', '👴'];

  const [scrollPosition, setScrollPosition] = React.useState(window.scrollY);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  React.useEffect(() => {
    const countdownInterval = setInterval(() => {
      // seemingly random added time is used to adjust for innacurate interval additions
      // 0.05 when computer runs perfectly at no delay
      setTime(time + 0.06518);

      setMoon(moons[moonIndex]);
      setMoonIndex((moonIndex + 1) % 8);
    }, 50);

    return () => clearInterval(countdownInterval);
  }, [time]);

  React.useEffect(() => {
    const clockInterval = setInterval(() => {
      setClock(clocks[clockIndex]);
      setClockIndex((clockIndex + 1) % 12);
      setAccuracy(accuracy + 1);
    }, 1000);

    return () => clearInterval(clockInterval);
  }, [clockIndex]);

  return (
    <Box
      sx={{
        backgroundColor: '#abbaaf',
        // width: '100vw',
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'column',
        // backgroundColor: mode !== 'dark' ? '#faf0e6' : '#0D0D0D',
        fontSize: '1.5rem',
      }}
    >
      <Box
        id="opacity-banner"
        sx={{
          paddingTop: '2rem',
          height: '40vh',
          width: '100vw',
          display: 'flex',
          position: 'fixed',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          fontSize: '1.75rem',
          fontWeight: 'bold',
        }}
      >
        <Box
          sx={{
            position: 'fixed',
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
          <span class="owText text-center">Timer</span>
        </Box>
        <h1>Since you've clicked on this page</h1>
        {/* clock */}
        <Box
          sx={{
            display: scrollPosition < 225 ? 'in-line' : 'none',
            fontSize: '9rem',
          }}
        >
          {clock}
        </Box>
        {/* heart beat */}
        <Box
          sx={{
            display:
              (scrollPosition >= 225) & (scrollPosition < 650)
                ? 'in-line'
                : 'none',
            fontSize: '9rem',
          }}
        >
          <Box class="heart-timer">{heart}</Box>
        </Box>
        {/* breaths */}
        <Box
          sx={{
            display:
              (scrollPosition >= 650) & (scrollPosition < 1025)
                ? 'in-line'
                : 'none',
            fontSize: '9rem',
          }}
        >
          {/* inhale */}
          <Box
            sx={{
              display: Math.floor(time) % 2 === 0 ? 'flex' : 'none',
            }}
          >
            <Box>{inhale}</Box>
            <Box
              sx={{
                transform: 'scale(-1, 1)',
              }}
            >
              <Box class="air-timer" id="air-timer-flip">
                {air}
              </Box>
            </Box>
          </Box>

          {/* exhale */}
          <Box
            sx={{
              display: Math.floor(time) % 2 === 1 ? 'flex' : 'none',
            }}
          >
            <Box>{exhale}</Box>
            <Box class="air-timer">{air}</Box>
          </Box>
        </Box>
        {/* blink */}
        <Box
          sx={{
            display:
              (scrollPosition >= 1025) & (scrollPosition < 1400)
                ? 'in-line'
                : 'none',
            fontSize: '9rem',
          }}
        >
          {/* open */}
          <Box
            sx={{
              display: time % 3 >= 0.1 && time % 5 >= 0.1 ? 'flex' : 'none',
            }}
          >
            <Box>{inhale}</Box>
          </Box>

          {/* closed */}
          <Box
            sx={{
              display: time % 3 < 0.1 || time % 5 < 0.1 ? 'flex' : 'none',
            }}
          >
            <Box>{blink}</Box>
          </Box>
        </Box>
        {/* baby */}
        <Box
          sx={{
            display:
              (scrollPosition >= 1400) & (scrollPosition < 1775)
                ? 'flex'
                : 'none',
            fontSize: '9rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box id="baby">{baby}</Box>
        </Box>
        {/* deaths */}
        <Box
          sx={{
            display:
              (scrollPosition >= 1775) & (scrollPosition < 2150)
                ? 'flex'
                : 'none',
            fontSize: '9rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
            }}
          >
            <Box id="y">
              <Box id="x">{angel}</Box>
            </Box>
          </Box>
          {coffin}
        </Box>
        {/* water */}
        <Box
          sx={{
            display:
              (scrollPosition >= 2150) & (scrollPosition < 2650)
                ? 'in-line'
                : 'none',
            fontSize: '9rem',
          }}
        >
          {waters[water]}
        </Box>
        {/* earth */}
        <Box
          sx={{
            display:
              (scrollPosition >= 2650) & (scrollPosition < 3025)
                ? 'in-line'
                : 'none',
            fontSize: '9rem',
          }}
        >
          <Box class="earth-spin">{earths[1]}</Box>
        </Box>
        {/* sun */}
        <Box
          sx={{
            display:
              (scrollPosition >= 3025) & (scrollPosition < 3400)
                ? 'in-line'
                : 'none',
            fontSize: '9rem',
          }}
        >
          <div class="solar-timer">
            <div class="circle">
              <Box
                sx={{
                  fontSize: '3rem',
                  paddingTop: '2rem',
                }}
              >
                {earths[0]}
              </Box>
            </div>
          </div>
          <Box
            sx={{
              position: 'absolute',
            }}
            class="earth"
          >
            <Box>{sun}</Box>
          </Box>
        </Box>
        {/* milky way */}
        <Box
          sx={{
            display:
              (scrollPosition >= 3400) & (scrollPosition < 3775)
                ? 'in-line'
                : 'none',
            fontSize: '9rem',
          }}
        >
          <Box class="galaxy-spin">{milkyWay}</Box>
        </Box>
        {/* moon */}
        <Box
          sx={{
            display:
              (scrollPosition >= 3775) & (scrollPosition < 4150)
                ? 'in-line'
                : 'none',
            fontSize: '9rem',
          }}
        >
          <Box class="moon-spin">{moon}</Box>
        </Box>
        {/* stars */}
        <Box
          sx={{
            display:
              (scrollPosition >= 4150) & (scrollPosition < 4525)
                ? 'flex'
                : 'none',
            flexDirection: 'column',
            fontSize: '2rem',
            marginTop: '1.5rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Box class="star-timer1">{stars[0]}</Box>
            <Box class="star-timer3">{stars[1]}</Box>
            <Box class="star-timer2">{stars[0]}</Box>
            <Box class="star-timer3">{stars[0]}</Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Box class="star-timer3">{stars[0]}</Box>
            <Box class="star-timer2">{stars[0]}</Box>
            <Box class="star-timer3">{stars[1]}</Box>
            <Box class="star-timer1">{stars[0]}</Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Box class="star-timer2">{stars[1]}</Box>
            <Box class="star-timer3">{stars[2]}</Box>
            <Box class="star-timer1">{stars[0]}</Box>
            <Box class="star-timer2">{stars[1]}</Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Box class="star-timer2">{stars[0]}</Box>
            <Box class="star-timer1">{stars[0]}</Box>
            <Box class="star-timer3">{stars[1]}</Box>
            <Box class="star-timer1">{stars[0]}</Box>
          </Box>
        </Box>
        {/* time monologue */}
        <Box
          sx={{
            display:
              (scrollPosition >= 4525) & (scrollPosition < 5275)
                ? 'in-line'
                : 'none',
            fontSize: '9rem',
          }}
        >
          <Box class="sandglass-timer">{sandglass}</Box>
        </Box>
        {/* life */}
        <Box
          sx={{
            display:
              (scrollPosition >= 5275) & (scrollPosition < 6100)
                ? 'flex'
                : 'none',
            justifyContent: 'space-around',
            alignItems: 'center',
            fontSize: '4rem',
            marginTop: '4.5rem',
            marginBottom: '3rem',
          }}
        >
          <Box class="jump-timer1">{ages[0]}</Box>
          <Box class="jump-timer2">{ages[1]}</Box>
          <Box class="jump-timer3">{ages[2]}</Box>
          <Box class="jump-timer4">{ages[3]}</Box>
          <Box class="jump-timer5">{ages[4]}</Box>
          <Box class="jump-timer5">{ages[5]}</Box>
        </Box>
        {/* end */}
        <Box
          sx={{
            display: scrollPosition >= 6100 ? 'in-line' : 'none',
            fontSize: '4rem',
          }}
        >
          <Box>
            {Math.floor(accuracy / day) > 0
              ? Math.floor(accuracy / day) > 0
              : ''}
            {(accuracy >= day) & (accuracy < 2 * day)
              ? ' day '
              : accuracy >= 2 * day
              ? ' days '
              : ''}
            {Math.floor(accuracy / hr) % 24 > 0
              ? Math.floor(accuracy / hr) % 24
              : ''}
            {(accuracy >= hr) & (accuracy < 2 * hr)
              ? ' hour '
              : accuracy >= 2 * hr
              ? ' hours '
              : ''}
            {Math.floor(accuracy / min) % 60 > 0
              ? Math.floor(accuracy / min) % 60
              : ''}
            {(accuracy >= min) & (accuracy < 2 * min)
              ? ' minute '
              : accuracy >= 2 * min
              ? ' minutes '
              : ''}
            {accuracy % min} seconds have passed
          </Box>
        </Box>
        {/* <Box sx={{ fontSize: '1rem' }}>{scrollPosition}</Box> */}
      </Box>

      <Box
        sx={{
          marginTop: '40vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box class="timer-text">
          {accuracy} seconds have passed
          {/* {Math.floor(time)} */}
        </Box>
        <Box class="timer-text">
          your heart has beat {Math.floor(time * bps)} times
        </Box>
        <Box class="timer-text">
          you've taken {Math.floor(time * breathsPS)} breaths
        </Box>
        <Box class="timer-text">
          you have blinked {Math.floor(time * blinksPS)} times
        </Box>
        <Box class="timer-text">
          {Math.floor(time * birthsPS)} babies have been born
        </Box>
        <Box class="timer-text">
          but {Math.floor(time * deathsPS)} people have also died
        </Box>
        <Box
          class="timer-text"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              marginTop: '1rem',
              marginBottom: '1rem',

              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            you've drank water {water}
            {water >= waterTexts.length - 1 ? '+' : ''} times
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              // width: '20vw',
            }}
          >
            <Box
              sx={{
                backgroundColor: '#8ec985',
                padding: '10px 20px 10px 20px',
                cursor: 'pointer',
                borderRadius: '1rem',
              }}
              onClick={(e) => {
                setWaterText('Wahoo!');
              }}
            >
              true
            </Box>
            <Box
              sx={{
                backgroundColor: '#ff7a7a',
                padding: '10px 20px 10px 20px',
                cursor: 'pointer',
                borderRadius: '1rem',

                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => {
                setWater(Math.min(water + 1, waterTexts.length - 1));
                setWaterText(
                  waterTexts[water].charAt(0).toUpperCase() +
                    waterTexts[Math.min(water, waterTexts.length - 1)].slice(1)
                );
              }}
            >
              false {water !== 0 ? ' again' : ''}
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: '1rem',
              marginBottom: '1rem',
            }}
          >
            {waterText}
          </Box>
        </Box>
        <Box class="timer-text">
          you've rotated {(time * earthKMPS).toFixed(1)}km with the Earth
        </Box>
        <Box class="timer-text">
          you've travelled {Math.floor(time * sunKMPS)}km around the Sun
        </Box>
        <Box class="timer-text">
          you've travelled {Math.floor(time * milkyKMPS)}km around the Milky Way
          galaxy
        </Box>
        <Box class="timer-text">
          the moon has moved {Math.floor(time * moonAwayNMPS)} nanometers away
          from the Earth
        </Box>
        <Box class="timer-text">
          {Math.floor(time * starsBorn)} stars were born in the sky
        </Box>
        <Box class="timer-text">time is passing</Box>
        <Box class="timer-text">
          seconds turn to minutes, minutes to hours, hours to lifetimes
        </Box>
        <Box class="timer-text">
          you've spent {((100 * time) / aus2020LifeExpS).toFixed(8)}% of your
          life here
        </Box>
        <Box class="timer-text">
          stay a while longer, have some fun, that's what time's for
        </Box>
        <Box class="timer-text">for happiness...</Box>
        <Box class="timer-text">for memories...</Box>
        <Box class="timer-text">for wondering what could've been.</Box>
        <Box
          sx={{
            marginTop: '175px',
            marginBottom: '325px',
          }}
        >
          thank you for spending time here, don't forget to spend the rest of
          your time better.
        </Box>
      </Box>
    </Box>
  );
};

export default Timer;
