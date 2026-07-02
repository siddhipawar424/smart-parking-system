import React, { useState, useEffect } from 'react';
import parkingService from '../services/parkingService';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Stack,
  Divider,
  Chip,
  CircularProgress,
  Skeleton,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DownloadIcon from '@mui/icons-material/Download';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmptyState from '../components/EmptyState';
import { PageContainer, PageHeader, GRID_SPACING } from '../components/layout';

const ExitVehicle = () => {
  const [activeRecords, setActiveRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [exitSummary, setExitSummary] = useState(null);
  const [downloadingReceipt, setDownloadingReceipt] = useState(false);

  const loadActiveRecords = async () => {
    setLoading(true);
    try {
      const allRecords = await parkingService.getAllRecords();
      const active = allRecords.filter((r) => r.exitTime === null);
      setActiveRecords(active);
    } catch (error) {
      console.error('Error fetching parking records:', error);
      toast.error('Failed to load active parking records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActiveRecords();
  }, []);

  const handleExitVehicle = async (vehicleId) => {
    setProcessingId(vehicleId);
    try {
      const response = await parkingService.exitVehicle(vehicleId);
      toast.success('Vehicle exited successfully!');
      setExitSummary(response);
      setSummaryOpen(true);
      loadActiveRecords();
    } catch (error) {
      console.error('Error exiting vehicle:', error);
      toast.error(error.response?.data?.message || 'Error occurred during exit processing');
    } finally {
      setProcessingId(null);
    }
  };

  const handleDownloadReceipt = async (recordId) => {
    setDownloadingReceipt(true);
    try {
      const blob = await parkingService.downloadReceipt(recordId);
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Parking_Receipt_${recordId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Receipt downloaded successfully!');
    } catch (error) {
      console.error('Error downloading receipt:', error);
      toast.error('Failed to download receipt PDF');
    } finally {
      setDownloadingReceipt(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDuration = (entryTime) => {
    if (!entryTime) return 'N/A';
    const ms = new Date() - new Date(entryTime);
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    if (hours === 0) return `${minutes}m`;
    return `${hours}h ${minutes}m`;
  };

  const estimateFee = (entryTime) => {
    if (!entryTime) return '—';
    const ms = new Date() - new Date(entryTime);
    const hours = Math.max(1, Math.ceil(ms / 3600000));
    return `~₹${(hours * 50).toFixed(0)}`;
  };

  return (
    <PageContainer>
      <PageHeader
        title="Exit Vehicle"
        subtitle="Check out parked vehicles, calculate fees, and generate receipts"
        badge={
          !loading && (
            <Chip
              label={`${activeRecords.length} Active Sessions`}
              color={activeRecords.length > 0 ? 'primary' : 'default'}
              sx={{ fontWeight: 700, height: 24 }}
            />
          )
        }
      />

      {loading ? (
        <Grid container spacing={GRID_SPACING}>
          {[1, 2, 3].map((i) => (
            <Grid item xs={12} sm={6} lg={4} key={i}>
              <Skeleton variant="rounded" height={280} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      ) : activeRecords.length === 0 ? (
        <EmptyState
          title="No Active Parking Sessions"
          description="All parking slots are currently empty. Park a vehicle first to see it here."
        />
      ) : (
        <Grid container spacing={GRID_SPACING}>
          {activeRecords.map((record) => (
            <Grid item xs={12} sm={6} lg={4} key={record.id}>
              <Card
                sx={{
                  height: '100%',
                  borderTop: '3px solid #6366f1',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 28px rgba(99,102,241,0.12)',
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 2.25 } }}>
                  <Stack spacing={1.75}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: 'rgba(99,102,241,0.1)', color: 'primary.main' }}>
                          <DirectionsCarIcon fontSize="small" />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.05rem' }}>
                          {record.vehicle?.vehicleNumber}
                        </Typography>
                      </Box>
                      <Chip
                        icon={<LocalParkingIcon fontSize="small" />}
                        label={record.parkingSlot?.slotNumber}
                        color="secondary"
                        size="small"
                        sx={{ fontWeight: 700 }}
                      />
                    </Box>

                    <Divider />

                    <Stack spacing={0.75}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {record.vehicle?.ownerName}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {record.vehicle?.ownerMobile}
                        </Typography>
                      </Box>
                    </Stack>

                    <Box sx={{ bgcolor: '#f8fafc', p: 1.75, borderRadius: 2, border: '1px solid #e2e8f0' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <AccessTimeIcon sx={{ fontSize: 16, color: '#6366f1' }} />
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#6366f1' }}>
                          TIME & FEE
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">Entry</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                            {formatDate(record.entryTime)}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="caption" color="text.secondary" display="block">Duration</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#6366f1' }}>
                            {getDuration(record.entryTime)}
                          </Typography>
                        </Box>
                      </Box>
                      <Divider sx={{ my: 1.25 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">Est. Fee</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#10b981' }}>
                          {estimateFee(record.entryTime)}
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      id={`exit-btn-${record.vehicle?.vehicleNumber}`}
                      fullWidth
                      variant="contained"
                      color="error"
                      onClick={() => handleExitVehicle(record.vehicle?.id)}
                      disabled={processingId !== null}
                      startIcon={
                        processingId === record.vehicle?.id ? (
                          <CircularProgress size={18} color="inherit" />
                        ) : (
                          <ExitToAppIcon />
                        )
                      }
                      sx={{ py: 1.25, fontWeight: 700 }}
                    >
                      {processingId === record.vehicle?.id ? 'Processing...' : 'Check Out Vehicle'}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={summaryOpen}
        onClose={() => setSummaryOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ textAlign: 'center', pt: 3, pb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box sx={{ p: 2, borderRadius: '50%', bgcolor: 'rgba(16,185,129,0.1)' }}>
              <CheckCircleIcon sx={{ fontSize: 48, color: '#10b981' }} />
            </Box>
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>Parking Invoice</Typography>
          <Typography variant="body2" color="text.secondary">Vehicle has been checked out successfully</Typography>
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          {exitSummary && (
            <Box sx={{ bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0', p: 2.5, mt: 1 }}>
              <Stack spacing={1.75}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Vehicle Number</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{exitSummary.vehicle?.vehicleNumber}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Slot Number</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{exitSummary.parkingSlot?.slotNumber}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Owner</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{exitSummary.vehicle?.ownerName}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Entry Time</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{formatDate(exitSummary.entryTime)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Exit Time</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{formatDate(exitSummary.exitTime)}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Total Parking Fee</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: '#10b981' }}>
                    ₹{exitSummary.parkingFee?.toFixed(2) || '0.00'}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, flexDirection: 'column', gap: 1.25 }}>
          <Button
            id="download-receipt-summary"
            fullWidth
            variant="contained"
            color="success"
            size="large"
            onClick={() => exitSummary && handleDownloadReceipt(exitSummary.id)}
            disabled={downloadingReceipt}
            startIcon={
              downloadingReceipt ? <CircularProgress size={20} color="inherit" /> : <DownloadIcon />
            }
            sx={{ py: 1.25, fontWeight: 700 }}
          >
            {downloadingReceipt ? 'Generating PDF...' : 'Download PDF Receipt'}
          </Button>
          <Button
            id="close-summary"
            fullWidth
            variant="outlined"
            size="large"
            onClick={() => setSummaryOpen(false)}
            sx={{ py: 1.1 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default ExitVehicle;
