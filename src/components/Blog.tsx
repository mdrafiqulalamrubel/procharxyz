import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Clock, Eye, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags?: string[];
  author: string;
  views?: number;
  readTime?: string;
  createdAt: string;
}

// Fallback static posts shown if API fails or returns empty
const FALLBACK_POSTS: BlogPost[] = [
  {
    _id: '1',
    title: '10 Email Marketing Tips to Boost Your Open Rates',
    excerpt: 'Learn proven strategies to increase your email open rates and engagement with your audience.',
    author: 'Rahim Ahmed',
    createdAt: new Date('2026-04-05').toISOString(),
    category: 'Tips & Tricks',
    readTime: '5 min read',
    slug: 'email-marketing-tips-boost-open-rates',
  },
  {
    _id: '2',
    title: 'How to Create Effective Email Campaigns for E-commerce',
    excerpt: 'Discover the best practices for creating email campaigns that drive sales and customer loyalty.',
    author: 'Fatima Khan',
    createdAt: new Date('2026-04-03').toISOString(),
    category: 'E-commerce',
    readTime: '7 min read',
    slug: 'email-campaigns-ecommerce-guide',
  },
  {
    _id: '3',
    title: 'Email Automation: Save Time and Grow Your Business',
    excerpt: 'Master email automation workflows to nurture leads and convert them into loyal customers.',
    author: 'Tanvir Hasan',
    createdAt: new Date('2026-04-01').toISOString(),
    category: 'Automation',
    readTime: '6 min read',
    slug: 'email-automation-grow-business',
  },
  {
    _id: '4',
    title: 'Segmentation Strategies for Targeted Email Marketing',
    excerpt: 'Learn how to segment your audience for more personalized and effective email campaigns.',
    author: 'Ayesha Rahman',
    createdAt: new Date('2026-03-30').toISOString(),
    category: 'Strategy',
    readTime: '5 min read',
    slug: 'email-segmentation-strategies',
  },
  {
    _id: '5',
    title: 'A/B Testing Email Subject Lines: Data-Driven Approach',
    excerpt: 'Optimize your email subject lines with A/B testing to maximize your open rates.',
    author: 'Rahim Ahmed',
    createdAt: new Date('2026-03-28').toISOString(),
    category: 'Analytics',
    readTime: '4 min read',
    slug: 'ab-testing-email-subject-lines',
  },
  {
    _id: '6',
    title: 'Email Deliverability: Best Practices for High Inbox Placement',
    excerpt: 'Ensure your emails reach the inbox with our comprehensive deliverability guide.',
    author: 'Nadia Islam',
    createdAt: new Date('2026-03-25').toISOString(),
    category: 'Deliverability',
    readTime: '8 min read',
    slug: 'email-deliverability-best-practices',
  },
];

// Consistent avatar color per author initial
const AVATAR_COLORS: Record<string, string> = {
  A: 'from-violet-500 to-purple-600',
  B: 'from-blue-500 to-cyan-600',
  C: 'from-emerald-500 to-teal-600',
  D: 'from-orange-500 to-amber-600',
  E: 'from-rose-500 to-pink-600',
  F: 'from-fuchsia-500 to-pink-600',
  N: 'from-indigo-500 to-blue-600',
  R: 'from-emerald-500 to-green-600',
  T: 'from-sky-500 to-blue-600',
};

function avatarGradient(name: string) {
  const initial = name.charAt(0).toUpperCase();
  return AVATAR_COLORS[initial] ?? 'from-brand-500 to-brand-600';
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Skeleton card shown while loading
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 p-8 animate-pulse">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-5 w-20 bg-slate-200 rounded-full" />
        <div className="h-4 w-16 bg-slate-100 rounded-full" />
      </div>
      <div className="h-6 bg-slate-200 rounded-lg mb-2" />
      <div className="h-5 bg-slate-100 rounded-lg mb-1 w-4/5" />
      <div className="h-4 bg-slate-100 rounded-lg mt-4 w-3/5" />
      <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-200 rounded-full" />
          <div>
            <div className="h-3 w-20 bg-slate-200 rounded mb-1" />
            <div className="h-3 w-24 bg-slate-100 rounded" />
          </div>
        </div>
        <div className="w-5 h-5 bg-slate-200 rounded" />
      </div>
    </div>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/blogs?page=1&limit=6');
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      const fetched: BlogPost[] = data.blogs || data || [];
      // Use fallback if API returns nothing
      setPosts(fetched.length > 0 ? fetched.slice(0, 6) : FALLBACK_POSTS);
    } catch {
      setError(true);
      setPosts(FALLBACK_POSTS);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="blog" className="py-20 lg:py-32 bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ─────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-4"
          >
            📝 Blog
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900"
          >
            Email Marketing
            <span className="gradient-text"> Insights</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-600"
          >
            Stay updated with the latest tips, strategies, and best practices in email marketing.
          </motion.p>

          {/* Retry button shown only on real API error */}
          {error && !loading && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={fetchPosts}
              className="mt-4 inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Showing cached posts — retry live data
            </motion.button>
          )}
        </div>

        {/* ── Blog Grid ───────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : posts.map((post, index) => (
                <BlogCard key={post._id} post={post} index={index} />
              ))}
        </div>

        {/* ── View All CTA ────────────────────────────────────── */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-14 flex flex-col items-center gap-4"
          >
            {/* Divider with label */}
            <div className="flex items-center gap-4 w-full max-w-sm">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                Want to read more?
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* More button */}
            <a
              href="/blog"
              className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-base overflow-hidden shadow-lg shadow-brand-500/20 hover:shadow-xl hover:shadow-brand-500/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, var(--brand-600, #2563eb), var(--brand-500, #3b82f6))' }}
            >
              {/* Animated shine */}
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              <span className="relative text-white">More Articles</span>

              {/* Animated arrow */}
              <span className="relative flex items-center justify-center w-8 h-8 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>

            <p className="text-sm text-slate-400">
              Browse all articles, filter by category, and search topics
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ── Individual Blog Card ──────────────────────────────────────────────────────

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300"
    >
      <div className="p-8">

        {/* Category + read time */}
        <div className="mb-3 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            {post.category}
          </span>
          {post.readTime && (
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          )}
          {typeof post.views === 'number' && (
            <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto">
              <Eye className="w-3 h-3" />
              {post.views.toLocaleString()}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
          <a href={`/blog/${post.slug}`}>{post.title}</a>
        </h3>

        {/* Excerpt */}
        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags (shown if available, max 2) */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Meta footer */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2">
            {/* Avatar */}
            <div
              className={`w-8 h-8 bg-gradient-to-br ${avatarGradient(post.author)} rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}
            >
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700 leading-tight">{post.author}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3 h-3" />
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>

          <a
            href={`/blog/${post.slug}`}
            aria-label={`Read ${post.title}`}
            className="text-brand-600 hover:text-brand-700 group-hover:translate-x-1 transition-transform"
          >
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

      </div>
    </motion.article>
  );
}
