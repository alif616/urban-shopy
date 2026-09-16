import { cn } from '../../utils/helpers';
import type { OrderStatus } from '../../config/constants';

interface OrderStatusBadgeProps { status: OrderStatus | string; className?: string; }

const statusClasses: Record<string, string> = {
  Pending: 'bg-amber-100 text-amber-800 border-amber-200',
  Confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
  Processing: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  Shipped: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  Delivered: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Cancelled: 'bg-red-100 text-red-800 border-red-200',
};

export const OrderStatusBadge = ({ status, className }: OrderStatusBadgeProps) => {
  const classes = statusClasses[status] || statusClasses.Pending;
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border', classes, className)}>{status}</span>
  );
};
export default OrderStatusBadge;
