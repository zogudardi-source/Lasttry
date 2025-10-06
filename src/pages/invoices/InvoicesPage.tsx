import React from 'react';
import Card from '@/components/ui/Card';
import { useLanguage } from '@/hooks/useLanguage';

const InvoicesPage: React.FC = () => {
    const { t } = useLanguage();
    return (
        <Card title={t('invoices')}>
            <p className="text-slate-600 dark:text-slate-300">
                Create and manage your invoices here. This feature is coming soon.
            </p>
        </Card>
    );
};

export default InvoicesPage;
