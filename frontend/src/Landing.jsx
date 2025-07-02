// 'use client';
// import React from 'react';
// // import NavBar from './NavBar';
// import { useNavigate } from 'react-router-dom';
// import Box from '@mui/material/Box';

// // import pop from './assets/pop.png';
// import popAudio1 from './assets/audio/pop1_c.mp3';
// // import popAudio2 from './assets/audio/pop2.mp3';
// import orientalRiff from './assets/audio/orientalRiff.mp3';
// import leFestinAudio from './assets/audio/le-festin.mp3';
// import meowAudio from './assets/audio/meow-1.mp3';
// import achievementAudio from './assets/audio/achievement.mp3';
// import partyblowerAudio from './assets/audio/partyblower.mp3';
// import hornAudio from './assets/audio/horn.mp3';
// // import { useTheme } from './ThemeContext';
// import quotes_file from './quotes.txt';

// import DrawOutlineButton from './components/ui/drawOutlineButton';
// import Modal from './components/ui/modal';

// import Snackbar from '@mui/material/Snackbar';

// import confetti from '../node_modules/canvas-confetti/src/confetti.js';

// const Landing = () => {
//   const navigate = useNavigate();
//   // const { mode } = useTheme();

//   const [mouseDown, setMouseDown] = React.useState(false);
//   // let popVariation = true;

//   const [timer, setTimer] = React.useState(Date.now());
//   const [easterAudio, setEasterAudio] = React.useState();
//   const [spam, setSpam] = React.useState(false);

//   const [achieved, setAchieved] = React.useState([]);
//   const maxAchieve = 7;
//   const [achievement, setAchievement] = React.useState('');

//   const [quotes, setQuotes] = React.useState([]);
//   const [quote, setQuote] = React.useState('Click! (^._.^)ノ');
//   const [seen, setSeen] = React.useState([]);
//   const [seenAll, setSeenAll] = React.useState(false);
//   const [currentPointer, setCurrentPointer] = React.useState(-1);

//   const [numClicks, setNumClicks] = React.useState(0);
//   const [numQuotes, setNumQuotes] = React.useState(0);
//   const [rotate, setRotate] = React.useState(false);

//   function playPop() {
//     if (easterAudio) {
//       console.log('easterAudio popped');
//       if (
//         ((easterAudio.played.length > 0 && easterAudio.played.end(0) >= 2) ||
//           achievement === 'Meow meow') &&
//         !achieved.includes(achievement)
//       ) {
//         snackBarOpen(achievement);
//       } else {
//         easterAudio.play().then(() => {
//           easterAudio.pause();
//         });
//         easterAudio.currentTime = 0;
//         setEasterAudio();
//         console.log('easterAudio stopped');
//       }
//     }

//     if (Date.now() - timer < 200) {
//       new Audio(popAudio1).play();

//       if (Date.now() - timer < 72 && !achieved.includes('Hax')) {
//         setAchievement('What the Autoclicker? Hax?');
//         setAchieved((achieved) => [...achieved, 'Hax']);
//         snackBarOpen('Hax');
//       }

//       if (spam) {
//         setQuote('\\๑_๑/ spam clicks = no quotes');
//       } else {
//         setQuote('/>_<\\ spam clicks = no quotes');
//       }
//       setSpam(!spam);
//     } else {
//       const index = generateQuote();
//       if (index === 0) {
//         const oRiff = new Audio(orientalRiff);
//         oRiff.play();
//         setEasterAudio(oRiff);
//         setAchievement('Dim Sum');
//       } else if (index === 1) {
//         const leFestin = new Audio(leFestinAudio);
//         leFestin.play();
//         setEasterAudio(leFestin);
//         setAchievement('Ratatoullie? Why do they call it that?');
//       } else if (index === 2) {
//         const meow = new Audio(meowAudio);
//         meow.play();
//         setEasterAudio(meow);
//         setAchievement('Meow meow');
//       } else {
//         new Audio(popAudio1).play();
//       }
//     }

//     setTimer(Date.now());
//     setMouseDown(true);
//     setNumClicks(numClicks + 1);
//     if (numClicks === 300 && !achieved.includes('Click Manic')) {
//       setAchievement('Click Manic');
//       setAchieved((achieved) => [...achieved, 'Click Manic']);
//       snackBarOpen('Click Manic');
//     }
//   }

//   React.useEffect(() => {
//     fetch(quotes_file)
//       .then((r) => r.text())
//       .then((text) => {
//         setQuotes(
//           text
//             .split('/')
//             .filter((subArray) => subArray.length > 0)
//             .map((s) => s.replaceAll('\n', ''))
//         );
//       })
//       .then(() => {
//         // function handleKeyDown(e) {
//         //   if (e.repeat) return;
//         //   console.log(e.keyCode);
//         //   if (e.keyCode === 32) {
//         //     playPop();
//         //   } else if (e.keyCode === 39) {
//         //     forwardQuote();
//         //   }
//         // }
//         // function handleKeyUp(e) {
//         //   setMouseDown(false);
//         // }
//         // document.addEventListener('keydown', handleKeyDown);
//         // document.addEventListener('keyup', handleKeyUp);
//         // // Don't forget to clean up
//         // return function cleanup() {
//         //   document.removeEventListener('keydown', handleKeyDown);
//         //   document.removeEventListener('keyup', handleKeyUp);
//         // };
//       });
//   }, []);

//   function generateQuote() {
//     if (seen.length >= quotes.length) {
//       setQuote('Smol brain, no more quotes, contribute quote for us?');
//       if (!achieved.includes('Smol Brain')) {
//         setAchievement('Smol Brain');
//         setAchieved((achieved) => [...achieved, 'Smol Brain']);
//         snackBarOpen('Smol Brain');
//       }
//       setSeenAll(true);
//       setCurrentPointer(seen.length);
//       return -1;
//     }

//     let newInt = -1;
//     do {
//       newInt = Math.floor(Math.random() * quotes.length);
//     } while (seen.includes(newInt));

//     seen.push(newInt);
//     setSeen(seen);
//     setQuote(quotes[newInt]);
//     setCurrentPointer(seen.length - 1);
//     setNumQuotes(numQuotes + 1);

//     console.log(newInt + ': ' + quote);

//     return newInt;
//   }

//   function backwardQuote() {
//     console.log('quote index: ' + currentPointer);

//     setSeenAll(false);
//     if (currentPointer <= 0) {
//       setQuote("can't time travel before the first quote >_<");
//       if (!achieved.includes('Time Traveler')) {
//         setAchievement('Time Traveler');
//         snackBarOpen('Time Traveler');
//       }
//       setCurrentPointer(-1);
//     } else {
//       setQuote(quotes[seen[currentPointer - 1]]);
//       setCurrentPointer(currentPointer - 1);
//     }
//   }

//   function forwardQuote() {
//     console.log('quote index: ' + currentPointer);

//     if (currentPointer === seen.length - 1) {
//       playPop();
//     } else if (currentPointer === quotes.length) {
//       setSeenAll(true);
//     } else {
//       setQuote(quotes[seen[currentPointer + 1]]);
//       setCurrentPointer(currentPointer + 1);
//     }
//   }

//   const [state, setState] = React.useState({
//     open: false,
//     vertical: 'top',
//     horizontal: 'center',
//   });
//   const { vertical, horizontal, open } = state;

//   function snackBarOpen(achievement) {
//     setAchieved(() => [...achieved, achievement]);
//     console.log(achieved);
//     console.log(achievement);

//     if (achieved.length < maxAchieve - 1) {
//       new Audio(achievementAudio).play();
//     } else {
//       new Audio(hornAudio).play();
//     }

//     setState({
//       ...{
//         vertical: 'top',
//         horizontal: 'center',
//       },
//       open: true,
//     });
//   }

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setState({
//       open: false,
//       vertical: 'top',
//       horizontal: 'center',
//     });
//   };

//   return (
//     <body>
//       <div class="wave"></div>
//       <div class="wave"></div>
//       {/* <div class="wave"></div> */}
//       <Box
//         sx={{
//           // backgroundColor: '#fff9c4',
//           height: '100vh',
//           width: '100vw',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           flexDirection: 'column',
//         }}
//       >
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '0rem',
//             left: '0',
//             typography: 'h3',
//             margin: '1rem',
//             marginLeft: '2rem',
//           }}
//           onClick={() => {
//             navigate('/');
//           }}
//         >
//           <span id="popTItle">
//             <p>PopQuote</p>
//           </span>
//         </Box>
//         <Box sx={{ width: 500 }}>
//           <Snackbar
//             anchorOrigin={{ vertical, horizontal }}
//             open={open}
//             autoHideDuration={5000}
//             onClose={handleClose}
//             message={achievement + ' Achievement'}
//             key={vertical + horizontal}
//           />
//         </Box>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: 0,
//             left: '15%',
//             margin: '2rem',
//             opacity: '5%',
//             // color: '#448Aff',
//             transition: '0.5s ease',
//             '&:hover': {
//               opacity: '50%',
//             },
//           }}
//         >
//           ( hover title )
//         </Box>
//         <Box
//           sx={{
//             position: 'absolute',
//             bottom: 0,
//             left: 0,
//             margin: '2rem',
//             fontSize: '1.5rem',
//             opacity: '70%',
//           }}
//         >
//           <Box>
//             <Box
//               sx={{
//                 color: achieved.length === maxAchieve ? '#ff5c5c' : 'black',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 cursor: 'pointer',
//                 '&:hover': {
//                   opacity: '90%',
//                   transform: 'scale(1.05)',
//                   transition: 'transform 0.5s ease',
//                 },
//               }}
//               onClick={(e) => {
//                 setRotate(!rotate);
//                 new Audio(partyblowerAudio).play();

//                 if (Date.now() - timer > 200) {
//                   confetti();
//                   setTimer(Date.now());
//                 }
//               }}
//             >
//               <Box
//                 sx={{
//                   display: achieved.length === maxAchieve ? 'in-line' : 'none',
//                   marginRight: '0.5rem',
//                   transform: rotate ? 'rotate(360deg)' : 'rotate(-360deg)',
//                   transition: 'transform 1.25s ease',
//                 }}
//               >
//                 <svg
//                   width="32px"
//                   height="32px"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                   stroke="#ff5c5c"
//                 >
//                   <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//                   <g
//                     id="SVGRepo_tracerCarrier"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   ></g>
//                   <g id="SVGRepo_iconCarrier">
//                     {' '}
//                     <path
//                       fill-rule="evenodd"
//                       clip-rule="evenodd"
//                       d="M12 2.25C10.4812 2.25 9.25 3.48122 9.25 5C9.25 5.78328 9.57756 6.48937 10.1018 6.98967C10.0375 7.10378 9.97102 7.22294 9.90223 7.34628L8.10504 10.5686C7.92732 10.8873 7.82158 11.0749 7.7325 11.2018C7.70459 11.2415 7.68483 11.2655 7.67287 11.2788L7.67118 11.2791C7.65596 11.2695 7.63012 11.2518 7.5918 11.2208C7.47104 11.1231 7.31753 10.9715 7.05879 10.7138L6.97976 10.635C6.6607 10.317 6.37058 10.0279 6.10664 9.79144C6.19926 9.54508 6.25 9.27824 6.25 9C6.25 7.75736 5.24264 6.75 4 6.75C2.75736 6.75 1.75 7.75736 1.75 9C1.75 9.98302 2.3804 10.8188 3.25898 11.1251C3.26199 11.1822 3.26564 11.2399 3.26976 11.298C3.29277 11.6228 3.33458 12.0116 3.38243 12.4564L3.5671 14.1733C3.59705 14.4517 3.62574 14.7289 3.65412 15.0031C3.76616 16.0856 3.87332 17.121 4.03322 17.994C4.1343 18.5459 4.26178 19.0659 4.43833 19.5172C4.61339 19.9648 4.8549 20.3925 5.21187 20.712C5.84173 21.2758 6.60137 21.522 7.50819 21.6381C8.38307 21.75 9.48625 21.75 10.8602 21.75H13.1398C14.5137 21.75 15.6169 21.75 16.4918 21.6381C17.3986 21.522 18.1583 21.2758 18.7881 20.712C19.1451 20.3925 19.3866 19.9648 19.5617 19.5172C19.7382 19.0659 19.8657 18.5459 19.9668 17.994C20.1267 17.1211 20.2338 16.0858 20.3459 15.0034C20.3742 14.7293 20.403 14.4516 20.4329 14.1733L20.6176 12.4565C20.6654 12.0116 20.7072 11.6228 20.7302 11.298C20.7344 11.2399 20.738 11.1822 20.741 11.1251C21.6196 10.8188 22.25 9.98302 22.25 9C22.25 7.75736 21.2426 6.75 20 6.75C18.7574 6.75 17.75 7.75736 17.75 9C17.75 9.27824 17.8007 9.54509 17.8934 9.79145C17.6294 10.0279 17.3393 10.317 17.0202 10.635L16.9412 10.7138C16.6825 10.9715 16.529 11.1231 16.4082 11.2208C16.3699 11.2518 16.344 11.2695 16.3288 11.2791L16.3271 11.2788C16.3152 11.2655 16.2954 11.2415 16.2675 11.2018C16.1784 11.0749 16.0727 10.8873 15.895 10.5686L14.0977 7.34619C14.0289 7.22288 13.9625 7.10375 13.8982 6.98967C14.4224 6.48937 14.75 5.78328 14.75 5C14.75 3.48122 13.5188 2.25 12 2.25ZM10.75 5C10.75 4.30964 11.3096 3.75 12 3.75C12.6904 3.75 13.25 4.30964 13.25 5C13.25 5.48504 12.9739 5.90689 12.5668 6.11457C12.3975 6.20095 12.2056 6.25 12 6.25C11.7944 6.25 11.6025 6.20095 11.4332 6.11457C11.0261 5.90689 10.75 5.48504 10.75 5ZM11.2046 8.09072C11.2857 7.94528 11.3599 7.81229 11.4288 7.69043C11.6133 7.72949 11.8045 7.75 12 7.75C12.1955 7.75 12.3867 7.72949 12.5712 7.69043C12.6401 7.81229 12.7143 7.94528 12.7954 8.09071L14.6016 11.3291C14.7569 11.6077 14.9005 11.8653 15.0399 12.0638C15.1885 12.2753 15.3911 12.5089 15.7015 12.6456C15.9698 12.7637 16.2657 12.8049 16.556 12.7648C16.8918 12.7184 17.1507 12.5495 17.3517 12.3869C17.5403 12.2343 17.7493 12.026 17.9756 11.8006L17.9998 11.7765C18.3752 11.4026 18.6497 11.1315 18.8593 10.9397C18.9792 11.0103 19.1061 11.0701 19.2389 11.1179C19.2374 11.1417 19.2358 11.1664 19.234 11.192C19.2131 11.4865 19.1743 11.8486 19.1249 12.3082L18.9415 14.0129C18.9095 14.3104 18.8794 14.6003 18.8502 14.8822C18.7807 15.553 18.7159 16.178 18.641 16.75H5.35903C5.28409 16.178 5.2193 15.553 5.14978 14.8822C5.12056 14.6003 5.0905 14.3104 5.0585 14.0129L4.87514 12.3082C4.82571 11.8486 4.78687 11.4865 4.76601 11.192C4.7642 11.1664 4.76255 11.1417 4.76107 11.1179C4.89386 11.0701 5.02084 11.0103 5.14066 10.9397C5.35033 11.1315 5.62484 11.4026 6.0002 11.7765L6.02438 11.8006C6.25065 12.026 6.45971 12.2343 6.64834 12.3869C6.84933 12.5495 7.10824 12.7184 7.44397 12.7648C7.73429 12.8049 8.03016 12.7637 8.29846 12.6456C8.60887 12.5089 8.81155 12.2753 8.96009 12.0638C9.09945 11.8653 9.24306 11.6078 9.39842 11.3291L11.2046 8.09072ZM5.61801 18.25C5.68337 18.526 5.75521 18.7662 5.83525 18.9708C5.96405 19.3 6.0962 19.4904 6.21228 19.5943C6.52851 19.8774 6.9509 20.0545 7.69857 20.1502C8.46719 20.2486 9.47421 20.25 10.9121 20.25H13.0879C14.5258 20.25 15.5328 20.2486 16.3014 20.1502C17.0491 20.0545 17.4715 19.8774 17.7877 19.5943C17.9038 19.4904 18.036 19.3 18.1647 18.9708C18.2448 18.7662 18.3166 18.526 18.382 18.25H5.61801ZM3.25 9C3.25 8.58579 3.58579 8.25 4 8.25C4.41421 8.25 4.75 8.58579 4.75 9C4.75 9.18789 4.68188 9.35799 4.56799 9.48982C4.4311 9.64827 4.23192 9.74737 4.00904 9.74995L4 9.75C3.58579 9.75 3.25 9.41421 3.25 9ZM19.25 9C19.25 8.58579 19.5858 8.25 20 8.25C20.4142 8.25 20.75 8.58579 20.75 9C20.75 9.41421 20.4142 9.75 20 9.75L19.991 9.74995C19.7681 9.74737 19.5689 9.64827 19.432 9.48982C19.3181 9.35799 19.25 9.18789 19.25 9Z"
//                       fill="#1C274C"
//                     ></path>{' '}
//                   </g>
//                 </svg>
//               </Box>
//               Achievements: {' ' + achieved.length + '/' + maxAchieve}
//             </Box>
//             <Box>Clicks: {' ' + numClicks}</Box>
//             <Box>Quotes: {' ' + numQuotes}</Box>
//           </Box>
//         </Box>
//         <Box
//           sx={{
//             cursor: 'pointer',
//             textAlign: 'center',
//             fontSize: '2rem',
//             width: '70%',
//           }}
//           onMouseDown={() => {
//             playPop();
//           }}
//           onMouseUp={() => {
//             setMouseDown(false);
//           }}
//         >
//           {/* highlight colour previously bg-yellow-300*/}
//           <div class="selection:bg-[#C3B1E1] font-family: Georgia">{quote}</div>
//         </Box>
//         <Box
//           sx={{
//             margin: '1rem',
//             width: '25%',
//             display: 'flex',
//             position: seenAll ? 'static' : 'absolute',
//             top: 0,
//             right: 0,
//             justifyContent: 'space-around',
//           }}
//         >
//           <Modal />
//           <button
//             onClick={() => {
//               // e.preventDefault();
//               setQuote('ok quotes reset!');
//               setSeen([]);
//               setSeenAll(false);
//               setCurrentPointer(-1);
//               setNumQuotes(0);
//             }}
//             className="px-8 py-0.5 border-2 border-black dark:border-white uppercase bg-white
//               text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)]
//               dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)]
//               transition-all duration-200 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[0px_0px_0px]"
//           >
//             Restart :T
//           </button>
//         </Box>
//         <Box
//           sx={{
//             position: 'absolute',
//             bottom: 0,
//             cursor: 'pointer',
//           }}
//           onMouseDown={() => {
//             playPop();
//           }}
//           onMouseUp={() => {
//             setMouseDown(false);
//           }}
//         >
//           {/* <Button
//             onClick={(e) => {
//               setSeenAll(true);
//             }}
//           >
//             end debugging
//           </Button> */}
//           <img
//             class="popcat"
//             src={
//               mouseDown
//                 ? require('./assets/cat.png')
//                 : require('./assets/pop.png')
//             }
//             width={250}
//             height={250}
//             alt="pop cat"
//           />
//         </Box>
//         <Box
//           sx={{
//             position: 'absolute',
//             left: '5%',
//           }}
//           onClick={() => {
//             backwardQuote();
//           }}
//         >
//           <DrawOutlineButton>
//             <svg
//               fill="#000000"
//               height="50px"
//               width="50px"
//               version="1.1"
//               id="Layer_1"
//               xmlns="http://www.w3.org/2000/svg"
//               xmlnsXlink="http://www.w3.org/1999/xlink"
//               viewBox="0 0 330 330"
//               xmlSpace="preserve"
//               transform="matrix(-1, 0, 0, 1, 0, 0)"
//             >
//               <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//               <g
//                 id="SVGRepo_tracerCarrier"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//               ></g>
//               <g id="SVGRepo_iconCarrier">
//                 {' '}
//                 <path
//                   id="XMLID_27_"
//                   d="M15,180h263.787l-49.394,49.394c-5.858,5.857-5.858,15.355,0,21.213C232.322,253.535,236.161,255,240,255 s7.678-1.465,10.606-4.394l75-75c5.858-5.857,5.858-15.355,0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213,0 c-5.858,5.857-5.858,15.355,0,21.213L278.787,150H15c-8.284,0-15,6.716-15,15S6.716,180,15,180z"
//                 ></path>{' '}
//               </g>
//             </svg>
//           </DrawOutlineButton>
//         </Box>
//         <Box
//           sx={{
//             position: 'absolute',
//             right: '5%',
//           }}
//           onMouseDown={() => {
//             forwardQuote();
//           }}
//           onMouseUp={() => {
//             setMouseDown(false);
//           }}
//         >
//           <DrawOutlineButton>
//             <svg
//               fill="#000000"
//               height="50px"
//               width="50px"
//               version="1.1"
//               id="Layer_1"
//               xmlns="http://www.w3.org/2000/svg"
//               xmlnsXlink="http://www.w3.org/1999/xlink"
//               viewBox="0 0 330 330"
//               xmlSpace="preserve"
//             >
//               <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//               <g
//                 id="SVGRepo_tracerCarrier"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//               ></g>
//               <g id="SVGRepo_iconCarrier">
//                 {' '}
//                 <path
//                   id="XMLID_27_"
//                   d="M15,180h263.787l-49.394,49.394c-5.858,5.857-5.858,15.355,0,21.213C232.322,253.535,236.161,255,240,255 s7.678-1.465,10.606-4.394l75-75c5.858-5.857,5.858-15.355,0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213,0 c-5.858,5.857-5.858,15.355,0,21.213L278.787,150H15c-8.284,0-15,6.716-15,15S6.716,180,15,180z"
//                 ></path>{' '}
//               </g>
//             </svg>
//           </DrawOutlineButton>
//         </Box>
//       </Box>
//     </body>
//   );
// };

// export default Landing;

// // import './App.css';
// // import { React } from 'react';
// // import { BrowserRouter as Router } from 'react-router-dom';
// // import PageList from './PageList';
// // import { ThemeContext } from './ThemeContext';

// // function App() {
// //   return (
// //     <ThemeContext>
// //       <Router>
// //         <PageList />
// //       </Router>
// //     </ThemeContext>
// //   );
// // }

// // export default App;
