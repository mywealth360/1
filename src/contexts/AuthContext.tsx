import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, phone?: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: { display_name?: string; avatar_url?: string; phone?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Check active sessions and set the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      
      if (session) {
        setSession(session);
        setUser(session.user);
      }
      setLoading(false);
    });

    // Listen for changes on auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      
      if (session) {
        setSession(session);
        setUser(session.user);
      } else {
        setSession(null);
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ 
        email: email.trim().toLowerCase(), 
        password 
      });
      if (error) throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, phone?: string) => {
    try {
      setLoading(true);
      
      // Sign up the user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            phone: phone?.trim()
          }
        }
      });

      if (signUpError) throw signUpError;
      if (!signUpData?.user) throw new Error('No user data returned');

      try {
        // Create user profile
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            user_id: signUpData.user.id,
            display_name: email.split('@')[0],
            phone: phone?.trim(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
          // Continue even if profile creation fails
        }

        // Create initial free plan using the safe function
        const { error: planError } = await supabase
          .rpc('create_initial_free_plan', {
            p_user_id: signUpData.user.id
          });

        if (planError) {
          console.error('Error creating plan:', planError);
          // Continue even if plan creation fails
        }
      } catch (err) {
        console.error('Error in profile/plan creation:', err);
        // Continue with signup even if profile/plan creation fails
      }

    } catch (error: any) {
      console.error('Error in signUp:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      
      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error('Error during signOut:', error);
        }
      } catch (e) {
        console.error('Exception during signOut:', e);
      }
      
      // Always clear session state regardless of API errors
      setSession(null);
      setUser(null);
      
      // Clear cached data
      localStorage.removeItem('supabase.auth.token');
      sessionStorage.clear();
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      if (error) throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: { display_name?: string; avatar_url?: string; phone?: string }) => {
    if (!user) throw new Error('No user logged in');

    try {      
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          ...data,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        })
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error in updateProfile:', error);
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { useAuth };