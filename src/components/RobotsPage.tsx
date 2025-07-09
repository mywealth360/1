import { useState } from 'react';
import { Button } from './Button';
import { ArrowRight, Check, Clock, Users, Zap, BarChart as ChartBar, Shield, ChevronDown, Bot, Award, Target, TrendingUp, Rocket, Laptop, Code, Settings, DollarSign, Briefcase, LineChart, Sliders, Cpu, Layers, Repeat, Gauge, Sparkles, Workflow, Copy } from 'lucide-react';
import { useRef, forwardRef } from 'react';
import { resourceLinks, stripeLinks, whatsappLinks } from '../lib/robotLinks';
import { StrategyPackBoxes } from './StrategyPackBoxes';

interface RobotCardProps {
  name: string;
  store: string;
  type: string;
  priceWithoutClub: string;
  priceWithClub: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText?: string;
  buttonLink?: string;
  category: 'tendencia' | 'reversao' | 'scalp' | 'misto' | 'manual';
  assets: string;
}

const RobotCard = forwardRef<HTMLDivElement, RobotCardProps & { scrollToPacks?: () => void }>(({
  name,
  store,
  type,
  priceWithoutClub,
  priceWithClub,
  description,
  features,
  popular = false,
  buttonText = 'Contratar Pack',
  buttonLink,
  category,
  assets,
  scrollToPacks
}, ref) => {
  const categoryStyles = {
    tendencia: {
      bg: 'bg-blue-100 dark:bg-blue-900',
      text: 'text-blue-800 dark:text-blue-200',
      border: 'border-blue-200 dark:border-blue-800'
    },
    reversao: {
      bg: 'bg-purple-100 dark:bg-purple-900',
      text: 'text-purple-800 dark:text-purple-200', 
      border: 'border-purple-200 dark:border-purple-800'
    },
    scalp: {
      bg: 'bg-green-100 dark:bg-green-900',
      text: 'text-green-800 dark:text-green-200',
      border: 'border-green-200 dark:border-green-800'
    },
    misto: {
      bg: 'bg-amber-100 dark:bg-amber-900', 
      text: 'text-amber-800 dark:text-amber-200',
      border: 'border-amber-200 dark:border-amber-800'
    },
    manual: {
      bg: 'bg-red-100 dark:bg-red-900',
      text: 'text-red-800 dark:text-red-200',
      border: 'border-red-200 dark:border-red-800'
    }
  };

  const styles = categoryStyles[category];

  const handleButtonClick = (e: React.MouseEvent) => {
    if (scrollToPacks) {
      e.preventDefault();
      scrollToPacks();
    }
  };

  return (
    <div ref={ref} className={`bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white ${popular ? 'ring-2 ring-blue-400' : ''}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ChartBar className="h-4 w-4 text-blue-200" />
            <span className="text-sm text-blue-200">{store}</span>
          </div>
          <h3 className="text-xl font-semibold text-white mt-2">{name}</h3>
        </div>
      </div>

      <div className="mt-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles.bg} ${styles.text}`}>
          {category === 'tendencia' && 'Tendência'}
          {category === 'reversao' && 'Reversão'}
          {category === 'scalp' && 'Scalping'}
          {category === 'misto' && 'Misto'}
          {category === 'manual' && 'Manual'}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <div className="text-sm text-blue-200">Sem o Clube</div>
          <div className="text-xl font-bold text-white line-through opacity-75">R$ {priceWithoutClub}</div>
        </div>
        <div>
          <div className="text-sm text-blue-200">Com o Clube</div>
          <div className="text-xl font-bold text-white">{priceWithClub}</div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-medium text-white">Características</h4>
        <ul className="mt-2 space-y-2">
          {features.map((char, index) => (
            <li key={index} className="text-sm text-blue-100 flex items-center">
              <Check className="h-4 w-4 mr-2 text-blue-200" />
              {char}
            </li>
          ))}
          <li className="text-sm text-blue-100 flex items-center">
            <Check className="h-4 w-4 mr-2 text-blue-200" />
            Ativos: {assets}
          </li>
        </ul>
      </div>

      <Button
        as="a"
        href="#packs-section"
        onClick={handleButtonClick}
        className="mt-6 w-full bg-white text-blue-600 hover:bg-blue-50 flex items-center justify-center gap-2"
      >
        Contratar Pack
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
});

RobotCard.displayName = 'RobotCard';

const RobotsPage = () => {
  const [selectedPack, setSelectedPack] = useState<'all' | 'starter' | 'trader' | 'global' | 'opcionais'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const packsRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  
  const scrollToPacks = () => {
    packsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  const scrollToComparison = () => {
    comparisonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const categories = {
    all: {
      label: 'Todas Categorias',
      subcategories: ['all']
    },
    tendencia: {
      label: 'Tendência',
      subcategories: ['all', 'win', 'bit', 'multi']
    },
    reversao: {
      label: 'Reversão',
      subcategories: ['all', 'win', 'bit', 'multi']
    },
    scalp: {
      label: 'Scalping',
      subcategories: ['all', 'win', 'bit', 'multi']
    },
    misto: {
      label: 'Misto',
      subcategories: ['all', 'win', 'bit', 'multi']
    },
    manual: {
      label: 'Manual',
      subcategories: ['all', 'win', 'bit', 'multi']
    }
  };

  const subcategoryLabels = {
    all: 'Todos Ativos',
    win: 'WIN',
    bit: 'BIT',
    multi: 'Multi-Ativo'
  };

  const starterRobots = [
    {
      name: "Trend 3",
      store: "NeloStore",
      type: "Tendência",
      priceWithoutClub: "249",
      priceWithClub: "Grátis",
      description: "Robô de tendência avançado para WIN",
      features: ["Tendência", "Automático"],
      assets: "WIN",
      category: 'tendencia' as const
    },
    {
      name: "Take 40",
      store: "NeloStore",
      type: "Reversão",
      priceWithoutClub: "249",
      priceWithClub: "Grátis",
      description: "Robô de reversão para WIN",
      features: ["Reversão", "Automático"],
      assets: "WIN",
      category: 'reversao' as const
    },
    {
      name: "V Reversão",
      store: "NeloStore",
      type: "Reversão",
      priceWithoutClub: "249",
      priceWithClub: "Grátis",
      description: "Robô de reversão em V para WIN",
      features: ["Reversão", "Automático"],
      assets: "WIN",
      category: 'reversao' as const
    },
    {
      name: "Take GO Scalper",
      store: "NeloStore",
      type: "Scalp",
      priceWithoutClub: "249",
      priceWithClub: "Grátis",
      description: "Robô para operações de scalp",
      features: ["Scalp", "Automático"],
      assets: "WIN",
      category: 'scalp' as const
    },
    {
      name: "Take 33 Scalper",
      store: "NeloStore",
      type: "Scalp",
      priceWithoutClub: "249",
      priceWithClub: "Grátis",
      description: "Robô de scalp para WIN",
      features: ["Scalp", "Automático"],
      assets: "WIN",
      category: 'scalp' as const
    },
    {
      name: "CB Scalper",
      store: "NeloStore",
      type: "Scalp",
      priceWithoutClub: "249",
      priceWithClub: "Grátis",
      description: "Robô para Mini Índice",
      features: ["Scalp", "Automático"],
      assets: "WIN",
      category: 'reversao' as const
    },
  
  ];

  const traderRobots = [
    {
      name: "Pivot Hunter",
      store: "NeloStore",
      type: "Misto",
      priceWithoutClub: "299",
      priceWithClub: "Grátis",
      description: "Robô de pivôs avançado",
      features: ["Misto", "Automático/Híbrido"],
      assets: "Multi-Ativo",
      category: 'misto' as const
    },
    {
      name: "Trap Hunter",
      store: "NeloStore",
      type: "Misto",
      priceWithoutClub: "299",
      priceWithClub: "Grátis",
      description: "Robô caçador de armadilhas",
      features: ["Misto", "Automático/Híbrido"],
      assets: "Multi-Ativo",
      category: 'misto' as const
    },
    {
      name: "Elephant Hunter",
      store: "NeloStore",
      type: "Misto",
      priceWithoutClub: "299",
      priceWithClub: "Grátis",
      description: "Robô de volume e momentum",
      features: ["Misto", "Automático/Híbrido"],
      assets: "Multi-Ativo",
      category: 'misto' as const
    },
    {
      name: "Setup 9.1/9.2",
      store: "NeloStore",
      type: "Misto",
      priceWithoutClub: "299",
      priceWithClub: "Grátis",
      description: "Robô de setups específicos",
      features: ["Misto", "Automático/Híbrido"],
      assets: "Multi-Ativo",
      category: 'misto' as const
    },
    {
      name: "Fibo Hunter",
      store: "NeloStore",
      type: "Misto",
      priceWithoutClub: "299",
      priceWithClub: "Grátis",
      description: "Robô baseado em Fibonacci",
      features: ["Misto", "Automático/Híbrido"],
      assets: "Multi-Ativo",
      category: 'misto' as const
    }
  ];

  const globalRobots = [
    {
      name: "GR Global",
      store: "NeloStore",
      type: "Misto",
      priceWithoutClub: "349,90",
      priceWithClub: "Grátis",
      description: "Trading global automatizado",
      features: ["Misto", "Manual/Híbrido"],
      assets: "Multi-Ativo",
      category: 'manual' as const
    },
    {
      name: "Criptomoedas",
      store: "NeloStore",
      type: "Misto",
      priceWithoutClub: "399,90",
      priceWithClub: "Grátis",
      description: "Robô para criptomoedas",
      features: ["Misto", "Automático/Híbrido"],
      assets: "Multi-Ativo",
      category: 'misto' as const
    },
    {
      name: "Ações e Futuros",
      store: "NeloStore",
      type: "Misto",
      priceWithoutClub: "399,90",
      priceWithClub: "Grátis",
      description: "Robô para ações e futuros",
      features: ["Misto", "Automático/Híbrido"],
      assets: "Multi-Ativo",
      category: 'misto' as const
    }
  ];

  const opcionaisRobots = [
    {
      name: "GR Pro 25 Contratos",
      store: "NeloStore",
      type: "Misto",
      priceWithoutClub: "499,90",
      priceWithClub: "199,90",
      description: "Robô avançado para operações em múltiplos mercados",
      features: ["Multi-Ativo", "Análise técnica avançada", "Filtros de volatilidade"],
      assets: "Multi-Ativo",
      category: 'misto' as const
    }
  ];

  const getCurrentRobots = () => {
    let robots = [] as any[];
    switch (selectedPack) {
      case 'all':
        robots = [...starterRobots, ...traderRobots, ...globalRobots, ...opcionaisRobots];
        break;
      case 'starter':
        robots = starterRobots;
        break;
      case 'trader':
        robots = traderRobots;
        break;
      case 'global':
        robots = globalRobots;
        break;
      case 'opcionais':
        robots = opcionaisRobots;
        break;
      default:
        robots = starterRobots;
    }

    return robots.filter(robot => {
      if (selectedCategory !== 'all' && robot.category !== selectedCategory) {
        return false;
      }

      if (selectedSubcategory !== 'all') {
        const assetType = robot.assets.toLowerCase();
        if (selectedSubcategory === 'win' && !assetType.toLowerCase().includes('win')) {
          return false;
        }
        if (selectedSubcategory === 'bit' && !assetType.toLowerCase().includes('bit')) {
          return false;
        }
        if (selectedSubcategory === 'multi' && !assetType.toLowerCase().includes('multi-ativo')) {
          return false;
        }
      }

      return true;
    });
  };

  const filteredRobots = getCurrentRobots();

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Enhanced Hero Section with full-width background */}
      <div 
        className="relative min-h-[700px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: 'url("https://imagizer.imageshack.com/img924/3651/znIspD.png")',
          backgroundPosition: 'center center'
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-950/80 to-blue-950/30"></div>
        
        {/* Animated particles overlay */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {/* Financial data visualization particles */}
          <div className="absolute w-5 h-5 bg-blue-400 rounded-full top-1/4 left-1/4 animate-float"></div>
          <div className="absolute w-4 h-4 bg-purple-400 rounded-full top-1/3 left-1/2 animate-float" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute w-3 h-3 bg-green-400 rounded-full top-2/3 left-1/3 animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute w-4 h-4 bg-blue-400 rounded-full top-1/2 left-3/4 animate-float" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute w-3 h-3 bg-purple-400 rounded-full top-3/4 left-1/4 animate-float" style={{animationDelay: '2s'}}></div>
          
          {/* Add more dynamic elements */}
          <div className="absolute w-24 h-1 bg-blue-500/50 rounded-full top-1/5 left-1/5 animate-pulse" style={{animationDelay: '0.7s'}}></div>
          <div className="absolute w-32 h-1 bg-purple-500/50 rounded-full top-2/5 left-3/5 animate-pulse" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute w-20 h-1 bg-green-500/50 rounded-full top-3/5 left-2/5 animate-pulse" style={{animationDelay: '1.8s'}}></div>
          
          {/* Chart-like elements */}
          <div className="absolute h-20 w-1 bg-blue-400/40 rounded-full top-1/3 left-1/6 animate-chart-bar" style={{boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)'}}></div>
          <div className="absolute h-32 w-1 bg-purple-400/40 rounded-full top-1/3 left-1/6 ml-6 animate-chart-bar" style={{animationDelay: '0.2s', boxShadow: '0 0 15px rgba(168, 85, 247, 0.5)'}}></div>
          <div className="absolute h-16 w-1 bg-green-400/40 rounded-full top-1/3 left-1/6 ml-12 animate-chart-bar" style={{animationDelay: '0.4s', boxShadow: '0 0 15px rgba(74, 222, 128, 0.5)'}}></div>
          <div className="absolute h-24 w-1 bg-blue-400/40 rounded-full top-1/3 left-1/6 ml-18 animate-chart-bar" style={{animationDelay: '0.6s', boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)'}}></div>
          <div className="absolute h-28 w-1 bg-purple-400/40 rounded-full top-1/3 left-1/6 ml-24 animate-chart-bar" style={{animationDelay: '0.8s', boxShadow: '0 0 15px rgba(168, 85, 247, 0.5)'}}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl ml-0 lg:ml-12 text-left">
            {/* Updated badge position - moved down by 20% */}
            <div className="inline-flex items-center justify-center gap-2 mb-8 mt-20 bg-blue-600 px-4 py-2 rounded-full shadow-lg">
              <Briefcase className="h-5 w-5 text-white" />
              <span className="text-base font-bold text-white">AUTOMAÇÃO PROFISSIONAL</span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-extrabold text-white mb-10 leading-tight">
              Clube de Robôs<br />Profit Estrategista
            </h1>
            
            <p className="text-3xl text-gray-200 mb-8 leading-relaxed">
              Estratégias automatizadas para diversos mercados e perfis de traders
            </p>
            
            <div className="mb-10">
              <p className="text-xl text-gray-300 mb-4">
                <span className="font-semibold">Transforme seu trading:</span> Acesso a mais de <span className="text-blue-400 font-bold">14 robôs</span> profissionais para diferentes mercados e estratégias
              </p>
              <p className="text-xl text-gray-300 mb-6">
                Elimine o fator emocional e opere com precisão matemática 24/7
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <Button
                as="a"
                href="#packs-section"
                onClick={scrollToPacks}
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg text-xl px-10 py-5 rounded-xl"
              >
                Conhecer Todos os Packs
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button
                as="a"
                href="/copy-invest"
                variant="outline"
                size="lg"
                className="group border-2 border-blue-400 text-blue-300 hover:bg-blue-900/30 text-xl px-10 py-5 rounded-xl"
              >
                Copy Trade
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            {/* Key benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
              <div className="bg-blue-900/60 backdrop-blur-sm p-4 rounded-lg border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-blue-300" />
                  <div className="text-lg font-semibold text-white">Alta Precisão</div>
                </div>
                <p className="text-blue-200 text-sm">Taxa de acerto de até 90% em estratégias otimizadas</p>
              </div>
              <div className="bg-blue-900/60 backdrop-blur-sm p-4 rounded-lg border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-blue-300" />
                  <div className="text-lg font-semibold text-white">Multi-Mercado</div>
                </div>
                <p className="text-blue-200 text-sm">Estratégias para Futuros, Ações e Mercados Globais</p>
              </div>
              <div className="bg-blue-900/60 backdrop-blur-sm p-4 rounded-lg border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-300" />
                  <div className="text-lg font-semibold text-white">Resultados</div>
                </div>
                <p className="text-blue-200 text-sm">Performance comprovada com backtests extensivos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Our Robots Section */}
      <div className="py-20 bg-gradient-to-b from-blue-950 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 rounded-full">
              <Rocket className="h-5 w-5 text-white" />
              <span className="text-sm font-bold text-white">POR QUE ESCOLHER NOSSOS ROBÔS</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Vantagens do Trading Automatizado
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Descubra como nossos robôs podem transformar sua experiência de trading, eliminando emoções e maximizando resultados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-xl p-8 shadow-lg border border-blue-800/30 transform transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-800/50 mx-auto mb-6">
                <Bot className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">
                Eliminação do Fator Emocional
              </h3>
              <p className="text-blue-200 text-center">
                Robôs operam sem medo, ganância ou hesitação, seguindo estritamente a estratégia programada.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-xl p-8 shadow-lg border border-blue-800/30 transform transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-800/50 mx-auto mb-6">
                <Laptop className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">
                Operação 24/7
              </h3>
              <p className="text-blue-200 text-center">
                Seus robôs podem monitorar e operar nos mercados continuamente, sem pausas ou fadiga.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-xl p-8 shadow-lg border border-blue-800/30 transform transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-800/50 mx-auto mb-6">
                <Code className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">
                Estratégias Testadas
              </h3>
              <p className="text-blue-200 text-center">
                Todas as estratégias são rigorosamente testadas com backtests extensivos antes de serem disponibilizadas.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-xl p-8 border border-blue-700/30 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="h-8 w-8 text-blue-400" />
                  <h3 className="text-2xl font-bold text-white">Tecnologia Avançada</h3>
                </div>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Nossos robôs são desenvolvidos com as mais avançadas tecnologias de automação e análise de mercado, 
                  permitindo identificar oportunidades com precisão e executar operações em milissegundos.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100">Algoritmos de alta frequência com baixa latência</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100">Análise técnica automatizada em múltiplos timeframes</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100">Gestão de risco integrada com controle de drawdown</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100">Compatibilidade com múltiplas plataformas (Profit, BlackArrow)</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="h-8 w-8 text-green-400" />
                  <h3 className="text-2xl font-bold text-white">Benefícios Financeiros</h3>
                </div>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Ao utilizar nossos robôs, você não apenas economiza tempo, mas também maximiza seu potencial de lucro 
                  com estratégias otimizadas e testadas em diferentes condições de mercado.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100">Economia de R$ 249,90 por robô com o Clube</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100">Potencial de retorno de 20-40% ao mês em estratégias otimizadas</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100">Diversificação de estratégias sem custo adicional</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100">Suporte técnico especializado incluído nos planos</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pack Explanations Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center gap-2 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 rounded-full">
                <Layers className="h-5 w-5 text-white" />
                <span className="text-sm font-bold text-white">NOSSOS PACKS</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Conheça Nossos Packs de Estratégias
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                Cada pack foi cuidadosamente desenvolvido para atender a diferentes perfis de traders e objetivos de investimento
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                     {/* Clube Free */}
              <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-8 border border-blue-700/30 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-full bg-blue-700/50 flex items-center justify-center">
                    <Rocket className="h-6 w-6 text-blue-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Combo Free Warren</h3>
                </div>
                <p className="text-blue-100 mb-6">
                  Ideal para iniciantes que desejam testar a solução com isenção + Módulo Premium grátis.
                </p>
                <div className="bg-blue-950/50 rounded-lg p-4 mb-6">
                  <div className="text-sm text-blue-300 mb-1">Preço</div>
                  <div className="text-1xl font-bold text-white">R$ 0,00/ por 3 meses</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100"><strong>6 Robôs Scalper</strong> com foco em WIN</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100"><strong>Módulo de Automação Premium obrigatório</strong></span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100"> <strong>Sem replay e sem backtest</strong></span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
           <span className="text-blue-100">VPS Trader <strong>com desconto</strong></span>
                  </li>
                                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                   <span className="text-blue-100">Profit Pro Warren <strong>GRÁTIS</strong></span>
                  </li>
                </ul>
                <div className="text-sm text-blue-200 mb-4">
                  <strong>Nota:</strong> Gratuidade condicionada a giro mínimo de 500 contratos/mês
                </div>
                <Button
                  as="a"
                  href={stripeLinks.packStarter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-blue-700 hover:bg-blue-50"
                >
                  Cadastro Grátis
                </Button>
              </div>
              {/* Pack Starter */}
              <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-8 border border-blue-700/30 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-full bg-blue-700/50 flex items-center justify-center">
                    <Rocket className="h-6 w-6 text-blue-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Pack Starter</h3>
                </div>
                <p className="text-blue-100 mb-6">
                  Ideal para iniciantes e traders que buscam estratégias de Scalp com alta taxa de acerto para o mercado de mini índice.
                </p>
                <div className="bg-blue-950/50 rounded-lg p-4 mb-6">
                  <div className="text-sm text-blue-300 mb-1">Preço</div>
                  <div className="text-1xl font-bold text-white">R$ 350/mês</div>
                </div> 
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100"><strong>6 Robôs Scalper</strong> com foco em WIN</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100"><strong>Módulo de Automação Warren</strong> GRÁTIS</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100">Backtest e replay <strong>incluso</strong></span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100">VPS Trader <strong>com desconto</strong></span>
                  </li>
                                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                   <span className="text-blue-100">Profit Pro Warren <strong> GRÁTIS</strong></span>
                  </li>
                </ul>
                <div className="text-sm text-blue-200 mb-4">
                  <strong>Melhor para:</strong> Iniciantes e traders que preferem mercados brasileiros
                </div>
                <Button
                  as="a"
                  href={stripeLinks.packStarter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-blue-700 hover:bg-blue-50"
                >
              Pack Scalper
                </Button>
              </div>

           

              {/* Pack Global */}
              <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-xl p-8 border border-green-700/30 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-full bg-green-700/50 flex items-center justify-center">
                    <Workflow className="h-6 w-6 text-green-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Pack Global</h3>
                </div>
                <p className="text-green-100 mb-6">
                  Diversificação internacional com estratégias para criptomoedas, ações globais e mercados futuros internacionais.
                </p> 
                <div className="bg-green-950/50 rounded-lg p-4 mb-6">
                  <div className="text-sm text-green-300 mb-1">Preço</div>
                  <div className="text-1xl font-bold text-white">R$ 350/mês</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-green-100"><strong>3 Robôs</strong> para futuros, ações e cripto 24/7</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                   <span className="text-blue-100"><strong>Módulo de Automação</strong> com desconto</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-blue-100">Backtest e replay <strong>incluso</strong></span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                   <span className="text-blue-100">VPS Trader <strong>com desconto</strong></span>
                  </li>
                   <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-green-100">BlackArrow Pro<strong> com desconto</strong></span>
                  </li>
                </ul>
                <div className="text-sm text-green-200 mb-4">
                  <strong>Melhor para:</strong> Traders que buscam exposição a mercados internacionais
                </div>
                <Button
                  as="a"
                  href={stripeLinks.packGlobal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-green-700 hover:bg-green-50"
                >
                  Contratar Pack Global
                </Button>
              </div>

              {/* Pack PRO */}
              <div className="bg-gradient-to-br from-amber-800 to-amber-900 rounded-xl p-8 border border-amber-700/30 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-full bg-amber-700/50 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-amber-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Pack PRO</h3>
                </div>
                <p className="text-amber-100 mb-6">
                  Solução completa com robôs premium, portfólio completo e suporte VIP para traders profissionais com implantação.
                </p>
                <div className="bg-amber-950/50 rounded-lg p-4 mb-6">
                  <div className="text-sm text-amber-300 mb-1">Preço</div>
                  <div className="text-1xl font-bold text-white">R$ 700/mês</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-amber-100"><strong>5 Robôs Hunter</strong> opera qualquer ativo</span>
                  </li>
                                <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-amber-100"><strong>6 robôs Scalper e 3 robôs Global</strong></span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-amber-100"><strong>Copy Trade</strong> com desconto</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-amber-100"><strong>Backtest ilimitado</strong> para todas estratégias</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-amber-100"><strong>Suporte VIP 24/7</strong> com atendimento prioritário</span>
                  </li>
                </ul>
                <div className="text-sm text-amber-200 mb-4">
                  <strong>Melhor para:</strong> Traders exigentes que priorizam backtest profissional
                </div>
                <Button
                  as="a"
                  href={stripeLinks.packPro}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-amber-700 hover:bg-amber-50"
                >
                  Contratar Pack PRO
                </Button>
              </div>
            </div>
          </div>

          {/* Clube de Robôs vs Copy Trade Comparison */}
          <div id="comparison-section" ref={comparisonRef} className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center gap-2 mb-4 bg-gradient-to-r from-blue-600 to-green-600 px-4 py-1.5 rounded-full">
                <Repeat className="h-5 w-5 text-white" />
                <span className="text-sm font-bold text-white">COMPARATIVO</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Clube de Robôs vs Copy Trade
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                Entenda as diferenças entre nossas duas principais soluções de automação e escolha a que melhor se adapta ao seu perfil
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Clube de Robôs */}
              <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-8 border border-blue-700/30 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-14 w-14 rounded-full bg-blue-700/50 flex items-center justify-center">
                    <Bot className="h-7 w-7 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Clube de Robôs</h3>
                    <p className="text-blue-300">Automação com controle total</p>
                  </div>
                </div>
                
                <div className="bg-blue-950/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="h-5 w-5 text-blue-300" />
                    <span className="text-lg font-semibold text-white">Sinal Perfeito</span>
                  </div>
                  <p className="text-blue-200">
                    Robôs com sinal de alta qualidade que exigem trabalho de gestão e configuração personalizada para maximizar resultados
                  </p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Controle Total</span>
                      <p className="text-blue-200 text-sm">Você configura e personaliza cada parâmetro dos robôs conforme sua estratégia</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Personalização Avançada</span>
                      <p className="text-blue-200 text-sm">Ajuste fino de todos os parâmetros, filtros e regras de entrada/saída</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Sem Spread</span>
                      <p className="text-blue-200 text-sm">Operações diretas sem taxas adicionais além das cobradas pela corretora</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Requer Conhecimento</span>
                      <p className="text-blue-200 text-sm">Necessita de tempo para configuração e acompanhamento das operações</p>
                    </div>
                  </li>
                </ul>
                
                <div className="bg-blue-900/50 rounded-lg p-4 mb-6">
                  <div className="text-lg font-semibold text-white mb-2">Ideal para quem:</div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-blue-100">Quer controle total sobre suas estratégias</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-blue-100">Tem conhecimento técnico ou disposição para aprender</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-blue-100">Prefere personalizar cada aspecto da operação</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-blue-100">Busca evitar taxas adicionais de spread</span>
                    </li>
                  </ul>
                </div>
                
                <Button
                  as="a"
                  href="#packs-section"
                  onClick={scrollToPacks}
                  className="w-full bg-white text-blue-700 hover:bg-blue-50"
                >
                  Ver Packs do Clube de Robôs
                </Button>
              </div>
              
              {/* Copy Trade */}
              <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-xl p-8 border border-green-700/30 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-14 w-14 rounded-full bg-green-700/50 flex items-center justify-center">
                    <Copy className="h-7 w-7 text-green-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Copy Trade</h3>
                    <p className="text-green-300">Automação total com gestão profissional</p>
                  </div>
                </div>
                
                <div className="bg-green-950/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="h-5 w-5 text-green-300" />
                    <span className="text-lg font-semibold text-white">Spread Baixo</span>
                  </div>
                  <p className="text-green-200">
                    Sistema completamente automatizado com spread baixo e zero necessidade de configuração ou personalização
                  </p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Automação Total</span>
                      <p className="text-green-200 text-sm">Operações 100% automatizadas sem necessidade de intervenção</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Gestão Profissional</span>
                      <p className="text-green-200 text-sm">Estratégias gerenciadas por traders profissionais e otimizadas constantemente</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Spread Baixo</span>
                      <p className="text-green-200 text-sm">Taxa mínima sobre operações para manutenção do sistema automatizado</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Zero Configuração</span>
                      <p className="text-green-200 text-sm">Basta contratar e conectar sua conta, sem necessidade de conhecimento técnico</p>
                    </div>
                  </li>
                </ul>
                
                <div className="bg-green-900/50 rounded-lg p-4 mb-6">
                  <div className="text-lg font-semibold text-white mb-2">Ideal para quem:</div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-green-100">Busca uma solução "set and forget" sem complicações</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-green-100">Não tem tempo ou conhecimento para configurar robôs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-green-100">Prefere delegar a gestão para profissionais</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-green-100">Valoriza a simplicidade e praticidade</span>
                    </li>
                  </ul>
                </div>
                
                <Button
                  as="a"
                  href="/copy-invest"
                  className="w-full bg-white text-green-700 hover:bg-green-50"
                >
                  Conhecer o Copy Trade
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 mb-4 bg-gradient-to-r from-green-600 to-blue-600 px-4 py-1.5 rounded-full">
              <Briefcase className="h-5 w-5 text-white" />
              <span className="text-sm font-bold text-white">PARA TODOS OS PERFIS</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Soluções para Diferentes Perfis de Traders
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Seja você iniciante ou profissional, temos estratégias automatizadas que se adaptam ao seu perfil e objetivos
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-xl p-6 border border-blue-700/30">
                <div className="flex items-center gap-2 mb-4">
                  <LineChart className="h-6 w-6 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">Iniciantes</h3>
                </div>
                <p className="text-blue-100 mb-4">
                  Robôs com configuração simplificada e estratégias de fácil compreensão, ideais para quem está começando.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-blue-200">Copy Starter</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-blue-200">Combo Free Warren</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-blue-200">Copy Multi</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 rounded-xl p-6 border border-purple-700/30">
                <div className="flex items-center gap-2 mb-4">
                  <LineChart className="h-6 w-6 text-purple-400" />
                  <h3 className="text-xl font-bold text-white">Intermediários</h3>
                </div>
                <p className="text-blue-100 mb-4">
                  Estratégias mais sofisticadas com maior personalização e potencial de retorno para traders experientes.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-blue-200">Pack Hunter</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-blue-200">Pack Global</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-blue-200">Pack Starter</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-xl p-6 border border-green-700/30">
                <div className="flex items-center gap-2 mb-4">
                  <LineChart className="h-6 w-6 text-green-400" />
                  <h3 className="text-xl font-bold text-white">Avançados</h3>
                </div>
                <p className="text-blue-100 mb-4">
                  Soluções avançadas complexas com foco em performance para traders profissionais e institucionais.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-blue-200">Copy Trade</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-blue-200">Pack Pro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-blue-200">Mesa Proprietária</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Copy Trade Section - Moved above the robots portfolio section */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 shadow-lg mb-12">
            <h3 className="text-xl font-semibold text-white mb-4">
              Copy Trade - Operações Automatizadas
            </h3>
            <p className="text-white/90 mb-6">
              Escolha entre nossas opções de Copy Trade e deixe que traders profissionais operem para você:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-white">
                <h4 className="font-bold text-lg">Copy Starter</h4>
                <p className="text-sm mt-1 mb-3">Conta simulador inclusa</p>
                <p className="font-bold text-xl mb-2">R$ 500/1º mês</p>
                <Button
                  as="a"
                  href={stripeLinks.copyFuturos}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-purple-600 hover:bg-purple-50 text-sm"
                  size="sm"
                >
                  Contratar
                </Button>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-white">
                <h4 className="font-bold text-lg">Copy Futuros</h4>
                <p className="text-sm mt-1 mb-3">24 Estratégias para Futuros</p>
                <p className="font-bold text-xl mb-2">R$ 550/mês</p>
                <Button
                  as="a"
                  href={stripeLinks.copyFuturos}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-purple-600 hover:bg-purple-50 text-sm"
                  size="sm"
                >
                  Contratar
                </Button>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-white">
                <h4 className="font-bold text-lg">Copy Ações</h4>
                <p className="text-sm mt-1 mb-3">23 Estratégias para Ações</p>
                <p className="font-bold text-xl mb-2">R$ 550/mês</p>
                <Button
                  as="a"
                  href={stripeLinks.copyAcoes}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-purple-600 hover:bg-purple-50 text-sm"
                  size="sm"
                >
                  Contratar
                </Button>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-white">
                <h4 className="font-bold text-lg">Copy Multi</h4>
                <p className="text-sm mt-1 mb-3">Opere Ações e Futuros</p>
                <p className="font-bold text-xl mb-2">R$ 750/mês</p>
                <Button
                  as="a"
                  href={stripeLinks.copyMulti}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-purple-600 hover:bg-purple-50 text-sm"
                  size="sm"
                >
                  Contratar
                </Button>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-white relative">
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">Melhor Valor</span>
                <h4 className="font-bold text-lg">Combo Semestral</h4>
                <p className="text-sm mt-1 mb-3">Copy Multi 3x alavancagem</p>
                <p className="font-bold text-xl mb-2">R$ 6.000/semestre</p>
                <Button
                  as="a"
                  href={stripeLinks.copyCombo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-purple-600 hover:bg-purple-50 text-sm"
                  size="sm"
                >
                  Contratar
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Button
                as="a"
                href="/copy-invest"
                className="bg-white text-purple-600 hover:bg-purple-50"
              >
                Ver Todos os Detalhes do Copy Trade
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

        

          {/* Pack Selector */}
          <div className="mb-8 mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-6">
              Selecione um Pack para ver os robôs disponíveis:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              <div 
                onClick={() => setSelectedPack('all')}
                className={`cursor-pointer rounded-xl p-4 text-center transition-all hover:shadow-lg ${
                  selectedPack === 'all' 
                    ? 'bg-blue-800 text-white border-2 border-blue-400 shadow-md transform scale-105' 
                    : 'bg-blue-700 text-white hover:bg-blue-600 border-2 border-transparent'
                }`}
              >
                <div className="flex flex-col items-center">
                  <h4 className="font-bold text-lg">Todos os Packs</h4>
                  <p className="text-sm mt-1 text-blue-200">Ver todos os robôs</p>
                </div>
              </div>
              <div 
                onClick={() => setSelectedPack('starter')}
                className={`cursor-pointer rounded-xl p-4 text-center transition-all hover:shadow-lg ${
                  selectedPack === 'starter' 
                    ? 'bg-blue-800 text-white border-2 border-blue-400 shadow-md transform scale-105' 
                    : 'bg-blue-700 text-white hover:bg-blue-600 border-2 border-transparent'
                }`}
              >
                <div className="flex flex-col items-center">
                  <h4 className="font-bold text-lg">Pack Starter</h4>
                  <p className="text-sm mt-1 text-blue-200">6 robôs Scalper para iniciantes</p>
                </div>
              </div>
              <div 
                onClick={() => setSelectedPack('trader')}
                className={`cursor-pointer rounded-xl p-4 text-center transition-all hover:shadow-lg ${
                  selectedPack === 'trader' 
                    ? 'bg-blue-800 text-white border-2 border-blue-400 shadow-md transform scale-105' 
                    : 'bg-blue-700 text-white hover:bg-blue-600 border-2 border-transparent'
                }`}
              >
                <div className="flex flex-col items-center">
                  <h4 className="font-bold text-lg">Pack Hunter</h4>
                  <p className="text-sm mt-1 text-blue-200">5 robôs avançados com alta personalização</p>
                </div>
              </div>
              <div 
                onClick={() => setSelectedPack('global')}
                className={`cursor-pointer rounded-xl p-4 text-center transition-all hover:shadow-lg ${
                  selectedPack === 'global' 
                    ? 'bg-blue-800 text-white border-2 border-blue-400 shadow-md transform scale-105' 
                    : 'bg-blue-700 text-white hover:bg-blue-600 border-2 border-transparent'
                }`}
              >
                <div className="flex flex-col items-center">
                  <h4 className="font-bold text-lg">Pack Global</h4>
                  <p className="text-sm mt-1 text-blue-200">3 robôs com +10 estratégias para mercados globais</p>
                </div>
              </div>
              <div 
                onClick={() => setSelectedPack('opcionais')}
                className={`cursor-pointer rounded-xl p-4 text-center transition-all hover:shadow-lg ${
                  selectedPack === 'opcionais' 
                    ? 'bg-blue-800 text-white border-2 border-blue-400 shadow-md transform scale-105' 
                    : 'bg-blue-700 text-white hover:bg-blue-600 border-2 border-transparent'
                }`}
              >
                <div className="flex flex-col items-center">
                  <h4 className="font-bold text-lg">Opcionais</h4>
                  <p className="text-sm mt-1 text-blue-200">Robôs complementares</p>
                </div>
              </div>
            </div>
            
            {/* Filter Section - Enhanced and more visible */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-100 dark:border-blue-800/50 shadow-md mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-4">
              
                  </h4>
                  <div className="flex flex-wrap gap-2">
 
               
              
              

                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-4">
                    Informações das Estratégias
                  </h4>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-sm">
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></span>
                        <div>
                          <p className="font-medium">Pack Hunter</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Todos Multi-Ativo. Personalização avançada para traders experientes. Estratégias de alta precisão.</p>
                        </div>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></span>
                        <div>
                          <p className="font-medium">Pack Global</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Todos Multi-Ativo. Diversificação em múltiplos mercados internacionais. Ideal para quem busca exposição global.</p>
                        </div>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5"></span>
                        <div>
                          <p className="font-medium">Pack Scalper</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Principalmente WIN. Alta taxa de acerto (85-90%). Setup mais fácil, ideal para iniciantes.</p>
                        </div>
                      </li>
                     <li className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5"></span>
                       <div>
                         <p className="font-medium">Portfólio de IA</p>
                         <p className="text-xs text-gray-500 dark:text-gray-400">Operações automatizadas via BTG Pactual. Disponível em 3 modalidades: Starter (R$300 no primeiro mês), Avulso (R$550) e Multi (R$750).</p>
                       </div>
                     </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Robots Grid */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Robôs Disponíveis no {selectedPack === 'starter' ? 'Pack Starter' : 
                                 selectedPack === 'all' ? 'Todos os Packs' :
                                 selectedPack === 'trader' ? 'Pack Hunter' : 
                                 selectedPack === 'global' ? 'Pack Global' : 'Pack Opcionais'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {selectedPack === 'all' && "Visualize todos os robôs disponíveis em nossos diferentes packs. Escolha o que melhor se adapta às suas necessidades."}
              {selectedPack === 'starter' && "O Pack Starter oferece robôs com alta taxa de acerto (85-90%) e configuração simplificada, ideal para iniciantes."}
              {selectedPack === 'trader' && "O Pack Hunter contém robôs altamente personalizáveis para traders experientes, com estratégias avançadas de caça a oportunidades."}
              {selectedPack === 'global' && "O Pack Global permite diversificação em múltiplos mercados internacionais, incluindo criptomoedas e ações globais."}
              {selectedPack === 'opcionais' && "Robôs opcionais que podem ser adquiridos individualmente para complementar sua estratégia."}
            </p>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {filteredRobots.map((robot, index) => (
                <RobotCard
                  key={index}
                  {...robot}
                  buttonLink="/estrategias"
                  buttonText="Contratar Pack"
                  scrollToPacks={scrollToPacks}
                />
              ))}
              {filteredRobots.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
                  Nenhum robô encontrado com os filtros selecionados.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating scroll button */}
      <div className="fixed bottom-6 right-6 z-10">
        <Button
          onClick={scrollToPacks}
          className="h-14 w-14 rounded-full flex items-center justify-center shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default RobotsPage;

export { RobotsPage };