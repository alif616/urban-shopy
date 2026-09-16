import { useEffect, useState } from 'react';
import { Loader2, Users as UsersIcon, ShieldCheck } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { formatDate } from '../../utils/format';
import { toast } from '../../components/common/Toaster';
import type { User } from '../../types';

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService
      .listUsers()
      .then((data: User[]) => setUsers(data))
      .catch((err: any) => toast(err.message || 'Failed to load users', 'error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Users</h1>
        <p className="text-sm text-zinc-500 mt-1">{users.length} registered users</p>
      </div>

      {loading ? (
        <div className="p-12 flex items-center justify-center bg-white border border-zinc-200 rounded-2xl">
          <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center">
          <UsersIcon className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
          <p className="text-sm text-zinc-500">No users found</p>
        </div>
      ) : (
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-600">Name</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-600">Email</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-600">Role</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-600">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {users.map((u: User) => (
                <tr key={u.id || u._id} className="hover:bg-zinc-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-zinc-900 text-white text-xs font-bold flex items-center justify-center">
                        {u.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium text-zinc-900">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-zinc-700">{u.email}</td>
                  <td className="px-4 py-3">
                    {u.role === 'admin' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                        <ShieldCheck className="w-3 h-3" /> Admin
                      </span>
                    ) : (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-600">User</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-zinc-500 text-xs">{u.createdAt ? formatDate(u.createdAt) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;