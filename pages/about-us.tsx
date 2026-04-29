import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import PageNavbar from '../src/components/PageNavbar';
import {
  ArrowLeft, Zap, Target, Eye, BarChart3, Users, Mail,
  Shield, TrendingUp, Globe, CheckCircle, Star, Building2,
  Layers, Cpu, HeartHandshake, ArrowRight
} from 'lucide-react';

const capabilities = [
  { icon: Mail, text: 'Campaign creation and management through an intuitive interface' },
  { icon: Layers, text: 'Ready-to-use and customizable email templates' },
  { icon: Cpu, text: 'Drag-and-drop email builder for non-technical users' },
  { icon: Users, text: 'Audience list management and segmentation tools' },
  { icon: BarChart3, text: 'Real-time analytics including open rate, click rate, and bounce rate' },
  { icon: TrendingUp, text: 'Heatmap-based engagement tracking for campaign optimization' },
  { icon: Star, text: 'Structured reporting for performance evaluation and decision-making' },
];

const positioning = [
  'Positioned as a performance-driven email marketing infrastructure',
  'Supports both SMEs and enterprise-level organizations',
  'Enables transition from basic email broadcasting to data-driven marketing',
  'Offers subscription-based and pay-as-you-go models for flexibility',
  'Designed for adoption in emerging and growth-focused digital markets',
];

const valueProps = [
  { icon: Zap, title: 'Simple Yet Powerful', desc: 'Combines simplicity with enterprise-grade functionality for all skill levels.' },
  { icon: Users, title: 'No Technical Expertise', desc: 'Enables businesses to run campaigns without any technical background.' },
  { icon: TrendingUp, title: 'Low to High Volume', desc: 'Supports both low-volume and high-volume email operations seamlessly.' },
  { icon: BarChart3, title: 'Data-Driven Insights', desc: 'Provides actionable insights for smarter marketing decisions.' },
  { icon: Shield, title: 'Secure & Reliable', desc: 'Reduces cost and complexity of traditional marketing systems safely.' },
  { icon: Globe, title: 'Scalable Growth', desc: 'Designed for scalable business growth through communication efficiency.' },
];

const marketPoints = [
  { icon: TrendingUp, text: 'Email remains one of the highest ROI digital marketing channels globally' },
  { icon: Building2, text: 'SMEs increasingly require cost-effective, measurable marketing tools' },
  { icon: Globe, text: 'Strong demand for simple yet powerful communication platforms in emerging markets' },
  { icon: Users, text: 'Growing shift toward direct-to-customer digital engagement models' },
  { icon: Zap, text: 'Increasing need for platforms that reduce dependency on complex marketing systems' },
];

const stats = [
  { number: '2,500+', label: 'Happy Businesses', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
  { number: '10M+', label: 'Emails Sent', icon: Mail, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { number: '42%', label: 'Avg Open Rate', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  { number: '99.9%', label: 'Uptime', icon: Shield, color: 'text-orange-500', bg: 'bg-orange-50' },
];

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About Us — Prochar.xyz</title>
        <meta name="description" content="Learn about Prochar.xyz — Bangladesh's most powerful email marketing platform, a sister concern of Daffodil Group." />
      </Head>

      <div className="min-h-screen bg-white text-slate-900 antialiased">

        {/* ─── PAGENAVBAR ─── */}
        <PageNavbar />

        {/* ─── HERO HEADER ─── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 pt-32 pb-16">
          {/* Background blobs */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

              {/* Back Button */}
              <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-6">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-emerald-700">Sister concern of Daffodil Group</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
                About{' '}
                <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  Prochar.xyz
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mb-10">
                A digital email marketing platform designed to enable businesses to execute structured, scalable, and data-driven email communication. Simplifying professional campaign management by combining usability with performance-focused tools.
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-4">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm"
                    >
                      <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div>
                        <div className={`text-xl font-black ${stat.color}`}>{stat.number}</div>
                        <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ─── BACKGROUND SECTION ─── */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left text */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                  <Building2 className="w-4 h-4" /> Our Background
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">
                  Backed by <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Daffodil Group</span>
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Prochar.xyz operates as a sister-concern of <strong>Daffodil Group</strong>, a diversified organization with a strong presence in education, entrepreneurship development, and technology-driven initiatives in Bangladesh.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  This association reflects a broader commitment to digital transformation and innovation-led growth. The platform benefits from an ecosystem that emphasizes skill development, technological advancement, and entrepreneurial enablement.
                </p>

                <a href="https://daffodil.group" target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-xl text-sm font-semibold hover:scale-105 transition-transform">
                  Visit Daffodil Group <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>

              {/* Right — decorative card */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="relative">
                <div className="bg-gradient-to-br from-blue-600 to-emerald-600 rounded-3xl p-8 text-white">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-3">Prochar.xyz</h3>
                  <p className="text-white/80 leading-relaxed text-sm mb-6">
                    In today's competitive digital landscape, customer communication has become a key driver of growth. Prochar.xyz addresses this need with an integrated system for campaign creation, audience management, automation, and performance analytics.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Email Marketing', 'Automation', 'Analytics', 'Bangladesh'].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg p-4 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">GDPR Compliant</div>
                      <div className="text-xs text-slate-500">Secure & Trusted</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── VISION ─── */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-slate-50 to-blue-50/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                <Eye className="w-4 h-4" /> Our Vision
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                Leading Digital Communication <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  & Engagement Platform
                </span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Prochar.xyz envisions becoming a leading digital communication and engagement platform that empowers businesses to build <strong>meaningful, measurable, and long-term relationships</strong> with their customers. Our long-term direction is to evolve into a comprehensive ecosystem integrating advanced automation, personalization, and intelligence-driven marketing solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── CORE CAPABILITIES ─── */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                <Cpu className="w-4 h-4" /> Core Capabilities
              </div>
              <h2 className="text-3xl font-black text-slate-900">
                Everything You Need to <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Grow</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {capabilities.map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
                  >
                    <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed pt-1">{cap.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── STRATEGIC POSITIONING ─── */}
        <section className="py-12 lg:py-16 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                <Target className="w-4 h-4" /> Strategic Positioning
              </div>
              <h2 className="text-3xl font-black">Where We Stand in the Market</h2>
            </motion.div>

            <div className="grid md:grid-cols-1 gap-3 max-w-3xl mx-auto">
              {positioning.map((point, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
                >
                  <div className="w-6 h-6 gradient-bg rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <p className="text-white/85 text-sm leading-relaxed">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── VALUE PROPOSITION ─── */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-slate-50 to-emerald-50/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                <Star className="w-4 h-4" /> Value Proposition
              </div>
              <h2 className="text-3xl font-black text-slate-900">
                Why Choose <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Prochar.xyz?</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {valueProps.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md hover:border-blue-200 transition-all"
                  >
                    <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{v.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── MARKET CONTEXT ─── */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                  <Globe className="w-4 h-4" /> Market Context
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">
                  The Opportunity We're <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Addressing</span>
                </h2>
                <div className="space-y-3">
                  {marketPoints.map((point, i) => {
                    const Icon = point.icon;
                    return (
                      <motion.div key={i}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{point.text}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Right stats card */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '$36', label: 'Return for every $1 spent on email', color: 'from-blue-600 to-blue-700' },
                    { value: '4B+', label: 'Email users worldwide in 2025', color: 'from-emerald-600 to-emerald-700' },
                    { value: '87%', label: 'Marketers use email as primary channel', color: 'from-purple-600 to-purple-700' },
                    { value: '50K+', label: 'Emails sent daily on Prochar', color: 'from-orange-500 to-orange-600' },
                  ].map((stat, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`bg-gradient-to-br ${stat.color} rounded-2xl p-5 text-white`}
                    >
                      <div className="text-3xl font-black mb-1">{stat.value}</div>
                      <div className="text-white/80 text-xs leading-snug">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── COMMITMENT ─── */}
        <section className="py-12 lg:py-16 bg-gradient-to-r from-blue-600 to-emerald-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <HeartHandshake className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-6">Our Commitment</h2>
              <p className="text-white/90 text-lg leading-relaxed max-w-2xl mx-auto mb-4">
                We are committed to building a <strong>reliable, secure, and continuously evolving platform</strong> that delivers consistent value to businesses. Our focus remains on maintaining system integrity, ensuring data protection, and enhancing user experience through continuous innovation.
              </p>
              <p className="text-white/80 text-base leading-relaxed max-w-2xl mx-auto">
                At Prochar.xyz, our mission is to <strong>simplify professional communication</strong> and enable businesses to grow through smarter, more effective email marketing.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── CONTACT ─── */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-slate-50 rounded-3xl border border-slate-100 p-8 text-center">
              <h3 className="text-2xl font-black text-slate-900 mb-2">Get in Touch</h3>
              <p className="text-slate-500 mb-6">Have questions? We'd love to hear from you.</p>
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <a href="mailto:hello@prochar.xyz"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                  <Mail className="w-4 h-4" /> rar@daffodil.group
                </a>
                <a href="https://prochar.xyz" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium">
                  <Globe className="w-4 h-4" /> prochar.xyz
                </a>
              </div>
              <Link href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform">
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}
