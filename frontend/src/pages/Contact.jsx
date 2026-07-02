import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import contactService from '../services/contactService';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Stack,
  CircularProgress,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await contactService.submitContact(data);
      toast.success('Your message has been received! Our team will respond shortly.');
      reset();
    } catch (err) {
      console.error('Contact submit error:', err);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className="page-enter" sx={{ py: { xs: 8, md: 12 }, background: 'radial-gradient(circle at 10% 20%, rgba(20, 184, 166, 0.06) 0%, transparent 40%)' }}>
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
          <Typography
            variant="caption"
            sx={{ fontWeight: 800, color: 'primary.main', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', mb: 1.5 }}
          >
            Inquiries
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
            Contact Operations
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Have system questions or custom integration requests? Fill out our validated request form below.
          </Typography>
        </Box>

        <Grid container spacing={5} alignItems="stretch">
          {/* Support Information Card */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3} sx={{ height: '100%' }}>
              <Card sx={{ border: '1px solid #e2e8f0', boxShadow: 'none', borderRadius: 4, flexGrow: 1 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, color: 'text.primary' }}>
                    Connect Directly
                  </Typography>

                  <Stack spacing={3.5}>
                    <Box sx={{ display: 'flex', gap: 2.5 }}>
                      <Box sx={{ p: 1.25, borderRadius: 2.5, bgcolor: 'rgba(99,102,241,0.08)', color: 'primary.main', height: 'fit-content', display: 'flex' }}>
                        <EmailIcon />
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, textTransform: 'uppercase' }}>
                          Email Support
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', mt: 0.5 }}>
                          operations@smartpark.com
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.25 }}>
                          Response window: 12-24 Hours
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2.5 }}>
                      <Box sx={{ p: 1.25, borderRadius: 2.5, bgcolor: 'rgba(20,184,166,0.08)', color: 'secondary.main', height: 'fit-content', display: 'flex' }}>
                        <PhoneIcon />
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, textTransform: 'uppercase' }}>
                          Phone Hotline
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', mt: 0.5 }}>
                          +91 98765 43210
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.25 }}>
                          Mon-Fri: 9:00 AM to 6:00 PM IST
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2.5 }}>
                      <Box sx={{ p: 1.25, borderRadius: 2.5, bgcolor: 'rgba(139,92,246,0.08)', color: '#8b5cf6', height: 'fit-content', display: 'flex' }}>
                        <LocationOnIcon />
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, textTransform: 'uppercase' }}>
                          Operational Office
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', mt: 0.5 }}>
                          SmartPark HQ Office, Floor 4 <br />
                          Tech Park Plaza, Pune, Maharashtra 411001
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Validated Request Form Card */}
          <Grid item xs={12} md={7}>
            <Card sx={{ border: '1px solid #e2e8f0', boxShadow: 'none', borderRadius: 4, height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
                  Inquiry Request Form
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} noValidate id="contact-form">
                  <Stack spacing={3}>
                    <Grid container spacing={2.5}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          id="contact-name"
                          label="Full Name"
                          placeholder="e.g. John Doe"
                          error={!!errors.name}
                          helperText={errors.name?.message}
                          {...register('name', { required: 'Name is required' })}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          id="contact-email"
                          label="Email Address"
                          type="email"
                          placeholder="e.g. john@example.com"
                          error={!!errors.email}
                          helperText={errors.email?.message}
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address',
                            },
                          })}
                        />
                      </Grid>
                    </Grid>

                    <TextField
                      fullWidth
                      id="contact-subject"
                      label="Subject"
                      placeholder="e.g. Smart Slot API Inquiry"
                      error={!!errors.subject}
                      helperText={errors.subject?.message}
                      {...register('subject', { required: 'Subject is required' })}
                    />

                    <TextField
                      fullWidth
                      id="contact-message"
                      label="Inquiry Message"
                      multiline
                      rows={4}
                      placeholder="Explain your inquiry in detail..."
                      error={!!errors.message}
                      helperText={errors.message?.message}
                      {...register('message', {
                        required: 'Message is required',
                        minLength: { value: 15, message: 'Message must be at least 15 characters long' },
                      })}
                    />

                    <Button
                      id="submit-contact"
                      type="submit"
                      variant="contained"
                      disabled={submitting}
                      endIcon={!submitting && <SendIcon />}
                      sx={{
                        py: 1.6,
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                        boxShadow: '0 8px 16px -4px rgba(99,102,241,0.35)',
                        '&:hover': {
                          boxShadow: '0 8px 16px -2px rgba(99,102,241,0.45)',
                        },
                      }}
                    >
                      {submitting ? <CircularProgress size={22} color="inherit" /> : 'Send Message'}
                    </Button>
                  </Stack>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
