import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft } from 'lucide-react';
import { useAppSelector } from '../store/hooks';
import { ProductGrid } from '../components/product/ProductGrid';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';

const Wishlist = () => {
  const navigate = useNavigate();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-100 rounded-full cursor-pointer" aria-label="Go back"><ArrowLeft className="w-5 h-5 text-zinc-600" /></button>
        <div>
          <span className="label-eyebrow">Saved Items</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">My Wishlist <span className="text-zinc-400 font-normal">({wishlist.length})</span></h1>
        </div>
      </div>
      {wishlist.length === 0 ? (
        <div className="max-w-lg mx-auto">
          <EmptyState icon={<Heart className="w-6 h-6" />} title="Your wishlist is empty" description="Explore products and click the heart icon to save your favorites for later." action={<Link to="/shop"><Button variant="primary">Explore Products</Button></Link>} />
        </div>
      ) : (
        <>
          <ProductGrid products={wishlist} columns={4} />
          <div className="mt-12 text-center"><Link to="/shop"><Button variant="outline">Continue Shopping</Button></Link></div>
        </>
      )}
    </motion.div>
  );
};
export default Wishlist;
