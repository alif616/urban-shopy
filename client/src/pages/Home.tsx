import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../store/hooks';
import { fetchProducts } from '../store/slices/productsSlice';
import { Hero } from '../components/home/Hero';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { ValueProps } from '../components/home/ValueProps';
import { NewsletterBanner } from '../components/home/NewsletterBanner';

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => { dispatch(fetchProducts({})); }, [dispatch]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Hero />
      <CategoryGrid />
      <ValueProps />
      <NewsletterBanner />
    </motion.div>
  );
};
export default Home;
