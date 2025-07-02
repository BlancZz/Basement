// import React, { useContext, useState } from 'react';
// import './style.css';
// // import useMouse from '@react-hook/mouse-position';
// import { useMouse } from '@uidotdev/usehooks';
// import Box from '@mui/material/Box';

// import Bee from './Bee.png';
// import BeeCrown from './BeeCrown.png';

// const CursorFollow = () => {
//   // const ref = React.useRef(null)
//   // const mouse = useMouse(ref, {
//   //   enterDelay: 100,
//   //   leaveDelay: 100,
//   // });
//   // const [mouse, ref] = useMouse();
//   const [BeeX, setBeeX] = useState(0);
//   const [BeeY, setBeeY] = useState(0);

//   const secondaryCursor = React.useRef(null);
//   const mainCursor = React.useRef(null);
//   const positionRef = React.useRef({
//     mouseX: 0,
//     mouseY: 0,
//     destinationX: 0,
//     destinationY: 0,
//     distanceX: 0,
//     distanceY: 0,
//     key: -1,
//   });

//   React.useEffect(() => {
//     document.addEventListener('mousemove', (event) => {
//       const { clientX, clientY } = event;

//       const mouseX = clientX;
//       const mouseY = clientY;

//       positionRef.current.mouseX =
//         mouseX - secondaryCursor.current.clientWidth * 0.01;
//       positionRef.current.mouseY =
//         mouseY - secondaryCursor.current.clientHeight * 0.01;
//       // mainCursor.current.style.transform = `translate3d(${
//       //   mouseX - mainCursor.current.clientWidth * 0.5
//       // }px, ${mouseY - mainCursor.current.clientHeight * 0.5}px, 0)`;
//       setBeeX(mouseX);
//       setBeeY(mouseY);

//       // mainCursor.current.style.transform = `translate3d(10px, 10px, 0)`;

//       // mainCursor.current.style.transform = `translate3d(${
//       //   mouseX - mainCursor.current.clientWidth * 0.5
//       // }px, ${mouseY - mainCursor.current.clientHeight * 0.5}px, 0)`;
//       console.log(mouseX, mouseY);
//     });

//     return () => {};
//   }, []);

//   React.useEffect(() => {
//     const followMouse = () => {
//       positionRef.current.key = requestAnimationFrame(followMouse);
//       const {
//         mouseX,
//         mouseY,
//         destinationX,
//         destinationY,
//         distanceX,
//         distanceY,
//       } = positionRef.current;

//       if (!destinationX || !destinationY) {
//         positionRef.current.destinationX = mouseX;
//         positionRef.current.destinationY = mouseY;
//       } else {
//         positionRef.current.distanceX = (mouseX - destinationX) * 0.01;
//         positionRef.current.distanceY = (mouseY - destinationY) * 0.01;

//         if (
//           Math.abs(positionRef.current.distanceX) +
//             Math.abs(positionRef.current.distanceY) <
//           0.1
//         ) {
//           positionRef.current.destinationX = mouseX;
//           positionRef.current.destinationY = mouseY;
//         } else {
//           positionRef.current.destinationX += distanceX;
//           positionRef.current.destinationY += distanceY;
//         }
//       }
//       secondaryCursor.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`;
//       // secondaryCursor.current.style.left = `${destinationX}`;
//     };

//     followMouse();
//   }, []);

//   return (
//     <div>
//       {/* <div className={`cursor-wrapper ${type}`}> */}
//       <Box
//         className="main-cursor"
//         ref={mainCursor}
//         sx={{
//           left: BeeX,
//           top: BeeY,
//         }}
//       >
//         {/* <div className="main-cursor-background"></div> */}
//         <img
//           src={BeeCrown}
//           alt="Bee"
//           style={{ transform: 'scaleX(-1)', width: '3rem', height: 'auto' }}
//         />
//         what
//       </Box>
//       <div className="secondary-cursor" ref={secondaryCursor}>
//         {/* <div className="cursor-background"></div> */}
//         <img
//           src={Bee}
//           alt="Bee"
//           style={{ transform: 'scaleX(-1)', width: '3rem', height: 'auto' }}
//         />
//       </div>
//       {/* ; */}
//     </div>
//   );
// };

// export default CursorFollow;
