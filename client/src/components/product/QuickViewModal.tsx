import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Heart, Star } from 'lucide-react';
import type { Product } from '../../types';
import { Button } from '../ui/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { formatCurrency } from '../../utils/format';
import { cn } from '../../utils/helpers';
import { toast } from '../common/Toaster';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal = ({ product, onClose }: QuickViewModalProps) => {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0]?.name || '');
    }
  }, [product]);
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (product) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  if (!product) return null;
  const isWishlisted = wishlist.some((p) => p.id === product.id);
  const effectivePrice = product.discountPrice || product.price;

  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: product.id, name: product.name, price: effectivePrice,
      image: product.images[0], size: selectedSize, color: selectedColor,
      quantity: 1, stock: product.stock,
    }));
    toast('Added "' + product.name + '" to cart', 'success');
    onClose();
  };
  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
    toast(isWishlisted ? 'Removed from wishlist' : 'Saved to wishlist', isWishlisted ? 'info' : 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full z-10 max-h-[90vh] flex flex-col md:flex-row">
          <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-white/80 rounded-full hover:bg-white text-zinc-700 cursor-pointer" aria-label="Close"><X className="w-5 h-5" /></button>
          <div className="w-full md:w-1/2 bg-zinc-100 aspect-[3/4] md:aspect-auto">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <span className="text-xs uppercase font-semibold text-zinc-400 tracking-wider">{product.category}</span>
              <Link to={'/product/' + product.slug} onClick={onClose} className="text-2xl font-bold text-zinc-900 mt-1 mb-2 block hover:text-zinc-700">{product.name}</Link>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-zinc-900">{formatCurrency(effectivePrice)}</span>
                {product.discountPrice && <span className="text-sm text-zinc-400 line-through">{formatCurrency(product.price)}</span>}
                <div className="flex items-center gap-1 ml-auto">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-zinc-900">{product.rating}</span>
                  <span className="text-xs text-zinc-400">({product.reviewsCount})</span>
                </div>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed mb-6 line-clamp-3">{product.description}</p>
              <div className="mb-4">
                <label className="text-xs font-semibold uppercase text-zinc-700 block mb-2">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button key={s} onClick={() => setSelectedSize(s)} className={cn('px-3 py-1.5 border text-xs font-semibold rounded-lg transition-all cursor-pointer', selectedSize === s ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 text-zinc-700 hover:border-zinc-400')}>{s}</button>
                  ))}
                </div>
              </div>
              <div className="mb-2">
                <label className="text-xs font-semibold uppercase text-zinc-700 block mb-2">Color</label>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button key={c.name} onClick={() => setSelectedColor(c.name)} title={c.name} className={cn('w-7 h-7 rounded-full border-2 transition-all cursor-pointer', selectedColor === c.name ? 'ring-2 ring-zinc-900 ring-offset-2 border-transparent' : 'border-zinc-300')} style={{ backgroundColor: c.hex }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button onClick={handleAddToCart} fullWidth>Add to Cart</Button>
              <button onClick={handleWishlist} className={cn('p-3 border border-zinc-200 rounded-full transition-colors cursor-pointer', isWishlisted ? 'bg-red-50 text-red-600 border-red-200' : 'hover:bg-zinc-50 text-zinc-700')} aria-label="Wishlist">
                <Heart className={cn('w-5 h-5', isWishlisted && 'fill-red-600')} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default QuickViewModal;
