import React from 'react';
import { ArrowLeft, CheckCircle, AlertTriangle, Clock, Zap, TrendingUp } from 'lucide-react';

interface PingResult {
  average: number;
  classification: 'ideal' | 'medio' | 'ruim';
  results: number[];
}

interface PingResultsPageProps {
  pingResult: PingResult;
  onBackToTest: () => void;
}

const PingResultsPage: React.FC<PingResultsPageProps> = ({ pingResult, onBackToTest }) => {
  const getClassificationInfo = (classification: string) => {
    switch (classification) {
      case 'ideal':
        return {
          icon: <CheckCircle className="w-12 h-12 text-green-500" />,
          text: 'Ideal',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          message: 'Sua conexão está perfeita para execução precisa de ordens!',
          recommendation: 'Parabéns! Sua conexão atual já oferece latência excelente para trading profissional.'
        };
      case 'medio':
        return {
          icon: <Clock className="w-12 h-12 text-yellow-500" />,
          text: 'Médio',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          message: 'Sua conexão está aceitável, mas pode ser melhorada.',
          recommendation: 'Uma VPS dedicada pode reduzir significativamente sua latência e melhorar a precisão das suas operações.'
        };
      case 'ruim':
        return {
          icon: <AlertTriangle className="w-12 h-12 text-red-500" />,
          text: 'Ruim',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          message: 'Sua conexão está fora do ideal para execução precisa de ordens.',
          recommendation: 'Uma VPS é essencial para sua operação. A alta latência pode comprometer seus resultados no trading.'
        };
      default:
        return {
          icon: <Clock className="w-12 h-12 text-gray-500" />,
          text: 'Testando',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          message: 'Analisando sua conexão...',
          recommendation: ''
        };
    }
  };

  const info = getClassificationInfo(pingResult.classification);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={onBackToTest}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar ao teste
          </button>
        </div>
      </div>

      {/* Results Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Main Result Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center mb-8">
            <div className="mb-8">
              {info.icon}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Análise de Velocidade Concluída!
            </h1>
            
            <div className={`inline-block px-8 py-6 rounded-2xl border-2 ${info.bgColor} ${info.borderColor} mb-8`}>
              <p className="text-sm text-gray-600 mb-2">Latência média até nosso servidor:</p>
              <p className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                {pingResult.average}ms
              </p>
              <p className={`text-lg font-semibold ${info.color}`}>
                {info.text}
              </p>
            </div>
            
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              {info.message}
            </p>

            {/* Detailed Results */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalhes do Teste</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {pingResult.results.map((result, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Teste {index + 1}</div>
                    <div className="text-lg font-semibold text-gray-900">{Math.round(result)}ms</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendation Card */}
          <div className={`rounded-2xl border-l-4 p-6 mb-8 ${
            pingResult.classification === 'ideal' 
              ? 'bg-green-50 border-green-500' 
              : pingResult.classification === 'medio'
              ? 'bg-yellow-50 border-yellow-500'
              : 'bg-red-50 border-red-500'
          }`}>
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                pingResult.classification === 'ideal' 
                  ? 'bg-green-100' 
                  : pingResult.classification === 'medio'
                  ? 'bg-yellow-100'
                  : 'bg-red-100'
              }`}>
                <TrendingUp className={`w-6 h-6 ${
                  pingResult.classification === 'ideal' 
                    ? 'text-green-600' 
                    : pingResult.classification === 'medio'
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-semibold mb-2 ${
                  pingResult.classification === 'ideal' 
                    ? 'text-green-800' 
                    : pingResult.classification === 'medio'
                    ? 'text-yellow-800'
                    : 'text-red-800'
                }`}>
                  💡 Nossa Recomendação
                </h3>
                <p className={`${
                  pingResult.classification === 'ideal' 
                    ? 'text-green-700' 
                    : pingResult.classification === 'medio'
                    ? 'text-yellow-700'
                    : 'text-red-700'
                }`}>
                  {info.recommendation}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBackToTest}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Refazer Teste
            </button>
            
            <button
              onClick={() => window.open('https://profitestrategista.com.br/login', '_blank')}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <Zap className="w-5 h-5 mr-2" />
              Acessar Profit Estrategista 2025
            </button>
            
            {pingResult.classification !== 'ideal' && (
              <button
                onClick={() => window.open('https://profitestrategista.com.br/members/store', '_blank')}
                className="px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
              >
                Ver VPS na Loja
              </button>
            )}
          </div>

          {/* Performance Guide */}
          <div className="mt-12 mb-12 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Guia de Performance para Trading
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">0-50ms: Ideal</h4>
                <p className="text-gray-600 text-sm">
                  Latência perfeita para execução instantânea de ordens. Ideal para scalping e day trading.
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">51-120ms: Médio</h4>
                <p className="text-gray-600 text-sm">
                  Aceitável para swing trading, mas pode impactar operações de alta frequência.
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">121ms+: Ruim</h4>
                <p className="text-gray-600 text-sm">
                  Latência alta pode comprometer execução de ordens e causar slippage.
                </p>
              </div>
            </div>
          </div>
          
          {/* VPS Plans */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              VPS Especializadas para Trading Profissional
            </h3>
            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
              Servidores dedicados com latência ultra-baixa para day trade, scalping e operações automatizadas. 
              Compatível com MetaTrader, TradingView e todas as principais plataformas.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* VPS Essential */}
              <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 transition-transform hover:shadow-lg hover:scale-105">
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">VPS Essential</h4>
                  <div className="mb-4">
                    <div className="text-sm text-gray-500">Preço normal:</div>
                    <div className="text-gray-500 line-through">R$ 145</div>
                    <div className="text-sm text-blue-600 mt-2">Profit Estrategista:</div>
                    <div className="text-xl font-bold text-gray-900">R$ 110/mês</div>
                    <div className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mt-2">
                      Desconto Exclusivo
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-6 text-sm text-gray-600">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>4GB RAM DDR4</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>2 vCPUs otimizadas</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>80GB SSD NVMe</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Latência &lt; 10ms</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Windows Server</span>
                    </li>
                  </ul>
                  
                  <a
                    href="https://profitestrategista.com.br/login"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Contratar na Loja
                  </a>
                </div>
              </div>
              
              {/* VPS Professional */}
              <div className="bg-gray-50 rounded-xl overflow-hidden border border-blue-200 transition-transform hover:shadow-lg shadow-md relative z-10 scale-105">
                <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-1 text-xs font-medium">
                  Mais Popular
                </div>
                <div className="p-6 pt-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">VPS Professional</h4>
                  <div className="mb-4">
                    <div className="text-sm text-gray-500">Preço normal:</div>
                    <div className="text-gray-500 line-through">R$ 245</div>
                    <div className="text-sm text-blue-600 mt-2">Profit Estrategista:</div>
                    <div className="text-xl font-bold text-gray-900">R$ 210/mês</div>
                    <div className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mt-2">
                      Desconto Exclusivo
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-6 text-sm text-gray-600">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>8GB RAM DDR4</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>4 vCPUs otimizadas</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>160GB SSD NVMe</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Latência &lt; 5ms</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Backup automático</span>
                    </li>
                  </ul>
                  
                  <a
                    href="https://profitestrategista.com.br/login"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Contratar na Loja
                  </a>
                </div>
              </div>
              
              {/* VPS Premium */}
              <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 transition-transform hover:shadow-lg hover:scale-105">
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">VPS Premium</h4>
                  <div className="mb-4">
                    <div className="text-sm text-gray-500">Preço normal:</div>
                    <div className="text-gray-500 line-through">R$ 380</div>
                    <div className="text-sm text-blue-600 mt-2">Profit Estrategista:</div>
                    <div className="text-xl font-bold text-gray-900">R$ 310/mês</div>
                    <div className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mt-2">
                      Desconto Exclusivo
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-6 text-sm text-gray-600">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>12GB RAM DDR4</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>6 vCPUs otimizadas</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>240GB SSD NVMe</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Latência &lt; 3ms</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>IP dedicado</span>
                    </li>
                  </ul>
                  
                  <a
                    href="https://profitestrategista.com.br/login"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Contratar na Loja
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                🎯 <strong>Exclusivo para Clientes Profit Estrategista 2025</strong> - Preços especiais disponíveis apenas na loja interna.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PingResultsPage;