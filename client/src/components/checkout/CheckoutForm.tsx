import { User, MapPin, CreditCard } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { PaymentMethods } from './PaymentMethods';
import { COUNTRIES } from '../../config/constants';
import type { PaymentMethod } from '../../config/constants';
import { ValidationErrors } from '../../utils/validators';
import type { ShippingAddress } from '../../types';

interface CheckoutFormProps {
  form: ShippingAddress;
  onChange: (field: keyof ShippingAddress, value: string) => void;
  errors: ValidationErrors;
  paymentMethod: PaymentMethod;
  onPaymentChange: (method: PaymentMethod) => void;
}

const COUNTRY_OPTIONS = COUNTRIES.map((c) => ({ value: c, label: c }));

export const CheckoutForm = ({ form, onChange, errors, paymentMethod, onPaymentChange }: CheckoutFormProps) => (
  <div className="space-y-8">
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/80">
      <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-6 flex items-center gap-2"><User className="w-4 h-4" /> 1. Customer Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Full Name" required value={form.fullName} onChange={(e) => onChange('fullName', e.target.value)} error={errors.fullName} placeholder="Jane Doe" />
        <Input label="Email Address" type="email" required value={form.email} onChange={(e) => onChange('email', e.target.value)} error={errors.email} placeholder="you@example.com" />
        <Input label="Phone Number" required value={form.phone} onChange={(e) => onChange('phone', e.target.value)} error={errors.phone} placeholder="+1 (555) 000-0000" className="sm:col-span-2" />
      </div>
    </div>
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/80">
      <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-6 flex items-center gap-2"><MapPin className="w-4 h-4" /> 2. Shipping Address</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Street Address" required value={form.address} onChange={(e) => onChange('address', e.target.value)} error={errors.address} placeholder="123 Main Street, Apt 4B" className="sm:col-span-2" />
        <Input label="City" required value={form.city} onChange={(e) => onChange('city', e.target.value)} error={errors.city} placeholder="New York" />
        <Input label="Postal Code" required value={form.postalCode} onChange={(e) => onChange('postalCode', e.target.value)} error={errors.postalCode} placeholder="10001" />
        <Select label="Country" required value={form.country} onChange={(e) => onChange('country', e.target.value)} error={errors.country} options={COUNTRY_OPTIONS} className="sm:col-span-2" />
      </div>
    </div>
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/80">
      <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-6 flex items-center gap-2"><CreditCard className="w-4 h-4" /> 3. Payment Method</h2>
      <PaymentMethods value={paymentMethod} onChange={onPaymentChange} />
      <p className="mt-4 text-[11px] text-zinc-500 leading-relaxed">All online payment methods are currently in demo mode. Cash on Delivery is fully functional for this portfolio demonstration.</p>
    </div>
  </div>
);
export default CheckoutForm;
