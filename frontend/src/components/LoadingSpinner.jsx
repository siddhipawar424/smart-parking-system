import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        width: '100%',
        p: 4,
      }}
    >
      <CircularProgress color="primary" size={40} />
      {message && (
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', fontWeight: 500 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;
