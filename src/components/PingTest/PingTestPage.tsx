import React, { useState, useEffect } from 'react';
import { Zap, Clock, ArrowRight, Mail, User } from 'lucide-react';
import { Button } from '../Button';
import LandingHero from './LandingHero';
import PingResultsPage from './PingResultsPage';
import { sendToRDStation } from '../../lib/rdStationWorker';
import { useAuth } from '../../contexts/AuthContext';

interface PingResult {
  average: number;
  classification: 'ideal' | 'medio' | 'ruim';
  results: number[];
}

export function PingTestPage() {
  const { user } = useAuth();
  const [step, setStep] = useState<'landing' | 'testing' | 'lead' | 'results'>('landing');
  const [pingResults, setPingResults] = useState<number[]>([]);
  const [finalResult, setFinalResult] = useState<PingResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [leadData, setLeadData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Função para simular ping
  const simulatePing = () => {
    // Valores aleatórios entre 20ms e 200ms
    return Math.random() * 180 + 20;
  };

  // Iniciar teste
  const startTest = () => {
    // Redirecionar para login se não estiver logado
    if (!user) {
      window.open('https://profitestrategista.com.br/login', '_blank');
      return;
    }
    
    setStep('testing');
    setPingResults([]);
    setProgress(0);
    runPingTests();
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
        
        setFinalResult({
          average: Math.round(average),
          classification,
          results
        });
        
        // Se o usuário estiver logado, mostrar resultados diretamente
        // Caso contrário, pedir dados de contato
        if (user) {
          setStep('results');
        } else {
          setStep('lead');
        }
      }
    };

    runTest();
  };

  // Lidar com envio do formulário de lead
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!leadData.email || !leadData.name) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Preparar dados para o RD Station
      const rdStationData = {
        email: leadData.email,
        name: leadData.name,
        tags: ['Website', 'Teste de Ping', 'Lead'],
        traffic_source: document.referrer || 'Direct',
        cf_resultado_ping: finalResult?.average,
        cf_classificacao_ping: finalResult?.classification,
        identificador: "Teste de Ping"
      };
      
      // Enviar para o RD Station
      const result = await sendToRDStation(rdStationData, "Teste de Ping");
      console.log('Resultado do envio para RD Station:', result);
      
      // Mostrar resultados
      setStep('results');
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      setError('Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Voltar para o teste
  const backToTest = () => {
    setStep('landing');
    setPingResults([]);
    setFinalResult(null);
  };

  // Renderizar página de acordo com o passo atual
  if (step === 'landing') {
    return <LandingHero onStartTest={startTest} />;
  }

  if (step === 'testing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto relative">
                <Zap className="w-12 h-12 text-white" />
                <div className="absolute inset-0 rounded-full border-4 border-blue-400 border-t-transparent animate-spin"></div>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Testando sua conexão...
            </h2>
            
            <div className="mb-8">
              <div className="h-3 bg-blue-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="mt-2 text-blue-300 text-sm">
                {Math.round(progress)}% concluído
              </div>
            </div>
            
            <div className="bg-blue-900/50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
                <Clock className="w-5 h-5" />
                Resultados Parciais
              </h3>
              
              <div className="grid grid-cols-5 gap-4">
                {[0, 1, 2, 3, 4].map((index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm text-blue-300 mb-1">Teste {index + 1}</div>
                    <div className="text-xl font-bold">
                      {pingResults[index] 
                        ? `${Math.round(pingResults[index])}ms` 
                        : '-'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <p className="text-blue-200 text-lg">
              Estamos realizando múltiplas medições para garantir a precisão do resultado.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'lead') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold mb-2">
                Seu resultado está pronto!
              </h2>
              
              <p className="text-blue-200">
                Preencha seus dados para ver a análise completa da sua conexão
              </p>
            </div>
            
            {error && (
              <div className="bg-red-900/50 border border-red-800 rounded-lg p-4 mb-6 text-red-200 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLeadSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-blue-200 mb-1">
                  Nome Completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={leadData.name}
                    onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                    className="block w-full pl-10 pr-3 py-3 border border-blue-700 rounded-xl bg-blue-900/50 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={leadData.email}
                    onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                    className="block w-full pl-10 pr-3 py-3 border border-blue-700 rounded-xl bg-blue-900/50 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 group"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Ver Meus Resultados'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <p className="text-xs text-blue-300 text-center">
                Ao enviar, você concorda em receber comunicações da Profit Estrategista.
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'results' && finalResult) {
    return <PingResultsPage pingResult={finalResult} onBackToTest={backToTest} />;
  }

  return null;
}