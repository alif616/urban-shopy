import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

interface CartEmptyStateProps { onClose?: () => void; }

export const CartEmptyState = ({ onClose }: CartEmptyStateProps) => (
  <div className="flex flex-col items-center justify-center text-zinc-500 gap-4 py-12 px-4">
    <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400"><ShoppingBag className="w-8 h-8" /></div>
    <p className="font-medium text-zinc-900">Your shopping bag is empty.</p>
    <p className="text-xs text-zinc-400 text-center max-w-xs leading-relaxed">Explore our modern collections and add items to your cart.</p>
    <Link to="/shop" onClick={onClose}><Button variant="outline" size="sm">Start Shopping</Button></Link>
  </div>
);
export default CartEmptyState;
