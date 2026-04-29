import { motion } from 'framer-motion';
import { Upload, LayoutTemplate, Send, LineChart } from 'lucide-react';

const steps = [
  {
    step: 1,
    icon: Upload,
    title: 'Upload Your Email List',
    description: 'Import contacts from CSV, Excel, or connect your CRM. We handle deduplication automatically.',
    color: 'text-brand-600',
    bg: 'bg-brand-50',
    border: 'border-brand-100',
  },
  {
    step: 2,
    icon: LayoutTemplate,
    title: 'Choose or Create Template',
    description: 'Pick from 50+ ready-made templates or design your own with our drag & drop builder.',
    color: 'text-growth-600',
    bg: 'bg-growth-50',
    border: 'border-growth-100',
  },
  {
    step: 3,
    icon: Send,
    title: 'Send Your Campaign',
    description: 'Hit send and watch your emails deliver instantly to thousands of inboxes worldwide.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
  },
  {
    step: 4,
    icon: LineChart,
    title: 'Track & Optimize',
    description: 'Monitor opens, clicks, and engagement in real-time with beautiful analytics dashboards.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="pt-10 lg:pt-16 pb-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ willChange: 'opacity, transform' }}  
            className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-4"
          >
            🚀 How It Works
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ willChange: 'opacity, transform' }}  
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900"
          >
            Get started in{' '}
            <span className="gradient-text">4 simple steps</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-600"
          >
            No setup fees, no learning curve. Launch your first campaign in under 5 minutes.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative" style={{ isolation: 'isolate' }}>
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-20 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-brand-200 via-growth-200 to-amber-200 pointer-events-none" />
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              style={{ willChange: 'opacity, transform' }}  
              className="relative text-center"
            >
              {/* Step number */}
              <div className="relative inline-block mb-6">
                <div className={`${step.bg} ${step.border} border-2 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto`}>
                  <step.icon className={`w-9 h-9 ${step.color}`} />
                </div>
                <div className="absolute -top-2 -right-2 gradient-bg text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  {step.step}
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
