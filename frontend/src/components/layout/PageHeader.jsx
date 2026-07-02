import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

const PageHeader = ({ title, subtitle, badge, actions }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: { xs: 'flex-start', sm: 'center' },
      flexWrap: 'wrap',
      gap: 2,
      pb: 1,
      borderBottom: '1px solid #f1f5f9',
    }}
  >
    <Box sx={{ minWidth: 0, flex: 1 }}>
      <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" sx={{ gap: 1 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: 'text.primary',
            fontSize: { xs: '1.35rem', sm: '1.625rem' },
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        {badge && <Box sx={{ display: 'inline-flex' }}>{badge}</Box>}
      </Stack>
      {subtitle && (
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mt: 0.75,
            fontSize: { xs: '0.8rem', sm: '0.85rem' },
            fontWeight: 500,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
    {actions && (
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        flexShrink={0}
        sx={{
          width: { xs: '100%', sm: 'auto' },
          justifyContent: { xs: 'flex-start', sm: 'flex-end' },
        }}
      >
        {actions}
      </Stack>
    )}
  </Box>
);

export default PageHeader;
