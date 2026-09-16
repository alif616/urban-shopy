import mongoose, { Schema, Document, Model } from 'mongoose';

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export interface IShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  id?: string;
  userId: mongoose.Types.ObjectId | null;
  items: IOrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: IShippingAddress;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, required: true },
  size: { type: String, default: '' },
  color: { type: String, default: '' },
  quantity: { type: Number, required: true, min: 1 },
}, { _id: false });

const shippingAddressSchema = new Schema<IShippingAddress>({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  postalCode: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
}, { _id: false });

const orderSchema = new Schema<IOrder>({
  id: { type: String, unique: true, sparse: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', default: null, index: true },
  items: { type: [orderItemSchema], required: true, validate: { validator: (arr: IOrderItem[]) => Array.isArray(arr) && arr.length > 0, message: 'Order needs at least one item' } },
  subtotal: { type: Number, required: true, min: 0 },
  shipping: { type: Number, required: true, min: 0, default: 0 },
  total: { type: Number, required: true, min: 0 },
  shippingAddress: { type: shippingAddressSchema, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending', index: true },
  paymentMethod: { type: String, required: true, default: 'cod' },
}, {
  timestamps: true,
  toJSON: { virtuals: true, transform: (_doc, ret: any) => { ret.id = ret.id || ret._id?.toString(); delete ret._id; delete ret.__v; return ret; } },
});

orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ status: 1 });

orderSchema.pre('save', function (next) {
  if (!this.id) this.id = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  next();
});

export const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);
export default Order;
