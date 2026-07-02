import React, { useState, useEffect, useRef } from 'react';
import dashboardService from '../services/dashboardService';
import { toast } from 'react-toastify';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Stack,
  Skeleton,
  Chip,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { PageContainer, PageHeader, KpiCard, GRID_SPACING } from '../components/layout';

const POLLING_INTERVAL = 15000;

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const intervalRef = useRef(null);

  const fetchDashboardData = async (isSilent = false) => {
    if (!isSilent) setLoading(true);

    try {
      const [statsData, analyticsData] = await Promise.all([
        dashboardService.getDashboard(),
        dashboardService.getAnalytics(),
      ]);
      setStats(statsData);
      setAnalytics(analyticsData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching dashboard info:', error);
      if (!isSilent) toast.error('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    intervalRef.current = setInterval(() => {
      fetchDashboardData(true);
    }, POLLING_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (loading && !stats) {
    return (
      <PageContainer>
        <Box>
          <Skeleton variant="text" width={260} height={36} />
          <Skeleton variant="text" width={320} height={20} sx={{ mt: 0.5 }} />
        </Box>
        <Grid container spacing={GRID_SPACING}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Skeleton variant="rounded" height={110} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={GRID_SPACING}>
          {[1, 2].map((i) => (
            <Grid item xs={12} lg={6} key={i}>
              <Skeleton variant="rounded" height={320} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      </PageContainer>
    );
  }

  const pieData = stats && stats.totalSlots > 0
    ? [
        { name: 'Available', value: Number(stats.availableSlots) },
        { name: 'Occupied', value: Number(stats.occupiedSlots) },
      ]
    : [];

  const PIE_COLORS = ['#10b981', '#f43f5e'];

  const barData = analytics
    ? [
        { name: 'Today', Revenue: analytics.todayRevenue || 0 },
        { name: 'This Month', Revenue: analytics.monthlyRevenue || 0 },
      ]
    : [];

  const statCards = stats
    ? [
        {
          title: 'Total Slots',
          value: stats.totalSlots,
          icon: <LocalParkingIcon />,
          color: '#6366f1',
          subtitle: 'Registered parking spaces',
        },
        {
          title: 'Available Slots',
          value: stats.availableSlots,
          icon: <CheckCircleIcon />,
          color: '#10b981',
          subtitle: 'Ready for allocation',
        },
        {
          title: 'Occupied Slots',
          value: stats.occupiedSlots,
          icon: <DirectionsCarIcon />,
          color: '#f43f5e',
          subtitle: 'Currently in use',
        },
        {
          title: 'Registered Vehicles',
          value: stats.totalVehicles,
          icon: <DirectionsCarIcon />,
          color: '#06b6d4',
          subtitle: 'Total fleet registered',
        },
        {
          title: 'Active Sessions',
          value: stats.activeParking,
          icon: <LocalParkingIcon />,
          color: '#f59e0b',
          subtitle: 'Vehicles currently parked',
        },
        {
          title: 'Total Revenue',
          value: `₹${Number(stats.totalRevenue || 0).toFixed(0)}`,
          icon: <MonetizationOnIcon />,
          color: '#8b5cf6',
          subtitle: 'All-time earnings',
        },
      ]
    : [];

  return (
    <PageContainer>
      <PageHeader
        title="Operations Dashboard"
        subtitle="Real-time analytics & parking metrics"
        badge={
          lastUpdated && (
            <Chip
              icon={<FiberManualRecordIcon sx={{ fontSize: '10px !important', color: '#10b981 !important' }} />}
              label={`Updated ${lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.72rem', height: 22, borderColor: '#e2e8f0' }}
            />
          )
        }
      />

      <Grid container spacing={GRID_SPACING}>
        {statCards.map((card, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <KpiCard {...card} />
          </Grid>
        ))}
      </Grid>

      {analytics && (
        <Grid container spacing={GRID_SPACING}>
          <Grid item xs={12} sm={6}>
            <KpiCard
              title="Most Used Slot"
              value={analytics.mostUsedSlot || 'N/A'}
              icon={<TrendingUpIcon />}
              color="#6366f1"
              subtitle={
                analytics.mostUsedCount > 0
                  ? `${analytics.mostUsedCount} total uses`
                  : 'No usage data yet'
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <KpiCard
              title="Occupancy Rate"
              value={`${analytics.occupancyPercentage?.toFixed(1) || '0.0'}%`}
              icon={<LocalParkingIcon />}
              color="#10b981"
              subtitle="Current lot utilization"
            />
          </Grid>
        </Grid>
      )}

      <Grid container spacing={GRID_SPACING}>
        <Grid item xs={12} lg={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', mb: 0.25 }}>
                Slot Occupancy
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Current live parking distribution
              </Typography>
              <Box sx={{ width: '100%', height: 300, mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stats && stats.totalSlots > 0 ? (
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={105}
                        paddingAngle={4}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {pieData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip formatter={(value) => [`${value} Slots`]} />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <Box sx={{ textAlign: 'center' }}>
                    <LocalParkingIcon sx={{ fontSize: 48, color: '#cbd5e1', mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      No slots registered yet
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', mb: 0.25 }}>
                Revenue Analytics
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Today vs. monthly earnings (₹)
              </Typography>
              <Box sx={{ width: '100%', height: 300, mt: 2 }}>
                <ResponsiveContainer>
                  <BarChart data={barData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <defs>
                      <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#4f46e5" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 13, fontWeight: 600 }} />
                    <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${v}`} />
                    <ChartTooltip
                      formatter={(v) => [`₹${v}`, 'Revenue']}
                      contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
                    />
                    <Legend />
                    <Bar dataKey="Revenue" fill="url(#revGradient)" radius={[8, 8, 0, 0]} maxBarSize={100} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Dashboard;
