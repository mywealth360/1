import { Button } from './Button';
import { BarChart2, ArrowRight, Calendar, Shield, MessageSquare, HelpCircle, Download, Play, Info, Bot, ChevronRight, Users, ArrowUpRight, Copy, Settings, Calculator } from 'lucide-react';
import { usePlan } from '../contexts/PlanContext';
import { getRobotsByPlan, plans } from '../lib/plans';
import { Link, useNavigate } from 'react-router-dom';
import { whatsappLinks } from '../lib/robotLinks';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  suffix?: string;
}

const StatCard = ({ icon, title, value, description, suffix }: StatCardProps) => (
  <div className="bg-gray-900/80 dark:bg-gray-900/80 rounded-xl p-6 border border-gray-800/30 dark:border-gray-800/30 shadow-lg">
    <div className="flex items-center gap-4 mb-4">
      {icon}
      <div>
        <h3 className="text-sm font-medium text-gray-300 dark:text-gray-300">{title}</h3>
        <p className="text-2xl font-bold text-white dark:text-white">{value}{suffix}</p>
      </div>
    </div>
    <p className="text-sm text-gray-300 dark:text-gray-300">{description}</p>
  </div>
);

interface OptionalModules {
  backtest_starter?: boolean;
  gr_pro?: boolean;
  copy_trade_access?: boolean;
  extra_leverage?: number;
}

export function Dashboard() {
  const { currentPlan, daysRemaining } = usePlan();
  const availableRobots = getRobotsByPlan(currentPlan);
  const navigate = useNavigate();
  const [optionalModules, setOptionalModules] = useState<OptionalModules>({});
  const [loading, setLoading] = useState(true);

  // Check if user has access to Copy Trade
  const hasCopyTradeAccess = currentPlan === 'pro' || currentPlan === 'Copy Trade' || optionalModules.copy_trade_access;

  // Load optional modules from user_plans
  useEffect(() => {
    const loadOptionalModules = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };
    
    loadOptionalModules();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white dark:text-white">
          Dashboard
        </h1>
        <p className="mt-2 text-gray-300 dark:text-gray-300">
          Bem-vindo ao seu painel de controle
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          icon={<BarChart2 className="h-8 w-8 text-green-400 dark:text-green-400" />}
          title="Plano Atual"
          value={currentPlan === 'free' ? 'Combo Ultra Warren' : plans.find(p => p.id === currentPlan)?.name || currentPlan}
          description={daysRemaining ? `${daysRemaining} dias restantes` : 'Profit Ultra + Módulo de Automação Warren Grátis'}
        />
        <StatCard
          icon={<Shield className="h-8 w-8 text-blue-400 dark:text-blue-400" />}
          title="Estratégias Disponíveis"
          value={currentPlan === 'free' ? '6' : currentPlan === 'starter' ? '6' : currentPlan === 'global' ? '3' : currentPlan === 'Copy Trade' ? '0' : '14'}
          description={currentPlan === 'free' ? '6 Estratégias Scalper incluídas' : currentPlan === 'starter' ? '6 Estratégias Scalper incluídas' : currentPlan === 'global' ? '3 Estratégias para mercados globais' : currentPlan === 'Copy Trade' ? 'Acesso ao Copy Trade' : '14 Estratégias ativas no seu plano'}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900/80 dark:bg-gray-900/80 rounded-xl p-6 border border-gray-800/30 dark:border-gray-800/30 shadow-lg">
          <h2 className="text-xl font-semibold text-white dark:text-white mb-4">
            Ações Rápidas
          </h2>
          <div className="space-y-4">
            <Button 
              as="a"
              href="https://profitestrategista.com.br/members/clube"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full justify-between group bg-blue-600 hover:bg-blue-700 text-white"
            >
              <span className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download de Estratégias
              </span>
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              as="a"
              href="https://wa.me/message/A4462RJPMX34K1"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline" 
              className="w-full justify-between group border-gray-700 text-gray-200 hover:bg-gray-800/50"
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Suporte Técnico
              </span>
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              as="a"
              href={whatsappLinks.group}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline" 
              className="w-full justify-between group border-gray-700 text-gray-200 hover:bg-gray-800/50"
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Grupo no WhatsApp Profit Estrategista
              </span>
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              as="a"
              href="/members/tax-calculator"
              variant="outline" 
              className="w-full justify-between group border-gray-700 text-gray-200 hover:bg-gray-800/50"
            >
              <span className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Calculadora de Imposto de Renda
              </span>
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              as="a"
              href="https://chatgpt.com/g/g-678c078c21208191a0b18fb1a70e22f1-profit-estrategista-trading-solutions/c/67d6feef-9668-8003-a008-3c0831af5559"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline" 
              className="w-full justify-between group border-gray-700 text-gray-200 hover:bg-gray-800/50"
            >
              <span className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Ajuda para Configurar
              </span>
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              as="a"
              href="https://www.nelogica.com.br/invitechat?group=4F6B4F36486A5230"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline" 
              className="w-full justify-between group border-gray-700 text-gray-200 hover:bg-gray-800/50"
            >
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Clube de Robôs Profit
              </span>
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <ArrowUpRight className="h-5 w-5 text-white" />
              <h2 className="text-xl font-semibold text-white">
                Serviços com Desconto
              </h2>
            </div>
            <p className="text-blue-100 mb-6">
              Acesse nossa loja para conhecer serviços com desconto exclusivo para membros.
            </p>
            <Button 
              onClick={() => navigate('/members/store?section=robots')}
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              Ver Serviços
            </Button>
          </div>

          {/* Copy Trade Access Card - Show only for users with access */}
          {hasCopyTradeAccess && (
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6 border border-purple-800/30 shadow-lg">
              <div className="flex items-center gap-2 text-purple-200 mb-4">
                <Copy className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Acesso ao Copy Trade</h2>
              </div>
              <p className="text-purple-300 mb-6">
                Você tem acesso ao serviço de Copy Trade. Configure sua conta na plataforma Tridar para começar.
              </p>
              <Button
                as="a"
                href="/members/copy-invest"
                className="w-full bg-white text-purple-600 hover:bg-purple-50"
              >
                Acessar Copy Trade
              </Button>
            </div>
          )}

          {/* Optional Modules Card */}
          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6 border border-green-800/30 shadow-lg">
            <div className="flex items-center gap-2 text-green-200 mb-4">
              <Settings className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Módulos Opcionais</h2>
            </div>
            
            {loading ? (
              <p className="text-green-300 mb-6">Carregando módulos...</p>
            ) : optionalModules && (
              optionalModules.backtest_starter || 
              optionalModules.gr_pro || 
              optionalModules.copy_trade_access || 
              optionalModules.extra_leverage
            ) ? (
              <div className="space-y-3 mb-6">
                {optionalModules.backtest_starter && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-green-100">Módulo de Backtest Starter</span>
                  </div>
                )}
                {optionalModules.gr_pro && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-green-100">Robô GR PRO</span>
                  </div>
                )}
                {optionalModules.copy_trade_access && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-green-100">Acesso ao Copy Trade</span>
                  </div>
                )}
                {optionalModules.extra_leverage && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-green-100">Alavancagem Extra: {optionalModules.extra_leverage}x</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-green-300 mb-6">Nenhum módulo opcional contratado.</p>
            )}
            
            <Button
              as="a"
              href="/members/store?section=robots"
              className="w-full bg-white text-green-600 hover:bg-green-50"
            >
              Contratar Módulos
            </Button>
          </div>

          <div className="bg-gradient-to-br from-amber-900 to-amber-950 rounded-xl p-6 border border-amber-800/30 shadow-lg">
            <div className="flex items-center gap-2 text-amber-200 mb-4">
              <HelpCircle className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Precisa de ajuda?</h2>
            </div>
            <p className="text-amber-300 mb-6">
              Nossa equipe está disponível para ajudar com a configuração das estratégias e esclarecer suas dúvidas.
            </p>
            <Button
              as="a"
              href={whatsappLinks.support}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="w-full text-amber-200 border-amber-700 hover:bg-amber-900/50"
            >
              Falar com Suporte
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}