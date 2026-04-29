import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: '10 Email Marketing Tips to Boost Your Open Rates',
    excerpt: 'Learn proven strategies to increase your email open rates and engagement with your audience.',
    author: 'Rahim Ahmed',
    date: 'April 5, 2026',
    category: 'Tips & Tricks',
    readTime: '5 min read',
    slug: 'email-marketing-tips-boost-open-rates',
  },
  {
    id: 2,
    title: 'How to Create Effective Email Campaigns for E-commerce',
    excerpt: 'Discover the best practices for creating email campaigns that drive sales and customer loyalty.',
    author: 'Fatima Khan',
    date: 'April 3, 2026',
    category: 'E-commerce',
    readTime: '7 min read',
    slug: 'email-campaigns-ecommerce-guide',
  },
  {
    id: 3,
    title: 'Email Automation: Save Time and Grow Your Business',
    excerpt: 'Master email automation workflows to nurture leads and convert them into loyal customers.',
    author: 'Tanvir Hasan',
    date: 'April 1, 2026',
    category: 'Automation',
    readTime: '6 min read',
    slug: 'email-automation-grow-business',
  },
  {
    id: 4,
    title: 'Segmentation Strategies for Targeted Email Marketing',
    excerpt: 'Learn how to segment your audience for more personalized and effective email campaigns.',
    author: 'Ayesha Rahman',
    date: 'March 30, 2026',
    category: 'Strategy',
    readTime: '5 min read',
    slug: 'email-segmentation-strategies',
  },
  {
    id: 5,
    title: 'A/B Testing Email Subject Lines: Data-Driven Approach',
    excerpt: 'Optimize your email subject lines with A/B testing to maximize your open rates.',
    author: 'Rahim Ahmed',
    date: 'March 28, 2026',
    category: 'Analytics',
    readTime: '4 min read',
    slug: 'ab-testing-email-subject-lines',
  },
  {
    id: 6,
    title: 'Email Deliverability: Best Practices for High Inbox Placement',
    excerpt: 'Ensure your emails reach the inbox with our comprehensive deliverability guide.',
    author: 'Nadia Islam',
    date: 'March 25, 2026',
    category: 'Deliverability',
    readTime: '8 min read',
    slug: 'email-deliverability-best-practices',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-20 lg:py-32 bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300"
            >
              {/* Card Content */}
              <div className="p-8">
                {/* Category */}
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-500">{post.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors line-clamp-2">
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h3>

                {/* Excerpt */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-700">{post.author}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </p>
                    </div>
                  </div>
                  <a
                    href={`/blog/${post.slug}`}
                    className="text-brand-600 hover:text-brand-700 group-hover:translate-x-1 transition-transform"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            View All Articles <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
