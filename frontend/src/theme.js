import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4f46e5', // Indigo 600
      light: '#6366f1', // Indigo 500
      dark: '#3730a3', // Indigo 800
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0d9488', // Teal 600
      light: '#14b8a6', // Teal 500
      dark: '#115e59', // Teal 800
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc', // Slate 50
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a', // Slate 900
      secondary: '#475569', // Slate 600
      disabled: '#94a3b8',
    },
    success: {
      main: '#059669', // Emerald 600
      light: '#10b981',
      dark: '#064e3b',
    },
    error: {
      main: '#e11d48', // Rose 600
      light: '#f43f5e',
      dark: '#881337',
    },
    warning: {
      main: '#d97706', // Amber 600
      light: '#f59e0b',
      dark: '#78350f',
    },
    info: {
      main: '#2563eb', // Blue 600
      light: '#3b82f6',
      dark: '#1e3a8a',
    },
    divider: '#e2e8f0', // Slate 200
  },
  typography: {
    fontFamily: [
      'Outfit',
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 800,
      fontSize: '2.5rem',
      lineHeight: 1.15,
      letterSpacing: '-0.03em',
      color: '#0f172a',
    },
    h2: {
      fontWeight: 800,
      fontSize: '2rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#0f172a',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.625rem',
      lineHeight: 1.25,
      letterSpacing: '-0.02em',
      color: '#0f172a',
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.25rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      color: '#0f172a',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
      color: '#0f172a',
    },
    h6: {
      fontWeight: 600,
      fontSize: '0.975rem',
      lineHeight: 1.4,
      color: '#0f172a',
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: '0.925rem',
      lineHeight: 1.5,
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: '0.85rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '0.925rem',
      lineHeight: 1.5,
      color: '#334155', // Slate 700
    },
    body2: {
      fontSize: '0.85rem',
      lineHeight: 1.5,
      color: '#475569', // Slate 600
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.85rem',
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 8, // Standard professional rounded radius (SaaS style)
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '8px 16px',
          fontWeight: 600,
          transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-0.5px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
          color: '#ffffff',
          boxShadow: '0 2px 4px rgba(79, 70, 229, 0.15)',
          '&:hover': {
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            boxShadow: '0 4px 8px rgba(79, 70, 229, 0.25)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #0d9488 0%, #115e59 100%)',
          color: '#ffffff',
          boxShadow: '0 2px 4px rgba(13, 148, 136, 0.15)',
          '&:hover': {
            background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
            boxShadow: '0 4px 8px rgba(13, 148, 136, 0.25)',
          },
        },
        outlined: {
          border: '1px solid #cbd5e1',
          color: '#334155',
          backgroundColor: '#ffffff',
          '&:hover': {
            backgroundColor: '#f8fafc',
            borderColor: '#94a3b8',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0',
          backgroundImage: 'none',
          backgroundColor: '#ffffff',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
            borderColor: '#cbd5e1',
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          overflowX: 'auto',
          border: '1px solid #e2e8f0',
          borderRadius: 8,
          boxShadow: 'none',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #f1f5f9',
          padding: '12px 16px',
          fontSize: '0.85rem',
          color: '#334155',
        },
        head: {
          fontWeight: 700,
          backgroundColor: '#f8fafc',
          color: '#475569',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          borderBottom: '1px solid #e2e8f0',
          padding: '10px 16px',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.1s ease',
          '&:nth-of-type(even)': {
            backgroundColor: '#f8fafc',
          },
          '&:hover': {
            backgroundColor: 'rgba(79, 70, 229, 0.03) !important',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          backgroundColor: '#ffffff',
          transition: 'all 0.15s ease',
          fontSize: '0.875rem',
          '&:hover': {
            backgroundColor: '#ffffff',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#cbd5e1',
            },
          },
          '&.Mui-focused': {
            backgroundColor: '#ffffff',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4f46e5',
              borderWidth: '2px',
            },
          },
        },
        notchedOutline: {
          borderColor: '#e2e8f0',
          transition: 'border-color 0.15s ease',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid #e2e8f0',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 600,
          fontSize: '0.725rem',
          height: 22,
        },
      },
    },
  },
});

export default theme;
