import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useTheme } from '../ThemeContext';

const BrowserWindow = ({ value, children }) => {
  const { mode } = useTheme();

  return (
    <Box
      sx={{
        bgcolor: mode === 'light' ? 'white' : '#4F4686',
        minWidth: '25rem',
        // width: '35rem',
        minHeight: '10rem',
        borderRadius: '1rem',
        border: `2px solid ${mode === 'light' ? '#EE79C6' : '#9F7CD7'}`,
        overflow: 'hidden',
        filter: 'drop-shadow(rgba(0,0,0,0.3) 16px 16px)',
        boxSizing: 'border-box',
        transition: '0.5s ease',
        margin: '3rem',
        '&:hover': {
          filter: 'drop-shadow(rgba(0,0,0,0.3) 0px 0px)',
          transform: 'translateX(16px) translateY(16px)',
        },
      }}
    >
      <Box
        sx={{
          height: '2.5rem',
          bgcolor: mode === 'light' ? '#FEC5EB' : '#352D64',
          borderBottom: `2px solid ${mode === 'light' ? '#EE79C6' : '#9F7CD7'}`,
          display: 'flex',
          alignItems: 'center',
          pl: '1rem',
          boxSizing: 'border-box',
        }}
      >
        {parseInt(value) >= 1 ? (
          <FavoriteIcon
            sx={{ color: mode === 'light' ? '#EE79C6' : '#9F7CD7' }}
          />
        ) : (
          <FavoriteBorderIcon
            sx={{ color: mode === 'light' ? '#EE79C6' : '#9F7CD7' }}
          />
        )}

        {parseInt(value) >= 2 ? (
          <FavoriteIcon
            sx={{ color: mode === 'light' ? '#EE79C6' : '#9F7CD7' }}
          />
        ) : (
          <FavoriteBorderIcon
            sx={{ color: mode === 'light' ? '#EE79C6' : '#9F7CD7' }}
          />
        )}

        {parseInt(value) >= 3 ? (
          <FavoriteIcon
            sx={{ color: mode === 'light' ? '#EE79C6' : '#9F7CD7' }}
          />
        ) : (
          <FavoriteBorderIcon
            sx={{ color: mode === 'light' ? '#EE79C6' : '#9F7CD7' }}
          />
        )}
      </Box>
      <Box
        sx={{
          height: 'calc( 100% - 2.5rem )', //find a better way for this
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default BrowserWindow;
