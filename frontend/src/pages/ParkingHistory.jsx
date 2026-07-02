import React, { useState, useEffect } from 'react';
import parkingService from '../services/parkingService';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Chip,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  InputAdornment,
  CircularProgress,
  TablePagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LoadingSpinner from '../components/LoadingSpinner';
import { PageContainer, PageHeader, SearchToolbar, DataTable } from '../components/layout';

const ParkingHistory = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState(null);
  const [exportingCSV, setExportingCSV] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await parkingService.getAllRecords();
      const sorted = data.sort((a, b) => new Date(b.entryTime) - new Date(a.entryTime));
      setRecords(sorted);
    } catch (error) {
      console.error('Error fetching parking history:', error);
      toast.error('Failed to load parking logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadHistory();
      return;
    }
    setLoading(true);
    try {
      const data = await parkingService.getHistoryByVehicleNumber(searchQuery.trim());
      const sorted = data.sort((a, b) => new Date(b.entryTime) - new Date(a.entryTime));
      setRecords(sorted);
    } catch (error) {
      console.error('Error searching history:', error);
      setRecords([]);
      toast.info('No parking history found for this vehicle');
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    loadHistory();
  };

  const handleDownloadReceipt = async (recordId) => {
    setDownloadingId(recordId);
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
      toast.success('Receipt PDF downloaded!');
    } catch (error) {
      console.error('Error downloading receipt:', error);
      toast.error('Failed to download receipt PDF');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleExportCSV = async () => {
    setExportingCSV(true);
    try {
      const blob = await parkingService.exportCSV();
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'text/csv' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Parking_Records_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('CSV log report exported!');
    } catch (error) {
      console.error('Error exporting CSV:', error);
      toast.error('Failed to export CSV report');
    } finally {
      setExportingCSV(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <PageContainer>
      <PageHeader
        title="Parking History"
        subtitle="Search and download historical parking records and receipts"
        actions={
          <Button
            id="export-csv-btn"
            variant="contained"
            onClick={handleExportCSV}
            disabled={exportingCSV || records.length === 0}
            startIcon={exportingCSV ? <CircularProgress size={18} color="inherit" /> : <FileDownloadIcon />}
            sx={{ background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)', boxShadow: '0 4px 12px rgba(20,184,166,0.3)' }}
          >
            Export CSV
          </Button>
        }
      />

      <SearchToolbar>
        <TextField
          id="search-history-input"
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
        <Button id="search-history-btn" variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </SearchToolbar>

      <DataTable>
        {loading && records.length === 0 ? (
          <LoadingSpinner message="Retrieving log database..." />
        ) : records.length === 0 ? (
          <Box sx={{ py: 5, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              No parking records found matching the query
            </Typography>
          </Box>
        ) : (
          <>
            <Table id="history-table" sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Vehicle Number</TableCell>
                  <TableCell>Slot</TableCell>
                  <TableCell>Entry Date & Time</TableCell>
                  <TableCell>Exit Date & Time</TableCell>
                  <TableCell>Parking Fee</TableCell>
                  <TableCell align="center">Receipt</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((record) => {
                    const isParked = record.exitTime === null;
                    return (
                      <TableRow key={record.id} hover>
                        <TableCell sx={{ fontWeight: 600 }}>{record.id}</TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {record.vehicle.vehicleNumber}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {record.vehicle.vehicleType}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={record.parkingSlot.slotNumber} size="small" sx={{ fontWeight: 600 }} />
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{formatDate(record.entryTime)}</TableCell>
                        <TableCell sx={{ fontSize: '0.85rem' }}>
                          {isParked ? (
                            <Chip
                              label="Currently Parked"
                              color="info"
                              size="small"
                              variant="outlined"
                              sx={{ fontWeight: 600, height: 22, fontSize: '0.72rem' }}
                            />
                          ) : (
                            formatDate(record.exitTime)
                          )}
                        </TableCell>
                        <TableCell>
                          {isParked ? (
                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                              Running...
                            </Typography>
                          ) : (
                            <Typography variant="body2" sx={{ fontWeight: 700, color: 'success.dark' }}>
                              ₹{record.parkingFee?.toFixed(2)}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            id={`download-receipt-${record.id}`}
                            size="small"
                            color="success"
                            onClick={() => handleDownloadReceipt(record.id)}
                            disabled={isParked || downloadingId === record.id}
                            title={isParked ? 'Active session: receipt not available' : 'Download PDF Receipt'}
                          >
                            {downloadingId === record.id ? (
                              <CircularProgress size={18} color="inherit" />
                            ) : (
                              <DownloadIcon fontSize="small" />
                            )}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={records.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ borderTop: '1px solid #e2e8f0' }}
            />
          </>
        )}
      </DataTable>
    </PageContainer>
  );
};

export default ParkingHistory;
