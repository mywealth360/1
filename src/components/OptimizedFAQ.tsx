import { useState } from 'react';
import { Button } from './Button';
import { HelpCircle, Search, ChevronDown, ChevronUp, Bot, Shield, Copy, Server, Settings, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

// FAQ categories and questions
const faqCategories = [
  {
    id: 'general',
    name: 'Geral',
    questions: [
      {
        id: 'what-is',
        question: 'O que é o Profit Estrategista?',
        answer: 'O Profit Estrategista é uma plataforma especializada em automação para trading, oferecendo robôs, estratégias automatizadas e suporte para traders de todos os níveis.',
        icon: <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
        popular: true
      },
      {
        id: 'how-to-start',
        question: 'Como faço para começar?',
        answer: 'Basta escolher um dos nossos produtos e seguir o manual de configuração. Se precisar de suporte, acesse nosso Manual de Ativação ou entre em contato pelo WhatsApp.',
        icon: <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      }
    ]
  },
  {
    id: 'products',
    name: 'Produtos',
    questions: [
      {
        id: 'main-products',
        question: 'Quais são os principais produtos oferecidos?',
        answer: 'Oferecemos o Robô GR PRO para gestão de risco, Clube de Robôs com estratégias automatizadas, e Copy Invest para seguir operações de traders profissionais.',
        icon: <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
        popular: true
      },
      {
        id: 'copy-invest',
        question: 'Como funciona o Copy Invest?',
        answer: 'O Copy Invest permite copiar automaticamente operações de traders experientes. Você conecta sua conta e as operações são replicadas em tempo real.',
        icon: <Copy className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
        popular: true
      }
    ]
  },
  {
    id: 'technical',
    name: 'Técnico',
    questions: [
      {
        id: 'markets',
        question: 'Os robôs funcionam para qualquer mercado?',
        answer: 'Sim! Temos estratégias para B3 (índice, dólar e ações) e também o Pack Global, voltado para ativos internacionais.',
        icon: <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      },
      {
        id: 'vps',
        question: 'Preciso de VPS para rodar os robôs?',
        answer: 'Recomendamos o uso de uma VPS Trader Windows, que pode ser contratada por R$ 110/mês para membros do Clube ou R$ 140/mês para clientes avulsos.',
        icon: <Server className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      }
    ]
  },
  {
    id: 'experience',
    name: 'Experiência',
    questions: [
      {
        id: 'experience-needed',
        question: 'Preciso ter experiência para usar as estratégias?',
        answer: 'Não! Temos opções tanto para iniciantes quanto para traders avançados. O Clube de Robôs Starter é ideal para quem está começando.',
        icon: <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      },
      {
        id: 'test-before',
        question: 'Posso testar antes de comprar?',
        answer: 'Sim! Oferecemos teste gratuito para clientes que utilizam corretoras parceiras do nosso Clube de Robôs Free.',
        icon: <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      }
    ]
  }
];

// Flatten all questions for search
const allQuestions = faqCategories.flatMap(category => 
  category.questions.map(q => ({...q, category: category.id}))
);

export function OptimizedFAQ() {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Filter questions based on search and category
  const filteredQuestions = allQuestions.filter(q => {
    const matchesSearch = searchQuery === '' || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || q.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get popular questions
  const popularQuestions = allQuestions.filter(q => q.popular).slice(0, 3);
  
  // Toggle question expansion
  const toggleQuestion = (id: string) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };
  
  return (
    <div className="py-16 bg-gray-900 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <HelpCircle className="h-10 w-10 text-blue-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossos produtos e serviços
          </p>
        </div>
        
        {/* Search and filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Buscar pergunta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1 rounded-lg text-sm whitespace-nowrap ${
                  activeCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Todas
              </button>
              {faqCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 py-1 rounded-lg text-sm whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Popular questions */}
        {searchQuery === '' && activeCategory === 'all' && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Perguntas Mais Frequentes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {popularQuestions.map(q => (
                <div 
                  key={q.id}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-750 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {q.icon}
                    <h4 className="font-medium text-white">{q.question}</h4>
                  </div>
                  <p className="text-sm text-gray-300">{q.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* FAQ accordion */}
        <div className="space-y-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map(q => (
              <div 
                key={q.id}
                className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(q.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                >
                  <div className="flex items-center gap-3">
                    {q.icon}
                    <span className="font-medium text-white">{q.question}</span>
                  </div>
                  {activeQuestion === q.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                
                {activeQuestion === q.id && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-300">{q.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">Nenhuma pergunta encontrada com os filtros atuais.</p>
            </div>
          )}
        </div>
        
        {/* See more button */}
        <div className="mt-8 text-center">
          <Button
            as={Link}
            to="/faq"
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Ver Todas as Perguntas
          </Button>
        </div>
      </div>
    </div>
  );
}