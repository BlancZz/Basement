'use client';
import React from 'react';
import { ThemeContext } from '../ThemeContext';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

import StrengthMeter from '../components/ui/strengthMeter';

import smolHeart from './smolHeart.png';
import Whiteboard from '../components/whiteboard/Whiteboard';

const Lover = () => {
  const navigate = useNavigate();
  // const { mode } = useTheme();

  const [count, setCount] = React.useState(0);
  const [auto, setAuto] = React.useState(0);
  const [multiplier, setMultiplier] = React.useState(1);
  const [x2Cost, setX2Cost] = React.useState(100);
  const [autoCost, setAutoCost] = React.useState(40);

  const createParticle = (x, y) => {
    const heartClicks = document.querySelector('.heart-clicks');

    const particle = document.createElement('img');
    particle.setAttribute('src', require('./smolHeart.png'));
    particle.setAttribute('class', 'heart-particle');
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    const para = document.createElement('p');
    const textNode = document.createTextNode('+' + multiplier);
    para.setAttribute('class', 'heart-particle');
    para.appendChild(textNode);
    para.style.left = x + 30 + 'px';
    para.style.top = y + 'px';
    para.style.color = 'pink';

    heartClicks.appendChild(particle);
    heartClicks.appendChild(para);

    setTimeout(() => {
      heartClicks.removeChild(particle);
      heartClicks.removeChild(para);
    }, 3000);
  };

  const createAuto = () => {
    const cursorContainer1 = document.getElementById('cursor-container-1');
    const cursorContainer2 = document.getElementById('cursor-container-2');

    const cursor = document.createElement('img');
    cursor.setAttribute('src', require('./pointer.png'));
    cursor.setAttribute('class', 'auto');
    cursor.style.width = '3rem';
    cursor.style.height = '3rem';

    if (auto % 2 == 1) {
      cursorContainer1.appendChild(cursor);
    } else {
      cursorContainer2.appendChild(cursor);
    }
  };

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  function snackBarOpen() {
    setState({
      ...{
        vertical: 'top',
        horizontal: 'right',
      },
      open: true,
    });
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setState({
      open: false,
      vertical: 'top',
      horizontal: 'center',
    });
  };

  React.useEffect(() => {
    const id = setTimeout(
      () => {
        setCount(count + 1);
      },
      auto > 0 ? 1000 / auto : 3600000
    );
    return () => clearTimeout(id);
  }, [count, auto]);

  return (
    <Box
      sx={{
        backgroundColor: '#5d79ab',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '50px',
        padding: '20px 0',
      }}
    >
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message={"You're too heartless D:"}
          key={vertical + horizontal}
        />
      </Box>
      <div id="score" class="score">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            top: '20px',
            left: '0',
            typography: 'h4',
            margin: '1rem',
            marginLeft: '2rem',
            cursor: 'pointer',
          }}
          onClick={() => {
            navigate('/Basement');
          }}
        >
          <Box
            sx={{
              marginRight: '1rem',
            }} /*id="heart-title-container"*/
          >
            <svg
              class="heart-title"
              width="64px"
              height="64px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#bfa4fe"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <path
                  d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                  fill="#9b70ff"
                ></path>{' '}
              </g>
            </svg>
          </Box>
          <div
            style={{
              textShadow: '0 0 10px #000',
            }}
            class="main-quote"
          >
            愛とは
          </div>
        </Box>
        <span>{count}</span> hearts
      </div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100vw',
            marginBottom: '1rem',
          }}
        >
          <Box
            id="cursor-container-1"
            sx={{
              display: 'flex',
              flex: 1.5,
              width: '33vw',
              flexWrap: 'wrap',
              height: '240px',
              overflow: 'hidden',
              marginLeft: '2rem',
            }}
          ></Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '33vw',
              flex: 1,
              transform: 'scale(1)',

              '&:active': {
                transition: 'ease-in 0.1s',
                transform: 'scale(0.9)',
              },
            }}
            onClick={(e) => {
              setCount(count + multiplier);
              createParticle(
                e.clientX + Math.floor(Math.random() * 10 - 5) - 8,
                e.clientY
              );
            }}
          >
            <svg
              id="heart"
              class="heart"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ff9999"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <path
                  d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                  fill="#fe6262"
                ></path>{' '}
              </g>
            </svg>
          </Box>
          <Box
            id="cursor-container-2"
            sx={{
              display: 'flex',
              width: '33vw',
              flex: 1.5,
              flexWrap: 'wrap',
              height: '240px',
              overflow: 'hidden',
              marginRight: '2rem',
            }}
          ></Box>
        </Box>
        <StrengthMeter score={count} />
        {/* <img id="heart" class="heart" src="img/heart.png" alt="heart" /> */}
      </Box>

      <div class="auto-clicks disable">
        <h2>Upgrades</h2>
        <div class="cursors"></div>
      </div>
      <div class="powerups">
        <Box
          sx={{
            color: 'white',
          }}
        >
          {auto + ' cps'}
        </Box>
        <div
          class="powerup"
          id="auto-click"
          data-price="40"
          onClick={(e) => {
            if (count >= autoCost) {
              setCount(count - autoCost);
              setAutoCost(Math.floor(autoCost * 1.1));
              setAuto(auto + 1);
              createAuto();
            } else {
              snackBarOpen();
            }
          }}
        >
          <svg
            fill="#000000"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M33 38H21c-.6 0-1-.4-1-1 0-1.5-.7-2.4-1.8-3.8-.6-.7-1.3-1.6-2-2.7-1.9-3-3.6-6.6-4-7.9-.4-1.3-.1-2.2.3-2.7.4-.6 1.2-.9 2.1-.9 1.2 0 2.4 1 3.5 2.3V11c0-1.7 1.3-3 3-3s3 1.3 3 3v4.2c.3-.1.6-.2 1-.2 1.1 0 2 .6 2.5 1.4.4-.3.9-.4 1.4-.4 1.4 0 2.5.9 2.9 2.2.3-.1.7-.2 1.1-.2 1.7 0 3 1.3 3 3v3c0 2.6-.5 4.7-1 6.7s-1 3.9-1 6.3c0 .6-.4 1-1 1zm-11.1-2H32c.1-2.2.6-4 1-5.8.5-2 1-3.9 1-6.2v-3c0-.6-.4-1-1-1s-1 .4-1 1v1c0 .6-.4 1-1 1s-1-.4-1-1v-3c0-.6-.4-1-1-1s-1 .4-1 1v2c0 .6-.4 1-1 1s-1-.4-1-1v-3c0-.6-.4-1-1-1s-1 .4-1 1v2c0 .6-.4 1-1 1s-1-.4-1-1v-9c0-.6-.4-1-1-1s-1 .4-1 1v15c0 .6-.4 1-1 1s-1-.4-1-1v-.8c-.9-2.3-2.8-4.2-3.5-4.2-.2 0-.4 0-.5.1-.1.1-.1.4 0 .9.3 1.1 1.8 4.3 3.8 7.5.6 1 1.2 1.7 1.8 2.5 1.1 1.2 2.1 2.3 2.3 4z"></path>
            </g>
          </svg>
          <p class="name">Auto Click</p>
          <p class="price">
            <span>{autoCost}</span> hearts
          </p>
        </div>
        <div
          id="upgrade-click"
          class="powerup"
          data-price="100"
          onClick={(e) => {
            if (count >= x2Cost) {
              setCount(count - x2Cost);
              setX2Cost(Math.floor(x2Cost * 1.5));
              setMultiplier(multiplier * 2);
            } else {
              snackBarOpen();
            }
          }}
        >
          <svg
            width="101px"
            height="101px"
            viewBox="0 0 32 32"
            enable-background="new 0 0 32 32"
            version="1.1"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#000000"
            transform="rotate(0)"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke="#CCCCCC"
              stroke-width="0.128"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <g id="_x36_0"></g> <g id="_x35_9"></g> <g id="_x35_8"></g>{' '}
              <g id="_x35_7"></g> <g id="_x35_6"></g> <g id="_x35_5"></g>{' '}
              <g id="_x35_4"></g> <g id="_x35_3"></g> <g id="_x35_2"></g>{' '}
              <g id="_x35_1"></g> <g id="_x35_0"></g> <g id="_x34_9"></g>{' '}
              <g id="_x34_8"></g> <g id="_x34_7"></g> <g id="_x34_6"></g>{' '}
              <g id="_x34_5"></g> <g id="_x34_4"></g> <g id="_x34_3"></g>{' '}
              <g id="_x34_2"></g> <g id="_x34_1"></g> <g id="_x34_0"></g>{' '}
              <g id="_x33_9"></g> <g id="_x33_8"></g> <g id="_x33_7"></g>{' '}
              <g id="_x33_6"></g> <g id="_x33_5"></g> <g id="_x33_4"></g>{' '}
              <g id="_x33_3"></g> <g id="_x33_2"></g> <g id="_x33_1"></g>{' '}
              <g id="_x33_0"></g> <g id="_x32_9"></g> <g id="_x32_8"></g>{' '}
              <g id="_x32_7"></g> <g id="_x32_6"></g> <g id="_x32_5"></g>{' '}
              <g id="_x32_4_1_"></g> <g id="_x32_3"></g> <g id="_x32_2"></g>{' '}
              <g id="_x32_1"></g> <g id="_x32_0"></g> <g id="_x31_9"></g>{' '}
              <g id="_x31_8"></g> <g id="_x31_7"></g> <g id="_x31_6"></g>{' '}
              <g id="_x31_5"></g> <g id="_x31_4"></g> <g id="_x31_3"></g>{' '}
              <g id="_x31_2"></g> <g id="_x31_1"></g> <g id="_x31_0"></g>{' '}
              <g id="_x39_"></g> <g id="_x38_"></g> <g id="_x37_"></g>{' '}
              <g id="_x36_"></g> <g id="_x35_"></g> <g id="_x34_"></g>{' '}
              <g id="_x33_"></g>{' '}
              <g id="_x32_">
                {' '}
                <path
                  d="M24,20c0-2.2091389-3-4-3-4l1-10c0-1.1046143-0.8954468-2-2-2s-1.8437843,0.9064875-2,2c-1,7-1,7-1,7 s0,0-2-7c-0.3034611-1.0621133-0.8954468-2-2-2s-2,0.8953857-2,2l1.7476807,9.010498 c-0.5466309-0.9597778-1.7678833-1.2947388-2.7277222-0.7480469c-0.9597778,0.5466919-1.2946777,1.7678833-0.7480469,2.7277222 c0,0-1.37323-0.3686523-2.0836792,0.0359497c-0.9597778,0.5466919-1.2947388,1.7679443-0.7480469,2.7277222l0.9898071,1.737915 C7.9766846,22.4515381,10,23,10,23l2,3v2h10v-2C22,26,24,23,24,20"
                  fill="#ffffff"
                ></path>{' '}
                <path
                  d="M22.0591431,15.4559937L23,6c0-1.6542969-1.3457031-3-3-3 c-1.6279297,0-2.9575195,1.3037109-2.9990234,2.921875l-0.3276978,2.2944946l-0.6771851-2.3701782 C15.9160156,4.2631836,14.6025391,3,13,3c-1.6542969,0-3,1.3457031-3,3c0,0.065918,0.0063477,0.1313477,0.0195313,0.1962891 l1.3678589,6.8399048c-0.6418457-0.0825195-1.2901001,0.0318604-1.8619995,0.3573608 c-0.6967773,0.3964844-1.1967773,1.0405273-1.4086914,1.8134766c-0.0512695,0.1868286-0.0823975,0.3759155-0.097229,0.5649414 c-0.4608765,0.0244751-0.9163208,0.1522827-1.3261108,0.3852539c-1.4375,0.8183594-1.940918,2.6538086-1.1220703,4.0917969 l0.9897461,1.7373047c0.3964844,0.6967773,1.0405273,1.1967773,1.8134766,1.4086914 c0.2547607,0.0703125,0.5137329,0.102417,0.7709961,0.1047363c0.0102539,0.0175781,0.0110474,0.0377808,0.0224609,0.0549316 L11,26.3027344V28c0,0.5522461,0.4477539,1,1,1h6c0.5522461,0,1-0.4477539,1-1s-0.4477539-1-1-1h-5v-1 c0-0.1972656-0.0585938-0.390625-0.1679688-0.5546875l-1.7567139-2.6350708 c0.4740601-0.3900146,0.8200684-0.9106445,0.9857178-1.5148315c0.0522461-0.1905518,0.0846558-0.3833008,0.0990601-0.5759888 c0.4595947-0.0244751,0.9127197-0.1397705,1.3242798-0.3746948c0.3752441-0.2136841,0.6872559-0.5036011,0.9341431-0.8424072 c0.4528809,0.7749023,1.2362671,1.3237915,2.1610107,1.4552002C16.2197876,21.5575562,16,22.2509766,16,23 c0,0.5522461,0.4477539,1,1,1s1-0.4477539,1-1c0-1.1030273,0.8969727-2,2-2c0.5522461,0,1-0.4477539,1-1s-0.4477539-1-1-1 c-0.2282104,0-3,0-3,0c-0.5512695,0-1-0.4487305-1-1v-1h4c1.6542969,0,3,1.3457031,3,3 c0,2.6513672-1.8144531,5.418457-1.8325195,5.4462891C21.0585938,25.6103516,21,25.8032227,21,26v2c0,0.5522461,0.4477539,1,1,1 s1-0.4477539,1-1v-1.7114258C23.512207,25.4462891,25,22.7617188,25,20C25,17.9790039,23.7887573,16.2434692,22.0591431,15.4559937 z M10.1323242,20.7666016c-0.0703125,0.2573242-0.2373047,0.472168-0.4697266,0.6044922 c-0.2319336,0.1318359-0.5029297,0.1669922-0.7592773,0.0952148c-0.2573242-0.0703125-0.472168-0.2373047-0.6044922-0.4697266 L7.309082,19.2592773c-0.2729492-0.4794922-0.1049805-1.0913086,0.3740234-1.3642578 c0.2797852-0.1606445,0.6108398-0.1762695,0.9067383-0.0424805c0.0083008,0.0036621,0.0171509,0.0022583,0.0254517,0.0056763 l0.777771,1.3649292c0.1682739,0.2955322,0.3890991,0.5465088,0.6375122,0.7642822 c0.003479,0.0063477,0.0029297,0.0135498,0.0065308,0.0198975C10.1689453,20.2392578,10.203125,20.5087891,10.1323242,20.7666016z M12.9638672,18.0024414c-0.0708008,0.2578125-0.2373047,0.4726563-0.4697266,0.6049805 c-0.2314453,0.1323242-0.5009766,0.1669922-0.7587891,0.0952148c-0.2578125-0.0708008-0.4726563-0.2373047-0.6044922-0.4697266 l-0.9902344-1.737793c-0.1318359-0.2319336-0.1660156-0.5014648-0.0952148-0.7592773 c0.0703125-0.2573242,0.2373047-0.472168,0.4697266-0.6044922C10.6679688,15.0444336,10.8374023,15,11.0083008,15 c0.0888672,0,0.1782227,0.0117188,0.2661133,0.0361328c0.2573242,0.0703125,0.472168,0.2373047,0.6040039,0.4697266 l0.9897461,1.737793c0.0004883,0,0.0004883,0,0.0004883,0C13.0004883,17.4755859,13.034668,17.7451172,12.9638672,18.0024414z M20.0939941,15.0095215C20.0619507,15.0089111,20.0321655,15,20,15h-5c-0.3577271,0-0.6569824,0.1983643-0.8337402,0.4807739 l-0.3861084-0.6777954L12.003418,5.9179688C12.0454102,5.4047852,12.4760742,5,13,5c0.5512695,0,1,0.4487305,1,1 c0,0.0927734,0.0131836,0.1855469,0.0385742,0.2749023l2,7c0.0012817,0.0045776,0.0075073,0.0059814,0.0090942,0.010376 c0.1088257,0.3612061,0.4129639,0.647583,0.81073,0.7044678c0.5458984,0.0766602,1.0527344-0.3017578,1.1313477-0.8481445l1-7 C18.996582,6.0947266,19,6.0473633,19,6c0-0.5512695,0.4487305-1,1-1s1,0.4487305,1.0048828,0.9003906L20.0939941,15.0095215z"
                  fill="#000000"
                ></path>{' '}
              </g>{' '}
              <g id="_x31_"></g> <g id="Guides"></g>{' '}
            </g>
          </svg>
          <p class="name">x2 Click</p>
          <p class="price">
            <span>{x2Cost}</span> hearts
          </p>
        </div>
        <Box
          sx={{
            color: 'white',
          }}
        >
          {'x ' + multiplier + '/click'}
        </Box>
      </div>
      <div class="heart-clicks"></div>
      <script src="index.js"></script>
    </Box>
  );
};

export default Lover;
