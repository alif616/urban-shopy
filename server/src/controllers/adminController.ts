import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { Order } from '../models/Order';
import { User } from '../models/User';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/response';
import AppError from '../utils/AppError';

// Dashboard stats
export const getDashboardStats = asyncHandler(async (_req: Request, res: Response) => {
  const [totalProducts, totalOrders, totalUsers, pendingOrders, revenueAgg, recentOrders] =
    await Promise.all([
      Product.countDocuments({}),
      Order.countDocuments({}),
      User.countDocuments({}),
      Order.countDocuments({ status: 'Pending' }),
      Order.aggregate([
        { $match: { status: { $ne: 'Cancelled' } } },
        { $group: { _id: null, total: { $sum: '$total' } } },
      ]),
      Order.find({}).sort({ createdAt: -1 }).limit(5),
    ]);

  const totalRevenue = revenueAgg[0]?.total || 0;

  return sendSuccess(res, {
    totalProducts, totalOrders, totalUsers, pendingOrders,
    totalRevenue, recentOrders,
  }, 200);
});

// Products
export const adminListProducts = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as any;
  const filter: Record<string, any> = {};
  if (query.search) {
    const search = new RegExp(query.search, 'i');
    filter.$or = [{ name: search }, { slug: search }, { category: search }];
  }
  const products = await Product.find(filter).sort({ createdAt: -1 });
  return sendSuccess(res, products, 200);
});

export const adminCreateProduct = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body;
  if (!payload.slug && payload.name) {
    payload.slug = String(payload.name)
      .toLowerCase().trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  const product = await Product.create(payload);
  return sendSuccess(res, product.toJSON(), 201, 'Product created');
});

export const adminUpdateProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) throw new AppError('Product not found', 404);
  return sendSuccess(res, product.toJSON(), 200, 'Product updated');
});

export const adminDeleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new AppError('Product not found', 404);
  return sendSuccess(res, { id: req.params.id }, 200, 'Product deleted');
});

// Orders
export const adminListOrders = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as any;
  const filter: Record<string, any> = {};
  if (query.status && query.status !== 'All') filter.status = query.status;
  if (query.search) {
    const search = new RegExp(query.search, 'i');
    filter.$or = [
      { id: search },
      { 'shippingAddress.email': search },
      { 'shippingAddress.fullName': search },
    ];
  }
  const orders = await Order.find(filter).sort({ createdAt: -1 });
  return sendSuccess(res, orders, 200);
});

export const adminUpdateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body;
  const allowed = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  if (!allowed.includes(status)) throw new AppError('Invalid status', 400);

  const order = await Order.findOne({
    $or: [
      ...(req.params.id.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: req.params.id }] : []),
      { id: req.params.id },
    ],
  });
  if (!order) throw new AppError('Order not found', 404);

  order.status = status;
  await order.save();
  return sendSuccess(res, order.toJSON(), 200, 'Order status updated');
});

// Users
export const adminListUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  return sendSuccess(res, users, 200);
});