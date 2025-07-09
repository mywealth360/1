import { cn } from '../lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', as = 'button', href, target, rel, children, ...props }, ref) => {
    const Component = as;
    
    // Define base styles for different variants
    const variantStyles = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400',
    };
    
    // Define size styles
    const sizeStyles = {
      sm: 'h-9 px-4 py-2 text-sm',
      md: 'h-10 px-6 py-2',
      lg: 'h-11 px-8 py-2 text-lg',
    };
    
    const baseProps = {
      className: cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variantStyles[variant as keyof typeof variantStyles],
        sizeStyles[size as keyof typeof sizeStyles],
        className
      ),
      ...props
    };

    if (as === 'a') {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          className={baseProps.className}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        {...baseProps}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';