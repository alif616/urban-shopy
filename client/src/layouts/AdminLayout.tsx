import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  ArrowLeft,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { toast } from '../components/common/Toaster';
import { cn } from '../utils/helpers';

interface NavItem {
  label: string;
  to: string;
  icon: typeof LayoutDashboard;
  exact: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Products', to: '/admin/products', icon: Package, exact: false },
  { label: 'Orders', to: '/admin/orders', icon: ShoppingBag, exact: false },
  { label: 'Users', to: '/admin/users', icon: Users, exact: false },
];

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    toast('Logged out', 'info');
    navigate('/');
  };

  const isActive = (item: NavItem) =>
    item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);

  return (
    <div className="min-h-screen flex bg-zinc-50">
      <aside className="w-64 bg-zinc-900 text-white flex flex-col fixed inset-y-0 left-0 z-30">
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Admin Panel
            </span>
          </div>
          <Link
            to="/"
            className="text-xl font-black tracking-tighter uppercase block mb-4"
          >
            URBAN SHOPY
          </Link>
          <div className="text-xs text-zinc-400">
            Signed in as
            <br />
            <span className="text-white font-semibold">
              {user?.name || 'Admin'}
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive(item)
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Store
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 min-h-screen bg-zinc-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;