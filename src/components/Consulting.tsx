import { Button } from './Button';
import { Shield, BarChart as ChartBar, Bot, Settings, MessageSquare, Clock, ArrowRight, Check, Brain, Target, Zap, TrendingUp, Users, Laptop, Send } from 'lucide-react';
import { whatsappLinks } from '../lib/robotLinks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendToRDStation } from '../lib/rdStationWorker';

interface FormData {
  name: string;
  email: string;
  phone: string;
  market: string;
  description: string;
  budget: string;
}

export function Consulting() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    market: '',
    description: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSuccess('');
    
    try {
      console.log('Enviando dados do formulário "Crie seu robô"...');
      
      // Preparar dados para o RD Station no formato esperado
      const rdStationData = {
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        tags: ['Website', 'Orçamento Robô Personalizado'],
        traffic_source: document.referrer || 'Direct',
        // Campos customizados
        cf_mercado: formData.market,
        cf_modalidade: formData.budget,
        cf_estrategia: formData.description
      };
      
      // Salvar no localStorage como backup
      localStorage.setItem('robot_request_pending', JSON.stringify({
        ...rdStationData,
        timestamp: new Date().toISOString()
      }));
      
      // Tentar enviar diretamente para o RD Station usando o worker
      const result = await sendToRDStation(rdStationData);
      
      console.log('Resultado do envio para RD Station:', result);
      
      // Mostrar mensagem de sucesso
      setSuccess('Solicitação enviada com sucesso! Redirecionando...');
      
      // Format message for WhatsApp
      const message = `Nova Solicitação de Robô Personalizado\n\n` +
        `Nome: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Telefone: ${formData.phone}\n` +
        `Mercado: ${formData.market}\n` +
        `Modalidade: ${formData.budget}\n\n` +
        `Descrição:\n${formData.description}`;

      // Encode message for WhatsApp URL
      const encodedMessage = encodeURIComponent(message);
      
      // Store WhatsApp URL in localStorage
      localStorage.setItem('whatsappRedirect', `https://wa.me/message/A4462RJPMX34K1?text=${encodedMessage}`);
      
      // Pequeno delay antes de redirecionar
      setTimeout(() => {
        // Redirect to thank you page
        navigate('/obrigado');
      }, 1500);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      
      // Tente enviar para o RD Station novamente
      try {
        const rdStationData = {
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
          tags: ['Website', 'Orçamento Robô Personalizado', 'Retry'],
          identificador: "Orçamento Robô Personalizado"
        };
        
        // Apenas log - não esperar resultado
        sendToRDStation(rdStationData).catch(console.error);
      } catch (rdError) {
        console.error('Erro na segunda tentativa de enviar para RD:', rdError);
      }
      
      alert('Ocorreu um erro ao enviar seu formulário. Por favor, tente novamente ou entre em contato via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-blue-950 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Consultoria Especializada em Robôs de Trading e Algoritmos
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transforme sua operação com nossa consultoria especializada em desenvolvimento de robôs e estratégias algorítmicas para day trade, swing trade e investimentos
          </p>
        </div>

        {/* Custom Robot Request Form */}
        <div className="max-w-2xl mx-auto mb-24 bg-white dark:bg-blue-900/50 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-blue-800/50">
          <div className="flex items-center gap-3 mb-6">
            <Bot className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100" id="crie-seu-robo">
                Crie Seu Robô Personalizado
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Preencha o formulário abaixo para solicitar um orçamento de robô trader personalizado
              </p>
            </div>
          </div>

          {/* Disclaimer Section */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Informações Importantes
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <p>
                Ao solicitar o desenvolvimento de um robô personalizado:
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>O robô será desenvolvido com base nas especificações fornecidas abaixo</li>
                <li>Resultados passados não garantem retornos futuros</li>
                <li>O desenvolvimento inclui período de testes e ajustes</li>
                <li>Backtest e otimização fazem parte do processo de desenvolvimento</li>
                <li>Suporte técnico está incluso por 30 dias após a entrega</li>
                <li>Seu robô será orçado com base na complexidade e no número de funcionalidades e módulos incluídos</li>
                <li>Para dúvidas sobre valores entre em contato pelo WhatsApp: <a href={whatsappLinks.support} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">https://wa.me/message/A4462RJPMX34K1</a></li>
              </ul>
              <p className="mt-4 text-sm">
                <strong>Nota:</strong> Para melhor desenvolvimento do seu robô, forneça o máximo de detalhes possível sobre sua estratégia no formulário abaixo, incluindo parâmetros específicos, filtros de entrada/saída e qualquer particularidade importante. Evite criar solicitações com ChatGPT, organize as ideias você mesmo para simplificação da solicitação com melhor garantia de resultados.
              </p>
            </div>
          </div>

          <form 
            onSubmit={handleSubmit} 
            className="space-y-6" 
            name="orcamento_robo_personalizado" 
            id="orcamento-robo-personalizado"
          >
            {success && (
              <div className="bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-green-600 dark:text-green-400 text-sm">{success}</p>
              </div>
            )}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-blue-700 bg-white dark:bg-blue-800/50 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-blue-700 bg-white dark:bg-blue-800/50 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Telefone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-blue-700 bg-white dark:bg-blue-800/50 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label htmlFor="market" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mercado de Interesse
              </label>
              <select
                id="market"
                name="market"
                required
                value={formData.market}
                onChange={(e) => setFormData(prev => ({ ...prev, market: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-blue-700 bg-white dark:bg-blue-800/50 text-gray-900 dark:text-gray-100"
              >
                <option value="">Selecione um mercado</option>
                <option value="WIN">Mini Índice (WIN)</option>
                <option value="WDO">Mini Dólar (WDO)</option>
                <option value="Ações">Ações</option>
                <option value="Forex">Forex</option>
                <option value="Criptomoedas">Criptomoedas</option>
                <option value="Múltiplos">Múltiplos Mercados</option>
              </select>
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Modalidade do Robô
              </label>
              <select
                id="budget"
                name="budget"
                required
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-blue-700 bg-white dark:bg-blue-800/50 text-gray-900 dark:text-gray-100"
              >
                <option value="">Selecione a modalidade</option>
                <option value="Day Trade">Day Trade</option>
                <option value="Scalping">Scalping</option>
                <option value="Swing Trade">Swing Trade</option>
                <option value="Position">Position</option>
                <option value="Múltiplas">Múltiplas Modalidades</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Especificação da Estratégia
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder={`Descreva sua estratégia detalhadamente seguindo a estrutura abaixo:

1. Parâmetros de Entrada:
- Timeframe
- Quantidade de contratos
- Horários de operação

2. Filtros:
- Condições de mercado
- Volatilidade mínima/máxima
- Limites de drawdown

3. Condução:
- Regras de entrada
- Regras de saída
- Stop loss
- Take profit
- Breakeven

4. Indicadores:
- Lista de indicadores utilizados
- Configurações específicas
- Combinações de sinais

5. Observações:
- Particularidades da estratégia
- Comportamento esperado
- Situações específicas`}
              />
            </div>

            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              <Bot className="h-4 w-4" />
              {isSubmitting ? 'Enviando...' : 'Solicitar Robô e Agendar Reunião'}
            </Button>
          </form>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          <div className="bg-white dark:bg-blue-900/50 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-blue-800/50">
            <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Consultoria Estratégica
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Consultoria personalizada para mesas proprietárias com foco em otimização de resultados.
            </p>
          </div>

          <div className="bg-white dark:bg-blue-900/50 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-blue-800/50">
            <ChartBar className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Desenvolvimento de Estratégias
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Desenvolvimento e validação de estratégias automatizadas com backtesting profissional.
            </p>
          </div>

          <div className="bg-white dark:bg-blue-900/50 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-blue-800/50">
            <Bot className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Robôs Customizados
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Criação de robôs traders personalizados para suas necessidades específicas.
            </p>
          </div>

          <div className="bg-white dark:bg-blue-900/50 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-blue-800/50">
            <Settings className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Implementação e Otimização
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Consultoria completa de implementação e otimização de sistemas de trading.
            </p>
          </div>

          <div className="bg-white dark:bg-blue-900/50 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-blue-800/50">
            <MessageSquare className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Suporte Especializado
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Suporte técnico especializado na operação dos algoritmos e sistemas.
            </p>
          </div>

          <div className="bg-white dark:bg-blue-900/50 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-blue-800/50">
            <Clock className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Acompanhamento Contínuo
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Monitoramento e ajustes contínuos para garantir a performance das estratégias.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}