import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Sparkles, Heart, User, Package, Search } from 'lucide-react';
import { useAppSelector } from '../../store/hooks';

interface NavLink { label: string; to: string; }

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  onOpenAssistant?: () => void;
  onOpenSearch: () => void;
}

export const MobileMenu = ({ isOpen, onClose, navLinks, onOpenAssistant, onOpenSearch }: MobileMenuProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const wishlist = useAppSelector((state) => state.wishlist.items);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50 z-50 lg:hidden" />
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25 }} className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white z-50 flex flex-col lg:hidden shadow-2xl">
            <div className="p-6 flex justify-between items-center border-b border-zinc-100">
              <span className="font-bold tracking-tighter uppercase text-lg">URBAN SHOPY</span>
              <button onClick={onClose} className="p-2 text-zinc-500 cursor-pointer" aria-label="Close menu"><X className="w-5 h-5" /></button>
            </div>
            <nav className="flex flex-col p-6 gap-5 text-sm font-semibold uppercase tracking-wider">
              <button onClick={onOpenSearch} className="text-left flex items-center gap-3 text-zinc-700 cursor-pointer"><Search className="w-4 h-4" /> Search</button>
              {navLinks.map((link) => (<Link key={link.label} to={link.to} onClick={onClose} className="text-left text-zinc-900 cursor-pointer">{link.label}</Link>))}
              {onOpenAssistant && (
                <button onClick={() => { onClose(); onOpenAssistant(); }} className="text-left text-amber-700 flex items-center gap-2 cursor-pointer font-bold"><Sparkles className="w-4 h-4" /> Style Assistant</button>
              )}
              <Link to="/wishlist" onClick={onClose} className="text-left text-zinc-700 flex items-center justify-between cursor-pointer">
                <span className="flex items-center gap-3"><Heart className="w-4 h-4" /> Wishlist</span>
                {wishlist.length > 0 && <span className="px-2 py-0.5 bg-red-600 text-white rounded-full text-xs">{wishlist.length}</span>}
              </Link>
              <div className="h-px bg-zinc-100 my-2" />
              {user ? (
                <>
                  <Link to="/account" onClick={onClose} className="flex items-center gap-3 text-zinc-700 cursor-pointer"><User className="w-4 h-4" /> My Account</Link>
                  <Link to="/orders" onClick={onClose} className="flex items-center gap-3 text-zinc-700 cursor-pointer"><Package className="w-4 h-4" /> My Orders</Link>
                </>
              ) : (
                <Link to="/login" onClick={onClose} className="flex items-center gap-3 text-zinc-700 cursor-pointer"><User className="w-4 h-4" /> Login / Register</Link>
              )}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default MobileMenu;
