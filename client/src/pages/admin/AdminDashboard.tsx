import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  Clock,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { adminService, DashboardStats } from '../../services/adminService';
import { formatCurrency, formatDate } from '../../utils/format';
import { OrderStatusBadge } from '../../components/checkout/OrderStatusBadge';
import { toast } from '../../components/common/Toaster';
import type { Order } from '../../types';

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService
      .getStats()
      .then((data: DashboardStats) => setStats(data))
      .catch((err: any) => toast(err.message || 'Failed to load stats', 'error'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (!stats) return null;

  const cards = [
    { label: 'Total Revenue', value: formatCurrency(stats.totalRevenue), icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'text-blue-600 bg-blue-50' },
    { label: 'Pending Orders', value: stats.pendingOrders, icon: Clock, color: 'text-amber-600 bg-amber-50' },
    { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'text-violet-600 bg-violet-50' },
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-pink-600 bg-pink-50' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">Overview of your store's performance</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white border border-zinc-200 rounded-2xl p-5">
              <div className={'w-10 h-10 rounded-xl flex items-center justify-center mb-3 ' + card.color}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">{card.label}</p>
              <p className="text-xl font-bold text-zinc-900">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-zinc-100">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-900">Recent Orders</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Latest 5 orders from customers</p>
          </div>
          <Link to="/admin/orders" className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-zinc-600 flex items-center gap-1 transition-colors">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {stats.recentOrders.length === 0 ? (
          <div className="p-12 text-center text-sm text-zinc-500">No orders yet</div>
        ) : (
          <div className="divide-y divide-zinc-100">
            {stats.recentOrders.map((order: Order) => (
              <Link key={order.id} to="/admin/orders" className="flex items-center justify-between gap-4 p-4 hover:bg-zinc-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-zinc-900">#{order.id}</p>
                  <p className="text-xs text-zinc-500 truncate">
                    {order.shippingAddress?.fullName} · {order.shippingAddress?.email}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-sm text-zinc-900">{formatCurrency(order.total)}</p>
                  <p className="text-xs text-zinc-500">{formatDate(order.createdAt)}</p>
                </div>
                <OrderStatusBadge status={order.status} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;