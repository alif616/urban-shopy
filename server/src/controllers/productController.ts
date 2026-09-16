import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/response';
import AppError from '../utils/AppError';

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as any;
  const filter: Record<string, any> = {};
  if (query.category && query.category !== 'All') filter.category = query.category;
  if (query.search) {
    const search = new RegExp(query.search, 'i');
    filter.$or = [{ name: search }, { description: search }, { category: search }];
  }
  if (query.featured === 'true') filter.featured = true;
  if (query.newArrival === 'true') filter.newArrival = true;
  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }
  let sortOption: Record<string, 1 | -1> = { createdAt: -1 };
  switch (query.sort) {
    case 'price_asc': sortOption = { price: 1 }; break;
    case 'price_desc': sortOption = { price: -1 }; break;
    case 'rating': sortOption = { rating: -1 }; break;
    case 'newest': sortOption = { newArrival: -1, createdAt: -1 }; break;
  }
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(query.limit) || 24));
  const skip = (page - 1) * limit;
  const [products, total] = await Promise.all([
    Product.find(filter).sort(sortOption).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);
  return sendSuccess(res, { products, total, page, pages: Math.ceil(total / limit) || 1 }, 200);
});

export const getProductBySlug = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) throw new AppError('Product not found', 404);
  return sendSuccess(res, product, 200);
});

export const getFeaturedProducts = asyncHandler(async (_req: Request, res: Response) => {
  const products = await Product.find({ featured: true }).limit(8);
  return sendSuccess(res, products, 200);
});

export const getNewArrivals = asyncHandler(async (_req: Request, res: Response) => {
  const products = await Product.find({ newArrival: true }).sort({ createdAt: -1 }).limit(8);
  return sendSuccess(res, products, 200);
});
