import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { UserCircleIcon, GlobeAltIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { supabase } from '@/services/supabase';

const Header: React.FC = () => {
  const { profile } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'al' : 'de');
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b dark:bg-slate-800 dark:border-slate-700">
      <div className="flex items-center">
        {/* Can add a search bar or other elements here in the future */}
      </div>
      <div className="flex items-center">
        <button
          onClick={toggleLanguage}
          className="flex items-center text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 focus:outline-none mx-4"
          aria-label="Toggle Language"
        >
          <GlobeAltIcon className="w-6 h-6" />
          <span className="ml-1 uppercase">{language === 'de' ? 'AL' : 'DE'}</span>
        </button>

        <div className="relative">
          <div className="flex items-center space-x-2">
             <UserCircleIcon className="w-6 h-6 text-slate-500 dark:text-slate-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{profile?.full_name || 'User'}</span>
             <button
              onClick={handleSignOut}
              className="p-1 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 focus:outline-none"
              title={t('signOut')}
            >
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
