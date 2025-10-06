import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Spinner from '@/components/ui/Spinner';

// Lazy load pages for better performance
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'));
const CustomersPage = lazy(() => import('@/pages/customers/CustomersPage'));
const InventoryPage = lazy(() => import('@/pages/inventory/InventoryPage'));
const InvoicesPage = lazy(() => import('@/pages/invoices/InvoicesPage'));
const ProfilePage = lazy(() => import('@/pages/settings/ProfilePage'));

// Placeholder components for routes that don't have a page yet
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
    <div className="text-slate-800 dark:text-white">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p>This page is under construction.</p>
    </div>
);

const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center"><Spinner /></div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/settings" element={<ProfilePage />} />

          {/* Fallback routes for other sidebar links */}
          <Route path="/dispatcher" element={<PlaceholderPage title="Dispatcher" />} />
          <Route path="/appointments" element={<PlaceholderPage title="Appointments" />} />
          <Route path="/visits" element={<PlaceholderPage title="Visits" />} />
          <Route path="/quotes" element={<PlaceholderPage title="Quotes" />} />
          <Route path="/expenses" element={<PlaceholderPage title="Expenses" />} />
          <Route path="/tasks" element={<PlaceholderPage title="Tasks" />} />
          <Route path="/reports" element={<PlaceholderPage title="Reports" />} />
          <Route path="/team" element={<PlaceholderPage title="Team" />} />
        </Route>
        
        {/* Add a catch-all route if needed */}
        <Route path="*" element={<LoginPage />} /> 
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
