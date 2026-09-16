import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

interface ProtectedRouteProps { children: React.ReactNode; }

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token, user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  if (!token && !user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return <>{children}</>;
};
export default ProtectedRoute;
