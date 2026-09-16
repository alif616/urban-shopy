import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Users, Package, Heart, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Accordion, AccordionItem } from '../components/ui/Accordion';
import { APP_NAME, APP_TAGLINE } from '../config/constants';

const VALUES = [
  { icon: Leaf, title: 'Considered Materials', description: 'We prioritize durable, responsibly sourced fabrics and materials built to last beyond the season.' },
  { icon: Users, title: 'Community First', description: 'Urban Shopy exists for the everyday. We design for real people living real urban lives.' },
  { icon: Package, title: 'Thoughtful Design', description: 'Every silhouette is refined for fit, function, and versatility - never trend over substance.' },
  { icon: Heart, title: 'Made to Last', description: 'We build essentials you will keep wearing, season after season, wash after wash.' },
];

const FAQS: AccordionItem[] = [
  { id: 'faq-1', title: 'What makes Urban Shopy different?', content: 'We focus on a tightly curated catalog instead of endless SKUs. Each piece is designed to integrate effortlessly into a modern wardrobe.' },
  { id: 'faq-2', title: 'Where are your products made?', content: 'Our pieces are produced with carefully selected manufacturing partners. All material and production information is listed on each product page.' },
  { id: 'faq-3', title: 'Do you ship internationally?', content: 'Yes. We ship globally with tracked express delivery. Domestic orders over $150 ship completely free.' },
  { id: 'faq-4', title: 'What is your return policy?', content: 'Returns are accepted within 30 days of receipt. Items must be unworn with original tags. Prepaid return labels are included with every domestic order.' },
  { id: 'faq-5', title: 'Is this a real store?', content: 'Urban Shopy is a portfolio demonstration project. All product information, imagery, and demonstration content are for showcase purposes.' },
];

const About = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <section className="relative bg-zinc-900 text-white overflow-hidden">
      <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" alt="Urban Shopy story" className="absolute inset-0 w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Our Story</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none mt-4 mb-6">Designed for<br /><span className="text-zinc-400">Everyday Life.</span></h1>
        <p className="text-base sm:text-lg font-light text-zinc-300 max-w-2xl mx-auto leading-relaxed">{APP_NAME} exists for one reason: to make premium, thoughtfully designed essentials accessible for the way modern people actually live.</p>
      </div>
    </section>
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <span className="label-eyebrow">Mission</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mt-2">{APP_TAGLINE}</h2>
        </div>
        <div className="md:col-span-8 space-y-5 text-sm text-zinc-600 leading-relaxed">
          <p>We started with a simple observation: modern wardrobes deserve better. Not louder, not cheaper - just better. Better fabric, better construction, better design choices that hold up under everyday wear.</p>
          <p>Every piece in our catalog is the result of deliberate reduction. We remove the noise so what remains is exactly what you need: essentials built to work with what you already own.</p>
          <p>Urban Shopy is not about trends. It is about a wardrobe that serves you - quietly, consistently, for years.</p>
        </div>
      </div>
    </section>
    <section className="bg-zinc-50 border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="label-eyebrow">Our Values</span>
          <h2 className="section-heading mt-2">What We Stand For</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-zinc-200/80">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center mb-4"><Icon className="w-5 h-5" /></div>
                <h3 className="font-bold text-sm text-zinc-900 mb-2">{v.title}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">{v.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-10">
        <span className="label-eyebrow">FAQ</span>
        <h2 className="section-heading mt-2">Frequently Asked Questions</h2>
      </div>
      <Accordion items={FAQS} defaultOpenId="faq-1" />
    </section>
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-zinc-900 text-white rounded-3xl p-8 sm:p-14 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Ready to explore the collection?</h3>
        <p className="text-sm text-zinc-400 max-w-lg mx-auto mb-8 leading-relaxed">Thoughtfully selected essentials, designed for modern urban living.</p>
        <Link to="/shop"><Button variant="secondary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>Shop Collection</Button></Link>
      </div>
    </section>
  </motion.div>
);
export default About;
