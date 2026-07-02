import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onLogin = async (data) => {
    setLoading(true);
    const result = await login(data.email, data.password);
    setLoading(false);
    
    if (result.success) {
      toast.success('Logged in successfully!');
      const targetPath = result.user.role === 'ADMIN' ? '/dashboard' : '/vehicles';
      navigate(targetPath, { replace: true });
    } else {
      toast.error(result.error || 'Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.15) 0%, rgba(20, 184, 166, 0.08) 90%), #0f172a',
        p: 2,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(0,0,0,0) 70%)',
          top: '-150px',
          left: '-150px',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, rgba(0,0,0,0) 70%)',
          bottom: '-200px',
          right: '-200px',
        }
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 440,
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box sx={{ p: 4, pb: 0, textAlign: 'center' }}>
          <Box sx={{
            display: 'inline-flex',
            p: 1.75,
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            color: '#ffffff',
            mb: 2.5,
            boxShadow: '0 8px 16px rgba(99, 102, 241, 0.25)'
          }}>
            <LocalParkingIcon sx={{ fontSize: 38 }} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.75, letterSpacing: '-0.02em' }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 3 }}>
            Sign in to access your dashboard settings
          </Typography>
        </Box>

        <CardContent sx={{ p: 4, pt: 1 }}>
          <form onSubmit={handleSubmit(onLogin)} noValidate id="login-form">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                id="login-email"
                label="Email Address"
                type="email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" sx={{ fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }
                }}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />

              <TextField
                fullWidth
                id="login-password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" sx={{ fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end" size="small">
                          {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                }}
                {...register('password', {
                  required: 'Password is required',
                })}
              />

              <Button
                id="login-submit"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  py: 1.75,
                  mt: 1,
                  fontSize: '0.975rem',
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  boxShadow: '0 10px 20px -10px rgba(99, 102, 241, 0.4)',
                  '&:hover': {
                    boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.5)',
                  }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>
            </Box>
          </form>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#6366f1', fontWeight: 700, textDecoration: 'none' }}>
                Register here
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
