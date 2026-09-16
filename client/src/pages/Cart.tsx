import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useAppSelector } from '../store/hooks';
import { Button } from '../components/ui/Button';
import { CartItemRow } from '../components/cart/CartItemRow';
import { CartSummary } from '../components/cart/CartSummary';
import { CartEmptyState } from '../components/cart/CartEmptyState';
import { FreeShippingProgress } from '../components/cart/FreeShippingProgress';
import { formatCurrency } from '../utils/format';
import { FREE_SHIPPING_THRESHOLD, DEFAULT_SHIPPING_COST } from '../config/constants';

const Cart = () => {
  const navigate = useNavigate();
  const items = useAppSelector((state) => state.cart.items);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_COST;
  const total = subtotal + shipping;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-100 rounded-full cursor-pointer" aria-label="Go back"><ArrowLeft className="w-5 h-5 text-zinc-600" /></button>
        <div>
          <span className="label-eyebrow">Your Bag</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">Shopping Cart</h1>
        </div>
      </div>
      {items.length === 0 ? (
        <div className="max-w-lg mx-auto bg-zinc-50 rounded-3xl border border-zinc-200/60">
          <CartEmptyState />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            <FreeShippingProgress />
            <div className="divide-y divide-zinc-100">
              {items.map((item) => (<div key={item.id} className="py-6 first:pt-0"><CartItemRow item={item} /></div>))}
            </div>
            <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-zinc-500 transition-colors"><ArrowLeft className="w-4 h-4" /> Continue Shopping</Link>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-zinc-50 p-6 sm:p-8 rounded-3xl border border-zinc-200/80 lg:sticky lg:top-24">
              <CartSummary />
              <Button onClick={() => navigate('/checkout')} fullWidth size="lg" className="mt-6" rightIcon={<ArrowRight className="w-4 h-4" />}>Proceed to Checkout</Button>
              <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-zinc-500"><ShieldCheck className="w-3.5 h-3.5" /><span>Secure SSL encrypted checkout</span></div>
              <div className="mt-6 pt-6 border-t border-zinc-200">
                <p className="text-[11px] text-zinc-500 leading-relaxed">Total at checkout: <span className="font-bold text-zinc-900">{formatCurrency(total)}</span> (includes {shipping === 0 ? 'free' : formatCurrency(shipping)} shipping)</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
export default Cart;
