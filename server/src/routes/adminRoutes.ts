import { Router } from 'express';
import { protect } from '../middleware/auth';
import { requireAdmin } from '../middleware/admin';
import {
  getDashboardStats,
  adminListProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  adminListOrders,
  adminUpdateOrderStatus,
  adminListUsers,
} from '../controllers/adminController';

const router = Router();

router.use(protect, requireAdmin);

router.get('/stats', getDashboardStats);

router.get('/products', adminListProducts);
router.post('/products', adminCreateProduct);
router.put('/products/:id', adminUpdateProduct);
router.delete('/products/:id', adminDeleteProduct);

router.get('/orders', adminListOrders);
router.patch('/orders/:id/status', adminUpdateOrderStatus);

router.get('/users', adminListUsers);

export default router;