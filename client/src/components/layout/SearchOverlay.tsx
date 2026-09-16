import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';

interface SearchOverlayProps { isOpen: boolean; onClose: () => void; }

const POPULAR_SEARCHES = ['Hoodies', 'Cargo Pants', 'Sneakers', 'Backpack', 'Oversized Tee'];

export const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => { if (!isOpen) setQuery(''); }, [isOpen]);
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    navigate('/shop?q=' + encodeURIComponent(query.trim()));
  };
  const handlePopular = (tag: string) => { onClose(); navigate('/shop?q=' + encodeURIComponent(tag.toLowerCase())); };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-white/98 backdrop-blur-md p-4 sm:p-8 flex flex-col">
          <div className="max-w-4xl mx-auto w-full relative flex-1 flex flex-col">
            <button onClick={onClose} className="absolute right-0 top-0 p-4 text-zinc-500 hover:text-zinc-900 cursor-pointer" aria-label="Close search"><X className="w-6 h-6" /></button>
            <form onSubmit={handleSubmit} className="mt-16 sm:mt-24">
              <div className="relative">
                <input type="text" autoFocus placeholder="Search essential apparel, shoes, bags..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full text-2xl sm:text-4xl font-light bg-transparent border-b-2 border-zinc-300 pb-4 pr-12 outline-none focus:border-zinc-900 placeholder-zinc-300 transition-colors" />
                <button type="submit" className="absolute right-0 bottom-6 text-zinc-700 cursor-pointer" aria-label="Submit search"><ArrowRight className="w-8 h-8" /></button>
              </div>
            </form>
            <div className="mt-8 flex flex-wrap gap-2 text-xs text-zinc-500 items-center">
              <span className="font-semibold uppercase text-zinc-900 mr-2">Popular Searches:</span>
              {POPULAR_SEARCHES.map((tag) => (
                <button key={tag} onClick={() => handlePopular(tag)} className="px-3 py-1.5 bg-zinc-100 rounded-full hover:bg-zinc-900 hover:text-white transition-colors cursor-pointer">{tag}</button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default SearchOverlay;
