import { Button } from './Button';
import { ArrowRight, Shield, Notebook as Robot, Users, BarChart as ChartBar, LogIn, Copy, Bot, Settings, MessageSquare, Clock, Menu, X, Info, HelpCircle, Check, ShoppingBag, Server } from 'lucide-react';
import { FeaturedRobot } from './FeaturedRobot';
import { resourceLinks, stripeLinks, whatsappLinks } from '../lib/robotLinks';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { CustomerReviews } from './CustomerReviews';
import { OptimizedFAQ } from './OptimizedFAQ';

function Hero() {
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

  const features = [
    {
      title: "Robôs de Trading Avançados",
      description: "Algoritmos de última geração que operam automaticamente no mercado seguindo estratégias testadas e otimizadas.",
      icon: <Robot className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Comunidade Exclusiva de Elite",
      description: "Acesso a um grupo seleto de traders profissionais onde você pode compartilhar ideias e estratégias.",
      icon: <Users className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Resultados Consistentes",
      description: "Estratégias desenvolvidas e testadas para buscar resultados consistentes a longo prazo.",
      icon: <ChartBar className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Segurança e Confiabilidade",
      description: "Seus dados e investimentos protegidos com as mais avançadas tecnologias de segurança.",
      icon: <Shield className="h-6 w-6 text-blue-600" />
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section with Static Image */}
      <div 
        className="relative h-[60vh] min-h-[600px] bg-cover"
        style={{ backgroundImage: 'url("https://i.postimg.cc/QxCKK7N2/Imagem-do-Whats-App-de-2025-06-14-s-15-48-36-826db3e7.jpg")', backgroundPosition: 'center 20%' }}
        aria-label="Trading automatizado para resultados consistentes"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 to-blue-950/70" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl relative">
            <img 
              src="https://imagizer.imageshack.com/img924/1237/wUQU9Z.png"
              alt="Profit Estrategista Logo"
              className="h-16 mb-8 relative z-10"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Trading automatizado para
              <span className="block text-blue-400">resultados consistentes</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Estratégias profissionais e robôs traders para maximizar seus investimentos com automação. Opere com consistência utilizando algoritmos avançados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                as="a"
                href="/clube-de-robos"
                variant="primary"
                size="lg"
                className="group"
              >
                Clube de Robôs
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                as="a"
                href="/consultoria"
                variant="outline"
                size="lg"
                className="text-white border-white/20 hover:bg-white/10"
              >
                Crie seu Robô
              </Button>
              <Button
                as="a"
                href="https://profitestrategista.com.br/login"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                className="text-white border-white/20 hover:bg-white/10"
              >
                Fazer Login
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-xl bg-gray-900">
          <div className="aspect-w-16 aspect-h-9">
            <iframe 
              src="https://www.youtube.com/embed/0uajKLBp6mM" 
              className="w-full h-[480px] bg-gray-900" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen 
              title="Profit Estrategista - Trading Automatizado" 
              loading="lazy" 
              aria-label="Vídeo demonstrativo sobre trading automatizado e robôs de investimento"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <CustomerReviews />

      {/* Consulting Services Section */}
      <div className="py-24 bg-blue-900 dark:bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">
              Consultoria Especializada em Trading Algorítmico
            </h2>
            <p className="mt-4 text-xl text-white/90 max-w-3xl mx-auto">
              Somos especialistas em automação de trading, robôs de investimento e estratégias algorítmicas para mercados financeiros
            </p>
            <p className="mt-4 text-xl text-white/90">
              Transforme sua operação com nossa consultoria especializada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-800/30 backdrop-blur rounded-xl p-8 border border-blue-700/30">
              <Shield className="h-12 w-12 text-white mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">
                Consultoria Estratégica
              </h3>
              <p className="text-white/90">
                Consultoria personalizada para mesas proprietárias com foco em otimização de resultados.
              </p>
            </div>

            <div className="bg-blue-800/30 backdrop-blur rounded-xl p-8 border border-blue-700/30">
              <ChartBar className="h-12 w-12 text-white mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">
                Desenvolvimento de Estratégias
              </h3>
              <p className="text-white/90">
                Desenvolvimento e validação de estratégias automatizadas com backtesting profissional.
              </p>
            </div>

            <div className="bg-blue-800/30 backdrop-blur rounded-xl p-8 border border-blue-700/30">
              <Bot className="h-12 w-12 text-white mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">
                Robôs Customizados
              </h3>
              <p className="text-white/90">
                Criação de robôs traders personalizados para suas necessidades específicas.
              </p>
            </div>

            <div className="bg-blue-800/30 backdrop-blur rounded-xl p-8 border border-blue-700/30">
              <Settings className="h-12 w-12 text-white mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">
                Implementação e Otimização
              </h3>
              <p className="text-white/90">
                Consultoria completa de implementação e otimização de sistemas de trading.
              </p>
            </div>

            <div className="bg-blue-800/30 backdrop-blur rounded-xl p-8 border border-blue-700/30">
              <MessageSquare className="h-12 w-12 text-white mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">
                Suporte Especializado
              </h3>
              <p className="text-white/90">
                Suporte técnico especializado na operação dos algoritmos e sistemas.
              </p>
            </div>

            <div className="bg-blue-800/30 backdrop-blur rounded-xl p-8 border border-blue-700/30">
              <Clock className="h-12 w-12 text-white mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">
                Acompanhamento Contínuo
              </h3>
              <p className="text-white/90">
                Monitoramento e ajustes contínuos para garantir a performance das estratégias.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button
              as="a"
              href="/consultoria"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="group"
            >
              Crie seu Robô Personalizado
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>

   {/* Strategy Packs Section */}
<div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex flex-wrap justify-center gap-6">
    
    {/* Pack Starter */}
    <div className="w-full md:w-[360px] bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-8 pb-16 relative border border-blue-700/30 shadow-lg">
      <div className="absolute -top-3 left-4 flex gap-1">
        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">Setups Clássicos</span>
        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">Sinal Perfeito</span>
      </div>
      <div className="absolute bottom-3 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">Setup Avançado</div>
      <h3 className="text-2xl font-bold text-white mb-2">Clube de Robôs</h3>
      <p className="text-blue-200 mb-6">Pack com 6 estratégias Scalper com backtest ilimitado.</p>
      <div className="mb-6">
        <div className="text-blue-300">A partir de</div>
        <div className="text-2xl font-bold text-white">R$ 0,00 no primeiro mês</div>
      </div>
      <Button
        as="a"
        href="/clube-de-robos"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-white text-blue-700 hover:bg-blue-50"
      >
        Clube de Robôs
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>

    {/* Copy Invest */}
    <div className="w-full md:w-[360px] bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-8 pb-16 relative border border-blue-700/30 shadow-lg">
      <div className="absolute -top-3 left-4 flex gap-1">
        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">Copy Trade</span>
        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">Sinal Ótimo</span>
      </div>
      <div className="absolute bottom-3 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">Setup Muito Fácil</div>
      <h3 className="text-2xl font-bold text-white mb-2">Portfólios de IA</h3>
      <p className="text-blue-200 mb-6">
        Portfólios automatizados por IA a partir de R$ 300,00 por mês.
      </p>
      <div className="mb-6">
        <div className="text-blue-300">A partir de</div>
        <div className="text-2xl font-bold text-white">R$ 300/mês</div>
      </div>
      <Button
        as="a"
        href="/copy-trade"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-white text-blue-700 hover:bg-blue-50"
      >
        Ver Portfólios de IA
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>

    {/* Pack PRO */}
    <div className="w-full md:w-[360px] bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-8 relative border border-blue-700/30 shadow-lg">
      <div className="absolute -top-3 left-4 flex gap-1">
        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">Projeto Personalizado</span>
        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">Sinal Perfeito</span>
      </div>
      <div className="absolute bottom-3 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">Setup com Suporte</div>
      <h3 className="text-2xl font-bold text-white mb-2">Crie seu Robô</h3>
      <p className="text-blue-200 mb-6">
        1 robô personalizado com funcionalidades avançadas
      </p>
      <div className="mb-6">
        <div className="text-blue-300">A partir de</div>
        <div className="text-2xl font-bold text-white">R$ 1.500/por robô</div>
      </div>
      <Button
        as="a"
        href="/consultoria"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-white text-blue-700 hover:bg-blue-50"
      >
        Crie seu Robô
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>

  </div>
</div>


      {/* Features Section */}
      <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">
            Por que escolher a Profit Estrategista?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-900/80 dark:bg-blue-900/80 rounded-xl p-8 shadow-lg border border-blue-800/30 dark:border-blue-800/30">
            <div className="h-12 w-12 bg-blue-800/50 dark:bg-blue-800/50 rounded-lg flex items-center justify-center mb-4">
              <Bot className="h-6 w-6 text-blue-300 dark:text-blue-300" />
            </div>
            <h3 className="text-xl font-semibold text-white dark:text-white mb-2">
              Robôs de Trading Avançados
            </h3>
            <p className="text-blue-200 dark:text-blue-200">
              Algoritmos de última geração que operam automaticamente no mercado seguindo estratégias testadas e otimizadas.
            </p>
          </div>

          <div className="bg-blue-900/80 dark:bg-blue-900/80 rounded-xl p-8 shadow-lg border border-blue-800/30 dark:border-blue-800/30">
            <div className="h-12 w-12 bg-blue-800/50 dark:bg-blue-800/50 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-blue-300 dark:text-blue-300" />
            </div>
            <h3 className="text-xl font-semibold text-white dark:text-white mb-2">
              Comunidade Exclusiva de Elite
            </h3>
            <p className="text-blue-200 dark:text-blue-200">
              Acesso a um grupo seleto de traders profissionais onde você pode compartilhar ideias e estratégias.
            </p>
          </div>

          <div className="bg-blue-900/80 dark:bg-blue-900/80 rounded-xl p-8 shadow-lg border border-blue-800/30 dark:border-blue-800/30">
            <div className="h-12 w-12 bg-blue-800/50 dark:bg-blue-800/50 rounded-lg flex items-center justify-center mb-4">
              <ChartBar className="h-6 w-6 text-blue-300 dark:text-blue-300" />
            </div>
            <h3 className="text-xl font-semibold text-white dark:text-white mb-2">
              Resultados Consistentes
            </h3>
            <p className="text-blue-200 dark:text-blue-200">
              Estratégias desenvolvidas e testadas para buscar resultados consistentes a longo prazo.
            </p>
          </div>

          <div className="bg-blue-900/80 dark:bg-blue-900/80 rounded-xl p-8 shadow-lg border border-blue-800/30 dark:border-blue-800/30">
            <div className="h-12 w-12 bg-blue-800/50 dark:bg-blue-800/50 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-blue-300 dark:text-blue-300" />
            </div>
            <h3 className="text-xl font-semibold text-white dark:text-white mb-2">
              Segurança e Confiabilidade
            </h3>
            <p className="text-blue-200 dark:text-blue-200">
              Seus dados e investimentos protegidos com as mais avançadas tecnologias de segurança.
            </p>
          </div>
        </div>
      </div>

      {/* Optimized FAQ Section */}
      <OptimizedFAQ />

      {/* Final CTA */}
      <div className="mt-24 text-center pb-12">
        <Button 
          as="a"
          href="/consultoria"
          size="lg" 
          className="group"
        >
          Crie seu Robô Personalizado
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}

export default Hero;