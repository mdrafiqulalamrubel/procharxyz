import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Calculator } from 'lucide-react';

interface PricingProps {
  onSignup: (plan: string) => void;
}

const plans = [
  {
    name: 'Free Trial',
    price: '৳0',
    period: '',
    emails: '1,000',
    description: 'Perfect for testing',
    popular: false,
    features: [
      '1,000 emails (one-time)',
      'Basic templates',
      'Basic reporting',
      'Email list up to 100',
      'Community support',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Starter',
    price: '৳500',
    period: '/month',
    emails: '5,000',
    description: 'For small businesses',
    popular: false,
    features: [
      '5,000 emails/month',
      'All basic templates',
      'Drag & drop builder',
      'Basic analytics',
      'Email list up to 500',
      'Email support',
    ],
    cta: 'Start Starter',
    highlight: false,
  },
  {
    name: 'Growth',
    price: '৳900',
    period: '/month',
    emails: '10,000',
    description: 'Most Popular',
    popular: true,
    features: [
      '10,000 emails/month',
      'Premium templates',
      'Audience segmentation',
      'Full analytics reports',
      'Email list up to 2,000',
      'A/B testing (basic)',
      'Priority support',
    ],
    cta: 'Start Growth',
    highlight: true,
  },
  {
    name: 'Business',
    price: '৳2,000',
    period: '/month',
    emails: '25,000',
    description: 'For growing teams',
    popular: false,
    features: [
      '25,000 emails/month',
      'A/B testing',
      'Advanced analytics',
      'Custom segments',
      'Email list up to 5,000',
      'API access',
      'Phone & email support',
    ],
    cta: 'Start Business',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '৳3,500',
    period: '/month',
    emails: '50,000',
    description: 'For power users',
    popular: false,
    features: [
      '50,000 emails/month',
      'Email automation',
      'Advanced personalization',
      'Full analytics suite',
      'Email list up to 15,000',
      'Advanced A/B testing',
      'Webhooks & API',
      'Dedicated support',
    ],
    cta: 'Start Pro',
    highlight: false,
  },
  {
    name: 'Enterprise',
    price: '৳6,000+',
    period: '/month',
    emails: '100,000+',
    description: 'Custom solutions',
    popular: false,
    features: [
      '100,000+ emails/month',
      'Full API access',
      'Dedicated account manager',
      'Custom integrations',
      'Unlimited contacts',
      'SLA guarantee',
      'White-label options',
      'On-premise deployment',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
];

const payAsYouGoExamples = [
  { emails: '2,000', cost: '৳200' },
  { emails: '5,000', cost: '৳500' },
  { emails: '10,000', cost: '৳1,000' },
  { emails: '25,000', cost: '৳2,500' },
];

export default function Pricing({ onSignup }: PricingProps) {
  const [showPayAsYouGo, setShowPayAsYouGo] = useState(false);

  return (
    <section id="pricing" className="py-20 lg:py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-growth-50 text-growth-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-4"
          >
            💰 Pricing
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900"
          >
            Simple, transparent{' '}
            <span className="gradient-text">pricing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-600"
          >
            Start free, scale as you grow. No hidden fees, no surprises.
          </motion.p>
        </div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center mb-12 gap-2"
        >
          <button
            onClick={() => setShowPayAsYouGo(false)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              !showPayAsYouGo
                ? 'gradient-bg text-white shadow-lg shadow-brand-500/25'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-200'
            }`}
          >
            Monthly Plans
          </button>
          <button
            onClick={() => setShowPayAsYouGo(true)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              showPayAsYouGo
                ? 'gradient-bg text-white shadow-lg shadow-brand-500/25'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-200'
            }`}
          >
            Pay As You Go
          </button>
        </motion.div>

        {/* Pricing Grid */}
        {!showPayAsYouGo && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`relative bg-white rounded-2xl border-2 p-8 transition-all hover:shadow-xl ${
                  plan.highlight
                    ? 'border-brand-500 shadow-xl shadow-brand-500/10 scale-[1.02] lg:scale-105'
                    : 'border-slate-100 hover:border-brand-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 gradient-bg text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <Star className="w-3 h-3" /> Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                    {plan.period && <span className="text-slate-500">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-brand-600 font-medium mt-1">
                    {plan.emails} emails included
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                      <Check className="w-5 h-5 text-growth-500 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onSignup(plan.name.toLowerCase())}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.highlight
                      ? 'gradient-bg text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pay As You Go */}
        {showPayAsYouGo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-12 shadow-xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 gradient-bg-soft rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-brand-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Pay As You Go</h3>
                <p className="text-slate-600 mt-2">
                  No monthly commitment. Pay only for what you send.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 bg-brand-50 text-brand-600 rounded-full px-4 py-2 text-sm font-bold">
                  ৳0.10 per email
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {payAsYouGoExamples.map((example) => (
                  <div key={example.emails} className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                    <p className="text-sm text-slate-500 mb-1">{example.emails} emails</p>
                    <p className="text-xl font-bold text-slate-900">{example.cost}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => onSignup('pay-as-you-go')}
                  className="gradient-bg text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.02] transition-all"
                >
                  Start Pay As You Go
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
