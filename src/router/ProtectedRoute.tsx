import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AppLayout from '@/components/layout/AppLayout';

const ProtectedRoute: React.FC = () => {
  const { session, loading } = useAuth();
  
  // Don't render anything while the session is being loaded.
  // The AuthProvider already shows a global spinner.
  if (loading) {
    return null;
  }
  
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <AppLayout>
        <Outlet />
    </AppLayout>
  );
};

export default ProtectedRoute;
