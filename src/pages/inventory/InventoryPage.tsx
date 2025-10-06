import React from 'react';
import Card from '@/components/ui/Card';
import { useLanguage } from '@/hooks/useLanguage';

const InventoryPage: React.FC = () => {
    const { t } = useLanguage();
    return (
        <Card title={t('inventory')}>
            <p className="text-slate-600 dark:text-slate-300">
                Manage your products and stock levels here. This feature is coming soon.
            </p>
        </Card>
    );
};

export default InventoryPage;
