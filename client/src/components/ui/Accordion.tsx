import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion = ({ items, defaultOpenId, allowMultiple = false, className }: AccordionProps) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);
  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      if (allowMultiple) return isOpen ? prev.filter((x) => x !== id) : [...prev, id];
      return isOpen ? [] : [id];
    });
  };
  return (
    <div className={cn('divide-y divide-zinc-200 border-y border-zinc-200', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id}>
            <button onClick={() => toggle(item.id)} className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group" aria-expanded={isOpen}>
              <span className="text-sm font-semibold text-zinc-900 group-hover:text-zinc-700">{item.title}</span>
              <ChevronDown className={cn('w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform duration-200', isOpen && 'rotate-180')} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                  <div className="pb-5 text-sm text-zinc-600 leading-relaxed">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
export default Accordion;
