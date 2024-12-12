import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import ModeSwitch from './components/ModeSwitch';
// import { useTheme } from '@emotion/react';
import { useTheme } from './ThemeContext';

import { motion, useInView, useAnimation, useIsPresent } from 'framer-motion';

// /* <ul>
//   <li><img id='favicon' src="/favicon.ico" alt="logo"></img></li>
//   <li><a href="/dashboard">Dashboard</a></li>
//   <li><a href="/game/math">Math</a></li>
//   <li><a href="contact.asp">Contact</a></li>
//   <li><a href="about.asp">About</a></li>
// </ul> */

const NavBar = () => {
  const navRef = React.useRef(null);

  const isInView = useInView(navRef, { once: true });
  const mainControls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView]);

  const { mode } = useTheme();
  return (
    <div ref={navRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -75,
            position: 'absolute',
            // backgroundColor: mode === 'dark' ? '#35354F' : '#eb78a9',
            height: '4rem',
            width: '100%',
            fontWeight: 'bolder',
            fontSize: '1.1rem',
            zIndex: '10',
            borderBottom: 'thick solid',
            borderColor: mode === 'dark' ? '#4f46e5' : '#e6d7ff',
          },
          visible: {
            opacity: 1,
            y: 0,
            position: 'fixed',
            top: '0',
            // backgroundColor: mode === 'dark' ? '#35354F' : '#eb78a9',
            height: '4rem',
            width: '100%',
            fontWeight: 'bolder',
            fontSize: '1.1rem',
            zIndex: '10',
            borderBottom: 'thick solid',
            borderColor: mode === 'dark' ? '#4f46e5' : '#e6d7ff',
          },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <nav
          ref={navRef}
          class="navbar navbar-expand-lg navbar-dark"
          style={{
            backgroundColor: mode === 'dark' ? '#352D64' : '#FEC5EB',
            height: '5rem',
            width: '100%',
            fontWeight: 'bolder',
            fontSize: '1.1rem',
            // position: 'fixed',
            // top: '0',
            zIndex: '10',
            borderBottom: 'thick solid',
            borderColor: mode === 'dark' ? '#9F7CD7' : '#EE79C6',
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <a
            style={{
              margin: '2rem',
              color: mode === 'light' ? 'black' : 'white',
              fontSize: '2rem',
              letterSpacing: '5px',
            }}
            class="navbar-brand"
            href="#"
          >
            Binco's Basement
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <Link to={'/dashboard'} class="nav-link">
                  Dashboard
                </Link>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">
                  WIP
                </a>
              </li>
            </ul>
          </div>
          <ModeSwitch />
        </nav>
      </motion.div>
    </div>
  );
  // return <nav className="flex">
  //   <div className="box">
  //     <Link to={'/'}>
  //       <img id="favicon" src="/favicon.ico" alt="logo"></img>
  //     </Link>
  //   </div>
  //   <div className="box">
  //     <Link to={'/dashboard'}>
  //       <p id="dashboard-text"><span>Dashboard</span></p>
  //     </Link>
  //   </div>
  //   <div className="box">
  //     <Link to={'/message'}>
  //     <p id="message-text"><span>Message</span></p>
  //     </Link>
  //   </div>
  //   <div className="box">
  //     <Link to={'/game/jump'}>
  //       <p id="whiteboard-text"><span>Whiteboard</span></p>
  //     </Link>
  //   </div>
  //   <div className="box">
  //     <Link to={'/game/wip'}>
  //       <p id="wip-text"><span>uhh WIP</span></p>
  //     </Link>
  //   </div>
  // </nav>
};

export default NavBar;
