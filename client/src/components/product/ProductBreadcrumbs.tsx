import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface ProductBreadcrumbsProps { category: string; productName: string; }

export const ProductBreadcrumbs = ({ category, productName }: ProductBreadcrumbsProps) => (
  <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-8 flex-wrap">
    <Link to="/" className="hover:text-zinc-900 transition-colors">Home</Link>
    <ChevronRight className="w-3 h-3" />
    <Link to={'/shop?category=' + encodeURIComponent(category)} className="hover:text-zinc-900 transition-colors">{category}</Link>
    <ChevronRight className="w-3 h-3" />
    <span className="text-zinc-900 truncate max-w-[200px]">{productName}</span>
  </nav>
);
export default ProductBreadcrumbs;
