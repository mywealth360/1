import React from 'react';
import { ChevronRight, Clock, Target, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SurveyLanding() {
  const navigate = useNavigate();
  
  const handleStartTest = () => {
    window.location.href = 'https://profitestrategista.com.br/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-white">Perfil de Trader</span>
            <button
              onClick={() => window.open('https://profitestrategista.com.br/login', '_blank')}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-colors"
            >
              Acessar Área de Membros
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Você está usando o
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400" id="perfil-trader"> robô errado</span> para o seu perfil?
          </h1>
          <h2 className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto font-normal" id="teste-perfil-trader">
            Descubra seu perfil de trader em menos de 3 minutos e maximize seus lucros com estratégias personalizadas para seu estilo de trading: scalper, swing trader, trend follower ou copy trader
          </h2>
          
          <div className="mb-8">
            <p className="text-lg text-gray-400 mb-4">
              <strong className="text-white">Mais de 10.000 traders</strong> já descobriram seu perfil ideal e aumentaram seus resultados com robôs adequados
            </p>
            <p className="text-gray-400">
              ✅ Scalper • ✅ Swing Trading • ✅ Copy Trade • ✅ Trend Following • ✅ Day Trade • ✅ Mesa Proprietária
            </p>
          </div>

          <div className="flex items-center justify-center space-x-8 mb-12">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">2-3 minutos</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">100% Personalizado</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">Gratuito</span>
            </div>
          </div>
        </div>

        {/* Main CTA Section */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 mb-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Por que descobrir seu perfil de trader?
            </h3>
            <p className="text-gray-300 text-lg mb-8">
              Traders que operam com estratégias alinhadas ao seu perfil têm <strong className="text-orange-400">87% mais chances</strong> de sucesso
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">Estratégias Personalizadas</h4>
                <p className="text-gray-400 text-sm">Receba setups específicos para seu perfil de risco e tempo disponível</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">Maximize Lucros</h4>
                <p className="text-gray-400 text-sm">Aumente seus ganhos operando com estratégias comprovadas para seu estilo</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-orange-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">Economize Tempo</h4>
                <p className="text-gray-400 text-sm">Pare de testar estratégias aleatórias e foque no que realmente funciona</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="max-w-md mx-auto">
              <button
                onClick={handleStartTest}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25 flex items-center justify-center space-x-2 mb-4"
              >
                <span>Descobrir Meu Perfil Agora</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <p className="text-sm text-gray-400">
                ⭐ Teste 100% gratuito • Resultado instantâneo • Mais de 10.000 traders
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-8 border border-orange-500/30 text-center">
          <div className="text-4xl font-bold text-white mb-2">87%</div>
          <p className="text-orange-300 mb-6">dos traders melhoram seus resultados usando estratégias alinhadas ao seu perfil</p>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">+156%</div>
              <div className="text-sm text-gray-400">Lucro médio</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">-42%</div>
              <div className="text-sm text-gray-400">Menos perdas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-400">
            <p>© 2025 Profit Estrategista - Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
}