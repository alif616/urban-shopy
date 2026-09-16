import { RefreshCw } from 'lucide-react';
import { CATEGORIES, MAX_PRICE, MIN_PRICE } from '../../config/constants';
import { cn } from '../../utils/helpers';

export interface FilterState {
  category: string;
  maxPrice: number;
  newArrival: boolean;
}

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  className?: string;
}

export const ProductFilters = ({ filters, onChange, onReset, className }: ProductFiltersProps) => (
  <aside className={cn('space-y-8', className)}>
    <div>
      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900 mb-4">Categories</h3>
      <div className="flex flex-col gap-2">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => onChange({ ...filters, category: cat })} className={cn('text-left text-sm py-1.5 transition-colors cursor-pointer', filters.category === cat ? 'font-bold text-zinc-900 border-l-2 border-zinc-900 pl-3' : 'text-zinc-500 hover:text-zinc-900 pl-0')}>
            {cat}
          </button>
        ))}
      </div>
    </div>
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900">Max Price</h3>
        <span className="text-xs font-semibold text-zinc-600">${filters.maxPrice}</span>
      </div>
      <input type="range" min={MIN_PRICE + 30} max={MAX_PRICE} step={5} value={filters.maxPrice} onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })} className="w-full accent-zinc-900 cursor-pointer" />
      <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
        <span>${MIN_PRICE + 30}</span>
        <span>${MAX_PRICE}</span>
      </div>
    </div>
    <div className="pt-4 border-t border-zinc-100">
      <label className="flex items-center justify-between cursor-pointer">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-900">New Arrivals Only</span>
        <input type="checkbox" checked={filters.newArrival} onChange={(e) => onChange({ ...filters, newArrival: e.target.checked })} className="w-4 h-4 accent-zinc-900 cursor-pointer" />
      </label>
    </div>
    <div className="pt-4 border-t border-zinc-100">
      <button onClick={onReset} className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-red-600 flex items-center gap-1.5 transition-colors cursor-pointer">
        <RefreshCw className="w-3.5 h-3.5" /> Reset All Filters
      </button>
    </div>
  </aside>
);
export default ProductFilters;
