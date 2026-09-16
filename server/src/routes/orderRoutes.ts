import { Router } from 'express';
import { createOrder, getUserOrders, getOrderById } from '../controllers/orderController';
import { protect } from '../middleware/auth';
import { requireFields } from '../middleware/validate';

const router = Router();
router.use(protect);
router.post('/', requireFields(['items', 'shippingAddress']), createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrderById);
export default router;
