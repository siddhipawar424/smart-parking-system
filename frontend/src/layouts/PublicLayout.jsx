import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
  Container,
  Grid,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Features', path: '/features' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const PublicLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAuthAction = () => {
    if (user) {
      const target = user.role === 'ADMIN' ? '/dashboard' : '/vehicles';
      navigate(target);
    } else {
      navigate('/login');
    }
  };

  const drawer = (
    <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyBehavior: 'space-between', justifyContent: 'space-between', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Box
            sx={{
              p: 0.75,
              borderRadius: 1.5,
              background: 'linear-gradient(135deg, #4f46e5 0%, #0d9488 100%)',
              display: 'flex',
            }}
          >
            <LocalParkingIcon sx={{ fontSize: 20, color: '#fff' }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: '-0.02em', color: 'text.primary' }}>
            Smart<span style={{ color: '#0d9488' }}>Park</span>
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} size="small" sx={{ border: '1px solid #e2e8f0', borderRadius: 1.5 }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ my: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: 1.5,
                backgroundColor: location.pathname === item.path ? 'rgba(79, 70, 229, 0.05)' : 'transparent',
                color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                py: 1.25,
                '&:hover': {
                  backgroundColor: 'rgba(79, 70, 229, 0.02)',
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 700 : 500,
                  fontSize: '0.875rem',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box>
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            handleDrawerToggle();
            handleAuthAction();
          }}
          sx={{
            py: 1.25,
          }}
        >
          {user ? 'Go to Dashboard' : 'Get Started'}
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* AppBar Header */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #e2e8f0',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ height: 68, display: 'flex', justifyContent: 'space-between' }}>
            {/* Logo */}
            <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.25, textDecoration: 'none' }}>
              <Box
                sx={{
                  p: 0.75,
                  borderRadius: 1.5,
                  background: 'linear-gradient(135deg, #4f46e5 0%, #0d9488 100%)',
                  display: 'flex',
                }}
              >
                <LocalParkingIcon sx={{ fontSize: 20, color: '#fff' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: '-0.03em', color: '#0f172a' }}>
                Smart<span style={{ color: '#0d9488' }}>Park</span>
              </Typography>
            </Box>

            {/* Desktop Nav Items */}
            {!isMobile && (
              <Stack direction="row" spacing={1}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                      fontWeight: location.pathname === item.path ? 700 : 500,
                      px: 2,
                      py: 1,
                      borderRadius: 1.5,
                      fontSize: '0.85rem',
                      backgroundColor: location.pathname === item.path ? 'rgba(79, 70, 229, 0.04)' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(79, 70, 229, 0.04)',
                        color: 'primary.main',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Stack>
            )}

            {/* CTA Buttons */}
            {!isMobile ? (
              <Stack direction="row" spacing={1.5} alignItems="center">
                {!user ? (
                  <>
                    <Button
                      component={Link}
                      to="/login"
                      variant="text"
                      sx={{ color: 'text.primary', fontWeight: 600, px: 2 }}
                    >
                      Sign In
                    </Button>
                    <Button
                      component={Link}
                      to="/register"
                      variant="contained"
                    >
                      Register
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleAuthAction}
                    variant="contained"
                    endIcon={<KeyboardArrowRightIcon fontSize="small" />}
                  >
                    Go to Dashboard
                  </Button>
                )}
              </Stack>
            ) : (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  color: 'text.primary',
                  backgroundColor: '#f1f5f9',
                  borderRadius: 1.5,
                  p: 1,
                }}
              >
                <MenuIcon fontSize="small" />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280, border: 'none' },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        className="page-enter"
        sx={{
          flexGrow: 1,
          pt: '68px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Outlet />
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#0f172a', color: '#94a3b8', py: { xs: 6, md: 8 }, borderTop: '1px solid #1e293b' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid item xs={12} md={4}>
              <Stack spacing={2.5}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                  <Box
                    sx={{
                      p: 0.75,
                      borderRadius: 1.5,
                      background: 'linear-gradient(135deg, #4f46e5 0%, #0d9488 100%)',
                      display: 'flex',
                    }}
                  >
                    <LocalParkingIcon sx={{ fontSize: 20, color: '#fff' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: '-0.02em', color: '#ffffff' }}>
                    Smart<span style={{ color: '#14b8a6' }}>Park</span>
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ lineHeight: 1.6, color: '#94a3b8', maxWidth: 300 }}>
                  A modern, secure, enterprise-grade parking management platform powered by Spring Boot, React, and JWT Authentication.
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={6} md={3}>
              <Typography variant="subtitle2" sx={{ color: '#ffffff', fontWeight: 700, mb: 2 }}>
                Quick Links
              </Typography>
              <Stack spacing={1.25}>
                {navItems.map((item) => (
                  <Typography
                    key={item.label}
                    component={Link}
                    to={item.path}
                    variant="body2"
                    sx={{
                      color: '#94a3b8',
                      transition: 'color 0.15s',
                      textDecoration: 'none',
                      fontSize: '0.8rem',
                      '&:hover': { color: '#ffffff' },
                    }}
                  >
                    {item.label}
                  </Typography>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={6} md={3}>
              <Typography variant="subtitle2" sx={{ color: '#ffffff', fontWeight: 700, mb: 2 }}>
                Platform Stack
              </Typography>
              <Stack spacing={1.25} sx={{ fontSize: '0.8rem' }}>
                <Typography variant="body2">React & Material UI v9</Typography>
                <Typography variant="body2">Spring Boot & Security</Typography>
                <Typography variant="body2">JWT & BCrypt Passwords</Typography>
                <Typography variant="body2">MySQL Relational Logs</Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={2}>
              <Typography variant="subtitle2" sx={{ color: '#ffffff', fontWeight: 700, mb: 2 }}>
                Resources
              </Typography>
              <Stack spacing={1.25}>
                <Typography
                  component="a"
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  variant="body2"
                  sx={{ color: '#94a3b8', transition: 'color 0.15s', textDecoration: 'none', fontSize: '0.8rem', '&:hover': { color: '#ffffff' } }}
                >
                  GitHub Project
                </Typography>
                <Typography
                  component="a"
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  variant="body2"
                  sx={{ color: '#94a3b8', transition: 'color 0.15s', textDecoration: 'none', fontSize: '0.8rem', '&:hover': { color: '#ffffff' } }}
                >
                  LinkedIn
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: '#1e293b', mb: 4 }} />

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              &copy; {new Date().getFullYear()} SmartPark. Capstone Model System.
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default PublicLayout;
