import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Users, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import SignupModal from './SignupModal';

const Hero = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('free');

  const handleStartFree = () => {
    setSelectedPlan('free');
    setShowSignupModal(true);
  };

  const handleViewPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-10">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-emerald-700">Now serving 2,500+ businesses in Bangladesh</span>
            </div>

            {/* Headline - split into two lines, smaller size */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Reach thousands of customers
              </h1>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent leading-tight">
                with powerful email campaigns
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
              Create, send, and track beautiful email campaigns with our easy-to-use platform. 
              Boost engagement with advanced analytics and automation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartFree}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
              >
                Start Free
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleViewPricing}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
              >
                View Pricing
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-sm text-slate-600">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-sm text-slate-600">GDPR compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-sm text-slate-600">99.9% uptime</span>
              </div>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-slate-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">2,500+</div>
                <div className="text-sm text-slate-500">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">42%</div>
                <div className="text-sm text-slate-500">Avg Open Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">10M+</div>
                <div className="text-sm text-slate-500">Emails Sent</div>
              </div>
            </div>
          </motion.div>

          {/* Right content - Hero image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-slate-200">
              <img
                src="/images/hero-dashboard.jpg"
                alt="Email Marketing Dashboard"
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
            </div>

            {/* Floating card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="absolute -left-4 top-1/4 bg-white rounded-xl shadow-lg p-4 border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">12,450</div>
                  <div className="text-xs text-slate-500">Active Subscribers</div>
                </div>
              </div>
            </motion.div>

            {/* Floating card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="absolute -right-4 bottom-1/4 bg-white rounded-xl shadow-lg p-4 border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">68.2%</div>
                  <div className="text-xs text-slate-500">Open Rate</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Signup Modal */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        selectedPlan={selectedPlan}
      />
    </section>
  );
};

export default Hero;