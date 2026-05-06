import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../src/components/AdminLayout';
import { Download, AlertCircle, User, ShoppingCart, Layers, ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 10;

export default function AdminDashboard() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [loadingPurchases, setLoadingPurchases] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        setLoadingCustomers(true);
        const c = await fetch('/api/admin/customers');
        if (c.status === 401) return router.push('/admin/login');
        if (!c.ok) throw new Error('Failed to load customers');
        const cj = await c.json();
        setCustomers(cj.customers || []);
      } catch (e) {
        setErrorMessage('Error loading contacts');
      } finally {
        setLoadingCustomers(false);
      }

      try {
        setLoadingPurchases(true);
        const p = await fetch('/api/admin/purchases');
        if (p.status === 401) return router.push('/admin/login');
        if (!p.ok) throw new Error('Failed to load purchases');
        const pj = await p.json();
        setPurchases(pj.purchases || []);
      } catch (e) {
        setErrorMessage(prev => (prev ? prev + '; Error loading purchases' : 'Error loading purchases'));
      } finally {
        setLoadingPurchases(false);
      }
    }
    load();
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(c => {
      return (
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.message && c.message.toLowerCase().includes(q))
      );
    });
  }, [customers, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function exportCSV(rows: any[], filename = 'export.csv') {
    if (!rows || rows.length === 0) return;
    const keys = Object.keys(rows[0]).filter(k => k !== '_id');
    const csv = [keys.join(',')].concat(rows.map(r => keys.map(k => `"${String(r[k] ?? '')}"`).join(','))).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-600 mt-1">Overview of recent contacts and purchases</p>
        {errorMessage && (
          <div className="flex items-center gap-2 bg-rose-100 text-rose-800 border border-rose-200 rounded p-3 mt-4">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-slate-500">Total Contacts</div>
          <div className="text-2xl font-semibold">{customers.length}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-slate-500">Total Purchases</div>
          <div className="text-2xl font-semibold">{purchases.length}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-slate-500">Active Plans</div>
          <div className="text-2xl font-semibold">{Array.from(new Set(purchases.map(p => p.plan))).length}</div>
        </div>
      </div>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Contacts</h2>
          <div className="flex items-center gap-3">
            <input
              placeholder="Search by email, name or message"
              value={query}
              onChange={e => { setQuery(e.target.value); setPage(1); }}
              className="px-3 py-2 border rounded w-80"
            />
            <button onClick={() => exportCSV(filtered, 'contacts.csv')} className="flex items-center gap-2 px-3 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition-colors"><Download size={16} />Export CSV</button>
          </div>
        </div>

        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full text-left table-fixed">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3 w-1/4">Email</th>
                <th className="p-3 w-1/6">Name</th>
                <th className="p-3 w-1/6">Phone</th>
                <th className="p-3 w-1/6">Company</th>
                <th className="p-3">Address</th>
                <th className="p-3">Message</th>
                <th className="p-3 w-36">Created</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map(c => (
                <tr key={c._id} className="border-t">
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.phone ?? '-'}</td>
                  <td className="p-3">{c.companyName ?? '-'}</td>
                  <td className="p-3 truncate">{c.address ?? '-'}</td>
                  <td className="p-3 truncate">{c.message}</td>
                  <td className="p-3">{new Date(c.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-slate-500">No contacts found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-slate-500">Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)} - {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded">Prev</button>
            <div className="px-3 py-1">{page} / {pageCount}</div>
            <button onClick={() => setPage(p => Math.min(pageCount, p + 1))} className="px-3 py-1 border rounded">Next</button>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Purchases</h2>
          <div className="flex items-center gap-3">
            <button onClick={() => exportCSV(purchases, 'purchases.csv')} className="px-3 py-2 bg-slate-800 text-white rounded">Export CSV</button>
          </div>
        </div>

        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3">Email</th>
                <th className="p-3">Plan</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Contact ID</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Company</th>
                <th className="p-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map(p => (
                <tr key={p._id} className="border-t">
                  <td className="p-3">{p.email}</td>
                  <td className="p-3">{p.plan}</td>
                  <td className="p-3">{p.amount ?? '-'}</td>
                  <td className="p-3">{p.contactId ?? '-'}</td>
                  <td className="p-3">{p.phone ?? '-'}</td>
                  <td className="p-3">{p.companyName ?? '-'}</td>
                  <td className="p-3">{new Date(p.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {purchases.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-slate-500">No purchases found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  );
}
