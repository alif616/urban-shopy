import { Check } from 'lucide-react';
import { useAppSelector } from '../../store/hooks';
import { FREE_SHIPPING_THRESHOLD } from '../../config/constants';
import { formatCurrency } from '../../utils/format';

interface FreeShippingProgressProps { compact?: boolean; }

export const FreeShippingProgress = ({ compact = false }: FreeShippingProgressProps) => {
  const items = useAppSelector((state) => state.cart.items);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const unlocked = remaining === 0 && subtotal > 0;
  return (
    <div className={compact ? 'bg-zinc-50 px-6 py-3 border-b border-zinc-100 text-xs' : 'bg-zinc-50 rounded-2xl p-4 border border-zinc-100 text-xs'}>
      {unlocked ? (
        <p className="text-emerald-700 font-semibold mb-1.5 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> You've unlocked Complimentary Express Shipping!</p>
      ) : (
        <p className="text-zinc-600 mb-1.5">Add <span className="font-bold text-zinc-900">{formatCurrency(remaining)}</span> more for <strong>Free Express Shipping</strong></p>
      )}
      <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
        <div className="bg-zinc-900 h-full transition-all duration-300" style={{ width: progress + '%' }} />
      </div>
    </div>
  );
};
export default FreeShippingProgress;
