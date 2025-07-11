import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import BrowserBackground from './BrowserBackground.svg';
import BrowserWindow from './components/BrowserWindow';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import CardMedia from '@mui/material/CardMedia';
import NavBar from './NavBar';
import { useTheme } from './ThemeContext';

function Dashboard() {
  const navigate = useNavigate();
  const { mode } = useTheme();

  const [popOpen, setPopOpen] = useState(false);

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

  React.useEffect(() => {
    const clockInterval = setInterval(() => {
      setClock(clocks[clockIndex]);
      setClockIndex((clockIndex + 1) % 12);
    }, 1000);

    return () => clearInterval(clockInterval);
  }, [clockIndex]);

  return (
    <>
      <NavBar />
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          padding: '1rem',
          paddingTop: '5rem',
          bgcolor: mode === 'light' ? '#eabef3' : '#54418d',
        }}
        className="w-full h-full d-flex flex-column align-items-center"
      >
        <Box
          sx={{
            width: '100vw',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <BrowserWindow value="2">
            <Card
              id="dashboard-form"
              className="d-flex justify-content-center align-items-center"
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                navigate('/confess');
              }}
            >
              <img
                style={{
                  maxWidth: '100%',
                  overflow: 'hidden',
                }}
                sx={{ overflow: 'hidden' }}
                src={require('./assets/plsplsplsCard3.png')}
                alt="confess"
              />
            </Card>
          </BrowserWindow>
          <BrowserWindow value="3">
            <Card
              id="dashboard-form"
              className="d-flex justify-content-center align-items-center"
              onClick={() => {
                navigate('/Quotes');
              }}
              sx={{ cursor: 'pointer' }}
            >
              <img
                id="popCard"
                style={{
                  maxWidth: '100%',
                  overflow: 'hidden',
                }}
                onMouseEnter={() => {
                  setPopOpen(true);
                }}
                onMouseLeave={() => {
                  setPopOpen(false);
                }}
                src={
                  popOpen
                    ? require('./assets/popQuoteCardOpen.png')
                    : require('./assets/popQuoteCardClosed.png')
                }
                alt="PopQuote"
              />
            </Card>
          </BrowserWindow>

          <BrowserWindow value="2">
            <Card
              id="dashboard-form"
              onClick={() => {
                navigate('/Timer');
              }}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                height: '100%',
                width: '100%',
                backgroundColor: '#abbaaf',
                color: '#abbaaf',
                border: 1,
                borderColor: '#fff',
                fontSize: '7rem',
              }}
            >
              {clock}
              {/* <img
                style={{
                  maxWidth: '100%',
                  overflow: 'hidden',
                }}
                sx={{ overflow: 'hidden' }}
                // src={require('./assets/timer.png')}
                alt="timer"
              /> */}
            </Card>
          </BrowserWindow>
        </Box>
        <Box
          sx={{
            width: '100vw',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <BrowserWindow value="0">
            <Card
              id="dashboard-form"
              className="d-flex justify-content-center align-items-center"
              onClick={() => {
                navigate('/Lover');
              }}
              sx={{ cursor: 'pointer' }}
            >
              <img
                style={{
                  maxWidth: '100%',
                  overflow: 'hidden',
                }}
                sx={{ overflow: 'hidden' }}
                src={require('./assets/aitowa.png')}
                alt="Aitowa"
              />
            </Card>
          </BrowserWindow>
          <BrowserWindow value="1">
            <Card
              id="dashboard-form"
              className="d-flex justify-content-center align-items-center"
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                navigate('/Lover');
              }}
            >
              <img
                style={{
                  maxWidth: '100%',
                  overflow: 'hidden',
                }}
                sx={{ overflow: 'hidden' }}
                src={require('./assets/sprockets.png')}
                alt="Sprockets  "
              />
            </Card>
          </BrowserWindow>
          <BrowserWindow value="1">
            <Card
              id="dashboard-form"
              className="d-flex justify-content-center align-items-center"
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                navigate('/WIP');
              }}
            >
              <img
                style={{
                  maxWidth: '100%',
                  overflow: 'hidden',
                }}
                sx={{ overflow: 'hidden' }}
                // src={require('./assets/sprockets.png')}
                alt="wip  "
              />
            </Card>
          </BrowserWindow>
        </Box>

        <footer
          className="position-fixed w-100 text-center p-3 b-0"
          style={{ color: mode === 'dark' ? '#faf0e6' : '#0D0D0D' }}
        >
          &copy; Binco website. All rights reserved.
        </footer>
      </Box>
    </>
  );
}

export default Dashboard;
