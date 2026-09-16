import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts } from '../store/slices/productsSlice';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductFilters, FilterState } from '../components/product/ProductFilters';
import { ProductSort } from '../components/product/ProductSort';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { Loader } from '../components/ui/Loader';
import type { Product } from '../types';
import type { SortOption } from '../config/constants';
import { DEFAULT_MAX_PRICE } from '../config/constants';

const Shop = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { items: products, isLoading } = useAppSelector((state) => state.products);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const initialCategory = searchParams.get('category') || 'All';
  const initialNewArrival = searchParams.get('newArrival') === 'true';
  const initialSort = (searchParams.get('sort') as SortOption) || 'newest';

  const [filters, setFilters] = useState<FilterState>({ category: initialCategory, maxPrice: DEFAULT_MAX_PRICE, newArrival: initialNewArrival });
  const [sort, setSort] = useState<SortOption>(initialSort);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, category: searchParams.get('category') || 'All', newArrival: searchParams.get('newArrival') === 'true' }));
  }, [searchParams]);

  useEffect(() => { dispatch(fetchProducts({})); }, [dispatch]);

  const searchQuery = searchParams.get('q') || '';

  const filteredProducts = useMemo(() => {
    let results = [...products];
    if (filters.category && filters.category !== 'All') results = results.filter((p) => p.category === filters.category);
    if (filters.newArrival) results = results.filter((p) => p.newArrival);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    results = results.filter((p) => (p.discountPrice || p.price) <= filters.maxPrice);
    switch (sort) {
      case 'price_asc': results.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)); break;
      case 'price_desc': results.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)); break;
      case 'rating': results.sort((a, b) => b.rating - a.rating); break;
      default: results.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
    }
    return results;
  }, [products, filters, sort, searchQuery]);

  const updateFilters = (next: FilterState) => {
    setFilters(next);
    const params = new URLSearchParams(searchParams);
    if (next.category && next.category !== 'All') params.set('category', next.category); else params.delete('category');
    if (next.newArrival) params.set('newArrival', 'true'); else params.delete('newArrival');
    setSearchParams(params, { replace: true });
  };
  const resetFilters = () => { setFilters({ category: 'All', maxPrice: DEFAULT_MAX_PRICE, newArrival: false }); setSort('newest'); setSearchParams({}, { replace: true }); };
  const clearSearch = () => { const params = new URLSearchParams(searchParams); params.delete('q'); setSearchParams(params, { replace: true }); };
  const headingTitle = searchQuery ? 'Search results for "' + searchQuery + '"' : filters.category === 'All' ? 'All Products' : filters.category;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 pb-6 border-b border-zinc-100 gap-4">
        <div>
          <span className="label-eyebrow">Catalog</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mt-1 flex items-center gap-3">
            {headingTitle}
            {searchQuery && <button onClick={clearSearch} className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500 cursor-pointer" aria-label="Clear search"><X className="w-4 h-4" /></button>}
          </h1>
          <p className="text-xs text-zinc-500 mt-1">{filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button onClick={() => setMobileFiltersOpen(true)} className="md:hidden inline-flex items-center gap-2 px-4 py-2.5 border border-zinc-200 rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer"><SlidersHorizontal className="w-3.5 h-3.5" /> Filters</button>
          <ProductSort value={sort} onChange={setSort} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="hidden md:block w-64 flex-shrink-0">
          <ProductFilters filters={filters} onChange={updateFilters} onReset={resetFilters} />
        </div>
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-4/5 max-w-xs bg-white p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold uppercase tracking-wider text-sm">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)} className="p-2 cursor-pointer" aria-label="Close filters"><X className="w-5 h-5" /></button>
              </div>
              <ProductFilters filters={filters} onChange={(f) => { updateFilters(f); setMobileFiltersOpen(false); }} onReset={() => { resetFilters(); setMobileFiltersOpen(false); }} />
            </div>
          </div>
        )}
        <div className="flex-1">
          {isLoading ? (<Loader fullScreen label="Loading products" />) : filteredProducts.length === 0 ? (
            <EmptyState icon={<Search className="w-6 h-6" />} title="No products match your search" description="Try broadening your filters or clearing your search term." action={<Button onClick={resetFilters} variant="primary" size="sm">Clear Filters</Button>} />
          ) : (
            <ProductGrid products={filteredProducts} onQuickView={setQuickViewProduct} columns={3} />
          )}
        </div>
      </div>
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
};
export default Shop;
