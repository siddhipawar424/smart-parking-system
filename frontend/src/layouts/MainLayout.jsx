import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
  Tooltip,
  Button,
  useTheme,
  useMediaQuery,
  Stack,
  Breadcrumbs,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import PlayForWorkIcon from '@mui/icons-material/PlayForWork';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LightModeIcon from '@mui/icons-material/LightMode';
import HomeIcon from '@mui/icons-material/Home';

const DRAWER_OPEN_WIDTH = 240;
const DRAWER_COLLAPSED_WIDTH = 72;

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  
  // Sidebar states
  const [openMobile, setOpenMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isTablet); // Collapse by default on tablet
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Notification menu states
  const [notiAnchorEl, setNotiAnchorEl] = useState(null);
  const isNotiOpen = Boolean(notiAnchorEl);

  const handleNotiClick = (event) => setNotiAnchorEl(event.currentTarget);
  const handleNotiClose = () => setNotiAnchorEl(null);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setOpenMobile(!openMobile);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard',       icon: <DashboardIcon />,   path: '/dashboard', roles: ['ADMIN'] },
    { text: 'Vehicles',        icon: <DirectionsCarIcon />, path: '/vehicles',  roles: ['ADMIN', 'USER'] },
    { text: 'Parking Slots',   icon: <LocalParkingIcon />, path: '/slots',     roles: ['ADMIN'] },
    { text: 'Park Vehicle',    icon: <PlayForWorkIcon sx={{ transform: 'rotate(90deg)' }} />, path: '/park', roles: ['ADMIN', 'USER'] },
    { text: 'Exit Vehicle',    icon: <ExitToAppIcon />,    path: '/exit',     roles: ['ADMIN', 'USER'] },
    { text: 'Parking History', icon: <HistoryIcon />,     path: '/history',  roles: ['ADMIN', 'USER'] },
    { text: 'Inquiries',       icon: <MarkEmailReadIcon />, path: '/inquiries', roles: ['ADMIN'] },
  ];

  const filteredMenuItems = menuItems.filter(
    (item) => !item.roles || (user && item.roles.includes(user.role))
  );

  const currentPage = filteredMenuItems.find((item) => item.path === location.pathname);
  const currentPageTitle = currentPage?.text || 'SmartPark';

  const drawerWidth = isMobile
    ? DRAWER_OPEN_WIDTH
    : isCollapsed
    ? DRAWER_COLLAPSED_WIDTH
    : DRAWER_OPEN_WIDTH;

  const sidebarContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#0f172a', // Premium deep slate background
        color: '#f8fafc',
        borderRight: '1px solid #1e293b',
      }}
    >
      {/* Brand Header */}
      <Box
        sx={{
          height: 64,
          px: isCollapsed && !isMobile ? 1.5 : 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed && !isMobile ? 'center' : 'space-between',
          borderBottom: '1px solid #1e293b',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, overflow: 'hidden' }}>
          <Box
            sx={{
              p: 0.75,
              borderRadius: 1.5,
              background: 'linear-gradient(135deg, #4f46e5 0%, #0d9488 100%)',
              display: 'flex',
              flexShrink: 0,
            }}
          >
            <LocalParkingIcon sx={{ fontSize: 20, color: '#fff' }} />
          </Box>
          {(!isCollapsed || isMobile) && (
            <Typography
              variant="h6"
              sx={{ fontWeight: 900, letterSpacing: '-0.03em', color: '#ffffff', whiteSpace: 'nowrap' }}
            >
              Smart<span style={{ color: '#14b8a6' }}>Park</span>
            </Typography>
          )}
        </Box>
        {isMobile && (
          <IconButton onClick={() => setOpenMobile(false)} sx={{ color: '#94a3b8' }} size="small">
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>

      {/* Navigation Items */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', py: 2, px: 1.5 }}>
        <List sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {filteredMenuItems.map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding>
                <Tooltip title={isCollapsed && !isMobile ? item.text : ''} placement="right" arrow>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    onClick={() => isMobile && setOpenMobile(false)}
                    sx={{
                      borderRadius: 1.5,
                      py: 1.25,
                      px: isCollapsed && !isMobile ? 0 : 1.75,
                      justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start',
                      transition: 'all 0.15s ease',
                      backgroundColor: isSelected ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
                      color: isSelected ? '#a5b4fc' : '#94a3b8',
                      position: 'relative',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        color: '#ffffff',
                        '& .MuiListItemIcon-root': {
                          color: '#ffffff',
                        },
                      },
                      '& .MuiListItemIcon-root': {
                        color: isSelected ? '#a5b4fc' : '#64748b',
                        minWidth: isCollapsed && !isMobile ? 0 : 36,
                        justifyContent: 'center',
                        transition: 'color 0.15s ease',
                      },
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    {(!isCollapsed || isMobile) && (
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          fontSize: '0.85rem',
                          fontWeight: isSelected ? 700 : 500,
                          letterSpacing: '0.01em',
                        }}
                      />
                    )}
                    {isSelected && !isCollapsed && (
                      <Box
                        sx={{
                          position: 'absolute',
                          right: 8,
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          backgroundColor: '#14b8a6',
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Sidebar Footer Profile */}
      <Box sx={{ borderTop: '1px solid #1e293b', p: 2 }}>
        {(!isCollapsed || isMobile) ? (
          <Box sx={{ mb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <Avatar
                sx={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #14b8a6 100%)',
                  width: 34,
                  height: 34,
                  fontSize: '0.85rem',
                  fontWeight: 700,
                }}
              >
                {user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </Avatar>
              <Box sx={{ overflow: 'hidden' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#e2e8f0',
                    fontWeight: 600,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontSize: '0.8rem',
                  }}
                >
                  {user?.email || 'User'}
                </Typography>
                <Chip
                  label={user?.role}
                  size="small"
                  sx={{
                    height: 18,
                    fontSize: '0.625rem',
                    fontWeight: 800,
                    mt: 0.25,
                    backgroundColor: user?.role === 'ADMIN' ? 'rgba(79, 70, 229, 0.2)' : 'rgba(13, 148, 136, 0.18)',
                    color: user?.role === 'ADMIN' ? '#a5b4fc' : '#5eead4',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                />
              </Box>
            </Box>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              size="small"
              onClick={handleLogout}
              startIcon={<LogoutIcon fontSize="small" />}
              sx={{
                py: 1,
                borderColor: 'rgba(239, 68, 68, 0.2)',
                color: '#f87171',
                fontSize: '0.8rem',
                '&:hover': {
                  borderColor: '#ef4444',
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                },
              }}
            >
              Sign Out
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Tooltip title={user?.email || 'User'} placement="right" arrow>
              <Avatar
                sx={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #14b8a6 100%)',
                  width: 34,
                  height: 34,
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              />
            </Tooltip>
            <Tooltip title="Sign Out" placement="right" arrow>
              <IconButton onClick={handleLogout} sx={{ color: '#f87171', p: 1, '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.08)' } }}>
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Navbar AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
          ml: isMobile ? 0 : `${drawerWidth}px`,
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          zIndex: theme.zIndex.drawer - 1,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter,
          }),
        }}
      >
        <Toolbar sx={{ px: 3, height: 64, display: 'flex', justifyContent: 'space-between' }}>
          {/* Left Block: Hamburger & Breadcrumbs */}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ minWidth: 0 }}>
            <IconButton
              aria-label="toggle sidebar"
              onClick={handleDrawerToggle}
              sx={{
                color: '#475569',
                backgroundColor: '#f1f5f9',
                borderRadius: 1.5,
                p: 1,
                '&:hover': {
                  backgroundColor: '#e2e8f0',
                },
              }}
            >
              {isMobile ? <MenuIcon /> : isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>

            {/* Breadcrumb Navigation */}
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiBreadcrumbs-separator': { color: '#cbd5e1' },
              }}
            >
              <Link to="/" style={{ display: 'flex', alignItems: 'center', color: '#64748b' }}>
                <HomeIcon sx={{ mr: 0.5, fontSize: 16 }} />
              </Link>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                {currentPageTitle}
              </Typography>
            </Breadcrumbs>
          </Stack>

          {/* Right Block: Actions, Notifications, Profile */}
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Dummy theme toggle icon */}
            <Tooltip title="Light mode active">
              <IconButton size="small" sx={{ color: '#64748b', bgcolor: '#f8fafc', p: 1, border: '1px solid #e2e8f0' }}>
                <LightModeIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>

            {/* Notifications Dropdown */}
            <Tooltip title="Notifications">
              <IconButton
                size="small"
                onClick={handleNotiClick}
                sx={{
                  color: '#64748b',
                  bgcolor: '#f8fafc',
                  p: 1,
                  border: '1px solid #e2e8f0',
                }}
              >
                <Badge badgeContent={2} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.625rem', height: 16, minWidth: 16 } }}>
                  <NotificationsIcon sx={{ fontSize: 18 }} />
                </Badge>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={notiAnchorEl}
              open={isNotiOpen}
              onClose={handleNotiClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                sx: {
                  width: 280,
                  maxHeight: 360,
                  mt: 1.5,
                  borderRadius: 2,
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e2e8f0',
                  p: 0.5,
                },
              }}
            >
              <Box sx={{ px: 2, py: 1.25 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>System Notifications</Typography>
                <Typography variant="caption" color="text.secondary">Real-time parking system alerts</Typography>
              </Box>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={handleNotiClose} sx={{ py: 1.25, borderRadius: 1 }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>System Active</Typography>
                  <Typography variant="caption" color="text.secondary">Stateless security API filters configured</Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={handleNotiClose} sx={{ py: 1.25, borderRadius: 1 }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Lot-A Operations</Typography>
                  <Typography variant="caption" color="text.secondary">Live metrics sync completed successfully</Typography>
                </Box>
              </MenuItem>
            </Menu>

            {/* Profile Avatar / Quick Details */}
            <Stack direction="row" spacing={1} alignItems="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Avatar
                sx={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #14b8a6 100%)',
                  width: 32,
                  height: 32,
                  fontSize: '0.8rem',
                  fontWeight: 700,
                }}
              >
                {user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </Avatar>
              <Box sx={{ lineHeight: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', color: 'text.primary' }}>
                  {user?.email?.split('@')[0]}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.675rem', fontWeight: 600 }}>
                  {user?.role}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{
          width: isMobile ? 0 : drawerWidth,
          flexShrink: 0,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter,
          }),
        }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={openMobile}
            onClose={() => setOpenMobile(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_OPEN_WIDTH, border: 'none' },
            }}
          >
            {sidebarContent}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                border: 'none',
                boxShadow: '4px 0 24px rgba(0,0,0,0.02)',
                transition: theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.shorter,
                }),
                overflowX: 'hidden',
              },
            }}
          >
            {sidebarContent}
          </Drawer>
        )}
      </Box>

      {/* Main Content Layout Block */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          minHeight: '100vh',
          pt: '64px', // Matches AppBar height
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter,
          }),
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          className="page-enter"
          sx={{
            flexGrow: 1,
            width: '100%',
            py: 4,
            px: { xs: 2.5, sm: 4, lg: 6 },
          }}
        >
          <Outlet />
        </Box>
        
        {/* Unified Layout Footer */}
        <Box
          component="footer"
          sx={{
            py: 2.5,
            px: { xs: 2.5, sm: 4, lg: 6 },
            borderTop: '1px solid #e2e8f0',
            backgroundColor: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1.5,
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            &copy; {new Date().getFullYear()} SmartPark Management Platform.
          </Typography>
          <Stack direction="row" spacing={2.5}>
            <Link to="/about" style={{ fontSize: '0.725rem', color: '#64748b', fontWeight: 600 }}>About</Link>
            <Link to="/contact" style={{ fontSize: '0.725rem', color: '#64748b', fontWeight: 600 }}>Contact Support</Link>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
