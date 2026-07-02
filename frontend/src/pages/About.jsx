import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';

const About = () => {
  return (
    <Box className="page-enter" sx={{ py: { xs: 8, md: 12 }, background: 'radial-gradient(circle at 90% 10%, rgba(99, 102, 241, 0.06) 0%, transparent 40%)' }}>
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
          <Typography
            variant="caption"
            sx={{ fontWeight: 800, color: 'primary.main', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', mb: 1.5 }}
          >
            Our Mission
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
            About SmartPark
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 650, mx: 'auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
            An engineering perspective on resolving dense urban transit congestion through automated parking operations and secure relational data modeling.
          </Typography>
        </Box>

        {/* Problem Statement & Solution */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', border: '1px solid #e2e8f0', boxShadow: 'none', borderRadius: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: 'error.main', mb: 2, display: 'flex', alignItems: 'center', gap: 1.25 }}>
                  <InfoOutlinedIcon /> The Problem
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: '0.925rem' }}>
                  Modern urban environments face critical congestion due to inefficient manual parking systems. Drivers spend excessive time looking for open spaces, increasing carbon emissions, causing localized traffic delays, and leading to financial leakage for parking lot operators who lack real-time visibility into metrics and transactions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', border: '1px solid #e2e8f0', boxShadow: 'none', borderRadius: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: 'success.main', mb: 2, display: 'flex', alignItems: 'center', gap: 1.25 }}>
                  <CheckCircleIcon color="success" /> The Solution
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: '0.925rem' }}>
                  SmartPark introduces a state-of-the-art Single Page Application mapped directly to a microservice REST endpoint. It automatically schedules vehicle entry times and auto-assigns open parking slots, completely removing human error and providing full-stack, real-time logging, PDF billing, and transactional exports.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Pillars Section */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h4" sx={{ fontWeight: 900, textAlign: 'center', mb: 6 }}>
            Core Platform Architecture Pillars
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                title: 'Granular Data Isolation',
                desc: 'Utilizes a relational MySQL schema managed by JPA (Hibernate) to map parking logs, vehicle records, and accounts independently, avoiding overlapping states or corrupted tables.',
                icon: <CloudQueueIcon />,
                color: '#6366f1',
              },
              {
                title: 'Robust Stateless Security',
                desc: 'Defends core endpoints using Spring Security and stateless JWT authentication. All passwords are automatically BCrypt-encrypted on account creation to protect user records.',
                icon: <SecurityIcon />,
                color: '#14b8a6',
              },
              {
                title: 'High-Throughput Scalability',
                desc: 'The backend controller structure handles concurrent API request spikes efficiently. Fast data operations are achieved through optimized DB indexes and JPA mapping layers.',
                icon: <SpeedIcon />,
                color: '#f59e0b',
              },
            ].map((pillar, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card sx={{ border: 'none', boxShadow: 'none', bgcolor: 'transparent' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Stack spacing={2.5}>
                      <Box sx={{ display: 'inline-flex', p: 1.25, borderRadius: 3, bgcolor: `${pillar.color}15`, color: pillar.color, width: 'fit-content' }}>
                        {pillar.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        {pillar.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                        {pillar.desc}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ mb: 10 }} />

        {/* Capstone Focus info card */}
        <Card sx={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff', borderRadius: 4, border: 'none' }}>
          <CardContent sx={{ p: 5 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, color: '#ffffff' }}>
                  Capstone Focus & Development Model
                </Typography>
                <Typography variant="body2" sx={{ color: '#cbd5e1', lineHeight: 1.7, maxWidth: 680 }}>
                  SmartPark was developed to represent the apex of full-stack capstone projects. The separation of the React client side and Spring Boot REST side follows optimal architectural decoupling. The project implements production-ready concepts such as JWT verification interceptors, database seed migrations, secure BCrypt password filters, and automated report exports.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    p: 2,
                    borderRadius: '50%',
                    bgcolor: 'rgba(99,102,241,0.15)',
                    color: '#a5b4fc',
                    border: '1px solid rgba(99,102,241,0.25)',
                  }}
                >
                  <SecurityIcon sx={{ fontSize: 40 }} />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

// Internal icon import helper
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default About;
