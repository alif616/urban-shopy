import { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import { ProductCard } from './ProductCard';
import type { Product } from '../../types';

interface RelatedProductsProps {
  currentProduct: Product;
  onQuickView?: (product: Product) => void;
}

export const RelatedProducts = ({ currentProduct, onQuickView }: RelatedProductsProps) => {
  const allProducts = useAppSelector((state) => state.products.items);
  const related = useMemo(
    () => allProducts.filter((p) => p.id !== currentProduct.id && p.category === currentProduct.category).slice(0, 4),
    [allProducts, currentProduct]
  );
  if (related.length === 0) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-zinc-100">
      <div className="mb-10">
        <span className="label-eyebrow">You May Also Like</span>
        <h2 className="section-heading mt-1">Related Products</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {related.map((p) => (<ProductCard key={p.id} product={p} onQuickView={onQuickView} />))}
      </div>
    </section>
  );
};
export default RelatedProducts;
