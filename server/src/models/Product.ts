import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductColor { name: string; hex: string; }

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  details: string[];
  price: number;
  discountPrice?: number;
  category: string;
  images: string[];
  sizes: string[];
  colors: IProductColor[];
  rating: number;
  reviewsCount: number;
  featured: boolean;
  newArrival: boolean;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const colorSchema = new Schema<IProductColor>({
  name: { type: String, required: true, trim: true },
  hex: { type: String, required: true, match: [/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, 'Invalid hex color'] },
}, { _id: false });

const productSchema = new Schema<IProduct>({
  name: { type: String, required: [true, 'Product name is required'], trim: true, maxlength: 150 },
  slug: { type: String, required: [true, 'Slug is required'], unique: true, lowercase: true, trim: true, match: [/^[a-z0-9-]+$/, 'Invalid slug'] },
  description: { type: String, required: [true, 'Description is required'], trim: true, maxlength: 2000 },
  details: { type: [String], default: [] },
  price: { type: Number, required: [true, 'Price is required'], min: 0 },
  discountPrice: { type: Number, min: 0, validate: { validator(this: IProduct, value: number) { if (value === undefined || value === null) return true; return value < this.price; }, message: 'Discount must be less than price' } },
  category: { type: String, required: true, enum: ['Men', 'Women', 'Footwear', 'Accessories'] },
  images: { type: [String], required: true, validate: { validator: (arr: string[]) => Array.isArray(arr) && arr.length > 0, message: 'At least one image required' } },
  sizes: { type: [String], default: [] },
  colors: { type: [colorSchema], default: [] },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewsCount: { type: Number, default: 0, min: 0 },
  featured: { type: Boolean, default: false },
  newArrival: { type: Boolean, default: false },
  stock: { type: Number, required: true, default: 0, min: 0 },
}, {
  timestamps: true,
  toJSON: { virtuals: true, transform: (_doc, ret: any) => { ret.id = ret._id?.toString(); delete ret._id; delete ret.__v; return ret; } },
});

productSchema.index({ slug: 1 }, { unique: true });
productSchema.index({ category: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ newArrival: 1 });
productSchema.index({ price: 1 });
productSchema.index({ name: 'text', description: 'text' });

export const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);
export default Product;
