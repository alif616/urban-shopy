import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../utils/jwt';
import AppError from '../utils/AppError';
import { User, IUser } from '../models/User';

export interface AuthenticatedRequest extends Request { user?: IUser; auth?: JwtPayload; }

export const protect = async (req: AuthenticatedRequest, _res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) token = authHeader.split(' ')[1];
    if (!token) return next(new AppError('Not authorized. Please log in.', 401));
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);
    if (!user) return next(new AppError('User no longer exists.', 401));
    req.user = user;
    req.auth = decoded;
    next();
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') return next(new AppError('Invalid authentication token.', 401));
    if (error.name === 'TokenExpiredError') return next(new AppError('Authentication token has expired.', 401));
    next(error);
  }
};

export const optionalAuth = async (req: AuthenticatedRequest, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return next();
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);
    if (user) { req.user = user; req.auth = decoded; }
    next();
  } catch { next(); }
};
