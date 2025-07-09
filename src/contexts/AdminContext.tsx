import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

interface AdminContextType {
  isAdmin: boolean;
  impersonatedUserId: string | null;
  impersonateUser: (userId: string) => Promise<void>;
  stopImpersonating: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [impersonatedUserId, setImpersonatedUserId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      checkAdminStatus();
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const checkAdminStatus = async () => {
    try {
      // Define admin status based only on the special user check for now
      if (user?.email === 'pedropardal04@gmail.com') {
        console.log('Admin status granted based on email.');
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      
      // REMOVED: RPC call to non-existent function 'auth.is_admin'
      // const { data, error } = await supabase.rpc('auth.is_admin');
      // 
      // if (error) {
      //   console.error('Error checking admin status:', error);
      //   setIsAdmin(false);
      //   return;
      // }
      //
      // setIsAdmin(!!data);

    } catch (error) {
      console.error('Error in admin check:', error);
      setIsAdmin(false);
    }
  };

  const impersonateUser = async (userId: string) => {
    if (!isAdmin) throw new Error('Unauthorized');
    setImpersonatedUserId(userId);
  };

  const stopImpersonating = () => {
    setImpersonatedUserId(null);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, impersonatedUserId, impersonateUser, stopImpersonating }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}