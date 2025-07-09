import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from './Button';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, UserPlus, AlertCircle, Check, MessageCircle, Phone, RefreshCw, Clock, Eye, EyeOff, Mail, User, Lock, ArrowLeft, Globe } from 'lucide-react';
import { processPendingData } from '../lib/rdStationWorker';
import { supabase } from '../lib/supabase';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('55');
  const [areaCode, setAreaCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mode, setMode] = useState<'login' | 'signup' | 'phone-verify'>('login');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp, loading } = useAuth();
  const [isFromCalculator, setIsFromCalculator] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/members';

  // Verificar se veio da calculadora
  useEffect(() => {
    const fromCalculator = location.search.includes('from=calculator') || 
                          location.state?.from?.pathname === '/calculadora-day-trade';
    setIsFromCalculator(fromCalculator);
  }, [location]);

  // Countdown para reenvio de código
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendCountdown > 0) {
      interval = setInterval(() => {
        setResendCountdown(prev => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCountdown]);

  const validatePhone = () => {
    // DDD should be exactly 2 digits
    if (areaCode.length !== 2) return false;
    
    // Phone number should be 8 digits (fixed) or 9 digits (mobile)
    return phoneNumber.length === 8 || phoneNumber.length === 9;
  };

  const formatPhoneDisplay = () => {
    if (!areaCode) return '';
    
    if (phoneNumber.length === 0) return `(${areaCode}) `;
    
    // Format with hyphen
    if (phoneNumber.length <= 5) {
      return `(${areaCode}) ${phoneNumber}`;
    }
    
    if (phoneNumber.length === 8) {
      // Fixed phone
      return `(${areaCode}) ${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4)}`;
    } else {
      // Mobile phone
      return `(${areaCode}) ${phoneNumber.slice(0, 5)}-${phoneNumber.slice(5, 9)}`;
    }
  };

  const handleAreaCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '');
    setAreaCode(digits.slice(0, 2));
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '');
    // Automatically format with hyphen as user types
    const formattedValue = digits.slice(0, 9);
    setPhoneNumber(formattedValue);
  };

  // Carregar dados pendentes ao iniciar
  useEffect(() => {
    processPendingData().catch(console.error);
  }, []);

  const sendPhoneVerification = async () => {
    if (!validatePhone()) {
      setError('Telefone inválido. O DDD deve ter 2 dígitos e o número 8 ou 9 dígitos.');
      return false;
    }

    setIsSendingCode(true);
    setError('');

    try {
      const fullPhoneNumber = `+${countryCode}${areaCode}${phoneNumber}`;
      
      const { error } = await supabase.auth.signInWithOtp({
        phone: fullPhoneNumber,
        options: {
          channel: 'sms'
        }
      });

      if (error) {
        console.error('Erro ao enviar SMS:', error);
        setError('Erro ao enviar código SMS. Verifique o número e tente novamente.');
        return false;
      }

      setSuccess('Código SMS enviado com sucesso!');
      setMode('phone-verify');
      setCanResend(false);
      setResendCountdown(60);
      return true;
    } catch (err: any) {
      console.error('Erro no envio de SMS:', err);
      setError('Erro ao enviar código SMS. Tente novamente.');
      return false;
    } finally {
      setIsSendingCode(false);
    }
  };

  const verifyPhoneCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError('Digite o código de 6 dígitos');
      return false;
    }

    setIsVerifying(true);
    setError('');

    try {
      const fullPhoneNumber = `+${countryCode}${areaCode}${phoneNumber}`;
      
      const { data, error } = await supabase.auth.verifyOtp({
        phone: fullPhoneNumber,
        token: verificationCode,
        type: 'sms'
      });

      if (error) {
        console.error('Erro na verificação:', error);
        setError('Código inválido. Verifique e tente novamente.');
        return false;
      }

      if (data.user) {
        // Telefone verificado com sucesso, agora criar conta com email/senha
        setSuccess('Telefone verificado! Criando sua conta...');
        
        // Armazenar dados do registro no localStorage
        const registerData = {
          email,
          name: name.trim(),
          phone: `${countryCode}${areaCode}${phoneNumber}`,
          traffic_source: document.referrer || 'Direct',
          tags: ['Website', 'Cadastro', 'Registro no site', 'SMS Verificado'],
          timestamp: new Date().toISOString()
        };

        localStorage.setItem('rd_station_pending', JSON.stringify(registerData));
        
        // Criar conta com email e senha
        await signUp(email, password, `${countryCode}${areaCode}${phoneNumber}`);
        
        setSuccess('Conta criada com sucesso! Redirecionando...');
        
        setTimeout(() => {
          if (isFromCalculator) {
            navigate('/members/calculator', { replace: true });
          } else {
            navigate(from, { replace: true });
          }
        }, 1500);
        
        return true;
      }
    } catch (err: any) {
      console.error('Erro na verificação:', err);
      setError('Erro na verificação. Tente novamente.');
      return false;
    } finally {
      setIsVerifying(false);
    }
  };

  const resendCode = async () => {
    if (!canResend) return;
    await sendPhoneVerification();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Se estamos no modo de verificação de telefone
    if (mode === 'phone-verify') {
      await verifyPhoneCode();
      return;
    }

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('O nome é obrigatório para cadastro');
        return;
      }

      if (!validatePhone()) {
        setError('O telefone é obrigatório para cadastro');
        return;
      }

      // Iniciar processo de verificação de telefone
      await sendPhoneVerification();
      return;
    }

    try {
      if (mode === 'login') {
        await signIn(email, password);
        
        setSuccess('Login realizado com sucesso! Redirecionando...');
        
        setTimeout(() => {
          if (isFromCalculator) {
            navigate('/members/calculator', { replace: true });
          } else {
            navigate(from, { replace: true });
          }
        }, 1500);
        return;
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      
      if (err.message?.includes('rate limit')) {
        setError('Muitas tentativas. Por favor, aguarde alguns minutos.');
      } else if (err.message?.includes('Invalid login credentials')) {
        setError('Email ou senha incorretos');
      } else if (err.message?.includes('Email not confirmed')) {
        setError('Por favor, confirme seu email antes de fazer login');
      } else if (err.message?.includes('User already registered')) {
        setError('Este email já está cadastrado. Por favor, faça login.');
      } else {
        setError('Ocorreu um erro. Por favor, tente novamente.');
      }
    }
  };

  // Renderiza a etapa de verificação de código
  if (mode === 'phone-verify') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Verificação de Telefone
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Digite o código de 6 dígitos enviado para <span className="font-medium">+{countryCode} {formatPhoneDisplay()}</span>
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <MessageCircle className="h-5 w-5" />
              <p className="text-sm font-medium">Código enviado via SMS</p>
            </div>
            <p className="mt-1 text-xs text-blue-500 dark:text-blue-300">
              Por segurança, verificamos seu número de telefone antes de criar a conta
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start gap-3">
              <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-green-600 dark:text-green-400 text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Código de Verificação
              </label>
              <input
                id="verification-code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 focus:z-10 sm:text-sm bg-white dark:bg-gray-800 text-center font-mono text-lg tracking-widest"
                placeholder="000000"
                maxLength={6}
                required
              />
            </div>

            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full flex justify-center items-center gap-2"
                disabled={isVerifying || verificationCode.length !== 6}
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Verificar e Criar Conta
                  </>
                )}
              </Button>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resendCode}
                  disabled={!canResend || isSendingCode}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  {isSendingCode ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : canResend ? (
                    <>
                      <MessageCircle className="h-4 w-4" />
                      Reenviar Código
                    </>
                  ) : (
                    <>
                      <Clock className="h-4 w-4" />
                      Reenviar em {resendCountdown}s
                    </>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setMode('signup');
                    setError('');
                    setSuccess('');
                    setVerificationCode('');
                  }}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            {mode === 'login' ? (
              <LogIn className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            ) : (
              <UserPlus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            )}
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            {mode === 'login' ? 'Entre na sua conta' : 'Crie sua conta'}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {mode === 'login' 
              ? 'Acesse sua área de membros'
              : 'Comece sua jornada com a Profit Estrategista'}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={mode === 'signup' ? 'primary' : 'outline'}
            className="flex-1 flex items-center justify-center gap-2"
            onClick={() => {
              setMode('signup');
              setError('');
              setSuccess('');
              processPendingData().catch(console.error);
            }}
          >
            <UserPlus className="h-4 w-4" />
            Criar Conta
          </Button>
          <Button
            variant={mode === 'login' ? 'primary' : 'outline'}
            className="flex-1 flex items-center justify-center gap-2"
            onClick={() => {
              setMode('login');
              setError('');
              setSuccess('');
            }}
          >
            <LogIn className="h-4 w-4" />
            Login
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-green-600 dark:text-green-400 text-sm">{success}</p>
          </div>
        )}

        {isFromCalculator && (
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Ao criar sua conta, você terá acesso à Calculadora Day Trade e todas as outras ferramentas da Profit Estrategista.
            </p>
          </div>
        )}

        {mode === 'signup' && (
          <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Phone className="h-5 w-5" />
              <p className="text-sm font-medium">Verificação de Telefone Obrigatória</p>
            </div>
            <p className="mt-1 text-xs text-amber-500 dark:text-amber-300">
              Verificamos seu número de telefone por SMS antes de criar a conta para garantir a segurança
            </p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nome Completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={mode === 'signup'}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                    placeholder="Nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            {mode === 'signup' && (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Telefone (DDD + Número)
                </label>
                <div className="flex gap-2 justify-center">
                  {/* Prefixo Internacional */}
                  <div className="relative w-24">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex items-center">
                      <input
                        id="country-code"
                        name="country-code"
                        type="text"
                        value={`+${countryCode}`}
                        readOnly
                        className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 focus:z-10 sm:text-sm bg-gray-100 dark:bg-gray-700 font-medium text-center"
                      />
                    </div>
                  </div>
                  
                  {/* DDD */}
                  <div className="relative w-24">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="area-code"
                      name="area-code"
                      type="text"
                      required={mode === 'signup'}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 focus:z-10 sm:text-sm bg-white dark:bg-gray-800 text-center"
                      placeholder="DDD"
                      value={areaCode}
                      onChange={handleAreaCodeChange}
                      maxLength={2}
                    />
                  </div>
                  
                  {/* Número */}
                  <div className="relative w-40">
                    <input
                      id="phone-number"
                      name="phone-number"
                      type="tel"
                      required={mode === 'signup'}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 focus:z-10 sm:text-sm bg-white dark:bg-gray-800 text-center"
                      placeholder="99999-9999"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      maxLength={9}
                    />
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Exemplo: +55 (11) 99999-9999
                </p>
              </div>
            )}
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center items-center gap-2"
              disabled={loading || isSendingCode}
            >
              {mode === 'login' ? (
                <>
                  <LogIn className="h-5 w-5" />
                  {loading ? 'Entrando...' : 'Entrar'}
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  {isSendingCode ? 'Enviando código...' : 'Verificar Telefone'}
                </>
              )}
            </Button>
          </div>
        </form>
        
        {isFromCalculator && (
          <div className="mt-4 text-center">
            <Link to="/calculadora-day-trade" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Voltar para a página da Calculadora
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}