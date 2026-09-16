import { cn } from '../../utils/helpers';

interface DividerProps {
  label?: string;
  className?: string;
}

export const Divider = ({ label, className }: DividerProps) => {
  if (!label) return <div className={cn('h-px bg-zinc-200 w-full', className)} />;
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="h-px bg-zinc-200 flex-1" />
      <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">{label}</span>
      <div className="h-px bg-zinc-200 flex-1" />
    </div>
  );
};
export default Divider;
