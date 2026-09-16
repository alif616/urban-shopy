import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../utils/helpers';

export interface BreadcrumbItem { label: string; to?: string; }

interface BreadcrumbsProps { items: BreadcrumbItem[]; className?: string; }

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => (
  <nav aria-label="Breadcrumb" className={cn('flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 flex-wrap', className)}>
    {items.map((item, idx) => {
      const isLast = idx === items.length - 1;
      return (
        <span key={item.label + '-' + idx} className="flex items-center gap-2">
          {item.to && !isLast ? (
            <Link to={item.to} className="hover:text-zinc-900 transition-colors">{item.label}</Link>
          ) : (
            <span className={isLast ? 'text-zinc-900' : ''}>{item.label}</span>
          )}
          {!isLast && <ChevronRight className="w-3 h-3" />}
        </span>
      );
    })}
  </nav>
);
export default Breadcrumbs;
