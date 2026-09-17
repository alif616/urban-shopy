import { Response, NextFunction } from 'express';
import AppError from '../utils/AppError';
import type { AuthenticatedRequest } from './auth';

export const requireAdmin = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    return next(new AppError('Not authenticated', 401));
  }
  if (req.user.role !== 'admin') {
    return next(new AppError('Admin access required', 403));
  }
  next();
};

export default requireAdmin;