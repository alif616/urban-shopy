import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface ProductGalleryProps { images: string[]; name: string; }

export const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handlePrev = () => setSelectedIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const handleNext = () => setSelectedIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  if (images.length === 0) return null;
  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {images.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible md:w-20 flex-shrink-0 no-scrollbar">
          {images.map((img, idx) => (
            <button key={idx} onClick={() => setSelectedIndex(idx)} className={cn('w-16 md:w-full aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer', selectedIndex === idx ? 'border-zinc-900' : 'border-transparent opacity-60 hover:opacity-100')} aria-label={'View image ' + (idx + 1)}>
              <img src={img} alt={name + ' thumb ' + (idx + 1)} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="flex-1 bg-zinc-100 rounded-3xl overflow-hidden aspect-[3/4] border border-zinc-200/60 relative group">
        <AnimatePresence mode="wait">
          <motion.img key={selectedIndex} src={images[selectedIndex]} alt={name + ' view ' + (selectedIndex + 1)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="w-full h-full object-cover absolute inset-0" />
        </AnimatePresence>
        {images.length > 1 && (
          <>
            <button onClick={handlePrev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-zinc-700 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" aria-label="Previous image"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={handleNext} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-zinc-700 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" aria-label="Next image"><ChevronRight className="w-5 h-5" /></button>
          </>
        )}
      </div>
    </div>
  );
};
export default ProductGallery;
