import React, { useEffect } from 'react';
import { ArrowLeft, Calculator, ExternalLink } from 'lucide-react';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';

export function MemberTaxCalculator() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to NotaBroker after a short delay
    const timer = setTimeout(() => {
      window.open('https://notabroker.com.br', '_blank');
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
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

      <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-8 border border-gray-800 dark:border-gray-800 shadow-lg text-center">
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calculator className="h-10 w-10 text-white" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">
          Redirecionando para NotaBroker.com.br
        </h2>
        
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Nossa calculadora de imposto de renda é fornecida em parceria com NotaBroker. 
          Você será redirecionado automaticamente em alguns segundos.
        </p>
        
        <div className="flex justify-center">
          <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 animate-pulse"></div>
          </div>
        </div>
        
        <div className="mt-8">
          <a 
            href="https://notabroker.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            Clique aqui se não for redirecionado automaticamente
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}