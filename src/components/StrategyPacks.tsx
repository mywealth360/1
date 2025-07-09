import { Button } from './Button';
import { ArrowRight, Check, Clock, Users, Zap, BarChart as ChartBar } from 'lucide-react';
import { resourceLinks, stripeLinks, whatsappLinks } from '../lib/robotLinks';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

interface PackCardProps {
  title: string;
  originalPrice: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

const PackCard = ({
  title,
  originalPrice,
  price,
  description,
  features,
  popular = false,
  buttonText = 'Escolher Pack',
  buttonLink
}: PackCardProps) => (
  <div className={`bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 pb-16 relative`}>
    <div className="absolute -top-3 left-4 flex gap-1">
      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">Clube de Robôs</span>
      <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">Sinal Perfeito</span>
    </div>
    {popular && (
      <span className="absolute -top-3 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
        Mais Popular
      </span>
    )}
    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
    <div className="mb-6">
      {originalPrice && (
        <span className="text-blue-200 line-through text-lg">R$ {originalPrice}</span>
      )}
      <div className="flex items-end gap-1">
        <span className="text-4xl font-bold text-white">R$ {price}</span>
        {price !== '0' && <span className="text-blue-200">/mês</span>}
      </div>
    </div>
    <p className="text-blue-100 mb-6">{description}</p>
    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <Check className="h-5 w-5 text-blue-200 mr-2 mt-0.5 flex-shrink-0" />
          <span className="text-blue-100">{feature}</span>
        </li>
      ))}
    </ul>
    <Button 
      as="a"
      href={buttonLink}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full bg-white text-blue-600 hover:bg-blue-50 group"
    >
      {buttonText}
      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
    </Button>
    {title === 'Pack Global' && (
      <div className="absolute bottom-3 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">Setup Avançado</div>
    )}
    {title === 'Pack Starter' && (
      <div className="absolute bottom-3 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">Setup Avançado</div>
    )}
    {title === 'Copy Invest' && (
      <div className="absolute bottom-3 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">Setup Muito Fácil</div>
    )}
    {title === 'Pack PRO' && (
      <div className="absolute bottom-3 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">Setup Avançado</div>
    )}
  </div>
);

export function StrategyPacks() {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      defaultAnimation: {
        duration: 2000
      },
      slides: {
        perView: 1,
        spacing: 0,
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        }
        
        slider.on("created", () => {
          nextTimeout();
        });
        
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
        
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true;
          clearNextTimeout();
        });
        
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false;
          nextTimeout();
        });
      },
    ]
  );

  const heroSlides = [
    {
      image: "https://imagizer.imageshack.com/img924/3651/znIspD.png",
      gradient: "from-gray-900/95 to-gray-900/70"
    },
    {
      image: "https://imagizer.imageshack.com/img924/8914/MB20xQ.png",
      gradient: "from-gray-900/95 to-gray-900/70"
    }
  ];

  const packs = [
    {
      title: "Pack Free",
      originalPrice: "",
      price: "0",
      description: "Acesso básico à comunidade e robô Take GO para começar suas operações.",
      features: [
        "Acesso à comunidade básica",
        "Robô Take GO incluído",
        "Regras de coloração Color TREND",
        "Suporte via comunidade",
      ],
      buttonText: "Começar Grátis",
      buttonLink: "/login"
    },
    {
      title: "Pack Scalper",
      originalPrice: "430",
      price: "350",
      description: "Pack com 23 estratégias para múltiplos ativos, incluindo Pack Hunter, Pack Starter e backtest ilimitado.",
      features: [
        "Backtest Incluso",
        "14 Robôs Starter",
        "Estratégias para WIN e BIT",
        "Tendência, Reversão e Scalp",
        "Operações automatizadas",
        "Suporte básico"
      ],
      buttonText: "Contratar Pack",
      buttonLink: stripeLinks.packStarter
    },
    {
      title: "Pack Global",
      originalPrice: "430",
      price: "350",
      description: "Pack com 3 estratégias para mercado global, incluindo Robô GR Global, Criptomoedas e Ações e Futuros",
      features: [
        "Backtest Incluso",
        "3 Robôs para mercados globais",
        "Operações em criptomoedas",
        "Operações em ações e futuros",
        "Gestão de risco integrada",
        "Suporte avançado"
      ],
      buttonText: "Contratar Pack",
      buttonLink: stripeLinks.packGlobal
    },
    {
      title: "Copy Invest",
      originalPrice: "750",
      price: "550",
      description: "Serviço de copy trading profissional com 40 estratégias em 9 ativos diferentes.",
      features: [
        "Copy Trade incluído",
        "Acesso a 40 estratégias",
        "9 ativos diferentes",
        "Gestão profissional",
        "Suporte VIP 24/7"
      ],
      buttonText: "Contratar Copy Invest",
      buttonLink: stripeLinks.copyInvest
    },
    {
      title: "Pack PRO Quant",
      originalPrice: "1.200",
      price: "700",
      description: "Pack Quant com todas as estratégias (23 robôs), Copy Trade incluído e backtest sem limites",
      features: [
        "Backtest Incluso",
        "Todos os 23 robôs incluídos",
        "Pack Starter + Pack Global",
        "Acesso a todos os robôs",
        "Backtest sem limites",
        "Suporte VIP 24/7"
      ],
      popular: true,
      buttonText: "Contratar Pack",
      buttonLink: stripeLinks.packPro
    }
  ];

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider relative h-[50vh] min-h-[500px]">
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className="keen-slider__slide relative h-full bg-cover bg-[center_20%]"
            style={{
              backgroundImage: `url("${slide.image}")`,
              backgroundPosition: 'center 20%'
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-2xl">
                <img 
                  src="https://imagizer.imageshack.com/img924/1237/wUQU9Z.png"
                  alt="Profit Estrategista Logo"
                  className="h-16 mb-6"
                />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Packs de Estratégias
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8">
                  Escolha o pack ideal para suas necessidades e comece a operar com estratégias profissionais hoje mesmo. Todos os packs incluem suporte técnico e atualizações constantes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    as="a"
                    href={stripeLinks.packPro}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    size="lg"
                    className="group"
                  >
                    Ver Packs
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    as="a"
                    href={whatsappLinks.support}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    size="lg"
                    className="text-white border-white/20 hover:bg-white/10"
                  >
                    Falar com Especialista
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Copy Starter */}
            <div className="bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl p-8 pb-16 relative">
              <div className="absolute -top-3 left-4 flex gap-1">
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">Setups Clássicos</span>
                <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">Sinal Perfeito</span>
              </div>
              <div className="absolute bottom-3 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">Setup Muito Fácil</div>
              <h3 className="text-2xl font-bold text-white mb-2">Copy Starter</h3>
              <p className="text-amber-100 mb-6">
                Acesso a 30 estratégias do Clube de Robôs em formato Copy Invest, com gestão de risco automática e operações otimizadas para consistência.
              </p>
              <div className="mb-6">
                <div className="text-amber-200">A partir de</div>
                <div className="text-3xl font-bold text-white">R$ 400/mês</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">30 Estratégias automatizadas com gestão profissional</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Gestão de risco automática e otimizada</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Diversificação em múltiplas estratégias</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Operações via BTG Pactual</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Setup simplificado e suporte dedicado</span>
                </li>
              </ul>
              <Button 
                as="a"
                href="/robots"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-amber-600 hover:bg-amber-50"
              >
                Contratar Pack
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Copy Ações */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 pb-16 relative">
              <div className="absolute -top-3 left-4 flex gap-1">
                <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">Copy Invest</span>
                <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">Sinal Ótimo</span>
              </div>
              <div className="absolute bottom-3 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">Setup Muito Fácil</div>
              <h3 className="text-2xl font-bold text-white mb-2">Copy Multi Avulso</h3>
              <p className="text-blue-100 mb-6">
                Escolha entre operações em Futuros ou Ações. 23 estratégias para Ações ou 24 estratégias para Futuros com operações equilibradas e gestão profissional.
              </p>
              <div className="mb-6">
                <div className="text-blue-200">A partir de</div>
                <div className="text-3xl font-bold text-white">R$ 550/mês</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Operações equilibradas com alto índice de assertividade</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Gestão profissional com foco em consistência</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Diversificação em múltiplos timeframes</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Operações via BTG Pactual</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Suporte VIP e acompanhamento dedicado</span>
                </li>
              </ul>
              <Button 
                as="a"
                href="/robots"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-blue-600 hover:bg-blue-50"
              >
                Contratar Pack
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Copy Invest Multi */}
            <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-8 pb-16 relative">
              <div className="absolute -top-3 left-4 flex gap-1">
                <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">Copy Invest</span>
                <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">Sinal Ótimo</span>
              </div>
              <div className="absolute bottom-3 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">Setup Muito Fácil</div>
              <h3 className="text-2xl font-bold text-white mb-2">Copy Invest Multi</h3>
              <p className="text-green-100 mb-6">
                Portfólio completo com 40 estratégias em 9 ativos diferentes. Alto payoff e diversificação máxima para resultados consistentes.
              </p>
              <div className="mb-6">
                <div className="text-green-200">A partir de</div>
                <div className="text-3xl font-bold text-white">R$ 750/mês</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">40 estratégias com alto payoff</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Máxima diversificação em 9 ativos</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Gestão profissional com foco em resultados</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Operações via BTG Pactual</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Suporte VIP e gestão dedicada 24/7</span>
                </li>
              </ul>
              <Button 
                as="a"
                href="/robots"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-green-600 hover:bg-green-50 group"
              >
                Contratar Pack
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Combo Copy + Pack Pro */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-8 pb-16 relative">
              <div className="absolute -top-3 left-4 flex gap-1">
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">Combo de Estratégias</span>
                <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">Sinal Misto</span>
              </div>
              <div className="absolute bottom-3 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">Setup Avançado</div>
              <h3 className="text-2xl font-bold text-white mb-2">Combo Copy Semestral</h3>
              <p className="text-purple-100 mb-6">
                Combo completo com Copy Starter + Copy Multi. Acesso a todas as estratégias e mercados com desconto especial no plano semestral.
              </p>
              <div className="mb-6">
                <div className="text-purple-200">A partir de</div>
                <div className="text-3xl font-bold text-white">R$ 5280,00</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-purple-200 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-purple-100">Copy Starter + Copy Multi incluídos</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-purple-200 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-purple-100">Mais de 70 estratégias combinadas</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-purple-200 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-purple-100">Máxima diversificação de mercados</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-purple-200 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-purple-100">Gestão profissional VIP 24/7</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-purple-200 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-purple-100">Economia de R$ 1.320 no semestre</span>
                </li>
              </ul>
              <div className="space-y-3">
                <Button 
                  as="a"
                  href="/robots"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-purple-600 hover:bg-purple-50"
                >
                  Contratar Pack PRO + Copy Invest
                </Button>
                <Button 
                  as="a"
                  href={resourceLinks.copyInvestWaitlist}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  className="w-full border-white hover:bg-white/10 text-white"
                >
                  Entrar na Fila de Espera
                </Button>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4">
                <Users className="h-4 w-4 text-white" />
                <span className="text-sm text-white">Vagas Limitadas</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-2">Mesa Proprietária</h3>
            <p className="text-amber-100 mb-6">
              Opere com capital de terceiros e risco controlado. Mesas a partir de 5 contratos com automação inclusa.
            </p>
            <div className="mb-6">
              <div className="text-amber-200">A partir de</div>
              <div className="text-3xl font-bold text-white">R$ 397</div>
            </div>
            <Button
              as="a"
              href="/mesa-proprietaria"
              className="w-full bg-white text-amber-600 hover:bg-amber-50"
            >
              Ver Detalhes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}