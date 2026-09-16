import { Response } from 'express';
import { Order } from '../models/Order';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/response';
import AppError from '../utils/AppError';
import type { AuthenticatedRequest } from '../middleware/auth';

export const createOrder = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { items, subtotal, shipping, total, shippingAddress, paymentMethod } = req.body;
  if (!Array.isArray(items) || items.length === 0) throw new AppError('Order must contain at least one item.', 400);
  const order = await Order.create({
    userId: req.user?._id || null,
    items, subtotal, shipping, total, shippingAddress,
    paymentMethod: paymentMethod || 'cod',
    status: 'Pending',
  });
  return sendSuccess(res, order.toJSON(), 201, 'Order created successfully');
});

export const getUserOrders = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) throw new AppError('Not authenticated', 401);
  const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
  return sendSuccess(res, orders, 200);
});

export const getOrderById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) throw new AppError('Not authenticated', 401);
  const id = req.params.id;
  const order = await Order.findOne({
    userId: req.user._id,
    $or: [...(id.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: id }] : []), { id }],
  });
  if (!order) throw new AppError('Order not found', 404);
  return sendSuccess(res, order, 200);
});
