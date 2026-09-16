import React from 'react';
import { cn } from '../../utils/helpers';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({ icon, title, description, action, className }: EmptyStateProps) => (
  <div className={cn('text-center py-16 px-6 bg-zinc-50 rounded-3xl border border-zinc-200/60', className)}>
    {icon && (
      <div className="w-16 h-16 bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-400 mx-auto mb-5">
        {icon}
      </div>
    )}
    <h3 className="text-base font-bold text-zinc-900 mb-2">{title}</h3>
    {description && <p className="text-xs text-zinc-500 max-w-sm mx-auto mb-6 leading-relaxed">{description}</p>}
    {action}
  </div>
);
export default EmptyState;
