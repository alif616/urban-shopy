import { useState } from 'react';
import { cn } from '../../utils/helpers';

interface ProductTabsProps { details: string[]; }
type TabKey = 'details' | 'shipping';

export const ProductTabs = ({ details }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>('details');
  const tabs: { key: TabKey; label: string }[] = [
    { key: 'details', label: 'Product Details' },
    { key: 'shipping', label: 'Shipping & Returns' },
  ];
  return (
    <div className="border-t border-zinc-200 pt-6 mt-8">
      <div className="flex gap-6 border-b border-zinc-200 pb-3 mb-4">
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={cn('text-xs font-bold uppercase tracking-wider pb-3 border-b-2 -mb-3 transition-all cursor-pointer', activeTab === tab.key ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-400 hover:text-zinc-700')}>{tab.label}</button>
        ))}
      </div>
      {activeTab === 'details' ? (
        <ul className="space-y-2 text-xs text-zinc-600 list-disc pl-4">
          {details.map((d, i) => <li key={i}>{d}</li>)}
        </ul>
      ) : (
        <div className="text-xs text-zinc-600 space-y-2">
          <p>- Free standard delivery on domestic orders over $150.</p>
          <p>- Express shipping available at checkout (2-3 business days).</p>
          <p>- Returns accepted within 30 days of item receipt.</p>
          <p>- Items must be unworn, with original tags attached.</p>
        </div>
      )}
    </div>
  );
};
export default ProductTabs;
