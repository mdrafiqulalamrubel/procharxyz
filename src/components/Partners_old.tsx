import { motion } from 'framer-motion';

const partners = [
  {
    name: 'TechHub Bangladesh',
    logo: 'TH',
    url: '#',
  },
  {
    name: 'Digital Marketing BD',
    logo: 'DM',
    url: '#',
  },
  {
    name: 'E-commerce Alliance',
    logo: 'EA',
    url: '#',
  },
  {
    name: 'Business Growth Network',
    logo: 'BG',
    url: '#',
  },
  {
    name: 'Innovation Hub',
    logo: 'IH',
    url: '#',
  },
  {
    name: 'SME Partners',
    logo: 'SP',
    url: '#',
  },
];

export default function Partners() {
  return (
    <section id="partners" className="py-16 lg:py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-4"
          >
            🤝 Partners
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900"
          >
            Trusted by Leading
            <span className="gradient-text"> Organizations</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-600"
          >
            Join hundreds of companies across Bangladesh who are using Prochar to grow their business.
          </motion.p>
        </div>

        {/* Partners Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {partners.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-center p-6 bg-white rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-300 group"
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                  {partner.logo}
                </div>
                <p className="text-sm font-semibold text-slate-700 group-hover:text-brand-600 transition-colors">
                  {partner.name}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
