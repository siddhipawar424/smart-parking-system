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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      role: 'USER',
    }
  });

  const watchPassword = watch('password');

  const onRegister = async (data) => {
    setLoading(true);
    const result = await registerUser(
      data.fullName,
      data.email,
      data.password,
      data.confirmPassword,
      data.role
    );
    setLoading(false);

    if (result.success) {
      toast.success('Registration successful! Please sign in with your credentials.');
      reset();
      navigate('/login');
    } else {
      toast.error(result.error || 'Registration failed');
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
          maxWidth: 460,
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
            background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
            color: '#ffffff',
            mb: 2.5,
            boxShadow: '0 8px 16px rgba(20, 184, 166, 0.25)'
          }}>
            <LocalParkingIcon sx={{ fontSize: 38 }} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.75, letterSpacing: '-0.02em' }}>
            Create Account
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 3 }}>
            Join the SmartParking Management Platform
          </Typography>
        </Box>

        <CardContent sx={{ p: 4, pt: 0 }}>
          <form onSubmit={handleSubmit(onRegister)} noValidate id="register-form">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                fullWidth
                id="register-fullname"
                label="Full Name"
                type="text"
                variant="outlined"
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" sx={{ fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }
                }}
                {...register('fullName', {
                  required: 'Full name is required',
                })}
              />

              <TextField
                fullWidth
                id="register-email"
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
                id="register-password"
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
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                          {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                }}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 4,
                    message: 'Password must be at least 4 characters',
                  },
                })}
              />

              <TextField
                fullWidth
                id="register-confirm-password"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                variant="outlined"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" sx={{ fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" size="small">
                          {showConfirmPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                }}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (val) => {
                    if (val !== watchPassword) {
                      return 'Passwords do not match';
                    }
                  },
                })}
              />

              <FormControl fullWidth error={!!errors.role}>
                <InputLabel id="role-select-label">Account Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="register-role"
                  label="Account Role"
                  {...register('role', { required: 'Role is required' })}
                >
                  <MenuItem value="USER">User (Standard Access)</MenuItem>
                  <MenuItem value="ADMIN">Admin (Full Control)</MenuItem>
                </Select>
              </FormControl>

              <Button
                id="register-submit"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  py: 1.75,
                  mt: 1,
                  fontSize: '0.975rem',
                  background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                  boxShadow: '0 10px 20px -10px rgba(20, 184, 166, 0.4)',
                  '&:hover': {
                    boxShadow: '0 10px 20px -5px rgba(20, 184, 166, 0.5)',
                  }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
              </Button>
            </Box>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#14b8a6', fontWeight: 700, textDecoration: 'none' }}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
