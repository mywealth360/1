import { useState, useRef } from 'react';
import { Button } from './Button';
import { 
  ArrowRight, Check, Shield, Notebook as Robot, Users, BarChart as ChartBar, 
  Bot, Settings, MessageSquare, Clock, Filter, ChevronDown, ChevronUp, 
  Copy, Server, Play, Download, Info, HelpCircle, Target, Zap, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { stripeLinks, whatsappLinks } from '../lib/robotLinks';

// Robot data
const starterRobots = [
  {
    name: "Take GO Scalper",
    store: "NeloStore",
    type: "scalp",
    priceWithoutClub: "249,90",
    priceWithClub: "Grátis",
    characteristics: ["Scalping", "Automático", "Alta taxa de acerto"],
    assets: "WIN",
    category: 'scalp',
    url: "https://nelogica.com.br/estrategias?id=18316"
  },
  {
    name: "Take 33 Scalper",
    store: "NeloStore",
    type: "scalp",
    priceWithoutClub: "249,90",
    priceWithClub: "Grátis",
    characteristics: ["Scalping", "Automático", "Rápido"],
    assets: "WIN",
    category: 'scalp',
    url: "https://nelogica.com.br/estrategias?id=18321"
  },
  {
    name: "Take 40",
    store: "NeloStore",
    type: "reversao",
    priceWithoutClub: "249,90",
    priceWithClub: "Grátis",
    characteristics: ["Reversão", "Automático", "Consistente"],
    assets: "WIN",
    category: 'reversao',
    url: "https://nelogica.com.br/estrategias?id=18319"
  },
  {
    name: "Armadilha Scalper",
    store: "NeloStore",
    type: "scalp",
    priceWithoutClub: "249,90",
    priceWithClub: "Grátis",
    characteristics: ["Scalping", "Automático", "Caça armadilhas"],
    assets: "WIN",
    category: 'scalp',
    url: "https://nelogica.com.br/estrategias?id=18317"
  },
  {
    name: "CB Scalper",
    store: "NeloStore",
    type: "scalp",
    priceWithoutClub: "249,90",
    priceWithClub: "Grátis",
    characteristics: ["Scalping", "Automático", "Consistente"],
    assets: "WIN",
    category: 'scalp',
    url: "https://nelogica.com.br/estrategias?id=18315"
  },
  {
    name: "V Reversão",
    store: "NeloStore",
    type: "reversao",
    priceWithoutClub: "249,90",
    priceWithClub: "Grátis",
    characteristics: ["Reversão", "Automático", "Padrão V"],
    assets: "WIN",
    category: 'reversao',
    url: "https://nelogica.com.br/estrategias?id=18320"
  }
];

const hunterRobots = [
  {
    name: "Pivot Hunter",
    store: "NeloStore",
    type: "misto",
    priceWithoutClub: "299,90",
    priceWithClub: "Grátis",
    characteristics: ["Misto", "Automático", "Baseado em pivôs"],
    assets: "Multi-Ativo",
    category: 'misto',
    url: "https://nelogica.com.br/estrategias?id=14216"
  },
  {
    name: "Trap Hunter",
    store: "NeloStore",
    type: "misto",
    priceWithoutClub: "299,90",
    priceWithClub: "Grátis",
    characteristics: ["Misto", "Automático", "Caça armadilhas"],
    assets: "Multi-Ativo",
    category: 'misto',
    url: "https://nelogica.com.br/estrategias?id=14217"
  },
  {
    name: "Elephant Hunter",
    store: "NeloStore",
    type: "misto",
    priceWithoutClub: "299,90",
    priceWithClub: "Grátis",
    characteristics: ["Misto", "Automático", "Volume e momentum"],
    assets: "Multi-Ativo",
    category: 'misto',
    url: "https://nelogica.com.br/estrategias?id=14215"
  },
  {
    name: "Setup 9.1/9.2",
    store: "NeloStore",
    type: "misto",
    priceWithoutClub: "299,90",
    priceWithClub: "Grátis",
    characteristics: ["Misto", "Automático", "Setups específicos"],
    assets: "Multi-Ativo",
    category: 'misto',
    url: "https://nelogica.com.br/estrategias?id=14218"
  },
  {
    name: "Fibo Hunter",
    store: "NeloStore",
    type: "misto",
    priceWithoutClub: "299,90",
    priceWithClub: "Grátis",
    characteristics: ["Misto", "Automático", "Fibonacci"],
    assets: "Multi-Ativo",
    category: 'misto',
    url: "https://nelogica.com.br/estrategias?id=18318"
  }
];

const globalRobots = [
  {
    name: "GR Global",
    store: "NeloStore",
    type: "misto",
    priceWithoutClub: "349,90",
    priceWithClub: "Grátis",
    characteristics: ["Misto", "Manual/Híbrido", "Mercados globais"],
    assets: "Multi-Ativo",
    category: 'misto',
    url: "https://nelogica.com.br/estrategias?id=14289"
  },
  {
    name: "Criptomoedas",
    store: "NeloStore",
    type: "misto",
    priceWithoutClub: "399,90",
    priceWithClub: "Grátis",
    characteristics: ["Misto", "Automático/Híbrido", "Criptomoedas"],
    assets: "Multi-Ativo",
    category: 'misto',
    url: "https://nelogica.com.br/estrategias?id=14413"
  },
  {
    name: "Ações e Futuros",
    store: "NeloStore",
    type: "misto",
    priceWithoutClub: "399,90",
    priceWithClub: "Grátis",
    characteristics: ["Misto", "Automático/Híbrido", "Ações e futuros"],
    assets: "Multi-Ativo",
    category: 'misto',
    url: "https://nelogica.com.br/estrategias?id=14414"
  }
];

const optionalRobots = [
  {
    name: "GR Pro 25 Contratos",
    store: "NeloStore",
    type: "misto",
    priceWithoutClub: "499,90",
    priceWithClub: "199,90",
    characteristics: ["Multi-Ativo", "Análise técnica avançada", "Filtros de volatilidade"],
    assets: "Multi-Ativo",
    category: 'misto',
    url: "https://nelogica.com.br/estrategias?id=14205"
  }
];

// FAQ data
const faqData = [
  {
    question: "Preciso ter conhecimento técnico para utilizar os robôs?",
    answer: "Para o Clube de Robôs, um conhecimento básico de configuração é recomendado, mas oferecemos tutoriais detalhados e suporte para ajudá-lo. Para o Copy Trade, não é necessário conhecimento técnico, pois tudo é automatizado."
  },
  {
    question: "Posso operar com capital baixo?",
    answer: "Sim! Nossos robôs são compatíveis com operações de mini contratos, permitindo começar com capital reduzido. Recomendamos um capital inicial mínimo de R$ 5.000 para operações reais, mas você pode começar com conta simulador para testar as estratégias."
  },
  {
    question: "Os robôs funcionam com qualquer corretora?",
    answer: "Os robôs do Clube funcionam com qualquer corretora que ofereça as plataformas Profit Pro ou BlackArrow. Para o Copy Trade, trabalhamos exclusivamente com a BTG Pactual para garantir a melhor execução e segurança."
  },
  {
    question: "O que é necessário para instalar os robôs?",
    answer: "Você precisará da plataforma Profit Pro ou BlackArrow, do Módulo de Automação (incluído ou com desconto em nossos planos) e, opcionalmente, uma VPS para operação 24/7. Fornecemos um guia completo de instalação e configuração."
  },
  {
    question: "Como recebo suporte técnico?",
    answer: "Oferecemos suporte via WhatsApp, email e área de membros. Os planos mais avançados incluem suporte prioritário e atendimento VIP. Também disponibilizamos tutoriais em vídeo e documentação detalhada."
  },
  {
    question: "Qual a diferença entre o Clube de Robôs e o Copy Trade?",
    answer: "No Clube de Robôs, você tem controle total sobre a configuração e personalização das estratégias, ideal para quem quer aprender e personalizar. Já com Portfólios de IA, as operações são 100% automatizadas sem necessidade de intervenção, ideal para quem busca praticidade."
  },
  {
    question: "Os robôs são compatíveis com Mesa Proprietária?",
    answer: "Sim! Todos os nossos robôs e serviços de Copy Trade são compatíveis com Mesas Proprietárias. Temos parcerias com diversas mesas e oferecemos condições especiais para operadores de mesa."
  },
  {
    question: "Qual o retorno médio que posso esperar?",
    answer: "Os resultados variam conforme o mercado, capital e configuração, mas nossos robôs têm potencial para gerar entre 20% e 40% ao mês em condições favoráveis. Importante ressaltar que resultados passados não garantem retornos futuros."
  }
];

// Component for robot card
const RobotCard = ({ robot }) => {
  const categoryStyles = {
    'tendencia': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    'reversao': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
    'scalp': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    'misto': 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200'
  };

  return (
    <div className="bg-gradient-to-br from-blue-800 to-blue-950 rounded-xl p-6 text-white shadow-lg border border-blue-700/30">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-blue-300" />
            <span className="text-sm text-blue-300">{robot.store}</span>
          </div>
          <h3 className="text-xl font-semibold text-white mt-2">{robot.name}</h3>
        </div>
      </div>

      <div className="mt-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryStyles[robot.category] || 'bg-gray-100 text-gray-800'}`}>
          {robot.type.charAt(0).toUpperCase() + robot.type.slice(1)}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <div className="text-sm text-blue-300">Sem o Clube</div>
          <div className="text-xl font-bold text-white line-through opacity-75">R$ {robot.priceWithoutClub}</div>
        </div>
        <div>
          <div className="text-sm text-blue-300">Com o Clube</div>
          <div className="text-xl font-bold text-white">{robot.priceWithClub}</div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-medium text-white">Características</h4>
        <ul className="mt-2 space-y-2">
          {robot.characteristics.map((char, index) => (
            <li key={index} className="text-sm text-blue-200 flex items-center">
              <Check className="h-4 w-4 mr-2 text-blue-300" />
              {char}
            </li>
          ))}
          <li className="text-sm text-blue-200 flex items-center">
            <Check className="h-4 w-4 mr-2 text-blue-300" />
            Ativos: {robot.assets}
          </li>
        </ul>
      </div>

      <Button
        as="a"
        href={robot.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 w-full bg-white text-blue-800 hover:bg-blue-50 flex items-center justify-center gap-2"
      >
        <Download className="h-4 w-4" />
        Ver na NeloStore
      </Button>
    </div>
  );
};

// Main component
export function RobotsClub() {
  const [pricingPeriod, setPricingPeriod] = useState('monthly');
  const [selectedPack, setSelectedPack] = useState('all');
  const [showAllRobots, setShowAllRobots] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const packsRef = useRef(null);
  const robotsRef = useRef(null);
  const faqRef = useRef(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const scrollToPacks = () => {
    packsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToRobots = () => {
    robotsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFaq = () => {
    faqRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get robots based on selected pack
  const getFilteredRobots = () => {
    switch (selectedPack) {
      case 'starter':
        return starterRobots;
      case 'hunter':
        return hunterRobots;
      case 'global':
        return globalRobots;
      case 'optional':
        return optionalRobots;
      default:
        return [...starterRobots, ...hunterRobots, ...globalRobots, ...optionalRobots];
    }
  };

  const filteredRobots = getFilteredRobots();
  const displayRobots = showAllRobots ? filteredRobots : filteredRobots.slice(0, 6);

  return (
    <div className="bg-gray-900 text-white">
{/* SECTION 1: HERO SECTION */} 
<section className="relative py-24 bg-[#0A0E1A]">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      
      {/* TEXTOS */}
      <div className="text-center lg:text-left">
        <div className="inline-flex items-center gap-2 bg-blue-800/60 px-4 py-1.5 rounded-full shadow-md mb-6">
          <Copy className="h-5 w-5 text-white" />
          <span className="text-sm font-semibold tracking-wide text-white uppercase">
            Robôs Traders
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
         Clube de Robôs para Profit e BlackArrow
        </h1>
        
        <p className="text-lg md:text-xl text-blue-200 max-w-xl mx-auto lg:mx-0 mb-10">
          Automatize suas operações com estratégias testadas, controle total e performance comprovada. Elimine o emocional e opere com inteligência.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
          <Button
            onClick={scrollToPacks}
            className="bg-blue-500 hover:bg-blue-600 text-white group"
          >
            Ver Packs
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            as={Link}
            to="/copy-trade"
            variant="outline"
            className="border-blue-400 text-blue-300 hover:bg-blue-800/50"
          >
            Ver Portfólios de IA
          </Button>
          <Button
            onClick={scrollToRobots}
            variant="outline"
            className="border-blue-400 text-blue-300 hover:bg-blue-800/50"
          >
            Ver Robôs
          </Button>
        </div>
      </div>

{/* VÍDEO */}
<div className="relative w-full max-w-5xl mx-auto">
  <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-2xl">
    <iframe
      className="w-full h-full"
      src="https://www.youtube.com/embed/0uajKLBp6mM"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Profit Estrategista - Trading Automatizado"
    ></iframe>
  </div> 
</div>


    </div>
  </div>
</section>



{/* SECTION 2: VANTAGENS DO TRADING AUTOMATIZADO */}
<section className="py-20 bg-black">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-white mb-4">
        Vantagens do Trading Automatizado
      </h2>
      <p className="text-xl text-blue-300 max-w-3xl mx-auto">
        Descubra como nossos robôs podem transformar sua experiência de trading, eliminando emoções e maximizando resultados
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="bg-blue-900/50 rounded-xl p-8 border border-blue-800/30 transform transition-all duration-300 hover:scale-105">
        <div className="h-14 w-14 bg-blue-800/50 rounded-full flex items-center justify-center mb-6">
          <Shield className="h-7 w-7 text-blue-300" />
        </div>
        <h3 className="text-xl font-bold text-white mb-4">Eliminação do Fator Emocional</h3>
        <p className="text-blue-200">
          Robôs operam sem medo, ganância ou hesitação, seguindo estritamente a estratégia programada.
        </p>
      </div>

      <div className="bg-blue-900/50 rounded-xl p-8 border border-blue-800/30 transform transition-all duration-300 hover:scale-105">
        <div className="h-14 w-14 bg-blue-800/50 rounded-full flex items-center justify-center mb-6">
          <Clock className="h-7 w-7 text-blue-300" />
        </div>
        <h3 className="text-xl font-bold text-white mb-4">Operação 24/7</h3>
        <p className="text-blue-200">
          Seus robôs podem monitorar e operar nos mercados continuamente, sem pausas ou fadiga.
        </p>
      </div>

      <div className="bg-blue-900/50 rounded-xl p-8 border border-blue-800/30 transform transition-all duration-300 hover:scale-105">
        <div className="h-14 w-14 bg-blue-800/50 rounded-full flex items-center justify-center mb-6">
          <Target className="h-7 w-7 text-blue-300" />
        </div>
        <h3 className="text-xl font-bold text-white mb-4">Estratégias Testadas</h3>
        <p className="text-blue-200">
          Todas as estratégias são rigorosamente testadas com backtests extensivos antes de serem disponibilizadas.
        </p>
      </div>

      <div className="bg-blue-900/50 rounded-xl p-8 border border-blue-800/30 transform transition-all duration-300 hover:scale-105">
        <div className="h-14 w-14 bg-blue-800/50 rounded-full flex items-center justify-center mb-6">
          <Zap className="h-7 w-7 text-blue-300" />
        </div>
        <h3 className="text-xl font-bold text-white mb-4">Tecnologia Avançada</h3>
        <p className="text-blue-200">
          Algoritmos de alta frequência com baixa latência e análise técnica automatizada em múltiplos timeframes.
        </p>
      </div>
    </div>

    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-8 border border-blue-700/30">
        <div className="flex items-center gap-4 mb-6">
          <TrendingUp className="h-10 w-10 text-blue-300" />
          <h3 className="text-2xl font-bold text-white">Benefícios Financeiros</h3>
        </div>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <Check className="h-5 w-5 text-blue-300 mt-0.5 flex-shrink-0" />
            <span className="text-blue-100">Economia de R$ 249,90 por robô com o Clube</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-5 w-5 text-blue-300 mt-0.5 flex-shrink-0" />
            <span className="text-blue-100">Potencial de retorno de 20-40% ao mês em estratégias otimizadas</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-5 w-5 text-blue-300 mt-0.5 flex-shrink-0" />
            <span className="text-blue-100">Diversificação de estratégias sem custo adicional</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-5 w-5 text-blue-300 mt-0.5 flex-shrink-0" />
            <span className="text-blue-100">Suporte técnico especializado incluído nos planos</span>
          </li>
        </ul>
      </div>

      <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-8 border border-blue-700/30">
        <div className="flex items-center gap-4 mb-6">
          <Bot className="h-10 w-10 text-blue-300" />
          <h3 className="text-2xl font-bold text-white">Resultados Comprovados</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-800/50 rounded-lg p-4">
            <div className="text-sm text-blue-300">Trader Nível 1</div>
            <div className="text-2xl font-bold text-green-400">R$ 500 - 1.000</div>
            <div className="text-sm text-blue-200">Retorno mensal médio</div>
          </div>
          <div className="bg-blue-800/50 rounded-lg p-4">
            <div className="text-sm text-blue-300">Trader Nível 2</div>
            <div className="text-2xl font-bold text-green-400">R$ 1.000-1.500</div>
            <div className="text-sm text-blue-200">Retorno mensal médio</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-800/50 rounded-lg p-4">
            <div className="text-sm text-blue-300">Trader Nível 3</div>
            <div className="text-2xl font-bold text-green-400">R$ 1500 - 2.000</div>
            <div className="text-sm text-blue-200">Retorno mensal médio</div>
          </div>
          <div className="bg-blue-800/50 rounded-lg p-4">
            <div className="text-sm text-blue-300">Economia por Robô</div>
            <div className="text-2xl font-bold text-white">R$ 249,90</div>
            <div className="text-sm text-blue-200">Com o Clube de Robôs</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


{/* SECTION 3: PACKS DISPONÍVEIS */}
<section ref={packsRef} className="py-20 bg-gradient-to-b from-blue-950 to-blue-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-white mb-4">
        Conheça Nossos Packs de Estratégias
      </h2>
      <p className="text-xl text-blue-300 max-w-3xl mx-auto">
        Cada pack foi cuidadosamente desenvolvido para atender a diferentes perfis de traders e objetivos de investimento
      </p>
      <div className="flex justify-center mt-8 mb-12">
        <div className="bg-blue-800/30 p-1 rounded-full inline-flex">
          <button
            onClick={() => setPricingPeriod('monthly')}
            className={`px-6 py-2 rounded-full text-sm font-medium ${
              pricingPeriod === 'monthly'
                ? 'bg-blue-600 text-white'
                : 'text-blue-300 hover:text-white'
            }`}
          >
            Mensal
          </button>
          <button
            onClick={() => setPricingPeriod('semiannual')}
            className={`px-6 py-2 rounded-full text-sm font-medium ${
              pricingPeriod === 'semiannual'
                ? 'bg-blue-600 text-white'
                : 'text-blue-300 hover:text-white'
            }`}
          >
            Semestral
          </button>
        </div>
      </div>
    </div>

    <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">

      {/* Combo Free Warren */}
      <div className="w-full md:w-[360px] bg-black rounded-xl p-8 text-white shadow-xl border border-blue-700/30">
        <div className="flex items-center gap-2 mb-4">
          <Robot className="h-6 w-6 text-white" />
          <h3 className="text-xl font-bold text-white">Combo Starter</h3>
        </div>
        <p className="text-white/90 mb-6">
          Combo Profit Ultra + Módulo de Automação + Pack Scalper no primeiro mês grátis
        </p>
        <div className="mb-6 bg-blue-800/50 p-4 rounded-lg">
          <div className="text-sm text-white/70 mb-1">Preço</div>
          <div className="text-2xl font-bold text-white">1 mês GRÁTIS</div>
        </div>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-2"><Check className="h-5 w-5 text-white/80 mt-0.5" /><span className="text-white">6 Robôs Scalper</span></li>
          <li className="flex items-start gap-2"><Check className="h-5 w-5 text-white/80 mt-0.5" /><span className="text-white">Módulo de Automação GRÁTIS
</span></li>
          <li className="flex items-start gap-2"><Check className="h-5 w-5 text-white/80 mt-0.5" /><span className="text-white">Sem replay e sem backtest</span></li>
          <li className="flex items-start gap-2"><Check className="h-5 w-5 text-white/80 mt-0.5" /><span className="text-white">VPS Trader com desconto</span></li>
          <li className="flex items-start gap-2"><Check className="h-5 w-5 text-white/80 mt-0.5" /><span className="text-white">Profit Ultra GRÁTIS</span></li>
        </ul>
        <div className="text-sm text-white/70 mb-4">
          <strong>Nota:</strong> Primeiro mês grátis com a corretora Warren. Depois R$350,00 por mês
        </div>
        <Button
          as="a"
          href="https://profitestrategista.com.br/login"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-white text-blue-800 hover:bg-blue-50"
        >
          Cadastro Grátis
        </Button>
      </div>

      {/* Pack Starter */}
      <div className="w-full md:w-[360px] bg-black rounded-xl p-8 text-white shadow-xl border border-blue-700/30">
        <div className="flex items-center gap-2 mb-4">
          <Robot className="h-6 w-6 text-white" />
          <h3 className="text-xl font-bold text-white">Pack Scalper</h3>
        </div>
        <p className="text-white/90 mb-6">
          Ideal para iniciantes e traders que buscam estratégias de Scalp com alta taxa de acerto
        </p>
        <div className="mb-6 bg-blue-700/50 p-4 rounded-lg">
          <div className="text-sm text-white/70 mb-1">Preço</div>
          <div className="text-2xl font-bold text-white">
            {pricingPeriod === 'monthly' ? 'R$ 500/mês' : 'R$ 1.800,00'}
          </div>
        </div>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-2"><Check className="h-5 w-5 text-white/80 mt-0.5" /><span className="text-white">6 Robôs Scalper</span></li>
          <li className="flex items-start gap-2"><Check className="h-5 w-5 text-white/80 mt-0.5" /><span className="text-white">Módulo de Automação GRÁTIS</span></li>
          <li className="flex items-start gap-2"><Check className="h-5 w-5 text-white/80 mt-0.5" /><span className="text-white">Backtest e replay</span></li>
          <li className="flex items-start gap-2"><Check className="h-5 w-5 text-white/80 mt-0.5" /><span className="text-white">VPS Trader com desconto</span></li>
          <li className="flex items-start gap-2"><Check className="h-5 w-5 text-white/80 mt-0.5" /><span className="text-white">Profit Ultra GRÁTIS</span></li>
        </ul>
        <div className="text-sm text-white/70 mb-4">
          Planos semestrais no PIX ou com parcelamento em até 12x no cartão
        </div>
        <Button
          as="a"
          href={pricingPeriod === 'monthly' ? stripeLinks.packStarter : "https://pag.ae/7_Dzgy7sG"}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-white text-blue-600 hover:bg-blue-50"
        >
          Pack Scalper
        </Button>
      </div>

      {/* Pack PRO */}
      <div className="w-full md:w-[360px] bg-black rounded-xl p-8 text-white shadow-xl border border-blue-700/30">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-6 w-6 text-white" />
          <h3 className="text-xl font-bold text-white">Pack PRO</h3>
        </div>
        <p className="text-white/90 mb-6">
          Solução completa com robôs premium, portfólio completo e suporte VIP para traders profissionais com implantação.
        </p>
        <div className="mb-6 bg-blue-700/50 p-4 rounded-lg">
          <div className="text-sm text-white/70 mb-1">Preço</div>
          <div className="text-2xl font-bold text-white">
            {pricingPeriod === 'monthly' ? 'R$ 700/mês' : 'R$ 3.000,00'}
          </div>
        </div>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-2"><Check className="h-5 w-5 text-white/80 mt-0.5" /><span className="text-white">5 Robôs Hunter</span></li>
          <li className="flex items-start gap-2"><Check className="h-5 w-5 text-white/80 mt-0.5" /><span className="text-white">6 robôs Scalper</span></li>
          <li className="flex items-start gap-2"><Check className="h-5 w-5 text-white/80 mt-0.5" /><span className="text-white">3 robôs Global</span></li>
          <li className="flex items-start gap-2"><Check className="h-5 w-5 text-white/80 mt-0.5" /><span className="text-white">Copy Trade com 50% OFF</span></li>
          <li className="flex items-start gap-2"><Check className="h-5 w-5 text-white/80 mt-0.5" /><span className="text-white">1 Reunião de Implantação</span></li>
        </ul>
        <div className="text-sm text-white/70 mb-4">
          Planos semestrais no PIX ou com parcelamento em até 12x no cartão
        </div>
        <Button
          as="a"
          href={pricingPeriod === 'monthly' ? stripeLinks.packPro : "https://pag.ae/7_DzC-GEm"}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-white text-blue-600 hover:bg-blue-50"
        >
          Pack PRO
        </Button>
      </div>
    </div>
  </div>
</section>

{/* SECTION 4: COMPARATIVO CLUBE DE ROBÔS VS COPY TRADE */}
<section className="py-20 bg-blue-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-white mb-4">
        Clube de Robôs vs Portfólio de IA
      </h2>
      <p className="text-xl text-blue-300 max-w-3xl mx-auto">
        Entenda as diferenças entre nossas duas principais soluções de automação e escolha a que melhor se adapta ao seu perfil
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Clube de Robôs */}
      <div className="bg-black rounded-xl p-8 border border-blue-700/30">
        <div className="flex items-center gap-3 mb-6">
          <Robot className="h-8 w-8 text-blue-300" />
          <h3 className="text-2xl font-bold text-white">Clube de Robôs</h3>
        </div>
        <p className="text-blue-200 mb-6">Automação com controle total</p>

        <div className="space-y-6 mb-8">
          <div className="bg-neutral-900 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Controle Total</h4>
            <p className="text-blue-200 text-sm">
              Você configura e personaliza cada parâmetro dos robôs conforme sua estratégia
            </p>
          </div>

          <div className="bg-neutral-900 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Personalização Avançada</h4>
            <p className="text-blue-200 text-sm">
              Ajuste fino de todos os parâmetros, filtros e regras de entrada/saída
            </p>
          </div>

          <div className="bg-neutral-900 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Sem Spread</h4>
            <p className="text-blue-200 text-sm">
              Operações diretas sem taxas adicionais além das cobradas pela corretora
            </p>
          </div>

          <div className="bg-neutral-900 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Requer Conhecimento</h4>
            <p className="text-blue-200 text-sm">
              Necessita de tempo para configuração e acompanhamento das operações
            </p>
          </div>
        </div>

        <div className="bg-neutral-900 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-white mb-2">Ideal para quem:</h4>
          <ul className="space-y-2 text-blue-200 text-sm">
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-blue-300 mt-0.5" />
              <span>Quer controle total sobre suas estratégias</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-blue-300 mt-0.5" />
              <span>Tem conhecimento técnico ou disposição para aprender</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-blue-300 mt-0.5" />
              <span>Prefere personalizar cada aspecto da operação</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-blue-300 mt-0.5" />
              <span>Busca evitar taxas adicionais de spread</span>
            </li>
          </ul>
        </div>

        <Button
          onClick={scrollToPacks}
          className="w-full bg-white text-blue-800 hover:bg-blue-50"
        >
          Ver Packs do Clube de Robôs
        </Button>
      </div>

      {/* Copy Trade */}
      <div className="bg-black rounded-xl p-8 border border-blue-700/30">
        <div className="flex items-center gap-3 mb-6">
          <Copy className="h-8 w-8 text-blue-300" />
          <h3 className="text-2xl font-bold text-white">Portfólio de IA</h3>
        </div>
        <p className="text-blue-200 mb-6">Automação total com gestão profissional</p>

        <div className="space-y-6 mb-8">
          <div className="bg-neutral-900 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Automação Total</h4>
            <p className="text-blue-200 text-sm">
              Operações 100% automatizadas sem necessidade de intervenção
            </p>
          </div>

          <div className="bg-neutral-900 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Gestão Profissional</h4>
            <p className="text-blue-200 text-sm">
              Estratégias gerenciadas por traders profissionais e otimizadas constantemente
            </p>
          </div>

          <div className="bg-neutral-900 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Spread Baixo</h4>
            <p className="text-blue-200 text-sm">
              Taxa mínima sobre operações para manutenção do sistema automatizado
            </p>
          </div>

          <div className="bg-neutral-900 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Zero Configuração</h4>
            <p className="text-blue-200 text-sm">
              Basta contratar e conectar sua conta, sem necessidade de conhecimento técnico
            </p>
          </div>
        </div>

        <div className="bg-neutral-900 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-white mb-2">Ideal para quem:</h4>
          <ul className="space-y-2 text-blue-200 text-sm">
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-blue-300 mt-0.5" />
              <span>Busca uma solução "set and forget" sem complicações</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-blue-300 mt-0.5" />
              <span>Não tem tempo ou conhecimento para configurar robôs</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-blue-300 mt-0.5" />
              <span>Prefere delegar a gestão para profissionais</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-blue-300 mt-0.5" />
              <span>Valoriza a simplicidade e praticidade</span>
            </li>
          </ul>
        </div>

        <Button
          as={Link}
          to="/copy-trade"
          className="w-full bg-white text-blue-800 hover:bg-blue-50"
        >
          Conhecer Portfólios de IA
        </Button>
      </div>
    </div>
  </div>
</section>

      {/* SECTION 5: SOLUÇÕES POR PERFIL DE TRADER */}
      <section className="py-20 bg-gradient-to-b from-blue-900 to-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Soluções para Diferentes Perfis de Traders
            </h2>
            <p className="text-xl text-blue-300 max-w-3xl mx-auto">
              Seja você iniciante ou profissional, temos estratégias automatizadas que se adaptam ao seu perfil e objetivos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Iniciantes */}
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-8 border border-blue-700/30">
              <div className="h-14 w-14 bg-blue-800/50 rounded-full flex items-center justify-center mb-6">
                <Bot className="h-7 w-7 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Iniciantes</h3>
              <p className="text-blue-200 mb-6">
                Robôs com configuração simplificada e estratégias de fácil compreensão, ideais para quem está começando.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-blue-100">
                  <Check className="h-5 w-5 text-blue-300" />
                  Copy Bitcoin
                </li>
                <li className="flex items-center gap-2 text-blue-100">
                  <Check className="h-5 w-5 text-blue-300" />
                  Pack Scalper
                </li>
                <li className="flex items-center gap-2 text-blue-100">
                  <Check className="h-5 w-5 text-blue-300" />
                  Copy Mini Índice
                </li>
              </ul>
              <Button
                as="a"
                href="https://profitestrategista.com.br/login"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-blue-800 hover:bg-blue-50"
              >
                Começar como Iniciante
              </Button>
            </div>

            {/* Intermediários */}
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-8 border border-blue-700/30">
              <div className="h-14 w-14 bg-blue-800/50 rounded-full flex items-center justify-center mb-6">
                <ChartBar className="h-7 w-7 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Intermediários</h3>
              <p className="text-blue-200 mb-6">
                Estratégias mais sofisticadas com maior personalização e potencial de retorno para traders experientes.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-blue-100">
                  <Check className="h-5 w-5 text-blue-300" />
                  Pack Hunter
                </li>
                <li className="flex items-center gap-2 text-blue-100">
                  <Check className="h-5 w-5 text-blue-300" />
                  Pack Global
                </li>
                <li className="flex items-center gap-2 text-blue-100">
                  <Check className="h-5 w-5 text-blue-300" />
                  Copy Dólar
                </li>
              </ul>
              <Button
                as="a"
                href={stripeLinks.packStarter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-blue-800 hover:bg-blue-50"
              >
                Avançar para Intermediário
              </Button>
            </div>

            {/* Avançados */}
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-8 border border-blue-700/30">
              <div className="h-14 w-14 bg-blue-800/50 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Avançados</h3>
              <p className="text-blue-200 mb-6">
                Soluções avançadas complexas com foco em performance para traders profissionais e institucionais.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-blue-100">
                  <Check className="h-5 w-5 text-blue-300" />
                  Robô Personalizado
                </li>
                <li className="flex items-center gap-2 text-blue-100">
                  <Check className="h-5 w-5 text-blue-300" />
                  Pack Pro
                </li>
                <li className="flex items-center gap-2 text-blue-100">
                  <Check className="h-5 w-5 text-blue-300" />
                  Mesa Proprietária
                </li>
              </ul>
              <Button
                as="a"
                href={stripeLinks.packPro}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-blue-800 hover:bg-blue-50"
              >
                Escolher Nível Avançado
              </Button>
            </div>
          </div>
        </div>
      </section>

  {/* SECTION 6: COPY TRADE TEASER */}
<section className="py-20 bg-blue-950">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-white mb-4">
       Portfólio de IA - Operações Automatizadas 
      </h2>
      <p className="text-xl text-blue-300 max-w-3xl mx-auto">
        Escolha entre nossas opções de Portfólio de IA e deixe que softwares inteligentes operem para você
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
  

      
      <div className="bg-black rounded-xl p-6 border border-blue-700/30">
        <h3 className="text-xl font-bold text-white mb-3">HFT Institucional Bitcoin</h3>
        <p className="text-blue-200 text-sm mb-4">Copy futuros 2x alavancagem</p> 
        <div className="text-2xl font-bold text-white mb-4">R$ 300,00</div>
        <Button as={Link} to="/copy-trade" className="w-full bg-white text-blue-800 hover:bg-blue-50">
          Contratar
        </Button>
      </div>

      <div className="bg-black rounded-xl p-6 border border-blue-700/30">
        <h3 className="text-xl font-bold text-white mb-3">HFT Institucional Índice</h3>
        <p className="text-blue-200 text-sm mb-4">Estratégias automáticas para Índice Futuro</p>
        <div className="text-2xl font-bold text-white mb-4">R$ 400/mês</div>
        <Button as={Link} to="/copy-trade" className="w-full bg-white text-blue-800 hover:bg-blue-50">
          Contratar
        </Button>
      </div>

      <div className="bg-black rounded-xl p-6 border border-blue-700/30">
        <h3 className="text-xl font-bold text-white mb-3">HFT Institucional Dólar</h3>
        <p className="text-blue-200 text-sm mb-4">Estratégias automáticas para Dólar Futuro.</p>
        <div className="text-2xl font-bold text-white mb-4">R$ 550/mês</div>
        <Button as={Link} to="/copy-trade" className="w-full bg-white text-blue-800 hover:bg-blue-50">
          Contratar
        </Button>
      </div>

         <div className="bg-black rounded-xl p-6 border border-blue-700/30">
        <h3 className="text-xl font-bold text-white mb-3">Copy Invest Portfólio de IA</h3>
        <p className="text-blue-200 text-sm mb-4">+40 Estratégias. Compatível com Mesa</p>
        <div className="text-2xl font-bold text-white mb-4">R$ 1.000/mês</div>
        <Button as={Link} to="/copy-trade" className="w-full bg-white text-blue-800 hover:bg-blue-50">
          Contratar
        </Button>
      </div>

      <div className="bg-black rounded-xl p-6 border border-blue-700/30 relative">
        <div className="absolute -top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          Melhor Valor
        </div>
        <h3 className="text-xl font-bold text-white mb-3">Combo de IA Semestral</h3>
        <p className="text-blue-200 text-sm mb-4">3 Portfólios de IA com 3x alavancagem</p>
        <div className="text-2xl font-bold text-white mb-4">R$ 6.000,00</div>
        <Button as={Link} to="/copy-trade" className="w-full bg-white text-blue-800 hover:bg-blue-50">
          Contratar
        </Button>
      </div>
    </div>

    <div className="mt-12 text-center">
      <Button
        as={Link}
        to="/copy-trade"
        className="bg-white text-blue-800 hover:bg-blue-50 group"
      >
        Ver Todos os Detalhes sobre Portfólios de IA
        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  </div>
</section>


 {/* SECTION 7: PACKS E ROBÔS DISPONÍVEIS */}
<section ref={robotsRef} className="py-20 bg-gradient-to-b from-blue-950 to-blue-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-white mb-4">
        Selecione um Pack para ver os robôs disponíveis
      </h2>
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {[
          { id: 'all', label: 'Todos os Packs' },
          { id: 'starter', label: 'Pack Scalper' },
          { id: 'hunter', label: 'Pack Hunter' },
          { id: 'global', label: 'Pack Global' },
          { id: 'optional', label: 'Opcionais' },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setSelectedPack(id)}
            className={`px-4 py-2 rounded-lg ${
              selectedPack === id
                ? 'bg-blue-600 text-white'
                : 'bg-blue-800/50 text-blue-200 hover:bg-blue-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>

    <div className="bg-black rounded-xl p-6 mb-8 border border-blue-700/40">
      <h3 className="text-xl font-bold text-white mb-4">Informações das Estratégias</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            color: 'bg-blue-500',
            title: 'Pack Hunter',
            desc: 'Todos Multi-Ativo. Personalização avançada para traders experientes. Estratégias de alta precisão.',
          },
          {
            color: 'bg-green-500',
            title: 'Pack Global',
            desc: 'Todos Multi-Ativo. Diversificação em múltiplos mercados internacionais. Ideal para quem busca exposição global.',
          },
          {
            color: 'bg-amber-500',
            title: 'Pack Scalper',
            desc: 'Principalmente WIN. Alta taxa de acerto (85-90%). Setup mais fácil, ideal para iniciantes.',
          },
          {
            color: 'bg-purple-500',
            title: 'HFT Institucional',
            desc: 'Operações automatizadas via BTG Pactual. Disponível em 3 modalidades: BITFUT, WIN e Dólar.',
          },
        ].map(({ color, title, desc }, i) => (
          <div key={i} className="bg-black rounded-lg p-4 border border-blue-700/20">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${color}`}></div>
              <h4 className="font-semibold text-white">{title}</h4>
            </div>
            <p className="text-blue-200 text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </div>

    <h3 className="text-2xl font-bold text-white mb-6">
      Robôs Disponíveis no {selectedPack === 'all' ? 'Todos os Packs' : 
                           selectedPack === 'starter' ? 'Pack Starter' : 
                           selectedPack === 'hunter' ? 'Pack Hunter' : 
                           selectedPack === 'global' ? 'Pack Global' : 'Pack Opcionais'}
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {displayRobots.map((robot, index) => (
        <div key={index} className="bg-black rounded-xl p-4 border border-blue-700/30">
          <RobotCard robot={robot} />
        </div>
      ))}
    </div>

    {filteredRobots.length > 6 && (
      <div className="text-center">
        <Button
          onClick={() => setShowAllRobots(!showAllRobots)}
          variant="outline"
          className="border-blue-500 text-blue-300 hover:bg-blue-800/50"
        >
          {showAllRobots ? (
            <>
              <ChevronUp className="mr-2 h-5 w-5" />
              Mostrar Menos
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-5 w-5" />
              Ver Todos os {filteredRobots.length} Robôs
            </>
          )}
        </Button>
      </div>
    )}
  </div>
</section>


      {/* SECTION 8: INFORMAÇÕES DETALHADAS */}
      <section className="py-20 bg-black-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Como Montar sua Carteira de Robôs
              </h2>
              <div className="space-y-6 text-blue-200">
                <p>
                  Montar uma carteira diversificada de robôs é essencial para maximizar seus resultados e minimizar riscos. Recomendamos:
                </p>
                
                <div className="bg-blue-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">1. Diversifique por Estratégia</h3>
                  <p>
                    Combine robôs de tendência, reversão e scalping para capturar diferentes movimentos do mercado.
                  </p>
                </div>
                
                <div className="bg-blue-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">2. Opere 2-3 Robôs por Dia</h3>
                  <p>
                    Ative 2-3 robôs complementares por dia de trading para otimizar resultados sem sobrecarregar sua gestão.
                  </p>
                </div>
                
                <div className="bg-blue-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">3. Teste em Conta Demo</h3>
                  <p>
                    Antes de operar com capital real, teste as configurações em conta simulador para ajustar parâmetros.
                  </p>
                </div>
                
                <div className="bg-blue-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">4. Escalone seu Capital</h3>
                  <p>
                    Comece com 1 contrato por robô e aumente gradualmente conforme sua confiança e resultados.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Potencial de Retorno e Economia
              </h2>
              
              <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-6 border border-blue-700/30 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Economia com o Clube</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-800/50 rounded-lg p-4">
                    <div className="text-sm text-blue-300">Preço Avulso (14 robôs)</div>
                    <div className="text-2xl font-bold text-white">R$ 21.000</div>
                    <div className="text-sm text-blue-200">Semestral</div>
                  </div>
                  <div className="bg-blue-800/50 rounded-lg p-4">
                    <div className="text-sm text-blue-300">Preço no Clube</div>
                    <div className="text-2xl font-bold text-white">R$ 3.000</div>
                    <div className="text-sm text-blue-200">Semestral</div>
                  </div>
                </div>
                <div className="bg-blue-700/30 rounded-lg p-4">
                  <div className="text-sm text-blue-300">Sua Economia</div>
                  <div className="text-3xl font-bold text-green-400">R$ 18.000</div>
                  <div className="text-sm text-blue-200">Economia de 85% no semestre</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-6 border border-blue-700/30">
                <h3 className="text-xl font-bold text-white mb-4">Potencial de Retorno</h3>
                <p className="text-blue-200 mb-4">
                  Com uma carteira bem gerenciada de 2-3 robôs ativos por dia, o potencial de retorno mensal é:
                </p>
                <div className="space-y-4">
                  <div className="bg-blue-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-blue-300">Capital Inicial</div>
                        <div className="text-lg font-bold text-white">R$ 10.000</div>
                      </div>
                      <div>
                        <div className="text-sm text-blue-300">Retorno Potencial</div>
                        <div className="text-lg font-bold text-green-400">R$ 2.000-3.000/mês</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-blue-300">Capital Inicial</div>
                        <div className="text-lg font-bold text-white">R$ 30.000</div>
                      </div>
                      <div>
                        <div className="text-sm text-blue-300">Retorno Potencial</div>
                        <div className="text-lg font-bold text-green-400">R$ 6.000-9.000/mês</div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-blue-300 mt-4">
                  *Resultados passados não garantem retornos futuros. Os valores são estimativas baseadas em backtests e performance histórica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: COMPARATIVO COM COPY INVEST E MESA PROPRIETÁRIA */}
      <section className="py-20 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Comparativo de Soluções
            </h2>
            <p className="text-xl text-blue-300 max-w-3xl mx-auto">
              Compare nossas diferentes soluções e escolha a que melhor atende às suas necessidades
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left text-blue-300 border-b border-blue-800"></th>
                  <th className="p-4 text-center text-white border-b border-blue-800 bg-blue-900/50">Clube de Robôs</th>
                  <th className="p-4 text-center text-white border-b border-blue-800 bg-blue-900/50">Portfólio de IA</th>
                  <th className="p-4 text-center text-white border-b border-blue-800 bg-blue-900/50">Mesa Proprietária</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 text-left text-blue-300 border-b border-blue-800">Plataforma</td>
                  <td className="p-4 text-center text-white border-b border-blue-800">Profit Pro / BlackArrow</td>
                  <td className="p-4 text-center text-white border-b border-blue-800">MetaTrader 5 / Profit</td>
                  <td className="p-4 text-center text-white border-b border-blue-800">Profit One / Profit Pro</td>
                </tr>
                <tr>
                  <td className="p-4 text-left text-blue-300 border-b border-blue-800">Suporte</td>
                  <td className="p-4 text-center text-white border-b border-blue-800">Básico a VIP</td>
                  <td className="p-4 text-center text-white border-b border-blue-800">VIP 24/7</td>
                  <td className="p-4 text-center text-white border-b border-blue-800">Dedicado</td>
                </tr>
                <tr>
                  <td className="p-4 text-left text-blue-300 border-b border-blue-800">Backtest incluído</td>
                  <td className="p-4 text-center text-white border-b border-blue-800">Sim</td>
                  <td className="p-4 text-center text-white border-b border-blue-800">Não necessário</td>
                  <td className="p-4 text-center text-white border-b border-blue-800">Sim</td>
                </tr>
                <tr>
                  <td className="p-4 text-left text-blue-300 border-b border-blue-800">Custo mensal</td>
                  <td className="p-4 text-center text-white border-b border-blue-800">R$ 0,00-700,00</td>
                  <td className="p-4 text-center text-white border-b border-blue-800">R$ 300,00-1000,00</td>
                  <td className="p-4 text-center text-white border-b border-blue-800">R$ 397-3.897</td>
                </tr>
                <tr>
                  <td className="p-4 text-left text-blue-300 border-b border-blue-800">Controle / Automação</td>
                  <td className="p-4 text-center text-white border-b border-blue-800">Controle total</td>
                  <td className="p-4 text-center text-white border-b border-blue-800">100% automático</td>
                  <td className="p-4 text-center text-white border-b border-blue-800">Híbrido</td>
                </tr>
                <tr>
                  <td className="p-4 text-left text-blue-300 border-b border-blue-800">Ideal para quem?</td>
                  <td className="p-4 text-center text-white border-b border-blue-800">Traders que querem controle</td>
                  <td className="p-4 text-center text-white border-b border-blue-800">Investidores sem tempo</td>
                  <td className="p-4 text-center text-white border-b border-blue-800">Traders que buscam alavancagem</td>
                </tr>
                <tr>
                  <td className="p-4 text-left text-blue-300"></td>
                  <td className="p-4 text-center">
                    <Button
                      onClick={scrollToPacks}
                      className="bg-white text-blue-800 hover:bg-blue-50"
                    >
                      Ver Packs
                    </Button>
                  </td>
                  <td className="p-4 text-center">
                    <Button
                      as={Link}
                      to="/copy-trade"
                      className="bg-white text-blue-800 hover:bg-blue-50"
                    >
                      Ver Portfólios de IA
                    </Button>
                  </td>
                  <td className="p-4 text-center">
                    <Button
                      as={Link}
                      to="/mesa-proprietaria"
                      className="bg-white text-blue-800 hover:bg-blue-50"
                    >
                      Ver Mesas
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 10: PERGUNTAS FREQUENTES */}
      <section ref={faqRef} className="py-20 bg-gradient-to-b from-blue-900 to-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-blue-300 max-w-3xl mx-auto">
              Encontre respostas para as dúvidas mais comuns sobre nossos robôs e serviços
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className="bg-blue-800/30 rounded-xl overflow-hidden border border-blue-700/30"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                >
                  <span className="text-lg font-medium text-white">{faq.question}</span>
                  {activeAccordion === index ? (
                    <ChevronUp className="h-5 w-5 text-blue-300" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-blue-300" />
                  )}
                </button>
                
                {activeAccordion === index && (
                  <div className="px-6 pb-4">
                    <p className="text-blue-200">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: BLOCO FINAL - CHAMADA PARA AÇÃO */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Chega de hesitação. Assuma o controle da sua jornada como trader com o Clube de Robôs mais completo do Brasil.
          </h2>
          <p className="text-xl text-blue-300 max-w-3xl mx-auto mb-8">
            Junte-se a milhares de traders que já transformaram seus resultados com nossas estratégias automatizadas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToPacks}
              className="bg-blue-500 hover:bg-blue-600 text-white group"
              size="lg"
            >
              Entrar no Clube Agora
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              as="a"
              href={whatsappLinks.support}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="border-blue-400 text-blue-300 hover:bg-blue-800/50"
              size="lg"
            >
              Falar com Especialista
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}