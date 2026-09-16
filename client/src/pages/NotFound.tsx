import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8">
          <span className="text-[120px] sm:text-[160px] font-black tracking-tighter text-zinc-100 leading-none block select-none">404</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-400"><Search className="w-8 h-8" /></div>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mb-3">Page Not Found</h1>
        <p className="text-sm text-zinc-500 leading-relaxed mb-8 max-w-sm mx-auto">The page you are looking for does not exist or has been moved. Let's get you back on track.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate(-1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>Go Back</Button>
          <Link to="/"><Button leftIcon={<Home className="w-4 h-4" />} fullWidth>Back to Home</Button></Link>
        </div>
        <div className="mt-10 pt-8 border-t border-zinc-100">
          <p className="text-[11px] uppercase tracking-widest text-zinc-400 font-bold mb-3">Popular Destinations</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link to="/shop" className="text-xs font-semibold text-zinc-700 hover:text-zinc-900 underline underline-offset-2">Shop All</Link>
            <span className="text-zinc-300">·</span>
            <Link to="/shop?category=Men" className="text-xs font-semibold text-zinc-700 hover:text-zinc-900 underline underline-offset-2">Men</Link>
            <span className="text-zinc-300">·</span>
            <Link to="/shop?category=Women" className="text-xs font-semibold text-zinc-700 hover:text-zinc-900 underline underline-offset-2">Women</Link>
            <span className="text-zinc-300">·</span>
            <Link to="/contact" className="text-xs font-semibold text-zinc-700 hover:text-zinc-900 underline underline-offset-2">Contact</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default NotFound;
