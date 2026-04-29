import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import PageNavbar from '../src/components/PageNavbar';
import {
  ArrowLeft, Shield, Cookie, Settings, BarChart3,
  Megaphone, Globe, RefreshCw, Mail, Phone,
  HelpCircle, CheckCircle, Layers, Zap,
} from 'lucide-react';

// ── Cookie type cards (How Do We Use Cookies) ────────────────────────────────
const cookieTypes = [
  {
    icon: Zap,
    title: 'Session Cookies',
    description:
      'Temporary cookies that expire once you close your browser. Used for authentication and to keep you logged in to your account.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    icon: Settings,
    title: 'Persistent Cookies',
    description:
      'Remain on your device until their expiration date or until you delete them. Used to remember your preferences and improve your experience.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    icon: BarChart3,
    title: 'Analytics Cookies',
    description:
      'Help us understand how users interact with our website by collecting and reporting information anonymously.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
  },
  {
    icon: Layers,
    title: 'Functional Cookies',
    description:
      'Enable certain functionality like remembering your settings, preferences and login details.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
];

// ── Detailed category sections ────────────────────────────────────────────────
const categories = [
  {
    number: '01',
    icon: Shield,
    title: 'Essential Cookies',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    description:
      'These cookies are required for the proper functioning of the website and cannot be switched off. They are usually set in response to actions made by you, such as setting your privacy preferences or filling in forms.',
  },
  {
    number: '02',
    icon: BarChart3,
    title: 'Performance Cookies',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    description:
      'These cookies collect information about how you use our website. They help us understand which pages are most popular and how visitors navigate the website.',
  },
  {
    number: '03',
    icon: Settings,
    title: 'Functional Cookies',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    description:
      'These cookies enable the website to provide enhanced functionality and personalization. They help to gather information about your browsing habits and save your preferences for future visits.',
  },
  {
    number: '04',
    icon: Megaphone,
    title: 'Marketing Cookies',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    description:
      'These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and therefore more valuable for publishers and third-party advertisers.',
  },
];

export default function CookiePolicy() {
  return (
    <>
      <Head>
        <title>Cookie Policy — Prochar.xyz</title>
        <meta
          name="description"
          content="Read the Cookie Policy for Prochar.xyz — learn how we use cookies and how you can control them."
        />
      </Head>

      <div className="min-h-screen bg-white text-slate-900 antialiased">

        <PageNavbar />

        {/* ─── HERO HEADER ─── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 pt-32 pb-16">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

              <Link
                href="/"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-6">
                <Cookie className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">Last updated: April 2026</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
                Cookie{' '}
                <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  Policy
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl">
                This Cookie Policy explains what cookies are and how we use them on Prochar.xyz.
                For further information on how we handle your personal data, see our{' '}
                <Link href="/privacy-policy" className="text-blue-600 hover:underline font-medium">
                  Privacy Policy
                </Link>.
              </p>

              {/* Quick nav pills */}
              <div className="flex flex-wrap gap-2 mt-8">
                {['What are Cookies', 'How We Use', 'Cookie Types', 'Your Control', 'Third-Party', 'Contact'].map((label, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 shadow-sm"
                  >
                    {label}
                  </span>
                ))}
              </div>

            </motion.div>
          </div>
        </div>

        {/* ─── WHAT ARE COOKIES ─── */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 items-center">

              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                  <HelpCircle className="w-4 h-4" /> What are Cookies?
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">
                  Small files,{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                    big purpose
                  </span>
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Cookies are small files placed on your computer, mobile device or any other device by a website,
                  containing the details of your browsing history on that website among its many uses.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Cookies are created when your browser loads a particular website. The website sends information
                  to the browser which then creates a text file. Every time the user goes back to the same website,
                  the browser retrieves and sends this file to the website's server.
                </p>
              </motion.div>

              {/* Visual stat cards */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { value: '4', label: 'Types of cookies we use', color: 'from-blue-600 to-blue-700' },
                  { value: '100%', label: 'GDPR compliant practices', color: 'from-emerald-600 to-emerald-700' },
                  { value: 'Your', label: 'data stays protected', color: 'from-purple-600 to-purple-700' },
                  { value: 'Full', label: 'control over your preferences', color: 'from-amber-500 to-amber-600' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
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
              </motion.div>

            </div>
          </div>
        </section>

        {/* ─── HOW DO WE USE COOKIES ─── */}
        <section className="py-12 bg-slate-50/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                <Cookie className="w-4 h-4" /> How Do We Use Cookies?
              </div>
              <h2 className="text-3xl font-black text-slate-900">
                Cookies we{' '}
                <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  employ
                </span>
              </h2>
              <p className="mt-3 text-slate-600 max-w-2xl">
                As with most online services, our website uses cookies to store and track information about you
                in order to enhance your browsing experience.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {cookieTypes.map((type, i) => {
                const Icon = type.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className={`bg-white rounded-2xl border-2 ${type.border} p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
                  >
                    <div className={`w-11 h-11 ${type.bg} rounded-xl flex items-center justify-center mb-3 shadow-sm`}>
                      <Icon className={`w-5 h-5 ${type.color}`} />
                    </div>
                    <h3 className={`text-sm font-bold mb-2 ${type.color}`}>{type.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{type.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── TYPES WE USE (detailed) ─── */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                <Layers className="w-4 h-4" /> Types of Cookies We Use
              </div>
              <h2 className="text-3xl font-black text-slate-900">
                Cookie{' '}
                <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  categories
                </span>
              </h2>
              <p className="mt-3 text-slate-600 max-w-2xl">
                The cookies we use on Prochar.xyz can be subcategorized into the following categories:
              </p>
            </motion.div>

            <div className="space-y-5">
              {categories.map((cat, index) => {
                const Icon = cat.icon;
                return (
                  <motion.div
                    key={cat.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className={`bg-white rounded-2xl border-2 ${cat.border} p-6 shadow-sm hover:shadow-md transition-all duration-300`}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`w-12 h-12 ${cat.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                        <Icon className={`w-6 h-6 ${cat.color}`} />
                      </div>
                      <div className="flex-1">
                        <span className={`text-xs font-bold tracking-widest uppercase ${cat.color}`}>
                          Category {cat.number}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 leading-snug">{cat.title}</h3>
                      </div>
                      {/* Ghost number */}
                      <div className={`text-6xl font-black opacity-[0.05] select-none leading-none ${cat.color}`}>
                        {cat.number}
                      </div>
                    </div>
                    <div className="pl-16">
                      <p className="text-slate-600 text-sm leading-relaxed">{cat.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── HOW TO CONTROL + THIRD PARTY ─── */}
        <section className="py-12 bg-slate-50/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-6">

              {/* How to Control */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border-2 border-blue-100 p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shadow-sm">
                    <Settings className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold tracking-widest uppercase text-blue-600">Your Rights</span>
                    <h3 className="text-lg font-bold text-slate-900">How to Control Cookies</h3>
                  </div>
                </div>
                <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                  <p>
                    You have the right to decide whether to accept or reject cookies. You can exercise your cookie
                    rights by setting your preferences in the Cookie Consent Manager.
                  </p>
                  <p>
                    Most web browsers accept cookies by default. However, you can usually choose to set your browser
                    to refuse cookies or to alert you when cookies are being sent.
                  </p>
                  <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3 mt-3">
                    <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-amber-700 text-xs">
                      If you choose to refuse our cookies, you may not be able to use some portions of our website.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Third-Party + Updates stacked */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl border-2 border-emerald-100 p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center shadow-sm">
                      <Globe className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <span className="text-xs font-bold tracking-widest uppercase text-emerald-600">External</span>
                      <h3 className="text-lg font-bold text-slate-900">Third-Party Cookies</h3>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Third parties may also place cookies on your browser in connection with our website. They can use
                    cookies to analyze and track your use of the website and to show you relevant advertisements about
                    Prochar on other websites, including social media platforms.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl border-2 border-purple-100 p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center shadow-sm">
                      <RefreshCw className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <span className="text-xs font-bold tracking-widest uppercase text-purple-600">Changes</span>
                      <h3 className="text-lg font-bold text-slate-900">Updates to This Policy</h3>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    We may update this Cookie Policy from time to time to reflect changes in our practices, technology
                    and other factors. We will notify you of material changes by updating the "Last updated" date of
                    this policy.
                  </p>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── COMMITMENT BANNER ─── */}
        <section className="py-12 lg:py-16 bg-gradient-to-r from-blue-600 to-emerald-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Cookie className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">Transparency First</h2>
              <p className="text-white/90 text-lg leading-relaxed max-w-2xl mx-auto">
                We believe in being fully transparent about how we use cookies. Your privacy and trust are
                at the core of everything we build at <strong>Prochar.xyz</strong>.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── CONTACT ─── */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-3xl border border-slate-100 p-8 text-center"
            >
              <h3 className="text-2xl font-black text-slate-900 mb-2">Have Questions About Cookies?</h3>
              <p className="text-slate-500 mb-6">
                If you have any questions about our use of cookies, we'd love to hear from you.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <a
                  href="mailto:rar@daffodil.group"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  <Mail className="w-4 h-4" /> rar@daffodil.group
                </a>
                <a
                  href="tel:+8801847027537"
                  className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  <Phone className="w-4 h-4" /> +880 184 702 7537
                </a>
                <a
                  href="https://prochar.xyz"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
                >
                  <Globe className="w-4 h-4" /> prochar.xyz
                </a>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}
