import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '../../src/components/Navbar';
import Footer from '../../src/components/Footer';
import SeoHead from '../../src/components/SeoHead';
import SignupModal from '../../src/components/SignupModal';
import BlockNoteContent from '@/components/BlockNoteContent';
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
  seoTitle?: string;
  seoDescription?: string;
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

  useEffect(() => {
    if (slug) fetchBlog();
  }, [slug]);

  useEffect(() => {
    if (blog) fetchRelatedBlogs();
  }, [blog]);

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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Link href="/blog">Back to Blog</Link>
      </div>
    );
  }

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
        <div className="max-w-4xl mx-auto px-4 pt-24">
          <Link href="/blog" className="flex items-center gap-2 text-blue-600">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>

        {/* ARTICLE */}
        <article className="max-w-4xl mx-auto px-4 py-10">

          {/* HEADER */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mb-4">
              {blog.category}
            </span>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {blog.title}
            </h1>

            {/* META */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" /> {blog.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" /> {blog.views}
              </span>

              <button
                onClick={sharePost}
                className="ml-auto flex items-center gap-1 text-blue-600"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>

            <p className="text-lg text-gray-600 mb-8">
              {blog.excerpt}
            </p>

          </motion.div>

          {/* CONTENT */}
          <div className="prose max-w-none bg-white p-6 rounded-xl shadow">
            <BlockNoteContent content={blog.content} />
          </div>

          {/* TAGS */}
          {blog.tags?.length > 0 && (
            <div className="mt-10">
              <h3 className="font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
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
              {relatedBlogs.map(r => (
                <Link key={r._id} href={`/blog/${r.slug}`}>
                  <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg">
                    <h3 className="font-semibold">{r.title}</h3>
                    <p className="text-sm text-gray-500">{r.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Email Marketing Today 🚀
          </h2>
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
    </>
  );
}