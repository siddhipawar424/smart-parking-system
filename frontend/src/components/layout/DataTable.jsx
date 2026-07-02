import React from 'react';
import { Box, TableContainer, Paper } from '@mui/material';

const DataTable = ({ children, sx, ...props }) => (
  <Box
    sx={{
      width: '100%',
      borderRadius: 2,
      overflow: 'hidden',
      border: '1px solid #e2e8f0',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
      ...sx,
    }}
    {...props}
  >
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        width: '100%',
        overflowX: 'auto',
        borderRadius: 0,
        boxShadow: 'none',
        backgroundColor: 'transparent',
      }}
    >
      {children}
    </TableContainer>
  </Box>
);

export default DataTable;
