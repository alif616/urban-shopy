import { Router } from 'express';
import { register, login, getCurrentUser } from '../controllers/authController';
import { protect } from '../middleware/auth';
import { requireFields, validateEmail, validatePassword } from '../middleware/validate';

const router = Router();
router.post('/register', requireFields(['name', 'email', 'password']), validateEmail, validatePassword, register);
router.post('/login', requireFields(['email', 'password']), validateEmail, login);
router.get('/me', protect, getCurrentUser);
export default router;
