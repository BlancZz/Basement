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
    <canvas></canvas>
  );
};

export default Lover;
