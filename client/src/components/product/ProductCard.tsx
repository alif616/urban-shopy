import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Eye } from 'lucide-react';
import type { Product } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { getEffectivePrice, getDiscountPercent, cn } from '../../utils/helpers';
import { formatCurrency } from '../../utils/format';
import { Badge } from '../ui/Badge';
import { ProductRating } from './ProductRating';
import { toast } from '../common/Toaster';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.some((p) => p.id === product.id);
  const effectivePrice = getEffectivePrice(product.price, product.discountPrice);
  const discount = getDiscountPercent(product.price, product.discountPrice);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    dispatch(toggleWishlist(product));
    toast(isWishlisted ? 'Removed from wishlist' : 'Saved to wishlist', isWishlisted ? 'info' : 'success');
  };
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    onQuickView?.(product);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="group flex flex-col gap-3">
      <div className="relative aspect-[3/4] bg-zinc-100 rounded-2xl overflow-hidden">
        <Link to={'/product/' + product.slug} className="block w-full h-full">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
          {product.images[1] && (
            <img src={product.images[1]} alt={product.name + ' alt'} className="w-full h-full object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" loading="lazy" />
          )}
        </Link>
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.newArrival && <Badge variant="new">New</Badge>}
          {discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
        </div>
        <button onClick={handleWishlistClick} className={cn('absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all z-10 shadow-sm cursor-pointer', isWishlisted ? 'bg-white text-red-500' : 'bg-white/80 text-zinc-600 hover:text-zinc-900 hover:bg-white')} aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
          <Heart className={cn('w-4 h-4', isWishlisted && 'fill-red-500')} />
        </button>
        {onQuickView && (
          <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10 hidden sm:block">
            <button onClick={handleQuickView} className="w-full py-2.5 bg-white/95 backdrop-blur-md text-zinc-900 text-xs font-semibold uppercase tracking-wider rounded-xl shadow-lg hover:bg-zinc-900 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer">
              <Eye className="w-3.5 h-3.5" /> Quick View
            </button>
          </div>
        )}
      </div>
      <div>
        <div className="flex justify-between items-start mb-1 gap-2">
          <Link to={'/product/' + product.slug} className="font-medium text-sm text-zinc-900 hover:text-zinc-600 transition-colors line-clamp-1 text-left">{product.name}</Link>
          <div className="flex gap-1.5 items-center flex-shrink-0 text-sm">
            {product.discountPrice ? (
              <>
                <span className="font-semibold text-red-600">{formatCurrency(effectivePrice)}</span>
                <span className="text-xs text-zinc-400 line-through">{formatCurrency(product.price)}</span>
              </>
            ) : (
              <span className="font-semibold text-zinc-900">{formatCurrency(product.price)}</span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>{product.category}</span>
          <ProductRating rating={product.rating} reviewsCount={product.reviewsCount} />
        </div>
      </div>
    </motion.div>
  );
};
export default ProductCard;
