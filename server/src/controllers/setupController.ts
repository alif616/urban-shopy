import { Request, Response } from 'express';
import { User } from '../models/User';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/response';

export const createAdminOnce = asyncHandler(async (_req: Request, res: Response) => {
  const email = 'admin@urbanshopy.com';

  const existing = await User.findOne({ email });
  if (existing) {
    return sendSuccess(res, { message: 'Admin already exists', email }, 200);
  }

  const admin = await User.create({
    name: 'Admin User',
    email,
    password: 'admin123',
    role: 'admin',
  });

  return sendSuccess(
    res,
    { id: admin._id, email: admin.email, role: admin.role },
    201,
    'Admin user created successfully'
  );
});