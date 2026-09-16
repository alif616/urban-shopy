import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  label?: string;
  className?: string;
}

const sizeMap = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };

export const Loader = ({ size = 'md', fullScreen = false, label, className }: LoaderProps) => {
  const spinner = (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2 className={cn(sizeMap[size], 'animate-spin text-zinc-400')} />
      {label && <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">{label}</span>}
    </div>
  );
  if (fullScreen) return <div className="min-h-[60vh] flex items-center justify-center">{spinner}</div>;
  return spinner;
};
export default Loader;
