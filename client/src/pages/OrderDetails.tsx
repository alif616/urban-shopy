import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, MapPin, Mail, Phone, CreditCard, Calendar } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchOrderById, clearCurrentOrder } from '../store/slices/ordersSlice';
import { Button } from '../components/ui/Button';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';
import { OrderStatusBadge } from '../components/checkout/OrderStatusBadge';
import { OrderItemRow } from '../components/checkout/OrderItemRow';
import { formatCurrency, formatDateTime } from '../utils/format';

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentOrder: order, isLoading } = useAppSelector((state) => state.orders);
  useEffect(() => {
    if (id) dispatch(fetchOrderById(id));
    return () => { dispatch(clearCurrentOrder()); };
  }, [dispatch, id]);

  if (isLoading) return <Loader fullScreen label="Loading order" />;
  if (!order) return (
    <div className="max-w-xl mx-auto px-4 py-20">
      <EmptyState icon={<Package className="w-6 h-6" />} title="Order not found" description="We could not find the order you are looking for." action={<Link to="/orders"><Button>Back to Orders</Button></Link>} />
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-100 rounded-full cursor-pointer" aria-label="Go back"><ArrowLeft className="w-5 h-5 text-zinc-600" /></button>
        <div>
          <span className="label-eyebrow">Order Details</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 flex items-center gap-3 flex-wrap">#{order.id} <OrderStatusBadge status={order.status} /></h1>
        </div>
      </div>
      <div className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-6 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1"><Calendar className="w-3.5 h-3.5" /><span className="font-bold uppercase tracking-wider">Placed</span></div>
            <p className="font-semibold text-zinc-900">{formatDateTime(order.createdAt)}</p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1"><CreditCard className="w-3.5 h-3.5" /><span className="font-bold uppercase tracking-wider">Payment</span></div>
            <p className="font-semibold text-zinc-900 uppercase">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}</p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1"><Package className="w-3.5 h-3.5" /><span className="font-bold uppercase tracking-wider">Items</span></div>
            <p className="font-semibold text-zinc-900">{order.items.reduce((s, i) => s + i.quantity, 0)} items</p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1"><span className="font-bold uppercase tracking-wider">Total</span></div>
            <p className="font-bold text-zinc-900">{formatCurrency(order.total)}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-zinc-200/80 rounded-3xl p-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 mb-5">Items in this Order</h2>
          <div className="divide-y divide-zinc-100">
            {order.items.map((item, idx) => (<OrderItemRow key={item.productId + '-' + idx} item={item} />))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200/80 rounded-3xl p-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 mb-5">Shipping Address</h2>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-zinc-900">{order.shippingAddress.fullName}</p>
                  <p className="text-zinc-600 mt-0.5 leading-relaxed">{order.shippingAddress.address}<br />{order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />{order.shippingAddress.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-zinc-500 flex-shrink-0" /><span className="text-zinc-600 break-all">{order.shippingAddress.email}</span></div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-zinc-500 flex-shrink-0" /><span className="text-zinc-600">{order.shippingAddress.phone}</span></div>
            </div>
          </div>
          <div className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 mb-4">Payment Summary</h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-zinc-600"><span>Subtotal</span><span className="font-semibold text-zinc-900">{formatCurrency(order.subtotal)}</span></div>
              <div className="flex justify-between text-zinc-600"><span>Shipping</span><span className="font-semibold text-zinc-900">{order.shipping === 0 ? 'FREE' : formatCurrency(order.shipping)}</span></div>
              <div className="flex justify-between text-sm font-bold text-zinc-900 pt-3 border-t border-zinc-200 mt-2"><span>Total</span><span>{formatCurrency(order.total)}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center"><Link to="/orders"><Button variant="outline">Back to All Orders</Button></Link></div>
    </motion.div>
  );
};
export default OrderDetails;
