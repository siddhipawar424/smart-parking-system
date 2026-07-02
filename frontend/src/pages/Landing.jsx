import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import dashboardService from '../services/dashboardService';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Stack,
  Card,
  CardContent,
  Chip,
  useTheme,
  useMediaQuery,
  LinearProgress,
} from '@mui/material';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SpeedIcon from '@mui/icons-material/Speed';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LoginIcon from '@mui/icons-material/Login';
import ReceiptIcon from '@mui/icons-material/Receipt';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import StorageIcon from '@mui/icons-material/Storage';
import TimelineIcon from '@mui/icons-material/Timeline';
import SecurityIcon from '@mui/icons-material/Security';

const Landing = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalVehicles: 148,
    totalSlots: 50,
    activeSessions: 12,
    totalRevenue: 24500,
  });

  useEffect(() => {
    const fetchPublicStats = async () => {
      try {
        const data = await dashboardService.getDashboard();
        if (data) {
          setStats({
            totalVehicles: data.totalVehicles || 148,
            totalSlots: data.totalSlots || 50,
            activeSessions: data.activeParking || 12,
            totalRevenue: data.totalRevenue || 24500,
          });
        }
      } catch (error) {
        // Silently use fallback counters if dashboard API is unavailable
      }
    };
    fetchPublicStats();
  }, []);

  const handleCTA = () => {
    if (user) {
      const target = user.role === 'ADMIN' ? '/dashboard' : '/vehicles';
      navigate(target);
    } else {
      navigate('/register');
    }
  };

  return (
    <Box className="page-enter" sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 6, md: 10 }, pb: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 6, md: 10 },
          pb: { xs: 4, md: 6 },
          background: 'radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.08) 0%, rgba(13, 148, 136, 0.03) 50%, transparent 100%)',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1.75,
                    py: 0.5,
                    borderRadius: 99,
                    backgroundColor: 'rgba(79, 70, 229, 0.05)',
                    border: '1px solid rgba(79, 70, 229, 0.1)',
                    width: 'fit-content',
                  }}
                >
                  <OfflineBoltIcon sx={{ color: 'primary.main', fontSize: 14 }} />
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: '0.01em' }}>
                    Enterprise Parking Solutions
                  </Typography>
                </Box>

                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem' },
                    lineHeight: 1.15,
                    letterSpacing: '-0.03em',
                    color: 'text.primary',
                  }}
                >
                  Automated Parking <br />
                  <span style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #0d9488 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Management System
                  </span>
                </Typography>

                <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1rem', lineHeight: 1.6, maxWidth: 480 }}>
                  Optimize slot allocations, track registration data, and instantly generate invoice receipts. A secure REST client powered by Spring Boot and React.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleCTA}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      py: 1.5,
                      px: 3.5,
                    }}
                  >
                    {user ? 'Go to Dashboard' : 'Get Started Now'}
                  </Button>
                  <Button
                    component={Link}
                    to="/features"
                    variant="outlined"
                    size="large"
                    sx={{ py: 1.5, px: 3.5 }}
                  >
                    Explore Features
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            {/* Visual Panel Mockup */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: 280, sm: 340 },
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                  borderRadius: 3,
                  boxShadow: '0 20px 40px -10px rgba(15,23,42,0.3)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                }}
              >
                {/* Simulated Panel UI Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ p: 0.75, borderRadius: 1.5, bgcolor: 'rgba(79, 70, 229, 0.15)', color: '#a5b4fc', display: 'flex' }}>
                      <LocalParkingIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 700, fontSize: '0.8rem' }}>Terminal Lot Monitor</Typography>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>Live slots status</Typography>
                    </Box>
                  </Stack>
                  <Chip
                    label="Active Sync"
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      bgcolor: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                    }}
                  />
                </Box>

                {/* Simulated Grid Slots */}
                <Box sx={{ my: 3 }}>
                  <Grid container spacing={1.5}>
                    {[
                      { name: 'P-01', occ: true },
                      { name: 'P-02', occ: false },
                      { name: 'P-03', occ: false },
                      { name: 'P-04', occ: true },
                      { name: 'P-05', occ: false },
                      { name: 'P-06', occ: false },
                      { name: 'P-07', occ: true },
                      { name: 'P-08', occ: false },
                    ].map((slot, i) => (
                      <Grid item xs={3} key={i}>
                        <Box
                          sx={{
                            p: 1.25,
                            borderRadius: 1.5,
                            textAlign: 'center',
                            bgcolor: slot.occ ? 'rgba(244,63,94,0.1)' : 'rgba(16,185,129,0.1)',
                            border: `1px solid ${slot.occ ? 'rgba(244,63,94,0.2)' : 'rgba(16,185,129,0.2)'}`,
                            color: slot.occ ? '#f43f5e' : '#10b981',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                          }}
                        >
                          {slot.name}
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {/* Panel Footer Progress */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>Capacity Utilization</Typography>
                    <Typography variant="caption" sx={{ color: '#a5b4fc', fontWeight: 700 }}>68%</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={68}
                    sx={{
                      height: 5,
                      borderRadius: 2,
                      bgcolor: 'rgba(255,255,255,0.08)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: '#4f46e5',
                      },
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Metrics Section */}
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {[
            { label: 'Registered Vehicles', value: stats.totalVehicles, icon: <DirectionsCarIcon />, color: '#4f46e5' },
            { label: 'Total Parking Spaces', value: stats.totalSlots, icon: <LocalParkingIcon />, color: '#0d9488' },
            { label: 'Active Sessions', value: stats.activeSessions, icon: <SpeedIcon />, color: '#d97706' },
            { label: 'Operational Capacity', value: '99.9%', icon: <CheckCircleIcon />, color: '#059669' },
          ].map((stat, i) => (
            <Grid item xs={6} md={3} key={i}>
              <Card
                sx={{
                  textAlign: 'center',
                  p: 3,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <CardContent sx={{ p: '0px !important' }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      p: 1.25,
                      borderRadius: 1.5,
                      bgcolor: `${stat.color}0a`,
                      color: stat.color,
                      mb: 2,
                      border: `1px solid ${stat.color}15`,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5, letterSpacing: '-0.02em' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Steps Section */}
      <Box sx={{ py: 8, backgroundColor: '#f1f5f9', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5, letterSpacing: '-0.02em' }}>
              How It Works
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 460, mx: 'auto', lineHeight: 1.6 }}>
              A highly-automated system flow managing records, slot availability, calculations, and PDF downloads.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {[
              { step: '01', title: 'Register Account', desc: 'Secure register layout and role configurations.', icon: <HowToRegIcon /> },
              { step: '02', title: 'Add Vehicle', desc: 'Input license details and owner references.', icon: <DirectionsCarIcon /> },
              { step: '03', title: 'Check In', desc: 'Assign active slots and log entry times.', icon: <LocalParkingIcon /> },
              { step: '04', title: 'Check Out', desc: 'Process exit timestamps and parking fees.', icon: <LoginIcon /> },
              { step: '05', title: 'Download Receipt', desc: 'Generate printable PDF billing invoices.', icon: <ReceiptIcon /> },
            ].map((node, i) => (
              <Grid item xs={12} sm={6} md={2.4} key={i}>
                <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center', p: 2 }}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #4f46e5 0%, #0d9488 100%)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 10px rgba(79, 70, 229, 0.2)',
                    }}
                  >
                    {node.icon}
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 0.5 }}>
                      Step {node.step}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.75 }}>
                      {node.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', px: 1, display: 'block', lineHeight: 1.4 }}>
                      {node.desc}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Tech Stack Section */}
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5, letterSpacing: '-0.02em' }}>
            System Architecture Stack
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 460, mx: 'auto', lineHeight: 1.6 }}>
            Powered by enterprise-grade development libraries ensuring security, transaction safety, and responsive controls.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {[
            { tech: 'React 19 & Vite', desc: 'Optimized build compiling and responsive client component rendering.', icon: <OfflineBoltIcon />, category: 'Frontend' },
            { tech: 'Material UI v9', desc: 'Consistent design components styled using system layout overrides.', icon: <LocalParkingIcon />, category: 'UI Theme' },
            { tech: 'Spring Boot REST', desc: 'Secure backend microservices exposed via clean controller layers.', icon: <StorageIcon />, category: 'Backend Server' },
            { tech: 'JWT Protection', desc: 'Stateless session authorization token filters applied on routing.', icon: <SecurityIcon />, category: 'Security' },
            { tech: 'MySQL Database', desc: 'Relational mappings storing tables for vehicles, slots, and bills.', icon: <StorageIcon />, category: 'Storage' },
            { tech: 'Hibernate JPA', desc: 'Robust transactional mapping managing active query records.', icon: <TimelineIcon />, category: 'ORM Layer' },
          ].map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: 'rgba(79, 70, 229, 0.05)', color: 'primary.main', display: 'flex' }}>
                      {item.icon}
                    </Box>
                    <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.625rem' }}>
                      {item.category}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
                    {item.tech}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Landing;
