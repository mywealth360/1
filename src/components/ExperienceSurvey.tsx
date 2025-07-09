import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { X, User, TrendingUp, Bot, BarChart3 } from 'lucide-react';
import { sendToRDStation } from '../lib/rdStationWorker';
import { useAuth } from '../contexts/AuthContext'; 
import { supabase } from '../lib/supabase';

interface SurveyData {
  experience_level: string;
  has_automated_before: string;
  trading_style: string;
  main_challenge: string;
}

export function ExperienceSurvey() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [surveyData, setSurveyData] = useState<SurveyData>({
    experience_level: '',
    has_automated_before: '',
    trading_style: '',
    main_challenge: ''
  });

  useEffect(() => {
    // Verificar se o usuário já respondeu o survey
    const hasAnswered = localStorage.getItem(`survey_answered_${user?.id}`);
    
    if (!hasAnswered && user) {
      // Mostrar survey após 3 segundos
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleAnswer = (field: keyof SurveyData, value: string) => {
    setSurveyData(prev => ({ ...prev, [field]: value }));
    
    // Avançar para próxima pergunta automaticamente
    if (currentStep < 4) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setIsSubmitting(true);
    
    // Salvar no Supabase
    try {
      // Primeiro salvar no Supabase
      const { error: supabaseError } = await supabase
        .from('survey_responses')
        .insert({
          user_id: user.id,
          experience_level: surveyData.experience_level,
          has_automated_before: surveyData.has_automated_before,
          trading_style: surveyData.trading_style,
          main_challenge: surveyData.main_challenge
        });
        
      if (supabaseError) {
        console.error('Erro ao salvar no Supabase:', supabaseError);
      }
      
      // Preparar dados para o RD Station
      const rdStationData = {
        email: user.email,
        name: user.email?.split('@')[0] || '',
        tags: ['Website', 'Survey Experiência', 'Área de Membros'],
        traffic_source: 'Members Area',
        cf_nivel_experiencia: surveyData.experience_level,
        cf_ja_automatizou: surveyData.has_automated_before,
        cf_estilo_trading: surveyData.trading_style,
        cf_principal_desafio: surveyData.main_challenge,
        identificador: "Survey de Experiência"
      };
      
      // Enviar para RD Station
      const rdResult = await sendToRDStation(rdStationData);
      console.log('Resultado do envio para RD Station:', rdResult);
      
      // Marcar como respondido
      localStorage.setItem(`survey_answered_${user.id}`, 'true');
      
      // Fechar survey
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao enviar survey:', error);
      // Mesmo com erro, marcar como respondido para não incomodar o usuário
      localStorage.setItem(`survey_answered_${user.id}`, 'true');
      setIsOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !user) return null;

  // Fechar o survey completamente
  const handleClose = () => {
    localStorage.setItem(`survey_answered_${user.id}`, 'true');
    setIsOpen(false);
  };

  const questions = [
    {
      id: 1,
      title: "Qual seu nível de experiência em trading?",
      field: 'experience_level' as keyof SurveyData,
      options: [
        { value: 'iniciante', label: 'Iniciante (menos de 1 ano)', icon: <User className="h-5 w-5" /> },
        { value: 'intermediario', label: 'Intermediário (1-3 anos)', icon: <TrendingUp className="h-5 w-5" /> },
        { value: 'avancado', label: 'Avançado (3+ anos)', icon: <BarChart3 className="h-5 w-5" /> }
      ]
    },
    {
      id: 2,
      title: "Você já operou com automações antes?",
      field: 'has_automated_before' as keyof SurveyData,
      options: [
        { value: 'nunca', label: 'Nunca usei automações', icon: <X className="h-5 w-5" /> },
        { value: 'testei', label: 'Já testei algumas vezes', icon: <Bot className="h-5 w-5" /> },
        { value: 'uso_regularmente', label: 'Uso regularmente', icon: <BarChart3 className="h-5 w-5" /> }
      ]
    },
    {
      id: 3,
      title: "Como você opera atualmente?",
      field: 'trading_style' as keyof SurveyData,
      options: [
        { value: 'manual', label: 'Totalmente manual', icon: <User className="h-5 w-5" /> },
        { value: 'semi_automatico', label: 'Semi-automático', icon: <Bot className="h-5 w-5" /> },
        { value: 'automatico', label: 'Totalmente automático', icon: <BarChart3 className="h-5 w-5" /> }
      ]
    },
    {
      id: 4,
      title: "Qual seu principal desafio no trading?",
      field: 'main_challenge' as keyof SurveyData,
      options: [
        { value: 'emocional', label: 'Controle emocional', icon: <User className="h-5 w-5" /> },
        { value: 'estrategia', label: 'Encontrar estratégias consistentes', icon: <TrendingUp className="h-5 w-5" /> },
        { value: 'gestao_risco', label: 'Gestão de risco', icon: <BarChart3 className="h-5 w-5" /> }
      ]
    }
  ];

  const currentQuestion = questions[currentStep - 1];
  
  // Safety check: if currentQuestion is undefined, reset to step 1
  if (!currentQuestion) {
    setCurrentStep(1);
    return null;
  }
  
  const isLastStep = currentStep === 4;
  const canSubmit = Object.values(surveyData).every(value => value !== '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 dark:bg-gray-900 rounded-xl w-full max-w-md shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Conte-nos sobre você</h2>
          <div className="flex items-center gap-3">
            <div className="text-white text-sm">
              {currentStep}/4
            </div>
            <button 
              onClick={handleClose}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-800 h-2">
          <div 
            className="bg-blue-600 h-2 transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
        
        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {currentStep}. {currentQuestion.title}
            </h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleAnswer(currentQuestion.field, option.value)}
                  className={`w-full p-4 rounded-lg border transition-all duration-200 flex items-center gap-3 ${
                    surveyData[currentQuestion.field] === option.value
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            
            {isLastStep && canSubmit ? (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? 'Enviando...' : 'Finalizar'}
              </Button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
                disabled={!surveyData[currentQuestion.field] || currentStep === 4}
                className="text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próximo
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}