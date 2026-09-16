import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { toast } from '../../components/common/Toaster';
import type { Product } from '../../types';

const EMPTY_PRODUCT: Partial<Product> = {
  name: '',
  slug: '',
  description: '',
  details: [''],
  price: 0,
  category: 'Men',
  images: [''],
  sizes: ['S', 'M', 'L', 'XL'],
  colors: [{ name: 'Black', hex: '#000000' }],
  rating: 0,
  reviewsCount: 0,
  featured: false,
  newArrival: true,
  stock: 0,
};

const CATEGORIES = [
  { value: 'Men', label: 'Men' },
  { value: 'Women', label: 'Women' },
  { value: 'Footwear', label: 'Footwear' },
  { value: 'Accessories', label: 'Accessories' },
];

const AdminProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [form, setForm] = useState<Partial<Product>>(EMPTY_PRODUCT);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew) return;
    adminService
      .listProducts()
      .then((products) => {
        const found = products.find((p) => p.id === id || p._id === id);
        if (found) setForm(found);
        else toast('Product not found', 'error');
      })
      .catch((err) => toast(err.message, 'error'))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const update = (field: keyof Product, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        discountPrice:
          form.discountPrice !== undefined && form.discountPrice !== null
            ? Number(form.discountPrice)
            : undefined,
        stock: Number(form.stock),
        details: (form.details || []).filter((d) => d.trim()),
        images: (form.images || []).filter((i) => i.trim()),
      };

      if (isNew) {
        await adminService.createProduct(payload);
        toast('Product created', 'success');
      } else {
        await adminService.updateProduct(id!, payload);
        toast('Product updated', 'success');
      }
      navigate('/admin/products');
    } catch (err: any) {
      toast(err.message || 'Save failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Link
          to="/admin/products"
          className="p-2 rounded-lg hover:bg-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-zinc-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            {isNew ? 'Create Product' : 'Edit Product'}
          </h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            {isNew ? 'Add a new product to your store' : 'Update product details'}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white border border-zinc-200 rounded-2xl p-6"
      >
        <Input
          label="Product Name"
          required
          value={form.name || ''}
          onChange={(e) => update('name', e.target.value)}
          placeholder="Essential Oversized Tee"
        />

        <Input
          label="Slug (URL-friendly)"
          value={form.slug || ''}
          onChange={(e) => update('slug', e.target.value)}
          placeholder="essential-oversized-tee"
          hint="Leave blank to auto-generate from name"
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
            Description
          </label>
          <textarea
            rows={3}
            required
            value={form.description || ''}
            onChange={(e) => update('description', e.target.value)}
            className="w-full p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 text-sm outline-none focus:bg-white focus:border-zinc-900 resize-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Category"
            value={form.category || 'Men'}
            onChange={(e) => update('category', e.target.value)}
            options={CATEGORIES}
          />
          <Input
            label="Stock"
            type="number"
            required
            value={form.stock ?? 0}
            onChange={(e) => update('stock', Number(e.target.value))}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Price ($)"
            type="number"
            step="0.01"
            required
            value={form.price ?? 0}
            onChange={(e) => update('price', Number(e.target.value))}
          />
          <Input
            label="Discount Price ($) — optional"
            type="number"
            step="0.01"
            value={form.discountPrice ?? ''}
            onChange={(e) =>
              update(
                'discountPrice',
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />
        </div>

        <Input
          label="Image URL"
          required
          value={(form.images && form.images[0]) || ''}
          onChange={(e) => update('images', [e.target.value])}
          placeholder="https://images.unsplash.com/..."
        />

        <Input
          label="Sizes (comma-separated)"
          value={(form.sizes || []).join(', ')}
          onChange={(e) =>
            update(
              'sizes',
              e.target.value.split(',').map((s) => s.trim())
            )
          }
          placeholder="S, M, L, XL"
        />

        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured || false}
              onChange={(e) => update('featured', e.target.checked)}
              className="w-4 h-4 accent-zinc-900"
            />
            <span className="text-sm font-medium text-zinc-700">Featured</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.newArrival || false}
              onChange={(e) => update('newArrival', e.target.checked)}
              className="w-4 h-4 accent-zinc-900"
            />
            <span className="text-sm font-medium text-zinc-700">New Arrival</span>
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
          <Link to="/admin/products">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            isLoading={saving}
            leftIcon={<Save className="w-4 h-4" />}
          >
            {isNew ? 'Create Product' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;