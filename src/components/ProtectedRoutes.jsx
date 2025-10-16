import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ roles = [] }) {
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const location = useLocation();
  const redirectTo = '/admin/login'; // or '/login'

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }
  if (roles.length && (!user || !roles.includes(user.role))) {
    return <Navigate to={redirectTo} replace />;
  }
  return <Outlet />;
}