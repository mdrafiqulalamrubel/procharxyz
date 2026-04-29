import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CTAProps {
  onSignup: () => void;
}

export default function CTA({ onSignup }: CTAProps) {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0 hero-pattern opacity-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-growth-400/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white rounded-full px-5 py-2 text-sm font-semibold mb-8">
            <Sparkles className="w-4 h-4" /> Start Today
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight">
            Start your first campaign
            <br />
            for <span className="text-growth-300">FREE</span>
          </h2>

          <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
            Join 2,500+ businesses in Bangladesh already growing with Prochar.xyz. 
            No credit card required. 1,000 free emails to get started.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onSignup}
              className="bg-white text-brand-600 px-8 py-4 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#pricing"
              className="text-white/80 px-6 py-4 text-lg font-semibold border-2 border-white/30 rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all"
            >
              View All Plans
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
            <span>✓ No credit card</span>
            <span>✓ 1,000 free emails</span>
            <span>✓ Cancel anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
