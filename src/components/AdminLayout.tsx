import { useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import Header from './Header';
import Footer from './Footer';
import { Loader2 } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'teacher' | 'parent';
}

const AdminLayout = ({ children, requiredRole = 'admin' }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  const getLoginPath = () => {
    switch (requiredRole) {
      case 'parent':
        return '/parents/login';
      case 'teacher':
        return '/teachers/login';
      case 'admin':
        return '/admin/login';
      default:
        return '/auth';
    }
  };

  useEffect(() => {
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setTimeout(() => {
          checkRole(session.user.id);
        }, 0);
      } else {
        navigate(getLoginPath());
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, requiredRole]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate(getLoginPath());
      return;
    }

    setUser(session.user);
    await checkRole(session.user.id);
  };

  const checkRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', requiredRole)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setHasAccess(true);
      } else {
        setHasAccess(false);
        navigate('/');
      }
    } catch (error) {
      console.error('Error checking role:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!hasAccess) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
