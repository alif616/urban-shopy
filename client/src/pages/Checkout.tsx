import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Lock, ShoppingBag } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearCart } from '../store/slices/cartSlice';
import { createOrder } from '../store/slices/ordersSlice';
import { Button } from '../components/ui/Button';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { CheckoutSummary } from '../components/checkout/CheckoutSummary';
import { EmptyState } from '../components/ui/EmptyState';
import { toast } from '../components/common/Toaster';
import { validateCheckoutForm, hasErrors, ValidationErrors } from '../utils/validators';
import { FREE_SHIPPING_THRESHOLD, DEFAULT_SHIPPING_COST, type PaymentMethod } from '../config/constants';
import type { ShippingAddress } from '../types';

const Checkout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const items = useAppSelector((state) => state.cart.items);
  const isSubmitting = useAppSelector((state) => state.orders.isLoading);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [form, setForm] = useState<ShippingAddress>({
    fullName: user?.name || '', email: user?.email || '', phone: '', address: '', city: '', postalCode: '', country: 'United States',
  });

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_COST;
  const total = subtotal + shipping;

  const handleFieldChange = (field: keyof ShippingAddress, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCheckoutForm(form);
    setErrors(validation);
    if (hasErrors(validation)) { toast('Please correct the highlighted fields.', 'error'); return; }
    const result = await dispatch(createOrder({ items, subtotal, shipping, total, shippingAddress: form, paymentMethod }));
    if (createOrder.fulfilled.match(result)) {
      dispatch(clearCart());
      toast('Order placed successfully!', 'success');
      navigate('/order-confirmation/' + result.payload.id, { replace: true });
    } else { toast('Failed to place order. Please try again.', 'error'); }
  };

  if (items.length === 0) return (
    <div className="max-w-xl mx-auto px-4 py-20">
      <EmptyState icon={<ShoppingBag className="w-6 h-6" />} title="Your cart is empty" description="Add items to your cart before proceeding to checkout." action={<Link to="/shop"><Button>Continue Shopping</Button></Link>} />
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-100 rounded-full cursor-pointer" aria-label="Go back"><ArrowLeft className="w-5 h-5 text-zinc-600" /></button>
        <div>
          <span className="label-eyebrow">Secure Checkout</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">Complete Your Order</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <form onSubmit={handleSubmit} className="lg:col-span-7">
          <CheckoutForm form={form} onChange={handleFieldChange} errors={errors} paymentMethod={paymentMethod} onPaymentChange={setPaymentMethod} />
          <Button type="submit" size="lg" fullWidth isLoading={isSubmitting} className="mt-6"><Lock className="w-4 h-4 mr-2" /> Place Order - ${total.toFixed(2)}</Button>
          <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-zinc-500"><ShieldCheck className="w-3.5 h-3.5" /><span>Your information is transmitted securely</span></div>
        </form>
        <aside className="lg:col-span-5">
          <div className="bg-zinc-50 p-6 sm:p-8 rounded-3xl border border-zinc-200/80 lg:sticky lg:top-24"><CheckoutSummary /></div>
        </aside>
      </div>
    </motion.div>
  );
};
export default Checkout;
