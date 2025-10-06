import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  ChartBarIcon, PresentationChartLineIcon, BuildingStorefrontIcon, CurrencyDollarIcon,
  UserGroupIcon, Cog6ToothIcon, DocumentTextIcon, UserCircleIcon, BriefcaseIcon,
  CalendarDaysIcon, TruckIcon, DocumentChartBarIcon, CheckCircleIcon, CubeIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
// Fix: Import `translations` to be used in type casting for the `t` function.
import { defaultPermissions, translations } from '@/constants';
import { UserRole } from '@/types';

const iconMap: { [key: string]: React.ElementType } = {
  dashboard: ChartBarIcon,
  dispatcher: TruckIcon,
  customers: UserGroupIcon,
  appointments: CalendarDaysIcon,
  visits: BriefcaseIcon,
  quotes: DocumentTextIcon,
  invoices: DocumentChartBarIcon,
  inventory: CubeIcon,
  expenses: CurrencyDollarIcon,
  tasks: CheckCircleIcon,
  reports: PresentationChartLineIcon,
  team: UserGroupIcon,
  settings: Cog6ToothIcon,
  profile: UserCircleIcon,
};

const Sidebar: React.FC = () => {
  const { t } = useLanguage();
  const { profile } = useAuth();
  const location = useLocation();

  const userRole = profile?.role || 'field_service_employee';
  const allowedModules = defaultPermissions[userRole as UserRole] || [];

  const navLinks = [
    { name: 'dashboard', path: '/' },
    { name: 'dispatcher', path: '/dispatcher' },
    { name: 'customers', path: '/customers' },
    { name: 'appointments', path: '/appointments' },
    { name: 'visits', path: '/visits' },
    { name: 'quotes', path: '/quotes' },
    { name: 'invoices', path: '/invoices' },
    { name: 'inventory', path: '/inventory' },
    { name: 'expenses', path: '/expenses' },
    { name: 'tasks', path: '/tasks' },
    { name: 'reports', path: '/reports' },
    { name: 'team', path: '/team' },
    { name: 'settings', path: '/settings' },
  ];

  const filteredNavLinks = navLinks.filter(link => allowedModules.includes(link.name));

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-800 border-r dark:border-slate-700">
      <div className="flex items-center justify-center h-16 bg-white dark:bg-slate-800 border-b dark:border-slate-700">
        <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">ZOGU</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        {filteredNavLinks.map((link) => {
          const Icon = iconMap[link.name];
          const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
          return (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === '/'}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                isActive
                  ? 'bg-primary-100 text-primary-700 dark:bg-slate-700 dark:text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white'
              }`}
            >
              {Icon && <Icon className="w-5 h-5 mr-3" />}
              {t(link.name as keyof typeof translations.de)}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;