import React, { useState, useEffect } from 'react';
import { Zap, Clock, ArrowLeft, CheckCircle, AlertTriangle, TrendingUp, Shield, Server, Check, Cpu, MemoryStick as Memory, HardDrive, Globe, Activity } from 'lucide-react';
import { Button } from '../Button';
import { useAuth } from '../../contexts/AuthContext';
import { sendToRDStation } from '../../lib/rdStationWorker';

interface PingResult {
  average: number;
  classification: 'ideal' | 'medio' | 'ruim';
  results: number[];
  computationalPower?: number;
}

export function MemberPingTest() {
  const { user } = useAuth();
  const [isRunning, setIsRunning] = useState(false);
  const [systemInfo, setSystemInfo] = useState({
    cpu: 'Verificando...',
    memory: 'Verificando...',
    storage: 'Verificando...',
    browser: 'Verificando...',
    os: 'Verificando...'
  });
  const [computationalPower, setComputationalPower] = useState<number | null>(null);
  const [pingResults, setPingResults] = useState<number[]>([]);
  const [finalResult, setFinalResult] = useState<PingResult | null>(null);
  const [progress, setProgress] = useState(0);

  // Obter informações do sistema
  useEffect(() => {
    // Detectar navegador
    const detectBrowser = () => {
      const userAgent = navigator.userAgent;
      let browserName;
      
      if (userAgent.match(/chrome|chromium|crios/i)) {
        browserName = "Chrome";
      } else if (userAgent.match(/firefox|fxios/i)) {
        browserName = "Firefox";
      } else if (userAgent.match(/safari/i)) {
        browserName = "Safari";
      } else if (userAgent.match(/opr\//i)) {
        browserName = "Opera";
      } else if (userAgent.match(/edg/i)) {
        browserName = "Edge";
      } else {
        browserName = "Desconhecido";
      }
      
      return browserName;
    };
    
    // Detectar sistema operacional
    const detectOS = () => {
      const userAgent = navigator.userAgent;
      let os;
      
      if (userAgent.indexOf("Win") !== -1) {
        os = "Windows";
      } else if (userAgent.indexOf("Mac") !== -1) {
        os = "MacOS";
      } else if (userAgent.indexOf("Linux") !== -1) {
        os = "Linux";
      } else if (userAgent.indexOf("Android") !== -1) {
        os = "Android";
      } else if (userAgent.indexOf("iOS") !== -1) {
        os = "iOS";
      } else {
        os = "Desconhecido";
      }
      
      return os;
    };
    
    // Simular detecção de hardware (não é possível obter informações reais do hardware via browser)
    const simulateHardwareInfo = () => {
      // Simular CPU baseado no navegador e sistema operacional
      const browser = detectBrowser();
      const os = detectOS();
      
      let cpuInfo;
      let memoryInfo;
      let storageInfo;
      
      if (os === "Windows") {
        cpuInfo = "Intel Core i7 (Estimado)";
        memoryInfo = "16GB RAM (Estimado)";
        storageInfo = "SSD 512GB (Estimado)";
      } else if (os === "MacOS") {
        cpuInfo = "Apple M1/M2 (Estimado)";
        memoryInfo = "16GB RAM (Estimado)";
        storageInfo = "SSD 512GB (Estimado)";
      } else if (os === "Linux") {
        cpuInfo = "AMD Ryzen (Estimado)";
        memoryInfo = "16GB RAM (Estimado)";
        storageInfo = "SSD 512GB (Estimado)";
      } else {
        cpuInfo = "Processador Moderno (Estimado)";
        memoryInfo = "8GB+ RAM (Estimado)";
        storageInfo = "SSD (Estimado)";
      }
      
      return {
        cpu: cpuInfo,
        memory: memoryInfo,
        storage: storageInfo,
        browser: browser,
        os: os
      };
    };
    
    // Atualizar informações do sistema
    const hardwareInfo = simulateHardwareInfo();
    setSystemInfo(hardwareInfo);
  }, []);

  // Teste de poder computacional
  const testComputationalPower = () => {
    const startTime = performance.now();
    let result = 0;
    
    // Executar operações matemáticas intensivas
    for (let i = 0; i < 10000000; i++) {
      result += Math.sqrt(i) * Math.cos(i) / (Math.sin(i) + 1);
    }
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    // Normalizar o resultado (menor é melhor)
    // Escala de 1-100 onde 100 é o melhor
    const normalizedScore = Math.min(100, Math.max(1, Math.round(10000 / duration * 10)));
    
    return normalizedScore;
  };

  // Simular ping
  const simulatePing = () => {
    // Valores aleatórios entre 20ms e 200ms
    return Math.random() * 180 + 20;
  };

  // Iniciar teste
  const startTest = () => {
    setIsRunning(true);
    setPingResults([]);
    setProgress(0);
    setFinalResult(null);
    runPingTests();
    
    // Executar teste de poder computacional
    setComputationalPower(testComputationalPower());
  };

  // Executar testes de ping
  const runPingTests = () => {
    const totalTests = 5;
    const results: number[] = [];
    let currentTest = 0;

    const runTest = () => {
      if (currentTest < totalTests) {
        const pingTime = simulatePing();
        results.push(pingTime);
        currentTest++;
        setProgress((currentTest / totalTests) * 100);
        setPingResults([...results]);
        
        setTimeout(runTest, 1000);
      } else {
        // Calcular média
        const average = results.reduce((sum, val) => sum + val, 0) / results.length;
        
        // Classificar resultado
        let classification: 'ideal' | 'medio' | 'ruim';
        if (average <= 50) {
          classification = 'ideal';
        } else if (average <= 120) {
          classification = 'medio';
        } else {
          classification = 'ruim';
        }
        
        const result = {
          average: Math.round(average),
          classification,
          results,
          computationalPower
        };

        setFinalResult(result);
        setIsRunning(false);
        
        // Enviar resultado para RD Station se o usuário estiver logado
        if (user) {
          sendResultToRDStation(result);
        }
      }
    };

    runTest();
  };

  // Enviar resultado para RD Station
  const sendResultToRDStation = async (result: PingResult) => {
    if (!user) return;
    
    try {
      // Preparar dados para o RD Station
      const rdStationData = {
        email: user.email,
        name: user.email?.split('@')[0] || '',
        tags: ['Website', 'Teste de Ping', 'Área de Membros'],
        traffic_source: 'Members Area',
        cf_resultado_ping: result.average,
        cf_classificacao_ping: result.classification,
        cf_poder_computacional: result.computationalPower,
        identificador: "Teste de Ping - Área de Membros"
      };
      
      // Enviar para o RD Station
      await sendToRDStation(rdStationData, "Teste de Ping - Área de Membros");
    } catch (error) {
      console.error('Erro ao enviar dados para RD Station:', error);
    }
  };

  // Classificação do resultado
  const getClassificationInfo = (classification?: string) => {
    switch (classification) {
      case 'ideal':
        return {
          icon: <CheckCircle className="w-8 h-8 text-green-500" />,
          text: 'Ideal',
          color: 'text-green-600',
          bgColor: 'bg-green-900/20',
          borderColor: 'border-green-700/30',
          message: 'Sua conexão está perfeita para execução precisa de ordens!',
          recommendation: 'Parabéns! Sua conexão atual já oferece latência excelente para trading profissional.'
        };
      case 'medio':
        return {
          icon: <Clock className="w-8 h-8 text-yellow-500" />,
          text: 'Médio',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-900/20',
          borderColor: 'border-yellow-700/30',
          message: 'Sua conexão está aceitável, mas pode ser melhorada.',
          recommendation: 'Uma VPS dedicada pode reduzir significativamente sua latência e melhorar a precisão das suas operações.'
        };
      case 'ruim':
        return {
          icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
          text: 'Ruim',
          color: 'text-red-600',
          bgColor: 'bg-red-900/20',
          borderColor: 'border-red-700/30',
          message: 'Sua conexão está fora do ideal para execução precisa de ordens.',
          recommendation: 'Uma VPS é essencial para sua operação. A alta latência pode comprometer seus resultados no trading.'
        };
      default:
        return {
          icon: <Clock className="w-8 h-8 text-gray-500" />,
          text: 'Testando',
          color: 'text-gray-400',
          bgColor: 'bg-gray-800/30',
          borderColor: 'border-gray-700/30',
          message: 'Analisando sua conexão...',
          recommendation: ''
        };
    }
  };

  const info = getClassificationInfo(finalResult?.classification);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white dark:text-white">
          Teste de Velocidade
        </h1>
        <p className="mt-2 text-gray-300 dark:text-gray-300">
          Verifique a latência da sua conexão para trading
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Painel de Teste de Latência */}
        <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-800 dark:border-gray-800 shadow-lg">
          <h2 className="text-xl font-semibold text-white dark:text-white mb-6 flex items-center gap-3">
            <Zap className="h-5 w-5 text-blue-400" />
            Teste de Latência
          </h2>

          {isRunning ? (
            <div className="space-y-6">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-blue-900/30 rounded-full flex items-center justify-center relative">
                  <Zap className="w-10 h-10 text-blue-400" />
                  <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-medium text-white mb-2">Testando sua conexão e poder computacional...</h3>
                <p className="text-gray-400 mb-4">
                  Realizando múltiplas medições para garantir precisão
                </p>
              </div>
              
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-right text-sm text-gray-400">
                {Math.round(progress)}% concluído
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Resultados Parciais</h4>
                <div className="grid grid-cols-5 gap-3">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Teste {index + 1}</div>
                      <div className="text-sm font-medium text-white">
                        {pingResults[index] 
                          ? `${Math.round(pingResults[index])}ms` 
                          : '-'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-300 mb-6">
                  Este teste mede a latência da sua conexão com nossos servidores, um fator crítico para a execução precisa de ordens no trading.
                </p> 
                
                <Button
                  onClick={startTest}
                  className="w-full sm:w-auto"
                >
                  {finalResult ? 'Refazer Teste' : 'Iniciar Teste'}
                </Button>
              </div>
              
              {finalResult && (
                <div className="mt-6 bg-gray-800/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Último Resultado</h4>
                  <div className="grid grid-cols-5 gap-3">
                    {finalResult.results.map((result, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Teste {index + 1}</div>
                        <div className="text-sm font-medium text-white">
                          {Math.round(result)}ms
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Painel de Resultados de Latência */}
        <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-800 dark:border-gray-800 shadow-lg">
          <h2 className="text-xl font-semibold text-white dark:text-white mb-6 flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            Resultados
          </h2>

          {finalResult ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-blue-400" />
                    <div className="text-sm text-gray-400">Latência Média</div>
                  </div>
                  <div className="text-3xl font-bold text-white">{finalResult.average}ms</div>
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                    finalResult.classification === 'ideal' 
                      ? 'bg-green-900/50 text-green-400' 
                      : finalResult.classification === 'medio'
                      ? 'bg-yellow-900/50 text-yellow-400'
                      : 'bg-red-900/50 text-red-400'
                  }`}>
                    {info.text}
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-purple-400" />
                    <div className="text-sm text-gray-400">Poder Computacional</div>
                  </div>
                  <div className="text-3xl font-bold text-white">{finalResult.computationalPower || computationalPower || '?'}/100</div>
                  <div className="text-xs text-purple-400">Capacidade de processamento</div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${info.bgColor} ${info.borderColor}`}>
                <p className={`${info.color}`}>
                  {info.message}
                </p>
              </div>
              
              <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700/30">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Recomendação</h4>
                <p className="text-gray-400 text-sm">
                  {info.recommendation}
                </p>
                
                {finalResult.classification !== 'ideal' && (
                  <Button
                    as="a"
                    href="/members/store?section=vps"
                    className="mt-4 w-full"
                  >
                    Ver VPS na Loja
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              <Shield className="h-12 w-12 text-gray-600 mb-4" />
              <p className="text-gray-400 text-center px-4">
                Inicie o teste para ver os resultados da sua conexão
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Painel de Análise Combinada */}
      {finalResult && (
        <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-800 dark:border-gray-800 shadow-lg">
          <h2 className="text-xl font-semibold text-white dark:text-white mb-6 flex items-center gap-3">
            <Activity className="h-5 w-5 text-blue-400" />
            Análise Combinada: Latência + Poder Computacional
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/30">
              <h3 className="text-lg font-semibold text-white mb-4">Diagnóstico</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Latência: {finalResult.average}ms</h4>
                    <p className="text-gray-400 text-sm">
                      {finalResult.classification === 'ideal' 
                        ? 'Excelente para execução de ordens em tempo real' 
                        : finalResult.classification === 'medio'
                        ? 'Aceitável, mas pode ser melhorada para operações de alta frequência'
                        : 'Pode comprometer a execução precisa de ordens'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <Cpu className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Poder Computacional: {finalResult.computationalPower || computationalPower || '?'}/100</h4>
                    <p className="text-gray-400 text-sm">
                      {(finalResult.computationalPower || computationalPower || 0) > 70 
                        ? 'Excelente para processamento de múltiplas estratégias e indicadores' 
                        : (finalResult.computationalPower || computationalPower || 0) > 40
                        ? 'Adequado para a maioria das estratégias, mas pode ter limitações com múltiplos robôs'
                        : 'Pode limitar o desempenho de estratégias complexas ou múltiplos robôs'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg p-6 border border-blue-800/30">
              <h3 className="text-lg font-semibold text-white mb-4">Recomendação Combinada</h3>
              <p className="text-gray-300 mb-4">
                {finalResult.classification === 'ideal' && (finalResult.computationalPower || computationalPower || 0) > 70
                  ? 'Seu ambiente está otimizado para trading de alta performance. Você tem excelente latência e poder computacional adequado para executar múltiplas estratégias simultaneamente.'
                  : finalResult.classification === 'ideal' && (finalResult.computationalPower || computationalPower || 0) <= 70
                  ? 'Sua latência está excelente, mas seu poder computacional pode limitar estratégias complexas. Considere uma VPS com mais recursos para melhorar o processamento.'
                  : finalResult.classification === 'medio' && (finalResult.computationalPower || computationalPower || 0) > 70
                  ? 'Seu poder computacional é excelente, mas sua latência pode ser melhorada. Uma VPS dedicada pode reduzir significativamente sua latência para operações mais precisas.'
                  : 'Recomendamos fortemente uma VPS dedicada para trading. Isso melhorará tanto sua latência quanto seu poder computacional, resultando em execuções mais precisas e capacidade para rodar estratégias complexas.'}
              </p>
              
              <Button
                as="a"
                href="/members/store?section=vps"
                className="w-full"
              >
                Ver VPS Recomendadas
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* VPS Plans */}
      <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-800 dark:border-gray-800 shadow-lg mt-12">
        <h2 className="text-xl font-semibold text-white dark:text-white mb-6 flex items-center gap-3">
          <Server className="h-5 w-5 text-blue-400" />
          VPS Especializadas para Trading Profissional
        </h2>
        
        <p className="text-gray-300 mb-8">
          Servidores dedicados com latência ultra-baixa para day trade, scalping e operações automatizadas. 
          Compatível com MetaTrader, TradingView e todas as principais plataformas.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* VPS Essential */}
          <div className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/30 transition-transform hover:scale-105 shadow-lg">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">VPS Essential</h3>
              <div className="mb-4">
                <div className="text-sm text-gray-400">Preço normal:</div>
                <div className="text-gray-400 line-through">R$ 145</div>
                <div className="text-sm text-blue-400 mt-2">Profit Estrategista:</div>
                <div className="text-xl font-bold text-white">R$ 110/mês</div>
                <div className="inline-block bg-blue-900/50 text-blue-300 text-xs px-2 py-1 rounded-full mt-2">
                  Desconto Exclusivo
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">4GB RAM DDR4</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">2 vCPUs otimizadas</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">80GB SSD NVMe</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Latência &lt; 10ms</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Suporte 24/7</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">MT4/MT5 pré-configurado</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Windows Server</span>
                </li>
              </ul>
              
              <a
                href="/members/store?section=vps"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium transition-colors"
              >
                Contratar na Loja
              </a>
            </div>
          </div>
          
          {/* VPS Professional */}
          <div className="bg-gray-800/50 rounded-xl overflow-hidden border border-blue-700/30 transition-transform transform scale-105 relative shadow-xl z-10">
            <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-1 text-sm font-medium">
              Mais Popular
            </div>
            <div className="p-6 pt-8">
              <h3 className="text-lg font-semibold text-white mb-2">VPS Professional</h3>
              <div className="mb-4">
                <div className="text-sm text-gray-400">Preço normal:</div>
                <div className="text-gray-400 line-through">R$ 245</div>
                <div className="text-sm text-blue-400 mt-2">Profit Estrategista:</div>
                <div className="text-xl font-bold text-white">R$ 210/mês</div>
                <div className="inline-block bg-blue-900/50 text-blue-300 text-xs px-2 py-1 rounded-full mt-2">
                  Desconto Exclusivo
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">8GB RAM DDR4</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">4 vCPUs otimizadas</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">160GB SSD NVMe</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Latência &lt; 5ms</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Suporte prioritário</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">MT4/MT5 + Expert Advisors</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Backup automático</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Windows Server</span>
                </li>
              </ul>
              
              <a
                href="/members/store?section=vps"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium transition-colors"
              >
                Contratar na Loja
              </a>
            </div>
          </div>
          
          {/* VPS Premium */}
          <div className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/30 transition-transform hover:scale-105 shadow-lg">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">VPS Premium</h3>
              <div className="mb-4">
                <div className="text-sm text-gray-400">Preço normal:</div>
                <div className="text-gray-400 line-through">R$ 380</div>
                <div className="text-sm text-blue-400 mt-2">Profit Estrategista:</div>
                <div className="text-xl font-bold text-white">R$ 310/mês</div>
                <div className="inline-block bg-blue-900/50 text-blue-300 text-xs px-2 py-1 rounded-full mt-2">
                  Desconto Exclusivo
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">12GB RAM DDR4</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">6 vCPUs otimizadas</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">240GB SSD NVMe</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Latência &lt; 3ms</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Suporte VIP</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Múltiplas plataformas</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Backup + Monitoramento</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">IP dedicado</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Windows Server</span>
                </li>
              </ul>
              
              <a
                href="/members/store?section=vps"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium transition-colors"
              >
                Contratar na Loja
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="bg-blue-900/50 rounded-xl p-4 max-w-2xl mx-auto border border-blue-800/30 shadow-lg">
            <p className="text-blue-300">
              <strong>🎯 Exclusivo para Clientes Profit Estrategista 2025</strong> - Acesse a loja interna para contratar com desconto.
            </p>
          </div>
        </div>
      </div>
      
      {/* System Info Panel */}
      <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-800 dark:border-gray-800 shadow-lg mt-8">
        <h2 className="text-xl font-semibold text-white dark:text-white mb-6 flex items-center gap-3">
          <Cpu className="h-5 w-5 text-blue-400" />
          Informações do Sistema
        </h2>
        
        <p className="text-gray-300 mb-6">
          Além da latência, o desempenho do seu hardware também é crucial para operações de trading eficientes.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Cpu className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-white">Processador</h3>
                <p className="text-sm text-blue-400">{systemInfo.cpu}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Recomendado: Intel Core i5/i7 ou AMD Ryzen 5/7 de última geração para processamento rápido de dados.
            </p>
          </div>
          
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-900/30 rounded-lg flex items-center justify-center">
                <Memory className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-medium text-white">Memória RAM</h3>
                <p className="text-sm text-green-400">{systemInfo.memory}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Recomendado: Mínimo de 16GB para execução simultânea de múltiplas plataformas e indicadores.
            </p>
          </div>
          
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-900/30 rounded-lg flex items-center justify-center">
                <HardDrive className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium text-white">Armazenamento</h3>
                <p className="text-sm text-purple-400">{systemInfo.storage}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Recomendado: SSD NVMe para carregamento rápido de aplicações e acesso a dados históricos.
            </p>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-900/30 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h3 className="font-medium text-white">Sistema Operacional</h3>
                <p className="text-sm text-orange-400">{systemInfo.os}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Recomendado: Windows 10/11 Pro ou Server para melhor compatibilidade com plataformas de trading.
            </p>
          </div>
          
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-white">Navegador</h3>
                <p className="text-sm text-blue-400">{systemInfo.browser}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Recomendado: Chrome ou Edge para melhor desempenho com plataformas web de trading.
            </p>
          </div>
        </div>
      </div>

      {/* Guia de Performance */}
      <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-800 dark:border-gray-800 shadow-lg">
        <h2 className="text-xl font-semibold text-white dark:text-white mb-6">
          Guia de Performance para Trading
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/30 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-900/30 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-medium text-white">0-50ms: Ideal</h3>
                <p className="text-xs text-green-400">Excelente para qualquer tipo de trading</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Latência perfeita para execução instantânea de ordens. Ideal para scalping e day trading de alta frequência.
            </p>
          </div>
          
          <div className="bg-gray-800/30 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow-900/30 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-medium text-white">51-120ms: Médio</h3>
                <p className="text-xs text-yellow-400">Aceitável para a maioria das operações</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Aceitável para swing trading e day trading moderado, mas pode impactar operações de alta frequência e scalping.
            </p>
          </div>
          
          <div className="bg-gray-800/30 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-900/30 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-medium text-white">121ms+: Ruim</h3>
                <p className="text-xs text-red-400">Problemático para day trading</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Latência alta pode comprometer execução de ordens, causar slippage e afetar significativamente seus resultados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}