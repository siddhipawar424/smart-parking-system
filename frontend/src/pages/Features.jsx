import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TimelineIcon from '@mui/icons-material/Timeline';
import SecurityIcon from '@mui/icons-material/Security';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HistoryIcon from '@mui/icons-material/History';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

const featuresList = [
  {
    title: 'Vehicle Management',
    desc: 'Register and log vehicles dynamically. Define categories (CAR, BIKE, SUV) and attach owner information directly to profiles.',
    icon: <DirectionsCarIcon />,
    color: '#6366f1',
  },
  {
    title: 'Smart Slot Allocation',
    desc: 'Automated algorithm allocates incoming vehicles to optimal available slots instantly, maximizing occupancy efficiency.',
    icon: <LocalParkingIcon />,
    color: '#14b8a6',
  },
  {
    title: 'Real-Time Dashboard',
    desc: 'Live operations tracker displaying key metrics, capacity status progress, and interactive occupancy distribution charts.',
    icon: <DashboardIcon />,
    color: '#f59e0b',
  },
  {
    title: 'Parking Analytics',
    desc: 'Financial reports and revenue trends track overall performance across slot categories and active transaction records.',
    icon: <TimelineIcon />,
    color: '#8b5cf6',
  },
  {
    title: 'JWT Authentication',
    desc: 'Encrypted token authorization stored in local storage and attached to Axios request headers for stateless API defense.',
    icon: <SecurityIcon />,
    color: '#f43f5e',
  },
  {
    title: 'Role-Based Access',
    desc: 'Granular permissions restrict routes and features automatically between ADMIN operators and USER accounts.',
    icon: <SupervisorAccountIcon />,
    color: '#06b6d4',
  },
  {
    title: 'Parking History & Logs',
    desc: 'Audit trails and historical CSV log reports export completed records, entry times, exit durations, and total fees.',
    icon: <HistoryIcon />,
    color: '#10b981',
  },
  {
    title: 'PDF Receipt Generation',
    desc: 'Integrated receipt generator renders and prints downloadable invoices automatically upon vehicle check-out.',
    icon: <ReceiptIcon />,
    color: '#ec4899',
  },
  {
    title: 'Responsive Design',
    desc: 'Clean desktop sidebar transitions to a drawer layout for tablets and mobile devices with fluid grids and overflow tables.',
    icon: <PhoneIphoneIcon />,
    color: '#3b82f6',
  },
];

const Features = () => {
  const theme = useTheme();

  return (
    <Box className="page-enter" sx={{ py: { xs: 8, md: 12 }, background: 'radial-gradient(circle at 10% 80%, rgba(20, 184, 166, 0.08) 0%, transparent 50%)' }}>
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
          <Typography
            variant="caption"
            sx={{ fontWeight: 800, color: 'primary.main', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', mb: 1.5 }}
          >
            Capabilities
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.25rem', md: '3.25rem' },
              letterSpacing: '-0.02em',
              mb: 2.5,
              color: 'text.primary',
            }}
          >
            Platform Features
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Explore the core engineering functionalities that make the Smart Parking Management System a production-ready solution.
          </Typography>
        </Box>

        {/* Feature Grid */}
        <Grid container spacing={4}>
          {featuresList.map((feat, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #e2e8f0',
                  boxShadow: 'none',
                  borderRadius: 5,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    borderColor: 'rgba(99, 102, 241, 0.25)',
                    boxShadow: '0 20px 40px rgba(99, 102, 241, 0.05)',
                    '& .feat-icon-container': {
                      background: feat.color,
                      color: '#ffffff',
                    },
                  },
                }}
              >
                <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  {/* Icon with hover changes */}
                  <Box
                    className="feat-icon-container"
                    sx={{
                      display: 'inline-flex',
                      p: 1.5,
                      borderRadius: 3,
                      bgcolor: `${feat.color}12`,
                      color: feat.color,
                      mb: 3,
                      width: 'fit-content',
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    {React.cloneElement(feat.icon, { sx: { fontSize: 28 } })}
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, color: 'text.primary' }}>
                    {feat.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, flexGrow: 1 }}>
                    {feat.desc}
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

export default Features;
