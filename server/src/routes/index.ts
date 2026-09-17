import { Router } from 'express';
import authRoutes from './authRoutes';
import productRoutes from './productRoutes';
import orderRoutes from './orderRoutes';
import wishlistRoutes from './wishlistRoutes';
import adminRoutes from './adminRoutes';
import setupRoutes from './setupRoutes';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'Urban Shopy API is running', timestamp: new Date().toISOString() });
});

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/admin', adminRoutes);
router.use('/setup', setupRoutes);

export default router;