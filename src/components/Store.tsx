import { useState } from 'react';
import { Button } from './Button';
import { Notebook as Robot, Copy, Server, Settings, Code, BarChart as ChartBar, ArrowRight, Check, AlertCircle, Users, Shield, ArrowUpRight, ArrowDownRight, MessageSquare, Bot, Gift, Monitor, Cpu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePlan } from '../contexts/PlanContext';
import { plans } from '../lib/plans';
import { whatsappLinks, demoScheduleLink, stripeLinks, resourceLinks } from '../lib/robotLinks';
import { StrategyPackBoxes } from './StrategyPackBoxes';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

interface TabProps {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabProps[] = [
  { id: 'overview', label: 'Visão Simplificada', icon: <ChartBar className="h-5 w-5" /> },
  { id: 'detailed', label: 'Visão Detalhada', icon: <Settings className="h-5 w-5" /> },
];

interface NavItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const NavItem = ({ id, label, icon, active, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors w-full ${
      active
        ? 'bg-blue-800 dark:bg-blue-800 text-white dark:text-white'
        : 'text-gray-300 dark:text-gray-300 hover:bg-blue-900/50 dark:hover:bg-blue-900/50'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const products = [
  {
    title: 'GR Pro 25 Contratos',
    category: 'Automação',
    description: 'Robô avançado para operações em múltiplos mercados com análise técnica avançada.',
    price: '199,90',
    originalPrice: '499,90',
    icon: <Robot className="h-5 w-5" />,
    link: stripeLinks.grPro,
    requiredPlan: 'free'
  },
  {
    title: 'Alavancagem Extra',
    category: 'Automação',
    description: 'Aumente sua alavancagem em operações automatizadas para maximizar seus resultados.',
    price: '400,00',
    originalPrice: '550,00',
    icon: <ChartBar className="h-5 w-5" />,
    link: "https://buy.stripe.com/4gw3fPePObfffiU3cP",
    requiredPlan: 'free'
  },
  {
    title: 'Assessoria BTG Pactual',
    category: 'Assessoria',
    description: 'Assessoria especializada para abertura de conta e operações na BTG Pactual.',
    price: '0',
    icon: <Users className="h-5 w-5" />,
    link: whatsappLinks.support,
    requiredPlan: 'free'
  },
  {
    title: 'Módulo de Backtest Starter',
    category: 'Plataforma',
    description: 'Módulo básico para backtesting de suas estratégias de trading.',
    price: '150,00',
    originalPrice: '250,00',
    icon: <ChartBar className="h-5 w-5" />,
    link: 'https://buy.stripe.com/14k7w59vufvv6MoeVG',
    requiredPlan: 'free'
  },

  {
    title: 'Plataforma BlackArrow Pro',
    category: 'Plataforma',
    description: 'Plataforma profissional para trading com recursos avançados e 20% de desconto.',
    price: '120,00',
    originalPrice: '150,00',
    icon: <ChartBar className="h-5 w-5" />,
    link: resourceLinks.blackArrowPro,
    requiredPlan: 'starter'
  },
  {
    title: 'VPS Trader 4GB',
    category: 'Infraestrutura',
    description: 'Servidor virtual dedicado com 4GB de RAM para execução contínua dos seus robôs.',
    price: '110,00',
    originalPrice: '145,00',
    icon: <Server className="h-5 w-5" />,
    link: 'https://www.musthost.com.br/sac/cart.php?a=add&pid=191',
    requiredPlan: 'free'
  },
  {
    title: 'VPS Trader 8GB',
    category: 'Infraestrutura',
    description: 'Servidor virtual dedicado com 8GB de RAM para operações mais exigentes.',
    price: '210,00',
    originalPrice: '245,00',
    icon: <Server className="h-5 w-5" />,
    link: 'https://www.musthost.com.br/sac/cart.php?a=add&pid=192',
    requiredPlan: 'starter'
  },
  {
    title: 'Módulo de Automação Nelogica',
    category: 'Plataformas',
    description: 'Módulo avançado para automação completa de suas estratégias de trading com 15% de desconto.',
    price: 'A partir de 85,00',
    icon: <Settings className="h-5 w-5" />,
    link: resourceLinks.nelogicaAutomation,
    requiredPlan: 'free'
  },
  {
    title: 'Mesa Proprietária',
    category: 'Trading',
    description: 'Opere com capital de terceiros e risco controlado. Mesas a partir de 349,00 mensal.',
    price: 'A partir de 349,00',
    icon: <ChartBar className="h-5 w-5" />,
    link: resourceLinks.mesaProprietaria,
    requiredPlan: 'free'
  }
];

// Promoções gratuitas
const freePromotions = [
  {
    title: 'Profit Ultra Warren',
    category: 'Promoções',
    description: 'Plataforma completa Profit Ultra gratuita para clientes Warren com mínimo de 500 contratos/mês.',
    price: '0',
    originalPrice: '500,90',
    icon: <Gift className="h-5 w-5" />,
    link: 'https://profitestrategista.com.br/login',
    requiredPlan: 'free'
  },
  {
    title: 'Módulo de Automação Premium Warren',
    category: 'Promoções',
    description: 'Módulo de automação premium gratuito para clientes Warren com mínimo de 500 contratos/mês.',
    price: '0',
    originalPrice: '429,90',
    icon: <Gift className="h-5 w-5" />,
    link: 'https://profitestrategista.com.br/login',
    requiredPlan: 'free'
  },
  {
    title: 'Profit Pro Warren GRÁTIS',
    category: 'Promoções',
    description: 'Plataforma Profit Pro gratuita para clientes Warren com mínimo de 500 contratos/mês.',
    price: '0',
    originalPrice: '350,00',
    icon: <Gift className="h-5 w-5" />,
    link: 'https://profitestrategista.com.br/login',
    requiredPlan: 'free'
  },
  {
    title: 'Profit Pro BTG Mosaico GRÁTIS',
    category: 'Promoções',
    description: 'Plataforma Profit Pro gratuita para clientes BTG Mosaico com mínimo de operações mensais.',
    price: '0',
    originalPrice: '350,00',
    icon: <Gift className="h-5 w-5" />,
    link: whatsappLinks.support,
    requiredPlan: 'free'
  },
  {
    title: 'Profit Pro XP Nomos GRÁTIS',
    category: 'Promoções',
    description: 'Plataforma Profit Pro gratuita para clientes XP Nomos com mínimo de operações mensais.',
    price: '0',
    originalPrice: '350,00',
    icon: <Gift className="h-5 w-5" />,
    link: whatsappLinks.support,
    requiredPlan: 'free'
  }
];

// Combine products with free promotions
const allProducts = [...products, ...freePromotions];

const planUpgrades = {
  free: {
    next: 'starter',
    link: stripeLinks.packStarter,
    benefits: [
      '14 Robôs Starter',
      'Estratégias para WIN e BIT',
      'Tendência, Reversão e Scalp',
      'Operações automatizadas',
      'Suporte básico'
    ]
  },
  starter: {
    next: 'pro',
    link: stripeLinks.packPro,
    benefits: [
      'Todos os 23 robôs incluídos',
      'Pack Sscalper + Pack Global',
      'Backtest sem limites',
      'Suporte VIP 24/7',
      'Copy Trade incluído'
    ]
  },
  global: {
    next: 'pro',
    link: stripeLinks.packPro,
    benefits: [
      'Todos os 23 robôs incluídos',
      'Pack Scalper + Pack Global',
      'Backtest sem limites',
      'Suporte VIP 24/7',
      'Copy Trade incluído'
    ]
  }
};

const planDowngrades = {
  pro: {
    prev: 'starter',
    link: whatsappLinks.downgrade
  },
  global: {
    prev: 'starter',
    link: whatsappLinks.downgrade
  },
  starter: {
    prev: 'free',
    link: whatsappLinks.downgrade
  }
};

export function Store() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSection, setActiveSection] = useState('copy-invest');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [activeBroker, setActiveBroker] = useState('Todas');
  const [showMonthly, setShowMonthly] = useState(true);
  const { user } = useAuth();
  const { currentPlan } = usePlan();
  const location = useLocation();

  // Check for section parameter in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    if (section && sections.some(s => s.id === section)) {
      setActiveSection(section);
    }
  }, [location]);

  const sections = [
    { id: 'copy-invest', label: 'Copy Trade', icon: <Copy className="h-5 w-5" /> },
    { id: 'robots', label: 'Robôs e Serviços', icon: <Robot className="h-5 w-5" /> },
    { id: 'packs', label: 'Packs de Estratégias', icon: <ChartBar className="h-5 w-5" /> }
  ];

  const categories = [
    'Todos',
    'Automação',
    'Assessoria',
    'Plataforma',
    'Infraestrutura',
    'Plataformas',
    'Trading',
    'Promoções'
  ];

  const brokers = [
    'Todas',
    'Warren',
    'BTG Pactual',
    'XP Nomos'
  ];

  const planLevel = {
    'free': 0,
    'starter': 1,
    'global': 1,
    'pro': 2,
    'Copy Trade': 2
  };

  const canAccessProduct = (product: any, requiredPlan: string) => {
    return planLevel[currentPlan as keyof typeof planLevel] >= planLevel[requiredPlan as keyof typeof planLevel];
  };

  const renderProductCard = (product: any) => {
    const hasAccess = canAccessProduct(product, product.requiredPlan);

    return (
      <div className="bg-blue-900/80 dark:bg-blue-900/80 rounded-xl overflow-hidden shadow-lg border border-blue-800/30 dark:border-blue-800/30 relative transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 dark:from-blue-800 dark:to-blue-900 p-3">
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            {product.icon}
            <span>{product.category}</span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white dark:text-white mb-3">{product.title}</h3>
          <p className="text-blue-200 dark:text-blue-200 mb-6 min-h-[80px]">{product.description}</p>
          
          <div className="mb-6 bg-blue-800/50 dark:bg-blue-800/50 p-4 rounded-lg border border-blue-700/30">
            <div className="text-sm text-blue-300 dark:text-blue-300 mb-1">Preço</div>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold text-white dark:text-white">
                R$ {product.price}
              </div>
              {product.originalPrice && (
                <div className="text-sm text-blue-400 dark:text-blue-400 line-through">
                  R$ {product.originalPrice}
                </div>
              )}
            </div>
          </div>

          <Button
            as="a"
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full group bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!hasAccess}
          >
            Contratar
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    );
  };

  // Filter products based on category and broker
  const filteredProducts = allProducts.filter(product => {
    if (activeCategory !== 'Todos' && product.category !== activeCategory) {
      return false;
    }
    
    // Filter by broker if applicable
    if (activeBroker !== 'Todas') {
      if (activeBroker === 'Warren' && !product.title.includes('Warren')) {
        return false;
      }
      if (activeBroker === 'BTG Pactual' && !product.title.includes('BTG')) {
        return false;
      }
      if (activeBroker === 'XP Nomos' && !product.title.includes('XP')) {
        return false;
      }
    }
    
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white dark:text-white">
            Loja de Opcionais
          </h1>
          <p className="text-blue-200 dark:text-blue-200 mt-2">
            Seu Plano: {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
          </p>
        </div>

        <div className="flex gap-2">
          {planUpgrades[currentPlan as keyof typeof planUpgrades] && (
            <Button
              as="a"
              href={whatsappLinks.support}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ArrowUpRight className="h-4 w-4" />
              Fazer Upgrade
            </Button>
          )}

          {planDowngrades[currentPlan as keyof typeof planDowngrades] && (
            <Button
              as="a"
              href={whatsappLinks.support}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="flex items-center gap-2 border-blue-700 text-blue-200"
            >
              <ArrowDownRight className="h-4 w-4" />
              Fazer Downgrade
            </Button>
          )}
        </div>
      </div>

      {planUpgrades[currentPlan as keyof typeof planUpgrades] && (
        <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-8 text-white mb-8 border border-blue-700/30 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <ArrowUpRight className="h-5 w-5 text-white" />
            <h2 className="text-xl font-semibold text-white">
              Upgrade Disponível
            </h2>
          </div>
          <p className="text-white mb-6">
            Faça upgrade do seu plano para acessar mais recursos e robôs exclusivos.
          </p>
          <Button
            as="a"
            href={whatsappLinks.support}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            Ver Planos
          </Button>


        </div>
      )}

      <div className="flex gap-8">
        <div className="w-64">
          <nav className="bg-blue-900 dark:bg-blue-900 rounded-xl p-4 border border-blue-800 dark:border-blue-800">
            {sections.map((section) => (
              <NavItem
                key={section.id}
                {...section}
                active={activeSection === section.id}
                onClick={() => setActiveSection(section.id)}
              />
            ))}
          </nav>
        </div>

        <div className="flex-1">
          {activeSection === 'copy-invest' && (
            <>
              {/* Toggle between Monthly and Semestral plans */}
              <div className="flex justify-center mb-8">
                <div className="bg-blue-900/50 p-1 rounded-lg inline-flex">
                  <button
                    onClick={() => setShowMonthly(true)}
                    className={`px-4 py-2 rounded-md ${
                      showMonthly 
                        ? 'bg-blue-700 text-white' 
                        : 'text-blue-200 hover:bg-blue-800/50'
                    }`}
                  >
                    Planos Mensais
                  </button>
                  <button
                    onClick={() => setShowMonthly(false)}
                    className={`px-4 py-2 rounded-md ${
                      !showMonthly 
                        ? 'bg-blue-700 text-white' 
                        : 'text-blue-200 hover:bg-blue-800/50'
                    }`}
                  >
                    Planos Semestrais
                  </button>
                </div>
              </div>

              {showMonthly ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-xl p-8 border border-amber-700/30 shadow-lg">
                    <div className="inline-flex items-center gap-2 mb-4 bg-amber-800/50 px-3 py-1.5 rounded-full border border-amber-700/30">
                      <Copy className="h-6 w-6 text-white" />
                      <span className="text-sm font-semibold text-white">Porftólio de IA</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Copy Invest Multi</h3>
                    <p className="text-white mb-6">
                      +40 Estratégias com até 10x alavancagem.
                    </p>
                    <div className="mb-6">
                      <div className="text-white">Mensalidade</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">R$ 1.000</span>
                        <span className="text-white">/mês</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">30 Estratégias para futuros</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Muito fácil para começar</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Compatível com mesa proprietária</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Conta simulador habilitada</span>
                      </li>
                    </ul>
                    <Button
                      as="a"
                      href={stripeLinks.copyNelogica}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-amber-600 hover:bg-amber-50"
                    >
Ver na NeloStore
                    </Button>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-xl p-8 border border-green-700/30 shadow-lg">
                    <div className="inline-flex items-center gap-2 mb-4 bg-green-800/50 px-3 py-1.5 rounded-full border border-green-700/30">
                      <Copy className="h-6 w-6 text-white" />
                      <span className="text-sm font-semibold text-white">Portfólio de IA</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">HFT Institucional Mini Índice</h3>
                    <p className="text-white mb-6">
                      Opere Mini Índice com 1x alavancagem.
                    </p>
                    <div className="mb-6">
                      <div className="text-white">Mensalidade</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">R$ 400,00</span>
                        <span className="text-white">/mês</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">HFT inteligente para WIN</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Operações automatizadas</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Gestão profissional de capital</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Operações via BTG Pactual com coretagem R$ 0,00</span>
                      </li>
                    </ul>
                    <Button
                      as="a"
                      href="https://buy.stripe.com/cN217HePO833c6IcNo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-green-600 hover:bg-green-50"
                    >
                    Copy Índice
                    </Button>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-8 border border-blue-700/30 shadow-lg">
                    <div className="inline-flex items-center gap-2 mb-4 bg-blue-800/50 px-3 py-1.5 rounded-full border border-blue-700/30">
                      <Copy className="h-6 w-6 text-white" />
                      <span className="text-sm font-semibold text-white">Portfólio de IA</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">HFT Institucional Mini Dólar</h3>
                    <p className="text-white mb-6">
                      Opere dólar com 1x alavancagem.
                    </p>
                    <div className="mb-6">
                      <div className="text-white">Mensalidade</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">R$ 550,00</span>
                        <span className="text-white">/mês</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">HFT inteligente para WDO</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Operações automatizadas</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Gestão profissional de capital</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Operações via BTG Pactual com coretagem R$ 0,00</span>
                      </li>
                    </ul>
                    <Button
                      as="a"
                      href="https://buy.stripe.com/8wM03DgXW3MNc6I3cf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-blue-600 hover:bg-blue-50"
                    >
                   Copy Dólar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-8 border border-blue-700/30 shadow-lg">
                    <div className="inline-flex items-center gap-2 mb-4 bg-blue-800/50 px-3 py-1.5 rounded-full border border-blue-700/30">
                      <Copy className="h-6 w-6 text-white" />
                      <span className="text-sm font-semibold text-white">Portfólio de IA</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">HFT Institucional Mini índice Semestral</h3>
                    <p className="text-white mb-6">
                      Economize com o plano semestral para operações em WIN
                    </p>
                    <div className="mb-6">
                      <div className="text-white">Valor Semestral</div>
                      <div className="text-2xl font-bold text-white">R$ 2.100,00</div>
                      <div className="text-sm text-blue-200">Economia de R$ 900,00</div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Algorítimo Inteligente para WIN</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Operações automatizadas</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Gestão profissional de capital</span>
                      </li>
                    </ul>
                    <Button
                      as="a"
                      href="https://pag.ae/7_DzDCXG1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-blue-600 hover:bg-blue-50"
                    >
              Futuros Semestral
                    </Button>
                    
                     <div className="flex items-center justify-center gap-2 mt-4">
                <Users className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">    Planos semestrais no PIX ou com parcelamento em até 12x no cartão</span>
              </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-xl p-8 border border-green-700/30 shadow-lg">
                    <div className="inline-flex items-center gap-2 mb-4 bg-green-800/50 px-3 py-1.5 rounded-full border border-green-700/30">
                      <Copy className="h-6 w-6 text-white" />
                      <span className="text-sm font-semibold text-white">Portfólio de IA</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">HFT Institucional Mini Dólar Semestral</h3>
                    <p className="text-white mb-6">
                      Economize com o plano semestral para operações em WDO
                    </p>
                    <div className="mb-6">
                      <div className="text-white">Valor Semestral</div>
                      <div className="text-2xl font-bold text-white">R$ 3.000,00</div>
                      <div className="text-sm text-green-200">Economia de R$ 300,00</div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                         <span className="text-white">Algorítimo Inteligente para WDO</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Operações automatizadas</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Gestão profissional de capital</span>
                      </li>
                    </ul>
                    <Button
                      as="a"
                      href="https://pag.ae/7_DzFabSa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-green-600 hover:bg-green-50"
                    >
                   Ações Semestral
                    </Button>
                                 <div className="flex items-center justify-center gap-2 mt-4">
                <Users className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">    Planos semestrais no PIX ou com parcelamento em até 12x no cartão</span>
              </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-xl p-8 border border-purple-700/30 shadow-lg">
                    <div className="inline-flex items-center gap-2 mb-4 bg-purple-800/50 px-3 py-1.5 rounded-full border border-purple-700/30">
                      <Users className="h-6 w-6 text-white" />
                      <span className="text-sm font-semibold text-white">COMBO 3X</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Combo Futuros 3x Semestral</h3>
                    <p className="text-white mb-6">
                      Copy futuros semestral com 3x alavancagem com alavancagem com desconto
                    </p>
                    <div className="mb-6">
                      <div className="text-white">Valor Semestral</div>
                      <div className="text-2xl font-bold text-white">R$ 6.000,00</div>
                      <div className="text-sm text-purple-200">Economia de R$ 1.800,00</div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Copy Trade com 3x alavancagem</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Suporte VIP prioritário</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Acesso a todas as estratégias</span>
                      </li>
                    </ul>
                    <Button
                      as="a"
                      href="https://pag.ae/7_DzE6qVm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-purple-600 hover:bg-purple-50"
                    >
                      Contratar Combo 3x
                    </Button>
                                 <div className="flex items-center justify-center gap-2 mt-4">
                <Users className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">    Planos semestrais no PIX ou com parcelamento em até 12x no cartão</span>
              </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-xl p-8 border border-indigo-700/30 shadow-lg">
                    <div className="inline-flex items-center gap-2 mb-4 bg-indigo-800/50 px-3 py-1.5 rounded-full border border-indigo-700/30">
                      <Users className="h-6 w-6 text-white" />
                      <span className="text-sm font-semibold text-white">COMBO 5X</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Combo 5x Semestral</h3>
                    <p className="text-white mb-6">
                      Copy futuros com 5x alavancagem
                    </p>
                    <div className="mb-6">
                      <div className="text-white">Valor Semestral</div>
                      <div className="text-2xl font-bold text-white">R$ 9.000,00</div>
                      <div className="text-sm text-indigo-200">Economia de R$ 2.700,00</div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Copy Trade com 5x alavancagem</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Suporte VIP prioritário</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Acesso a todas as estratégias</span>
                      </li>
                    </ul>
                    <Button
                      as="a"
                      href="https://pag.ae/7_DzGjfjm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-indigo-600 hover:bg-indigo-50"
                    >
                      Contratar Combo 5x
                    </Button>
                                 <div className="flex items-center justify-center gap-2 mt-4">
                <Users className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">    Planos semestrais no PIX ou com parcelamento em até 12x no cartão</span>
              </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-8 border border-blue-700/30 shadow-lg">
                    <div className="inline-flex items-center gap-2 mb-4 bg-blue-800/50 px-3 py-1.5 rounded-full border border-blue-700/30">
                      <Users className="h-6 w-6 text-white" />
                      <span className="text-sm font-semibold text-white">COMBO 7X</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Combo 7x Semestral</h3>
                    <p className="text-white mb-6">
                      Copy futuros com 7x alavancagem
                    </p>
                    <div className="mb-6">
                      <div className="text-white">Valor Semestral</div>
                      <div className="text-2xl font-bold text-white">R$ 12.000,00</div>
                      <div className="text-sm text-blue-200">Economia de R$ 3.600,00</div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Copy Trade com 7x alavancagem</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Suporte VIP prioritário</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Acesso a todas as estratégias</span>
                      </li>
                    </ul>
                    <Button
                      as="a"
                      href="https://pag.ae/7_DzH8orb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-blue-600 hover:bg-blue-50"
                    >
                      Contratar Combo 7x
                    </Button>
                                 <div className="flex items-center justify-center gap-2 mt-4">
                <Users className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">    Planos semestrais no PIX ou com parcelamento em até 12x no cartão</span>
              </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-xl p-8 border border-amber-700/30 shadow-lg">
                    <div className="inline-flex items-center gap-2 mb-4 bg-amber-800/50 px-3 py-1.5 rounded-full border border-amber-700/30">
                      <Users className="h-6 w-6 text-white" />
                      <span className="text-sm font-semibold text-white">COMBO 10X</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Combo 10x Semestral</h3>
                    <p className="text-white mb-6">
                      Copy futuros com 10x alavancagem
                    </p>
                    <div className="mb-6">
                      <div className="text-white">Valor Semestral</div>
                      <div className="text-2xl font-bold text-white">R$ 15.000,00</div>
                      <div className="text-sm text-amber-200">Economia de R$ 4.500,00</div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Copy Trade com 10x alavancagem</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Suporte VIP prioritário</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Acesso a todas as estratégias</span>
                      </li>
                    </ul>
                    <Button
                      as="a"
                      href="https://pag.ae/7_DzHBTsQ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-amber-600 hover:bg-amber-50"
                    >
                      Contratar Combo 10x
                    </Button>
                                 <div className="flex items-center justify-center gap-2 mt-4">
                <Users className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">    Planos semestrais no PIX ou com parcelamento em até 12x no cartão</span>
              </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-xl p-8 border border-purple-700/30 shadow-lg">
                    <div className="inline-flex items-center gap-2 mb-4 bg-purple-800/50 px-3 py-1.5 rounded-full border border-purple-700/30">
                      <Copy className="h-6 w-6 text-white" />
                      <span className="text-sm font-semibold text-white">COPY NELOGICA</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Copy Nelogica Semestral</h3>
                    <p className="text-white mb-6">
30 Estratégias em formato Copy Invest com até 10x alavancagem.
                    </p>
                    <div className="mb-6">
                      <div className="text-white">Valor Semestral</div>
                      <div className="text-2xl font-bold text-white">R$ 6.000,00</div>
                      <div className="text-sm text-purple-200">Economia de R$ 0.000,00</div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Futuros e ações incluídos</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Suporte VIP prioritário</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white">Acesso a todas as estratégias</span>
                      </li>
                    </ul>
                    <Button
                      as="a"
                      href={stripeLinks.copyNelogica}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-purple-600 hover:bg-purple-50"
                    >
                     Ver na NeloStore
                    </Button>
                                 <div className="flex items-center justify-center gap-2 mt-4">
                <Users className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">    Planos semestrais no PIX ou com parcelamento em até 12x no cartão</span>
              </div>
                  </div>
                </div>
              )}
            
     
 
         
            </>
          )}

          {activeSection === 'robots' && (
            <>
              <div className="flex flex-wrap gap-4 mb-6">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-lg ${
                      activeCategory === category
                        ? 'bg-blue-700 text-white'
                        : 'bg-blue-900/50 text-blue-200 hover:bg-blue-800/50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {activeCategory === 'Promoções' && (
                <div className="flex flex-wrap gap-4 mb-6">
                  <h3 className="w-full text-lg font-semibold text-white mb-2">Selecione a Corretora:</h3>
                  {brokers.map(broker => (
                    <button
                      key={broker}
                      onClick={() => setActiveBroker(broker)}
                      className={`px-4 py-2 rounded-lg ${
                        activeBroker === broker
                          ? 'bg-blue-700 text-white'
                          : 'bg-blue-900/50 text-blue-200 hover:bg-blue-800/50'
                      }`}
                    >
                      {broker}
                    </button>
                  ))}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map((product, index) => (
                  <div key={index}>
                    {renderProductCard(product)}
                  </div>
                ))}
                
                {filteredProducts.length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-blue-200">Nenhum produto encontrado com os filtros selecionados.</p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeSection === 'packs' && (
            <div>
              {/* Toggle between Monthly and Semestral plans */}
              <div className="flex justify-center mb-8">
                <div className="bg-blue-900/50 p-1 rounded-lg inline-flex">
                  <button
                    onClick={() => setShowMonthly(true)}
                    className={`px-4 py-2 rounded-md ${
                      showMonthly 
                        ? 'bg-blue-700 text-white' 
                        : 'text-blue-200 hover:bg-blue-800/50'
                    }`}
                  >
                    Planos Mensais
                  </button>
                  <button
                    onClick={() => setShowMonthly(false)}
                    className={`px-4 py-2 rounded-md ${
                      !showMonthly 
                        ? 'bg-blue-700 text-white' 
                        : 'text-blue-200 hover:bg-blue-800/50'
                    }`}
                  >
                    Planos Semestrais
                  </button>
                </div>
              </div>
              
              {showMonthly ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl p-8 text-white border border-gray-700/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
                    <div className="flex items-center gap-2 mb-4">
                      <Monitor className="h-6 w-6 text-white" />
                      <h3 className="text-xl font-bold text-white">Combo 3Ultra Warren</h3>
                    </div>
                    <p className="text-gray-300 mb-6 min-h-[80px]">
                      Ideal para iniciantes que desejam testar a solução com isenção + Módulo Premium grátis.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4 mb-6 border border-gray-700/30">
                      <div className="text-sm text-gray-400 mb-1">Preço</div>
                      <div className="text-3xl font-bold text-white">
                        R$ 0
                        <span className="text-sm text-gray-400">/por 1 mês</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">6 Robôs Scalper com foco em WIN</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">Módulo de Automação Premium obrigatório</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">Sem replay e sem backtest</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">VPS Trader com desconto</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">Profit Ultra Warren GRÁTIS</span>
                      </li>
                    </ul>
                    <div className="text-xs text-gray-400 mb-4">
                      Nota: Gratuidade condicionada a giro mínimo de 500 contratos/mês
                    </div>
                    <Button
                      as="a"
                      href="https://bit.ly/3GoDUoE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-gray-800 hover:bg-gray-100"
                    >
                      Cadastro Warren
                    </Button>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-8 text-white border border-blue-700/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
                    <div className="flex items-center gap-2 mb-4">
                      <Robot className="h-6 w-6 text-white" />
                      <h3 className="text-xl font-bold text-white">Pack Starter</h3>
                    </div>
                    <p className="text-blue-200 mb-6 min-h-[80px]">
                      Ideal para iniciantes e traders que buscam estratégias de Scalp com alta taxa de acerto para o mercado de mini índice.
                    </p>
                    <div className="bg-blue-800/50 rounded-lg p-4 mb-6 border border-blue-700/30">
                      <div className="text-sm text-blue-300 mb-1">Preço</div>
                      <div className="text-3xl font-bold text-white">
                        R$ 350
                        <span className="text-sm text-blue-300">/mês</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-blue-300" />
                        <span className="text-blue-200">6 Robôs Scalper com foco em WIN</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-blue-300" />
                        <span className="text-blue-200">Módulo de Automação Warren GRÁTIS</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-blue-300" />
                        <span className="text-blue-200">Backtest e replay incluso</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-blue-300" />
                        <span className="text-blue-200">VPS Trader com desconto</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-blue-300" />
                        <span className="text-blue-200">Profit Ultra Warren GRÁTIS</span>
                      </li>
                    </ul>
                    <div className="text-xs text-blue-300 mb-4">
                     Planos semestrais no PIX ou com parcelamento em até 12x no cartão
                    </div>
                    <Button
                      as="a"
                      href={stripeLinks.packStarter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-blue-600 hover:bg-blue-50"
                    >
                 Pack Scalper
                    </Button>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-xl p-8 text-white border border-purple-700/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
                    <div className="flex items-center gap-2 mb-4">
                      <ChartBar className="h-6 w-6 text-white" />
                      <h3 className="text-xl font-bold text-white">Pack Global</h3>
                    </div>
                    <p className="text-purple-200 mb-6 min-h-[80px]">
                      Diversificação com estratégias para criptomoedas, ações globais e mercados futuros internacionais.
                    </p>
                    <div className="bg-purple-800/50 rounded-lg p-4 mb-6 border border-purple-700/30">
                      <div className="text-sm text-purple-300 mb-1">Preço</div>
                      <div className="text-3xl font-bold text-white">
                        R$ 350
                        <span className="text-sm text-purple-300">/mês</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-purple-300" />
                        <span className="text-purple-200">3 Robôs para futuros, ações e cripto 24/7</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-purple-300" />
                        <span className="text-purple-200">Módulo de Automação com desconto</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-purple-300" />
                        <span className="text-purple-200">Backtest e replay incluso</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-purple-300" />
                        <span className="text-purple-200">VPS Trader com desconto</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-purple-300" />
                        <span className="text-purple-200">BlackArrow Pro 20% OFF</span>
                      </li>
                    </ul>
                    <div className="text-xs text-purple-300 mb-4">
                      Planos semestrais no PIX ou com parcelamento em até 12x no cartão
                    </div>
                    <Button
                      as="a"
                      href={stripeLinks.packGlobal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-purple-600 hover:bg-purple-50"
                    >
         Pack Global
                    </Button>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-xl p-8 text-white border border-amber-700/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
                    <div className="flex items-center gap-2 mb-4">
                      <Bot className="h-6 w-6 text-white" />
                      <h3 className="text-xl font-bold text-white">Pack PRO</h3>
                    </div>
                    <p className="text-amber-200 mb-6 min-h-[80px]">
                      Solução completa com robôs premium, portfólio completo e suporte VIP para traders profissionais com implantação.
                    </p>
                    <div className="bg-amber-800/50 rounded-lg p-4 mb-6 border border-amber-700/30">
                      <div className="text-sm text-amber-300 mb-1">Preço</div>
                      <div className="text-3xl font-bold text-white">
                        R$ 700
                        <span className="text-sm text-amber-300">/mês</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-amber-300" />
                        <span className="text-amber-200">5 Robôs Hunter opera qualquer ativo</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-amber-300" />
                        <span className="text-amber-200">6 robôs Scalper e 3 robôs Global</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-amber-300" />
                        <span className="text-amber-200">Copy Trade com desconto</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-amber-300" />
                        <span className="text-amber-200">Backtest ilimitado para todas estratégias</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-amber-300" />
                        <span className="text-amber-200">Suporte VIP 24/7 com atendimento prioritário</span>
                      </li>
                    </ul>
                    <div className="text-xs text-amber-300 mb-4">
                      Planos semestrais no PIX ou com parcelamento em até 12x no cartão
                    </div>
                    <Button
                      as="a"
                      href={stripeLinks.packPro}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-amber-600 hover:bg-amber-50"
                    >
               Pack PRO
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-8 text-white border border-blue-700/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
                    <div className="flex items-center gap-2 mb-4">
                      <Robot className="h-6 w-6 text-white" />
                      <h3 className="text-xl font-bold text-white">Pack Scalper Semestral</h3>
                    </div>
                    <p className="text-blue-200 mb-6 min-h-[80px]">
                      Economize com o plano semestral do Pack Scalper e tenha acesso a todos os robôs.
                    </p>
                    <div className="bg-blue-800/50 rounded-lg p-4 mb-6 border border-blue-700/30">
                      <div className="text-sm text-blue-300 mb-1">Preço</div>
                      <div className="text-3xl font-bold text-white">
                        R$ 1.800
                        <span className="text-sm text-blue-300">/sem</span>
                      </div>
                      <div className="text-sm text-blue-300">Economia de R$ 1.200</div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-blue-300" />
                        <span className="text-blue-200">6 Robôs Scalper com foco em WIN</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-blue-300" />
                        <span className="text-blue-200">Backtest e replay incluso</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-blue-300" />
                        <span className="text-blue-200">Suporte prioritário</span>
                      </li>
                    </ul>
                    <Button
                      as="a"
                      href="https://pag.ae/7_Dzgy7sG"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-blue-600 hover:bg-blue-50"
                    >
                   Starter Semestral
                    </Button>
                                 <div className="flex items-center justify-center gap-2 mt-4">
                <Users className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">    Planos semestrais no PIX ou com parcelamento em até 12x no cartão</span>
              </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-xl p-8 text-white border border-purple-700/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
                    <div className="flex items-center gap-2 mb-4">
                      <ChartBar className="h-6 w-6 text-white" />
                      <h3 className="text-xl font-bold text-white">Pack Global Semestral</h3>
                    </div>
                    <p className="text-purple-200 mb-6 min-h-[80px]">
                      Economize com o plano semestral do Pack Global para mercados internacionais.
                    </p>
                    <div className="bg-purple-800/50 rounded-lg p-4 mb-6 border border-purple-700/30">
                      <div className="text-sm text-purple-300 mb-1">Preço</div>
                      <div className="text-3xl font-bold text-white">
                        R$ 1.800
                        <span className="text-sm text-purple-300">/sem</span>
                      </div>
                      <div className="text-sm text-purple-300">Economia de R$ 300</div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-purple-300" />
                        <span className="text-purple-200">3 Robôs para mercados globais</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-purple-300" />
                        <span className="text-purple-200">Backtest e replay incluso</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-purple-300" />
                        <span className="text-purple-200">Suporte prioritário</span>
                      </li>
                    </ul>
                    <Button
                      as="a"
                      href="https://pag.ae/7_DzENiCR"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-purple-600 hover:bg-purple-50"
                    >
                Global Semestral
                    </Button>
                                 <div className="flex items-center justify-center gap-2 mt-4">
                <Users className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">    Planos semestrais no PIX ou com parcelamento em até 12x no cartão</span>
              </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-xl p-8 text-white border border-amber-700/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
                    <div className="flex items-center gap-2 mb-4">
                      <Bot className="h-6 w-6 text-white" />
                      <h3 className="text-xl font-bold text-white">Pack PRO Quant Semestral</h3>
                    </div>
                    <p className="text-amber-200 mb-6 min-h-[80px]">
                      Economize com o Pack PRO e tenha acesso a todos os recursos premium.
                    </p>
                    <div className="bg-amber-800/50 rounded-lg p-4 mb-6 border border-amber-700/30">
                      <div className="text-sm text-amber-300 mb-1">Preço</div>
                      <div className="text-3xl font-bold text-white">
                        R$ 3.000
                        <span className="text-sm text-amber-300">/sem</span>
                      </div>
                      <div className="text-sm text-amber-300">Economia de R$ 1.200</div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-amber-300" />
                        <span className="text-amber-200">Todos os 14 robôs do Clube incluídos</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-amber-300" />
                        <span className="text-amber-200">Backtest ilimitado</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-amber-300" />
                        <span className="text-amber-200">Suporte VIP 24/7</span>
                      </li>
                    </ul>
                    <Button
                      as="a"
                      href="https://pag.ae/7_DzC-GEm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-amber-600 hover:bg-amber-50"
                    >
                   Pack PRO Semestral
                    </Button>
                                 <div className="flex items-center justify-center gap-2 mt-4">
                <Users className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">    Planos semestrais no PIX ou com parcelamento em até 12x no cartão</span>
              </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}