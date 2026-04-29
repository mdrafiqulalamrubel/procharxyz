import { motion } from 'framer-motion';

const stats = [
  {
    number: '50K+',
    label: 'Emails Sent Daily',
    description: 'Billions of emails delivered with 99.9% uptime',
  },
  {
    number: '5000+',
    label: 'Active Users',
    description: 'Businesses across Bangladesh trust Prochar',
  },
  {
    number: '42%',
    label: 'Average Open Rate',
    description: 'Double the industry standard',
  },
  {
    number: '৳0',
    label: 'Free to Start',
    description: '1,000 emails at no cost, no credit card required',
  },
];

export default function Statistics() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden" style={{ backgroundColor: '#2563eb' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mb-4">
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="text-5xl lg:text-6xl font-black text-white mb-2"
                >
                  {stat.number}
                </motion.div>
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-2">
                {stat.label}
              </h3>
              <p className="text-white/80 text-sm lg:text-base">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
