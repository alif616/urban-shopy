import { useAppSelector } from '../../store/hooks';
import { formatCurrency } from '../../utils/format';
import { FREE_SHIPPING_THRESHOLD, DEFAULT_SHIPPING_COST } from '../../config/constants';

interface CheckoutSummaryProps { showTitle?: boolean; }

export const CheckoutSummary = ({ showTitle = true }: CheckoutSummaryProps) => {
  const items = useAppSelector((state) => state.cart.items);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_COST;
  const total = subtotal + shipping;
  return (
    <div>
      {showTitle && <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-6">Order Summary</h2>}
      <div className="space-y-4 max-h-80 overflow-y-auto mb-6 pr-2">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 items-center">
            <img src={item.image} alt={item.name} className="w-14 h-16 object-cover rounded-xl bg-white border border-zinc-200" />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-xs text-zinc-900 line-clamp-1">{item.name}</h4>
              <p className="text-[11px] text-zinc-500">{item.color} / {item.size} x {item.quantity}</p>
            </div>
            <span className="font-semibold text-xs text-zinc-900 whitespace-nowrap">{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-zinc-200 pt-4 space-y-2 text-xs">
        <div className="flex justify-between text-zinc-600"><span>Subtotal</span><span className="font-semibold text-zinc-900">{formatCurrency(subtotal)}</span></div>
        <div className="flex justify-between text-zinc-600"><span>Shipping</span><span>{shipping === 0 ? <strong className="text-emerald-600 uppercase">FREE</strong> : formatCurrency(shipping)}</span></div>
        <div className="flex justify-between text-base font-bold text-zinc-900 pt-3 border-t border-zinc-200"><span>Total Due</span><span>{formatCurrency(total)}</span></div>
      </div>
    </div>
  );
};
export default CheckoutSummary;
