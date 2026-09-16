import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { toast } from '../common/Toaster';

export const NewsletterBanner = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setEmail('');
    toast('Subscribed to Urban Shopy newsletter! (demo)', 'success');
  };
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-zinc-100 rounded-3xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="label-eyebrow">Join the Movement</span>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mt-2 mb-3">Style Tips, Delivered Weekly.</h3>
          <p className="text-sm text-zinc-600 leading-relaxed max-w-md">Subscribe to receive early drop access, exclusive urban wardrobe previews, and thoughtful styling notes from our team.</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="relative">
            <Mail className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full pl-11 pr-4 py-4 bg-white border border-zinc-200 rounded-2xl text-sm outline-none focus:border-zinc-900 transition-colors" />
          </div>
          <Button type="submit" isLoading={loading} fullWidth size="lg">Subscribe <ArrowRight className="w-4 h-4" /></Button>
          <p className="text-[11px] text-zinc-400 text-center">No spam. Unsubscribe anytime.</p>
        </form>
      </div>
    </section>
  );
};
export default NewsletterBanner;
