import { motion } from 'framer-motion';
import Navbar from '../src/components/Navbar';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Shield, Clock } from 'lucide-react';

const sections = [
  {
    title: 'Information We Collect',
    content: `To provide a reliable and effective email marketing service, we collect certain types of information from our users. When you create an account or interact with our platform, we may collect personal and business-related information such as your name, email address, phone number, and organization details. This information helps us identify you, manage your account, and communicate with you effectively.

In addition to personal details, we collect data related to your use of our services. This includes login credentials, campaign content, email lists that you upload, and engagement data generated from your campaigns. Such information is essential for delivering campaign functionality, tracking performance, and improving your overall experience.

We also automatically collect certain technical and usage-related information, including your IP address, browser type, device information, and browsing activity on our website. This helps us understand user behavior, enhance system performance, and ensure platform security.`,
  },
  {
    title: 'How We Use Your Information',
    content: `The information we collect is primarily used to operate, maintain, and improve our email marketing platform. We use your data to create and manage your account, process and deliver your email campaigns, and provide insights such as open rates, click rates, and other performance metrics.

We may also use your information to communicate with you regarding important updates, service-related announcements, security notifications, and customer support. Occasionally, we may share relevant product updates or promotional offers that could benefit your business, while ensuring that such communication remains relevant and non-intrusive.

Our objective is to provide a seamless, efficient, and data-driven email marketing experience while maintaining transparency and trust.`,
  },
  {
    title: 'Email Data and User Responsibility',
    content: `Prochar.xyz acts as a technology platform that enables businesses to send email campaigns to their audience. While we provide the tools and infrastructure, you remain fully responsible for the data you use within the platform. This includes ensuring that your email lists are collected lawfully and that you have obtained proper consent from recipients where required.

You are also responsible for complying with applicable laws and regulations, including anti-spam and data protection requirements. We do not monitor or control the content of your campaigns, but we reserve the right to take action if any activity violates our terms or applicable laws.

Importantly, we do not sell, rent, or misuse your email lists or campaign data. Your data is processed solely for the purpose of delivering the services you request.`,
  },
  {
    title: 'Cookies and Tracking Technologies',
    content: `To enhance user experience and improve platform performance, we use cookies and similar tracking technologies. These technologies help us remember user preferences, analyze traffic patterns, and understand how users interact with our website and services.

Cookies also allow us to optimize functionality and deliver a smoother browsing experience. You have the option to manage or disable cookies through your browser settings, although doing so may affect certain features of the platform.`,
  },
  {
    title: 'Data Sharing and Disclosure',
    content: `We respect your privacy and do not sell your personal information to third parties. However, in order to operate our services efficiently, we may share limited information with trusted third-party service providers, such as hosting partners, analytics tools, and infrastructure providers. These partners are obligated to handle your data securely and only for the purposes specified by us.

We may also disclose information if required to do so by law, regulation, or legal process, or if such action is necessary to protect the rights, safety, and integrity of our platform, our users, or the public.`,
  },
  {
    title: 'Data Security',
    content: `We implement appropriate technical and organizational measures to safeguard your information against unauthorized access, alteration, disclosure, or destruction. These measures include secure servers, access controls, and regular monitoring of our systems.

While we continuously strive to protect your data, it is important to note that no method of transmission over the internet or electronic storage is completely secure. Therefore, we cannot guarantee absolute security, but we remain committed to maintaining high standards of protection.`,
  },
  {
    title: 'Data Retention',
    content: `We retain your information only for as long as it is necessary to fulfill the purposes outlined in this policy. This includes providing our services, maintaining records for operational and legal requirements, and resolving any disputes.

When your data is no longer required, we take reasonable steps to securely delete or anonymize it in accordance with industry practices.`,
  },
  {
    title: 'Your Rights',
    content: `Depending on your location and applicable laws, you may have certain rights regarding your personal data. These may include the right to access the information we hold about you, request corrections, or request deletion of your data.

If you wish to exercise any of these rights or have concerns about how your data is handled, you may contact us directly using the details provided below.`,
  },
  {
    title: 'Third-Party Links',
    content: `Our website may contain links to external websites or services that are not operated by us. Please be aware that we are not responsible for the privacy practices or content of these third-party sites. We encourage you to review their privacy policies before providing any information.`,
  },
  {
    title: 'Changes to This Policy',
    content: `We may update this Privacy Policy from time to time to reflect changes in our services, technology, or legal requirements. Any updates will be posted on this page, and the effective date will be revised accordingly. We encourage users to review this page periodically to stay informed.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — Prochar.xyz</title>
        <meta name="description" content="Privacy Policy for Prochar.xyz — Learn how we collect, use, and protect your personal information." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

      {/* ─── NAVBAR ─── */}
      <Navbar />

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Back Button */}
              <Link href="/"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>

              {/* Icon + Title */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-black">Privacy Policy</h1>
                  <p className="text-white/80 text-sm mt-1">Prochar.xyz</p>
                </div>
              </div>

              {/* Effective Date */}
              <div className="flex items-center gap-2 mt-6 text-white/70 text-sm">
                <Clock className="w-4 h-4" />
                <span>Effective Date: January 1, 2025 &nbsp;|&nbsp; Last Updated: April 2025</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* TABLE OF CONTENTS — sticky sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden lg:block"
            >
              <div className="sticky top-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                  Contents
                </h3>
                <nav className="space-y-1">
                  {sections.map((section, i) => (
                    <a
                      key={i}
                      href={`#section-${i}`}
                      className="block text-xs text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-2 transition-colors leading-tight"
                    >
                      {i + 1}. {section.title}
                    </a>
                  ))}
                  <a
                    href="#contact"
                    className="block text-xs text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-2 transition-colors"
                  >
                    {sections.length + 1}. Contact Us
                  </a>
                </nav>
              </div>
            </motion.div>

            {/* MAIN CONTENT */}
            <div className="lg:col-span-3 space-y-8">

              {/* Intro */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-blue-50 border border-blue-100 rounded-2xl p-6"
              >
                <p className="text-slate-700 leading-relaxed">
                  Welcome to <strong>Prochar.xyz</strong>. We are committed to protecting your privacy and ensuring that your personal and business information is handled in a secure and responsible manner. This Privacy Policy explains how we collect, use, store, and protect your information when you use our website and email marketing services. By accessing or using Prochar.xyz, you acknowledge that you have read and agreed to the terms outlined in this policy.
                </p>
              </motion.div>

              {/* Sections */}
              {sections.map((section, i) => (
                <motion.div
                  key={i}
                  id={`section-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 scroll-mt-8"
                >
                  {/* Section Number + Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{i + 1}</span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">{section.title}</h2>
                  </div>

                  {/* Section Content */}
                  <div className="pl-12">
                    {section.content.split('\n\n').map((para, j) => (
                      <p key={j} className="text-slate-600 leading-relaxed text-sm mb-3 last:mb-0">
                        {para}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* CONTACT SECTION */}
              <motion.div
                id="contact"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white scroll-mt-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{sections.length + 1}</span>
                  </div>
                  <h2 className="text-lg font-bold">Contact Us</h2>
                </div>
                <div className="pl-12 space-y-2">
                  <p className="text-white/90 text-sm">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please feel free to contact us:
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-white/70 text-sm">📧 Email:</span>
                      <a href="mailto:hello@prochar.xyz"
                        className="text-white font-medium text-sm hover:underline">
                        hello@prochar.xyz
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/70 text-sm">🌐 Website:</span>
                      <a href="https://prochar.xyz"
                        className="text-white font-medium text-sm hover:underline">
                        https://prochar.xyz
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Back to Home */}
              <div className="text-center pt-4">
                <Link href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 hover:border-blue-400 hover:text-blue-600 rounded-xl font-medium text-slate-700 transition-all duration-200">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
