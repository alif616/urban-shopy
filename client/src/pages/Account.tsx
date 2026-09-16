import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User as UserIcon, Mail, Package, Heart, LogOut, Calendar } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { clearCart } from '../store/slices/cartSlice';
import { Button } from '../components/ui/Button';
import { toast } from '../components/common/Toaster';
import { formatDate } from '../utils/format';

const Account = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const orders = useAppSelector((state) => state.orders.items);
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length);
  if (!user) return null;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    toast('Logged out successfully', 'info');
    navigate('/');
  };
  const initials = user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <span className="label-eyebrow">My Account</span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mt-1">Welcome, {user.name.split(' ')[0]}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="md:col-span-2 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 mb-6">Profile Information</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xl font-bold">{initials}</div>
            <div>
              <p className="font-bold text-zinc-900">{user.name}</p>
              <p className="text-xs text-zinc-500">{user.email}</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-zinc-700"><UserIcon className="w-4 h-4 text-zinc-400" /><span>{user.name}</span></div>
            <div className="flex items-center gap-3 text-zinc-700"><Mail className="w-4 h-4 text-zinc-400" /><span>{user.email}</span></div>
            {user.createdAt && <div className="flex items-center gap-3 text-zinc-700"><Calendar className="w-4 h-4 text-zinc-400" /><span>Member since {formatDate(user.createdAt)}</span></div>}
          </div>
          <div className="mt-8 pt-6 border-t border-zinc-100">
            <Button variant="outline" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" /> Sign Out</Button>
          </div>
        </div>
        <div className="space-y-4">
          <Link to="/orders" className="block bg-white border border-zinc-200/80 rounded-2xl p-5 hover:border-zinc-900 transition-colors group">
            <div className="flex items-center justify-between mb-2"><Package className="w-5 h-5 text-zinc-700" /><span className="text-xs font-bold text-zinc-900">{orders.length}</span></div>
            <p className="font-bold text-sm text-zinc-900 group-hover:text-zinc-700">My Orders</p>
            <p className="text-[11px] text-zinc-500">Track your purchases</p>
          </Link>
          <Link to="/wishlist" className="block bg-white border border-zinc-200/80 rounded-2xl p-5 hover:border-zinc-900 transition-colors group">
            <div className="flex items-center justify-between mb-2"><Heart className="w-5 h-5 text-zinc-700" /><span className="text-xs font-bold text-zinc-900">{wishlistCount}</span></div>
            <p className="font-bold text-sm text-zinc-900 group-hover:text-zinc-700">My Wishlist</p>
            <p className="text-[11px] text-zinc-500">Saved for later</p>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default Account;
