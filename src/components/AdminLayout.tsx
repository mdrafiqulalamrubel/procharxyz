import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AdminResetModal from './AdminResetModal';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [showReset, setShowReset] = useState(false);

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-lg font-semibold text-slate-900">Prochar Admin</Link>
              <span className="text-sm text-slate-500">CRM Dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/admin/blogs" className="text-sm text-slate-600 hover:text-slate-900 font-medium">Blog Management</Link>
              <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">View Site</Link>
              <button onClick={() => setShowReset(true)} className="text-sm px-3 py-1.5 border rounded bg-slate-100">Change Password</button>
              <button
                onClick={handleLogout}
                className="ml-3 inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <AdminResetModal isOpen={showReset} onClose={() => setShowReset(false)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
