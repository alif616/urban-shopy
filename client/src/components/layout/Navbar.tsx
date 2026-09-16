import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Heart, Menu, Sparkles } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { openCartDrawer } from '../../store/slices/uiSlice';
import { MobileMenu } from './MobileMenu';
import { SearchOverlay } from './SearchOverlay';
import { cn } from '../../utils/helpers';

interface NavbarProps { onOpenAssistant?: () => void; }

export const Navbar = ({ onOpenAssistant }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const user = useAppSelector((state) => state.auth.user);

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop All', to: '/shop' },
    { label: 'Men', to: '/shop?category=Men' },
    { label: 'Women', to: '/shop?category=Women' },
    { label: 'New Arrivals', to: '/shop?newArrival=true' },
  ];

  return (
    <>
      <div className="bg-zinc-900 text-white text-[11px] font-medium py-2 text-center tracking-widest uppercase px-4 flex items-center justify-center gap-3 flex-wrap">
        <span>Complimentary Shipping on all Domestic Orders over $150</span>
        {onOpenAssistant && (
          <button onClick={onOpenAssistant} className="underline hover:text-zinc-300 font-bold inline-flex items-center gap-1 cursor-pointer">
            <Sparkles className="w-3 h-3 text-amber-400" /> Try Style Assistant
          </button>
        )}
      </div>
      <header className={cn('sticky top-0 z-40 w-full transition-all duration-300', isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-zinc-200/80 py-3' : 'bg-white py-5')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="lg:hidden flex-1">
            <button onClick={() => setMobileMenuOpen(true)} className="p-2 -ml-2 text-zinc-700 cursor-pointer" aria-label="Open menu"><Menu className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <Link to="/" className="text-xl sm:text-2xl font-black tracking-tighter uppercase text-zinc-900">URBAN SHOPY</Link>
          </div>
          <nav className="hidden lg:flex flex-1 justify-center gap-8 items-center">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.to} className={cn('text-xs font-semibold uppercase tracking-wider transition-colors', isActive(link.to) ? 'text-zinc-900 font-bold' : 'text-zinc-700 hover:text-zinc-900')}>{link.label}</Link>
            ))}
            {onOpenAssistant && (
              <button onClick={onOpenAssistant} className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 hover:bg-amber-100 transition-all flex items-center gap-1 cursor-pointer">
                <Sparkles className="w-3 h-3" /> Style Assistant
              </button>
            )}
          </nav>
          <div className="flex-1 flex justify-end items-center gap-2 sm:gap-4">
            <button onClick={() => setSearchOpen(true)} className="p-2 text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer" aria-label="Search"><Search className="w-5 h-5" /></button>
            <Link to="/wishlist" className="hidden sm:block p-2 text-zinc-700 hover:text-zinc-900 transition-colors relative" aria-label="Wishlist">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{wishlistCount}</span>}
            </Link>
            <Link to={user ? '/account' : '/login'} className="hidden sm:block p-2 text-zinc-700 hover:text-zinc-900 transition-colors" aria-label="Account"><User className="w-5 h-5" /></Link>
            <button onClick={() => dispatch(openCartDrawer())} className="p-2 text-zinc-700 hover:text-zinc-900 transition-colors relative cursor-pointer" aria-label="Cart">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-zinc-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} navLinks={navLinks} onOpenAssistant={onOpenAssistant} onOpenSearch={() => { setMobileMenuOpen(false); setSearchOpen(true); }} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
export default Navbar;
