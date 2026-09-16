import React from 'react';
import { cn } from '../../utils/helpers';

type BadgeVariant = 'default' | 'sale' | 'new' | 'success' | 'warning' | 'error';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-white/90 backdrop-blur-md text-zinc-900 border border-zinc-200/50 shadow-sm',
  sale: 'bg-red-600 text-white shadow-sm',
  new: 'bg-zinc-900 text-white shadow-sm',
  success: 'bg-emerald-600 text-white shadow-sm',
  warning: 'bg-amber-500 text-white shadow-sm',
  error: 'bg-red-600 text-white shadow-sm',
};

export const Badge = ({ children, variant = 'default', className }: BadgeProps) => (
  <span className={cn('inline-flex items-center justify-center px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-md', variantClasses[variant], className)}>
    {children}
  </span>
);
export default Badge;
