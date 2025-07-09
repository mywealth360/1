import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { LogOut, Notebook as Robot, BarChart as ChartBar, BookOpen, ShoppingBag, Home, MessageSquare, AlertCircle, Download, Play, Info, Copy, CheckCircle2, XCircle, User, Edit2, Clock, Menu, X, Bot, Camera, Shield, FileText, Calculator, Zap, TrendingUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { CopyInvestDashboard } from './CopyInvestDashboard';
import { Dashboard } from './Dashboard';
import { Store } from './Store';
import { usePlan } from '../contexts/PlanContext';
import { getTradingToolsByPlan, plans } from '../lib/plans';
import { supabase } from '../lib/supabase';
import { robotLinks, getRobotLink, whatsappLinks } from '../lib/robotLinks';
import { MyRobots } from './MyRobots';
import { Tutorials } from './Tutorials';
import { useAuth } from '../contexts/AuthContext';
import { useAdmin } from '../contexts/AdminContext';
import { AdminDashboard } from './AdminDashboard';
import { useTheme } from './ThemeProvider';
import { MemberPingTest } from './PingTest/MemberPingTest';
import { CalculatorDayTrade } from './CalculatorDayTrade';
import { MemberTaxCalculator } from './TaxCalculator';
import { TraderProfileQuiz } from './TraderProfileSurvey';
// Remove the AlertBanner import since it's already included in App.tsx
// import { AlertBanner } from './AlertBanner';

interface UserProfile {
  display_name: string | null;
  avatar_url: string | null;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavItem = ({ to, icon, children, onClick }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive
          ? 'bg-gray-800 dark:bg-gray-800 text-white dark:text-white'
          : 'text-gray-300 dark:text-gray-300 hover:bg-gray-900/50 dark:hover:bg-gray-900/50'
      }`}
    >
      {icon}
      <span className="whitespace-nowrap">{children}</span>
    </Link>
  );
};

const UserProfileSection = () => {
  const { user, session, updateProfile } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    display_name: null,
    avatar_url: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user && session) {
      loadProfile();
    }
  }, [user, session]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const loadProfile = async () => {
    if (!user || !session) return;

    try {
      setError(null);
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        setError('Erro ao carregar perfil');
        return;
      }

      if (data) {
        setProfile(data);
        setDisplayName(data.display_name || '');
      } else {
        // Create initial profile
        const initialDisplayName = user.email?.split('@')[0] || '';
        const { data: newProfile, error: createError } = await supabase
          .from('user_profiles')
          .insert({
            user_id: user.id,
            display_name: initialDisplayName,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          setError('Erro ao criar perfil');
          return;
        }

        if (newProfile) {
          setProfile(newProfile);
          setDisplayName(newProfile.display_name || '');
        }
      }
    } catch (err) {
      console.error('Error in profile operation:', err);
      setError('Erro ao processar operação');
    }
  };

  const saveProfile = async () => {
    if (!user || !session) return;
    if (!displayName.trim()) {
      setError('O nome não pode ficar em branco');
      return;
    }

    try {
      setError(null);
      setIsSaving(true);

      await updateProfile({ display_name: displayName.trim() });
      await loadProfile();
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Erro ao salvar perfil');
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveProfile();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setDisplayName(profile.display_name || '');
      setError(null);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    try {
      setIsUploading(true);
      setError(null);

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Imagem muito grande. Máximo 5MB.');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Formato inválido. Use apenas imagens.');
        return;
      }

      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update profile with new avatar URL
      await updateProfile({ avatar_url: publicUrl });

      // Reload profile
      await loadProfile();
    } catch (error) {
      console.error('Error uploading avatar:', error);
      setError('Erro ao atualizar avatar');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-800 dark:bg-gray-800">
            {profile.avatar_url ? (
              <img 
                src={profile.avatar_url} 
                alt="Avatar" 
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-5 w-5 text-gray-300 dark:text-gray-300" />
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-1 -right-1 p-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            disabled={isUploading}
            title="Alterar foto de perfil"
          >
            <Camera className="h-3 w-3" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 px-2 py-1 text-sm rounded border border-gray-700 dark:border-gray-700 bg-gray-900/50 dark:bg-gray-900/50 text-white dark:text-white min-w-0 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                placeholder="Digite seu nome"
                disabled={isSaving}
              />
              <div className="flex gap-1">
                <Button
                  size="sm"
                  onClick={saveProfile}
                  className="flex items-center gap-1 bg-blue-600"
                  disabled={isSaving}
                >
                  <CheckCircle2 className="h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsEditing(false);
                    setDisplayName(profile.display_name || '');
                    setError(null);
                  }}
                  className="flex items-center gap-1 border-gray-700 text-gray-200"
                  disabled={isSaving}
                >
                  <XCircle className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="truncate">
                <h2 className="text-sm font-medium text-white dark:text-white truncate">
                  {profile.display_name || user?.email?.split('@')[0]}
                </h2>
                <p className="text-xs text-gray-300 dark:text-gray-300 truncate">
                  {user?.email}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 border-gray-700 text-gray-200"
              >
                <Edit2 className="h-3 w-3" />
              </Button>
            </div>
          )}
          {error && (
            <p className="absolute left-0 top-full mt-1 text-xs text-red-400 dark:text-red-400">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const { currentPlan } = usePlan();
  const { theme } = useTheme();
  const [optionalModules, setOptionalModules] = useState<any>({});
  
  // Check if user has access to Copy Trade
  const hasCopyTradeAccess = currentPlan === 'pro' || currentPlan === 'Copy Trade' || optionalModules.copy_trade_access;

  useEffect(() => {
    const loadOptionalModules = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) return;
        
        const { data, error } = await supabase
          .from('user_plans')
          .select('subscription_data')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .single();
          
        if (error) {
          console.error('Error loading optional modules:', error);
          return;
        }
        
        if (data?.subscription_data) {
          setOptionalModules(data.subscription_data);
        }
      } catch (err) {
        console.error('Error in loadOptionalModules:', err);
      }
    };
    
    loadOptionalModules();
  }, []);

  const handleSignOut = async () => {
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
  };

  const navigationItems = [
    { to: '/members', icon: <Home className="h-5 w-5" />, label: 'Dashboard' },
    { to: '/members/clube', icon: <Robot className="h-5 w-5" />, label: 'Meus Robôs' },
    { to: '/members/ping-test', icon: <Zap className="h-5 w-5" />, label: 'Teste de Velocidade' },
    { to: '/members/tax-calculator', icon: <Calculator className="h-5 w-5" />, label: 'Calculadora IR' },
    { to: '/members/perfil-trader', icon: <User className="h-5 w-5" />, label: 'Perfil de Trader' },
    { to: '/members/calculator', icon: <TrendingUp className="h-5 w-5" />, label: 'Calculadora Day Trade' },
  ];
  
  // Only show Copy Trade for users with access
  if (hasCopyTradeAccess) {
    navigationItems.push({ to: '/members/copy-invest', icon: <Copy className="h-5 w-5" />, label: 'Copy Trade' });
  }
  
  // Add remaining navigation items
  navigationItems.push(
    { to: '/members/tutorials', icon: <BookOpen className="h-5 w-5" />, label: 'Tutoriais' },
    { to: '/members/store', icon: <ShoppingBag className="h-5 w-5" />, label: 'Loja de Opcionais' }
  );

  // Add admin panel link if user is admin
  if (isAdmin) {
    navigationItems.push({
      to: '/members/admin',
      icon: <Shield className="h-5 w-5" />,
      label: 'Admin Panel'
    });
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-[32px] left-0 h-screen w-64 bg-gray-950 dark:bg-gray-950 border-r border-gray-900 dark:border-gray-900 z-20
        transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-4">
            <div className="text-xl font-bold text-white dark:text-white">
              Profit Estrategista
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-2 py-6 overflow-y-auto">
            {navigationItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                onClick={onClose}
              >
                {item.label}
              </NavItem>
            ))}
          </nav>

          <div className="p-4 mt-auto border-t border-gray-900 dark:border-gray-900">
            <div className="mb-4 p-4 bg-amber-900/50 dark:bg-amber-900/50 rounded-lg">
              <div className="flex items-center gap-2 text-amber-200 dark:text-amber-200">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Precisa de ajuda?</span>
              </div>
              <Button
                as="a"
                href={whatsappLinks.support}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                className="mt-2 w-full text-amber-200 dark:text-amber-200 border-amber-700 dark:border-amber-700 hover:bg-amber-900/50 dark:hover:bg-amber-900/50"
              >
                Falar com Suporte
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 border-gray-700 text-gray-200"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export function MembersArea() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showConfigAssistant, setShowConfigAssistant] = useState(false);

  const ConfigAssistant = () => (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`absolute bottom-full right-0 mb-4 w-72 bg-gray-900 dark:bg-gray-900 rounded-lg shadow-lg p-4 border border-gray-800 dark:border-gray-800 transition-all duration-200 ${showConfigAssistant ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
        <h4 className="font-semibold text-white dark:text-white mb-2">
          Assistente de Configuração
        </h4>
        <p className="text-sm text-gray-300 dark:text-gray-300 mb-4">
          Precisa de ajuda para configurar seus robôs? Nosso assistente irá te guiar passo a passo.
        </p>
        <div className="space-y-2">
          <Button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Play className="h-4 w-4" />
            Iniciar Configuração
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-gray-700 text-gray-200">
            <BookOpen className="h-4 w-4" />
            Ver Tutorial
          </Button>
        </div>
      </div>
      
      <Button
        onClick={() => setShowConfigAssistant(!showConfigAssistant)}
        className={`h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${showConfigAssistant ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        <Bot className="h-6 w-6" />
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 dark:bg-gray-950">
      {/* Remove the AlertBanner component from here */}
      {/* <AlertBanner /> */}
      
      {/* Header */}
      <div className="sticky top-[32px] z-20 bg-gray-900 dark:bg-gray-900 border-b border-gray-800 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-800"
            >
              <Menu className="h-6 w-6 text-white dark:text-white" />
            </button>
            <div className="text-xl font-bold text-white dark:text-white hidden lg:block">
              Profit Estrategista
            </div>
          </div>
          
          <UserProfileSection />
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-4 lg:p-8">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="clube" element={<MyRobots />} />
            <Route path="copy-invest" element={<CopyInvestDashboard />} />
            <Route path="tutorials" element={<Tutorials />} />
            <Route path="ping-test" element={<MemberPingTest />} />
            <Route path="perfil-trader" element={<TraderProfileQuiz />} />
            <Route path="tax-calculator" element={<MemberTaxCalculator />} />
            <Route path="store" element={<Store />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="calculator" element={<CalculatorDayTrade />} />
          </Routes>
        </main>

        {/* Configuration Assistant */}
        <ConfigAssistant />
        
      </div>
    </div>
  );
}