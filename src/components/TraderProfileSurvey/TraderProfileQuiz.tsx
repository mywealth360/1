import React, { useState } from 'react';
import { ChevronRight, TrendingUp, Target, DollarSign, BarChart3, Zap, Users, Building2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { sendToRDStation } from '../../lib/rdStationWorker';

interface Question {
  id: string;
  question: string;
  options: { value: string; text: string; profiles: string[] }[];
}

interface Profile {
  name: string;
  icon: React.ReactNode;
  description: string;
  characteristics: string[];
  bestSetups: string[];
  timeframe: string;
  riskLevel: string;
  color: string;
  recommendation: string;
  description2: string;
}

const questions: Question[] = [
  {
    id: 'time',
    question: 'Quanto tempo você tem disponível para analisar o mercado diariamente?',
    options: [
      { value: 'less-1h', text: 'Menos de 1 hora', profiles: ['scalper', 'copy'] },
      { value: '1-3h', text: '1 a 3 horas', profiles: ['scalper', 'swing'] },
      { value: '3-6h', text: '3 a 6 horas', profiles: ['trend', 'swing'] },
      { value: 'more-6h', text: 'Mais de 6 horas', profiles: ['institutional', 'trend'] }
    ]
  },
  {
    id: 'emotion',
    question: 'Como você reage quando uma posição está no prejuízo?',
    options: [
      { value: 'panic', text: 'Fico nervoso e quero fechar rapidamente', profiles: ['copy', 'swing'] },
      { value: 'neutral', text: 'Mantenho a calma e sigo meu plano', profiles: ['trend', 'institutional'] },
      { value: 'aggressive', text: 'Dobro a posição para recuperar mais rápido', profiles: ['scalper'] },
      { value: 'analytical', text: 'Analiso os dados antes de decidir', profiles: ['institutional', 'trend'] }
    ]
  },
  {
    id: 'knowledge',
    question: 'Qual seu nível de experiência com trading?',
    options: [
      { value: 'beginner', text: 'Iniciante - Nunca operei ou tenho pouca experiência', profiles: ['copy', 'swing'] },
      { value: 'intermediate', text: 'Intermediário - Já opero há alguns meses', profiles: ['swing', 'trend'] },
      { value: 'advanced', text: 'Avançado - Opero há mais de 1 ano com consistência', profiles: ['scalper', 'institutional'] },
      { value: 'expert', text: 'Expert - Quero criar minha própria estratégia', profiles: ['institutional'] }
    ]
  },
  {
    id: 'capital',
    question: 'Qual o valor aproximado que você pretende investir?',
    options: [
      { value: 'small', text: 'Até R$ 5.000', profiles: ['copy', 'swing'] },
      { value: 'medium', text: 'R$ 5.000 a R$ 50.000', profiles: ['scalper', 'trend'] },
      { value: 'large', text: 'R$ 50.000 a R$ 500.000', profiles: ['institutional', 'trend'] },
      { value: 'very-large', text: 'Mais de R$ 500.000', profiles: ['institutional'] },
      { value: 'no-capital', text: 'Não tenho capital, mas tenho experiência', profiles: ['mesa'] }
    ]
  },
  {
    id: 'frequency',
    question: 'Com que frequência você gostaria de fazer operações?',
    options: [
      { value: 'multiple-daily', text: 'Várias vezes por dia', profiles: ['scalper'] },
      { value: 'daily', text: 'Uma vez por dia', profiles: ['scalper', 'trend'] },
      { value: 'weekly', text: 'Algumas vezes por semana', profiles: ['swing', 'trend'] },
      { value: 'monthly', text: 'Algumas vezes por mês', profiles: ['institutional', 'swing'] }
    ]
  },
  {
    id: 'risk',
    question: 'Qual seu apetite ao risco?',
    options: [
      { value: 'conservative', text: 'Conservador - Prefiro ganhos consistentes', profiles: ['copy', 'institutional'] },
      { value: 'moderate', text: 'Moderado - Aceito riscos calculados', profiles: ['swing', 'trend'] },
      { value: 'aggressive', text: 'Agressivo - Busco altos retornos', profiles: ['scalper', 'trend'] },
      { value: 'very-aggressive', text: 'Muito agressivo - Aceito perdas grandes', profiles: ['scalper'] }
    ]
  },
  {
    id: 'system',
    question: 'Você já tem um sistema operacional bem definido?',
    options: [
      { value: 'no-system', text: 'Não, ainda estou aprendendo', profiles: ['copy'] },
      { value: 'basic-system', text: 'Tenho algumas regras básicas', profiles: ['swing', 'trend'] },
      { value: 'defined-system', text: 'Sim, mas não é consistentemente lucrativo', profiles: ['scalper', 'trend'] },
      { value: 'profitable-system', text: 'Sim, e já é lucrativo', profiles: ['institutional'] }
    ]
  },
  {
    id: 'focus',
    question: 'O que mais te motiva no trading?',
    options: [
      { value: 'quick-money', text: 'Ganhos rápidos e frequentes', profiles: ['scalper'] },
      { value: 'consistent-income', text: 'Renda passiva consistente', profiles: ['copy', 'institutional'] },
      { value: 'skill-development', text: 'Desenvolver habilidades de análise', profiles: ['trend', 'institutional'] },
      { value: 'market-beating', text: 'Superar o mercado consistentemente', profiles: ['swing', 'trend'] }
    ]
  }
];

const profiles: Record<string, Profile> = {
  scalper: {
    name: 'Scalper',
    icon: <Zap className="w-8 h-8" />,
    description: 'Trader de alta frequência que busca lucros rápidos em movimentos pequenos',
    characteristics: ['Operações de segundos a minutos', 'Alta frequência de trades', 'Foco em liquidez', 'Gerenciamento rigoroso de risco'],
    bestSetups: ['Breakout de consolidação', 'Reversão em suporte/resistência', 'Scalping de tape reading'],
    timeframe: '1 a 5 minutos',
    riskLevel: 'Alto',
    color: 'from-orange-500 to-red-500',
    recommendation: 'Carteira Scalper no Clube de Robôs',
    description2: 'Perfeito para quem quer lucros rápidos com operações de alta frequência'
  },
  trend: {
    name: 'Trend Following',
    icon: <TrendingUp className="w-8 h-8" />,
    description: 'Trader que segue tendências de médio prazo com análise técnica robusta',
    characteristics: ['Segue tendências estabelecidas', 'Análise técnica detalhada', 'Paciência para aguardar setups', 'Gestão de risco moderada'],
    bestSetups: ['Rompimento de máximas/mínimas', 'Pullback em tendência', 'Cruzamento de médias móveis'],
    timeframe: '1 hora a 1 dia',
    riskLevel: 'Moderado',
    color: 'from-blue-500 to-cyan-500',
    recommendation: 'Pack Hunter Estratégico',
    description2: 'Ideal para traders que preferem análise mais profunda e setups de qualidade'
  },
  copy: {
    name: 'Copy Trading',
    icon: <Users className="w-8 h-8" />,
    description: 'Trader que replica estratégias de traders experientes automaticamente',
    characteristics: ['Automação de estratégias', 'Baixo tempo de dedicação', 'Diversificação de traders', 'Aprendizado por observação'],
    bestSetups: ['Cópia de scalpers profissionais', 'Diversificação entre estilos', 'Gestão automática de risco'],
    timeframe: 'Automático',
    riskLevel: 'Baixo a Moderado',
    color: 'from-green-500 to-emerald-500',
    recommendation: 'Copy Trading no Clube de Robôs',
    description2: 'Perfeito para iniciantes que querem aprender copiando traders experientes'
  },
  swing: {
    name: 'Swing Trading',
    icon: <BarChart3 className="w-8 h-8" />,
    description: 'Trader que mantém posições por dias ou semanas capturando movimentos maiores',
    characteristics: ['Posições de médio prazo', 'Análise fundamentalista', 'Menor frequência de trades', 'Foco em qualidade dos setups'],
    bestSetups: ['Reversão em suportes/resistências', 'Padrões gráficos', 'Divergências em osciladores'],
    timeframe: '4 horas a 7 dias',
    riskLevel: 'Moderado',
    color: 'from-purple-500 to-pink-500',
    recommendation: 'Pack Hunter Estratégico',
    description2: 'Ideal para quem tem menos tempo mas quer operações de qualidade'
  },
  institutional: {
    name: 'Institucional',
    icon: <Building2 className="w-8 h-8" />,
    description: 'Trader sofisticado que usa análise quantitativa e estratégias complexas',
    characteristics: ['Análise quantitativa avançada', 'Estratégias multi-ativo', 'Gestão de portfólio', 'Uso de algoritmos proprietários'],
    bestSetups: ['Arbitragem estatística', 'Mean reversion', 'Momentum factors'],
    timeframe: '1 dia a 30 dias',
    riskLevel: 'Controlado',
    color: 'from-gray-700 to-gray-900',
    recommendation: 'Desenvolvimento de Robô Próprio',
    description2: 'Para traders experientes que querem criar suas próprias estratégias automatizadas'
  },
  mesa: {
    name: 'Mesa Proprietária',
    icon: <Building2 className="w-8 h-8" />,
    description: 'Trader experiente que opera com capital da empresa, sem risco próprio',
    characteristics: ['Opera com capital da empresa', 'Sem risco de capital próprio', 'Foco em performance', 'Divisão de lucros com a mesa'],
    bestSetups: ['Estratégias de alta performance', 'Gestão rigorosa de risco', 'Operações escaláveis'],
    timeframe: 'Flexível',
    riskLevel: 'Sem risco próprio',
    color: 'from-emerald-600 to-teal-600',
    recommendation: 'Mesa Proprietária',
    description2: 'Opere com capital da empresa e ganhe sem arriscar seu próprio dinheiro'
  }
};

export function TraderProfileQuiz() {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = async (questionId: string, answer: string) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      await calculateResult(newAnswers);
    }
  };

  const calculateResult = async (allAnswers: Record<string, string>) => {
    const profileScores: Record<string, number> = {
      scalper: 0,
      trend: 0,
      copy: 0,
      swing: 0,
      institutional: 0,
      mesa: 0
    };

    questions.forEach((question) => {
      const answer = allAnswers[question.id];
      const option = question.options.find(opt => opt.value === answer);
      if (option) {
        option.profiles.forEach(profile => {
          profileScores[profile] += 1;
        });
      }
    });

    // Se escolheu "não tenho capital mas tenho experiência", força mesa proprietária
    if (allAnswers.capital === 'no-capital') {
      setResult('mesa');
      setShowResult(true);
      
      // Salvar resultado no banco de dados se o usuário estiver logado
      if (user) {
        try {
          await saveResultToDatabase('mesa', profileScores, allAnswers);
        } catch (error) {
          console.error('Erro ao salvar resultado:', error);
        }
      }
      
      return;
    }

    const topProfile = Object.entries(profileScores).reduce((a, b) => 
      profileScores[a[0]] > profileScores[b[0]] ? a : b
    )[0];

    setResult(topProfile);
    setShowResult(true);
    
    // Salvar resultado no banco de dados se o usuário estiver logado
    if (user) {
      try {
        await saveResultToDatabase(topProfile, profileScores, allAnswers);
      } catch (error) {
        console.error('Erro ao salvar resultado:', error);
      }
    }
  };
  
  const saveResultToDatabase = async (
    profileResult: string, 
    scores: Record<string, number>,
    allAnswers: Record<string, string>
  ) => {
    if (!user) return;
    
    try {
      // Salvar no Supabase
      const { error } = await supabase
        .from('trader_profile_results')
        .insert({
          user_id: user.id,
          profile_result: profileResult,
          profile_scores: scores,
          answers: allAnswers,
          created_at: new Date().toISOString()
        });
        
      if (error) {
        console.error('Erro ao salvar no Supabase:', error);
        return;
      }
      
      // Preparar dados para o RD Station
      const rdStationData = {
        email: user.email,
        name: user.email?.split('@')[0] || '',
        tags: ['Website', 'Perfil de Trader', 'Área de Membros'],
        traffic_source: 'Members Area',
        cf_perfil_trader: profileResult,
        cf_respostas_quiz: JSON.stringify(allAnswers),
        identificador: "Perfil de Trader"
      };
      
      // Enviar para RD Station
      await sendToRDStation(rdStationData, "Perfil de Trader");
      
    } catch (error) {
      console.error('Erro ao processar resultado:', error);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult('');
    setShowResult(false);
  };

  const getRecommendationLink = (profile: string) => {
    switch (profile) {
      case 'scalper':
      case 'copy':
        return 'https://profitestrategista.com.br/clube-de-robos';
      case 'trend':
      case 'swing':
        return 'https://profitestrategista.com.br/copy-trade';
      case 'institutional':
        return 'https://profitestrategista.com.br/consultoria';
      case 'mesa':
        return 'https://profitestrategista.com.br/mesa-proprietaria';
      default:
        return 'https://profitestrategista.com.br/clube-de-robos';
    }
  };

  const resultProfile = result ? profiles[result] : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white dark:text-white">
          Descubra seu Perfil de Trader
        </h1>
        <p className="mt-2 text-gray-300 dark:text-gray-300">
          Responda algumas perguntas para descobrir qual estratégia é ideal para você
        </p>
      </div>

      <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-800 dark:border-gray-800 shadow-lg">
        {!showResult ? (
          <div>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-orange-400 font-semibold">
                  Pergunta {currentQuestion + 1} de {questions.length}
                </span>
                <span className="text-gray-400">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}% completo
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                {questions[currentQuestion].question}
              </h2>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
                    className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/50 rounded-xl p-4 transition-all duration-300 text-white hover:scale-[1.02] group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{option.text}</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : resultProfile ? (
          <div>
            <div className="text-center mb-12">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${resultProfile.color} text-white mb-6`}>
                {resultProfile.icon}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Seu perfil é <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">{resultProfile.name}</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                {resultProfile.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-orange-400" />
                  Características do seu perfil
                </h3>
                <ul className="space-y-3">
                  {resultProfile.characteristics.map((char, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{char}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-orange-400" />
                  Seus setups ideais
                </h3>
                <ul className="space-y-3">
                  {resultProfile.bestSetups.map((setup, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{setup}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-orange-500/30 mb-12">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Timeframe Ideal</div>
                  <div className="text-lg font-bold text-white">{resultProfile.timeframe}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Nível de Risco</div>
                  <div className="text-lg font-bold text-white">{resultProfile.riskLevel}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Compatibilidade</div>
                  <div className="text-lg font-bold text-orange-400">95%</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-8 border border-orange-500/30 mb-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  🎯 {resultProfile.description2}
                </h3>
                <p className="text-gray-300 mb-6">
                  {result === 'scalper' && 'Conheça a Carteira Scalper no Clube de Robôs do Profit Estrategista e descubra os setups que mais lucram em movimentos curtos'}
                  {result === 'copy' && 'Comece com Copy Trading no Clube de Robôs e aprenda copiando os melhores traders do mercado'}
                  {(result === 'trend' || result === 'swing') && 'Acesse o Pack Hunter Estratégico e domine as estratégias mais rentáveis para seu perfil'}
                  {result === 'institutional' && 'Aprenda a desenvolver seu próprio robô com estratégias personalizadas para seu estilo de trading'}
                  {result === 'mesa' && 'Opere com capital da empresa na Mesa Proprietária e ganhe sem arriscar seu próprio dinheiro'}
                </p>
                <a 
                  href={getRecommendationLink(result)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25 flex items-center mx-auto space-x-2 w-fit"
                >
                  <span>
                    {result === 'scalper' && 'Conhecer a Carteira Scalper'}
                    {result === 'copy' && 'Começar com Copy Trading'}
                    {(result === 'trend' || result === 'swing') && 'Acessar Pack Hunter Estratégico'}
                    {result === 'institutional' && 'Criar Meu Próprio Robô'}
                    {result === 'mesa' && 'Conhecer a Mesa Proprietária'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <p className="text-sm text-gray-400 mt-4">
                  ⭐ Profit Estrategista - Mais de 10.000 traders ativos
                </p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={resetQuiz}
                className="text-orange-400 hover:text-orange-300 transition-colors underline"
              >
                Refazer o teste
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-300">Carregando resultado...</p>
          </div>
        )}
      </div>
    </div>
  );
}