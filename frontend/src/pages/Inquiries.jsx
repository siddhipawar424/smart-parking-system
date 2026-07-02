import React, { useState, useEffect } from 'react';
import contactService from '../services/contactService';
import { toast } from 'react-toastify';
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  InputAdornment,
  MenuItem,
  Button,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InboxIcon from '@mui/icons-material/Inbox';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import EmptyState from '../components/EmptyState';
import ConfirmDialog from '../components/ConfirmDialog';
import { PageContainer, PageHeader, KpiCard, SearchToolbar, DataTable, GRID_SPACING } from '../components/layout';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const data = await contactService.getAllInquiries();
      const sorted = [...data].sort(
        (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
      );
      setInquiries(sorted);
    } catch (err) {
      console.error('Error loading inquiries:', err);
      toast.error('Failed to load contact inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const updated = await contactService.updateInquiryStatus(id, newStatus);
      toast.success(`Inquiry status updated to ${newStatus}`);
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: updated.status } : inq))
      );
      if (selected && selected.id === id) {
        setSelected((prev) => ({ ...prev, status: updated.status }));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      toast.error('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleOpenDelete = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await contactService.deleteInquiry(deleteId);
      toast.success('Inquiry deleted successfully');
      setInquiries((prev) => prev.filter((inq) => inq.id !== deleteId));
      if (selected && selected.id === deleteId) {
        setSelected(null);
      }
      setDeleteOpen(false);
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
      toast.error('Failed to delete inquiry');
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dt) => {
    if (!dt) return '—';
    return new Date(dt).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusChip = (status) => {
    const s = status ? status.toUpperCase() : 'PENDING';
    if (s === 'SOLVED') {
      return (
        <Chip
          icon={<CheckCircleIcon fontSize="small" />}
          label="Solved"
          size="small"
          sx={{ fontWeight: 700, bgcolor: 'rgba(16,185,129,0.08)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}
        />
      );
    }
    if (s === 'IN_PROGRESS') {
      return (
        <Chip
          icon={<AutorenewIcon fontSize="small" />}
          label="In Progress"
          size="small"
          sx={{ fontWeight: 700, bgcolor: 'rgba(245,158,11,0.08)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }}
        />
      );
    }
    return (
      <Chip
        icon={<InfoIcon fontSize="small" />}
        label="Pending"
        size="small"
        sx={{ fontWeight: 700, bgcolor: 'rgba(244,63,94,0.08)', color: '#f43f5e', border: '1px solid rgba(244,63,94,0.2)' }}
      />
    );
  };

  const filtered = inquiries.filter((q) => {
    const matchesSearch =
      q.name?.toLowerCase().includes(search.toLowerCase()) ||
      q.email?.toLowerCase().includes(search.toLowerCase()) ||
      q.subject?.toLowerCase().includes(search.toLowerCase()) ||
      q.message?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'ALL' || (q.status || 'PENDING').toUpperCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = inquiries.filter((q) => (q.status || 'PENDING').toUpperCase() === 'PENDING').length;
  const progressCount = inquiries.filter((q) => (q.status || 'PENDING').toUpperCase() === 'IN_PROGRESS').length;
  const solvedCount = inquiries.filter((q) => (q.status || 'PENDING').toUpperCase() === 'SOLVED').length;

  return (
    <PageContainer>
      <PageHeader
        title="Contact Inquiries"
        subtitle="Manage and respond to messages submitted through the public site"
        badge={
          <Chip
            icon={<MarkEmailReadIcon fontSize="small" />}
            label={`${inquiries.length} Total Messages`}
            sx={{ fontWeight: 700, bgcolor: 'rgba(99,102,241,0.08)', color: 'primary.main', border: '1px solid rgba(99,102,241,0.2)' }}
          />
        }
      />

      <Grid container spacing={GRID_SPACING}>
        <Grid item xs={12} sm={4}>
          <KpiCard title="Pending" value={pendingCount} icon={<InfoIcon />} color="#f43f5e" loading={loading} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <KpiCard title="In Progress" value={progressCount} icon={<AutorenewIcon />} color="#f59e0b" loading={loading} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <KpiCard title="Solved" value={solvedCount} icon={<CheckCircleIcon />} color="#10b981" loading={loading} />
        </Grid>
      </Grid>

      <SearchToolbar>
        <TextField
          id="search-inquiries"
          size="small"
          placeholder="Search by name, email, subject, or message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, minWidth: { xs: '100%', sm: 240 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
        />
        <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 180 } }}>
          <InputLabel id="status-filter-label">Filter by Status</InputLabel>
          <Select
            labelId="status-filter-label"
            id="status-filter-select"
            value={statusFilter}
            label="Filter by Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="ALL">All Inquiries</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
            <MenuItem value="SOLVED">Solved</MenuItem>
          </Select>
        </FormControl>
      </SearchToolbar>

      <DataTable>
        {loading ? (
          <Box sx={{ p: 2 }}>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="rounded" height={52} sx={{ mb: 1, borderRadius: 1.5 }} />
            ))}
          </Box>
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No Inquiries Found"
            description={
              search || statusFilter !== 'ALL'
                ? 'Try adjusting your search criteria or status filter.'
                : 'No contact inquiries have been logged in the system.'
            }
            icon={InboxIcon}
          />
        ) : (
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Sender</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((inq, idx) => (
                <TableRow
                  key={inq.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setSelected(inq)}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.disabled' }}>
                      #{idx + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {inq.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {inq.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    >
                      {inq.subject}
                    </Typography>
                  </TableCell>
                  <TableCell>{getStatusChip(inq.status)}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
                      {formatDate(inq.submittedAt)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                    <Stack direction="row" spacing={0.5} justifyContent="center">
                      <Tooltip title="View Message">
                        <IconButton
                          size="small"
                          onClick={() => setSelected(inq)}
                          sx={{ color: 'primary.main', '&:hover': { bgcolor: 'rgba(99,102,241,0.08)' } }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Message">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDelete(inq.id)}
                          sx={{ color: 'error.main', '&:hover': { bgcolor: 'rgba(244,63,94,0.08)' } }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DataTable>

      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        {selected && (
          <>
            <DialogTitle sx={{ pr: 6, fontWeight: 800 }}>
              Message details
              <IconButton
                onClick={() => setSelected(null)}
                sx={{ position: 'absolute', right: 12, top: 12, color: 'text.secondary' }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2.5}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(99,102,241,0.08)', color: 'primary.main', display: 'flex' }}>
                        <PersonIcon fontSize="small" />
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, textTransform: 'uppercase' }}>
                          Name
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {selected.name}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(20,184,166,0.08)', color: 'secondary.main', display: 'flex' }}>
                        <EmailIcon fontSize="small" />
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, textTransform: 'uppercase' }}>
                          Email
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {selected.email}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>

                <Divider />

                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(245,158,11,0.08)', color: 'warning.main', display: 'flex' }}>
                    <SubjectIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, textTransform: 'uppercase' }}>
                      Subject
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {selected.subject}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(139,92,246,0.08)', color: '#8b5cf6', display: 'flex' }}>
                    <AccessTimeIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, textTransform: 'uppercase' }}>
                      Received At
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {formatDate(selected.submittedAt)}
                    </Typography>
                  </Box>
                </Stack>

                <Divider />

                <FormControl fullWidth size="small">
                  <InputLabel id="dialog-status-label">Update Status</InputLabel>
                  <Select
                    labelId="dialog-status-label"
                    id="dialog-status-select"
                    value={(selected.status || 'PENDING').toUpperCase()}
                    label="Update Status"
                    disabled={updatingId === selected.id}
                    onChange={(e) => handleUpdateStatus(selected.id, e.target.value)}
                  >
                    <MenuItem value="PENDING">Pending</MenuItem>
                    <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                    <MenuItem value="SOLVED">Solved</MenuItem>
                  </Select>
                </FormControl>

                <Divider />

                <Box>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, textTransform: 'uppercase', display: 'block', mb: 1 }}>
                    Message
                  </Typography>
                  <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                    <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                      {selected.message}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => handleOpenDelete(selected.id)}
                sx={{ mr: 'auto' }}
              >
                Delete
              </Button>
              <Button onClick={() => setSelected(null)} variant="contained" color="inherit">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <ConfirmDialog
        open={deleteOpen}
        title="Delete Inquiry Message"
        message="Are you sure you want to permanently delete this contact inquiry message? This action is irreversible."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </PageContainer>
  );
};

export default Inquiries;
