import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';
import type { CartItem } from '../../types';
import { useAppDispatch } from '../../store/hooks';
import { updateQuantity, removeFromCart } from '../../store/slices/cartSlice';
import { formatCurrency } from '../../utils/format';
import { toast } from '../common/Toaster';

interface CartItemRowProps { item: CartItem; compact?: boolean; onNavigate?: () => void; }

export const CartItemRow = ({ item, compact = false, onNavigate }: CartItemRowProps) => {
  const dispatch = useAppDispatch();
  const handleRemove = () => { dispatch(removeFromCart(item.id)); toast('Item removed from cart', 'info'); };
  const handleDecrease = () => { if (item.quantity > 1) dispatch(updateQuantity({ id: item.id, delta: -1 })); };
  const handleIncrease = () => { dispatch(updateQuantity({ id: item.id, delta: 1 })); };
  return (
    <div className={compact ? 'flex gap-4' : 'flex gap-4 sm:gap-6'}>
      <Link to={'/product/' + item.productId} onClick={onNavigate} className="flex-shrink-0">
        <img src={item.image} alt={item.name} className={compact ? 'w-20 h-24 object-cover rounded-xl bg-zinc-100 border border-zinc-200/50' : 'w-24 h-28 sm:w-28 sm:h-32 object-cover rounded-xl bg-zinc-100 border border-zinc-200/50'} />
      </Link>
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex justify-between items-start gap-3">
            <Link to={'/product/' + item.productId} onClick={onNavigate} className="font-medium text-sm text-zinc-900 line-clamp-1 hover:text-zinc-600 transition-colors min-w-0">{item.name}</Link>
            <button onClick={handleRemove} className="text-zinc-400 hover:text-red-500 transition-colors p-1 cursor-pointer flex-shrink-0" aria-label="Remove item"><Trash2 className="w-4 h-4" /></button>
          </div>
          <p className="text-xs text-zinc-500 mt-1">{item.color} / {item.size}</p>
          <p className="font-semibold text-sm mt-2 text-zinc-900">{formatCurrency(item.price)}</p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-zinc-200 rounded-lg bg-zinc-50">
            <button onClick={handleDecrease} disabled={item.quantity <= 1} className="p-1.5 hover:bg-zinc-100 rounded-l-lg text-zinc-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer" aria-label="Decrease quantity"><Minus className="w-3 h-3" /></button>
            <span className="w-8 text-center text-xs font-semibold select-none">{item.quantity}</span>
            <button onClick={handleIncrease} className="p-1.5 hover:bg-zinc-100 rounded-r-lg text-zinc-600 cursor-pointer" aria-label="Increase quantity"><Plus className="w-3 h-3" /></button>
          </div>
          <p className="text-sm font-semibold text-zinc-900">{formatCurrency(item.price * item.quantity)}</p>
        </div>
      </div>
    </div>
  );
};
export default CartItemRow;
