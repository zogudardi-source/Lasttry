import React from 'react';
import Card from '@/components/ui/Card';
import { useLanguage } from '@/hooks/useLanguage';

const ProfilePage: React.FC = () => {
    const { t } = useLanguage();
    return (
        <Card title={t('profile_settings')}>
            <p className="text-slate-600 dark:text-slate-300">
                Update your personal and company information here. This feature is coming soon.
            </p>
        </Card>
    );
};

export default ProfilePage;
