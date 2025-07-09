import React, { useState } from 'react';
import { Calculator, TrendingUp, Shield, Target, BarChart3, DollarSign, Users, Bot, MessageCircle, ExternalLink, User, Mail, Phone, ChevronRight, CheckCircle, Bitcoin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-8">
              <Calculator className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Calculadora de Risco
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" id="calculadora-day-trade">
                para Futuros B3
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto" id="calculadora-risco-trading">
              Ferramenta profissional para day traders calcularem o tamanho ideal de posição em contratos futuros. 
              Gerencie seu capital com precisão matemática para WIN (Mini Índice), WDO (Mini Dólar) e BITFUT (Bitcoin Futuro) na B3.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300 mb-8">
              <span className="bg-white/10 px-3 py-1 rounded-full">✓ WIN (Mini Índice)</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">✓ WDO (Mini Dólar)</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">✓ BITFUT (Bitcoin)</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">✓ Day Trade</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">✓ Gestão de Risco</span>
            </div>
          </div>
        </div>
      </section>

      {/* Instruments Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Contratos Futuros Suportados na B3
            </h2>
            <p className="text-gray-300 text-lg">
              Nossa calculadora trabalha com os principais contratos futuros negociados na bolsa brasileira
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* WIN */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-6 mx-auto">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-4">WIN</h3>
              <p className="text-gray-300 text-center">
                <strong>Mini Índice Bovespa</strong><br />
                Contrato futuro que acompanha a variação do Ibovespa com menor capital inicial. 
                Ideal para day trade e swing trade no índice brasileiro.
              </p>
            </div>

            {/* WDO */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-6 mx-auto">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-4">WDO</h3>
              <p className="text-gray-300 text-center">
                <strong>Mini Dólar</strong><br />
                Contrato futuro de câmbio USD/BRL. Proteção cambial e especulação 
                na variação do dólar americano contra o real brasileiro.
              </p>
            </div>

            {/* BITFUT */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-6 mx-auto">
                <Bitcoin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-4">BITFUT</h3>
              <p className="text-gray-300 text-center">
                <strong>Bitcoin Futuro</strong><br />
                Contrato futuro de Bitcoin com liquidação em reais. 
                Exposição ao maior criptoativo do mundo através da B3.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Por que usar nossa Calculadora de Risco para Futuros B3?
            </h2>
            <p className="text-gray-300 text-lg">
              Ferramenta desenvolvida por traders profissionais para traders profissionais
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-4 mx-auto">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Cálculo Matemático Preciso</h3>
              <p className="text-gray-400 text-sm">
                Algoritmos específicos para cada contrato futuro da B3 com conversores exatos
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-full mb-4 mx-auto">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Gestão de Risco Profissional</h3>
              <p className="text-gray-400 text-sm">
                Controle total sobre o percentual de risco por operação baseado no seu capital
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full mb-4 mx-auto">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Múltiplos Contratos B3</h3>
              <p className="text-gray-400 text-sm">
                Suporte completo para WIN, WDO e BITFUT com multiplicadores específicos
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-600 rounded-full mb-4 mx-auto">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Padrão Profissional</h3>
              <p className="text-gray-400 text-sm">
                Ferramenta usada por traders institucionais e investidores profissionais
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Benefícios da Gestão de Risco em Futuros B3
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white font-semibold mb-1">Preservação de Capital</h4>
                <p className="text-gray-300 text-sm">Evite perdas catastróficas calculando o tamanho correto da posição</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white font-semibold mb-1">Consistência nos Resultados</h4>
                <p className="text-gray-300 text-sm">Mantenha disciplina e consistência em todas as suas operações</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white font-semibold mb-1">Otimização de Payoff</h4>
                <p className="text-gray-300 text-sm">Calcule a relação risco/retorno ideal para cada operação</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white font-semibold mb-1">Profissionalização</h4>
                <p className="text-gray-300 text-sm">Opere como um trader profissional com ferramentas adequadas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Question */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <button
          onClick={() => navigate('/members/calculator')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 mx-auto"
        >
          <span>Acessar Calculadora de Risco B3</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-black/30 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Profit Estrategista. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Calculadora de Risco para Futuros B3 - WIN, WDO, BITFUT | Profit Estrategista
          </p>
        </div>
      </footer>
    </div>
  );
}

export function CalculatorLanding() {
  return <LandingPage />;
}