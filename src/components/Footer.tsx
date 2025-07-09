import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, Shield, Heart } from 'lucide-react';
import { whatsappLinks } from '../lib/robotLinks';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Profit Estrategista</h3>
            <p className="mb-4 text-sm">
              Soluções avançadas em trading automatizado para maximizar seus resultados com estratégias profissionais.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/profit.estrategista_" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/clube-de-robos" className="hover:text-white transition-colors">Clube de Robôs</Link>
              </li>
              <li>
                <Link to="/copy-trade" className="hover:text-white transition-colors">Copy Trade</Link>
              </li>
              <li>
                <Link to="/mesa-proprietaria" className="hover:text-white transition-colors">Mesa Proprietária</Link>
              </li>
              <li>
                <Link to="/consultoria" className="hover:text-white transition-colors">Crie seu Robô</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">Área de Membros</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <a href={whatsappLinks.support} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <a href="mailto:suporte@profitestrategista.com.br" className="hover:text-white transition-colors">
                  suporte@profitestrategista.com.br
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                <span>
                  Rua Brigadeiro Faria Lima, 1811
                </span>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Suporte</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href={whatsappLinks.support} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Shield className="h-4 w-4 text-gray-400" />
                  <span>Suporte Técnico</span>
                </a>
              </li>
              <li>
                <a 
                  href={whatsappLinks.group} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Heart className="h-4 w-4 text-gray-400" />
                  <span>Comunidade</span>
                </a>
              </li>
              <li>
                <Link 
                  to="/consultoria"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>Solicitar Orçamento</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="border-t border-gray-800 pt-6 mt-6 text-xs text-gray-500">
          <p className="mb-2">
            Analista Responsável: Yallon Mazuti de Carvalho - CNPI-T 8964
          </p>
          <p className="mb-4">
            Resultados passados não garantem lucros futuros. Os robôs e estratégias disponibilizados são ferramentas de auxílio ao trader e não garantem resultados específicos. O investidor deve estar ciente dos riscos envolvidos no mercado financeiro.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>
              &copy; {currentYear} Profit Estrategista. Todos os direitos reservados.
            </p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <Link to="/termos-de-uso" className="hover:text-white transition-colors">
                Termos de Uso
              </Link>
              <Link to="/politica-de-privacidade" className="hover:text-white transition-colors">
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}