import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Menu, X, LogIn, LogOut, UserPlus, Calculator, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { useAuth } from '../contexts/AuthContext';
import { whatsappLinks, demoScheduleLink } from '../lib/robotLinks';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const { theme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const submenuRef = useRef<HTMLDivElement>(null);

  const handleAuthClick = async () => {
    if (user) {
      try {
        // First navigate, then sign out to avoid session errors
        navigate('/');
        setTimeout(() => {
          signOut().catch(error => {
            console.error('Error signing out:', error); 
          });
        }, 100);
      } catch (error) {
        console.error('Error signing out:', error);
      }
    } else {
      navigate('/login');
    }
  };

  // Fechar submenu quando clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (submenuRef.current && !submenuRef.current.contains(event.target as Node)) {
        setIsSubmenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigationItems = [
    { to: '/', label: 'Home' },
    { to: '/clube-de-robos', label: 'Clube de Robôs' },
    { to: '/copy-trade', label: 'Portfólios de IA' },
    { to: '/consultoria', label: 'Crie seu Robô' },
  ];
  
  const submenuItems = [
    { to: '/mesa-proprietaria', label: 'Mesa Proprietária' },
    { to: '/calculadora-day-trade', label: 'Calculadora Day Trade' },
    { to: '/calculadora-ir', label: 'Calculadora IR' },
    { to: '/teste-ping', label: 'Teste de Velocidade' }, 
    { to: '/perfil-trader', label: 'Perfil de Trader' },
    { to: '/comunidade', label: 'Comunidade' }
  ];

  return (
    <header className="sticky top-[32px] z-20 bg-gray-900 dark:bg-gray-900 border-b border-gray-800 dark:border-gray-800 shadow-sm transition-colors duration-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="https://imagizer.imageshack.com/img923/3889/cTL0nU.png"
                alt="Profit Estrategista"
                className="h-14 w-auto max-w-[220px] object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-2 py-2 text-base text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Submenu */}
            <div className="relative" ref={submenuRef}>
              <button
                onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                className="px-2 py-2 text-base text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white flex items-center gap-1"
              >
                Mais
                {isSubmenuOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              
              {isSubmenuOpen && (
                <div className="absolute top-full right-0 mt-1 w-56 bg-gray-900 dark:bg-gray-900 rounded-lg shadow-lg border border-gray-800 dark:border-gray-800 py-2 z-50">
                  {submenuItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block px-4 py-2 text-gray-300 dark:text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-800 hover:text-white"
                      onClick={() => setIsSubmenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {user ? (
              <>
                <Button
                  variant="primary"
                  onClick={() => navigate('/members')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Área de Membros
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                  onClick={handleAuthClick}
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button 
                  as="a"
                  href={demoScheduleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline" 
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Agendar Demo
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                  onClick={() => window.open('https://profitestrategista.com.br/login', '_blank')}
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-4">
            <button
              type="button"
              className="text-gray-300 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block px-3 py-2 text-base font-medium text-gray-300 dark:text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Submenu items in mobile view */}
              <div className="border-t border-gray-800 mt-2 pt-2">
                <div className="px-3 py-1 text-xs text-gray-500">Mais opções</div>
                {submenuItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="block px-3 py-2 text-base font-medium text-gray-300 dark:text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              <div className="space-y-2 px-3 py-2">
                <Button 
                  as="a"
                  href={demoScheduleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline" 
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Agendar Demo
                </Button>
                {user ? (
                  <>
                    <Button
                      variant="primary"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => {
                        navigate('/members');
                        setIsMenuOpen(false);
                      }}
                    >
                      Área de Membros
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2 border-gray-700 text-gray-300 hover:bg-gray-800"
                      onClick={() => {
                        handleAuthClick();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 border-gray-700 text-gray-300 hover:bg-gray-800"
                    onClick={() => {
                      window.open('https://profitestrategista.com.br/login', '_blank');
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}