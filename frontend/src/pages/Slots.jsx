import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import slotService from '../services/slotService';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
  IconButton,
  MenuItem,
  CircularProgress,
  Skeleton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';
import { PageContainer, PageHeader, KpiCard, GRID_SPACING } from '../components/layout';

const SlotTypes = ['CAR', 'MOTORCYCLE', 'SUV', 'TRUCK', 'BUS', 'OTHER'];

const Slots = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const loadSlots = async () => {
    setLoading(true);
    try {
      const data = await slotService.getAllSlots();
      const sorted = data.sort((a, b) => {
        const valA = a.slotNumber || '';
        const valB = b.slotNumber || '';
        return valA.localeCompare(valB, undefined, { numeric: true, sensitivity: 'base' });
      });
      setSlots(sorted);
    } catch (error) {
      console.error('Error fetching slots:', error);
      toast.error('Failed to load parking slots');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSlots();
  }, []);

  const handleOpenAdd = () => {
    reset();
    setEditMode(false);
    setDialogOpen(true);
  };

  const handleOpenEdit = (slot) => {
    reset();
    setEditMode(true);
    setCurrentId(slot.id);
    setValue('slotNumber', slot.slotNumber);
    setValue('slotType', slot.slotType);
    setValue('occupied', slot.occupied);
    setDialogOpen(true);
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      if (editMode) {
        await slotService.updateSlot(currentId, data);
        toast.success('Parking slot updated successfully!');
      } else {
        await slotService.addSlot(data);
        toast.success('Parking slot added successfully!');
      }
      setDialogOpen(false);
      loadSlots();
    } catch (error) {
      console.error('Error saving slot:', error);
      toast.error(error.response?.data?.message || 'Error saving slot');
    } finally {
      setSaving(false);
    }
  };

  const handleOpenDelete = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDeleteOpen(false);
    setLoading(true);
    try {
      await slotService.deleteSlot(deleteId);
      toast.success('Slot deleted successfully!');
      loadSlots();
    } catch (error) {
      console.error('Error deleting slot:', error);
      toast.error(error.response?.data?.message || 'Failed to delete slot');
    } finally {
      setLoading(false);
    }
  };

  const availableCount = slots.filter((s) => !s.occupied).length;
  const occupiedCount = slots.filter((s) => s.occupied).length;

  return (
    <PageContainer>
      <PageHeader
        title="Parking Slot Management"
        subtitle="Configure, monitor, and manage all parking spaces"
        actions={
          <Button
            id="add-slot-btn"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAdd}
            sx={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}
          >
            Add Slot
          </Button>
        }
      />

      <Grid container spacing={GRID_SPACING}>
        <Grid item xs={12} sm={4}>
          <KpiCard title="Total Slots" value={slots.length} icon={<LocalParkingIcon />} color="#6366f1" loading={loading} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <KpiCard title="Available" value={availableCount} icon={<CheckCircleIcon />} color="#10b981" loading={loading} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <KpiCard title="Occupied" value={occupiedCount} icon={<CancelIcon />} color="#f43f5e" loading={loading} />
        </Grid>
      </Grid>

      {loading && slots.length === 0 ? (
        <Grid container spacing={GRID_SPACING}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Skeleton variant="rounded" height={130} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      ) : slots.length === 0 ? (
        <EmptyState
          title="No Parking Slots Registered"
          description="Click 'Add Slot' above to register your first parking space."
          actionText="Add Parking Slot"
          onAction={handleOpenAdd}
          icon={LocalParkingIcon}
        />
      ) : (
        <Grid container spacing={GRID_SPACING}>
          {slots.map((slot) => {
            const isOccupied = slot.occupied;
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={slot.id}>
                <Card
                  sx={{
                    height: '100%',
                    borderLeft: `4px solid ${isOccupied ? '#f43f5e' : '#10b981'}`,
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: `0 12px 24px ${isOccupied ? 'rgba(244,63,94,0.1)' : 'rgba(16,185,129,0.1)'}`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.25 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ p: 0.75, borderRadius: 1.5, bgcolor: isOccupied ? 'rgba(244,63,94,0.1)' : 'rgba(16,185,129,0.1)' }}>
                          <LocalParkingIcon sx={{ fontSize: 18, color: isOccupied ? '#f43f5e' : '#10b981' }} />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.05rem' }}>
                          {slot.slotNumber}
                        </Typography>
                      </Box>
                      <Chip
                        icon={isOccupied ? <CancelIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
                        label={isOccupied ? 'Occupied' : 'Available'}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          fontSize: '0.68rem',
                          height: 22,
                          bgcolor: isOccupied ? 'rgba(244,63,94,0.1)' : 'rgba(16,185,129,0.1)',
                          color: isOccupied ? '#f43f5e' : '#059669',
                          border: `1px solid ${isOccupied ? 'rgba(244,63,94,0.3)' : 'rgba(16,185,129,0.3)'}`,
                          '& .MuiChip-icon': { color: 'inherit' },
                        }}
                      />
                    </Box>

                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
                      Type:{' '}
                      <Typography component="span" variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                        {slot.slotType}
                      </Typography>
                    </Typography>

                    <Divider sx={{ mb: 1 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                      <IconButton
                        id={`edit-slot-${slot.slotNumber}`}
                        size="small"
                        onClick={() => handleOpenEdit(slot)}
                        sx={{ color: 'primary.main', '&:hover': { bgcolor: 'rgba(99,102,241,0.08)' } }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        id={`delete-slot-${slot.slotNumber}`}
                        size="small"
                        onClick={() => handleOpenDelete(slot.id)}
                        disabled={isOccupied}
                        title={isOccupied ? 'Cannot delete an occupied slot' : 'Delete slot'}
                        sx={{ color: 'error.main', '&:hover': { bgcolor: 'rgba(244,63,94,0.08)' }, '&.Mui-disabled': { opacity: 0.35 } }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)} noValidate id="slot-form">
          <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>
            {editMode ? 'Edit Parking Slot' : 'Add New Parking Slot'}
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: '8px !important' }}>
            <TextField
              id="form-slot-number"
              fullWidth
              label="Slot Number"
              placeholder="e.g. A-101"
              disabled={editMode}
              error={!!errors.slotNumber}
              helperText={errors.slotNumber?.message}
              {...register('slotNumber', { required: 'Slot number is required' })}
            />
            <TextField
              id="form-slot-type"
              fullWidth
              select
              label="Vehicle Type"
              defaultValue="CAR"
              error={!!errors.slotType}
              helperText={errors.slotType?.message}
              {...register('slotType', { required: 'Slot type is required' })}
            >
              {SlotTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>
            <TextField
              id="form-slot-occupied"
              fullWidth
              select
              label="Initial Status"
              defaultValue="false"
              error={!!errors.occupied}
              helperText={errors.occupied?.message}
              {...register('occupied', {
                required: 'Status is required',
                setValueAs: (v) => v === 'true' || v === true,
              })}
            >
              <MenuItem value="false">Available</MenuItem>
              <MenuItem value="true">Occupied</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
            <Button onClick={() => setDialogOpen(false)} variant="outlined" color="inherit" sx={{ flex: 1 }}>
              Cancel
            </Button>
            <Button
              id="save-slot-btn"
              type="submit"
              variant="contained"
              disabled={saving}
              sx={{ flex: 1, background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
            >
              {saving ? <CircularProgress size={22} color="inherit" /> : editMode ? 'Save Changes' : 'Add Slot'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <ConfirmDialog
        open={deleteOpen}
        title="Delete Parking Slot"
        message="Are you sure you want to permanently delete this parking slot? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </PageContainer>
  );
};

export default Slots;
