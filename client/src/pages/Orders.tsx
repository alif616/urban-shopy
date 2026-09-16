import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ArrowLeft, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUserOrders } from '../store/slices/ordersSlice';
import { Button } from '../components/ui/Button';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';
import { OrderStatusBadge } from '../components/checkout/OrderStatusBadge';
import { formatCurrency, formatDate } from '../utils/format';

const Orders = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items: orders, isLoading } = useAppSelector((state) => state.orders);
  useEffect(() => { dispatch(fetchUserOrders()); }, [dispatch]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-100 rounded-full cursor-pointer" aria-label="Go back"><ArrowLeft className="w-5 h-5 text-zinc-600" /></button>
        <div>
          <span className="label-eyebrow">Account</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">My Orders</h1>
        </div>
      </div>
      {isLoading ? (<Loader fullScreen label="Loading orders" />) : orders.length === 0 ? (
        <EmptyState icon={<Package className="w-6 h-6" />} title="No past orders found" description="Place your first order to see your delivery timeline here." action={<Link to="/shop"><Button>Explore Shop</Button></Link>} />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link key={order.id} to={'/orders/' + order.id} className="block border border-zinc-200/80 rounded-3xl overflow-hidden bg-white hover:border-zinc-900 transition-colors group">
              <div className="bg-zinc-50/80 px-5 sm:px-6 py-4 flex flex-wrap justify-between gap-4 border-b border-zinc-200/60 text-xs">
                <div><span className="text-zinc-400 block">Order</span><span className="font-bold text-zinc-900">{order.id}</span></div>
                <div><span className="text-zinc-400 block">Date</span><span className="font-semibold text-zinc-900">{formatDate(order.createdAt)}</span></div>
                <div><span className="text-zinc-400 block">Total</span><span className="font-bold text-zinc-900">{formatCurrency(order.total)}</span></div>
                <div><span className="text-zinc-400 block mb-0.5">Status</span><OrderStatusBadge status={order.status} /></div>
              </div>
              <div className="px-5 sm:px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-xs text-zinc-600"><Package className="w-4 h-4" /><span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span></div>
                <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-900 group-hover:gap-2 transition-all">View Details <ChevronRight className="w-4 h-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
};
export default Orders;
