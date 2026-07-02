import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import vehicleService from '../services/vehicleService';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ConfirmDialog from '../components/ConfirmDialog';
import LoadingSpinner from '../components/LoadingSpinner';
import { PageContainer, PageHeader, SearchToolbar, DataTable } from '../components/layout';

const VehicleTypes = ['CAR', 'MOTORCYCLE', 'SUV', 'TRUCK', 'BUS', 'OTHER'];

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const loadVehicles = async () => {
    setLoading(true);
    try {
      const data = await vehicleService.getAllVehicles();
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      toast.error('Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadVehicles();
      return;
    }
    setLoading(true);
    try {
      const data = await vehicleService.searchVehicle(searchQuery.trim());
      if (data) {
        setVehicles([data]);
      } else {
        setVehicles([]);
        toast.info('No vehicle found matching this number');
      }
    } catch (error) {
      console.error('Error searching vehicle:', error);
      setVehicles([]);
      toast.error('Vehicle number not found');
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    loadVehicles();
  };

  const handleOpenAdd = () => {
    reset();
    setEditMode(false);
    setDialogOpen(true);
  };

  const handleOpenEdit = (row) => {
    reset();
    setEditMode(true);
    setCurrentId(row.id);
    setValue('vehicleNumber', row.vehicleNumber);
    setValue('vehicleType', row.vehicleType);
    setValue('ownerName', row.ownerName);
    setValue('ownerMobile', row.ownerMobile);
    setDialogOpen(true);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (editMode) {
        await vehicleService.updateVehicle(currentId, data);
        toast.success('Vehicle updated successfully!');
      } else {
        await vehicleService.saveVehicle(data);
        toast.success('Vehicle registered successfully!');
      }
      setDialogOpen(false);
      loadVehicles();
    } catch (error) {
      console.error('Error saving vehicle:', error);
      toast.error(error.response?.data?.message || 'Error occurred while saving');
    } finally {
      setLoading(false);
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
      await vehicleService.deleteVehicle(deleteId);
      toast.success('Vehicle deleted successfully!');
      loadVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      toast.error(error.response?.data?.message || 'Failed to delete vehicle');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, sortable: true },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', flex: 1.2, minWidth: 160 },
    { field: 'vehicleType', headerName: 'Type', flex: 0.8, minWidth: 120 },
    { field: 'ownerName', headerName: 'Owner Name', flex: 1.2, minWidth: 160 },
    { field: 'ownerMobile', headerName: 'Mobile Number', flex: 1, minWidth: 140 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 110,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5, height: '100%', alignItems: 'center' }}>
          <IconButton
            id={`edit-vehicle-${params.row.id}`}
            size="small"
            color="primary"
            onClick={() => handleOpenEdit(params.row)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            id={`delete-vehicle-${params.row.id}`}
            size="small"
            color="error"
            onClick={() => handleOpenDelete(params.row.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Vehicle Registry"
        subtitle="Register and manage vehicles authorized to use the parking lot"
        actions={
          <Button
            id="add-vehicle-btn"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAdd}
            sx={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}
          >
            Register Vehicle
          </Button>
        }
      />

      <SearchToolbar>
        <TextField
          id="search-vehicle-input"
          size="small"
          placeholder="Search by Vehicle Number (e.g. MH12AB1234)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          sx={{ flex: 1, minWidth: { xs: '100%', sm: 280 } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClearSearch}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Button id="search-vehicle-btn" variant="contained" color="secondary" onClick={handleSearch}>
          Search
        </Button>
      </SearchToolbar>

      <DataTable sx={{ minHeight: 420 }}>
        {loading && vehicles.length === 0 ? (
          <LoadingSpinner message="Fetching vehicles..." />
        ) : (
          <DataGrid
            id="vehicles-datagrid"
            rows={vehicles}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 20, 50]}
            disableRowSelectionOnClick
            autoHeight
            rowHeight={52}
            columnHeaderHeight={48}
            sx={{
              border: 'none',
              width: '100%',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 700,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: '#64748b',
              },
              '& .MuiDataGrid-row:nth-of-type(even)': {
                backgroundColor: '#fafbfc',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'rgba(99, 102, 241, 0.04)',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #f1f5f9',
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: '1px solid #e2e8f0',
              },
            }}
          />
        )}
      </DataTable>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)} noValidate id="vehicle-form">
          <DialogTitle sx={{ fontWeight: 700 }}>
            {editMode ? 'Edit Vehicle Details' : 'Register New Vehicle'}
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
            <TextField
              id="form-vehicle-number"
              fullWidth
              label="Vehicle Number"
              placeholder="e.g. MH12AB1234"
              error={!!errors.vehicleNumber}
              helperText={errors.vehicleNumber?.message}
              {...register('vehicleNumber', { required: 'Vehicle number is required' })}
            />
            <TextField
              id="form-vehicle-type"
              fullWidth
              select
              label="Vehicle Type"
              defaultValue="CAR"
              error={!!errors.vehicleType}
              helperText={errors.vehicleType?.message}
              {...register('vehicleType', { required: 'Vehicle type is required' })}
            >
              {VehicleTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>
            <TextField
              id="form-owner-name"
              fullWidth
              label="Owner Full Name"
              placeholder="e.g. John Doe"
              error={!!errors.ownerName}
              helperText={errors.ownerName?.message}
              {...register('ownerName', { required: 'Owner name is required' })}
            />
            <TextField
              id="form-owner-mobile"
              fullWidth
              label="Owner Mobile Number"
              placeholder="e.g. 9876543210"
              error={!!errors.ownerMobile}
              helperText={errors.ownerMobile?.message}
              {...register('ownerMobile', {
                required: 'Owner mobile is required',
                pattern: { value: /^[0-9]{10}$/, message: 'Mobile number must be exactly 10 digits' },
              })}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button onClick={() => setDialogOpen(false)} variant="outlined" color="inherit">
              Cancel
            </Button>
            <Button id="save-vehicle-btn" type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : editMode ? 'Save Changes' : 'Register'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <ConfirmDialog
        open={deleteOpen}
        title="Delete Vehicle"
        message="Are you sure you want to delete this vehicle? This will permanently remove its registration profile from the system."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </PageContainer>
  );
};

export default Vehicles;
