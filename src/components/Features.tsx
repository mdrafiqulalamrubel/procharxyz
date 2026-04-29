import { motion } from 'framer-motion';
import { Mail, Palette, Layout, Users2, BarChart3, Zap } from 'lucide-react';

const features = [
  {
    icon: Mail,
    title: 'Email Campaign Sending',
    description: 'Send thousands of emails in minutes with our reliable, high-deliverability infrastructure. Reach every inbox.',
    color: 'text-brand-600',
    bg: 'bg-brand-50',
  },
  {
    icon: Palette,
    title: 'Ready-to-use Templates',
    description: 'Choose from 50+ beautifully designed, mobile-responsive templates. Perfect for promotions, newsletters & more.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Layout,
    title: 'Drag & Drop Builder',
    description: 'Create stunning custom emails without any coding. Our visual builder makes it easy and fun.',
    color: 'text-growth-600',
    bg: 'bg-growth-50',
  },
  {
    icon: Users2,
    title: 'Email List Management',
    description: 'Organize subscribers with tags, segments, and smart lists. Keep your audience organized and engaged.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Track open rates, click rates, bounce rates, and more with our beautiful heatmap reports.',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
  },
  {
    icon: Zap,
    title: 'Automation & Workflows',
    description: 'Set up welcome sequences, drip campaigns, and behavioral triggers. Let email marketing run on autopilot.',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-slate-100/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-4"
          >
            ✨ Features
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900"
          >
            Everything you need to{' '}
            <span className="gradient-text">grow your business</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-600"
          >
            Powerful tools designed for small businesses and enterprises. No spam, secure sending, full control.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white border border-slate-100 rounded-2xl p-8 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300"
            >
              <div className={`${feature.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500"
        >
          {[
            '🔒 256-bit SSL Encryption',
            '🛡️ No spam guarantee',
            '⚡ 99.9% uptime',
            '📞 24/7 Support',
            '🇧🇩 Local data centers',
          ].map((badge) => (
            <span key={badge} className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
