'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../src/components/AdminLayout';
import dynamic from 'next/dynamic';
import slug from 'slug';
import {
  Save, X, Eye, EyeOff, ChevronDown, ChevronUp,
  Upload, Image as ImageIcon, Tag, Folder,
  Search, Globe, RefreshCw, Trash2, ExternalLink,
  AlertCircle, CheckCircle2, Clock, Loader2
} from 'lucide-react';

const RichEditor = dynamic(() => import('../../../src/components/RichEditor'), { ssr: false });

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML string (TipTap)
  category: string;
  tags: string[];
  author: string;
  image?: string;
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  canonicalUrl?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Pill({ label, onRemove, color = 'blue' }: { label: string; onRemove: () => void; color?: string }) {
  const colors: Record<string, string> = {
    blue:   'bg-blue-50 text-blue-700 border-blue-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    green:  'bg-emerald-50 text-emerald-700 border-emerald-200',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${colors[color]}`}>
      {label}
      <button type="button" onClick={onRemove} className="hover:opacity-60 transition-opacity">
        <X size={10} strokeWidth={2.5} />
      </button>
    </span>
  );
}

function SidePanel({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors"
      >
        <span className="text-sm font-semibold text-slate-800 tracking-wide uppercase">{title}</span>
        {open ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
      </button>
      {open && <div className="px-5 pb-5 space-y-4">{children}</div>}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BlogEditorPage() {
  const router = useRouter();
  const { id } = router.query;
  const isNew = id === 'new';

  const [blog, setBlog] = useState<BlogPost>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [] as string[],
    author: 'Admin',
    published: false,
    seoTitle: '',
    seoDescription: '',
    seoKeywords: [] as string[],
    canonicalUrl: '',
  });

  const [categories, setCategories]       = useState<string[]>([]);
  const [loading, setLoading]             = useState(true);
  const [saving, setSaving]               = useState(false);
  const [saveStatus, setSaveStatus]       = useState<'idle' | 'saved' | 'error'>('idle');
  const [tagInput, setTagInput]           = useState('');
  const [seoKwInput, setSeoKwInput]       = useState('');
  const [catInput, setCatInput]           = useState('');
  const [addingCat, setAddingCat]         = useState(false);
  const [imagePreview, setImagePreview]   = useState<string>('');
  const [uploadingImg, setUploadingImg]   = useState(false);
  const coverRef = useRef<HTMLInputElement>(null);

  // ── Load data ──────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!router.isReady) return;
    if (!isNew && id) fetchBlog();
    else setLoading(false);
    fetchCategories();
  }, [id, isNew, router.isReady]);

  const fetchBlog = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`/api/admin/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      // content may be old BlockNote array or new TipTap HTML string
      const rawContent = data.content;
      const safeContent = typeof rawContent === 'string'
        ? rawContent
        : Array.isArray(rawContent)
          ? '' // old BlockNote format — start fresh
          : '';
      setBlog({
        ...data,
        content: safeContent,
        tags: Array.isArray(data.tags) ? data.tags : [],
        seoKeywords: Array.isArray(data.seoKeywords) ? data.seoKeywords : [],
      });
      if (data.image) setImagePreview(data.image);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/blog-categories');
      const data = await res.json();
      setCategories(data.map((c: any) => c.name));
    } catch (e) { console.error(e); }
  };

  // ── Save ───────────────────────────────────────────────────────────────────

  const handleSave = useCallback(async (publishOverride?: boolean) => {
    if (!blog.title.trim()) return;
    setSaving(true);
    try {
      const token = localStorage.getItem('admin_token');
      const payload = {
        ...blog,
        slug: slug(blog.title).toLowerCase(),
        published: publishOverride !== undefined ? publishOverride : blog.published,
      };
      const method = isNew ? 'POST' : 'PUT';
      const url = isNew ? '/api/admin/blogs' : `/api/admin/blogs/${blog._id}`;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSaveStatus('saved');
        if (publishOverride !== undefined) setBlog(p => ({ ...p, published: publishOverride }));
        setTimeout(() => setSaveStatus('idle'), 3000);
        if (isNew) {
          const data = await res.json();
          router.replace(`/admin/blogs/${data._id}`);
        }
      } else {
        setSaveStatus('error');
      }
    } catch (e) { setSaveStatus('error'); }
    finally { setSaving(false); }
  }, [blog, isNew, router]);

  // Auto-save draft every 30s
  useEffect(() => {
    if (isNew || !blog._id) return;
    const timer = setInterval(() => { if (!saving) handleSave(); }, 30000);
    return () => clearInterval(timer);
  }, [blog._id, handleSave, isNew, saving]);

  // ── Image upload ───────────────────────────────────────────────────────────

  const handleCoverUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setUploadingImg(true);
    try {
      // Try real upload endpoint first
      const token = localStorage.getItem('admin_token');
      const form = new FormData();
      form.append('file', file);
      try {
        const res = await fetch('/api/admin/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form });
        if (res.ok) {
          const { url } = await res.json();
          setImagePreview(url);
          setBlog(p => ({ ...p, image: url }));
          return;
        }
      } catch {}
      // Fallback: compress before base64 to avoid large payload
      const src = await compressImageToBase64(file, 1200, 0.8);
      setImagePreview(src);
      setBlog(p => ({ ...p, image: src }));
    } finally { setUploadingImg(false); }
  };

  const handleInlineImageUpload = async (file: File): Promise<string> => {
    // Step 1: try real upload endpoint
    const token = localStorage.getItem('admin_token');
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      if (res.ok) {
        const { url } = await res.json();
        return url;
      }
    } catch {}

    // Step 2: fallback — compress image before base64 to avoid hanging
    return compressImageToBase64(file, 900, 0.75);
  };

  // Compress image to max width and quality before converting to base64
  const compressImageToBase64 = (file: File, maxWidth = 900, quality = 0.75): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => {
        // Last resort: raw base64
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      };
      img.src = url;
    });
  };

  // ── Tag / category helpers ─────────────────────────────────────────────────

  const addTag = () => {
    const v = tagInput.trim();
    if (!v || blog.tags.includes(v)) return;
    setBlog(p => ({ ...p, tags: [...p.tags, v] }));
    setTagInput('');
  };

  const addSeoKw = () => {
    const v = seoKwInput.trim();
    if (!v || blog.seoKeywords?.includes(v)) return;
    setBlog(p => ({ ...p, seoKeywords: [...(p.seoKeywords || []), v] }));
    setSeoKwInput('');
  };

  const addCategory = async () => {
    const v = catInput.trim();
    if (!v || categories.includes(v)) return;
    setAddingCat(true);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/blog-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: v }),
      });
      if (res.ok) {
        setCategories(p => [...p, v]);
        setBlog(p => ({ ...p, category: v }));
        setCatInput('');
      }
    } finally { setAddingCat(false); }
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      </AdminLayout>
    );
  }

  const wordCount = blog.content && typeof blog.content === 'string' ? (blog.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length) : 0;

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50 pb-20" style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── TOP BAR ── */}
        <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center justify-between h-14 gap-4">

            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => router.push('/admin/blogs')}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors flex-shrink-0"
              >
                <X size={16} />
              </button>
              <span className="text-sm font-semibold text-slate-800 truncate">
                {isNew ? 'New Post' : (blog.title || 'Untitled')}
              </span>
              {saveStatus === 'saved' && (
                <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium flex-shrink-0">
                  <CheckCircle2 size={12} /> Saved
                </span>
              )}
              {saveStatus === 'error' && (
                <span className="flex items-center gap-1 text-xs text-red-500 font-medium flex-shrink-0">
                  <AlertCircle size={12} /> Error saving
                </span>
              )}
              {saving && (
                <span className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
                  <Loader2 size={12} className="animate-spin" /> Saving...
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Word count */}
              <span className="hidden sm:block text-xs text-slate-400 mr-2">{wordCount} words</span>

              {/* Preview */}
              {!isNew && blog.slug && (
                <a
                  href={`/blog/${blog.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <ExternalLink size={13} /> Preview
                </a>
              )}

              {/* Save draft */}
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
              >
                <Save size={13} />
                <span className="hidden sm:inline">Save Draft</span>
              </button>

              {/* Publish toggle */}
              <button
                onClick={() => handleSave(!blog.published)}
                disabled={saving}
                className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold rounded-lg transition-all disabled:opacity-50 ${
                  blog.published
                    ? 'bg-slate-800 text-white hover:bg-slate-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200'
                }`}
              >
                {blog.published ? <EyeOff size={13} /> : <Eye size={13} />}
                {blog.published ? 'Unpublish' : 'Publish'}
              </button>
            </div>
          </div>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">

          {/* ── LEFT: EDITOR ── */}
          <div className="space-y-4">

            {/* Title */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <textarea
                placeholder="Post title…"
                value={blog.title}
                rows={2}
                onChange={e => setBlog(p => ({ ...p, title: e.target.value }))}
                className="w-full px-8 pt-6 pb-2 text-3xl sm:text-4xl font-black text-slate-900 placeholder-slate-300 resize-none focus:outline-none border-b border-slate-100"
                style={{ fontFamily: "'Syne', sans-serif" }}
              />
              <div className="flex items-center gap-2 px-8 py-3 text-xs text-slate-400">
                <span>Permalink:</span>
                <code className="text-blue-500">/blog/<strong>{slug(blog.title || 'post-slug').toLowerCase()}</strong></code>
              </div>
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="px-6 pt-4 pb-2 border-b border-slate-100">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Excerpt / Summary</span>
              </div>
              <textarea
                placeholder="Write a brief summary of this post (shown in listings and meta description if SEO description is empty)…"
                value={blog.excerpt}
                rows={3}
                onChange={e => setBlog(p => ({ ...p, excerpt: e.target.value }))}
                className="w-full px-6 py-4 text-sm text-slate-700 placeholder-slate-300 resize-none focus:outline-none"
              />
            </div>

            {/* Rich Editor */}
            <div>
              <div className="mb-2 px-1 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Content</span>
                <span className="text-xs text-slate-400">Paste from Word, Google Docs, web — formatting preserved</span>
              </div>
              <RichEditor
                content={blog.content}
                onChange={content => setBlog(p => ({ ...p, content }))}
                onImageUpload={handleInlineImageUpload}
              />
            </div>
          </div>

          {/* ── RIGHT: SIDEBAR PANELS ── */}
          <div className="space-y-4">

            {/* STATUS */}
            <SidePanel title="Status">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${blog.published ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                <div>
                  <div className="text-sm font-semibold text-slate-800">{blog.published ? 'Published' : 'Draft'}</div>
                  <div className="text-xs text-slate-400">{blog.published ? 'Visible to readers' : 'Not visible to readers'}</div>
                </div>
              </div>
              <input
                placeholder="Author name"
                value={blog.author}
                onChange={e => setBlog(p => ({ ...p, author: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 transition-colors"
              />
            </SidePanel>

            {/* COVER IMAGE */}
            <SidePanel title="Cover Image">
              <div
                onClick={() => coverRef.current?.click()}
                onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleCoverUpload(f); }}
                onDragOver={e => e.preventDefault()}
                className="relative cursor-pointer group"
              >
                {imagePreview ? (
                  <div className="relative rounded-xl overflow-hidden">
                    <img src={imagePreview} alt="Cover" className="w-full h-44 object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); setImagePreview(''); setBlog(p => ({ ...p, image: '' })); }}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                      <button type="button" className="p-2 bg-white text-slate-800 rounded-lg hover:bg-slate-100">
                        <Upload size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-200 rounded-xl h-36 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-blue-400 hover:text-blue-400 transition-colors">
                    {uploadingImg ? <Loader2 size={22} className="animate-spin" /> : <ImageIcon size={22} />}
                    <span className="text-xs font-medium">
                      {uploadingImg ? 'Uploading…' : 'Click or drag image here'}
                    </span>
                    <span className="text-xs text-slate-300">PNG, JPG, WEBP, GIF</span>
                  </div>
                )}
              </div>
              <input
                ref={coverRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleCoverUpload(f); e.target.value = ''; }}
              />
              <input
                placeholder="Or paste image URL…"
                value={blog.image || ''}
                onChange={e => { setBlog(p => ({ ...p, image: e.target.value })); setImagePreview(e.target.value); }}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 transition-colors"
              />
            </SidePanel>

            {/* CATEGORY */}
            <SidePanel title="Category">
              <select
                value={blog.category}
                onChange={e => setBlog(p => ({ ...p, category: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 bg-white transition-colors"
              >
                <option value="">— Select category —</option>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
              <div className="flex gap-2">
                <input
                  value={catInput}
                  onChange={e => setCatInput(e.target.value)}
                  placeholder="New category name"
                  onKeyDown={e => e.key === 'Enter' && addCategory()}
                  className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 transition-colors"
                />
                <button
                  onClick={addCategory}
                  disabled={addingCat}
                  className="px-3 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                >
                  {addingCat ? '…' : '+ Add'}
                </button>
              </div>
            </SidePanel>

            {/* TAGS */}
            <SidePanel title="Tags">
              <div className="flex gap-2">
                <input
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  placeholder="Add a tag…"
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(); } }}
                  className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 transition-colors"
                />
                <button onClick={addTag} className="px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                  Add
                </button>
              </div>
              {blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map(t => (
                    <Pill key={t} label={t} onRemove={() => setBlog(p => ({ ...p, tags: p.tags.filter(x => x !== t) }))} />
                  ))}
                </div>
              )}
              <p className="text-xs text-slate-400">Press Enter or comma to add</p>
            </SidePanel>

            {/* SEO */}
            <SidePanel title="SEO Settings" defaultOpen={false}>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">SEO Title</label>
                <input
                  value={blog.seoTitle}
                  maxLength={60}
                  onChange={e => setBlog(p => ({ ...p, seoTitle: e.target.value.slice(0, 60) }))}
                  placeholder="Search engine title…"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 transition-colors"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>{blog.seoTitle?.length || 0}/60</span>
                  <span className={blog.seoTitle && blog.seoTitle.length > 50 ? 'text-emerald-500' : 'text-amber-400'}>
                    {blog.seoTitle && blog.seoTitle.length > 50 ? '✓ Good' : 'Aim for 50-60 chars'}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Meta Description</label>
                <textarea
                  value={blog.seoDescription}
                  maxLength={160}
                  rows={3}
                  onChange={e => setBlog(p => ({ ...p, seoDescription: e.target.value.slice(0, 160) }))}
                  placeholder="Brief description for search results…"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 resize-none transition-colors"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>{blog.seoDescription?.length || 0}/160</span>
                  <span className={(blog.seoDescription?.length || 0) > 120 ? 'text-emerald-500' : 'text-amber-400'}>
                    {(blog.seoDescription?.length || 0) > 120 ? '✓ Good' : 'Aim for 120-160 chars'}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">SEO Keywords</label>
                <div className="flex gap-2">
                  <input
                    value={seoKwInput}
                    onChange={e => setSeoKwInput(e.target.value)}
                    placeholder="Add keyword…"
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSeoKw(); } }}
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 transition-colors"
                  />
                  <button onClick={addSeoKw} className="px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                    Add
                  </button>
                </div>
                {blog.seoKeywords && blog.seoKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {blog.seoKeywords.map(k => (
                      <Pill key={k} label={k} color="purple" onRemove={() => setBlog(p => ({ ...p, seoKeywords: (p.seoKeywords || []).filter(x => x !== k) }))} />
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Canonical URL</label>
                <div className="flex items-center gap-2">
                  <Globe size={13} className="text-slate-400 flex-shrink-0" />
                  <input
                    value={blog.canonicalUrl || ''}
                    onChange={e => setBlog(p => ({ ...p, canonicalUrl: e.target.value }))}
                    placeholder="https://… (leave empty to auto-generate)"
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
              </div>

              {/* SERP Preview */}
              {(blog.seoTitle || blog.title) && (
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <div className="text-xs text-slate-400 mb-2 font-semibold uppercase tracking-wide">SERP Preview</div>
                  <div className="text-xs text-green-700 mb-0.5">prochar.xyz › blog › {slug(blog.title || 'post').toLowerCase()}</div>
                  <div className="text-sm text-blue-700 font-semibold leading-snug mb-1 line-clamp-1">
                    {blog.seoTitle || blog.title}
                  </div>
                  <div className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {blog.seoDescription || blog.excerpt || 'No description set. Add a meta description above.'}
                  </div>
                </div>
              )}
            </SidePanel>

          </div>
        </div>

      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
      `}</style>
    </AdminLayout>
  );
}
