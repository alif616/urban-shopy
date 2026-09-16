import { Star } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface ProductRatingProps {
  rating: number;
  reviewsCount?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export const ProductRating = ({ rating, reviewsCount, size = 'sm', className }: ProductRatingProps) => {
  const starSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className={cn(starSize, i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-zinc-300')} />
        ))}
      </div>
      <span className="font-medium text-zinc-700 text-[11px]">{rating.toFixed(1)}</span>
      {typeof reviewsCount === 'number' && <span className="text-[11px] text-zinc-400">({reviewsCount})</span>}
    </div>
  );
};
export default ProductRating;
