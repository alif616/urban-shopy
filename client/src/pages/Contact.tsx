import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Check, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { toast } from '../components/common/Toaster';
import { isValidEmail, isNonEmpty } from '../utils/validators';

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'hello@urbanshopy.demo', href: 'mailto:hello@urbanshopy.demo' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 000-0000', href: 'tel:+15550000000' },
  { icon: MapPin, label: 'Studio', value: 'Available online only' },
];

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!isNonEmpty(name)) next.name = 'Please enter your name.';
    if (!isValidEmail(email)) next.email = 'Please enter a valid email.';
    if (!isNonEmpty(subject)) next.subject = 'Please add a subject.';
    if (!isNonEmpty(message)) next.message = 'Please write a message.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
    toast('Message sent! We will reply within 24 hours.', 'success');
    setName(''); setEmail(''); setSubject(''); setMessage('');
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <span className="label-eyebrow">Get in Touch</span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 mt-2 mb-3">Contact Support</h1>
        <p className="text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed">Have questions about sizing, orders, or materials? Our team is here to help. Fill out the form below and we will get back to you within 24 hours.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-4 space-y-4">
          {CONTACT_INFO.map((item) => {
            const Icon = item.icon;
            const content = (
              <div className="flex items-start gap-4 p-5 bg-zinc-50 rounded-2xl border border-zinc-200/80">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center flex-shrink-0"><Icon className="w-4 h-4" /></div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{item.label}</p>
                  <p className="text-sm font-semibold text-zinc-900 mt-1 break-words">{item.value}</p>
                </div>
              </div>
            );
            return item.href ? (<a key={item.label} href={item.href} className="block">{content}</a>) : (<div key={item.label}>{content}</div>);
          })}
          <div className="bg-zinc-900 text-white p-6 rounded-2xl">
            <MessageSquare className="w-5 h-5 mb-3 text-zinc-400" />
            <h3 className="font-bold text-sm mb-2">Response Time</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">Our team typically responds within 24 hours on business days. Order-related inquiries are prioritized.</p>
          </div>
        </aside>
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/80 shadow-xs space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input label="Your Name" required value={name} onChange={(e) => setName(e.target.value)} error={errors.name} placeholder="Jane Doe" />
              <Input label="Email Address" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder="you@example.com" />
            </div>
            <Input label="Subject" required value={subject} onChange={(e) => setSubject(e.target.value)} error={errors.subject} placeholder="What can we help you with?" />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600">Message</label>
              <textarea rows={6} required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us more about your inquiry..." className={'w-full p-4 rounded-xl border bg-zinc-50/50 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-zinc-900/10 transition-all resize-none ' + (errors.message ? 'border-red-500' : 'border-zinc-200 focus:border-zinc-900')} />
              {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
            </div>
            <div className="flex items-center justify-between gap-4 pt-2 flex-wrap">
              <p className="text-[11px] text-zinc-400 max-w-xs">By submitting, you agree to our demo privacy policy.</p>
              <Button type="submit" isLoading={loading} leftIcon={sent ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}>{sent ? 'Message Sent' : 'Send Message'}</Button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};
export default Contact;
