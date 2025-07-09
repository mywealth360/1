import { useState, useEffect } from 'react';
import { Button } from './Button';
import { ArrowRight, Check, Clock, Users, Zap, BarChart as ChartBar, TrendingUp, Target, Brain, Shield, Calendar, ArrowUpRight, ArrowDownRight, Copy, ChevronDown, ChevronUp, HelpCircle, MessageSquare } from 'lucide-react';
import { resourceLinks, stripeLinks, whatsappLinks } from '../lib/robotLinks';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

const StepCard = ({ number, title, description }: StepCardProps) => (
  <div className="bg-white dark:bg-blue-900/50 rounded-xl p-6 shadow-md border border-gray-100 dark:border-blue-800/50">
    <div className="h-12 w-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-blue-600 dark:text-blue-200">
      {number}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: 'up' | 'down';
  prefix?: string;
  suffix?: string;
}

const StatCard = ({ title, value, description, trend, prefix = '', suffix = '' }: StatCardProps) => (
  <div className="bg-white dark:bg-blue-900/50 rounded-xl p-6 border border-gray-100 dark:border-blue-800/50">
    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{title}</h3>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {prefix}{value}{suffix}
      </span>
      {trend && (
        <span className={`flex items-center text-sm ${
          trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
          {trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
        </span>
      )}
    </div>
    {description && (
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{description}</p>
    )}
  </div>
);

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem = ({ question, answer, isOpen, toggleOpen }: FAQItemProps) => (
  <div className="border-b border-gray-200 dark:border-blue-800/50 last:border-0">
    <button 
      className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
      onClick={toggleOpen}
    >
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{question}</h3>
      {isOpen ? 
        <ChevronUp className="h-5 w-5 text-blue-600 dark:text-blue-400" /> : 
        <ChevronDown className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      }
    </button>
    {isOpen && (
      <div className="pb-4">
        <p className="text-gray-600 dark:text-gray-300">{answer}</p>
      </div>
    )}
  </div>
);

export function CopyInvest() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [planType, setPlanType] = useState<'monthly' | 'semiannual'>('monthly');
  const [showDetailedResults, setShowDetailedResults] = useState(false);
  const [openFAQItem, setOpenFAQItem] = useState<number | null>(null);

  const handleAuthClick = () => {
    navigate('/login');
  };

  const toggleFAQItem = (index: number) => {
    setOpenFAQItem(openFAQItem === index ? null : index);
  };

  const faqItems = [
    {
      question: "O que é um Portfólio de IA?",
      answer: "Um Portfólio de IA é um serviço de replicação automática de operações que permite que você copie as estratégias de traders profissionais sem precisar operar manualmente. Nossos algoritmos executam operações 24/7 com base em estratégias testadas e validadas."
    },
    {
      question: "Qual é o investimento mínimo recomendado?",
      answer: "Recomendamos um capital mínimo de R$ 10.000 para obter resultados consistentes, embora seja possível começar com menos. O importante é ter um capital que permita a diversificação adequada entre as estratégias."
    },
    {
      question: "Como funciona a integração com a corretora?",
      answer: "Para o Copy BTG, você precisa ter uma conta na BTG Pactual e contratar o MetaTrader 5 no modo NETTING. Após isso, compartilhamos os dados de acesso com nossa equipe que configura tudo para você. Para o Copy Nelogica, o processo é similar, mas utilizando a plataforma Profit."
    },
    {
      question: "Posso usar em conta simulador?",
      answer: "Sim! O Copy Nelogica permite operações em conta simulador, ideal para quem quer testar o serviço antes de investir capital real. Já o Copy BTG é focado em operações com capital real."
    },
    {
      question: "Quais são os riscos envolvidos?",
      answer: "Como em qualquer investimento no mercado financeiro, existe o risco de perda parcial ou total do capital investido. Nosso sistema tem controles rigorosos de risco, com drawdown máximo histórico de 22%, mas resultados passados não garantem retornos futuros."
    },
    {
      question: "Como faço para começar?",
      answer: "Escolha um dos nossos planos, faça o pagamento e nossa equipe entrará em contato para guiá-lo no processo de configuração. Todo o suporte necessário será fornecido para que você comece a operar o mais rápido possível."
    }
  ];

  return (
    <div className="relative">
    {/* Hero Section with Black Background */}
<div className="relative bg-black py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <div className="inline-flex items-center justify-center gap-2 mb-4 bg-blue-800/50 px-4 py-1.5 rounded-full shadow-lg">
          <Copy className="h-5 w-5 text-white" />
          <span className="text-sm font-bold text-white">Portfólio de IA</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          HFT Institucional Operado por IA
        </h1>
        <p className="text-2xl text-blue-100 mb-4">
          Renda Mensal Automática com Algoritmos Avançados a Nível Institucional
        </p>
        <div className="max-w-2xl">
          <p className="text-lg text-blue-200 mb-2">

          </p>
          <p className="text-lg text-blue-200 mb-4">
            Tecnologia de fundos de investimentos operando na sua conta
          </p>
        </div>
        <p className="text-sm text-blue-300 mb-6">
          Analista Responsável: Yallon Mazuti de Carvalho - CNPI-T 8964
          <br />
          Resultados passados não garantem lucros futuros
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button
            as="a"
            href={resourceLinks.copyInvestWaitlist}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0 shadow-lg"
          >
            Fila de Espera
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            as="a"
            href="#performance-results"
            variant="outline"
            size="lg"
            className="group border-blue-500 text-blue-100 dark:border-blue-400 hover:bg-blue-800/30"
          >
            Ver Resultados
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" /> 
          </Button>
        </div>
      </div>
      <div className="hidden lg:block">
        <img 
          src="https://i.postimg.cc/wB3yYV05/CAIXAS-PACKS1.png" 
          alt="Copy Trade Dashboard" 
          className="rounded-xl shadow-2xl border border-blue-800/50"
        />
      </div>
    </div>
  </div>
</div>


      {/* Performance Metrics */}
      <div id="performance-results" className="py-16 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-6 text-center">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Taxa de Acerto</h3>
              <p className="text-4xl font-bold text-white">59.8%</p>
              <p className="mt-2 text-sm text-blue-300">Média de operações vencedoras</p>
            </div>
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-6 text-center">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Payoff</h3>
              <p className="text-4xl font-bold text-white">1.63</p>
              <p className="mt-2 text-sm text-blue-300">Relação risco/retorno</p>
            </div>
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-6 text-center">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Média Mensal</h3>
              <p className="text-4xl font-bold text-green-400">+42.61%</p>
              <p className="mt-2 text-sm text-blue-300">Rentabilidade média mensal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Strategy Section */}
      <div className="py-16 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Estratégia Operacional</h2>
              <p className="text-xl text-blue-100 mb-6">Abordagem Técnica e Disciplinada</p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100">Estratégias de tendência com payoff elevado</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100">Entradas otimizadas em pontos de baixo risco</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100">Saídas dinâmicas para maximização de lucro</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100">Controle rigoroso de risco e drawdown</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Ativos Operados</h2>
              <p className="text-xl text-blue-100 mb-6">Alta Liquidez e Eficiência de Execução</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-800/50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Futuros</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-blue-100">
                      <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                      Mini Índice (WIN)
                    </li>
                    <li className="flex items-center gap-2 text-blue-100">
                      <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                      Mini Dólar (WDO)
                    </li>
                                <li className="flex items-center gap-2 text-blue-100">
                      <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                      Bitcoin Futuro (BIT)
                    </li>
                  </ul>
                </div>
   
              </div>
              <p className="mt-6 text-blue-200">
                Execução precisa e spread reduzido garantido pela liquidez dos ativos selecionados.
              </p>
            </div>
          </div>
        </div>
      </div>

{/* Plans Section */}
<div className="py-16 bg-gradient-to-b from-blue-900 to-blue-950">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-white mb-4">Escolha sua carteira de IA ideal</h2>
      <div className="inline-flex bg-blue-800/50 p-1 rounded-lg mb-8">
        <button 
          className={`px-4 py-2 rounded-md ${planType === 'monthly' ? 'bg-blue-700 text-white' : 'text-blue-200 hover:bg-blue-800'}`}
          onClick={() => setPlanType('monthly')}
        >
          Plano Mensal
        </button>
        <button 
          className={`px-4 py-2 rounded-md ${planType === 'semiannual' ? 'bg-blue-700 text-white' : 'text-blue-200 hover:bg-blue-800'}`}
          onClick={() => setPlanType('semiannual')}
        >
          Plano Semestral
        </button>
      </div>
    </div>

    <div className="flex flex-wrap justify-center gap-8">
      
{/* Copy Trade Bitcoin Futuro */}
<div className="w-full md:w-[400px] bg-black rounded-xl p-8 pb-16 relative">
  <div className="absolute -top-3 left-4">
    <span className="bg-blue-700 text-white px-2 py-1 rounded-full text-xs font-medium">
      Até 2x Alavancagem
    </span>
  </div>
  <div className="absolute bottom-3 right-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
    IA no Controle de Risco
  </div>
  
  <h3 className="text-2xl font-bold text-white mb-3">
    HFT Institucional Bitcoin
  </h3>

  <p className="text-blue-200 mb-6">
    (Operações com Bitcoin Futuro na B3 via BTG Pactual — vagas limitadas)
  </p>

  <div className="mb-6">
    <div className="text-blue-300">A partir de</div>
    <div className="text-3xl font-bold text-white">
      R$ 300,00
    </div> 
    <div className="text-sm text-blue-300">
      Plano mensal | Capital mínimo: R$ 3.000
    </div>
    <div className="text-sm text-blue-300 mt-1">
      Risco diário: R$ 100 a R$ 200
    </div>
  </div>

  <ul className="space-y-3 mb-8">
    <li className="flex items-start">
      <Check className="h-5 w-5 text-blue-300 mr-2" />
      Copy premium com execução sem spread
    </li>
    <li className="flex items-start">
      <Check className="h-5 w-5 text-blue-300 mr-2" />
      Setup de tendência com inteligência artificial
    </li>
    <li className="flex items-start">
      <Check className="h-5 w-5 text-blue-300 mr-2" />
        Operações via MetaTrader 5
    </li>
    <li className="flex items-start">
      <Check className="h-5 w-5 text-blue-300 mr-2" />
      Compatível com contas BTG Pactual
    </li>
    <li className="flex items-start">
      <Check className="h-5 w-5 text-blue-300 mr-2" />
      Sem necessidade de configurar parâmetros
    </li>
  </ul>

  <Button
    as="a"
    href="http://profitestrategista.rds.land/fila-de-espera-bitcoin"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full bg-white text-blue-800 hover:bg-blue-50"
  >
    Entrar na Fila de Espera
  </Button>

  <div className="flex items-center justify-center gap-2 mt-4">
    <Users className="h-4 w-4 text-blue-300" />
    <span className="text-sm text-blue-300">
      Em breve disponível no plano semestral com parcelamento via Pix ou cartão
    </span>
  </div>
</div>


      {/* Copy Mini Índice */}
      <div className="w-full md:w-[400px] bg-black rounded-xl p-8 pb-16 relative">
        <div className="absolute -top-3 left-4">
          <span className="bg-blue-700 text-white px-2 py-1 rounded-full text-xs font-medium">Alavancagem até 1x</span>
        </div>
        <div className="absolute bottom-3 right-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">IA no Controle de Risco</div>
        <h3 className="text-2xl font-bold text-white mb-3">   HFT Institucional Mini Índice</h3>
        <p className="text-blue-200 mb-6">(Ideal para operar com risco controlado e consistência)</p>
        <div className="mb-6">
          <div className="text-blue-300">A partir de</div>
          <div className="text-3xl font-bold text-white">
            {planType === 'monthly' ? 'R$ 400,00' : 'R$ 2.100,00'}
            
            <div className="text-sm text-blue-300">
      Plano mensal | Capital mínimo: R$ 5.000
    </div>
    <div className="text-sm text-blue-300 mt-1">
      Risco diário: R$ 400 a R$ 600
    </div>
  </div>
        </div>
        <ul className="space-y-3 mb-8 text-blue-100 text-sm">
          <li>Copy premium com baixo spread</li>
          <li>Capital mínimo: R$ 5.000</li>
          <li>Risco diário: R$ 400–600</li>
          <li>Robô inteligente com saídas e stops dinâmicos</li>
          <li>Operações via MetaTrader 5</li>
        </ul>
        <Button
          as="a"
          href={planType === 'monthly' ? 'https://buy.stripe.com/cN217HePO833c6IcNo' : 'https://sacola.pagbank.com.br/1914a221-0a3a-4f86-8a31-817691ca1a2b'}
          target="_blank"
          className="w-full bg-white text-blue-800 hover:bg-blue-50"
        >
          Copy Mini Índice
        </Button>
          <div className="flex items-center justify-center gap-2 mt-4">
    <Users className="h-4 w-4 text-blue-300" />
    <span className="text-sm text-blue-300">Plano semestral no Pix ou em até 12x</span>
  </div>
      </div>

      {/* Copy Mini Dólar */}
      <div className="w-full md:w-[400px] bg-black rounded-xl p-8 pb-16 relative">
        <div className="absolute -top-3 left-4">
          <span className="bg-blue-700 text-white px-2 py-1 rounded-full text-xs font-medium">Alavancagem até 1x</span>
        </div>  
        <div className="absolute bottom-3 right-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">IA no Controle de Risco</div>
        <h3 className="text-2xl font-bold text-white mb-3"> HFT Institucional Mini Dólar</h3>
        <p className="text-blue-200 mb-6">(Projetado para aproveitar movimentos explosivos do dólar)</p>
        <div className="mb-6">
          <div className="text-blue-300">A partir de</div>
          <div className="text-3xl font-bold text-white">
            {planType === 'monthly' ? 'R$ 550,00' : 'R$ 3.000,00'}
              <div className="text-sm text-blue-300">
      Plano mensal | Capital mínimo: R$ 10.000
    </div>
    <div className="text-sm text-blue-300 mt-1">
      Risco diário: R$ 600
    </div>
  </div>
        </div>
        <ul className="space-y-3 mb-8 text-blue-100 text-sm">
          <li>Copy premium com baixo spread</li>
          <li>Capital mínimo: R$ 10.000</li>
          <li>Risco diário: R$ 600</li>
           <li>Robô inteligente com saídas e stops dinâmicos</li>
          <li>Operações via MetaTrader 5</li>
        </ul>
        <Button
          as="a"
          href={planType === 'monthly'
            ? 'https://buy.stripe.com/8wM03DgXW3MNc6I3cf'
            : 'https://sacola.pagbank.com.br/2ed9111d-5797-4987-a0f1-99f34674b9be'}
          target="_blank"
          className="w-full bg-white text-blue-800 hover:bg-blue-50"
        >
          Copy Mini Dólar
        </Button> 
          <div className="flex items-center justify-center gap-2 mt-4">
    <Users className="h-4 w-4 text-blue-300" />
    <span className="text-sm text-blue-300">Plano semestral no Pix ou em até 12x</span>
  </div>
      </div>

      {/* Copy Multimercado Nelogica */}
      <div className="w-full md:w-[400px] bg-black rounded-xl p-8 pb-16 relative">
        <div className="absolute -top-3 left-4">
          <span className="bg-blue-700 text-white px-2 py-1 rounded-full text-xs font-medium">Alavancagem até 10x</span>
        </div>
        <div className="absolute bottom-3 right-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">Track Record Público</div>
        <h3 className="text-2xl font-bold text-white mb-3">Copy Invest Multi</h3>
        <p className="text-blue-200 mb-6">(Melhor interface do mercado com gestão participativa)</p>
        <div className="mb-6">
          <div className="text-blue-300">A partir de</div>
          <div className="text-3xl font-bold text-white">
            {planType === 'monthly' ? 'R$ 1.000,00' : 'R$ 6.000,00'}
  
            <div className="text-sm text-blue-300">
      Plano mensal | Capital mínimo: R$ 20.000
    </div>
    <div className="text-sm text-blue-300 mt-1">
      Risco diário: R$ 600 a R$ 1200
    </div>
  </div>
        </div>
        <ul className="space-y-3 mb-8 text-blue-100 text-sm">
             <li>Copy Trade com +30 robôs</li>
          <li>Conta simulador habilitada</li>
          <li>Compatível com Mesa Proprietária</li>
          <li>Controle total de parâmetros e risco</li>
          <li>Seleção de estratégias pelo usuário</li>
            <li>Operações via Profit</li>
          <li>Capital mínimo: R$ 20.000</li>
        </ul>
        <Button
          as="a"
          href={stripeLinks.copyNelogica}
          target="_blank"
          className="w-full bg-white text-blue-800 hover:bg-blue-50"
        >
          Ver na NeloStore
        </Button>
          <div className="flex items-center justify-center gap-2 mt-4">
    <Users className="h-4 w-4 text-blue-300" />
    <span className="text-sm text-blue-300">Plano semestral no Pix ou em até 12x</span>
  </div>
      </div>
    </div>
  </div>
</div>




      {/* What is Copy Trade Section */}
      <div className="py-16 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">O Que é um portfólio de IA?</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Automação Total e Rendimento Passivo para seu capital
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-800/50 rounded-xl p-8 text-center">
              <div className="h-16 w-16 bg-blue-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Copy className="h-8 w-8 text-blue-200" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Replicação Automática</h3>
              <p className="text-blue-200">
                Replica automaticamente as operações de traders profissionais sem precisar fazer nada manualmente.
              </p>
            </div>
            
            <div className="bg-blue-800/50 rounded-xl p-8 text-center">
              <div className="h-16 w-16 bg-blue-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-blue-200" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Algoritmos Avançados</h3>
              <p className="text-blue-200">
                Nossos algoritmos fazem todo o trabalho para você, operando 24/7 com estratégias testadas e otimizadas.
              </p>
            </div>
            
            <div className="bg-blue-800/50 rounded-xl p-8 text-center">
              <div className="h-16 w-16 bg-blue-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-blue-200" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Operação Contínua</h3>
              <p className="text-blue-200">
                O sistema opera continuamente, buscando oportunidades mesmo quando você não está acompanhando o mercado.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Profit Estrategista */}
      <div className="py-16 bg-gradient-to-b from-black-950 to-black-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Quem é o Profit Estrategista?</h2>
              <h3 className="text-xl font-semibold text-blue-200 mb-4">Nossa História</h3>
              <p className="text-blue-100 mb-6">
                O Profit Estrategista nasceu para democratizar o acesso a estratégias no mercado financeiro, tornando acessível a qualquer pessoa operar os setups clássicos do mercado de forma fácil, rápida e intuitiva.
              </p>
              <p className="text-blue-100 mb-8">
                Fundado por um desenvolvedor e sócio da C4 Tech com especialização em gestão de mesas proprietárias e capital institucional, combinamos paixão por algoritmos com expertise em trading quantitativo.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-800/50 rounded-xl p-6 text-center">
                  <h4 className="text-lg font-semibold text-white mb-2">Top 1 no Profit</h4>
                  <p className="text-blue-200">6 meses consecutivos</p>
                </div>
                <div className="bg-blue-800/50 rounded-xl p-6 text-center">
                  <h4 className="text-lg font-semibold text-green-400 mb-2">+20% a.m.</h4>
                  <p className="text-blue-200">Média consistente</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-blue-200 mb-4">Nossa Missão</h3>
              <p className="text-blue-100 mb-6">
                Criamos o Copy Invest para suprir a demanda de investidores que não sabem operar mas querem ter exposição a automações e estratégias inteligentes em seu portfólio.
              </p>
              <p className="text-blue-100 mb-8">
                Nossa missão é transformar a maneira como as pessoas investem, oferecendo uma alternativa moderna, eficiente e transparente aos investimentos tradicionais, com a mesma qualidade e rigor técnico que aplicamos na gestão de capital institucional.
              </p>
              
              <h3 className="text-xl font-semibold text-blue-200 mb-4">Nossos Diferenciais</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100">Gestão especializada de mesas proprietárias</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100">Algoritmos proprietários de alta precisão</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100">Equipe com experiência comprovada no mercado</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Comparison */}
      <div className="py-16 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Comparativo de Investimentos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-blue-900/50 rounded-xl p-8 border border-blue-800/50">
              <h3 className="text-xl font-semibold text-white mb-4">Investimento em Imóvel</h3>
              <div className="mb-6">
                <div className="text-sm text-blue-300">Investimento Inicial</div>
                <div className="text-2xl font-bold text-white">R$ 400.000</div>
              </div>
              <div className="mb-6">
                <div className="text-sm text-blue-300">Rendimento Mensal</div>
                <div className="text-2xl font-bold text-white">R$ 2.000</div>
                <div className="text-sm text-blue-300">(0,5% a.m.)</div>
              </div>
              <ul className="space-y-2 text-blue-200">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  Baixa liquidez
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  Custos de manutenção
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  Impostos (IPTU, IR)
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  Risco de vacância
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-900/50 rounded-xl p-8 border border-blue-800/50">
              <h3 className="text-xl font-semibold text-white mb-4">Renda Fixa (CDB/Tesouro)</h3>
              <div className="mb-6">
                <div className="text-sm text-blue-300">Investimento Inicial</div>
                <div className="text-2xl font-bold text-white">R$ 400.000</div>
              </div>
              <div className="mb-6">
                <div className="text-sm text-blue-300">Rendimento Mensal</div>
                <div className="text-2xl font-bold text-white">R$ 3.333</div>
                <div className="text-sm text-blue-300">(10% a.a.)</div>
              </div>
              <ul className="space-y-2 text-blue-200">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  Segurança (FGC/Governo)
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  Liquidez média/baixa
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  Rendimento limitado
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  Imposto de Renda
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-8 border border-blue-600/50 transform scale-105 shadow-xl relative">
              <div className="absolute -top-3 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                RECOMENDADO
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Portfólio de IA</h3>
              <div className="mb-6">
                <div className="text-sm text-blue-300">Investimento Inicial</div>
                <div className="text-2xl font-bold text-white">R$ 10.000</div>
              </div>
              <div className="mb-6">
                <div className="text-sm text-blue-300">Potencial Mensal</div>
                <div className="text-2xl font-bold text-green-400">R$ 2.000</div>
                <div className="text-sm text-blue-300">(20% a.m.)</div>
              </div>
              <ul className="space-y-2 text-blue-200">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  Alta liquidez
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  Risco limitado ao capital investido
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  Alto poder de escalabilidade
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  Gestão profissional
                </li>
              </ul>
            </div>
          </div>
          
          {/* Recommended Strategy */}
          <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-xl p-8 border border-blue-700/50">
            <h2 className="text-2xl font-bold text-white mb-6">Estratégia Recomendada: Portfólio de IA + Renda Fixa</h2>
            <p className="text-blue-100 mb-8">
              Combine o melhor dos dois mundos: a segurança da renda fixa com o alto potencial de retorno dos Portfólios de IA. Esta estratégia permite:
            </p>
             
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100">Diversificação inteligente do seu portfólio</span>
                  </li>
                  <li className="flex items-start"> 
                    <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100">Amortização dos custos fixos para rodar Portfólios de IA</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100">Redução do risco global da carteira</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100">Maximização do retorno sobre capital</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Exemplo de Alocação Recomendada</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-blue-800/50 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-2">Renda Fixa (70%)</h4>
                    <div className="text-xl font-bold text-white mb-1">R$ 70.000</div>
                    <div className="text-sm text-blue-300">Rendimento: ~R$ 583/mês (10% a.a.)</div>
                  </div>
                  <div className="bg-blue-800/50 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-2">Portfólio de IA (30%)</h4>
                    <div className="text-xl font-bold text-green-400 mb-1">R$ 30.000</div>
                    <div className="text-sm text-blue-300">Potencial: ~R$ 6.000/mês (20% a.m.)</div>
                  </div>
                </div>
                <div className="mt-4 bg-blue-700/50 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">Rendimento Total Potencial</h4>
                  <div className="text-2xl font-bold text-green-400 mb-1">R$ 6.583/mês</div>
                  <div className="text-sm text-blue-300">Sobre capital de R$ 100.000</div>
                </div>
              </div>
            </div>
            
            <div className="text-center"> 
              <Button
                as="a"
                href={stripeLinks.copyMulti}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="bg-white text-blue-800 hover:bg-blue-50"
              >
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-16 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Histórias de Sucesso</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-800/50 rounded-xl p-8 border border-blue-700/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-blue-700/50 flex items-center justify-center text-2xl font-bold text-white">
                  MS
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">M.S.</h3>
                  <p className="text-blue-300">Empresário, 42 anos</p>
                </div>
              </div>
              <p className="text-blue-100 text-lg italic">
                "Comecei com 1x e em 3 meses já estava gerando mais de R$ 2.000 mensais. Consegui deixar ansiedade de lado e hoje diversifico através de Portfólios de IA."
              </p>
            </div>
            
            <div className="bg-blue-800/50 rounded-xl p-8 border border-blue-700/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-blue-700/50 flex items-center justify-center text-2xl font-bold text-white">
                  AR
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">A.R.</h3>
                  <p className="text-blue-300">Médica, 38 anos</p>
                </div>
              </div>
              <p className="text-blue-100 text-lg italic">
                "A combinação de inteligencia artificial com meus investimentos em renda fixa triplicou meus rendimentos mensais."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Start Now */}
      <div className="py-16 bg-gradient-to-b from-blue-900 to-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Por Que Começar Agora</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Não perca a oportunidade de transformar sua forma de investir
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-800/50 rounded-xl p-6 text-center">
              <div className="h-16 w-16 bg-blue-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-200" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Vagas limitadas por estratégia</h3>
              <p className="text-blue-200">
                Cada estratégia tem um número limitado de vagas para garantir a eficiência das operações.
              </p>
            </div>
            
            <div className="bg-blue-800/50 rounded-xl p-6 text-center">
              <div className="h-16 w-16 bg-blue-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ArrowUpRight className="h-8 w-8 text-blue-200" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Acesso prioritário às novas carteiras</h3>
              <p className="text-blue-200">
                Clientes atuais têm prioridade no acesso a novas estratégias e carteiras.
              </p>
            </div>
            
            <div className="bg-blue-800/50 rounded-xl p-6 text-center">
              <div className="h-16 w-16 bg-blue-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 text-blue-200" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Suporte personalizado para onboarding</h3>
              <p className="text-blue-200">
                Receba suporte dedicado durante todo o processo de configuração inicial.
              </p>
            </div>
            
            <div className="bg-blue-800/50 rounded-xl p-6 text-center">
              <div className="h-16 w-16 bg-blue-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-blue-200" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Comece a lucrar ainda este mês</h3>
              <p className="text-blue-200">
                Configuração rápida permite que você comece a ver resultados em poucos dias.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Technology */}
      <div className="py-16 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Tecnologia de Nível Institucional</h2>
              <p className="text-blue-100 mb-8">
                O Copy Invest utiliza algoritmos matemáticos quantitativos avançados que operam com base em modelos estatísticos e análise de padrões de mercado, identificando oportunidades em tempo real.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100">Algoritmos de alta frequência com baixa latência e payoff elevado</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100">Operações na compra E na venda, lucrando em qualquer direção do mercado</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100">Gestão de risco automatizada com controle rigoroso de drawdown</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100">Backtests validados com mais de 10.000 operações históricas</span>
                </li>
              </ul>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-blue-900/50 rounded-xl p-6 border border-blue-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Lucro em Qualquer Cenário</h3>
                <p className="text-blue-200">
                  Nossos algoritmos identificam oportunidades tanto em mercados em alta quanto em queda, gerando resultados em qualquer cenário econômico.
                </p>
              </div>
              
              <div className="bg-blue-900/50 rounded-xl p-6 border border-blue-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Ativos Mais Líquidos</h3>
                <p className="text-blue-200">
                  Operamos exclusivamente nos ativos mais líquidos da B3, garantindo execução precisa e spreads reduzidos.
                </p>
              </div>
              
              <div className="bg-blue-900/50 rounded-xl p-6 border border-blue-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Estratégias Validadas</h3>
                <p className="text-blue-200">
                  Todas as estratégias passam por rigorosos testes de stress e validação com padrões institucionais antes de serem disponibilizadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Results */}
      <div className="py-16 bg-gradient-to-b from-blue-950 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">RESULTADOS OPERACIONAIS</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Performance Comprovada e Transparente
            </p>
            <p className="text-blue-300 mt-2">
              Conheça os números que fazem do Portfólio de IA uma solução de investimento superior
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-blue-800/50 rounded-xl p-6 text-center">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Taxa de Acerto</h3>
              <p className="text-4xl font-bold text-white">59%</p>
              <p className="mt-2 text-sm text-blue-300">Média de operações vencedoras</p>
            </div>
            
            <div className="bg-blue-800/50 rounded-xl p-6 text-center">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Payoff</h3>
              <p className="text-4xl font-bold text-white">1.63</p>
              <p className="mt-2 text-sm text-blue-300">Relação risco/retorno</p>
            </div>
            
            <div className="bg-blue-800/50 rounded-xl p-6 text-center">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Índice Emocional</h3>
              <p className="text-4xl font-bold text-white">97.38%</p>
              <p className="mt-2 text-sm text-blue-300">Controle emocional nas operações</p>
            </div>
            
            <div className="bg-blue-800/50 rounded-xl p-6 text-center">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Expectativa Matemática</h3>
              <p className="text-4xl font-bold text-white">2.01</p>
              <p className="mt-2 text-sm text-blue-300">Retorno esperado por operação</p>
            </div>
          </div>
          
          <div className="mb-8">
            <button 
              onClick={() => setShowDetailedResults(!showDetailedResults)}
              className="flex items-center justify-center gap-2 mx-auto bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              {showDetailedResults ? 'Ocultar Resultados Detalhados' : 'Ver Resultados Detalhados'}
              {showDetailedResults ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>
          
          {showDetailedResults && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 animate-fade-in">
              {/* Emotional Profile */}
              <div className="bg-blue-800/50 rounded-xl p-6 border border-blue-700/50">
                <div className="flex items-center gap-2 mb-6">
                  <Brain className="h-5 w-5 text-blue-300" />
                  <h2 className="text-xl font-semibold text-white">Perfil Emocional</h2>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-900/50 p-3 rounded-lg">
                      <div className="text-sm text-blue-300 mb-1">Disciplina Stop</div>
                      <div className="text-xl font-bold text-white">99,96%</div>
                    </div>
                    <div className="bg-blue-900/50 p-3 rounded-lg">
                      <div className="text-sm text-blue-300 mb-1">Disciplina Perda/Dia</div>
                      <div className="text-xl font-bold text-white">92,44%</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-900/50 p-3 rounded-lg">
                      <div className="text-sm text-blue-300 mb-1">Disciplina Alavancagem</div>
                      <div className="text-xl font-bold text-white">97,53%</div>
                    </div>
                    <div className="bg-blue-900/50 p-3 rounded-lg">
                      <div className="text-sm text-blue-300 mb-1">Probabilidade de Fúria</div>
                      <div className="text-xl font-bold text-green-400">0,34%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operational Profile */}
              <div className="bg-blue-800/50 rounded-xl p-6 border border-blue-700/50">
                <div className="flex items-center gap-2 mb-6">
                  <Target className="h-5 w-5 text-blue-300" />
                  <h2 className="text-xl font-semibold text-white">Perfil Operacional</h2>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-900/50 p-3 rounded-lg">
                      <div className="text-sm text-blue-300 mb-1">Média Operações/Dia</div>
                      <div className="text-xl font-bold text-white">7.91</div>
                    </div>
                    <div className="bg-blue-900/50 p-3 rounded-lg">
                      <div className="text-sm text-blue-300 mb-1">Ganho Médio</div>
                      <div className="text-xl font-bold text-green-400">R$ 340,10</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-900/50 p-3 rounded-lg">
                      <div className="text-sm text-blue-300 mb-1">Perda Média</div>
                      <div className="text-xl font-bold text-red-400">R$ 208,12</div>
                    </div>
                    <div className="bg-blue-900/50 p-3 rounded-lg">
                      <div className="text-sm text-blue-300 mb-1">Exposição Média</div>
                      <div className="text-xl font-bold text-white">02:59:32</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-900/50 p-3 rounded-lg">
                      <div className="text-sm text-blue-300 mb-1">Drawdown Máximo</div>
                      <div className="text-xl font-bold text-red-400">R$ 2.200,00 <span className="text-sm">(22%)</span></div>
                    </div>
                    <div className="bg-blue-900/50 p-3 rounded-lg">
                      <div className="text-sm text-blue-300 mb-1">Capital Recomendado</div>
                      <div className="text-xl font-bold text-white">R$ 10.000,00</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-900/50 p-3 rounded-lg">
                    <div className="text-sm text-blue-300 mb-1">Margem Day Trade Recomendada</div>
                    <div className="text-xl font-bold text-white">R$ 5.000,00</div>
                  </div>
                </div>
              </div>
              
              {/* Monthly Performance */}
              <div className="bg-blue-800/50 rounded-xl p-6 border border-blue-700/50 lg:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="h-6 w-6 text-blue-300" />
                  <h2 className="text-xl font-semibold text-white">Performance Mensal</h2>
                </div>

                {/* Accumulated Performance */}
                <div className="mb-8">
                  <div className="bg-blue-900/50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-2">Resultado Acumulado</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-blue-300">2024</div>
                        <div className="text-2xl font-bold text-green-400">+475.75%</div>
                      </div>
                      <div>
                        <div className="text-sm text-blue-300">2025 (até Abril)</div>
                        <div className="text-2xl font-bold text-green-400">+206.02%</div>
                      </div>
                      <div>
                        <div className="text-sm text-blue-300">Total Acumulado</div>
                        <div className="text-2xl font-bold text-green-400">+681.77%</div>
                      </div>
                      <div>
                        <div className="text-sm text-blue-300">Média Mensal</div>
                        <div className="text-2xl font-bold text-green-400">+42.61%</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2024 Performance */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-4">2024</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <StatCard title="Março" value="43.24" trend="up" suffix="%" />
                    <StatCard title="Abril" value="35.90" trend="up" suffix="%" />
                    <StatCard title="Maio" value="46.77" trend="up" suffix="%" />
                    <StatCard title="Junho" value="22.05" trend="up" suffix="%" />
                    <StatCard title="Julho" value="33.30" trend="up" suffix="%" />
                    <StatCard title="Agosto" value="72.28" trend="up" suffix="%" />
                    <StatCard title="Setembro" value="34.96" trend="up" suffix="%" />
                    <StatCard title="Outubro" value="-3.90" trend="down" suffix="%" />
                    <StatCard title="Novembro" value="104.83" trend="up" suffix="%" />
                    <StatCard title="Dezembro" value="86.22" trend="up" suffix="%" />
                  </div>
                </div>

                {/* 2025 Performance */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">2025</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <StatCard title="Janeiro" value="114.04" trend="up" suffix="%" />
                    <StatCard title="Fevereiro" value="55.34" trend="up" suffix="%" />
                    <StatCard title="Março" value="21.64" trend="up" suffix="%" />
                    <StatCard title="Abril" value="15.00" trend="up" suffix="%" />
                  </div>
                </div>
              </div>

              {/* Weekly Performance */}
              <div className="bg-blue-800/50 rounded-xl p-6 border border-blue-700/50 lg:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="h-6 w-6 text-blue-300" />
                  <h2 className="text-xl font-semibold text-white">Performance por Dia da Semana</h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-blue-300 mb-2">Segunda-Feira</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-green-400">+3.88%</span>
                        <span className="text-red-400">-1.69%</span>
                      </div>
                      <div className="text-sm text-blue-200">
                        Fator de Lucro: 3.73
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-300 mb-2">Terça-Feira</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-green-400">+3.99%</span>
                        <span className="text-red-400">-2.33%</span>
                      </div>
                      <div className="text-sm text-blue-200">
                        Fator de Lucro: 1.80
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-300 mb-2">Quarta-Feira</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-green-400">+6.96%</span>
                        <span className="text-red-400">-2.05%</span>
                      </div>
                      <div className="text-sm text-blue-200">
                        Fator de Lucro: 3.56
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-300 mb-2">Quinta-Feira</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-green-400">+4.07%</span>
                        <span className="text-red-400">-1.92%</span>
                      </div>
                      <div className="text-sm text-blue-200">
                        Fator de Lucro: 3.30
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-300 mb-2">Sexta-Feira</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-green-400">+6.96%</span>
                        <span className="text-red-400">-2.48%</span>
                      </div>
                      <div className="text-sm text-blue-200">
                        Fator de Lucro: 7.41
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Perguntas Frequentes</h2>
            <p className="text-xl text-blue-200">
              Tire suas dúvidas sobre Portfólios de IA
            </p>
          </div>
          
          <div className="bg-blue-800/50 rounded-xl p-6 border border-blue-700/50">
            {faqItems.map((item, index) => (
              <FAQItem 
                key={index}
                question={item.question} 
                answer={item.answer}
                isOpen={openFAQItem === index}
                toggleOpen={() => toggleFAQItem(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 bg-gradient-to-b from-blue-950 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para Transformar seus Investimentos?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Junte-se a centenas de investidores que já estão gerando renda passiva com Portfólios de IA.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              as="a"
              href={resourceLinks.copyInvestWaitlist}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0 shadow-lg"
            >
              Entrar na Fila de Espera
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              as="a"
              href={whatsappLinks.support}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
              className="border-blue-500 text-blue-100 hover:bg-blue-800/30"
            >
              Falar com Especialista
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}