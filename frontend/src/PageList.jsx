import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import NavBar from './NavBar';

import MessagePage from './components/msger/MessagePage';
// import Landing from './Landing';
import PopQuote from './popQuote/PopQuote';
import Dashboard from './Dashboard';
import Lover from './lover/Lover';
import Thing from './bolleyBoll/thing';
import Confess from './confess/Confess';

// import { ThemeContext } from './ThemeContext';

// import DarkBackground from './assets/DarkBackground.png';
// import LightBackground from './assets/LightBackground.png';
// import { useTheme } from './ThemeContext';
// import Starfield from 'react-starfield';

const PageList = () => {
  // const { mode } = useTheme();

  return (
    <>
      {/* <NavBar /> */}

      {/* <div
        style={{
          // height: '100vh',
          // backgroundImage:
          //   mode === 'dark'
          //     ? `url(${DarkBackground})`
          //     : `url(${LightBackground})`,
          // backgroundSize: 'cover',
          // backgroundRepeat: 'no-repeat',
          // backgroundPosition: 'bottom',
          paddingTop: '4rem',
          backgroundColor: mode !== 'dark' ? '#faf0e6' : '#0D0D0D',
          color: mode === 'dark' ? '#faf0e6' : '#0D0D0D',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '10rem',
        }}
      > */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/PopQuote" element={<Dashboard />} />
        <Route path="/Quotes" element={<PopQuote />} />
        {/* <Route path='/game/math' element={<Maths/>} />*/}
        <Route path="/lover" element={<Lover />} />
        <Route path="/confess" element={<Confess />} />
        <Route path="/thing" element={<Thing />} />
      </Routes>

      {/* </div> */}
    </>
  );
};

export default PageList;
