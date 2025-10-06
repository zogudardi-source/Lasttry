import React from 'react';
import Card from '@/components/ui/Card';
import { useLanguage } from '@/hooks/useLanguage';

const CustomersPage: React.FC = () => {
    const { t } = useLanguage();
    return (
        <Card title={t('customers')}>
            <p className="text-slate-600 dark:text-slate-300">
                Manage your customer information here. You can add new customers, edit existing details, and view their history. This feature is coming soon.
            </p>
        </Card>
    );
};

export default CustomersPage;
