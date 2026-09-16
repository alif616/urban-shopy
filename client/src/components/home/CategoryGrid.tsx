import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = [
  { title: 'Men', subtitle: 'Curated Wardrobe', image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&q=80&w=800', to: '/shop?category=Men' },
  { title: 'Women', subtitle: 'Modern Essentials', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800', to: '/shop?category=Women' },
  { title: 'Footwear', subtitle: 'Everyday Steps', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800', to: '/shop?category=Footwear' },
  { title: 'Accessories', subtitle: 'Finishing Details', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=800', to: '/shop?category=Accessories' },
];

export const CategoryGrid = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div className="flex justify-between items-end mb-10">
      <div>
        <span className="label-eyebrow">Categories</span>
        <h2 className="section-heading">Curated Wardrobes</h2>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {CATEGORIES.map((cat) => (
        <Link key={cat.title} to={cat.to} className="group relative h-96 rounded-2xl overflow-hidden block">
          <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div>
              <span className="text-xs font-medium text-zinc-300">{cat.subtitle}</span>
              <h3 className="text-xl font-bold text-white tracking-tight">{cat.title}</h3>
            </div>
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-zinc-900 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  </section>
);
export default CategoryGrid;
