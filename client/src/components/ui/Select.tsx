import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface SelectOption { value: string; label: string; }
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, ...props }, ref) => {
    const selectId = id || props.name || 'select-' + Math.random().toString(36).slice(2, 8);
    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && <label htmlFor={selectId} className="text-xs font-semibold uppercase tracking-wider text-zinc-600">{label}</label>}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full appearance-none px-4 py-3 pr-10 rounded-xl border bg-zinc-50/50 text-sm text-zinc-900 outline-none transition-all cursor-pointer',
              'focus:bg-white focus:ring-2 focus:ring-zinc-900/10',
              error ? 'border-red-500 focus:border-red-500' : 'border-zinc-200 focus:border-zinc-900'
            )}
            {...props}
          >
            {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);
Select.displayName = 'Select';
export default Select;
