import React from 'react';
import { Calculator, TrendingUp, Clock, Shield, ArrowRight, CheckCircle, Building, Users, Star, Gift, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function TaxCalculatorLanding() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/members/tax-calculator');
    } else {
      window.location.href = 'https://profitestrategista.com.br/login';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Calculadora IR</span>
            </div>
            <button 
              onClick={handleGetStarted}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Começar Agora
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Imposto de Renda
              <span className="block text-blue-400">Automatizado</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Calcule seu IR automaticamente com dados de múltiplas corretoras. 
              Simples, rápido e preciso. Parceria oficial com Profit Estrategista.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetStarted}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Calcular IR Grátis
                <ArrowRight className="inline ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
                className="border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-900/30 transition-colors"
              >
                Ver Demonstração
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Por que escolher o NotaBroker?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Desenvolvido especialmente para investidores brasileiros com foco em automação e precisão
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-blue-900/30 border border-blue-800/30 hover:shadow-lg transition-shadow">
              <div className="bg-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Multi-Corretora</h3>
              <p className="text-gray-300">
                Suporte a todas as principais corretoras do Brasil. Importe dados automaticamente sem complicação.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-green-900/30 border border-green-800/30 hover:shadow-lg transition-shadow">
              <div className="bg-green-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Automático</h3>
              <p className="text-gray-300">
                Cálculos instantâneos seguindo as regras da Receita Federal. Sem planilhas, sem complicação.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-purple-900/30 border border-purple-800/30 hover:shadow-lg transition-shadow">
              <div className="bg-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Seguro</h3>
              <p className="text-gray-300">
                Seus dados são protegidos com criptografia avançada. Não armazenamos informações pessoais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Simplifique sua Declaração de IR
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Economize horas de trabalho manual com nossa solução automatizada. 
                Perfeita para day traders e investidores ativos.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div className="text-white">
                    <h3 className="font-semibold">Cálculo Automático</h3>
                    <p className="text-gray-300">Todos os cálculos feitos automaticamente seguindo as regras da RF</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div className="text-white">
                    <h3 className="font-semibold">Suporte Completo</h3>
                    <p className="text-gray-300">Day trade, swing trade, ações, opções, ETFs e muito mais</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div className="text-white">
                    <h3 className="font-semibold">Relatórios Detalhados</h3>
                    <p className="text-gray-300">Relatórios prontos para anexar na sua declaração</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-2xl p-8 shadow-xl border border-gray-700/30">
              <div className="text-center mb-6">
                <TrendingUp className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white">Parceria Oficial</h3>
                <p className="text-gray-300">Desenvolvido em parceria com</p>
                <p className="text-xl font-semibold text-blue-400 mt-2">Profit Estrategista</p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-white text-center">
                <Users className="h-12 w-12 mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Mais de 10.000 investidores</h4>
                <p className="text-blue-100">já confiam em nossa solução</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profit Estrategista Discount Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-900/30 via-orange-900/30 to-red-900/30 border-y border-yellow-700/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/50 rounded-3xl shadow-2xl overflow-hidden border border-gray-700/30">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-8 py-6">
              <div className="flex items-center justify-center space-x-3">
                <Gift className="h-8 w-8 text-white" />
                <h2 className="text-2xl font-bold text-white text-center">
                  OFERTA EXCLUSIVA PROFIT ESTRATEGISTA
                </h2>
                <Gift className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Star className="h-6 w-6 text-yellow-500" />
                    <span className="text-lg font-semibold text-white">Cliente Profit Estrategista?</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Desconto Especial no
                    <span className="block text-blue-600">IR Completo</span>
                  </h3>
                  
                  <p className="text-lg text-gray-300 mb-6">
                    Aproveite condições exclusivas para contratar nosso serviço completo de 
                    Imposto de Renda com análise histórica detalhada e acompanhamento por 12 meses.
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-300">Análise histórica completa de todas as operações</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-300">Acompanhamento mensal por 12 meses</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-300">Suporte prioritário via WhatsApp</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-300">Relatórios mensais automatizados</span>
                    </div>
                  </div>

                  <button
                    onClick={handleGetStarted}
                    className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-semibold text-lg hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg flex items-center"
                  >
                    Resgatar Desconto Exclusivo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
                
                <div className="bg-gradient-to-br from-blue-900/30 to-green-900/30 rounded-2xl p-8 text-center border border-blue-800/30">
                  <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-10 w-10 text-white" />
                  </div>
                  
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Parceria Oficial</h4>
                  <p className="text-xl font-semibold text-blue-600 mb-4">Profit Estrategista</p>
                  
                  <div className="bg-gray-800/50 rounded-xl p-6 shadow-lg border border-gray-700/30">
                    <div className="text-3xl font-bold text-green-600 mb-2">DESCONTO</div>
                    <div className="text-lg text-gray-300">Condições especiais para</div>
                    <div className="text-lg font-semibold text-white">clientes parceiros</div>
                  </div>

                  <p className="text-sm text-gray-500 mt-4">
                    *Válido apenas para clientes ativos do Profit Estrategista
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para simplificar seu IR?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto" id="calculadora-ir-trader">
            Calcule seu Imposto de Renda automaticamente com dados de múltiplas corretoras. 
            Simples, rápido e preciso para day trade, swing trade e investimentos. Parceria oficial com Profit Estrategista.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto"
          >
            Começar Gratuitamente
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Calculator className="h-6 w-6" />
                <span className="text-lg font-semibold">NotaBroker</span>
              </div>
              <p className="text-gray-400">
                Automatize seus cálculos de IR com segurança e precisão.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Calculadora IR</li>
                <li>Suporte Multi-Corretora</li>
                <li>Relatórios</li>
                <li>Demonstração</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Central de Ajuda</li>
                <li>Contato</li>
                <li>Tutoriais</li>
                <li>FAQ</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Parceria</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Profit Estrategista</li>
                <li>Sobre a Parceria</li>
                <li>Benefícios</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 NotaBroker. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}