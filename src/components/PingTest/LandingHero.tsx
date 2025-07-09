import React from 'react';
import { Zap, TrendingUp, Shield, ArrowRight, Server, Check, Clock } from 'lucide-react';

interface LandingHeroProps {
  onStartTest: () => void;
}

const LandingHero: React.FC<LandingHeroProps> = ({ onStartTest }) => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]" id="teste-velocidade-trading">
          {/* Left Column - Hero Content */}
          <div className="text-left max-w-xl">
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full animate-pulse flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Teste de Velocidade
              <span className="text-blue-400 block">Profit Estrategista 2025</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              <strong>Teste GRATUITO</strong> de velocidade e latência para trading profissional. 
              Descubra se sua conexão está otimizada e se você precisa de uma <strong>VPS especializada</strong> para maximizar seus resultados no mercado financeiro.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                onClick={() => window.open('https://profitestrategista.com.br/login', '_blank', 'noopener,noreferrer')}
                aria-label="Fazer login para teste de velocidade"
              >
                Fazer Teste de Velocidade
                <TrendingUp className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              <div className="flex flex-col items-center sm:items-start">
                <div className="w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Teste Instantâneo</h3>
                <p className="text-gray-400 text-sm text-center sm:text-left">
                  Medição automática da sua latência em tempo real
                </p>
              </div>
              
              <div className="flex flex-col items-center sm:items-start">
                <div className="w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Precisão Garantida</h3>
                <p className="text-gray-400 text-sm text-center sm:text-left">
                  Múltiplas medições para resultado confiável e preciso
                </p>
              </div>
              
              <div className="flex flex-col items-center sm:items-start">
                <div className="w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Recomendação Personalizada</h3>
                <p className="text-gray-400 text-sm text-center sm:text-left">
                  Análise completa com sugestões para otimizar sua operação
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Column - VPS Image */}
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">VPS Especializadas para Trading Profissional</h2>
              <p className="text-gray-300 mb-6 max-w-lg mx-auto">
                Servidores dedicados com latência ultra-baixa para day trade, scalping e operações automatizadas.
              </p>
              <div className="bg-blue-900/30 rounded-xl p-4 mb-6 inline-block">
                <p className="text-blue-300 font-medium">
                  Desconto especial para clientes Profit Estrategista 2025
                </p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" 
                alt="Servidor VPS para Trading" 
                className="rounded-xl shadow-2xl border border-blue-800/30 max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* VPS Plans Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Planos de VPS para Trading</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Escolha o plano ideal para suas necessidades de trading
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* VPS Essential */}
          <div className="bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 transition-transform hover:scale-105 shadow-lg">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">VPS Essential</h3>
              <div className="mb-4">
                <div className="text-sm text-gray-400">Preço normal:</div>
                <div className="text-lg text-gray-300 line-through">R$ 145</div>
                <div className="text-sm text-blue-400 mt-2">Profit Estrategista:</div>
                <div className="text-2xl font-bold text-white">R$ 110/mês</div>
                <div className="inline-block bg-blue-900/50 text-blue-300 text-xs px-2 py-1 rounded-full mt-2">
                  Desconto Exclusivo
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">4GB RAM DDR4</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">2 vCPUs otimizadas</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">80GB SSD NVMe</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{"Latência < 10ms"}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Suporte 24/7</span>
                </li>
              </ul>
              
              <a
                href="https://profitestrategista.com.br/login"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium transition-colors"
              >
                Contratar na Loja
              </a>
            </div>
          </div>
          
          {/* VPS Professional */}
          <div className="bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border border-blue-500/30 transform scale-105 relative shadow-xl shadow-blue-500/20 z-10">
            <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-1 text-sm font-medium">
              Mais Popular
            </div>
            <div className="p-6 pt-8">
              <h3 className="text-xl font-bold text-white mb-2">VPS Professional</h3>
              <div className="mb-4">
                <div className="text-sm text-gray-400">Preço normal:</div>
                <div className="text-lg text-gray-300 line-through">R$ 245</div>
                <div className="text-sm text-blue-400 mt-2">Profit Estrategista:</div>
                <div className="text-2xl font-bold text-white">R$ 210/mês</div>
                <div className="inline-block bg-blue-900/50 text-blue-300 text-xs px-2 py-1 rounded-full mt-2">
                  Desconto Exclusivo
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">8GB RAM DDR4</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">4 vCPUs otimizadas</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">160GB SSD NVMe</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{"Latência < 5ms"}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Suporte prioritário</span>
                </li>
              </ul>
              
              <a
                href="https://profitestrategista.com.br/login"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium transition-colors"
              >
                Contratar na Loja
              </a>
            </div>
          </div>
          
          {/* VPS Premium */}
          <div className="bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 transition-transform hover:scale-105 shadow-lg">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">VPS Premium</h3>
              <div className="mb-4">
                <div className="text-sm text-gray-400">Preço normal:</div>
                <div className="text-lg text-gray-300 line-through">R$ 380</div>
                <div className="text-sm text-blue-400 mt-2">Profit Estrategista:</div>
                <div className="text-2xl font-bold text-white">R$ 310/mês</div>
                <div className="inline-block bg-blue-900/50 text-blue-300 text-xs px-2 py-1 rounded-full mt-2">
                  Desconto Exclusivo
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">12GB RAM DDR4</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">6 vCPUs otimizadas</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">240GB SSD NVMe</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{"Latência < 3ms"}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Suporte VIP</span>
                </li>
              </ul>
              
              <a
                href="https://profitestrategista.com.br/login"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium transition-colors"
              >
                Contratar na Loja
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="bg-blue-900/50 backdrop-blur-md rounded-xl p-6 max-w-3xl mx-auto border border-blue-800/30 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Server className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">🎯 Exclusivo para Clientes Profit Estrategista 2025</h3>
            </div>
            <p className="text-gray-300">
              Preços especiais disponíveis apenas na loja interna. Faça login no Profit Estrategista 2025 para acessar os descontos exclusivos.
            </p>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 bg-black/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Por que usar uma VPS para Trading?</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Descubra como uma VPS especializada pode transformar seus resultados no mercado financeiro
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-800/30">
              <div className="w-16 h-16 bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Velocidade Superior</h3>
              <p className="text-gray-300">
                Latência ultra-baixa para execução instantânea de ordens, essencial para day trading e scalping.
              </p>
            </div>
            
            <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-800/30">
              <div className="w-16 h-16 bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Operação 24/7</h3>
              <p className="text-gray-300">
                Seus robôs e estratégias funcionam ininterruptamente, mesmo com seu computador desligado.
              </p>
            </div>
            
            <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-800/30">
              <div className="w-16 h-16 bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Estabilidade Garantida</h3>
              <p className="text-gray-300">
                Sem quedas de energia, problemas de internet ou interrupções que podem comprometer suas operações.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Final CTA */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para otimizar suas operações?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Faça o teste de velocidade agora e descubra se você precisa de uma VPS para melhorar seus resultados
          </p>
          <button
            onClick={onStartTest}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg hover:shadow-xl flex items-center justify-center mx-auto"
          >
            Iniciar Teste de Velocidade
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;