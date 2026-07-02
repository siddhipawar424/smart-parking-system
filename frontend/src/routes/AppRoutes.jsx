import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../layouts/MainLayout';
import PublicLayout from '../layouts/PublicLayout';
import { useAuth } from '../hooks/useAuth';

// Public Pages
import Landing from '../pages/Landing';
import Features from '../pages/Features';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';

// Protected Pages
import Dashboard from '../pages/Dashboard';
import Vehicles from '../pages/Vehicles';
import Slots from '../pages/Slots';
import ParkVehicle from '../pages/ParkVehicle';
import ExitVehicle from '../pages/ExitVehicle';
import ParkingHistory from '../pages/ParkingHistory';
import Inquiries from '../pages/Inquiries';

// Smart redirect helper based on role
const RoleRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={user.role === 'ADMIN' ? '/dashboard' : '/vehicles'} replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* ── Public Layout & Sub-routes ── */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Landing />} />
        <Route path="features" element={<Features />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* ── Standalone Public Auth pages ── */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ── Protected Operations Layout (Pathless layout) ── */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Root redirect within app context */}
        <Route path="/app" element={<RoleRedirect />} />

        {/* Admin only */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/slots"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Slots />
            </ProtectedRoute>
          }
        />

        {/* Admin and User */}
        <Route
          path="/vehicles"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'USER']}>
              <Vehicles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/park"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'USER']}>
              <ParkVehicle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exit"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'USER']}>
              <ExitVehicle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'USER']}>
              <ParkingHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inquiries"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Inquiries />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
