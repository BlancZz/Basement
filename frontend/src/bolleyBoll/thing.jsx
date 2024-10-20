'use client';
import React from 'react';
import { ThemeContext } from '../ThemeContext';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

const Lover = () => {
  const navigate = useNavigate();
  // const { mode } = useTheme();

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
    ></Box>
  );
};

export default Lover;
