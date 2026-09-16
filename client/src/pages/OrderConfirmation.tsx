import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Package, Home, ArrowRight, Mail } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchOrderById } from '../store/slices/ordersSlice';
import { Button } from '../components/ui/Button';
import { Loader } from '../components/ui/Loader';
import { formatCurrency, formatDate } from '../utils/format';

const OrderConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentOrder, isLoading } = useAppSelector((state) => state.orders);
  useEffect(() => { if (id) dispatch(fetchOrderById(id)); }, [dispatch, id]);
  if (isLoading) return <Loader fullScreen label="Loading order" />;
  const orderId = currentOrder?.id || id || 'ORD-000000';
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><Check className="w-10 h-10" strokeWidth={3} /></div>
      <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Order Confirmed</span>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 mt-2 mb-3">Thank You for Your Order!</h1>
      <p className="text-sm text-zinc-600 mb-2">Your order has been placed and is now being prepared.</p>
      <p className="text-xs font-mono text-zinc-500 mb-8">Order ID: <span className="font-bold text-zinc-900">#{orderId}</span></p>
      {currentOrder && (
        <div className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-6 sm:p-8 text-left mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 pb-6 border-b border-zinc-200">
            <div><span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Order Date</span><p className="text-sm font-semibold text-zinc-900 mt-1">{formatDate(currentOrder.createdAt)}</p></div>
            <div><span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Total</span><p className="text-sm font-semibold text-zinc-900 mt-1">{formatCurrency(currentOrder.total)}</p></div>
            <div><span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Payment Method</span><p className="text-sm font-semibold text-zinc-900 mt-1 uppercase">{currentOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : currentOrder.paymentMethod}</p></div>
            <div><span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Status</span><p className="text-sm font-semibold text-zinc-900 mt-1">{currentOrder.status}</p></div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Package className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-zinc-900">Shipping to:</p>
                <p className="text-xs text-zinc-600 leading-relaxed mt-0.5">{currentOrder.shippingAddress.fullName}<br />{currentOrder.shippingAddress.address}, {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.postalCode}, {currentOrder.shippingAddress.country}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
              <div><p className="text-xs font-semibold text-zinc-900">Confirmation sent to:</p><p className="text-xs text-zinc-600 mt-0.5">{currentOrder.shippingAddress.email}</p></div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Button variant="outline" onClick={() => navigate('/orders')} leftIcon={<Package className="w-4 h-4" />}>View My Orders</Button>
        <Button onClick={() => navigate('/shop')} rightIcon={<ArrowRight className="w-4 h-4" />}>Continue Shopping</Button>
      </div>
      <Link to="/" className="inline-flex items-center gap-2 mt-8 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 transition-colors"><Home className="w-3.5 h-3.5" /> Back to Home</Link>
    </motion.div>
  );
};
export default OrderConfirmation;
