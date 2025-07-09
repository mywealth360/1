import { Star } from 'lucide-react';
import { Button } from './Button';
import { Link } from 'react-router-dom';

interface ReviewProps {
  name: string;
  date: string;
  rating: number;
  comment: string;
  product: string;
}

const Review = ({ name, date, rating, comment, product }: ReviewProps) => {
  return (
    <div className="bg-blue-900/80 dark:bg-blue-900/80 rounded-xl p-6 shadow-lg border border-blue-800/30 dark:border-blue-800/30 transition-all duration-300 hover:shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-white dark:text-white">{name}</h3>
          <p className="text-sm text-blue-300 dark:text-blue-300">{date}</p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-800 dark:bg-blue-800 text-blue-200 dark:text-blue-200">
          {product}
        </span>
      </div>
      
      <div className="flex items-center mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-600 dark:text-gray-600'}`}
            fill={i < rating ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      
      <p className="text-blue-100 dark:text-blue-100">{comment}</p>
    </div>
  );
};

export function CustomerReviews() {
  const reviews = [
    {
      name: "Carlos Mendes",
      date: "Março 2025",
      rating: 5,
      comment: "Estou usando o Pack Scalper há 3 meses e os resultados são impressionantes. A automação eliminou completamente o fator emocional das minhas operações.",
      product: "Pack Scalper"
    },
    {
      name: "Fernanda Oliveira",
      date: "Fevereiro 2025",
      rating: 5,
      comment: "O Copy Trade mudou minha vida financeira. Consigo acompanhar o mercado mesmo com minha rotina agitada. Suporte técnico excelente!",
      product: "Copy Trade"
    },
    {
      name: "Roberto Almeida",
      date: "Janeiro 2025",
      rating: 4,
      comment: "Comecei com o Pack Scalper e logo fiz upgrade para o Pack Pro. A diversificação de mercados é um diferencial incrível. Recomendo fortemente.",
      product: "Pack Global"
    },
    { 
      name: "Juliana Costa",
      date: "Abril 2025",
      rating: 5,
      comment: "O robô GR Pro revolucionou minha gestão de risco com operações manuais. Resultados consistentes e configuração intuitiva. Vale cada centavo!",
      product: "GR Pro"
    },
    {
      name: "Marcos Pereira",
      date: "Março 2025",
      rating: 5,
      comment: "Depois de testar vários sistemas, o Copy Multi superou todas as expectativas. Diversificação perfeita e interface intuitiva.",
      product: "Copy Multi"
    },
    {
      name: "Ana Luiza Santos",
      date: "Fevereiro 2025",
      rating: 4,
      comment: "Gostei do Copy Trade. O spread é mínimo. Sou cliente do Copy Índice e do Copy de Dólar.",
      product: "Copy Trade"
    }
  ];

  return (
    <div className="py-16 bg-blue-950 dark:bg-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white dark:text-white">
            O que nossos clientes dizem 
          </h2>
          <p className="mt-4 text-xl text-blue-200 dark:text-blue-200">
            Experiências reais de traders que utilizam nossas soluções
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Review key={index} {...review} />
          ))}
        </div>

        {/* Mesa Proprietária Section */}
        <div className="mt-16 bg-blue-900/50 rounded-xl p-8 border border-blue-800/30 shadow-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Combos de Mesas + Estratégias
            </h3>
            <p className="text-blue-200 mb-6 max-w-3xl mx-auto">
              Opere com capital de terceiros e potencialize seus resultados com risco controlado. 
              Nossas mesas proprietárias oferecem alavancagem profissional com suporte completo.
            </p>
            <Button
              as={Link}
              to="/mesa-proprietaria"
              className="bg-blue-700 hover:bg-blue-800 text-white"
            >
              Conhecer Combos de Mesas + Estratégias
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}