import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import PageNavbar from '../src/components/PageNavbar';
import {
  ArrowLeft, Shield, FileText, Link2, AlertTriangle,
  RefreshCw, User, Mail, Phone, Globe, CheckCircle,
} from 'lucide-react';

const sections = [
  {
    number: '1',
    icon: CheckCircle,
    title: 'Agreement to Terms',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    badgeBg: 'bg-blue-50 text-blue-600',
    content: (
      <p className="text-slate-600 leading-relaxed">
        By accessing and using{' '}
        <a href="https://prochar.xyz" className="text-blue-600 hover:underline font-medium">Prochar.xyz</a>,
        you accept and agree to be bound by the terms and provisions of this agreement.
        If you do not agree to abide by the above, please do not use this service.
      </p>
    ),
  },
  {
    number: '2',
    icon: FileText,
    title: 'Use License',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    badgeBg: 'bg-emerald-50 text-emerald-600',
    content: (
      <>
        <p className="text-slate-600 leading-relaxed mb-4">
          Permission is granted to temporarily download one copy of the materials (information or software)
          on <a href="https://prochar.xyz" className="text-blue-600 hover:underline font-medium">Prochar.xyz</a> for
          personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title,
          and under this license you may not:
        </p>
        <ul className="space-y-2">
          {[
            'Modify or copy the materials',
            'Use the materials for any commercial purpose or for any public display',
            'Attempt to decompile or reverse engineer any software contained on the site',
            'Remove any copyright or other proprietary notations from the materials',
            'Transfer the materials to another person or "mirror" the materials on any other server',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
              <span className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    number: '3',
    icon: AlertTriangle,
    title: 'Disclaimer',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    badgeBg: 'bg-purple-50 text-purple-600',
    content: (
      <p className="text-slate-600 leading-relaxed">
        The materials on{' '}
        <a href="https://prochar.xyz" className="text-blue-600 hover:underline font-medium">Prochar.xyz</a>{' '}
        are provided on an 'as is' basis. Prochar.xyz makes no warranties, expressed or implied, and hereby
        disclaims and negates all other warranties including, without limitation, implied warranties or conditions
        of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or
        other violation of rights.
      </p>
    ),
  },
  {
    number: '4',
    icon: Shield,
    title: 'Limitations',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    badgeBg: 'bg-amber-50 text-amber-600',
    content: (
      <p className="text-slate-600 leading-relaxed">
        In no event shall{' '}
        <a href="https://prochar.xyz" className="text-blue-600 hover:underline font-medium">Prochar.xyz</a>{' '}
        or its suppliers be liable for any damages (including, without limitation, damages for loss of data or
        profit, or due to business interruption) arising out of the use or inability to use the materials on Prochar.xyz.
      </p>
    ),
  },
  {
    number: '5',
    icon: CheckCircle,
    title: 'Accuracy of Materials',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    badgeBg: 'bg-blue-50 text-blue-600',
    content: (
      <p className="text-slate-600 leading-relaxed">
        The materials appearing on{' '}
        <a href="https://prochar.xyz" className="text-blue-600 hover:underline font-medium">Prochar.xyz</a>{' '}
        could include technical, typographical, or photographic errors. Prochar.xyz does not warrant that any of
        the materials on the site are accurate, complete, or current. Prochar.xyz may make changes to the materials
        contained on its website at any time without notice.
      </p>
    ),
  },
  {
    number: '6',
    icon: Link2,
    title: 'Links',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    badgeBg: 'bg-emerald-50 text-emerald-600',
    content: (
      <p className="text-slate-600 leading-relaxed">
        <a href="https://prochar.xyz" className="text-blue-600 hover:underline font-medium">Prochar.xyz</a>{' '}
        has not reviewed all of the sites linked to its website and is not responsible for the contents of any
        such linked site. The inclusion of any link does not imply endorsement by Prochar.xyz of the site.
        Use of any such linked website is at the user's own risk.
      </p>
    ),
  },
  {
    number: '7',
    icon: RefreshCw,
    title: 'Modifications',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    badgeBg: 'bg-purple-50 text-purple-600',
    content: (
      <p className="text-slate-600 leading-relaxed">
        <a href="https://prochar.xyz" className="text-blue-600 hover:underline font-medium">Prochar.xyz</a>{' '}
        may revise these terms of service for the website at any time without notice. By using this website,
        you are agreeing to be bound by the then current version of these terms of service.
      </p>
    ),
  },
  {
    number: '8',
    icon: User,
    title: 'User Content',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    badgeBg: 'bg-amber-50 text-amber-600',
    content: (
      <p className="text-slate-600 leading-relaxed">
        Any content provided by users on{' '}
        <a href="https://prochar.xyz" className="text-blue-600 hover:underline font-medium">Prochar.xyz</a>{' '}
        remains the intellectual property of the user. By posting content, you grant Prochar.xyz and other users
        a non-exclusive, royalty-free license to use, reproduce, modify and distribute your content in connection
        with the website.
      </p>
    ),
  },
  {
    number: '9',
    icon: Mail,
    title: 'Contact Information',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    badgeBg: 'bg-blue-50 text-blue-600',
    content: (
      <div className="space-y-3">
        <p className="text-slate-600 leading-relaxed mb-4">
          If you have any questions about these Terms of Service, please contact us:
        </p>
        <a
          href="mailto:rar@daffodil.group"
          className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors"
        >
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <Mail className="w-4 h-4 text-blue-600" />
          </div>
          rar@daffodil.group
        </a>
        <a
          href="tel:+8801847027537"
          className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 transition-colors"
        >
          <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <Phone className="w-4 h-4 text-emerald-600" />
          </div>
          +880 184 702 7537
        </a>
      </div>
    ),
  },
];

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service — Prochar.xyz</title>
        <meta
          name="description"
          content="Read the Terms of Service for Prochar.xyz — Bangladesh's most powerful email marketing platform."
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

              {/* Back */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-6">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">Last updated: April 2026</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
                Terms of{' '}
                <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  Service
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl">
                Please read these Terms of Service carefully before using Prochar.xyz.
                By accessing our platform, you agree to be bound by these terms.
              </p>

              {/* Quick nav pills */}
              <div className="flex flex-wrap gap-2 mt-8">
                {['Agreement', 'Use License', 'Disclaimer', 'Limitations', 'User Content', 'Contact'].map((label, i) => (
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

        {/* ─── TERMS SECTIONS ─── */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {sections.map((sec, index) => {
                const Icon = sec.icon;
                return (
                  <motion.div
                    key={sec.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className={`bg-white rounded-2xl border-2 ${sec.border} p-6 shadow-sm hover:shadow-md transition-all duration-300`}
                  >
                    {/* Card header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 ${sec.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                        <Icon className={`w-6 h-6 ${sec.color}`} />
                      </div>
                      <div>
                        <span className={`text-xs font-bold tracking-widest uppercase ${sec.color}`}>
                          Section {sec.number}
                        </span>
                        <h2 className="text-lg font-bold text-slate-900 leading-snug">
                          {sec.title}
                        </h2>
                      </div>

                      {/* Ghost number */}
                      <div className={`ml-auto text-6xl font-black opacity-[0.05] select-none leading-none ${sec.color}`}>
                        {sec.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pl-16">
                      {sec.content}
                    </div>
                  </motion.div>
                );
              })}
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
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">Your Trust Matters</h2>
              <p className="text-white/90 text-lg leading-relaxed max-w-2xl mx-auto">
                We are committed to maintaining a <strong>transparent, fair, and secure</strong> platform.
                These terms exist to protect both you and us, ensuring a trustworthy experience for everyone.
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
              <h3 className="text-2xl font-black text-slate-900 mb-2">Have Questions?</h3>
              <p className="text-slate-500 mb-6">
                If you have any questions about these Terms, we'd love to hear from you.
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
