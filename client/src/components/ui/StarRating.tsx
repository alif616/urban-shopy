import { Star } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const sizeMap = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' };

export const StarRating = ({ rating, max = 5, size = 'sm', showValue = false, className }: StarRatingProps) => {
  const rounded = Math.round(rating);
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <Star key={i} className={cn(sizeMap[size], i < rounded ? 'fill-amber-400 text-amber-400' : 'text-zinc-300')} />
        ))}
      </div>
      {showValue && <span className="text-xs font-semibold text-zinc-700 ml-1">{rating.toFixed(1)}</span>}
    </div>
  );
};
export default StarRating;
