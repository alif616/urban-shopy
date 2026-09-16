import { useEffect, useState } from 'react';
import { Search, Loader2, Package, ChevronDown } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { OrderStatusBadge } from '../../components/checkout/OrderStatusBadge';
import { formatCurrency, formatDate } from '../../utils/format';
import { toast } from '../../components/common/Toaster';
import { ORDER_STATUSES } from '../../config/constants';
import type { Order } from '../../types';

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    adminService
      .listOrders()
      .then((data: Order[]) => setOrders(data))
      .catch((err: any) => toast(err.message || 'Failed to load orders', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await adminService.updateOrderStatus(orderId, status);
      setOrders((prev) => prev.map((o) => (o.id === orderId || o._id === orderId ? { ...o, status: status as any } : o)));
      toast('Status updated to ' + status, 'success');
    } catch (err: any) {
      toast(err.message || 'Failed to update', 'error');
    }
  };

  const filtered = orders.filter(
    (o: Order) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      (o.shippingAddress?.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (o.shippingAddress?.fullName || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Orders</h1>
        <p className="text-sm text-zinc-500 mt-1">{orders.length} total orders placed</p>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by order ID, email, or name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm outline-none focus:border-zinc-900 transition-colors"
        />
      </div>

      {loading ? (
        <div className="p-12 flex items-center justify-center bg-white border border-zinc-200 rounded-2xl">
          <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center">
          <Package className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
          <p className="text-sm text-zinc-500">No orders found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order: Order) => {
            const oid = order.id || order._id;
            const isOpen = expanded === oid;
            return (
              <div key={oid} className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
                <button onClick={() => setExpanded(isOpen ? null : oid)} className="w-full flex flex-wrap items-center justify-between gap-4 p-5 text-left hover:bg-zinc-50 transition-colors cursor-pointer">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-zinc-900">#{order.id}</p>
                    <p className="text-xs text-zinc-500 mt-0.5 truncate">
                      {order.shippingAddress?.fullName} · {order.shippingAddress?.email}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-zinc-900">{formatCurrency(order.total)}</p>
                    <p className="text-xs text-zinc-500">{formatDate(order.createdAt)}</p>
                  </div>
                  <OrderStatusBadge status={order.status} />
                  <ChevronDown className={'w-4 h-4 text-zinc-400 transition-transform ' + (isOpen ? 'rotate-180' : '')} />
                </button>

                {isOpen && (
                  <div className="border-t border-zinc-100 p-5 space-y-4 bg-zinc-50/50">
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-600">Change Status:</label>
                      <select value={order.status} onChange={(e) => handleStatusChange(oid, e.target.value)} className="px-4 py-2 border border-zinc-200 rounded-lg bg-white text-sm font-medium outline-none focus:border-zinc-900 cursor-pointer">
                        {ORDER_STATUSES.map((s) => (<option key={s} value={s}>{s}</option>))}
                      </select>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Items ({order.items.length})</p>
                      <div className="bg-white border border-zinc-200 rounded-xl divide-y divide-zinc-100">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3">
                            <img src={item.image} alt={item.name} className="w-10 h-12 object-cover rounded-lg bg-zinc-100" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-zinc-900 truncate">{item.name}</p>
                              <p className="text-xs text-zinc-500">{item.color} / {item.size} × {item.quantity}</p>
                            </div>
                            <span className="text-sm font-semibold text-zinc-900">{formatCurrency(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Ship To</p>
                      <div className="bg-white border border-zinc-200 rounded-xl p-4 text-xs text-zinc-700 leading-relaxed">
                        <p className="font-semibold text-zinc-900">{order.shippingAddress?.fullName}</p>
                        <p>{order.shippingAddress?.address}</p>
                        <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
                        <p>{order.shippingAddress?.country}</p>
                        <p className="mt-2">Email: {order.shippingAddress?.email}</p>
                        <p>Phone: {order.shippingAddress?.phone}</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="text-right text-xs">
                        <p className="text-zinc-500">Subtotal: <span className="font-semibold text-zinc-900">{formatCurrency(order.subtotal)}</span></p>
                        <p className="text-zinc-500">Shipping: <span className="font-semibold text-zinc-900">{order.shipping === 0 ? 'FREE' : formatCurrency(order.shipping)}</span></p>
                        <p className="text-sm font-bold text-zinc-900 mt-1">Total: {formatCurrency(order.total)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;