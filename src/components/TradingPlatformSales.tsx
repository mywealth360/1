import { useState } from 'react';
import { Button } from './Button';
import { Shield, BarChart as ChartBar, Bot, Settings, MessageSquare, Clock, ArrowRight, Check, Brain, Target, Zap, TrendingUp, Users, Laptop, Send, ChevronDown, ChevronUp, ArrowUpRight, ArrowDownRight, Copy } from 'lucide-react';
import { whatsappLinks, stripeLinks } from '../lib/robotLinks';

interface DeskCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText?: string;
  buttonLink?: string;
  color?: string;
  estimatedEarnings?: string;
  level?: string;
}

const DeskCard = ({
  title,
  price,
  description,
  features,
  popular = false,
  buttonText = 'Saiba Mais',
  buttonLink = '#',
  color = 'blue',
  estimatedEarnings,
  level
}: DeskCardProps) => {
  const colorStyles = {
    blue: 'from-blue-700 to-blue-900',
    purple: 'from-blue-800 to-blue-950',
    green: 'from-blue-700 to-blue-950',
    amber: 'from-blue-700 to-blue-900',
    red: 'from-blue-800 to-blue-950',
    indigo: 'from-blue-700 to-blue-900'
  };

  return (
    <div className={`bg-gradient-to-br ${colorStyles[color as keyof typeof colorStyles]} rounded-xl p-8 shadow-lg border border-blue-700/30 relative`}>
      {popular && (
        <span className="absolute -top-3 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Popular
        </span>
      )}
      {level && (
        <span className="absolute -top-3 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {level}
        </span>
      )}
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white">R${price}</span>
          <span className="text-gray-200">{title.toLowerCase().includes('semestral') ? '/semestre' : '/sem'}</span>
        </div>
      </div>
      <p className="text-gray-200 mb-6">{description}</p>
      {estimatedEarnings && (
        <div className="mb-6 bg-blue-800/50 p-4 rounded-lg">
          <div className="text-sm text-blue-200 mb-1">Ganho Estimado Mensal (R$)</div>
          <div className="text-xl font-bold text-white">{estimatedEarnings}</div>
        </div>
      )}
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-200">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        as="a"
        href={buttonLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-white hover:bg-gray-100 text-gray-900"
      >
        {buttonText}
        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700">
      <button
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-100">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-300">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export function TradingPlatformSales() {
  const [activeTab, setActiveTab] = useState<'automation' | 'copy'>('automation');
  const [activeTestTab, setActiveTestTab] = useState<'euroinvest-simulator' | 'euroinvest-test' | 'zero7-futures' | 'zero7-stocks'>('euroinvest-simulator');

  const automationCombos = [
    {
         title: "Nível 1: Automação + Mesa Nível 1",
      price: "897,00",
      description: "Combinação ideal para iniciantes com mesa proprietária básica.",
      features: [
        "Pack Scalper Mensal",
        "Mesa Trainee Zero7",
        "Suporte técnico dedicado",
        "Até 5 contratos por operação"
      ],
      buttonText: "Contratar Combo",
      buttonLink: "https://pag.ae/7_Dzgy7sG",
      color: "blue",
      estimatedEarnings: "R$ 500 - R$ 1.000",
      level: "Nível 1 - Iniciante",
      popular: false
    },
    {
         title: "Nível 2: Automação + Mesa Nível 2",
      price: "1.097,00",
      description: "Aumente seu potencial com estratégias automatizadas e mesa intermediária.",
      features: [
        "Pack Scalper Mensal",
        "Mesa Júnior Zero7",
        "Suporte técnico prioritário",
        "Até 10 contratos por operação"
      ],
      buttonText: "Contratar Combo",
       buttonLink: "https://pag.ae/7_Dzgy7sG",
      color: "blue",
      estimatedEarnings: "R$ 1.000 - R$ 2.000",
      level: "Nível 2 - Intermediário",
      popular: true
    },
    {
        title: "Nível 3: Automação + Mesa Nível 3",
      price: "1.697,00",
      description: "Para traders experientes que buscam maior volume operacional com automação.",
      features: [
        "Pack Scalper Mensal",
        "Mesa Pleno Zero7",
        "Suporte VIP 24/7",
        "Até 25 contratos por operação"
      ],
      buttonText: "Contratar Combo",
        buttonLink: "https://pag.ae/7_Dzgy7sG",
      color: "blue",
      estimatedEarnings: "R$ 2.000 - R$ 4.000",
      level: "Nível 3 - Avançado",
      popular: false
    },
    {
         title: "Nível 4: Automação + Mesa Nível 4",
      price: "2.497,00",
      description: "Solução premium com máxima alavancagem e automação completa.",
      features: [
        "Pack Scalper Mensal",
        "Mesa Senior Zero7",
        "Suporte VIP 24/7",
        "Até 50 contratos por operação"
      ],
      buttonText: "Contratar Combo",
       buttonLink: "https://pag.ae/7_Dzgy7sG",
      color: "blue",
      estimatedEarnings: "R$ 4.000 - R$ 8.000",
      level: "Nível 4 - Expert",
      popular: false
    }
  ];

  const copyInvestCombos = [
    {
      title: "Nível 1: Copy + Mesa Nível 1",
      price: "1.397,00",
      description: "Copy trading profissional combinado com mesa proprietária básica.",
      features: [
        "Copy Invest Mensal",
        "Mesa Básica Zero7",
        "Operações automatizadas",
          "Até 5 Contratos"
      ],
      buttonText: "Contratar Combo",
      buttonLink: stripeLinks.copyNelogica,
      color: "purple",
      estimatedEarnings: "R$ 500 - R$ 1.000",
      level: "Nível 1 - Iniciante",
      popular: false
    },
    {
        title: "Nível 2: Copy + Mesa Nível 2",
      price: "1.597,00",
      description: "Maximize resultados com copy trading e mesa intermediária.",
      features: [
        "Copy Invest Mensal",
        "Mesa Intermediária Zero7",
        "Operações automatizadas",
         "Até 10 Contratos"
      ],
      buttonText: "Contratar Combo",
      buttonLink: stripeLinks.copyNelogica,
      color: "purple",
      estimatedEarnings: "R$ 1.000 - R$ 2.000",
      level: "Nível 2 - Intermediário",
      popular: true
    },
    {
      title: "Nível 3: Copy + Mesa Nível 3",
      price: "2.197,00",
      description: "Solução avançada para traders que buscam diversificação e volume.",
      features: [
        "Copy Invest Mensal",
        "Mesa Avançada Zero7",
        "Operações automatizadas",
        "Até 25 Contratos"
      ],
      buttonText: "Contratar Combo",
      buttonLink: stripeLinks.copyNelogica,
      color: "purple",
      estimatedEarnings: "R$ 2.000 - R$ 4.000",
      level: "Nível 3 - Avançado",
      popular: false
    }, 
    {
         title: "Nível 4: Copy + Mesa Nível 4",
      price: "2.997,00",
      description: "Experiência premium com máxima diversificação e capital.",
      features: [ 
        "Copy Invest Mensal",
        "Mesa Premium Zero7",
        "Operações automatizadas",
        "Até 50 Contratos"
      ],
      buttonText: "Contratar Combo",
      buttonLink: stripeLinks.copyNelogica,
      color: "purple",
      estimatedEarnings: "R$ 4.000 - R$ 8.000",
      level: "Nível 4 - Expert",
      popular: false
    }
  ];

  const testingOptions = [
    {
      title: "Simulador Remunerado Euroinvest",
      plans: [
        {
          name: "NEW EUROPASS 3",
          price: "490,50",
          originalPrice: "654,00",
          features: [
            "3 minicontratos",
            "Limite Loss total: R$ 1.300",
            "Gatilho CR Acumulado: R$ 650",
            "Limite Loss Diário: 35%",
            "Sem Drawdown",
            "Profit One incluído"
          ],
          installments: "10x de R$61,75",
          link: "https://g.euroinvest.com.br/campaign/pedropardal-oferta-euro",
          discount: "25% OFF"
        },
        {
          name: "NEW EUROPASS 8",
          price: "825,00",
          originalPrice: "1.100,00",
          features: [
            "8 minicontratos",
            "Limite Loss total: R$ 2.000",
            "Gatilho CR Acumulado: R$ 1.000",
            "Limite Loss Diário: 35%",
            "Sem Drawdown",
            "Profit One incluído"
          ],
          installments: "10x de R$103,87",
          link: "https://g.euroinvest.com.br/campaign/pedropardal-oferta-euro",
          discount: "25% OFF"
        },
        {
          name: "NEW EUROPASS 13",
          price: "1.650,00",
          originalPrice: "2.200,00",
          features: [
            "13 minicontratos",
            "Limite Loss total: R$ 4.000",
            "Gatilho CR Acumulado R$ 2.000",
            "Limite Loss Diário: 35%",
            "Sem Drawdown",
            "Profit One incluído"
          ],
          installments: "10x de R$207,73",
          link: "https://g.euroinvest.com.br/campaign/pedropardal-oferta-euro",
          discount: "25% OFF",
          popular: true
        },
        {
          name: "NEW EUROPASS 40",
          price: "5.625,00",
          originalPrice: "7.500,00",
          features: [
            "40 minicontratos",
            "Limite Loss total: R$ 10.000",
            "Gatilho CR Acumulado: R$ 5.000",
            "Limite Loss Diário: 35%",
            "Sem Drawdown",
            "Profit One incluído"
          ],
          installments: "10x de R$708,19",
          link: "https://g.euroinvest.com.br/campaign/pedropardal-oferta-euro",
          discount: "25% OFF"
        }
      ]
    },
    {
      title: "Teste Euroinvest",
      plans: [
        {
          name: "LITE",
          price: "349,00",
          features: [
            "5 minicontratos no máximo",
            "Loss total: R$ 1.400,00",
            "Meta para aprovação: R$ 1.200,00",
            "Até 45 dias corridos",
            "Repasse de 100% nos 3 primeiros meses"
          ],
          installments: "10x de R$43,94",
          link: "https://g.euroinvest.com.br/campaign/pedropardal-oferta-euro",
          description: "Ideal para iniciantes que desejam começar com baixo risco."
        },
        {
          name: "JUNIOR",
          price: "549,00",
          features: [
            "10 minicontratos no máximo",
            "Loss total: R$ 2.200,00",
            "Meta para aprovação: R$ 2.000,00",
            "Até 45 dias corridos",
            "Repasse de 100% nos 3 primeiros meses"
          ],
          installments: "10x de R$69,12",
          link: "https://g.euroinvest.com.br/campaign/pedropardal-oferta-euro",
          description: "Para traders com alguma experiência buscando maior volume."
        },
        {
          name: "SENIOR",
          price: "1.599,00",
          features: [
            "35 minicontratos no máximo",
            "Loss total: R$ 5.500,00",
            "Meta para aprovação: R$ 5.000,00",
            "Até 45 dias corridos",
            "Repasse de 100% nos 3 primeiros meses"
          ],
          installments: "10x de R$201,31",
          link: "https://g.euroinvest.com.br/campaign/pedropardal-oferta-euro",
          description: "Volume intermediário para traders consistentes."
        },
        {
          name: "MASTER",
          price: "2.898,00",
          features: [
            "50 minicontratos no máximo",
            "Loss total: R$ 8.000,00",
            "Meta para aprovação: R$ 7.500,00",
            "Até 45 dias corridos",
            "Repasse de 100% nos 3 primeiros meses"
          ],
          installments: "10x de R$364,86",
          link: "https://g.euroinvest.com.br/campaign/pedropardal-oferta-euro",
          description: "Para traders experientes com alta capacidade operacional.",
          popular: true
        }
      ]
    },
    {
      title: "Teste Zero7 Futuros",
      plans: [
        {
          name: "TRAINEE",
          price: "397,00",
          features: [
            "Limite por operação: 8 contratos",
            "Limite para WIN: 5 contratos",
            "Limite para WDO: 3 contratos",
            "Limite de perda diária: R$ 247,00",
            "Máximo de dias: 60"
          ],
          installments: "12x R$39,70",
          link: "https://app.4selet.com.br/checkout/120937f7-e96f-4823-adf0-d926b997af82",
          description: "Ideal para traders iniciantes que querem começar a operar com capital alavancado."
        },
        {
          name: "JÚNIOR",
          price: "597,00",
          features: [
            "Limite por operação: 16 contratos",
            "Limite para WIN: 10 contratos",
            "Limite para WDO: 6 contratos",
            "Limite de perda diária: R$ 497,00",
            "Máximo de dias: 60"
          ],
          installments: "12x R$59,70",
          link: "https://app.4selet.com.br/checkout/f19b481c-67d6-437a-805a-f84978e69e03",
          description: "Alavancagem profissional com gestão personalizada para traders intermediários."
        },
        {
          name: "PLENO",
          price: "1.197,00",
          features: [
            "Limite por operação: 40 contratos",
            "Limite para WIN: 25 contratos",
            "Limite para WDO: 15 contratos",
            "Limite de perda diária: R$ 1.247,00",
            "Máximo de dias: 60"
          ],
          installments: "12x R$119,70",
          link: "https://app.4selet.com.br/checkout/1fdd4081-8bb1-4988-b536-d17cae2cda9d",
          description: "Para traders que buscam maior volume e flexibilidade operacional.",
          popular: true
        },
        {
          name: "SÊNIOR",
          price: "1.997,00",
          features: [
            "Limite por operação: 80 contratos",
            "Limite para WIN: 50 contratos",
            "Limite para WDO: 30 contratos",
            "Limite de perda diária: R$ 2.497,00",
            "Máximo de dias: 60"
          ],
          installments: "12x R$249,70",
          link: "https://app.4selet.com.br/checkout/120937f7-e96f-4823-adf0-d926b997af82",
          description: "Solução avançada para traders experientes com maior capacidade operacional."
        }
      ]
    },
    {
      title: "Teste Zero7 Ações",
      plans: [
        {
          name: "150k",
          price: "597,00",
          features: [
            "Capital máximo: R$ 150.000,00",
            "Limite de perda diária: R$ 247,00",
            "Limite de perda máxima: R$ 997,00",
            "Meta de aprovação: R$ 997,00",
            "Máximo de dias: 60"
          ],
          installments: "12x R$59,70",
          link: "https://app.4selet.com.br/checkout/69eb4a87-7a8b-4a24-ba96-cd63960565c7",
          description: "Comece sua jornada no mercado de ações com capital inicial."
        },
        {
          name: "250k",
          price: "797,00",
          features: [
            "Capital máximo: R$ 250.000,00",
            "Limite de perda diária: R$ 497,00",
            "Limite de perda máxima: R$ 1.997,00",
            "Meta de aprovação: R$ 1.997,00",
            "Máximo de dias: 60"
          ],
          installments: "12x R$79,70",
          link: "https://app.4selet.com.br/checkout/ed28f760-ab97-43d0-85a4-a18ea27f33aa",
          description: "Expanda suas operações com maior capital sob gestão."
        },
        {
          name: "500k",
          price: "1.297,00",
          features: [
            "Capital máximo: R$ 500.000,00",
            "Limite de perda diária: R$ 997,00",
            "Limite de perda máxima: R$ 3.997,00",
            "Meta de aprovação: R$ 3.997,00",
            "Máximo de dias: 60"
          ],
          installments: "12x R$129,70",
          link: "https://app.4selet.com.br/checkout/413dab27-0c0d-40ed-896e-49b349b09c86",
          description: "Aumente seu potencial com maior capital sob gestão.",
          popular: true
        },
        {
          name: "1M",
          price: "2.497,00",
          features: [
            "Capital máximo: R$ 1.000.000,00",
            "Limite de perda diária: R$ 1.997,00",
            "Limite de perda máxima: R$ 7.997,00",
            "Meta de aprovação: R$ 7.997,00",
            "Máximo de dias: 60"
          ],
          installments: "12x R$249,70",
          link: "https://app.4selet.com.br/checkout/ac4f4dd9-4a22-4bc2-bbf8-e115bf7cfd61",
          description: "Nossa solução premium para traders profissionais."
        }
      ]
    }
  ];

  const strategyPacks = [
    {
      title: "Pack Scalper Semestral",
      price: "1.800",
      description: "Ideal para iniciantes e traders que buscam estratégias de Scalp com alta taxa de acerto para o mercado de mini índice.",
      features: [
        "6 Robôs Scalper",
        "Backtest e replay incluso",
        "VPS Trader com desconto",
        "Tendência, Reversão e Scalp",
        "Operações automatizadas",
        "Suporte básico"
      ],
      buttonText: "Contratar Pack",
      buttonLink: "https://pag.ae/7_Dzgy7sG",
      color: "blue"
    },
    {
      title: "Pack Pro Semestral",
      price: "3.000",
      description: "Solução completa com robôs premium, portfólio completo e suporte VIP para traders profissionais com implantação.",
      features: [
        "Todos os 14 robôs incluídos",
        "Backtest e replay incluso",
        "VPS Trader com desconto",
        "Tendência, Reversão e Scalp",
        "Operações automatizadas",
        "Suporte VIP"
      ],
      buttonText: "Contratar Pack",
      buttonLink: "https://pag.ae/7_DzC-GEm",
      color: "blue",
      popular: true
    },
    {
      title: "Copy Nelogica Semestral",
      price: "6.000",
      description: "Serviço de copy invest Nelogica com 30+ estratégias em WIN e WDO para traders ativos que gostam de gerir portfólios.",
      features: [
        "Copy Trade incluído",
        "Gestão participativa",
        "WIN e WDO",
        "Conta simulador habilitada",
         "Compatível com Mesa Proprietária",
        "Suporte Nelogica 24/7"
      ],
      buttonText: "Contratar Copy Invest",
      buttonLink: stripeLinks.copyNelogica,
      color: "purple"
    }
  ];

  const faqs = [
    {
      question: "O que é uma Mesa Proprietária?",
      answer: "Uma Mesa Proprietária é um modelo de negócio onde uma empresa fornece capital para que traders operem no mercado financeiro. O trader não utiliza seu próprio capital, mas sim o da empresa, e recebe um percentual dos lucros gerados. É uma forma de alavancagem profissional com gestão de risco controlada."
    },
    {
      question: "Quais são os requisitos para operar em uma Mesa Proprietária?",
      answer: "Os requisitos variam conforme o plano, mas geralmente incluem: aprovação em um processo seletivo ou teste, conhecimento básico do mercado financeiro, disciplina para seguir regras de gestão de risco, e capacidade de operar dentro dos parâmetros estabelecidos pela mesa."
    },
    {
      question: "Qual a diferença entre a Euroinvest e a Zero7?",
      answer: "A Euroinvest oferece um ambiente mais profissional para resultados rápidos com regulamento mais flexível, ideal para operações de futuros. Já a Zero7 tem maior foco em ações e copy invest, com um nível de dificuldade mais elevado em seus testes e regulamentos mais rigorosos."
    },
    {
      question: "Posso combinar estratégias automatizadas com Mesa Proprietária?",
      answer: "Sim, nossos combos foram desenvolvidos especificamente para isso. Você pode utilizar nossas estratégias automatizadas (Pack Scalper, Pack Pro) ou serviços de copy trading junto com o capital da mesa proprietária, maximizando seus resultados com risco controlado."
    },
    {
      question: "Como funciona o processo de aprovação?",
      answer: "O processo varia conforme a mesa, mas geralmente envolve atingir uma meta de lucro dentro de um período determinado (30-60 dias), respeitando os limites de perda diária e total. Após a aprovação, você passa a operar com capital real da mesa e recebe um percentual dos lucros gerados."
    },
    {
      question: "Quais plataformas são utilizadas?",
  answer: "Para futuros, utilizamos principalmente o Profit Pro e Profit One."
    },
    {
      question: "Qual o percentual de repasse dos lucros?",
      answer: "O percentual varia conforme o plano e a mesa, mas geralmente fica entre 70% e 100% para o trader. Nos planos iniciais, é comum ter 90-100% de repasse nos primeiros meses, reduzindo para 70-80% posteriormente."
    },
    {
      question: "Posso operar de qualquer lugar?",
      answer: "Sim, todas as nossas mesas proprietárias permitem operação remota. Você precisa apenas de um computador com conexão estável à internet. Recomendamos o uso de VPS para maior estabilidade, especialmente para estratégias automatizadas."
    },
    {
      question: "O que acontece se eu não atingir a meta de aprovação?",
      answer: "Se você não atingir a meta dentro do prazo estabelecido, mas ainda estiver dentro dos limites de perda, geralmente é possível estender o período de avaliação mediante uma taxa adicional. Caso ultrapasse os limites de perda, o teste é encerrado."
    },
    {
      question: "Quais mercados posso operar?",
      answer: "Dependendo da mesa escolhida, você pode operar futuros (WIN, WDO, DOL, IND), ações, ETFs, BDRs e outros ativos disponíveis na B3. Cada plano especifica os mercados permitidos e os limites operacionais."
    }
  ];

  const platformComparison = [
    {
      platform: "Euroinvest",
      difficulty: "Média",
      targetAudience: "Traders iniciantes a intermediários",
      regulations: "Flexíveis",
      minCapital: "R$ 490,50 (plano simulador)",
      automationSupport: "Sim",
      copyInvestSupport: "Não",
      orderReplicator: "Não",
      profitProCost: "R$ 199,90"
    },
    {
      platform: "Zero7 Futuros",
      difficulty: "Alta",
      targetAudience: "Traders intermediários a avançados",
      regulations: "Rigorosos",
      minCapital: "R$ 397,00 (plano trainee)",
      automationSupport: "Sim",
      copyInvestSupport: "Sim",
      orderReplicator: "Sim",
      profitProCost: "R$ 119,90"
    },
    {
      platform: "Zero7 Ações",
      difficulty: "Alta",
      targetAudience: "Traders focados em ações",
      regulations: "Rigorosos",
      minCapital: "R$ 597,00 (plano 150k)",
      automationSupport: "Não",
      copyInvestSupport: "Sim",
      orderReplicator: "Sim",
      profitProCost: "N/A"
    }
  ];

  const renderTestingOptions = () => {
    const selectedOption = testingOptions.find(option => {
      if (activeTestTab === 'euroinvest-simulator') return option.title === "Simulador Remunerado Euroinvest";
      if (activeTestTab === 'euroinvest-test') return option.title === "Teste Euroinvest";
      if (activeTestTab === 'zero7-futures') return option.title === "Teste Zero7 Futuros";
      if (activeTestTab === 'zero7-stocks') return option.title === "Teste Zero7 Ações";
      return false;
    });

    if (!selectedOption) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {selectedOption.plans.map((plan, index) => (
          <div key={index} className={`bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-6 text-white relative ${plan.popular ? 'ring-2 ring-blue-400' : ''}`}>
            {plan.popular && (
              <span className="absolute -top-3 right-4 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Mais Popular
              </span>
            )}
            {plan.discount && (
              <span className="absolute -top-3 left-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                {plan.discount}
              </span>
            )}
            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
            {plan.description && (
              <p className="text-sm text-blue-200 mb-4">{plan.description}</p>
            )}
            <div className="mb-6">
              {plan.originalPrice ? (
                <>
                  <div className="text-sm text-blue-200">De: R$ {plan.originalPrice}</div>
                  <div className="text-sm text-blue-200">Por:</div>
                </>
              ) : null}
              <div className="text-2xl font-bold text-white">R$ {plan.price}</div>
              <div className="text-sm text-blue-200">{plan.installments}</div>
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="text-sm text-blue-100 flex items-start">
                  <Check className="h-4 w-4 mr-2 mt-0.5 text-blue-300 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              as="a"
              href={plan.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white text-blue-800 hover:bg-blue-50"
            >
              CONTRATAR PLANO
            </Button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <div 
        className="relative min-h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://i.postimg.cc/QxCKK7N2/Imagem-do-Whats-App-de-2025-06-14-s-15-48-36-826db3e7.jpg")',
          backgroundPosition: 'center center'
        }}
        aria-label="Mesa Proprietária - Opere com capital de terceiros e risco controlado"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 to-blue-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col justify-center h-full">
          <div className="max-w-3xl">
                          <div className="inline-flex items-center justify-center gap-2 mb-4 bg-blue-800/50 px-4 py-1.5 rounded-full shadow-lg">
                <Copy className="h-5 w-5 text-white" />
                <span className="text-sm font-bold text-white">Combo Mesa + Estratégias</span>
              </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
           Combos de Mesas Proprietárias
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              Opere com capital de terceiros e risco controlado. Mesas proprietárias com alavancagem profissional, suporte completo e estratégias automatizadas para day trade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                as="a"
                href="#combos"
                className="bg-blue-500 hover:bg-blue-600 text-white group"
                size="lg"
              >
                COMEÇAR AGORA
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                as="a"
                href="#what-is"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* What is a Proprietary Desk Section */}
      <div id="what-is" className="py-20 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              O que é uma Mesa Proprietária?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Uma Mesa Proprietária é um modelo onde você opera com capital de terceiros, recebendo um percentual dos lucros sem arriscar seu próprio dinheiro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-blue-900/50 rounded-xl p-8 shadow-lg border border-blue-800/30">
              <div className="h-16 w-16 bg-blue-800/50 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Risco Controlado
              </h3>
              <p className="text-blue-100">
                Opere com limites de perda pré-definidos, protegendo seu capital e minimizando riscos.
              </p>
            </div>
            <div className="bg-blue-900/50 rounded-xl p-8 shadow-lg border border-blue-800/30">
              <div className="h-16 w-16 bg-blue-800/50 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Maior Alavancagem
              </h3>
              <p className="text-blue-100">
                Acesse um volume operacional muito maior do que seria possível com capital próprio, multiplicando seu potencial.
              </p>
            </div>
            <div className="bg-blue-900/50 rounded-xl p-8 shadow-lg border border-blue-800/30">
              <div className="h-16 w-16 bg-blue-800/50 rounded-full flex items-center justify-center mb-6">
                <Bot className="h-8 w-8 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Automação Integrada
              </h3>
              <p className="text-blue-100">
                Utilize nossos robôs e estratégias automatizadas para maximizar seus resultados e eliminar o fator emocional.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Resultados Estimados por Nível de Trader
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Automation Results */}
              <div className="bg-blue-900/30 rounded-xl p-6 border border-blue-800/30">
                <div className="flex items-center gap-3 mb-6">
                  <Bot className="h-6 w-6 text-blue-300" />
                  <h4 className="text-xl font-bold text-white">Resultados com Automação</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-800/30 rounded-lg p-4">
                    <h5 className="font-medium text-white mb-2">Nível 1 - Iniciante</h5>
                    <div className="text-2xl font-bold text-green-400">R$ 500 - 1.000</div>
                    <p className="text-sm text-blue-200 mt-1">Ganho mensal estimado</p>
                  </div>
                  
                  <div className="bg-blue-800/30 rounded-lg p-4">
                    <h5 className="font-medium text-white mb-2">Nível 2 - Intermediário</h5>
                    <div className="text-2xl font-bold text-green-400">R$ 1.000 - 2.000</div>
                    <p className="text-sm text-blue-200 mt-1">Ganho mensal estimado</p>
                  </div>
                  
                  <div className="bg-blue-800/30 rounded-lg p-4">
                    <h5 className="font-medium text-white mb-2">Nível 3 - Avançado</h5>
                    <div className="text-2xl font-bold text-green-400">R$ 2.000 - 4.000</div>
                    <p className="text-sm text-blue-200 mt-1">Ganho mensal estimado</p>
                  </div>
                  
                  <div className="bg-blue-800/30 rounded-lg p-4">
                    <h5 className="font-medium text-white mb-2">Nível 4 - Expert</h5>
                    <div className="text-2xl font-bold text-green-400">R$ 4.000 - 8.000</div>
                    <p className="text-sm text-blue-200 mt-1">Ganho mensal estimado</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button
                    as="a"
                    href="/clube-de-robos"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Ver Clube de Robôs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              {/* Copy Invest Results */}
              <div className="bg-blue-900/30 rounded-xl p-6 border border-blue-800/30">
                <div className="flex items-center gap-3 mb-6">
                  <Copy className="h-6 w-6 text-blue-300" />
                  <h4 className="text-xl font-bold text-white">Resultados com Copy Invest</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-800/30 rounded-lg p-4">
                    <h5 className="font-medium text-white mb-2">Nível 1 - Iniciante</h5>
                    <div className="text-2xl font-bold text-green-400">R$ 2.000 - 3.000</div>
                    <p className="text-sm text-blue-200 mt-1">Ganho mensal estimado</p>
                  </div>
                  
                  <div className="bg-blue-800/30 rounded-lg p-4">
                    <h5 className="font-medium text-white mb-2">Nível 2 - Intermediário</h5>
                    <div className="text-2xl font-bold text-green-400">R$ 3.000 - 5.000</div>
                    <p className="text-sm text-blue-200 mt-1">Ganho mensal estimado</p>
                  </div>
                  
                  <div className="bg-blue-800/30 rounded-lg p-4">
                    <h5 className="font-medium text-white mb-2">Nível 3 - Avançado</h5>
                    <div className="text-2xl font-bold text-green-400">R$ 5.000 - 8.000</div>
                    <p className="text-sm text-blue-200 mt-1">Ganho mensal estimado</p>
                  </div>
                  
                  <div className="bg-blue-800/30 rounded-lg p-4">
                    <h5 className="font-medium text-white mb-2">Nível 4 - Expert</h5>
                    <div className="text-2xl font-bold text-green-400">R$ 8.000 - 15.000</div>
                    <p className="text-sm text-blue-200 mt-1">Ganho mensal estimado</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button
                    as="a"
                    href="/copy-trade"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Ver Copy Trade
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Combo Packages Section */}
      <div id="combos" className="py-20 bg-black-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Combos de Mesa Proprietária 
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Faça renda mensal com capital de terceiros de forma fácil com automações e copy invest
            </p>
          </div>

          {/* Tabs */}  
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-md shadow-sm p-1 bg-blue-800/50">
              <button
                onClick={() => setActiveTab('automation')}
                className={`px-6 py-3 text-sm font-medium rounded-md ${
                  activeTab === 'automation'
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-100 hover:bg-blue-700/50'
                }`}
              >
                Automação + Mesa
              </button>
              <button
                onClick={() => setActiveTab('copy')}
                className={`px-6 py-3 text-sm font-medium rounded-md ${
                  activeTab === 'copy'
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-100 hover:bg-blue-700/50'
                }`}
              >
                Copy Invest + Mesa
              </button>
            </div>
          </div>

          {/* Special Offer Banner */}
          {activeTab === 'copy' && (
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-12 shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-white">50% OFF no primeiro mês</h3>
                  <p className="text-blue-100">Use o cupom <span className="font-bold">PRIMEIROMES</span> na sua primeira compra</p>
                </div>
                <Button
                  as="a"
                  href="https://www.nelogica.com.br/copy-invest?id=18363"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Ver Detalhes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Combo Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeTab === 'automation' 
              ? automationCombos.map((combo, index) => (
                  <DeskCard key={index} {...combo} />
                ))
              : copyInvestCombos.map((combo, index) => (
                  <DeskCard key={index} {...combo} />
                ))
            }
          </div>

          {/* Combo Explanation */}
          <div className="mt-20 bg-blue-800/30 rounded-xl p-8 border border-blue-700/30">
            <h3 className="text-2xl font-bold text-white mb-6">
              O que é um Combo de Estratégias com Mesa Proprietária?
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="text-blue-100 mb-6">
                  Um combo de estratégias com mesa proprietária une o melhor de dois mundos: a eficiência das estratégias automatizadas ou copy trading com o poder da alavancagem de capital de terceiros.
                </p>
                
                <h4 className="text-xl font-semibold text-white mb-4">Alavancagem Inteligente</h4>
                <p className="text-blue-100 mb-6">
                  Com apenas R$ 2.000-3.000, você pode operar até R$ 50.000 (alavancagem de 25x) e ficar com até 90% dos lucros, enquanto seu risco é limitado ao valor do teste.
                </p>
                
                <div className="bg-blue-700/30 rounded-lg p-6 mb-6">
                  <h5 className="font-semibold text-white mb-3">Comparação de Risco</h5>
                  <div className="flex justify-between mb-2">
                    <span className="text-blue-100">Investimento Tradicional (R$ 50.000)</span>
                    <span className="text-red-400">Risco de perda: R$ 10.000 (20%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Mesa Proprietária (R$ 3.000)</span>
                    <span className="text-green-400">Risco limitado: R$ 3.000</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Principais Vantagens</h4>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-white">Risco Controlado</span>
                      <p className="text-blue-100">Limites de perda pré-definidos protegem seu capital</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-white">Alta Alavancagem</span>
                      <p className="text-blue-100">Opere volumes muito maiores do que seria possível com capital próprio</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-white">Múltiplas Tentativas</span>
                      <p className="text-blue-100">Até 5 tentativas para aprovação, ideal para aprendizagem</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-white">Automação Integrada</span>
                      <p className="text-blue-100">Elimine o fator emocional com estratégias automatizadas</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-white">Alto Repasse</span>
                      <p className="text-blue-100">Fique com até 90% dos lucros gerados</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selection Guide */}
      <div className="py-20 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Guia de Seleção
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Escolha a combinação ideal para seu perfil e objetivos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-blue-900/30 rounded-xl p-8 border border-blue-800/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-blue-800/50 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-white">Euroinvest</h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">Ambiente profissional para resultados rápidos</span>
                    <p className="text-blue-100 text-sm">Plataforma otimizada para traders de futuros</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">Regulamento mais flexível</span>
                    <p className="text-blue-100 text-sm">Ideal para traders iniciantes e intermediários</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">Compatível com automação Profit Estrategista</span>
                    <p className="text-blue-100 text-sm">Integração perfeita com nossos robôs</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">Dificuldade: Média</span>
                    <p className="text-blue-100 text-sm">Processo de aprovação acessível</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-900/30 rounded-xl p-8 border border-blue-800/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-blue-800/50 rounded-full flex items-center justify-center">
                  <ChartBar className="h-6 w-6 text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-white">Zero7</h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">Ideal para operar ações ou copy invest</span>
                    <p className="text-blue-100 text-sm">Maior diversificação de mercados</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">Regulamento mais rigoroso</span>
                    <p className="text-blue-100 text-sm">Exige maior disciplina e consistência</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">Suporte a replicador de ordens</span>
                    <p className="text-blue-100 text-sm">Funcionalidade exclusiva para copy trading</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">Dificuldade: Alta</span>
                    <p className="text-blue-100 text-sm">Recomendado para traders experientes</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-blue-900/30 rounded-xl p-8 border border-blue-800/30">
            <h3 className="text-2xl font-bold text-white mb-8">
              Perguntas Frequentes
            </h3>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Available Strategies */}
      <div className="py-20 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Packs de Estratégias
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Escolha o pack ideal para combinar com sua mesa proprietária
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {strategyPacks.map((pack, index) => (
              <div 
                key={index} 
                className={`bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-8 shadow-lg border border-blue-700/30 relative ${pack.popular ? 'ring-2 ring-blue-400' : ''}`}
              >
                {pack.popular && (
                  <span className="absolute -top-3 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Mais Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{pack.title}</h3>
                <div className="mb-6">
                  <div className="text-blue-200">Valor Semestral</div>
                  <div className="text-3xl font-bold text-white">R$ {pack.price}</div>
                </div>
                <p className="text-blue-100 mb-6">{pack.description}</p>
                <ul className="space-y-3 mb-8">
                  {pack.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-blue-300 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-100">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  as="a"
                  href={pack.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-blue-800 hover:bg-blue-50"
                >
                  {pack.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testing Options */}
      <div className="py-20 bg-black-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Planos de Teste
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Escolha o plano ideal para começar sua jornada
            </p>
          </div>

          {/* Testing Options Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-md shadow-sm p-1 bg-blue-800/50">
              <button
                onClick={() => setActiveTestTab('euroinvest-simulator')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTestTab === 'euroinvest-simulator'
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-100 hover:bg-blue-700/50'
                }`}
              >
                Simulador Remunerado Euroinvest
              </button>
              <button
                onClick={() => setActiveTestTab('euroinvest-test')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTestTab === 'euroinvest-test'
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-100 hover:bg-blue-700/50'
                }`}
              >
                Teste Euroinvest
              </button>
              <button
                onClick={() => setActiveTestTab('zero7-futures')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTestTab === 'zero7-futures'
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-100 hover:bg-blue-700/50'
                }`}
              >
                Teste Zero7 Futuros
              </button>
              <button
                onClick={() => setActiveTestTab('zero7-stocks')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTestTab === 'zero7-stocks'
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-100 hover:bg-blue-700/50'
                }`}
              >
                Teste Zero7 Ações
              </button>
            </div>
          </div>

          {renderTestingOptions()}
        </div>
      </div>

      {/* Regulatory Information */}
      <div className="py-20 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Regulamentos e Observações
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Informações importantes sobre as mesas proprietárias
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-blue-800/30 rounded-xl p-8 border border-blue-700/30">
              <h3 className="text-2xl font-bold text-white mb-6">
                Regulamento Euroinvest
              </h3>
              <p className="text-blue-100 mb-6">
                A Euroinvest oferece um ambiente mais profissional para resultados rápidos com regulamento mais flexível. Ideal para operações de futuros com automação.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100">Dificuldade: Média</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100">Ambiente profissional para resultados rápidos</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100">Regulamento mais flexível</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100">Compatível com automação Profit Estrategista</span>
                </li>
              </ul>
              <Button
                as="a"
                href="https://g.euroinvest.com.br/campaign/pedropardal-oferta-euro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-blue-800 hover:bg-blue-50"
              >
                Ver Regulamento Completo
              </Button>
            </div>

            <div className="bg-blue-800/30 rounded-xl p-8 border border-blue-700/30">
              <h3 className="text-2xl font-bold text-white mb-6">
                Regulamento Zero7
              </h3>
              <p className="text-blue-100 mb-6">
                A Zero7 tem maior foco em ações e copy invest, com um nível de dificuldade mais elevado em seus testes e regulamentos mais rigorosos.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100">Dificuldade: Alta</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100">Ideal para operar ações ou copy invest</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100">Regulamento mais rigoroso</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100">Recomendado para traders experientes</span>
                </li>
              </ul>
              <Button
                as="a"
                href="https://app.4selet.com.br/checkout/120937f7-e96f-4823-adf0-d926b997af82"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-blue-800 hover:bg-blue-50"
              >
                Ver Regulamento Completo
              </Button>
            </div>
          </div>

          {/* Platform Comparison */}
          <div className="bg-blue-800/30 rounded-xl p-8 border border-blue-700/30">
            <h3 className="text-2xl font-bold text-white mb-8">
              Comparativo de Plataformas
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-blue-700/50">
                    <th className="px-4 py-3 text-blue-200">Plataforma</th>
                    <th className="px-4 py-3 text-blue-200">Dificuldade</th>
                    <th className="px-4 py-3 text-blue-200">Público-Alvo</th>
                    <th className="px-4 py-3 text-blue-200">Regulamentos</th>
                    <th className="px-4 py-3 text-blue-200">Capital Mínimo</th>
                    <th className="px-4 py-3 text-blue-200">Suporte Automação</th>
                    <th className="px-4 py-3 text-blue-200">Suporte Copy Invest</th>
                    <th className="px-4 py-3 text-blue-200">Replicador de Ordens</th>
                    <th className="px-4 py-3 text-blue-200">Custo Profit Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {platformComparison.map((platform, index) => (
                    <tr key={index} className="border-b border-blue-700/30">
                      <td className="px-4 py-3 font-medium text-white">{platform.platform}</td>
                      <td className="px-4 py-3 text-blue-100">{platform.difficulty}</td>
                      <td className="px-4 py-3 text-blue-100">{platform.targetAudience}</td>
                      <td className="px-4 py-3 text-blue-100">{platform.regulations}</td>
                      <td className="px-4 py-3 text-blue-100">{platform.minCapital}</td>
                      <td className="px-4 py-3 text-blue-100">{platform.automationSupport}</td>
                      <td className="px-4 py-3 text-blue-100">{platform.copyInvestSupport}</td>
                      <td className="px-4 py-3 text-blue-100">{platform.orderReplicator}</td>
                      <td className="px-4 py-3 text-blue-100">{platform.profitProCost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Entre em Contato
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Tire suas dúvidas e receba orientação personalizada
          </p>
          <Button
            as="a"
            href={whatsappLinks.support}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Falar com Especialista Profit Estrategista
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="py-8 bg-blue-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-blue-200">
            Analista Responsável: Yallon Mazuti de Carvalho - CNPI-T 8964
          </p>
          <p className="text-sm text-blue-200 mt-2">
            Resultados passados não garantem lucros futuros. Os robôs e estratégias disponibilizados são ferramentas de auxílio ao trader e não garantem resultados específicos. O investidor deve estar ciente dos riscos envolvidos no mercado financeiro.
          </p>
        </div>
      </div>
    </div>
  );
}