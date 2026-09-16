import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, AlertCircle, XCircle } from 'lucide-react';
import type { Toast, ToastType } from '../../types';

type ToastEvent = { message: string; type?: ToastType };
type Listener = (event: ToastEvent) => void;
const listeners: Listener[] = [];

export const toast = (message: string, type: ToastType = 'info'): void => {
  listeners.forEach((fn) => fn({ message, type }));
};

export const Toaster = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  useEffect(() => {
    const listener: Listener = ({ message, type = 'info' }) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
    };
    listeners.push(listener);
    return () => { const i = listeners.indexOf(listener); if (i >= 0) listeners.splice(i, 1); };
  }, []);
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={[
              'pointer-events-auto px-4 py-3 rounded-xl shadow-xl flex items-center gap-3',
              'text-sm font-medium text-white tracking-wide border min-w-[240px] max-w-sm',
              t.type === 'success' ? 'bg-zinc-900 border-zinc-700'
                : t.type === 'error' ? 'bg-red-600 border-red-500'
                : 'bg-zinc-800 border-zinc-700',
            ].join(' ')}
          >
            {t.type === 'success' && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
            {t.type === 'error' && <XCircle className="w-4 h-4 text-red-200 shrink-0" />}
            {t.type === 'info' && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />}
            <span className="leading-snug">{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
export default Toaster;
