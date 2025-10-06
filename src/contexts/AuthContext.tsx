import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/services/supabase';
import { Profile, Organization } from '@/types';
import Spinner from '@/components/ui/Spinner';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  organization: Organization | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  organization: null,
  loading: true,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        setLoading(false);
      }
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user && !profile) {
      setLoading(true);
      const fetchProfile = async () => {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileData) {
            setProfile(profileData);
            const { data: orgData, error: orgError } = await supabase
                .from('organizations')
                .select('*')
                .eq('id', profileData.org_id)
                .single();

            if (orgData) {
                setOrganization(orgData);
            } else if (orgError) {
                console.error('Error fetching organization:', orgError.message);
            }
        } else if (profileError) {
          console.error('Error fetching profile:', profileError.message);
        }
        setLoading(false);
      };
      fetchProfile();
    } else if (!user) {
        setProfile(null);
        setOrganization(null);
        setLoading(false);
    }
  }, [user, profile]);

  const value = {
    session,
    user,
    profile,
    organization,
    loading,
  };

  // Render a global spinner while the initial session and profile are loading.
  if (loading) {
      return (
          <div className="h-screen w-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
              <Spinner />
          </div>
      )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
