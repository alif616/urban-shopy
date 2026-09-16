import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { cn } from '../../utils/helpers';

interface ProductGridProps {
  products: Product[];
  onQuickView?: (product: Product) => void;
  columns?: 2 | 3 | 4;
  className?: string;
}

const gridCols = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
};

export const ProductGrid = ({ products, onQuickView, columns = 4, className }: ProductGridProps) => (
  <div className={cn('grid gap-x-6 gap-y-10', gridCols[columns], className)}>
    {products.map((product) => (
      <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
    ))}
  </div>
);
export default ProductGrid;
