import { cn } from '../lib/utils';
import { useState } from 'react';

interface StrategyPackBoxesProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function StrategyPackBoxes({ className, size = 'md' }: StrategyPackBoxesProps) {
  const [imageError, setImageError] = useState(false);
  
  const boxSizes = {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-[480px]'
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={cn('relative w-full', className)}>
      {imageError ? (
        <div className={cn(
          'w-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl',
          boxSizes[size]
        )}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                Packs de Estratégias
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <div className={cn(
          'w-full rounded-xl overflow-hidden relative',
          boxSizes[size]
        )}>
          <img
            src="https://imagizer.imageshack.com/img924/3651/znIspD.png"
            alt="Packs de Estratégias"
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center center',
              transform: 'scale(1.02)',
              backgroundColor: '#000'
            }}
            onError={handleImageError}
          />
        </div>
      )}
    </div>
  );
}