import { cn } from '../../utils/helpers';
import type { ProductColor } from '../../types';

interface SizeSelectorProps { sizes: string[]; selected: string; onChange: (size: string) => void; }
interface ColorSelectorProps { colors: ProductColor[]; selected: string; onChange: (color: string) => void; }

export const SizeSelector = ({ sizes, selected, onChange }: SizeSelectorProps) => (
  <div className="mb-8">
    <div className="flex justify-between items-center mb-3">
      <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">Size</label>
      <span className="text-xs text-zinc-500 cursor-pointer hover:text-zinc-900">Size Guide</span>
    </div>
    <div className="grid grid-cols-4 gap-2">
      {sizes.map((s) => (
        <button key={s} onClick={() => onChange(s)} className={cn('py-3 border text-xs font-bold rounded-xl transition-all cursor-pointer', selected === s ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 text-zinc-700 hover:border-zinc-400')}>{s}</button>
      ))}
    </div>
  </div>
);

export const ColorSelector = ({ colors, selected, onChange }: ColorSelectorProps) => {
  const selectedColor = colors.find((c) => c.name === selected);
  return (
    <div className="mb-6">
      <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block mb-3">
        Color: <span className="font-normal text-zinc-500">{selectedColor?.name ?? selected}</span>
      </label>
      <div className="flex gap-3 flex-wrap">
        {colors.map((c) => (
          <button key={c.name} onClick={() => onChange(c.name)} className={cn('w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer', selected === c.name ? 'ring-2 ring-zinc-900 ring-offset-2 border-transparent' : 'border-zinc-300 hover:border-zinc-500')} style={{ backgroundColor: c.hex }} title={c.name} aria-label={'Select color ' + c.name} />
        ))}
      </div>
    </div>
  );
};
