import { Router } from 'express';
import { createAdminOnce } from '../controllers/setupController';

const router = Router();

// TEMPORARY: one-time setup route. Remove after use.
router.post('/create-admin', createAdminOnce);

export default router;