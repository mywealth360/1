import React, { useState } from 'react';
import { Calculator, Target, BarChart3, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

interface CalculatorData {
  capital: string;
  pontosStop: string;
  pontosAlvo: string;
  perdaMaxima: string;
  instrumento: 'WIN' | 'WDO' | 'BITFUT';
}

function DayTradeCalculator() {
  const navigate = useNavigate();
  const [data, setData] = useState<CalculatorData>({
    capital: '',
    pontosStop: '',
    pontosAlvo: '',
    perdaMaxima: '2',
    instrumento: 'WIN'
  });

  const [results, setResults] = useState<any>(null);

  const instrumentMultipliers = {
    WIN: 0.2,
    WDO: 10,
    BITFUT: 0.1
  };

  const calculatePosition = () => {
    const capital = parseFloat(data.capital);
    const pontosStop = parseFloat(data.pontosStop);
    const pontosAlvo = parseFloat(data.pontosAlvo);
    const perdaMaxima = parseFloat(data.perdaMaxima);
    const multiplier = instrumentMultipliers[data.instrumento];

    if (!capital || !pontosStop || !pontosAlvo || !perdaMaxima) return;

    const perdaMaximaReais = (capital * perdaMaxima) / 100;
    const perdaPorContrato = pontosStop * multiplier;
    const contratos = Math.floor(perdaMaximaReais / perdaPorContrato);
    const ganhoPorContrato = pontosAlvo * multiplier;
    const ganhoTotal = contratos * ganhoPorContrato;
    const payoff = ganhoTotal / perdaMaximaReais;

    setResults({
      contratos,
      perdaMaximaReais,
      perdaPorContrato,
      ganhoTotal,
      payoff,
      ganhoPorContrato
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4">
      {/* Navigation Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate('/members')}
          className="flex items-center gap-2 border-gray-700 text-gray-300"
        >
          <ArrowLeft className="h-5 w-5" />
          Voltar para Área de Membros
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-white dark:text-white mb-2">
          Calculadora Day Trade
        </h1>
        <p className="mt-2 text-gray-300 dark:text-gray-300">
          Calculadora profissional de risco para futuros B3
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Formulário */}
        <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-800 dark:border-gray-800 shadow-lg">
          <h2 className="text-xl font-semibold text-white dark:text-white mb-6 flex items-center gap-3">
            <Calculator className="h-5 w-5" />
            Parâmetros de Cálculo
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1.5">
                Capital Total (R$)
              </label>
              <input
                type="number"
                value={data.capital}
                onChange={(e) => setData({ ...data, capital: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-700 dark:border-gray-700 bg-gray-800 dark:bg-gray-800 text-white dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: 10000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1.5">
                Instrumento
              </label>
              <select
                value={data.instrumento}
                onChange={(e) => setData({ ...data, instrumento: e.target.value as 'WIN' | 'WDO' | 'BITFUT' })}
                className="w-full px-4 py-2 rounded-lg border border-gray-700 dark:border-gray-700 bg-gray-800 dark:bg-gray-800 text-white dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="WIN">WIN (Mini Índice)</option>
                <option value="WDO">WDO (Mini Dólar)</option>
                <option value="BITFUT">BITFUT (Bitcoin Futuro)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1.5">
                Stop Loss (pontos)
              </label>
              <input
                type="number"
                value={data.pontosStop}
                onChange={(e) => setData({ ...data, pontosStop: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-700 dark:border-gray-700 bg-gray-800 dark:bg-gray-800 text-white dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: 100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1.5">
                Take Profit (pontos)
              </label>
              <input
                type="number"
                value={data.pontosAlvo}
                onChange={(e) => setData({ ...data, pontosAlvo: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-700 dark:border-gray-700 bg-gray-800 dark:bg-gray-800 text-white dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: 200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1.5">
                Perda Máxima (%)
              </label>
              <input
                type="number"
                value={data.perdaMaxima}
                onChange={(e) => setData({ ...data, perdaMaxima: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-700 dark:border-gray-700 bg-gray-800 dark:bg-gray-800 text-white dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: 2"
                step="0.1"
              />
            </div>

            <Button
              onClick={calculatePosition}
              className="w-full mt-2"
            >
              Calcular Posição
            </Button>
          </div>
        </div>

        {/* Resultados */}
        <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-800 dark:border-gray-800 shadow-lg">
          <h2 className="text-xl font-semibold text-white dark:text-white mb-6 flex items-center gap-3">
            <BarChart3 className="h-5 w-5" />
            Resultados
          </h2>

          {results ? (
            <div className="space-y-4">
              <div className="bg-gray-800/50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
                <div className="text-sm text-gray-300 dark:text-gray-300">Quantidade de Contratos</div>
                <div className="text-2xl font-bold text-white dark:text-white">{results.contratos}</div>
              </div>

              <div className="bg-gray-800/50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
                <div className="text-sm text-gray-300 dark:text-gray-300">Perda Máxima</div>
                <div className="text-2xl font-bold text-red-400 dark:text-red-400">
                  R$ {results.perdaMaximaReais.toFixed(2)}
                </div>
              </div>

              <div className="bg-gray-800/50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
                <div className="text-sm text-gray-300 dark:text-gray-300">Ganho Potencial</div>
                <div className="text-2xl font-bold text-green-400 dark:text-green-400">
                  R$ {results.ganhoTotal.toFixed(2)}
                </div>
              </div>

              <div className="bg-gray-800/50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
                <div className="text-sm text-gray-300 dark:text-gray-300">Payoff (Risco/Retorno)</div>
                <div className="text-2xl font-bold text-blue-400 dark:text-blue-400">
                  1:{results.payoff.toFixed(2)}
                </div>
              </div>

              <div className="bg-gray-800/50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
                <div className="text-sm text-gray-300 dark:text-gray-300">Perda por Contrato</div>
                <div className="text-lg font-medium text-white dark:text-white">
                  R$ {results.perdaPorContrato.toFixed(2)}
                </div>
              </div>

              <div className="bg-gray-800/50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
                <div className="text-sm text-gray-300 dark:text-gray-300">Ganho por Contrato</div>
                <div className="text-lg font-medium text-white dark:text-white">
                  R$ {results.ganhoPorContrato.toFixed(2)}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-800/20 rounded-lg border border-gray-700/30">
              <Target className="h-12 w-12 text-gray-600 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 dark:text-gray-400">
                Preencha os parâmetros e clique em "Calcular Posição" para ver os resultados
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CalculatorDayTrade() {
  return <DayTradeCalculator />;
}