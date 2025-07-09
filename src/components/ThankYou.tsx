import { Button } from './Button';
import { Check, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

export function ThankYou() {
  useEffect(() => {
    // Get WhatsApp redirect URL from localStorage
    const whatsappUrl = localStorage.getItem('whatsappRedirect');
    if (whatsappUrl) {
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      // Clear the URL from localStorage
      localStorage.removeItem('whatsappRedirect');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
          <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        
        <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
          Solicitação Enviada!
        </h2>
        
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Obrigado pelo seu interesse! Nossa equipe entrará em contato em breve para discutir sua solicitação.
        </p>

        <div className="mt-8">
          <Button
            as="a"
            href="/"
            className="w-full flex items-center justify-center gap-2"
          >
            Voltar para Home
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}