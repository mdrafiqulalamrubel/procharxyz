import { Zap, Mail, MapPin, Phone, ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/newsletter-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (res.ok) {
        setSuccess(true);
        setMessage(json.message || 'Successfully subscribed!');
        setEmail('');
        setTimeout(() => {
          setSuccess(false);
          setMessage(null);
        }, 4000);
      } else {
        setMessage(json.error || 'Subscription failed');
      }
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src="/logo.png"
                alt="Prochar Logo"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Bangladesh's most powerful email marketing platform. Reach thousands of customers with beautiful campaigns.
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: 'FB', url: 'https://www.facebook.com/prochar.xyz/' },
                { label: 'X', url: 'https://twitter.com' },
                { label: 'IN', url: 'https://linkedin.com' },
                { label: 'IG', url: 'https://instagram.com' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-brand-600 transition-colors text-xs font-bold"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Product</h4>
            <ul className="space-y-3">
              {[
                { label: 'Features', href: '#features' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Templates', href: 'https://sms.skill.jobs/login' },
                { label: 'Integrations', href: '#' },
                { label: 'API Docs', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`text-sm text-slate-400 hover:text-white transition-colors ${
                      item.href === '#' ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about-us', newTab: true },
                { label: 'Blog', href: '/blog', newTab: true },
                { label: 'Careers', href: '#' },
                { label: 'Contact', href: '#contact' },
                { label: 'Partners', href: '#partners' },
              ].map((item: { label: string; href: string; newTab?: boolean }) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.newTab ? '_blank' : undefined}
                    rel={item.newTab ? 'noopener noreferrer' : undefined}
                    className={`text-sm text-slate-400 hover:text-white transition-colors ${
                      item.href === '#' ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand-400" />
                <a href="mailto:rar@daffodil.group" className="hover:text-white transition-colors">
                  rar@daffodil.group
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand-400" />
                <a href="tel:+8801712345678" className="hover:text-white transition-colors">
                  +880 184 702 7537
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand-400" />
                <span>102/1, Shukrabad, Mirpur Road, Dhanmondi, Dhaka-1207, Bangladesh.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-slate-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-semibold">Stay updated with email marketing tips</h4>
              <p className="text-sm text-slate-400 mt-1">Get weekly tips delivered to your inbox.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || success}
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 w-full md:w-64 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || success || !email.trim()}
                className="gradient-bg text-white px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] transition-all flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {success ? (
                  <>
                    <Check className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    {loading ? 'Subscribing...' : 'Subscribe'} <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
          {message && (
            <div className={`text-sm mt-3 ${success ? 'text-emerald-400' : 'text-amber-400'}`}>
              {message}
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Prochar.xyz. All rights reserved.
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center md:justify-end">
            <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/cookie-policy" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
