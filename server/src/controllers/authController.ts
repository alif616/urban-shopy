import { Response } from 'express';
import { User } from '../models/User';
import { signToken } from '../utils/jwt';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/response';
import AppError from '../utils/AppError';
import type { AuthenticatedRequest } from '../middleware/auth';

export const register = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) throw new AppError('An account with this email already exists.', 409, { email: 'Email already registered' });
  const user = await User.create({ name, email, password });
  const token = signToken({ userId: user._id.toString(), email: user.email, role: user.role });
  return sendSuccess(res, { user: user.toJSON(), token }, 201, 'Account created successfully');
});

export const login = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user) throw new AppError('Invalid email or password.', 401);
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new AppError('Invalid email or password.', 401);
  const token = signToken({ userId: user._id.toString(), email: user.email, role: user.role });
  const userData = user.toJSON();
  return sendSuccess(res, { user: userData, token }, 200, 'Login successful');
});

export const getCurrentUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) throw new AppError('Not authenticated', 401);
  return sendSuccess(res, req.user.toJSON(), 200, 'User fetched successfully');
});
