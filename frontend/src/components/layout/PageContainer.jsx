import React from 'react';
import { Box } from '@mui/material';

const PageContainer = ({ children, sx, ...props }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 3, // Premium visual gap between elements
      width: '100%',
      maxWidth: 1400, // Balanced widescreen cap
      mx: 'auto',
      px: { xs: 0.5, md: 1, lg: 2 },
      ...sx,
    }}
    {...props}
  >
    {children}
  </Box>
);

export default PageContainer;
