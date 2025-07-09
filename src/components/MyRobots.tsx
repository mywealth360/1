import { Button } from './Button';
import { Download, Bot, Filter, Lock, Check, Copy, Zap } from 'lucide-react';
import { usePlan } from '../contexts/PlanContext';
import { getTradingToolsByPlan } from '../lib/plans';
import { getRobotLink } from '../lib/robotLinks';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface RobotCardProps {
  name: string;
  store: string;
  type: string;
  priceWithoutClub: string;
  priceWithClub: string;
  characteristics: string[];
  assets: string;
  selected?: boolean;
  onSelect?: () => void;
  downloadUrl?: string;
  category: 'tendencia' | 'reversao' | 'scalp' | 'misto' | 'manual' | 'indicator';
  requiresLogin?: boolean;
  isWarrenPack?: boolean;
}

const RobotCard = ({ 
  name,
  store,
  type,
  priceWithoutClub,
  priceWithClub,
  characteristics,
  assets,
  selected,
  onSelect,
  downloadUrl,
  category,
  requiresLogin,
  isWarrenPack = false
}: RobotCardProps) => {
  const navigate = useNavigate();

  const categoryStyles = {
    tendencia: {
      bg: 'bg-gray-800 dark:bg-gray-800',
      text: 'text-gray-200 dark:text-gray-200',
      border: 'border-gray-700 dark:border-gray-700'
    },
    reversao: {
      bg: 'bg-purple-800 dark:bg-purple-800',
      text: 'text-purple-200 dark:text-purple-200', 
      border: 'border-purple-700 dark:border-purple-700'
    },
    scalp: {
      bg: 'bg-green-800 dark:bg-green-800',
      text: 'text-green-200 dark:text-green-200',
      border: 'border-green-700 dark:border-green-700'
    },
    misto: {
      bg: 'bg-amber-800 dark:bg-amber-800', 
      text: 'text-amber-200 dark:text-amber-200',
      border: 'border-amber-700 dark:border-amber-700'
    },
    manual: {
      bg: 'bg-red-800 dark:bg-red-800',
      text: 'text-red-200 dark:text-red-200',
      border: 'border-red-700 dark:border-red-700'
    },
    indicator: {
      bg: 'bg-indigo-800 dark:bg-indigo-800',
      text: 'text-indigo-200 dark:text-indigo-200',
      border: 'border-indigo-700 dark:border-indigo-700'
    }
  };

  const styles = categoryStyles[category];

  const handleClick = () => {
    if (requiresLogin) {
      navigate('/login');
    } else if (isWarrenPack) {
      window.open('https://bit.ly/3GoDUoE', '_blank');
    } else if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  };

  return (
    <div className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-white ${styles.border}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-gray-200" />
            <span className="text-sm text-gray-200">{store}</span>
          </div>
          <h3 className="text-xl font-semibold text-white mt-2">{name}</h3>
        </div>
        {onSelect && (
          <button
            onClick={onSelect}
            className={`h-6 w-6 rounded border ${
              selected 
                ? 'bg-blue-400 border-blue-400 text-white' 
                : 'border-gray-300 hover:border-gray-400'
            } flex items-center justify-center transition-colors`}
          >
            {selected && <Check className="h-4 w-4" />}
          </button>
        )}
      </div>

      <div className="mt-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles.bg} ${styles.text}`}>
          {category === 'tendencia' && 'Tendência'}
          {category === 'reversao' && 'Reversão'}
          {category === 'scalp' && 'Scalping'}
          {category === 'misto' && 'Misto'}
          {category === 'manual' && 'Manual'}
          {category === 'indicator' && 'Indicador'}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <div className="text-sm text-gray-200">Sem o Clube</div>
          <div className="text-xl font-bold text-white line-through opacity-75">R$ {priceWithoutClub}</div>
        </div>
        <div>
          <div className="text-sm text-gray-200">Com o Clube</div>
          <div className="text-xl font-bold text-white">{priceWithClub}</div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-medium text-white">Características</h4>
        <ul className="mt-2 space-y-2">
          {characteristics.map((char, index) => (
            <li key={index} className="text-sm text-gray-100 flex items-center">
              <Check className="h-4 w-4 mr-2 text-gray-200" />
              {char}
            </li>
          ))}
          <li className="text-sm text-gray-100 flex items-center">
            <Check className="h-4 w-4 mr-2 text-gray-200" />
            Ativos: {assets}
          </li>
        </ul>
      </div>

      <Button
        onClick={handleClick}
        className="mt-6 w-full bg-white text-gray-900 hover:bg-gray-100 flex items-center justify-center gap-2"
      >
        {isWarrenPack ? (
          <>
            Cadastre-se na Warren
          </>
        ) : requiresLogin ? (
          <>
            Fazer Login
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            Baixar
          </>
        )}
      </Button>
    </div>
  );
};

interface OptionalModules {
  backtest_starter?: boolean;
  gr_pro?: boolean;
  copy_trade_access?: boolean;
  extra_leverage?: number;
}

export function MyRobots() {
  const { currentPlan } = usePlan();
  const [selectedPack, setSelectedPack] = useState<'all' | 'free' | 'starter' | 'pro' | 'global' | 'copy_trade'>('all');
  const [showLocked, setShowLocked] = useState(false);
  const [optionalModules, setOptionalModules] = useState<OptionalModules>({});
  const [loading, setLoading] = useState(true);

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

  // Special Warren packs for free plan
  const warrenPacks = [
    {
      name: "Módulo de Automação Premium",
      store: "Warren",
      type: "premium",
      priceWithoutClub: "429,90",
      priceWithClub: "Grátis",
      characteristics: ["Premium", "Obrigatório", "Mínimo 500 contratos/mês"],
      assets: "Multi-Ativo",
      category: 'misto' as const,
      isWarrenPack: true
    },
    {
      name: "Pack de Estratégias Starter",
      store: "Warren",
      type: "estratégias",
      priceWithoutClub: "350,00",
      priceWithClub: "Grátis",
      characteristics: ["6 Robôs Scalper", "Foco em WIN", "Mínimo 500 contratos/mês"],
      assets: "WIN",
      category: 'scalp' as const,
      isWarrenPack: true
    },
    {
      name: "Profit Ultra GRÁTIS",
      store: "Warren",
      type: "plataforma",
      priceWithoutClub: "500,90",
      priceWithClub: "Grátis",
      characteristics: ["Plataforma Completa", "Gráficos Avançados", "Mínimo 500 contratos/mês"],
      assets: "Multi-Ativo",
      category: 'misto' as const,
      isWarrenPack: true
    },
    {
      name: "VPS Trader com Desconto",
      store: "Warren",
      type: "infraestrutura",
      priceWithoutClub: "145,00",
      priceWithClub: "110,00",
      characteristics: ["4GB RAM", "Windows Server", "Mínimo 500 contratos/mês"],
      assets: "Multi-Ativo",
      category: 'misto' as const,
      isWarrenPack: true
    }
  ];

  // Pack Starter robots
  const starterRobots = [
    {
      name: "Take GO Scalper",
      store: "NeloStore",
      type: "scalp",
      priceWithoutClub: "249,90",
      priceWithClub: "Grátis",
      characteristics: ["Scalping", "Automático", "Alta taxa de acerto"],
      assets: "WIN",
      category: 'scalp' as const,
      downloadUrl: "https://mega.nz/folder/c1BT2YzK#fErvdTnzOE42SJ3WWQcZ8g"
    },
    {
      name: "Take 33 Scalper",
      store: "NeloStore",
      type: "scalp",
      priceWithoutClub: "249,90",
      priceWithClub: "Grátis",
      characteristics: ["Scalping", "Automático", "Rápido"],
      assets: "WIN",
      category: 'scalp' as const,
      downloadUrl: "https://mega.nz/folder/c1BT2YzK#fErvdTnzOE42SJ3WWQcZ8g"
    },
    {
      name: "Take 40",
      store: "NeloStore",
      type: "reversao",
      priceWithoutClub: "249,90",
      priceWithClub: "Grátis",
      characteristics: ["Reversão", "Automático", "Consistente"],
      assets: "WIN",
      category: 'reversao' as const,
      downloadUrl: "https://mega.nz/folder/c1BT2YzK#fErvdTnzOE42SJ3WWQcZ8g"
    },
    {
      name: "Armadilha Scalper",
      store: "NeloStore",
      type: "scalp",
      priceWithoutClub: "249,90",
      priceWithClub: "Grátis",
      characteristics: ["Scalping", "Automático", "Caça armadilhas"],
      assets: "WIN",
      category: 'scalp' as const,
      downloadUrl: "https://mega.nz/folder/c1BT2YzK#fErvdTnzOE42SJ3WWQcZ8g"
    },
    {
      name: "CB Scalper",
      store: "NeloStore",
      type: "scalp",
      priceWithoutClub: "249,90",
      priceWithClub: "Grátis",
      characteristics: ["Scalping", "Automático", "Consistente"],
      assets: "WIN",
      category: 'scalp' as const,
      downloadUrl: "https://mega.nz/folder/c1BT2YzK#fErvdTnzOE42SJ3WWQcZ8g"
    },
    {
      name: "V Reversão",
      store: "NeloStore",
      type: "reversao",
      priceWithoutClub: "249,90",
      priceWithClub: "Grátis",
      characteristics: ["Reversão", "Automático", "Padrão V"],
      assets: "WIN",
      category: 'reversao' as const,
      downloadUrl: "https://mega.nz/folder/c1BT2YzK#fErvdTnzOE42SJ3WWQcZ8g"
    }
  ];

  // Pack PRO robots (formerly Hunter)
  const proRobots = [
    {
      name: "Pivot Hunter",
      store: "NeloStore",
      type: "misto",
      priceWithoutClub: "299,90",
      priceWithClub: "Grátis",
      characteristics: ["Misto", "Automático", "Baseado em pivôs"],
      assets: "Multi-Ativo",
      category: 'misto' as const,
      downloadUrl: "https://mega.nz/folder/1lYiSAoT#8kZ4I9SewZK8N09StrvOYQ"
    },
    {
      name: "Trap Hunter",
      store: "NeloStore",
      type: "misto",
      priceWithoutClub: "299,90",
      priceWithClub: "Grátis",
      characteristics: ["Misto", "Automático", "Caça armadilhas"],
      assets: "Multi-Ativo",
      category: 'misto' as const,
      downloadUrl: "https://mega.nz/folder/1lYiSAoT#8kZ4I9SewZK8N09StrvOYQ"
    },
    {
      name: "Elephant Hunter",
      store: "NeloStore",
      type: "misto",
      priceWithoutClub: "299,90",
      priceWithClub: "Grátis",
      characteristics: ["Misto", "Automático", "Volume e momentum"],
      assets: "Multi-Ativo",
      category: 'misto' as const,
      downloadUrl: "https://mega.nz/folder/1lYiSAoT#8kZ4I9SewZK8N09StrvOYQ"
    },
    {
      name: "Esto Hunter",
      store: "NeloStore",
      type: "misto",
      priceWithoutClub: "299,90",
      priceWithClub: "Grátis",
      characteristics: ["Misto", "Automático", "Estocástico avançado"],
      assets: "Multi-Ativo",
      category: 'misto' as const,
      downloadUrl: "https://mega.nz/folder/1lYiSAoT#8kZ4I9SewZK8N09StrvOYQ"
    },
    {
      name: "Fibo Hunter",
      store: "NeloStore",
      type: "misto",
      priceWithoutClub: "299,90",
      priceWithClub: "Grátis",
      characteristics: ["Misto", "Automático", "Fibonacci"],
      assets: "Multi-Ativo",
      category: 'misto' as const,
      downloadUrl: "https://mega.nz/folder/1lYiSAoT#8kZ4I9SewZK8N09StrvOYQ"
    }
  ];

  // Global pack robots
  const globalRobots = [
    {
      name: "GR Global",
      store: "NeloStore",
      type: "misto",
      priceWithoutClub: "349,90",
      priceWithClub: "Grátis",
      characteristics: ["Misto", "Manual/Híbrido", "Mercados globais"],
      assets: "Multi-Ativo",
      category: 'misto' as const,
      downloadUrl: "https://mega.nz/folder/BsZwCSCb#yAo4P_SSp8v7q3EEoJ3nnA"
    },
    {
      name: "Criptomoedas",
      store: "NeloStore",
      type: "misto",
      priceWithoutClub: "399,90",
      priceWithClub: "Grátis",
      characteristics: ["Misto", "Automático/Híbrido", "Criptomoedas"],
      assets: "Multi-Ativo",
      category: 'misto' as const,
      downloadUrl: "https://mega.nz/folder/BsZwCSCb#yAo4P_SSp8v7q3EEoJ3nnA"
    },
    {
      name: "Ações e Futuros",
      store: "NeloStore",
      type: "misto",
      priceWithoutClub: "399,90",
      priceWithClub: "Grátis",
      characteristics: ["Misto", "Automático/Híbrido", "Ações e futuros"],
      assets: "Multi-Ativo",
      category: 'misto' as const,
      downloadUrl: "https://mega.nz/folder/BsZwCSCb#yAo4P_SSp8v7q3EEoJ3nnA"
    }
  ];

  // Check if user has access to Copy Trade
  const hasCopyTradeAccess = currentPlan === 'pro' || currentPlan === 'Copy Trade' || optionalModules.copy_trade_access;

  // Filter pack options based on current plan
  const packOptions = [
    { id: 'all', name: currentPlan === 'free' ? 'Combo Warren Free' : 'Todas as Estratégias', showFor: ['free', 'starter', 'global', 'pro', 'Copy Trade'] },
    { id: 'copy_trade', name: 'Copy Trade', showFor: ['pro', 'Copy Trade'] },
    { id: 'starter', name: 'Pack Starter', showFor: ['starter', 'pro'] },
    { id: 'pro', name: 'Pack PRO', showFor: ['pro'] },
    { id: 'global', name: 'Pack Global', showFor: ['global', 'pro'] }
  ].filter(pack => {
    // Only show packs that are relevant for the current plan
    return pack.showFor.includes(currentPlan);
  });

  // Determine what to show based on selected pack and user's plan
  const getContentToShow = () => {
    // Special case: If Copy Trade is selected, only show Copy Trade card
    if (selectedPack === 'copy_trade') {
      if (hasCopyTradeAccess) {
        return {
          showCopyTradeCard: true,
          showWarrenPacks: false,
          robots: [],
          lockedRobots: []
        };
      } else {
        return {
          showCopyTradeCard: false,
          showWarrenPacks: false,
          robots: [],
          lockedRobots: []
        };
      }
    }
    
    // Special case: If Free/Warren is selected, only show Warren packs
    if (selectedPack === 'free') {
      return {
        showCopyTradeCard: false,
        showWarrenPacks: true,
        robots: [],
        lockedRobots: []
      };
    }
    
    // For other packs, determine which robots to show
    let robots: any[] = [];
    let lockedRobots: any[] = [];
    
    if (selectedPack === 'starter' && (currentPlan === 'starter' || currentPlan === 'pro')) {
      robots = starterRobots;
    } else if (selectedPack === 'pro' && currentPlan === 'pro') {
      robots = proRobots;
    } else if (selectedPack === 'global' && (currentPlan === 'global' || currentPlan === 'pro')) {
      robots = globalRobots;
    } else if (selectedPack === 'all') {
      // For 'all', show robots based on current plan
      if (currentPlan === 'pro') {
        robots = [...starterRobots, ...proRobots, ...globalRobots];
      } else if (currentPlan === 'global') {
        robots = [...globalRobots];
      } else if (currentPlan === 'starter') {
        robots = [...starterRobots];
      } else if (currentPlan === 'free') {
        // For free plan with 'all' selected, show Warren packs
        return {
          showCopyTradeCard: false,
          showWarrenPacks: true,
          robots: [],
          lockedRobots: []
        };
      } else if (currentPlan === 'Copy Trade') {
        // For Copy Trade plan with 'all' selected, show Copy Trade card
        return {
          showCopyTradeCard: true,
          showWarrenPacks: false,
          robots: [],
          lockedRobots: []
        };
      }
    }
    
    // Determine locked robots if showing locked is enabled
    if (showLocked) {
      if (currentPlan === 'starter') {
        lockedRobots = [...proRobots, ...globalRobots];
      } else if (currentPlan === 'global') {
        lockedRobots = [...proRobots, ...starterRobots];
      }
    }
    
    return {
      showCopyTradeCard: false,
      showWarrenPacks: false,
      robots,
      lockedRobots
    };
  };
  
  const { showCopyTradeCard, showWarrenPacks, robots, lockedRobots } = getContentToShow();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white dark:text-white">
            Estratégias Disponíveis
          </h1>
          <p className="mt-2 text-gray-300 dark:text-gray-300">
            Gerencie suas estratégias disponíveis no plano {currentPlan === 'free' ? 'Combo Ultra Warren' : currentPlan === 'Copy Trade' ? 'Copy Trade' : currentPlan}
          </p>
        </div>
        {currentPlan !== 'Copy Trade' && selectedPack !== 'copy_trade' && selectedPack !== 'free' && (
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowLocked(!showLocked)}
              className="flex items-center gap-2 border-gray-700 text-gray-200"
            >
              <Filter className="h-4 w-4" />
              {showLocked ? 'Ocultar Bloqueados' : 'Mostrar Bloqueados'}
            </Button>
          </div>
        )}
      </div>

      <div className="flex gap-6">
        <div className="w-64">
          <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-4 border border-gray-800 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-white dark:text-white mb-4">
              Packs
            </h3>
            <div className="space-y-2">
              {packOptions.map(pack => (
                <button
                  key={pack.id}
                  onClick={() => {
                    setSelectedPack(pack.id as typeof selectedPack);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    selectedPack === pack.id
                      ? 'bg-gray-800 dark:bg-gray-800 text-white dark:text-white'
                      : 'hover:bg-gray-800/50 dark:hover:bg-gray-800/50 text-gray-300 dark:text-gray-300'
                  }`}
                >
                  {pack.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Show Copy Trade card if applicable */}
            {showCopyTradeCard && (
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6 text-white border border-purple-700/30">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Copy className="h-4 w-4 text-purple-200" />
                      <span className="text-sm text-purple-200">Tridar</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mt-2">Acesso ao Copy Trade</h3>
                  </div>
                </div>
                
                <div className="mt-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-800 text-purple-200">
                    Copy Trade
                  </span>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <div className="text-sm text-purple-200">Valor Regular</div>
                    <div className="text-xl font-bold text-white line-through opacity-75">R$ 550,00</div>
                  </div>
                  <div>
                    <div className="text-sm text-purple-200">Com seu Plano</div>
                    <div className="text-xl font-bold text-white">Incluído</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-white">Características</h4>
                  <ul className="mt-2 space-y-2">
                    <li className="text-sm text-purple-100 flex items-center">
                      <Check className="h-4 w-4 mr-2 text-purple-200" />
                      Copy Trade Automático
                    </li>
                    <li className="text-sm text-purple-100 flex items-center">
                      <Check className="h-4 w-4 mr-2 text-purple-200" />
                      Operações via BTG Pactual
                    </li>
                    <li className="text-sm text-purple-100 flex items-center">
                      <Check className="h-4 w-4 mr-2 text-purple-200" />
                      Gestão Profissional
                    </li>
                    <li className="text-sm text-purple-100 flex items-center">
                      <Check className="h-4 w-4 mr-2 text-purple-200" />
                      Ativos: Multi-Ativo
                    </li>
                  </ul>
                </div>
                
                <Button
                  as="a"
                  href="/members/copy-invest"
                  className="mt-6 w-full bg-white text-purple-600 hover:bg-purple-50 flex items-center justify-center gap-2"
                >
                  Acessar Copy Trade
                </Button>
                
                {/* Show extra leverage if available */}
                {optionalModules.extra_leverage && optionalModules.extra_leverage > 0 && (
                  <div className="mt-4 p-3 bg-purple-700/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-purple-200" />
                      <span className="text-sm font-medium text-white">Alavancagem Extra: {optionalModules.extra_leverage}x</span>
                    </div>
                    <p className="text-xs text-purple-200 mt-1">
                      Sua conta possui alavancagem adicional contratada de {optionalModules.extra_leverage}x
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Show Warren packs */}
            {showWarrenPacks && warrenPacks.map((pack, index) => (
              <RobotCard
                key={`warren-${index}`}
                name={pack.name}
                store={pack.store}
                type={pack.type}
                priceWithoutClub={pack.priceWithoutClub}
                priceWithClub={pack.priceWithClub}
                characteristics={pack.characteristics}
                assets={pack.assets}
                category={pack.category}
                isWarrenPack={true}
              />
            ))}

            {/* Show regular robots */}
            {robots.map((robot, index) => (
              <RobotCard
                key={index}
                name={robot.name}
                store={robot.store}
                type={robot.type}
                priceWithoutClub={robot.priceWithoutClub}
                priceWithClub={robot.priceWithClub}
                characteristics={robot.characteristics}
                assets={robot.assets}
                category={robot.category}
                downloadUrl={robot.downloadUrl}
                requiresLogin={selectedPack === 'free' && currentPlan === 'free'}
              />
            ))}

            {/* Show locked robots */}
            {lockedRobots.map((robot, index) => (
              <div
                key={`locked-${index}`}
                className="relative"
              >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] rounded-xl z-10 flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="h-6 w-6 text-white mx-auto mb-2" />
                    <p className="text-sm text-white">
                      Disponível em planos superiores
                    </p>
                  </div>
                </div>
                <RobotCard
                  name={robot.name}
                  store={robot.store}
                  type={robot.type}
                  priceWithoutClub={robot.priceWithoutClub}
                  priceWithClub={robot.priceWithClub}
                  characteristics={robot.characteristics}
                  assets={robot.assets}
                  category={robot.category}
                  downloadUrl={robot.downloadUrl}
                />
              </div>
            ))}

            {/* Empty state messages */}
            {!showWarrenPacks && robots.length === 0 && lockedRobots.length === 0 && !showCopyTradeCard && (
              <div className="col-span-full text-center py-12 text-gray-300 dark:text-gray-300">
                Nenhuma estratégia encontrada com os filtros selecionados.
              </div>
            )}
            
            {selectedPack === 'copy_trade' && !hasCopyTradeAccess && (
              <div className="col-span-full text-center py-12 text-gray-300 dark:text-gray-300">
                Você não tem acesso ao Copy Trade. Faça upgrade para o plano Pro ou Copy Trade.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}