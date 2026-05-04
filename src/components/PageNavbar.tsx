import { useState, useEffect } from 'react';
import { Menu, X, Zap, ChevronRight } from 'lucide-react';

// Simple navbar for standalone pages (About Us, Privacy Policy, etc.)
// No signup modal needed — all links go to homepage sections

interface PageNavbarProps {
  onSignup?: () => void;
}

export default function PageNavbar({ onSignup }: PageNavbarProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Prochar Logo"
              className="h-16 w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 rounded-lg hover:bg-brand-50/50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://sms.skill.jobs/login"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-sm font-semibold text-slate-700 hover:text-brand-600 transition-colors"
            >
              Log In
            </a>
            <a
              href="/"
              className="gradient-bg text-white px-5 py-2.5 text-sm font-semibold rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
            >
              Start Free <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {mobileOpen
              ? <X className="w-6 h-6 text-slate-700" />
              : <Menu className="w-6 h-6 text-slate-700" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-base font-medium text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 space-y-2 border-t border-slate-100 mt-4">
              <a
                href="https://sms.skill.jobs/login"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-3 text-base font-semibold text-slate-700 hover:text-brand-600 text-center"
              >
                Log In
              </a>
              <a
                href="/"
                className="block w-full gradient-bg text-white px-4 py-3 text-base font-semibold rounded-xl text-center"
              >
                Start Free
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
