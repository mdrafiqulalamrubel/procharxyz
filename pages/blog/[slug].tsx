import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '../../src/components/Navbar';
import Footer from '../../src/components/Footer';
import SeoHead from '../../src/components/SeoHead';
import SignupModal from '../../src/components/SignupModal';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Eye } from 'lucide-react';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any;
  category: string;
  tags: string[];
  author: string;
  views: number;
  createdAt: string;
  coverImage?: string;
  featuredImage?: string;
  image?: string;
  seoTitle?: string;
  seoDescription?: string;
}

// Extracts first image src from HTML string or Tiptap JSON
function extractFirstImage(content: any): string | null {
  if (!content) return null;
  if (typeof content === 'string') {
    const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
    return match ? match[1] : null;
  }
  if (typeof content === 'object') {
    const nodes = content.content || (Array.isArray(content) ? content : []);
    const find = (list: any[]): string | null => {
      for (const n of list) {
        if (n.type === 'image' && n.attrs?.src) return n.attrs.src;
        if (n.content) { const f = find(n.content); if (f) return f; }
      }
      return null;
    };
    return find(nodes);
  }
  return null;
}

// Converts Tiptap JSON nodes to HTML string
function renderTiptapJson(nodes: any[]): string {
  return nodes.map((node: any) => {
    const inner = node.content ? renderTiptapJson(node.content) : (node.text || '');
    let text = inner;
    for (const mark of node.marks || []) {
      if (mark.type === 'bold')      text = `<strong>${text}</strong>`;
      if (mark.type === 'italic')    text = `<em>${text}</em>`;
      if (mark.type === 'underline') text = `<u>${text}</u>`;
      if (mark.type === 'strike')    text = `<s>${text}</s>`;
      if (mark.type === 'code')      text = `<code>${text}</code>`;
      if (mark.type === 'link')      text = `<a href="${mark.attrs?.href}" target="_blank" rel="noopener">${text}</a>`;
    }
    const align = node.attrs?.textAlign ? ` style="text-align:${node.attrs.textAlign}"` : '';
    switch (node.type) {
      case 'paragraph':      return `<p${align}>${text || '&nbsp;'}</p>`;
      case 'heading':        return `<h${node.attrs?.level||2}${align}>${text}</h${node.attrs?.level||2}>`;
      case 'bulletList':     return `<ul>${text}</ul>`;
      case 'orderedList':    return `<ol>${text}</ol>`;
      case 'listItem':       return `<li>${text}</li>`;
      case 'blockquote':     return `<blockquote>${text}</blockquote>`;
      case 'codeBlock':      return `<pre><code>${inner}</code></pre>`;
      case 'horizontalRule': return `<hr/>`;
      case 'hardBreak':      return `<br/>`;
      case 'image':          return `<img src="${node.attrs?.src}" alt="${node.attrs?.alt||''}" />`;
      case 'table':          return `<table>${text}</table>`;
      case 'tableRow':       return `<tr>${text}</tr>`;
      case 'tableHeader':    return `<th>${text}</th>`;
      case 'tableCell':      return `<td>${text}</td>`;
      case 'youtube':        return `<div class="yt-wrap"><iframe src="https://www.youtube.com/embed/${node.attrs?.src}" frameborder="0" allowfullscreen></iframe></div>`;
      case 'text':           return text;
      default:               return text;
    }
  }).join('');
}

// Converts any content format to HTML string
function getContentHtml(content: any): string {
  if (!content) return '';
  if (typeof content === 'string') {
    const t = content.trim();
    if (t.startsWith('<') || t.includes('</')) return t;
    return t.split('\n').filter(Boolean).map((l: string) => `<p>${l}</p>`).join('');
  }
  if (typeof content === 'object' && content.type === 'doc' && Array.isArray(content.content)) {
    return renderTiptapJson(content.content);
  }
  if (Array.isArray(content)) return renderTiptapJson(content);
  return String(content);
}

export default function BlogPostPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('free');

  const handleSignup = (plan: string = 'free') => {
    setSelectedPlan(plan);
    setShowSignupModal(true);
  };

  useEffect(() => { if (slug) fetchBlog(); }, [slug]);
  useEffect(() => { if (blog) fetchRelatedBlogs(); }, [blog]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/blogs/${slug}`);
      const data = await res.json();
      setBlog(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async () => {
    try {
      const res = await fetch(`/api/blogs?category=${blog?.category}&limit=3`);
      const data = await res.json();
      setRelatedBlogs(
        data.blogs?.filter((b: BlogPost) => b.slug !== blog?.slug).slice(0, 3) || []
      );
    } catch (err) {
      console.error(err);
    }
  };

  const sharePost = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied!');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!blog) return (
    <div className="min-h-screen flex items-center justify-center">
      <Link href="/blog">Back to Blog</Link>
    </div>
  );

  // Resolve hero: explicit field first, then first image found inside content
  const heroImage =
    blog.coverImage ||
    blog.featuredImage ||
    blog.image ||
    extractFirstImage(blog.content) ||
    null;

  const contentHtml = getContentHtml(blog.content);

  return (
    <>
      <SeoHead
        title={blog.seoTitle || blog.title}
        description={blog.seoDescription || blog.excerpt}
        url={`https://prochar.xyz/blog/${blog.slug}`}
        canonicalUrl={`https://prochar.xyz/blog/${blog.slug}`}
      />

      <div className="min-h-screen bg-gray-50">
        <Navbar onSignup={() => handleSignup('free')} />

        {/* BACK */}
        <div className="max-w-4xl mx-auto px-4 pt-24 pb-2">
          <Link href="/blog" className="flex items-center gap-2 text-blue-600 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>

        {/* ARTICLE */}
        <article className="max-w-4xl mx-auto px-4 py-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

            {/* ── HERO THUMBNAIL ── */}
            {heroImage && (
              <div className="w-full rounded-2xl overflow-hidden mb-8 shadow-md" style={{ maxHeight: 480 }}>
                <img
                  src={heroImage}
                  alt={blog.title}
                  style={{ width: '100%', height: '100%', maxHeight: 480, objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}

            {/* CATEGORY */}
            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mb-4">
              {blog.category}
            </span>

            {/* TITLE */}
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {blog.title}
            </h1>

            {/* META */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1"><User className="w-4 h-4" /> {blog.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(blog.createdAt).toLocaleDateString()}</span>
              <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {blog.views}</span>
              <button onClick={sharePost} className="ml-auto flex items-center gap-1 text-blue-600">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>

            {/* EXCERPT */}
            {blog.excerpt && (
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">{blog.excerpt}</p>
            )}

          </motion.div>

          {/* ── CONTENT ── */}
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </div>

          {/* TAGS */}
          {blog.tags?.length > 0 && (
            <div className="mt-10">
              <h3 className="font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-200 rounded-full text-sm">#{tag}</span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* RELATED */}
        {relatedBlogs.length > 0 && (
          <div className="max-w-6xl mx-auto px-4 pb-16">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedBlogs.map(r => {
                const rThumb = (r as any).coverImage || extractFirstImage((r as any).content) || null;
                return (
                  <Link key={r._id} href={`/blog/${r.slug}`}>
                    <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden">
                      {rThumb && (
                        <img src={rThumb} alt={r.title} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold mb-1 line-clamp-2">{r.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{r.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Email Marketing Today 🚀</h2>
          <button
            onClick={() => setShowSignupModal(true)}
            className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold"
          >
            Get Started Free
          </button>
        </div>

        <Footer />
      </div>

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        selectedPlan={selectedPlan}
      />

      <style>{`
       // TO THIS:
        .blog-content { font-family: 'Times New Roman', Times, serif; font-size: 1.05rem; line-height: 1.85; color: #1e293b; padding: 2.5rem 3rem; }
        .blog-content h1 { font-size: 2rem;    font-weight: 800; margin: 2rem 0 1rem;     line-height: 1.2; color: #0f172a; }
        .blog-content h2 { font-size: 1.55rem; font-weight: 700; margin: 1.75rem 0 .75rem; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: .4rem; }
        .blog-content h3 { font-size: 1.25rem; font-weight: 700; margin: 1.5rem 0 .6rem;   color: #0f172a; }
        .blog-content h4 { font-size: 1.1rem;  font-weight: 600; margin: 1.25rem 0 .5rem;  color: #0f172a; }
        .blog-content p  { margin: .9rem 0; }
        .blog-content a  { color: #2563eb; text-decoration: underline; text-underline-offset: 3px; }
        .blog-content a:hover { color: #1d4ed8; }
        .blog-content strong { font-weight: 700; color: #0f172a; }
        .blog-content em  { font-style: italic; }
        .blog-content ul  { list-style: disc;    padding-left: 1.75rem; margin: 1rem 0; }
        .blog-content ol  { list-style: decimal; padding-left: 1.75rem; margin: 1rem 0; }
        .blog-content li  { margin: .35rem 0; }
        .blog-content blockquote {
          border-left: 4px solid #3b82f6; background: #eff6ff;
          padding: 1rem 1.5rem; border-radius: 0 12px 12px 0;
          margin: 1.5rem 0; font-style: italic; color: #475569;
        }
        .blog-content code {
          background: #f1f5f9; color: #0f172a;
          padding: .15rem .4rem; border-radius: 5px;
          font-size: .875em; font-family: 'Courier New', monospace;
        }
        .blog-content pre {
          background: #0f172a; color: #e2e8f0; padding: 1.25rem 1.5rem;
          border-radius: 12px; overflow-x: auto; margin: 1.5rem 0;
          font-family: 'Courier New', monospace; font-size: .875rem; line-height: 1.7;
        }
        .blog-content pre code { background: none; color: inherit; padding: 0; }
        .blog-content img {
          max-width: 100%; height: auto; border-radius: 12px;
          margin: 1.75rem auto; display: block;
          box-shadow: 0 4px 24px rgba(0,0,0,.10);
        }
        .blog-content hr { border: none; border-top: 2px solid #e2e8f0; margin: 2.5rem 0; }
        .blog-content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: .95rem; }
        .blog-content th, .blog-content td { border: 1px solid #e2e8f0; padding: .6rem 1rem; text-align: left; }
        .blog-content th { background: #f8fafc; font-weight: 600; color: #0f172a; }
        .blog-content tr:nth-child(even) td { background: #f8fafc; }
        .blog-content .yt-wrap { margin: 1.5rem 0; }
        .blog-content .yt-wrap iframe { width: 100%; min-height: 340px; border-radius: 12px; }
        @media (max-width: 640px) {
          .blog-content { padding: 1.5rem 1.25rem; font-size: 1rem; }
          .blog-content h1 { font-size: 1.6rem; }
          .blog-content h2 { font-size: 1.3rem; }
        }
      `}</style>
    </>
  );
}
