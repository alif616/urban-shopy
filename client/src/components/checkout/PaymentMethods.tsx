import { CreditCard, Banknote } from 'lucide-react';
import { cn } from '../../utils/helpers';
import type { PaymentMethod } from '../../config/constants';

interface PaymentMethodsProps { value: PaymentMethod; onChange: (value: PaymentMethod) => void; }

const OPTIONS: { value: PaymentMethod; label: string; description: string; icon: typeof CreditCard; disabled?: boolean }[] = [
  { value: 'cod', label: 'Cash on Delivery (COD)', description: 'Pay directly in cash when your order arrives.', icon: Banknote },
  { value: 'card', label: 'Credit Card', description: 'Demo mode - will be enabled with a payment gateway.', icon: CreditCard, disabled: true },
];

export const PaymentMethods = ({ value, onChange }: PaymentMethodsProps) => (
  <div className="space-y-3">
    {OPTIONS.map((opt) => {
      const Icon = opt.icon;
      const isSelected = value === opt.value;
      return (
        <label key={opt.value} onClick={() => !opt.disabled && onChange(opt.value)} className={cn('flex items-start gap-4 p-4 rounded-2xl border transition-all', opt.disabled ? 'opacity-50 cursor-not-allowed border-zinc-200' : isSelected ? 'border-zinc-900 bg-zinc-50 cursor-pointer' : 'border-zinc-200 hover:border-zinc-400 cursor-pointer')}>
          <input type="radio" name="payment" value={opt.value} checked={isSelected} readOnly disabled={opt.disabled} className="accent-zinc-900 mt-1" />
          <div className="flex-1">
            <div className="flex items-center gap-2"><Icon className="w-4 h-4 text-zinc-700" /><span className="font-bold text-sm text-zinc-900">{opt.label}</span></div>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{opt.description}</p>
          </div>
        </label>
      );
    })}
  </div>
);
export default PaymentMethods;
