import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm hover:shadow focus:ring-zinc-900',
  secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-zinc-200/80 focus:ring-zinc-900',
  outline: 'border border-zinc-300 bg-transparent text-zinc-900 hover:border-zinc-900 hover:bg-zinc-50 focus:ring-zinc-900',
  ghost: 'bg-transparent text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70 focus:ring-zinc-900',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs uppercase tracking-wider font-semibold',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base font-semibold',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', isLoading = false, fullWidth = false, leftIcon, rightIcon, className, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-full',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer',
        variantClasses[variant], sizeClasses[size], fullWidth && 'w-full', className
      )}
      {...props}
    >
      {isLoading ? (<><Loader2 className="w-4 h-4 animate-spin" /><span>Loading...</span></>) : (<>{leftIcon}{children}{rightIcon}</>)}
    </button>
  )
);
Button.displayName = 'Button';
export default Button;
