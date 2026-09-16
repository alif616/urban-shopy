import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const QuantitySelector = ({ value, onChange, min = 1, max = 99 }: QuantitySelectorProps) => (
  <div className="flex items-center border border-zinc-200 rounded-full bg-zinc-50 px-2">
    <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} className="p-3 text-zinc-600 hover:text-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer" aria-label="Decrease quantity"><Minus className="w-4 h-4" /></button>
    <span className="w-8 text-center text-sm font-bold select-none">{value}</span>
    <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} className="p-3 text-zinc-600 hover:text-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer" aria-label="Increase quantity"><Plus className="w-4 h-4" /></button>
  </div>
);
export default QuantitySelector;
