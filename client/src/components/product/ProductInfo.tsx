import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import type { Product } from '../../types';
import { Button } from '../ui/Button';
import { ProductRating } from './ProductRating';
import { SizeSelector, ColorSelector } from './VariantSelector';
import { QuantitySelector } from './QuantitySelector';
import { ProductTabs } from './ProductTabs';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { formatCurrency } from '../../utils/format';
import { cn } from '../../utils/helpers';
import { toast } from '../common/Toaster';

interface ProductInfoProps { product: Product; }

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.some((p) => p.id === product.id);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const effectivePrice = product.discountPrice || product.price;
  const inStock = product.stock > 0;

  const handleAddToCart = () => {
    if (!inStock) return;
    dispatch(addToCart({
      productId: product.id, name: product.name, price: effectivePrice,
      image: product.images[0], size: selectedSize, color: selectedColor,
      quantity, stock: product.stock,
    }));
    toast('Added ' + quantity + ' x "' + product.name + '" to cart', 'success');
  };
  const handleBuyNow = () => { handleAddToCart(); navigate('/checkout'); };
  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
    toast(isWishlisted ? 'Removed from wishlist' : 'Saved to wishlist', isWishlisted ? 'info' : 'success');
  };

  return (
    <div className="flex flex-col">
      <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">{product.category}</span>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mt-1 mb-3">{product.name}</h1>
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-2">
          {product.discountPrice ? (
            <>
              <span className="text-2xl font-bold text-red-600">{formatCurrency(effectivePrice)}</span>
              <span className="text-base text-zinc-400 line-through">{formatCurrency(product.price)}</span>
            </>
          ) : (
            <span className="text-2xl font-bold text-zinc-900">{formatCurrency(product.price)}</span>
          )}
        </div>
        <div className="h-4 w-px bg-zinc-200" />
        <ProductRating rating={product.rating} reviewsCount={product.reviewsCount} size="md" />
      </div>
      <p className="text-sm text-zinc-600 leading-relaxed mb-8">{product.description}</p>
      {!inStock && <div className="mb-4 inline-flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-700 w-fit">Out of stock</div>}
      {inStock && product.stock <= 10 && <div className="mb-4 inline-flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl text-xs font-semibold text-amber-800 w-fit">Only {product.stock} left in stock</div>}
      <ColorSelector colors={product.colors} selected={selectedColor} onChange={setSelectedColor} />
      <SizeSelector sizes={product.sizes} selected={selectedSize} onChange={setSelectedSize} />
      <div className="flex gap-3 mb-8 flex-wrap">
        <QuantitySelector value={quantity} onChange={setQuantity} max={Math.max(1, product.stock)} />
        <Button onClick={handleAddToCart} disabled={!inStock} className="flex-1 min-w-[160px]" leftIcon={<ShoppingBag className="w-4 h-4" />}>Add to Cart</Button>
        <button onClick={handleWishlist} className={cn('p-4 border border-zinc-200 rounded-full transition-colors cursor-pointer', isWishlisted ? 'bg-red-50 text-red-600 border-red-200' : 'hover:bg-zinc-50 text-zinc-700')} aria-label="Toggle wishlist">
          <Heart className={cn('w-5 h-5', isWishlisted && 'fill-red-600')} />
        </button>
      </div>
      <Button onClick={handleBuyNow} disabled={!inStock} variant="outline" fullWidth className="mb-8">Buy Now</Button>
      <div className="grid grid-cols-3 gap-4 py-5 border-y border-zinc-100 mb-2">
        <div className="flex flex-col items-center text-center gap-1.5">
          <Truck className="w-5 h-5 text-zinc-700" />
          <span className="text-[11px] font-semibold text-zinc-700">Free Shipping</span>
          <span className="text-[10px] text-zinc-400">Orders $150+</span>
        </div>
        <div className="flex flex-col items-center text-center gap-1.5">
          <RotateCcw className="w-5 h-5 text-zinc-700" />
          <span className="text-[11px] font-semibold text-zinc-700">30-Day Returns</span>
          <span className="text-[10px] text-zinc-400">Easy exchanges</span>
        </div>
        <div className="flex flex-col items-center text-center gap-1.5">
          <ShieldCheck className="w-5 h-5 text-zinc-700" />
          <span className="text-[11px] font-semibold text-zinc-700">Secure Checkout</span>
          <span className="text-[10px] text-zinc-400">SSL encrypted</span>
        </div>
      </div>
      <ProductTabs details={product.details} />
    </div>
  );
};
export default ProductInfo;
