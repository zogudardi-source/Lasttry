import React, { useState, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '@/services/supabase';
import { useAuth } from '@/hooks/useAuth';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const LoginPage: React.FC = () => {
  const { session } = useAuth();
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-slate-800">
        <div>
          <h1 className="text-3xl font-bold text-center text-primary-600 dark:text-primary-400">ZOGU Solutions</h1>
          <h2 className="mt-2 text-xl font-semibold text-center text-slate-800 dark:text-slate-100">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <Input
            id="email"
            label="Email address"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div>
            <Button type="submit" className="w-full" isLoading={loading} disabled={loading}>
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
