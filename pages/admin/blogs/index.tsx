import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../src/components/AdminLayout';
import {
  Plus, Edit2, Trash2, Eye, EyeOff, Search,
  FileText, TrendingUp, CheckCircle, Clock,
  ChevronLeft, ChevronRight, Filter, MoreVertical,
  RefreshCw, ExternalLink
} from 'lucide-react';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  author?: string;
  tags?: string[];
}

interface Stats { total: number; published: number; drafts: number; totalViews: number; }

// ─── Small helpers ────────────────────────────────────────────────────────────

const statusBadge = (published: boolean) =>
  published
    ? 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200'
    : 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200';

function StatCard({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>{icon}</div>
      <div>
        <div className="text-2xl font-black text-slate-900" style={{ fontFamily: "'Times New Roman', Times, serif" }}>{value}</div>
        <div className="text-sm font-medium text-slate-500">{label}</div>
        {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function BlogsPage() {
  const router = useRouter();

  const [blogs, setBlogs]         = useState<BlogPost[]>([]);
  const [stats, setStats]         = useState<Stats>({ total: 0, published: 0, drafts: 0, totalViews: 0 });
  const [loading, setLoading]     = useState(true);
  const [page, setPage]           = useState(1);
  const [total, setTotal]         = useState(0);
  const [search, setSearch]       = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [openMenu, setOpenMenu]   = useState<string | null>(null);
  const [deleting, setDeleting]   = useState<string | null>(null);

  const LIMIT = 10;

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const params = new URLSearchParams({
        page: String(page), limit: String(LIMIT),
        ...(search && { search }),
        ...(filterStatus !== 'all' && { status: filterStatus }),
      });
      const res = await fetch(`/api/admin/blogs?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBlogs(data.blogs || []);
      setTotal(data.total || 0);

      // Build stats from response or separate call
      if (data.stats) {
        setStats(data.stats);
      } else {
        setStats({
          total: data.total || 0,
          published: (data.blogs || []).filter((b: BlogPost) => b.published).length,
          drafts: (data.blogs || []).filter((b: BlogPost) => !b.published).length,
          totalViews: (data.blogs || []).reduce((a: number, b: BlogPost) => a + (b.views || 0), 0),
        });
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [page, search, filterStatus]);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => { setPage(1); fetchBlogs(); }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post permanently?')) return;
    setDeleting(id);
    try {
      const token = localStorage.getItem('admin_token');
      await fetch(`/api/admin/blogs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBlogs();
    } finally { setDeleting(null); }
  };

  const handleTogglePublish = async (blog: BlogPost) => {
    try {
      const token = localStorage.getItem('admin_token');
      await fetch(`/api/admin/blogs/${blog._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...blog, published: !blog.published }),
      });
      fetchBlogs();
    } catch (e) { console.error(e); }
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <AdminLayout>
      <div className="space-y-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              Blog Posts
            </h1>
            <p className="text-slate-500 mt-0.5 text-sm">Manage and publish your content</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchBlogs}
              className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={15} />
            </button>
            <button
              onClick={() => router.push('/admin/blogs/new')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5"
            >
              <Plus size={16} /> New Post
            </button>
          </div>
        </div>

        {/* ── STATS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<FileText size={18} className="text-blue-600" />}    label="Total Posts"   value={stats.total}      color="bg-blue-50" />
          <StatCard icon={<CheckCircle size={18} className="text-emerald-600"/>} label="Published"   value={stats.published}  color="bg-emerald-50" />
          <StatCard icon={<Clock size={18} className="text-amber-600" />}       label="Drafts"       value={stats.drafts}     color="bg-amber-50" />
          <StatCard icon={<TrendingUp size={18} className="text-purple-600" />} label="Total Views"  value={stats.totalViews?.toLocaleString()} color="bg-purple-50" />
        </div>

        {/* ── FILTERS ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search posts by title or category…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-blue-400 shadow-sm transition-colors"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            {(['all', 'published', 'draft'] as const).map(s => (
              <button
                key={s}
                onClick={() => { setFilterStatus(s); setPage(1); }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                  filterStatus === s
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ── TABLE ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center p-16 text-slate-400">
              <RefreshCw size={20} className="animate-spin mr-2" /> Loading posts…
            </div>
          ) : blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16 text-slate-400">
              <FileText size={40} className="mb-4 text-slate-200" />
              <p className="font-semibold text-slate-500">
                {search ? 'No posts match your search' : 'No blog posts yet'}
              </p>
              <p className="text-sm mt-1">
                {search ? 'Try different keywords' : 'Create your first post to get started'}
              </p>
              {!search && (
                <button
                  onClick={() => router.push('/admin/blogs/new')}
                  className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Plus size={15} /> Create First Post
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      {['Title', 'Category', 'Author', 'Views', 'Status', 'Date', ''].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {blogs.map(blog => (
                      <tr key={blog._id} className="hover:bg-slate-50/60 transition-colors group">

                        <td className="px-5 py-4 max-w-xs">
                          <p className="font-semibold text-slate-900 truncate leading-tight">{blog.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5 truncate">/{blog.slug}</p>
                        </td>

                        <td className="px-5 py-4">
                          {blog.category
                            ? <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200">{blog.category}</span>
                            : <span className="text-slate-300 text-xs">—</span>
                          }
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-500">{blog.author || '—'}</td>

                        <td className="px-5 py-4">
                          <span className="text-sm font-semibold text-slate-700">{(blog.views || 0).toLocaleString()}</span>
                        </td>

                        <td className="px-5 py-4">
                          <span className={statusBadge(blog.published)}>
                            <span className={`w-1.5 h-1.5 rounded-full ${blog.published ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                            {blog.published ? 'Published' : 'Draft'}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-xs text-slate-400 whitespace-nowrap">
                          {new Date(blog.createdAt).toLocaleDateString('en-BD', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {/* Publish toggle */}
                            <button
                              onClick={() => handleTogglePublish(blog)}
                              title={blog.published ? 'Unpublish' : 'Publish'}
                              className={`p-2 rounded-lg transition-colors ${blog.published ? 'text-emerald-600 hover:bg-emerald-50' : 'text-amber-600 hover:bg-amber-50'}`}
                            >
                              {blog.published ? <Eye size={14} /> : <EyeOff size={14} />}
                            </button>

                            {/* Preview */}
                            <a
                              href={`/blog/${blog.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                              title="View post"
                            >
                              <ExternalLink size={14} />
                            </a>

                            {/* Edit */}
                            <button
                              onClick={() => router.push(`/admin/blogs/${blog._id}`)}
                              className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={14} />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(blog._id)}
                              disabled={deleting === blog._id}
                              className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-slate-100">
                {blogs.map(blog => (
                  <div key={blog._id} className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 text-sm truncate">{blog.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {blog.category} · {blog.views || 0} views · {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={statusBadge(blog.published)}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => router.push(`/admin/blogs/${blog._id}`)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Edit2 size={12} /> Edit
                      </button>
                      <button
                        onClick={() => handleTogglePublish(blog)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        {blog.published ? <EyeOff size={12} /> : <Eye size={12} />}
                        {blog.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="p-2 border border-red-200 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing {((page - 1) * LIMIT) + 1}–{Math.min(page * LIMIT, total)} of <strong>{total}</strong> posts
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 text-slate-600 transition-colors"
              >
                <ChevronLeft size={15} />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pg = page <= 3 ? i + 1 : page - 2 + i;
                if (pg > totalPages) return null;
                return (
                  <button
                    key={pg}
                    onClick={() => setPage(pg)}
                    className={`w-9 h-9 text-sm font-semibold rounded-xl border transition-colors ${
                      pg === page
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {pg}
                  </button>
                );
              })}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 text-slate-600 transition-colors"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
      `}</style>
    </AdminLayout>
  );
}
