import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Search, Loader2, PackageX } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { formatCurrency } from '../../utils/format';
import { Button } from '../../components/ui/Button';
import { toast } from '../../components/common/Toaster';
import type { Product } from '../../types';

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    adminService
      .listProducts()
      .then((data: Product[]) => setProducts(data))
      .catch((err: any) => toast(err.message || 'Failed to load products', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm('Delete "' + name + '"? This cannot be undone.')) return;
    setDeleting(id);
    try {
      await adminService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id && p._id !== id));
      toast('Product deleted', 'success');
    } catch (err: any) {
      toast(err.message || 'Failed to delete', 'error');
    } finally {
      setDeleting(null);
    }
  };

  const filtered = products.filter(
    (p: Product) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Products</h1>
          <p className="text-sm text-zinc-500 mt-1">{products.length} total products in your store</p>
        </div>
        <Link to="/admin/products/new">
          <Button leftIcon={<Plus className="w-4 h-4" />}>New Product</Button>
        </Link>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm outline-none focus:border-zinc-900 transition-colors"
        />
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <PackageX className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
            <p className="text-sm text-zinc-500">No products found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-600">Product</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-600">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-600">Price</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-600">Stock</th>
                  <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filtered.map((p: Product) => {
                  const id = p.id || p._id;
                  return (
                    <tr key={id} className="hover:bg-zinc-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover rounded-lg bg-zinc-100" />
                          <div className="min-w-0">
                            <p className="font-semibold text-zinc-900 truncate">{p.name}</p>
                            <p className="text-xs text-zinc-500 font-mono">{p.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-zinc-700">{p.category}</td>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-zinc-900">{formatCurrency(p.discountPrice || p.price)}</span>
                        {p.discountPrice && <span className="text-xs text-zinc-400 line-through ml-2">{formatCurrency(p.price)}</span>}
                      </td>
                      <td className="px-4 py-3">
                        <span className={'inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ' + (p.stock > 20 ? 'bg-emerald-50 text-emerald-700' : p.stock > 0 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700')}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link to={'/admin/products/' + id} className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900 transition-colors" title="Edit">
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button onClick={() => handleDelete(id, p.name)} disabled={deleting === id} className="p-2 rounded-lg hover:bg-red-50 text-zinc-600 hover:text-red-600 transition-colors disabled:opacity-40 cursor-pointer" title="Delete">
                            {deleting === id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;