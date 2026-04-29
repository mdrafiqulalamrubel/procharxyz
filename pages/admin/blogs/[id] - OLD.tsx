'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../src/components/AdminLayout';
import dynamic from 'next/dynamic';
import { X } from 'lucide-react';
import slug from 'slug';

const BlockNoteEditorWrapper = dynamic(
  () => import('../../../src/components/BlockNoteEditorWrapper'),
  { ssr: false }
);

interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any;
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

export default function BlogEditorPage() {
  const router = useRouter();
  const { id } = router.query;

  const isReady = router.isReady;
  const isNew = id === 'new';

  const [blog, setBlog] = useState<BlogPost>({
    title: '',
    slug: '',
    excerpt: '',
    content: [{ type: 'paragraph', content: [] }],
    category: '',
    tags: [],
    author: 'Admin',
    published: false,
    seoTitle: '',
    seoDescription: '',
    seoKeywords: [],
    canonicalUrl: '',
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [seoKeywordInput, setSeoKeywordInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    if (!isNew && id) {
      fetchBlog();
    } else {
      setLoading(false);
    }

    fetchCategories();
  }, [id, isNew, isReady]);

  const fetchBlog = async () => {
    try {
      const token = localStorage.getItem('admin_token');

      const res = await fetch(`/api/admin/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      setBlog({
        ...data,
        content:
          data.content?.length > 0
            ? data.content
            : [{ type: 'paragraph', content: [] }],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/blog-categories');
      const data = await res.json();
      setCategories(data.map((c: any) => c.name));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const token = localStorage.getItem('admin_token');

      const payload = {
        ...blog,
        slug: slug(blog.title).toLowerCase(),
      };

      const method = isNew ? 'POST' : 'PUT';
      const url = isNew
        ? '/api/admin/blogs'
        : `/api/admin/blogs/${blog._id}`;

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) router.push('/admin/blogs');
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    const value = tagInput.trim();
    if (!value || blog.tags.includes(value)) return;

    setBlog(prev => ({
      ...prev,
      tags: [...prev.tags, value],
    }));
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setBlog(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };

  const addSeoKeyword = () => {
    const value = seoKeywordInput.trim();
    if (!value || blog.seoKeywords?.includes(value)) return;

    setBlog(prev => ({
      ...prev,
      seoKeywords: [...(prev.seoKeywords || []), value],
    }));
    setSeoKeywordInput('');
  };

  const removeSeoKeyword = (keyword: string) => {
    setBlog(prev => ({
      ...prev,
      seoKeywords: (prev.seoKeywords || []).filter(k => k !== keyword),
    }));
  };

  const addCategory = async () => {
    const value = categoryInput.trim();
    if (!value || categories.includes(value)) return;

    try {
      setAddingCategory(true);
      const token = localStorage.getItem('admin_token');

      const res = await fetch('/api/blog-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: value }),
      });

      if (res.ok) {
        setCategories(prev => [...prev, value]);
        setBlog(prev => ({ ...prev, category: value }));
        setCategoryInput('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setAddingCategory(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-20 text-gray-500">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 space-y-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            {isNew ? 'Create Blog' : 'Edit Blog'}
          </h1>

          <div className="flex gap-2">
            <button
              onClick={() => router.push('/admin/blogs')}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              <X />
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-2 text-white rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6 bg-white p-5 rounded-xl shadow">

            <input
              placeholder="Title"
              value={blog.title}
              onChange={(e) =>
                setBlog(prev => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              placeholder="Excerpt"
              value={blog.excerpt}
              onChange={(e) =>
                setBlog(prev => ({ ...prev, excerpt: e.target.value }))
              }
              className="w-full px-4 py-3 border rounded-lg"
            />

            <div className="border rounded-lg bg-gray-50 min-h-[400px] p-2">
              <BlockNoteEditorWrapper
                initialContent={blog.content}
                onChange={(content) =>
                  setBlog(prev => ({ ...prev, content }))
                }
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            <div className="bg-white p-5 rounded-xl shadow space-y-4">

              <select
                value={blog.category}
                onChange={(e) =>
                  setBlog(prev => ({ ...prev, category: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>

              {/* ADD CATEGORY */}
              <div className="flex gap-2">
                <input
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  placeholder="Add new category"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
                <button
                  onClick={addCategory}
                  disabled={addingCategory}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {addingCategory ? 'Adding...' : 'Add'}
                </button>
              </div>

              {/* TAGS */}
              <div className="flex gap-2">
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add tag"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
                <button
                  onClick={addTag}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {blog.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="text-blue-700 hover:text-blue-900"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>

              {/* AUTHOR */}
              <input
                placeholder="Author"
                value={blog.author}
                onChange={(e) =>
                  setBlog(prev => ({ ...prev, author: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded-lg"
              />

              {/* FEATURED IMAGE */}
              <input
                placeholder="Featured Image URL"
                value={blog.image || ''}
                onChange={(e) =>
                  setBlog(prev => ({ ...prev, image: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded-lg"
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={blog.published}
                  onChange={(e) =>
                    setBlog(prev => ({
                      ...prev,
                      published: e.target.checked,
                    }))
                  }
                />
                Publish
              </label>

            </div>

            {/* SEO SETTINGS */}
            <div className="bg-white p-5 rounded-xl shadow space-y-4">
              <h3 className="font-bold text-slate-900">SEO Settings</h3>

              {/* SEO TITLE */}
              <div>
                <label className="text-sm text-gray-600">SEO Title</label>
                <input
                  value={blog.seoTitle}
                  onChange={(e) =>
                    setBlog(prev => ({ ...prev, seoTitle: e.target.value.slice(0, 60) }))
                  }
                  placeholder="SEO Title"
                  maxLength={60}
                  className="w-full px-3 py-2 border rounded-lg mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">{blog.seoTitle?.length || 0}/60</p>
              </div>

              {/* SEO DESCRIPTION */}
              <div>
                <label className="text-sm text-gray-600">SEO Description</label>
                <textarea
                  value={blog.seoDescription}
                  onChange={(e) =>
                    setBlog(prev => ({ ...prev, seoDescription: e.target.value.slice(0, 160) }))
                  }
                  placeholder="SEO Description"
                  maxLength={160}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">{blog.seoDescription?.length || 0}/160</p>
              </div>

              {/* SEO KEYWORDS */}
              <div>
                <label className="text-sm text-gray-600">SEO Keywords</label>
                <div className="flex gap-2 mt-2">
                  <input
                    value={seoKeywordInput}
                    onChange={(e) => setSeoKeywordInput(e.target.value)}
                    placeholder="Add keyword"
                    className="flex-1 px-3 py-2 border rounded-lg"
                  />
                  <button
                    onClick={addSeoKeyword}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {blog.seoKeywords?.map(keyword => (
                    <span
                      key={keyword}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full flex items-center gap-2 text-sm"
                    >
                      {keyword}
                      <button
                        onClick={() => removeSeoKeyword(keyword)}
                        className="text-purple-700 hover:text-purple-900"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* CANONICAL URL */}
              <div>
                <label className="text-sm text-gray-600">Canonical URL</label>
                <input
                  value={blog.canonicalUrl || ''}
                  onChange={(e) =>
                    setBlog(prev => ({ ...prev, canonicalUrl: e.target.value }))
                  }
                  placeholder="https://example.com/blog/post"
                  className="w-full px-3 py-2 border rounded-lg mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Optional: Leave empty to auto-generate</p>
              </div>
            </div>
          </div>
        </div>

        {/* FLOAT BUTTON */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={handleSave}
            className="px-6 py-3 text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
          >
            Save
          </button>
        </div>

      </div>
    </AdminLayout>
  );
}