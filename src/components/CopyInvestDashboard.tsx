import { Button } from './Button';
import { ArrowRight, AlertCircle, Check, BarChart as ChartBar, Bot, Shield, Users, ArrowUpRight } from 'lucide-react';
import { usePlan } from '../contexts/PlanContext';
import { resourceLinks, stripeLinks } from '../lib/robotLinks';

export function CopyInvestDashboard() {
  const { currentPlan } = usePlan();
  const hasCopyInvest = currentPlan === 'pro' || currentPlan === 'Copy Trade';

  return (
    <div className="space-y-8">
      <div>
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 text-white border border-gray-700/30 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-gray-700/30 flex items-center justify-center">
              <ChartBar className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
            Copy Trade
              </h1>
              <p className="text-xl text-gray-200">
                Renda Mensal Automática com Algoritmos Avançados
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="h-5 w-5 text-gray-200" />
                <span className="text-gray-100">Automação Total</span>
              </div>
              <p className="text-sm text-gray-200">
                Operações 100% automatizadas via BTG Pactual
              </p>
            </div>
            
            <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-gray-200" />
                <span className="text-gray-100">Gestão Profissional</span>
              </div>
              <p className="text-sm text-gray-200">
                Estratégias geridas por especialistas
              </p>
            </div>
            
            <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-gray-200" />
                <span className="text-gray-100">Vagas Limitadas</span>
              </div>
              <p className="text-sm text-gray-200">
                Apenas 50 vagas disponíveis por estratégia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {!hasCopyInvest && (
              <div className="bg-gray-800/30 rounded-lg p-4 mb-4 w-full border border-gray-700/30">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-gray-200" />
                  <span className="text-gray-100 font-medium">Até 50% OFF no primeiro mês</span>
                </div>
                <p className="text-sm text-gray-200 mb-4">
                  Experimente o Copy Trade pela Nelogica com 50% OFF no primeiro mês e opere em conta real e simulador.
                </p>
              </div>
            )}
            <Button
              as="a"
              href="https://form.respondi.app/MnbrQZ6E"
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-white text-gray-900 hover:bg-gray-100 ${!hasCopyInvest ? 'flex-1' : ''}`}
            >
              Cadastrar na Tridar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {hasCopyInvest && (
              <Button
                as="a"
                href="https://tridar.log.br/login"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Acessar Dashboard Tridar
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 text-white border border-gray-700/30 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-gray-700/30 flex items-center justify-center">
              <ChartBar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Resultados e Performance
              </h2>
              <p className="text-gray-200">
                Acompanhe seus resultados em tempo real
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
              <div className="text-sm text-gray-200">Taxa de Acerto</div>
              <div className="text-2xl font-bold text-white">59.8%</div>
            </div>
            <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
              <div className="text-sm text-gray-200">Payoff</div>
              <div className="text-2xl font-bold text-white">1.63</div>
            </div>
          </div>
          
          <p className="text-gray-200 mb-6">
            Acesse a plataforma Tridar para visualizar seus resultados detalhados e gerenciar suas operações de copy trading.
          </p>

            <Button
              as="a"
              href="https://tridar.log.br/login"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white text-gray-900 hover:bg-gray-100 group"
            >
              Ver Resultados na Tridar
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 text-white border border-gray-700/30 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-gray-700/30 flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
              Cadastro Plataforma Tridar
              </h2>
              <p className="text-gray-200">
                Gerencie suas operações automatizadas
              </p>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
                        <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-gray-200 mt-0.5" />
              <div>
                <h4 className="font-medium text-white">Contratar o Metatrader 5 no BTG no formato NETTING</h4>
                <p className="text-sm text-gray-200">Seguir passo a passo na aba tutoriais</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-gray-200 mt-0.5" />
              <div>
                <h4 className="font-medium text-white">Cadastrar suas informações no formulário</h4>
                <p className="text-sm text-gray-200">Preencha dados pessoais</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-gray-200 mt-0.5" />
              <div>
                <h4 className="font-medium text-white">Dashboard Cliente</h4>
                <p className="text-sm text-gray-200">Controle total de seu resultado</p>
              </div>
            </div>

          </div>

            <Button
              as="a"
              href="https://form.respondi.app/MnbrQZ6E"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white text-gray-900 hover:bg-gray-100 group"
            >
              Cadastrar Metatrader 5
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </div>
      </div>
    </div>
  );
}