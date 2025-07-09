import { Button } from './Button';
import { ArrowRight, Check, Clock, Users, Zap, BarChart as ChartBar, MessageSquare, AlertCircle, Store, Bot, Shield, Download } from 'lucide-react';
import { whatsappLinks, demoScheduleLink, stripeLinks } from '../lib/robotLinks';

interface DeskCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText?: string;
  buttonLink?: string;
  color?: string;
}

const DeskCard = ({
  title,
  price,
  description,
  features,
  popular = false,
  buttonText = 'Saiba Mais',
  buttonLink = demoScheduleLink,
  color = 'blue'
}: DeskCardProps) => {
  const colorStyles = {
    blue: 'from-blue-600 to-blue-800',
    purple: 'from-purple-600 to-purple-800',
    green: 'from-green-600 to-green-800',
    amber: 'from-amber-600 to-amber-800',
    red: 'from-red-600 to-red-800',
    indigo: 'from-indigo-600 to-indigo-800'
  };

  return (
    <div className={`bg-gradient-to-br ${colorStyles[color as keyof typeof colorStyles]} rounded-xl p-8 shadow-lg border border-gray-700 relative`}>
      {popular && (
        <span className="absolute -top-3 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Mais Popular
        </span>
      )}
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white">R${price}</span>
          <span className="text-gray-200">{title.toLowerCase().includes('semestral') ? '/semestre' : '/mês'}</span>
        </div>
      </div>
      <p className="text-gray-200 mb-6">{description}</p>
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

function ProprietaryDesk() {
  const strategyPacks = [
    {
      title: "Pack Starter",
      price: "550",
      description: "Pack com 23 estratégias para WIN e BIT, incluindo Trend 3, Take 40, V Rev, Location 1, Take GO e mais.",
      features: [
        "14 Robôs Starter e 9 Robôs Hunter",
        "Estratégias para diversos ativos",
        "Tendência, Reversão e Scalp",
        "Operações automatizadas",
        "Suporte básico",
        "Compatível com Mesa"
      ],
      buttonText: "Contratar Pack",
      buttonLink: "https://buy.stripe.com/dR65nXfTSdnngmY8ww",
      color: "blue"
    },
    {
      title: "Combo Trimestral",
      price: "6000",
      description: "Pack com estratégias exclusivas do Copy Multi para mesas proprietárias.",
      features: [
        "+ de 40 estratégias incluídas",
        "9 ativos diferentes",
        "Backtest sem limites",
        "Compatível com Mesa"
      ],
      buttonText: "Contratar Clube",
      buttonLink: stripeLinks.copyClube,
      color: "purple"
    },
    {
      title: "Combo Starter",
      price: "9200",
      description: "Pack com estratégias exclusivas do Copy Multi + mesa proprietária.",
      features: [
        "+ de 40 estratégias incluídas",
        "9 ativos diferentes",
        "Backtest sem limites",
        "Compatível com Mesa"
      ],
      popular: true,
      buttonText: "Contratar Pack",
      buttonLink: stripeLinks.packPro,
      color: "green"
    },
    {
      title: "Combo Gestão",
      price: "14500",
      description: "Pack com estratégias exclusivas do Copy Multi + mesa proprietária com gestão profissional.",
      features: [
        "+ de 40 estratégias incluídas",
        "9 ativos diferentes",
        "Combo ações + futuros",
        "Compatível com Mesa"
      ],
      buttonText: "Entrar na Lista de Espera",
      buttonLink: whatsappLinks.copyInvest,
      color: "amber"
    }
  ];

  const futuresDesks = [
    {
      title: "TRAINEE",
      price: "397,00",
      description: "Ideal para traders iniciantes que querem começar a operar com capital alavancado.",
      features: [
        "Limite por operação: 8 contratos",
        "Limite para WIN: 5 contratos",
        "Limite para WDO: 3 contratos",
        "Limite de perda diária: R$ 247,00",
        "Limite de perda máxima: R$ 997,00",
        "Meta de aprovação: R$ 997,00",
        "Máximo de dias: 60",
        "Repasse: 90%",
        "12x R$39,70 ou R$397 à vista"
      ],
      buttonText: "CONTRATAR PLANO",
      buttonLink: "https://app.4selet.com.br/checkout/120937f7-e96f-4823-adf0-d926b997af82",
      color: "blue"
    },
    {
      title: "JÚNIOR",
      price: "597,00",
      description: "Alavancagem profissional com gestão personalizada para traders intermediários.",
      features: [
        "Limite por operação: 16 contratos",
        "Limite para WIN: 10 contratos",
        "Limite para WDO: 6 contratos",
        "Limite de perda diária: R$ 497,00",
        "Limite de perda máxima: R$ 1.997,00",
        "Meta de aprovação: R$ 1.997,00",
        "Máximo de dias: 60",
        "Repasse: 90%",
        "12x R$59,70 ou R$597 à vista"
      ],
      buttonText: "CONTRATAR PLANO",
      buttonLink: "https://app.4selet.com.br/checkout/f19b481c-67d6-437a-805a-f84978e69e03",
      color: "green"
    },
    {
      title: "PLENO",
      price: "1.197,00",
      description: "Para traders que buscam maior volume e flexibilidade operacional.",
      features: [
        "Limite por operação: 40 contratos",
        "Limite para WIN: 25 contratos",
        "Limite para WDO: 15 contratos",
        "Limite de perda diária: R$ 1.247,00",
        "Limite de perda máxima: R$ 4.997,00",
        "Meta de aprovação: R$ 4.997,00",
        "Máximo de dias: 60",
        "Repasse: 90%",
        "12x R$119,70 ou R$1.197 à vista"
      ],
      buttonText: "CONTRATAR PLANO",
      buttonLink: "https://app.4selet.com.br/checkout/1fdd4081-8bb1-4988-b536-d17cae2cda9d",
      color: "purple"
    },
    {
      title: "SÊNIOR",
      price: "1.997,00",
      description: "Solução avançada para traders experientes com maior capacidade operacional.",
      features: [
        "Limite por operação: 80 contratos",
        "Limite para WIN: 50 contratos",
        "Limite para WDO: 30 contratos",
        "Limite de perda diária: R$ 2.497,00",
        "Limite de perda máxima: R$ 9.997,00",
        "Meta de aprovação: R$ 9.997,00",
        "Máximo de dias: 60",
        "Repasse: 90%",
        "12x R$249,70 ou R$2.497 à vista"
      ],
      buttonText: "CONTRATAR PLANO",
      buttonLink: "https://app.4selet.com.br/checkout/120937f7-e96f-4823-adf0-d926b997af82",
      color: "indigo"
    },
    {
      title: "EXPERT",
      price: "3.197,00",
      description: "Para traders de alto desempenho que buscam maximizar seus resultados.",
      features: [
        "Limite por operação: 120 contratos",
        "Limite para WIN: 75 contratos",
        "Limite para WDO: 45 contratos",
        "Limite de perda diária: R$ 3.747,00",
        "Limite de perda total: R$ 14.997,00",
        "Meta aprovação: R$ 14.997,00",
        "Máximo de dias: 60",
        "Repasse: 80%",
        "12x R$319,70 ou R$3.197 à vista"
      ],
      buttonText: "CONTRATAR PLANO",
      buttonLink: "https://app.4selet.com.br/checkout/323b7cfe-08b3-4c70-b538-c7abbd95c2d5",
      color: "blue"
    },
    {
      title: "MASTER",
      price: "3.897,00",
      description: "Nossa solução premium para traders profissionais de alto volume.",
      features: [
        "Limite por operação: 160 contratos",
        "Limite para WIN: 100 contratos",
        "Limite para WDO: 60 contratos",
        "Limite de perda diária: R$ 4.997,00",
        "Limite de perda total: R$ 19.997,00",
        "Meta aprovação: R$ 19.997,00",
        "Máximo de dias: 60",
        "Repasse: 80%",
        "12x R$389,70 ou R$3.897 à vista"
      ],
      popular: true,
      buttonText: "CONTRATAR PLANO",
      buttonLink: "https://app.4selet.com.br/checkout/9da0c822-a1f1-47f1-a813-4a03a0b2bde1",
      color: "green"
    }
  ];

  const stocksDesks = [
    {
      title: "150k",
      price: "597,00",
      description: "Comece sua jornada no mercado de ações com capital inicial.",
      features: [
        "Capital máximo: R$ 150.000,00",
        "Limite de perda diária: R$ 247,00",
        "Limite de perda máxima: R$ 997,00",
        "Meta de aprovação: R$ 997,00",
        "Máximo de dias: 60",
        "Repasse: 90%",
        "12x R$59,70 ou R$597 à vista"
      ],
      buttonText: "CONTRATAR PLANO",
      buttonLink: "https://app.4selet.com.br/checkout/69eb4a87-7a8b-4a24-ba96-cd63960565c7",
      color: "blue"
    },
    {
      title: "250k",
      price: "797,00",
      description: "Expanda suas operações com maior capital sob gestão.",
      features: [
        "Capital máximo: R$ 250.000,00",
        "Limite de perda diária: R$ 497,00",
        "Limite de perda máxima: R$ 1.997,00",
        "Meta de aprovação: R$ 1.997,00",
        "Máximo de dias: 60",
        "Repasse: 90%",
        "12x R$79,70 ou R$797 à vista"
      ],
      buttonText: "CONTRATAR PLANO",
      buttonLink: "https://app.4selet.com.br/checkout/ed28f760-ab97-43d0-85a4-a18ea27f33aa",
      color: "green"
    },
    {
      title: "500k",
      price: "1.297,00",
      description: "Aumente seu potencial com maior capital sob gestão.",
      features: [
        "Capital máximo: R$ 500.000,00",
        "Limite de perda diária: R$ 997,00",
        "Limite de perda máxima: R$ 3.997,00",
        "Meta de aprovação: R$ 3.997,00",
        "Máximo de dias: 60",
        "Repasse: 90%",
        "12x R$129,70 ou R$1.297 à vista"
      ],
      popular: true,
      buttonText: "CONTRATAR PLANO",
      buttonLink: "https://app.4selet.com.br/checkout/413dab27-0c0d-40ed-896e-49b349b09c86",
      color: "purple"
    },
    {
      title: "1M",
      price: "2.497,00",
      description: "Nossa solução premium para traders profissionais.",
      features: [
        "Capital máximo: R$ 1.000.000,00",
        "Limite de perda diária: R$ 1.997,00",
        "Limite de perda máxima: R$ 7.997,00",
        "Meta de aprovação: R$ 7.997,00",
        "Máximo de dias: 60",
        "Repasse: 90%",
        "12x R$249,70 ou R$2.497 à vista"
      ],
      buttonText: "CONTRATAR PLANO",
      buttonLink: "https://app.4selet.com.br/checkout/ac4f4dd9-4a22-4bc2-bbf8-e115bf7cfd61",
      color: "indigo"
    }
  ];

  // Combo packages
  const automationDeskCombos = [
    {
      title: "Starter + Básica",
      price: "2.397,00",
      description: "Combinação ideal para iniciantes com estratégias automatizadas e mesa proprietária básica.",
      features: [
        "Pack Starter Semestral",
        "Mesa Básica Euroinvest",
        "Suporte técnico dedicado",
        "Até 8 contratos por operação"
      ],
      color: "blue"
    },
    {
      title: "Starter + Intermediária",
      price: "3.097,00",
      description: "Aumente seu potencial com estratégias automatizadas e mesa intermediária.",
      features: [
        "Pack Starter Semestral",
        "Mesa Intermediária Euroinvest",
        "Suporte técnico prioritário",
        "Até 16 contratos por operação"
      ],
      color: "green"
    },
    {
      title: "Starter + Avançada",
      price: "4.297,00",
      description: "Para traders experientes que buscam maior volume operacional com automação.",
      features: [
        "Pack Starter Semestral",
        "Mesa Avançada Euroinvest",
        "Suporte VIP 24/7",
        "Até 40 contratos por operação"
      ],
      color: "purple"
    },
    {
      title: "Starter + Premium",
      price: "5.697,00",
      description: "Solução premium com máxima alavancagem e automação completa.",
      features: [
        "Pack Starter Semestral",
        "Mesa Premium Euroinvest",
        "Suporte VIP 24/7",
        "Até 80 contratos por operação"
      ],
      popular: true,
      color: "indigo"
    }
  ];

  const copyDeskCombos = [
    {
      title: "Copy + Básica",
      price: "3.597,00",
      description: "Copy trading profissional combinado com mesa proprietária básica.",
      features: [
        "Copy Invest Semestral",
        "Mesa Básica Zero7",
        "Operações automatizadas",
        "Capital inicial de R$150k"
      ],
      color: "blue"
    },
    {
      title: "Copy + Intermediária",
      price: "4.297,00",
      description: "Maximize resultados com copy trading e mesa intermediária.",
      features: [
        "Copy Invest Semestral",
        "Mesa Intermediária Zero7",
        "Operações automatizadas",
        "Capital inicial de R$250k"
      ],
      color: "green"
    },
    {
      title: "Copy + Avançada",
      price: "5.297,00",
      description: "Solução avançada para traders que buscam diversificação e volume.",
      features: [
        "Copy Invest Semestral",
        "Mesa Avançada Zero7",
        "Operações automatizadas",
        "Capital inicial de R$500k"
      ],
      color: "purple"
    },
    {
      title: "Copy + Premium",
      price: "6.497,00",
      description: "Experiência premium com máxima diversificação e capital.",
      features: [
        "Copy Invest Semestral",
        "Mesa Premium Zero7",
        "Operações automatizadas",
        "Capital inicial de R$1M"
      ],
      popular: true,
      color: "indigo"
    }
  ];

  // Testing plans
  const testingPlans = {
    euroinvestSimulator: [
      {
        title: "NEW EUROPASS 3",
        price: "490,50",
        originalPrice: "654,00",
        description: "3 minicontratos",
        features: [
          "Limite Loss total: R$ 1.300",
          "Gatilho CR Acumulado: R$ 650",
          "Limite Loss Diário: 35%",
          "Sem Drawdown",
          "Profit One incluído"
        ],
        discount: "25% OFF",
        installments: "10x de R$61,75",
        color: "blue"
      },
      {
        title: "NEW EUROPASS 8",
        price: "825,00",
        originalPrice: "1.100,00",
        description: "8 minicontratos",
        features: [
          "Limite Loss total: R$ 2.000",
          "Gatilho CR Acumulado: R$ 1.000",
          "Limite Loss Diário: 35%",
          "Sem Drawdown",
          "Profit One incluído"
        ],
        discount: "25% OFF",
        installments: "10x de R$103,87",
        color: "green"
      },
      {
        title: "NEW EUROPASS 13",
        price: "1.650,00",
        originalPrice: "2.200,00",
        description: "13 minicontratos",
        features: [
          "Limite Loss total: R$ 4.000",
          "Gatilho CR Acumulado: R$ 2.000",
          "Limite Loss Diário: 35%",
          "Sem Drawdown",
          "Profit One incluído"
        ],
        discount: "25% OFF",
        installments: "10x de R$207,73",
        popular: true,
        color: "purple"
      },
      {
        title: "NEW EUROPASS 40",
        price: "5.625,00",
        originalPrice: "7.500,00",
        description: "40 minicontratos",
        features: [
          "Limite Loss total: R$ 10.000",
          "Gatilho CR Acumulado: R$ 5.000",
          "Limite Loss Diário: 35%",
          "Sem Drawdown",
          "Profit One incluído"
        ],
        discount: "25% OFF",
        installments: "10x de R$708,19",
        color: "indigo"
      }
    ],
    euroinvestTest: [
      {
        title: "LITE",
        price: "349,00",
        description: "Ideal para iniciantes que desejam começar com baixo risco.",
        features: [
          "5 minicontratos no máximo",
          "Loss total: R$ 1.400,00",
          "Meta para aprovação: R$ 1.200,00",
          "Até 45 dias corridos",
          "Repasse de 100% nos 3 primeiros meses"
        ],
        installments: "10x de R$43,94",
        color: "blue"
      },
      {
        title: "JUNIOR",
        price: "549,00",
        description: "Para traders com alguma experiência buscando maior volume.",
        features: [
          "10 minicontratos no máximo",
          "Loss total: R$ 2.200,00",
          "Meta para aprovação: R$ 2.000,00",
          "Até 45 dias corridos",
          "Repasse de 100% nos 3 primeiros meses"
        ],
        installments: "10x de R$69,12",
        color: "green"
      },
      {
        title: "SENIOR",
        price: "1.599,00",
        description: "Volume intermediário para traders consistentes.",
        features: [
          "35 minicontratos no máximo",
          "Loss total: R$ 5.500,00",
          "Meta para aprovação: R$ 5.000,00",
          "Até 45 dias corridos",
          "Repasse de 100% nos 3 primeiros meses"
        ],
        installments: "10x de R$201,31",
        color: "purple"
      },
      {
        title: "MASTER",
        price: "2.898,00",
        description: "Para traders experientes com alta capacidade operacional.",
        features: [
          "50 minicontratos no máximo",
          "Loss total: R$ 8.000,00",
          "Meta para aprovação: R$ 7.500,00",
          "Até 45 dias corridos",
          "Repasse de 100% nos 3 primeiros meses"
        ],
        installments: "10x de R$364,86",
        popular: true,
        color: "indigo"
      }
    ],
    zero7Futures: [
      {
        title: "TRAINEE",
        price: "397,00",
        description: "Ideal para traders iniciantes que querem começar a operar com capital alavancado.",
        features: [
          "Limite por operação: 8 contratos",
          "Limite para WIN: 5 contratos",
          "Limite para WDO: 3 contratos",
          "Limite de perda diária: R$ 247,00",
          "Máximo de dias: 60"
        ],
        installments: "12x R$39,70",
        color: "blue"
      },
      {
        title: "JÚNIOR",
        price: "597,00",
        description: "Alavancagem profissional com gestão personalizada para traders intermediários.",
        features: [
          "Limite por operação: 16 contratos",
          "Limite para WIN: 10 contratos",
          "Limite para WDO: 6 contratos",
          "Limite de perda diária: R$ 497,00",
          "Máximo de dias: 60"
        ],
        installments: "12x R$59,70",
        color: "green"
      },
      {
        title: "PLENO",
        price: "1.197,00",
        description: "Para traders que buscam maior volume e flexibilidade operacional.",
        features: [
          "Limite por operação: 40 contratos",
          "Limite para WIN: 25 contratos",
          "Limite para WDO: 15 contratos",
          "Limite de perda diária: R$ 1.247,00",
          "Máximo de dias: 60"
        ],
        installments: "12x R$119,70",
        popular: true,
        color: "purple"
      },
      {
        title: "SÊNIOR",
        price: "1.997,00",
        description: "Solução avançada para traders experientes com maior capacidade operacional.",
        features: [
          "Limite por operação: 80 contratos",
          "Limite para WIN: 50 contratos",
          "Limite para WDO: 30 contratos",
          "Limite de perda diária: R$ 2.497,00",
          "Máximo de dias: 60"
        ],
        installments: "12x R$249,70",
        color: "indigo"
      }
    ],
    zero7Stocks: [
      {
        title: "150k",
        price: "597,00",
        description: "Comece sua jornada no mercado de ações com capital inicial.",
        features: [
          "Capital máximo: R$ 150.000,00",
          "Limite de perda diária: R$ 247,00",
          "Limite de perda máxima: R$ 997,00",
          "Meta de aprovação: R$ 997,00",
          "Máximo de dias: 60"
        ],
        installments: "12x R$59,70",
        color: "blue"
      },
      {
        title: "250k",
        price: "797,00",
        description: "Expanda suas operações com maior capital sob gestão.",
        features: [
          "Capital máximo: R$ 250.000,00",
          "Limite de perda diária: R$ 497,00",
          "Limite de perda máxima: R$ 1.997,00",
          "Meta de aprovação: R$ 1.997,00",
          "Máximo de dias: 60"
        ],
        installments: "12x R$79,70",
        color: "green"
      },
      {
        title: "500k",
        price: "1.297,00",
        description: "Aumente seu potencial com maior capital sob gestão.",
        features: [
          "Capital máximo: R$ 500.000,00",
          "Limite de perda diária: R$ 997,00",
          "Limite de perda máxima: R$ 3.997,00",
          "Meta de aprovação: R$ 3.997,00",
          "Máximo de dias: 60"
        ],
        installments: "12x R$129,70",
        popular: true,
        color: "purple"
      },
      {
        title: "1M",
        price: "2.497,00",
        description: "Nossa solução premium para traders profissionais.",
        features: [
          "Capital máximo: R$ 1.000.000,00",
          "Limite de perda diária: R$ 1.997,00",
          "Limite de perda máxima: R$ 7.997,00",
          "Meta de aprovação: R$ 7.997,00",
          "Máximo de dias: 60"
        ],
        installments: "12x R$249,70",
        color: "indigo"
      }
    ]
  };

  // Strategy packs
  const strategyPacksData = [
    {
      title: "Pack Starter Semestral",
      price: "1.800",
      description: "Ideal para iniciantes e traders que buscam estratégias de Scalp com alta taxa de acerto para o mercado de mini índice..",
      features: [
        "6 Robôs Starter",
        "Backtest e replay incluso",
        "VPS Trader com desconto",
        "Tendência, Reversão e Scalp",
        "Operações automatizadas",
        "Suporte básico"
      ],
      buttonText: "Contratar Pack",
      buttonLink: stripeLinks.packStarter,
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
      buttonLink: stripeLinks.packPro,
      popular: true,
      color: "purple"
    },
    {
      title: "Copy Nelogica Semestral",
      price: "3.000",
      description: "Serviço de copy trading profissional com 30 estratégias em WIN e WDO.",
      features: [
        "Copy Trade incluído",
        "Acesso a 30 estratégias",
        "WIN e WDO",
        "Gestão profissional",
        "Suporte Nelogica"
      ],
      buttonText: "Contratar Copy Invest",
      buttonLink: stripeLinks.copyInvest,
      color: "green"
    }
  ];

  // FAQ items
  const faqItems = [
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
      answer: "Sim, nossos combos foram desenvolvidos especificamente para isso. Você pode utilizar nossas estratégias automatizadas (Pack Starter, Pack Pro) ou serviços de copy trading junto com o capital da mesa proprietária, maximizando seus resultados com risco controlado."
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

  // Platform comparison
  const platformComparison = [
    {
      platform: "Euroinvest",
      difficulty: "Média",
      audience: "Traders iniciantes a intermediários",
      regulations: "Flexíveis",
      minCapital: "R$ 490,50 (plano simulador)",
      support: "Suporte técnico 24/7"
    },
    {
      platform: "Zero7 Futuros",
      difficulty: "Alta",
      audience: "Traders intermediários a avançados",
      regulations: "Rigorosos",
      minCapital: "R$ 397,00 (plano trainee)",
      support: "Suporte em horário comercial"
    },
    {
      platform: "Zero7 Ações",
      difficulty: "Alta",
      audience: "Traders focados em ações",
      regulations: "Rigorosos",
      minCapital: "R$ 597,00 (plano 150k)",
      support: "Suporte em horário comercial"
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section with Trading Background */}
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&q=80&w=2940")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/70" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
             Mesa Proprietária + Estratégias Automatizadas
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Opere com capital de terceiros e potencialize seus resultados com risco controlado e automação de estratégias
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                as="a"
                href="#strategy-packs"
                variant="primary"
                className="group"
              >
                COMEÇAR AGORA
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                as="a"
                href="#faq-section"
                variant="outline"
                className="text-white border-white/20 hover:bg-white/10"
              >
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* What is a Proprietary Desk Section */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              O que é uma Mesa Proprietária?
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Uma Mesa Proprietária é um modelo onde você opera com capital de terceiros, recebendo um percentual dos lucros sem arriscar seu próprio dinheiro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-xl p-8 shadow-lg border border-blue-800/30 transform transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-800/50 mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">
                Risco Controlado
              </h3>
              <p className="text-blue-200 text-center">
                Opere com limites de perda pré-definidos, protegendo seu capital.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-900 to-green-950 rounded-xl p-8 shadow-lg border border-green-800/30 transform transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-800/50 mx-auto mb-6">
                <ChartBar className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">
                Maior Alavancagem
              </h3>
              <p className="text-green-200 text-center">
                Acesse um volume operacional muito maior do que seria possível com capital próprio.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-900 to-purple-950 rounded-xl p-8 shadow-lg border border-purple-800/30 transform transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-800/50 mx-auto mb-6">
                <Bot className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">
                Automação Integrada
              </h3>
              <p className="text-purple-200 text-center">
                Utilize nossos robôs e estratégias automatizadas para maximizar seus resultados.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Packages - Automation + Desk */}
      <div className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Pacotes Premium
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Combine estratégias automatizadas com mesas proprietárias para maximizar seus resultados
            </p>
          </div>

          {/* Automation + Desk Combos */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              Automação + Mesa Proprietária
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {automationDeskCombos.map((combo, index) => (
                <div key={index} className={`bg-gradient-to-br from-${combo.color}-600 to-${combo.color}-800 rounded-xl p-6 text-white relative`}>
                  {combo.popular && (
                    <span className="absolute -top-3 right-4 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Mais Popular
                    </span>
                  )}
                  <h4 className="text-xl font-bold text-white mb-2">{combo.title}</h4>
                  <p className="text-sm text-white/80 mb-4">{combo.description}</p>
                  <div className="mb-4">
                    <div className="text-sm text-white/70">Valor Semestral</div>
                    <div className="text-2xl font-bold text-white">R$ {combo.price}</div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {combo.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-4 w-4 text-white/80 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      as="a"
                      href={stripeLinks.packStarter}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="sm"
                      className="text-xs bg-white text-blue-600 hover:bg-blue-50"
                    >
                      Contratar Estratégia
                    </Button>
                    <Button
                      as="a"
                      href="https://euroinvest.com.br/planos"
                      target="_blank"
                      rel="noopener noreferrer"
                      size="sm"
                      className="text-xs bg-white text-blue-600 hover:bg-blue-50"
                    >
                      Contratar Mesa
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Copy + Desk Combos */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              Copy Trade + Mesa Proprietária
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {copyDeskCombos.map((combo, index) => (
                <div key={index} className={`bg-gradient-to-br from-${combo.color}-600 to-${combo.color}-800 rounded-xl p-6 text-white relative`}>
                  {combo.popular && (
                    <span className="absolute -top-3 right-4 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Mais Popular
                    </span>
                  )}
                  <h4 className="text-xl font-bold text-white mb-2">{combo.title}</h4>
                  <p className="text-sm text-white/80 mb-4">{combo.description}</p>
                  <div className="mb-4">
                    <div className="text-sm text-white/70">Valor Semestral</div>
                    <div className="text-2xl font-bold text-white">R$ {combo.price}</div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {combo.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-4 w-4 text-white/80 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      as="a"
                      href={stripeLinks.copyInvest}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="sm"
                      className="text-xs bg-white text-blue-600 hover:bg-blue-50"
                    >
                      Contratar Copy
                    </Button>
                    <Button
                      as="a"
                      href="https://zero7.com.br/planos"
                      target="_blank"
                      rel="noopener noreferrer"
                      size="sm"
                      className="text-xs bg-white text-blue-600 hover:bg-blue-50"
                    >
                      Contratar Mesa
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selection Guide */}
      <div id="faq-section" className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Guia de Seleção
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Escolha a combinação ideal para seu perfil e objetivos
            </p>
          </div>

          {/* Combo Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Como Funcionam os Combos
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Nossos combos unem o melhor de dois mundos: estratégias automatizadas ou copy trading com o capital alavancado das mesas proprietárias.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Você contrata separadamente a estratégia e a mesa, mas recebe suporte integrado e condições especiais ao utilizar ambos os serviços juntos.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Critérios para Escolha da Mesa
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Euroinvest:</strong> Ambiente mais profissional para resultados rápidos com regulamento mais flexível. Ideal para operações de futuros.</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Zero7:</strong> Maior foco em ações e copy invest. Recomendado para quem busca diversificação em diferentes mercados.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Vantagens dos Combos
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Maximização de resultados com capital alavancado</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Redução do fator emocional com estratégias automatizadas</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Suporte técnico integrado para ambos os serviços</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Maior diversificação de estratégias e mercados</span>
                </li>
              </ul>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              Perguntas Frequentes
            </h3>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {item.question}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Strategy Packs Section */}
      <div id="strategy-packs" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Packs de Estratégias
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Escolha o pack ideal para combinar com sua mesa proprietária
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {strategyPacksData.map((pack, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br from-${pack.color}-600 to-${pack.color}-800 rounded-xl p-8 shadow-lg border border-${pack.color}-700 relative`}
              >
                {pack.popular && (
                  <span className="absolute -top-3 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Mais Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold text-white mb-4">{pack.title}</h3>
                <div className="mb-6">
                  <div className="text-white/70">Valor Semestral</div>
                  <div className="text-3xl font-bold text-white">R$ {pack.price}</div>
                </div>
                <p className="text-white/90 mb-6">{pack.description}</p>
                <ul className="space-y-3 mb-8">
                  {pack.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-white/80 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  as="a"
                  href={pack.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-blue-600 hover:bg-blue-50"
                >
                  {pack.buttonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regulatory Information */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Regulamentos e Observações
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Informações importantes sobre as mesas proprietárias
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Regulamento Euroinvest
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                A Euroinvest oferece um ambiente mais profissional para resultados rápidos com regulamento mais flexível. Ideal para operações de futuros com automação.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Dificuldade: Média</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Ambiente profissional para resultados rápidos</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Regulamento mais flexível</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Compatível com automação Profit Estrategista</span>
                </li>
              </ul>
              <Button
                as="a"
                href="https://euroinvest.com.br/regulamento"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                Ver Regulamento Completo
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Regulamento Zero7
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                A Zero7 tem maior foco em ações e copy invest, com um nível de dificuldade mais elevado em seus testes e regulamentos mais rigorosos.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Dificuldade: Alta</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Ideal para operar ações ou copy invest</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Regulamento mais rigoroso</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Recomendado para traders experientes</span>
                </li>
              </ul>
              <Button
                as="a"
                href="https://zero7.com.br/regulamento"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                Ver Regulamento Completo
              </Button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              Comparativo de Plataformas
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Plataforma</th>
                    <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dificuldade</th>
                    <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Público-Alvo</th>
                    <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Regulamentos</th>
                    <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Capital Mínimo</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {platformComparison.map((platform, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{platform.platform}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{platform.difficulty}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{platform.audience}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{platform.regulations}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{platform.minCapital}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Testing Plans Section */}
      <div className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Planos de Teste
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Escolha o plano ideal para começar sua jornada
            </p>
          </div>

          {/* Testing Plans Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                as="a"
                href="#simulador-remunerado"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Simulador Remunerado Euroinvest
              </Button>
              <Button
                as="a"
                href="#teste-euroinvest"
                variant="outline"
              >
                Teste Euroinvest
              </Button>
              <Button
                as="a"
                href="#teste-zero7-futuros"
                variant="outline"
              >
                Teste Zero7 Futuros
              </Button>
              <Button
                as="a"
                href="#teste-zero7-acoes"
                variant="outline"
              >
                Teste Zero7 Ações
              </Button>
            </div>
          </div>

          {/* Simulador Remunerado Euroinvest */}
          <div id="simulador-remunerado" className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              Simulador Remunerado Euroinvest
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testingPlans.euroinvestSimulator.map((plan, index) => (
                <div key={index} className={`bg-gradient-to-br from-${plan.color}-600 to-${plan.color}-800 rounded-xl p-6 text-white relative`}>
                  {plan.popular && (
                    <span className="absolute -top-3 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      POPULAR
                    </span>
                  )}
                  {plan.discount && (
                    <span className="absolute -top-3 left-4 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {plan.discount}
                    </span>
                  )}
                  <h4 className="text-xl font-bold text-white mb-2">{plan.title}</h4>
                  <p className="text-sm text-white/80 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <div className="text-sm text-white/70">De: R$ {plan.originalPrice}</div>
                    <div className="text-2xl font-bold text-white">Por: R$ {plan.price}</div>
                    <div className="text-sm text-white/70">ou {plan.installments}</div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-4 w-4 text-white/80 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    as="a"
                    href="https://euroinvest.com.br/planos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white text-blue-600 hover:bg-blue-50"
                  >
                    CONTRATAR PLANO
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Teste Euroinvest */}
          <div id="teste-euroinvest" className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              Teste Euroinvest
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testingPlans.euroinvestTest.map((plan, index) => (
                <div key={index} className={`bg-gradient-to-br from-${plan.color}-600 to-${plan.color}-800 rounded-xl p-6 text-white relative`}>
                  {plan.popular && (
                    <span className="absolute -top-3 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Mais Popular
                    </span>
                  )}
                  <h4 className="text-xl font-bold text-white mb-2">{plan.title}</h4>
                  <p className="text-sm text-white/80 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-white">R$ {plan.price}</div>
                    <div className="text-sm text-white/70">pagamento único</div>
                    <div className="text-sm text-white/70">ou {plan.installments}</div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-4 w-4 text-white/80 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    as="a"
                    href="https://euroinvest.com.br/planos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white text-blue-600 hover:bg-blue-50"
                  >
                    CONTRATAR PLANO
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Teste Zero7 Futuros */}
          <div id="teste-zero7-futuros" className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              Teste Zero7 Futuros
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testingPlans.zero7Futures.map((plan, index) => (
                <div key={index} className={`bg-gradient-to-br from-${plan.color}-600 to-${plan.color}-800 rounded-xl p-6 text-white relative`}>
                  {plan.popular && (
                    <span className="absolute -top-3 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Mais Popular
                    </span>
                  )}
                  <h4 className="text-xl font-bold text-white mb-2">{plan.title}</h4>
                  <p className="text-sm text-white/80 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-white">R$ {plan.price}</div>
                    <div className="text-sm text-white/70">pagamento único</div>
                    <div className="text-sm text-white/70">ou {plan.installments}</div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-4 w-4 text-white/80 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    as="a"
                    href="https://app.4selet.com.br/checkout/120937f7-e96f-4823-adf0-d926b997af82"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white text-blue-600 hover:bg-blue-50"
                  >
                    CONTRATAR PLANO
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Teste Zero7 Ações */}
          <div id="teste-zero7-acoes">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              Teste Zero7 Ações
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testingPlans.zero7Stocks.map((plan, index) => (
                <div key={index} className={`bg-gradient-to-br from-${plan.color}-600 to-${plan.color}-800 rounded-xl p-6 text-white relative`}>
                  {plan.popular && (
                    <span className="absolute -top-3 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Mais Popular
                    </span>
                  )}
                  <h4 className="text-xl font-bold text-white mb-2">{plan.title}</h4>
                  <p className="text-sm text-white/80 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-white">R$ {plan.price}</div>
                    <div className="text-sm text-white/70">pagamento único</div>
                    <div className="text-sm text-white/70">ou {plan.installments}</div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-4 w-4 text-white/80 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    as="a"
                    href="https://app.4selet.com.br/checkout/69eb4a87-7a8b-4a24-ba96-cd63960565c7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white text-blue-600 hover:bg-blue-50"
                  >
                    CONTRATAR PLANO
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center mb-24 bg-white dark:bg-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Entre em Contato
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Tire suas dúvidas e receba orientação personalizada
          </p>
          
          <div className="max-w-2xl mx-auto space-y-6 text-left">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
         
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
         

              </div>
              <div className="mt-6">
                <Button
                  as="a"
                  href={whatsappLinks.support}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-5 w-5" />
                  Falar com Especialista Profit Estrategista
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProprietaryDesk;
export { ProprietaryDesk };