import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';

export const requireFields = (fields: string[]) => (req: Request, _res: Response, next: NextFunction): void => {
  const missing: Record<string, string> = {};
  fields.forEach((field) => {
    const value = req.body?.[field];
    if (value === undefined || value === null || value === '') missing[field] = field + ' is required';
  });
  if (Object.keys(missing).length > 0) return next(new AppError('Missing required fields', 400, missing));
  next();
};

export const validateEmail = (req: Request, _res: Response, next: NextFunction): void => {
  const email = req.body?.email;
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return next(new AppError('Invalid email format', 400, { email: 'Invalid email format' }));
  next();
};

export const validatePassword = (req: Request, _res: Response, next: NextFunction): void => {
  const password = req.body?.password;
  if (password && password.length < 6) return next(new AppError('Password too short', 400, { password: 'Password must be at least 6 characters' }));
  next();
};
