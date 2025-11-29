import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  InputAdornment,
  MenuItem,
  Skeleton,
} from '@mui/material';
import {
  Add,
  Search,
  Edit,
  Visibility,
  FilterList,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { formatDate, formatCurrency } from '../utils';
import type { DocumentDto } from '../types/api.types';

const DOCUMENT_STATUSES = [
  { value: '', label: 'Svi statusi' },
  { value: '1', label: 'Draft' },
  { value: '2', label: 'Aktivan' },
  { value: '3', label: 'Zatvoren' },
  { value: '4', label: 'Storniran' },
];

export const DocumentListPage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [searchNumber, setSearchNumber] = useState('');
  const [searchDateFrom, setSearchDateFrom] = useState('');
  const [searchDateTo, setSearchDateTo] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['documents', page, pageSize, searchNumber, searchDateFrom, searchDateTo, statusFilter],
    queryFn: () =>
      api.document.list({
        pageNumber: page + 1,
        pageSize,
        // TODO: Dodati ostale filtere kada backend podrži
      }),
    keepPreviousData: true,
  });

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    setPage(0);
    refetch();
  };

  const handleViewDocument = (id: number) => {
    navigate(`/documents/${id}`);
  };

  const handleCreateDocument = () => {
    navigate('/documents/new');
  };

  const getStatusChip = (statusId: number | null) => {
    const statusMap: Record<number, { label: string; color: 'default' | 'success' | 'info' | 'error' }> = {
      1: { label: 'Draft', color: 'default' },
      2: { label: 'Aktivan', color: 'success' },
      3: { label: 'Zatvoren', color: 'info' },
      4: { label: 'Storniran', color: 'error' },
    };
    const status = statusId ? statusMap[statusId] : { label: 'Nepoznat', color: 'default' as const };
    return <Chip label={status.label} color={status.color} size="small" />;
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Dokumenti
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Pregled i pretraga dokumenata
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreateDocument}
          size="large"
        >
          Novi Dokument
        </Button>
      </Box>

      {/* Search Filters */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <FilterList sx={{ mr: 1 }} />
          <Typography variant="h6">Filteri</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Broj dokumenta"
              value={searchNumber}
              onChange={(e) => setSearchNumber(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Datum od"
              type="date"
              value={searchDateFrom}
              onChange={(e) => setSearchDateFrom(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Datum do"
              type="date"
              value={searchDateTo}
              onChange={(e) => setSearchDateTo(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              select
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {DOCUMENT_STATUSES.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" onClick={handleSearch} startIcon={<Search />}>
            Pretraži
          </Button>
        </Box>
      </Paper>

      {/* Results Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Broj</TableCell>
                <TableCell>Datum</TableCell>
                <TableCell>Tip</TableCell>
                <TableCell>Partner</TableCell>
                <TableCell>Magacin</TableCell>
                <TableCell align="right">Iznos Neto</TableCell>
                <TableCell align="right">PDV</TableCell>
                <TableCell align="right">Ukupno</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Akcije</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 10 }).map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Skeleton />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : data?.items && data.items.length > 0 ? (
                data.items.map((doc: DocumentDto) => (
                  <TableRow
                    key={doc.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleViewDocument(doc.id)}
                  >
                    <TableCell>{doc.documentNumber}</TableCell>
                    <TableCell>{formatDate(doc.date)}</TableCell>
                    <TableCell>{doc.documentTypeCode}</TableCell>
                    <TableCell>{doc.partnerName || '-'}</TableCell>
                    <TableCell>{doc.organizationalUnitName}</TableCell>
                    <TableCell align="right">{formatCurrency(doc.totalAmountNet)}</TableCell>
                    <TableCell align="right">{formatCurrency(doc.totalAmountVat)}</TableCell>
                    <TableCell align="right">
                      <strong>{formatCurrency(doc.totalAmountGross)}</strong>
                    </TableCell>
                    <TableCell>{getStatusChip(doc.statusId)}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDocument(doc.id);
                        }}
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    <Typography variant="body2" color="text.secondary" py={4}>
                      Nema dokumenata za prikaz
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={data?.totalCount || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 20, 50, 100]}
          labelRowsPerPage="Redova po stranici:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} od ${count}`}
        />
      </Paper>
    </Box>
  );
};
