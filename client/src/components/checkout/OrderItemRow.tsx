import { Link } from 'react-router-dom';
import type { OrderItem } from '../../types';
import { formatCurrency } from '../../utils/format';

interface OrderItemRowProps { item: OrderItem; }

export const OrderItemRow = ({ item }: OrderItemRowProps) => (
  <div className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
    <div className="flex items-center gap-4 min-w-0">
      <img src={item.image} alt={item.name} className="w-12 h-14 object-cover rounded-lg bg-zinc-100 border border-zinc-200/50 flex-shrink-0" />
      <div className="min-w-0">
        <Link to={'/product/' + item.productId} className="font-semibold text-xs text-zinc-900 hover:text-zinc-600 line-clamp-1">{item.name}</Link>
        <p className="text-[11px] text-zinc-500">{item.color} / {item.size} (Qty: {item.quantity})</p>
      </div>
    </div>
    <span className="text-xs font-semibold text-zinc-900 whitespace-nowrap">{formatCurrency(item.price * item.quantity)}</span>
  </div>
);
export default OrderItemRow;
