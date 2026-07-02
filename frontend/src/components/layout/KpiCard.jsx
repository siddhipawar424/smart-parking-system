import React from 'react';
import { Box, Card, CardContent, Typography, Skeleton } from '@mui/material';

const KpiCard = ({ title, value, icon, color = '#4f46e5', subtitle, loading }) => (
  <Card
    sx={{
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
      border: '1px solid #e2e8f0',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 16px -2px rgba(15, 23, 42, 0.04), 0 4px 6px -2px rgba(15, 23, 42, 0.02)',
        borderColor: '#cbd5e1',
      },
    }}
  >
    <CardContent
      sx={{
        p: 3,
        '&:last-child': { pb: 3 },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontSize: '0.675rem',
              display: 'block',
              mb: 1,
            }}
          >
            {title}
          </Typography>
          
          {loading ? (
            <Skeleton variant="rounded" width="80%" height={32} sx={{ mt: 1, borderRadius: 1 }} />
          ) : (
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: 'text.primary',
                lineHeight: 1.1,
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '1.875rem' },
                letterSpacing: '-0.03em',
              }}
            >
              {value}
            </Typography>
          )}

          {subtitle && !loading && (
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                mt: 1.25,
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        {icon && (
          <Box
            sx={{
              p: 1.25,
              borderRadius: 1.5,
              bgcolor: `${color}0a`, // 6% opacity tint
              color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              border: `1px solid ${color}15`,
            }}
          >
            {React.cloneElement(icon, { sx: { fontSize: 22 } })}
          </Box>
        )}
      </Box>
    </CardContent>
  </Card>
);

export default KpiCard;
