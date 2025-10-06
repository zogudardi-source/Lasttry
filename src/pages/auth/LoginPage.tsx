import React, { useState, FormEvent } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '@/services/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { CubeIcon } from '@heroicons/react/24/solid';

const LoginPage: React.FC = () => {
  const { session } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  if (!isSupabaseConfigured) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-slate-800">
            <div className="p-8 text-center bg-white rounded-lg shadow-xl dark:bg-slate-900">
                <h1 className="mb-4 text-2xl font-bold text-slate-800 dark:text-slate-100">Configuration Needed</h1>
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                    Your application's backend is not yet configured. Please follow the deployment instructions to set up the necessary environment variables.
                </p>
            </div>
        </div>
    );
  }

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-900">
      {/* Left Panel - Hidden on small screens */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center bg-primary-950 p-12 text-white">
          <div className="flex flex-col items-center text-center">
            <CubeIcon className="h-16 w-16 text-primary-500" />
            <h1 className="mt-4 text-4xl font-bold">ZoguOne</h1>
            <p className="mt-2 max-w-sm text-slate-300">
              Your all-in-one solution for inventory, invoicing, and service management.
            </p>
          </div>
      </div>

      {/* Right Panel */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-sm">
            {/* Mobile Header */}
            <div className="lg:hidden flex flex-col items-center text-center mb-8">
                <CubeIcon className="h-12 w-12 text-primary-600 dark:text-primary-500" />
                <h1 className="mt-2 text-3xl font-bold text-slate-800 dark:text-white">ZoguOne</h1>
            </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Welcome back to ZoguOne
          </h2>
        
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
                 <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                    wrapperClassName="w-full"
                />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <div className="text-sm">
                  <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                    {t('forgotPassword')}
                  </a>
                </div>
              </div>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 bg-slate-50 dark:bg-slate-700"
                wrapperClassName="w-full"
              />
            </div>

            {error && <p className="text-sm text-center text-red-500">{error}</p>}

            <div>
              <Button type="submit" className="w-full" isLoading={loading} disabled={loading}>
                Login
              </Button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="#" className="font-medium text-primary-600 hover:text-primary-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
