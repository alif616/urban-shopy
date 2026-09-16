import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { APP_HERO_SUBTEXT } from '../../config/constants';

export const Hero = () => (
  <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-zinc-900 text-white">
    <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=2000" alt="Urban Streetwear" className="absolute inset-0 w-full h-full object-cover opacity-45 object-[center_35%]" />
    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
    <div className="relative z-10 text-center px-4 max-w-4xl py-20">
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-6 uppercase leading-none">
        Everyday Style.<br /><span className="text-zinc-400">Reimagined.</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="text-base sm:text-lg font-light mb-10 max-w-2xl mx-auto text-zinc-300 leading-relaxed">{APP_HERO_SUBTEXT}</motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/shop" className="inline-flex items-center justify-center bg-white text-zinc-900 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-zinc-100 transition-all shadow-xl">Shop Collection <ArrowRight className="w-4 h-4 ml-2" /></Link>
        <Link to="/shop?newArrival=true" className="inline-flex items-center justify-center border border-white/40 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-all backdrop-blur-xs">Explore New Arrivals</Link>
      </motion.div>
    </div>
  </section>
);
export default Hero;
