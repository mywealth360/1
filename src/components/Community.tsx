import { Button } from './Button';
import { ArrowRight, Users, MessageSquare, BookOpen, TrendingUp, Calendar, BarChart2, Trophy, Target } from 'lucide-react';
import { whatsappLinks, stripeLinks } from '../lib/robotLinks';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Community() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate('/login');
  };

  return (
    <div className="relative">
      {/* Hero Section with Trading Background */}
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&q=80&w=2940")'
        }}
        aria-label="Comunidade de Traders - Compartilhe experiências e resultados"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/70" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Comunidade de Traders
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              Compartilhe resultados, backtests e experiências práticas com robôs traders. Aprenda com traders profissionais que já utilizam nossas estratégias automatizadas com sucesso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAuthClick}
                variant="primary"
                className="group"
              >
                Fazer Login
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                onClick={handleAuthClick}
                variant="outline"
                className="text-white border-white/20 hover:bg-white/10"
              >
                Criar Conta
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <BarChart2 className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Compartilhe Backtests
              </h3>
              <p className="text-gray-600">
                Publique e discuta resultados de backtests dos robôs, otimizações de parâmetros e análises de performance.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <Trophy className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Cases de Sucesso
              </h3>
              <p className="text-gray-600">
                Conheça histórias reais de traders que alcançaram consistência usando nossos robôs e estratégias.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <Target className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Dicas Práticas
              </h3>
              <p className="text-gray-600">
                Aprenda dicas práticas de configuração, gestão de risco e otimização dos robôs com traders experientes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para fazer parte da nossa comunidade?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a traders de sucesso e comece a transformar seus resultados hoje mesmo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              as="a"
              href={whatsappLinks.group}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto"
            >
              Entrar no Grupo WhatsApp
            </Button>
            <Button 
              as="a"
              href="https://www.nelogica.com.br/invitechat?group=4F6B4F36486A5230"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto"
            >
              Clube de Robôs Profit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}