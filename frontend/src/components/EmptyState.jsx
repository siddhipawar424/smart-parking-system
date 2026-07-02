import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

const EmptyState = ({
  title = 'No records found',
  description = 'There are no active records matching this view.',
  actionText,
  onAction,
  icon: CustomIcon,
}) => {
  const IconComponent = CustomIcon || InboxIcon;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: { xs: 8, md: 12 },
        px: 3,
        backgroundColor: '#ffffff',
        borderRadius: 2,
        border: '1.5px dashed #cbd5e1',
        width: '100%',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.02)',
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          p: 2,
          borderRadius: 2,
          bgcolor: 'rgba(79, 70, 229, 0.04)',
          border: '1px solid rgba(79, 70, 229, 0.08)',
          color: 'primary.main',
          mb: 2.5,
        }}
      >
        <IconComponent
          sx={{
            fontSize: 40,
          }}
        />
      </Box>

      <Typography
        variant="h5"
        sx={{ fontWeight: 800, color: 'text.primary', mb: 1, letterSpacing: '-0.02em', fontSize: '1.125rem' }}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          maxWidth: 360,
          lineHeight: 1.6,
          mb: actionText && onAction ? 3 : 0,
        }}
      >
        {description}
      </Typography>

      {actionText && onAction && (
        <Button
          variant="contained"
          onClick={onAction}
          sx={{
            px: 3,
            py: 1,
            fontWeight: 600,
          }}
        >
          {actionText}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
