import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Sparkles, Bot } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface StyleAssistantModalProps { isOpen: boolean; onClose: () => void; }

const VIBE_OPTIONS = [
  { value: 'Minimalist & Clean', label: 'Minimalist & Clean' },
  { value: 'Utilitarian Streetwear', label: 'Utilitarian Streetwear' },
  { value: 'Smart Casual Tailored', label: 'Smart Casual Tailored' },
  { value: 'Relaxed Monochromatic', label: 'Relaxed Monochromatic' },
];

const generateOutfitSuggestion = async (occasion: string, vibe: string): Promise<string> => {
  await new Promise((r) => setTimeout(r, 900));
  return [
    'Styling Brief - "' + occasion + '" / ' + vibe,
    '',
    'Look 01 - Minimalist Base',
    '- Essential Oversized Tee in Off White',
    '- Relaxed Fit Selvedge Denim in Indigo',
    '- Daily Essential Sneakers in Bone White',
    '',
    'Layering Tip:',
    'Add the Minimal Overshirt in Charcoal when temperatures drop.',
    '',
    'Accessory Finish:',
    'A Classic Leather Wallet in Cognac and the Everyday Cap in Washed Black.',
  ].join('\n');
};

export const StyleAssistantModal = ({ isOpen, onClose }: StyleAssistantModalProps) => {
  const [occasion, setOccasion] = useState('Urban Weekend City Walk');
  const [vibe, setVibe] = useState(VIBE_OPTIONS[0].value);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    const text = await generateOutfitSuggestion(occasion, vibe);
    setResult(text);
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-xl w-full z-10 p-6 sm:p-8 flex flex-col max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-zinc-900 text-white"><Sparkles className="w-5 h-5" /></div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900">Style Assistant</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full cursor-pointer" aria-label="Close"><X className="w-5 h-5 text-zinc-500" /></button>
            </div>
            <p className="text-xs text-zinc-500 mb-6 leading-relaxed">Let our stylist curate a tailored urban look. This is a portfolio demo assistant.</p>
            <div className="space-y-4 mb-6">
              <Input label="Occasion or Setting" value={occasion} onChange={(e) => setOccasion(e.target.value)} placeholder="e.g. Gallery opening, Casual coffee run" />
              <Select label="Style Vibe" value={vibe} onChange={(e) => setVibe(e.target.value)} options={VIBE_OPTIONS} />
              <Button onClick={handleGenerate} isLoading={loading} fullWidth><Sparkles className="w-4 h-4 mr-2" /> Generate Outfit Styling</Button>
            </div>
            {result && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs text-zinc-800 leading-relaxed whitespace-pre-line">
                <strong className="block font-bold text-zinc-900 mb-2 uppercase tracking-wide flex items-center gap-1.5"><Bot className="w-4 h-4 text-zinc-900" /> Stylist Recommendations</strong>
                {result}
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default StyleAssistantModal;
