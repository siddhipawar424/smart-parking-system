import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import vehicleService from '../services/vehicleService';
import parkingService from '../services/parkingService';
import slotService from '../services/slotService';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
  Divider,
  Stack,
  Alert,
  Chip,
  Skeleton,
  LinearProgress,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import CategoryIcon from '@mui/icons-material/Category';
import { PageContainer, PageHeader, KpiCard, GRID_SPACING } from '../components/layout';

const ParkVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [totalSlots, setTotalSlots] = useState(0);

  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    try {
      const [allVehicles, allRecords, availSlotsData] = await Promise.all([
        vehicleService.getAllVehicles(),
        parkingService.getAllRecords().catch(() => []),
        slotService.getAvailableSlots().catch(() => []),
      ]);

      const activeParkedVehicleIds = new Set(
        allRecords.filter((r) => r.exitTime === null).map((r) => r.vehicle?.id)
      );

      const unparkedVehicles = allVehicles.filter((v) => !activeParkedVehicleIds.has(v.id));
      setVehicles(unparkedVehicles);
      setAvailableSlots(availSlotsData);

      const allSlots = await slotService.getAllSlots().catch(() => []);
      setTotalSlots(allSlots.length);
    } catch (error) {
      console.error('Error loading park vehicle data:', error);
      toast.error('Failed to retrieve vehicle or slot configurations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleParkSubmit = async (e) => {
    e.preventDefault();
    if (!selectedVehicleId) {
      toast.warning('Please select a vehicle to park.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await parkingService.parkVehicle(selectedVehicleId);
      toast.success(
        `Vehicle parked successfully in Slot ${response.parkingSlot?.slotNumber || 'allocated'}!`
      );
      setSelectedVehicleId('');
      loadData();
    } catch (error) {
      console.error('Error parking vehicle:', error);
      toast.error(error.response?.data?.message || 'Parking slot allocation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId);
  const availableSlotsCount = availableSlots.length;
  const occupiedCount = totalSlots - availableSlotsCount;
  const occupancyPercent = totalSlots > 0 ? Math.round((occupiedCount / totalSlots) * 100) : 0;

  return (
    <PageContainer>
      <PageHeader
        title="Park a Vehicle"
        subtitle="Allocate an available parking slot to a registered vehicle"
      />

      <Grid container spacing={GRID_SPACING}>
        <Grid item xs={12} sm={4}>
          <KpiCard
            title="Available Slots"
            value={availableSlotsCount}
            icon={<LocalParkingIcon />}
            color="#10b981"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <KpiCard
            title="Occupied Slots"
            value={occupiedCount}
            icon={<DirectionsCarIcon />}
            color="#f43f5e"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <KpiCard
            title="Vehicles Waiting"
            value={vehicles.length}
            icon={<CheckCircleIcon />}
            color="#6366f1"
            loading={loading}
          />
        </Grid>
      </Grid>

      {!loading && totalSlots > 0 && (
        <Card>
          <CardContent sx={{ p: { xs: 2, sm: 2.25 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.25 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Parking Lot Occupancy
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: occupancyPercent > 80 ? '#ef4444' : '#10b981' }}>
                {occupancyPercent}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={occupancyPercent}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: '#e2e8f0',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  backgroundColor: occupancyPercent > 80 ? '#ef4444' : '#10b981',
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.75 }}>
              <Typography variant="caption" color="text.secondary">{occupiedCount} Occupied</Typography>
              <Typography variant="caption" color="text.secondary">{availableSlotsCount} Available of {totalSlots} Total</Typography>
            </Box>
          </CardContent>
        </Card>
      )}

      {!loading && availableSlotsCount === 0 && totalSlots > 0 && (
        <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>
          <strong>Parking Lot Full!</strong> No available slots at the moment.
        </Alert>
      )}

      {!loading && totalSlots === 0 && (
        <Alert severity="warning" sx={{ borderRadius: 2 }}>
          No parking slots are registered yet.{' '}
          <strong>Ask an Admin to add parking slots first.</strong>
        </Alert>
      )}

      <Grid container spacing={GRID_SPACING} alignItems="stretch">
        <Grid item xs={12} lg={selectedVehicle ? 6 : 12}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5, fontSize: '1rem' }}>
                Select Vehicle to Park
              </Typography>
              {loading ? (
                <Stack spacing={2}>
                  <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 2 }} />
                  <Skeleton variant="rectangular" height={48} sx={{ borderRadius: 2 }} />
                </Stack>
              ) : (
                <form onSubmit={handleParkSubmit} id="park-vehicle-form">
                  <Stack spacing={2.5}>
                    <FormControl fullWidth disabled={availableSlotsCount === 0 || vehicles.length === 0}>
                      <InputLabel id="select-vehicle-label">Select Registered Vehicle</InputLabel>
                      <Select
                        labelId="select-vehicle-label"
                        id="park-vehicle-select"
                        value={selectedVehicleId}
                        label="Select Registered Vehicle"
                        onChange={(e) => setSelectedVehicleId(e.target.value)}
                      >
                        {vehicles.length === 0 ? (
                          <MenuItem disabled value="">
                            No available vehicles to park
                          </MenuItem>
                        ) : (
                          vehicles.map((v) => (
                            <MenuItem key={v.id} value={v.id}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <DirectionsCarIcon fontSize="small" color="action" />
                                <Box>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {v.vehicleNumber}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {v.ownerName} · {v.vehicleType}
                                  </Typography>
                                </Box>
                              </Box>
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    </FormControl>

                    {vehicles.length === 0 && (
                      <Alert severity="info" variant="outlined">
                        All registered vehicles are currently parked, or none exist.{' '}
                        <Button
                          size="small"
                          onClick={() => navigate('/vehicles')}
                          sx={{ fontWeight: 700, p: 0, minWidth: 'auto', ml: 0.5 }}
                        >
                          Register a vehicle →
                        </Button>
                      </Alert>
                    )}

                    <Button
                      id="park-vehicle-btn"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      disabled={submitting || !selectedVehicleId || availableSlotsCount === 0}
                      startIcon={
                        submitting ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <LocalParkingIcon />
                        )
                      }
                      sx={{
                        py: 1.5,
                        fontSize: '0.95rem',
                        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                        boxShadow: '0 8px 16px -4px rgba(99,102,241,0.35)',
                      }}
                    >
                      {submitting ? 'Allocating Slot...' : 'Park Vehicle Now'}
                    </Button>
                  </Stack>
                </form>
              )}
            </CardContent>
          </Card>
        </Grid>

        {selectedVehicle && (
          <Grid item xs={12} lg={6}>
            <Card sx={{ borderLeft: '4px solid #6366f1', height: '100%' }}>
              <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                  <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: 'rgba(99,102,241,0.1)', color: 'primary.main' }}>
                    <DirectionsCarIcon />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      {selectedVehicle.vehicleNumber}
                    </Typography>
                    <Chip label="Ready to Park" color="success" size="small" icon={<CheckCircleIcon />} sx={{ fontWeight: 600, height: 22 }} />
                  </Box>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={1.75}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <PersonIcon color="action" fontSize="small" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Owner Name</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedVehicle.ownerName}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <PhoneIcon color="action" fontSize="small" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Mobile</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedVehicle.ownerMobile}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CategoryIcon color="action" fontSize="small" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Vehicle Type</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedVehicle.vehicleType}</Typography>
                    </Box>
                  </Box>
                </Stack>

                <Box sx={{ mt: 2.5, p: 1.75, bgcolor: 'rgba(16,185,129,0.08)', borderRadius: 2, border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalParkingIcon sx={{ color: '#047857', fontSize: 20, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ color: '#047857', fontWeight: 600 }}>
                    A slot will be auto-assigned from {availableSlotsCount} available slot{availableSlotsCount !== 1 ? 's' : ''}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </PageContainer>
  );
};

export default ParkVehicle;
