import React from 'react';
import Card from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';

const DashboardPage: React.FC = () => {
    const { profile } = useAuth();
    const { t } = useLanguage();
    
    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {t('dashboard')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
                Welcome back, {profile?.full_name || 'User'}!
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card title={t('totalRevenue')}>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white">€0</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Feature coming soon</p>
                </Card>
                <Card title={t('unpaidInvoices')}>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white">0</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Feature coming soon</p>
                </Card>
                <Card title={t('pending_quotes')}>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white">0</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Feature coming soon</p>
                </Card>
                <Card title={t('tasks')}>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white">0</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Feature coming soon</p>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
