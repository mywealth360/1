import { Button } from './Button';
import { ArrowRight } from 'lucide-react';
import { stripeLinks } from '../lib/robotLinks';

interface FeaturedRobotProps {
  name: string;
  description: string;
  signalQuality: string;
  markets: string;
  pack: string;
}

export function FeaturedRobot({ name, description, signalQuality, markets, pack }: FeaturedRobotProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{name}</h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
      
      <div className="grid grid-cols-3 gap-8 mt-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">Alta</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Qualidade do Sinal</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{markets}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Mercados</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{pack}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pack</div>
        </div>
      </div>
      
      <Button 
        as="a"
        href={stripeLinks.packPro}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 w-full group" 
        size="lg"
      >
        Ver Detalhes
        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
}