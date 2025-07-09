import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const whatsappNumber = "5511911560276";
  const message = "Olá! Gostaria de agendar uma reunião com o especialista em automações.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {/* Texto flutuante */}
      <div className="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg max-w-xs animate-bounce">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full p-1 transition-colors"
          aria-label="Fechar"
        >
          <X className="h-3 w-3" />
        </button>
        <p className="text-sm font-medium">
          Agende uma reunião com o especialista em automações agora mesmo!
        </p>
      </div>
      
      {/* Botão WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse"
        aria-label="Contatar via WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}