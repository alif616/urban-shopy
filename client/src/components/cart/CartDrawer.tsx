import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeCartDrawer } from '../../store/slices/uiSlice';
import { Button } from '../ui/Button';
import { CartItemRow } from './CartItemRow';
import { CartEmptyState } from './CartEmptyState';
import { FreeShippingProgress } from './FreeShippingProgress';
import { CartSummary } from './CartSummary';
import { formatCurrency } from '../../utils/format';
import { FREE_SHIPPING_THRESHOLD, DEFAULT_SHIPPING_COST } from '../../config/constants';

export const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isCartOpen } = useAppSelector((state) => state.ui);
  const items = useAppSelector((state) => state.cart.items);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_COST;
  const total = subtotal + shipping;
  const handleClose = () => dispatch(closeCartDrawer());
  const handleCheckout = () => { handleClose(); navigate('/checkout'); };
  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50" />
          <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 220 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-zinc-100">
              <h2 className="text-base font-semibold uppercase tracking-wider flex items-center gap-2"><ShoppingBag className="w-4 h-4" /> Shopping Cart ({items.length})</h2>
              <button onClick={handleClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer" aria-label="Close cart"><X className="w-5 h-5 text-zinc-500" /></button>
            </div>
            {items.length > 0 && <FreeShippingProgress compact />}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 divide-y divide-zinc-100">
              {items.length === 0 ? (<CartEmptyState onClose={handleClose} />) : (
                items.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0"><CartItemRow item={item} compact onNavigate={handleClose} /></div>
                ))
              )}
            </div>
            {items.length > 0 && (
              <div className="p-6 border-t border-zinc-100 bg-zinc-50/50">
                <CartSummary />
                <Button className="w-full mt-4" onClick={handleCheckout}>Checkout - {formatCurrency(total)}</Button>
                <Link to="/cart" onClick={handleClose} className="block text-center text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 mt-3 transition-colors">View Full Cart</Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
export default CartDrawer;
