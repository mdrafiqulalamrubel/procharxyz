import { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  mode: 'signup' | 'login';
  onClose: () => void;
}

export default function AuthModal({ mode, onClose }: AuthModalProps) {
  const [currentMode, setCurrentMode] = useState<'signup' | 'login'>(mode);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="gradient-bg px-8 pt-8 pb-12 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {currentMode === 'signup' ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-white/70 mt-2 text-sm">
            {currentMode === 'signup'
              ? 'Start your free email marketing journey'
              : 'Log in to your Prochar dashboard'}
          </p>
        </div>

        {/* Form */}
        <div className="px-8 py-8 -mt-4 bg-white rounded-t-3xl">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {currentMode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g., Rahim Ahmed"
                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {currentMode === 'signup' && (
              <div className="flex items-center gap-2">
                <input type="checkbox" id="terms" className="rounded border-slate-300 text-brand-600" />
                <label htmlFor="terms" className="text-sm text-slate-600">
                  I agree to the{' '}
                  <a href="#" className="text-brand-600 hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-brand-600 hover:underline">Privacy Policy</a>
                </label>
              </div>
            )}

            <button
              type="submit"
              className="w-full gradient-bg text-white py-3.5 rounded-xl font-bold text-sm hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-brand-500/25"
            >
              {currentMode === 'signup' ? 'Create Free Account' : 'Log In'}
            </button>

            {currentMode === 'signup' && (
              <p className="text-xs text-center text-slate-500">
                🎉 Get 1,000 free emails to get started — no credit card required
              </p>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              {currentMode === 'signup' ? (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => setCurrentMode('login')}
                    className="text-brand-600 font-semibold hover:underline"
                  >
                    Log In
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setCurrentMode('signup')}
                    className="text-brand-600 font-semibold hover:underline"
                  >
                    Sign Up Free
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
