import { useState } from 'react';
import { X } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

export function AlertBanner() {
  const [dismissed, setDismissed] = useState(false);
  const location = useLocation();
  
  if (dismissed) {
    return null;
  }
  
  // Check if we're in the members area
  const isMembersArea = location.pathname.startsWith('/members');
  
  // Use a single consistent message across all pages
  const bannerMessage = "Acesse a Área do Trader agora mesmo";
  
  return (
    <div className="relative w-full bg-blue-600 dark:bg-blue-600 text-white py-2 text-center z-30 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <p className="text-sm sm:text-base font-medium">
          {bannerMessage}
          {isMembersArea ? (
            <a 
              href="https://bit.ly/3GoDUoE" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ml-2 underline font-bold hover:text-blue-100"
            >
              Cadastrar na Warren
            </a>
          ) : (
            <Link to="/login" className="ml-2 underline font-bold hover:text-blue-100">
              Acessar Área de Membros
            </Link>
          )}
        </p>
        <button 
          onClick={() => setDismissed(true)}
          className="ml-3 p-1 rounded-full hover:bg-blue-700 dark:hover:bg-blue-700 focus:outline-none"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}