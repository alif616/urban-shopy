import { Package, Truck, ShieldCheck } from 'lucide-react';

const PROPS = [
  { icon: Package, title: 'Sustainable Heavyweight Fabric', description: 'Built from ethically sourced 280-420GSM cottons designed to resist warping and wash-wear.' },
  { icon: Truck, title: 'Global Express Delivery', description: 'Complimentary express tracked delivery on all domestic orders exceeding $150.' },
  { icon: ShieldCheck, title: 'Guaranteed 30-Day Returns', description: 'Try your fits in comfort. Easy returns and size exchanges with prepaid shipping labels.' },
];

export const ValueProps = () => (
  <section className="bg-zinc-900 text-white my-20 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-800">
        {PROPS.map((prop) => {
          const Icon = prop.icon;
          return (
            <div key={prop.title} className="flex flex-col items-center pt-6 md:pt-0 px-4">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 mb-4"><Icon className="w-6 h-6" /></div>
              <h4 className="font-bold text-base mb-2">{prop.title}</h4>
              <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">{prop.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
export default ValueProps;
