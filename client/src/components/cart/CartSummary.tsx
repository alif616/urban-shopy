import { useAppSelector } from '../../store/hooks';
import { formatCurrency } from '../../utils/format';
import { FREE_SHIPPING_THRESHOLD, DEFAULT_SHIPPING_COST } from '../../config/constants';

interface CartSummaryProps { showTitle?: boolean; }

export const CartSummary = ({ showTitle = true }: CartSummaryProps) => {
  const items = useAppSelector((state) => state.cart.items);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_COST;
  const total = subtotal + shipping;
  return (
    <div className="space-y-2 text-xs">
      {showTitle && <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900 mb-4">Order Summary</h3>}
      <div className="flex justify-between text-zinc-600">
        <span>Subtotal</span>
        <span className="font-semibold text-zinc-900">{formatCurrency(subtotal)}</span>
      </div>
      <div className="flex justify-between text-zinc-600">
        <span>Shipping</span>
        <span>{shipping === 0 ? <strong className="text-emerald-600 uppercase">Free</strong> : formatCurrency(shipping)}</span>
      </div>
      <div className="flex justify-between text-sm font-bold text-zinc-900 pt-3 border-t border-zinc-200 mt-3">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
};
export default CartSummary;
