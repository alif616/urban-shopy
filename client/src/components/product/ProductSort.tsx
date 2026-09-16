import { SORT_OPTIONS, SortOption } from '../../config/constants';

interface ProductSortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const ProductSort = ({ value, onChange }: ProductSortProps) => (
  <div className="flex items-center gap-2 w-full md:w-auto">
    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hidden sm:inline">Sort:</span>
    <select value={value} onChange={(e) => onChange(e.target.value as SortOption)} className="w-full md:w-56 px-4 py-2.5 border border-zinc-200 rounded-xl bg-white text-xs font-semibold uppercase tracking-wider outline-none focus:border-zinc-900 cursor-pointer">
      {SORT_OPTIONS.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
    </select>
  </div>
);
export default ProductSort;
