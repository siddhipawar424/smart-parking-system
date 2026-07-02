import React from 'react';
import { Box } from '@mui/material';

const SearchToolbar = ({ children, sx, ...props }) => (
  <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 2,
      alignItems: 'center',
      justifyContent: 'space-between',
      mb: 2,
      width: '100%',
      backgroundColor: '#ffffff',
      p: 2,
      borderRadius: 1.5,
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.02)',
      ...sx,
    }}
    {...props}
  >
    {children}
  </Box>
);

export default SearchToolbar;
