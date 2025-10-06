import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, Users, Shield, LogIn, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import collegeLogo from '@/assets/college-logo.png';
import { supabase } from '@/integrations/supabase/client';
import NotificationBell from './NotificationBell';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkUserRole();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkUserRole();
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUserRole = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      setIsAuthenticated(true);
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .maybeSingle();
      
      setUserRole(data?.role || null);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  };

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'À propos', href: '/about' },
    { name: 'Actualités', href: '/news' },
    { name: 'Galerie', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  const allSpaces = [
    { name: 'Espace Parents', href: '/parents/login', icon: Users },
    { name: 'Espace Enseignants', href: '/teachers/login', icon: User },
    { name: 'Administration', href: '/admin/login', icon: Shield },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-background border-b border-border shadow-card sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={collegeLogo} alt="Logo" className="h-10 w-10" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-primary">Collège Jean Baptiste</h1>
              <p className="text-xs text-muted-foreground">de la Salle 2</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Spaces */}
          <div className="hidden lg:flex items-center space-x-2">
            {isAuthenticated && <NotificationBell />}
            {allSpaces.map((space) => (
              <Button
                key={space.name}
                variant="ghost"
                size="sm"
                asChild
                className="text-xs"
              >
                <Link to={space.href} className="flex items-center space-x-1">
                  <space.icon className="h-4 w-4" />
                  <span>{space.name}</span>
                </Link>
              </Button>
            ))}
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
                <span>Déconnexion</span>
              </Button>
            ) : (
              <Button variant="default" size="sm" asChild>
                <Link to="/auth" className="flex items-center space-x-1">
                  <LogIn className="h-4 w-4" />
                  <span>Connexion</span>
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex items-center space-x-3 px-2">
                  <img src={collegeLogo} alt="Logo" className="h-8 w-8" />
                  <div>
                    <h2 className="font-bold text-primary">Collège Jean Baptiste</h2>
                    <p className="text-xs text-muted-foreground">de la Salle 2</p>
                  </div>
                </div>
                
                <nav className="flex flex-col space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive(item.href) 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground hover:text-primary hover:bg-secondary'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-primary mb-3 px-2">Espaces privés</h3>
                  <div className="flex flex-col space-y-2 mb-4">
                    {allSpaces.map((space) => (
                      <Link
                        key={space.name}
                        to={space.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-2 py-2 text-sm rounded-md transition-colors hover:bg-secondary"
                      >
                        <space.icon className="h-4 w-4 text-primary" />
                        <span>{space.name}</span>
                      </Link>
                    ))}
                  </div>
                  
                  {isAuthenticated ? (
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center space-x-2"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Déconnexion</span>
                    </Button>
                  ) : (
                    <Link
                      to="/auth"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button className="w-full flex items-center justify-center space-x-2">
                        <LogIn className="h-4 w-4" />
                        <span>Connexion</span>
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;