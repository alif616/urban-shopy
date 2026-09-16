import { Response } from 'express';
import { Wishlist } from '../models/Wishlist';
import { Product } from '../models/Product';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/response';
import AppError from '../utils/AppError';
import type { AuthenticatedRequest } from '../middleware/auth';

export const getWishlist = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) throw new AppError('Not authenticated', 401);
  let wishlist = await Wishlist.findOne({ userId: req.user._id });
  if (!wishlist) wishlist = await Wishlist.create({ userId: req.user._id, productIds: [] });
  const products = await Product.find({ _id: { $in: wishlist.productIds } });
  return sendSuccess(res, products, 200);
});

export const addToWishlist = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) throw new AppError('Not authenticated', 401);
  const { productId } = req.body;
  if (!productId) throw new AppError('productId is required', 400);
  const product = await Product.findById(productId);
  if (!product) throw new AppError('Product not found', 404);
  let wishlist = await Wishlist.findOne({ userId: req.user._id });
  if (!wishlist) {
    wishlist = await Wishlist.create({ userId: req.user._id, productIds: [productId] });
  } else if (!wishlist.productIds.some((id) => id.toString() === productId)) {
    wishlist.productIds.push(product._id);
    await wishlist.save();
  }
  const products = await Product.find({ _id: { $in: wishlist.productIds } });
  return sendSuccess(res, products, 200, 'Added to wishlist');
});

export const removeFromWishlist = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) throw new AppError('Not authenticated', 401);
  const wishlist = await Wishlist.findOne({ userId: req.user._id });
  if (!wishlist) throw new AppError('Wishlist not found', 404);
  wishlist.productIds = wishlist.productIds.filter((id) => id.toString() !== req.params.productId);
  await wishlist.save();
  const products = await Product.find({ _id: { $in: wishlist.productIds } });
  return sendSuccess(res, products, 200, 'Removed from wishlist');
});
