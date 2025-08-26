import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { buttonHoverVariants, shouldReduceMotion } from '@/lib/motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-amber-500 hover:bg-amber-600 text-slate-900 focus:ring-amber-500 shadow-lg',
      secondary: 'bg-slate-800 hover:bg-slate-900 text-white focus:ring-slate-500 shadow-lg',
      outline: 'border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-900 focus:ring-amber-500',
      ghost: 'text-slate-400 hover:text-white hover:bg-slate-800/50 focus:ring-slate-500',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };



    return (
              <motion.button
          ref={ref}
          className={cn(baseStyles, variants[variant], sizes[size], className)}
          whileHover={{ 
            scale: shouldReduceMotion() ? 1 : (variant === 'primary' ? 1.02 : 1.02),
            boxShadow: variant === 'primary' && !shouldReduceMotion() 
              ? '0 10px 15px -3px rgba(245, 158, 11, 0.2), inset 0 -2px 4px rgba(245, 158, 11, 0.3)'
              : undefined
          }}
          whileTap={{ scale: shouldReduceMotion() ? 1 : 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          disabled={isLoading}
          type={props.type}
          onClick={props.onClick}
        >
        {isLoading ? (
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            Loading...
          </div>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button }; 