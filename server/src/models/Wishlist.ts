import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWishlist extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  productIds: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const wishlistSchema = new Schema<IWishlist>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  productIds: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
}, {
  timestamps: true,
  toJSON: { virtuals: true, transform: (_doc, ret: any) => { ret.id = ret._id?.toString(); delete ret._id; delete ret.__v; return ret; } },
});

wishlistSchema.index({ userId: 1 }, { unique: true });

export const Wishlist: Model<IWishlist> = mongoose.models.Wishlist || mongoose.model<IWishlist>('Wishlist', wishlistSchema);
export default Wishlist;
