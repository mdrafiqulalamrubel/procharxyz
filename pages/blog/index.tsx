import { useState, useEffect } from 'react';
import Link from 'next/link';
import PageNavbar from '../../src/components/PageNavbar';
import Footer from '../../src/components/Footer';
import SeoHead from '../../src/components/SeoHead';
import SignupModal from '../../src/components/SignupModal';
import { Calendar, ArrowRight, Search, Filter } from 'lucide-react';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  views: number;
  createdAt: string;
}

export default function BlogPage() {
  const [blogs, setBlog] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('free');

  const handleSignup = (plan: string = 'free') => {
    setSelectedPlan(plan);
    setShowSignupModal(true);
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, [page, selectedCategory]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      let url = `/api/blogs?page=${page}&limit=9`;
      if (selectedCategory) url += `&category=${selectedCategory}`;

      const res = await fetch(url);
      const data = await res.json();

      setBlog(data.blogs || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/blog-categories');
      const data = await res.json();
      setCategories(data.map((c: any) => c.name));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SeoHead
        title="Blog - Prochar.xyz"
        description="Latest email marketing strategies, tips and insights."
        url="https://prochar.xyz/blog"
        canonicalUrl="https://prochar.xyz/blog"
      />

      <div className="min-h-screen bg-gray-50 text-gray-900">

        <PageNavbar onSignup={() => handleSignup('free')} />

        {/* HERO */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Blog & Insights
            </h1>
            <p className="opacity-90 mb-8">
              Learn marketing, growth & automation strategies 🚀
            </p>

            {/* SEARCH */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-3 w-5 h-5 opacity-70" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search blogs..."
                className="w-full pl-12 pr-4 py-3 rounded-lg text-black outline-none"
              />
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-4 py-12">

          <div className="flex flex-col lg:flex-row gap-8">

            {/* SIDEBAR */}
            <div className="lg:w-64">
              <div className="bg-white rounded-xl shadow p-4 sticky top-24">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Categories
                </h3>

                <button
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-3 py-2 rounded-lg mb-2 ${
                    selectedCategory === ''
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  All
                </button>

                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg mb-2 ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* BLOG GRID */}
            <div className="flex-1">

              {loading ? (
                <div className="text-center py-20">Loading...</div>
              ) : filteredBlogs.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  No blogs found 😢
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {filteredBlogs.map((blog) => (
                      <Link key={blog._id} href={`/blog/${blog.slug}`}>
                        <div className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden h-full flex flex-col cursor-pointer">

                          {/* CATEGORY */}
                          <div className="p-4 pb-2">
                            <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                              {blog.category}
                            </span>
                          </div>

                          {/* TITLE */}
                          <div className="px-4 flex-1">
                            <h2 className="font-bold text-lg mb-2 line-clamp-2 hover:text-blue-600">
                              {blog.title}
                            </h2>
                            <p className="text-sm text-gray-600 line-clamp-3">
                              {blog.excerpt}
                            </p>
                          </div>

                          {/* FOOTER */}
                          <div className="flex justify-between items-center px-4 py-4 border-t text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(blog.createdAt).toLocaleDateString()}
                            </div>
                            <ArrowRight className="w-4 h-4 text-blue-600" />
                          </div>

                        </div>
                      </Link>
                    ))}

                  </div>

                  {/* PAGINATION */}
                  {total > 9 && (
                    <div className="flex justify-center gap-4 mt-10">
                      <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        className="px-4 py-2 border rounded-lg"
                      >
                        Prev
                      </button>

                      <span>
                        Page {page} / {Math.ceil(total / 9)}
                      </span>

                      <button
                        onClick={() =>
                          setPage(p =>
                            Math.min(Math.ceil(total / 9), p + 1)
                          )
                        }
                        className="px-4 py-2 border rounded-lg"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}

            </div>

          </div>
        </div>

        <Footer />
      </div>

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        selectedPlan={selectedPlan}
      />
    </>
  );
}