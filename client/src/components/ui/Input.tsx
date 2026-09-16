import React from 'react';
import { cn } from '../../utils/helpers';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || props.name || 'input-' + Math.random().toString(36).slice(2, 8);
    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-zinc-600">{label}</label>}
        <div className="relative">
          {leftIcon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">{leftIcon}</div>}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full px-4 py-3 rounded-xl border bg-zinc-50/50 text-sm text-zinc-900 outline-none transition-all',
              'focus:bg-white focus:ring-2 focus:ring-zinc-900/10 placeholder:text-zinc-400',
              leftIcon && 'pl-10', rightIcon && 'pr-10',
              error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-zinc-200 focus:border-zinc-900'
            )}
            {...props}
          />
          {rightIcon && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">{rightIcon}</div>}
        </div>
        {error ? <span className="text-xs text-red-500">{error}</span> : hint ? <span className="text-xs text-zinc-400">{hint}</span> : null}
      </div>
    );
  }
);
Input.displayName = 'Input';
export default Input;
