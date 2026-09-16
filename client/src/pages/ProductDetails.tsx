import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PackageX } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProductBySlug, clearCurrentProduct } from '../store/slices/productsSlice';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductInfo } from '../components/product/ProductInfo';
import { ProductBreadcrumbs } from '../components/product/ProductBreadcrumbs';
import { RelatedProducts } from '../components/product/RelatedProducts';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { Loader } from '../components/ui/Loader';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import type { Product } from '../types';

const ProductDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentProduct: product, isLoading } = useAppSelector((state) => state.products);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (slug) dispatch(fetchProductBySlug(slug));
    return () => { dispatch(clearCurrentProduct()); };
  }, [dispatch, slug]);

  if (isLoading) return <Loader fullScreen label="Loading product" />;
  if (!product) return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <EmptyState icon={<PackageX className="w-6 h-6" />} title="Product not found" description="The product you are looking for may have been moved or is no longer available." action={<Button onClick={() => navigate('/shop')} variant="primary">Browse Shop</Button>} />
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductBreadcrumbs category={product.category} productName={product.name} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7"><ProductGallery images={product.images} name={product.name} /></div>
          <div className="lg:col-span-5"><ProductInfo product={product} /></div>
        </div>
      </div>
      <RelatedProducts currentProduct={product} onQuickView={setQuickViewProduct} />
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </motion.div>
  );
};
export default ProductDetails;
