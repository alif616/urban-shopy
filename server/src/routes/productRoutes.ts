import { Router } from 'express';
import { getProducts, getProductBySlug, getFeaturedProducts, getNewArrivals } from '../controllers/productController';

const router = Router();
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/new-arrivals', getNewArrivals);
router.get('/:slug', getProductBySlug);
export default router;
