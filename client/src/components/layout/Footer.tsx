import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import { toast } from '../common/Toaster';
import { APP_NAME, APP_TAGLINE } from '../../config/constants';

export const Footer = () => {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast('Subscribed to newsletter! (demo)', 'success');
  };
  return (
    <footer className="bg-zinc-900 text-white pt-20 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-black tracking-tighter uppercase block mb-4">{APP_NAME}</Link>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-sm">{APP_TAGLINE} Thoughtfully selected essentials designed for modern urban living, superior comfort, and timeless longevity.</p>
            <div className="flex gap-4 text-zinc-400">
              <a href="#instagram" onClick={(e) => e.preventDefault()} className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-white hover:text-zinc-900 transition-colors" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
              <a href="#twitter" onClick={(e) => e.preventDefault()} className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-white hover:text-zinc-900 transition-colors" aria-label="Twitter"><Twitter className="w-4 h-4" /></a>
              <a href="#facebook" onClick={(e) => e.preventDefault()} className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-white hover:text-zinc-900 transition-colors" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-zinc-300 mb-4">Shop Collections</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-zinc-400">
              <li><Link to="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=Men" className="hover:text-white transition-colors">Men's Apparel</Link></li>
              <li><Link to="/shop?category=Women" className="hover:text-white transition-colors">Women's Apparel</Link></li>
              <li><Link to="/shop?category=Footwear" className="hover:text-white transition-colors">Footwear</Link></li>
              <li><Link to="/shop?category=Accessories" className="hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-zinc-300 mb-4">Customer Support</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-zinc-400">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-zinc-300 mb-4">Newsletter</h4>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4">Subscribe to receive early drop access and exclusive urban wardrobe previews.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="email" required placeholder="Your email address" className="w-full pl-10 pr-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-sm text-white placeholder-zinc-500 outline-none focus:border-white transition-colors" />
              </div>
              <Button type="submit" size="sm" fullWidth>Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} {APP_NAME}. Built for portfolio demonstration.</p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
