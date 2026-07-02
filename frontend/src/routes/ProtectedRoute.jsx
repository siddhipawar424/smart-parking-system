import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Box, CircularProgress, Typography } from '@mui/material';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#f5f7fa',
        }}
      >
        <CircularProgress color="primary" size={50} />
        <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary', fontWeight: 500 }}>
          Verifying your session...
        </Typography>
      </Box>
    );
  }

  if (!user) {
    // Redirect to login page but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User is logged in but doesn't have the required role
    // Redirect ADMIN to dashboard and USER to vehicles management
    const redirectPath = user.role === 'ADMIN' ? '/dashboard' : '/vehicles';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
