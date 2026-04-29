import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rahim Ahmed',
    role: 'CEO, DhakaTech Solutions',
    avatar: 'RA',
    color: 'bg-brand-400',
    rating: 5,
    text: "Prochar.xyz transformed our marketing! We went from 15% to 42% open rates in just 2 months. The analytics dashboard is incredibly intuitive.",
  },
  {
    name: 'Fatima Khan',
    role: 'Marketing Lead, ShopBD',
    avatar: 'FK',
    color: 'bg-growth-400',
    rating: 5,
 text: "The drag & drop builder is a game changer. Our team can create beautiful campaigns in minutes without any design skills. Highly recommended!",
  },
  {
    name: 'Sumon Das',
    role: 'Founder, GreenLeaf Agro',
    avatar: 'SD',
    color: 'bg-amber-400',
    rating: 5,
    text: "Best email platform for Bangladeshi businesses. BDT pricing, local support, and world-class features. Our ROI increased by 3x!",
  },
  {
    name: 'Nadia Islam',
    role: 'CMO, FashionHub BD',
    avatar: 'NI',
    color: 'bg-pink-400',
    rating: 5,
    text: "Automation workflows saved us 20 hours per week. The segmentation feature helps us send highly targeted campaigns to different customer groups.",
  },
  {
    name: 'Tanvir Hasan',
    role: 'Director, EduCare Academy',
    avatar: 'TH',
    color: 'bg-purple-400',
    rating: 5,
    text: "We send 30,000+ emails monthly with zero deliverability issues. Prochar.xyz is reliable, affordable, and the support team is always responsive.",
  },
  {
    name: 'Ayesha Rahman',
    role: 'Owner, Chittagong Imports',
    avatar: 'AR',
    color: 'bg-cyan-400',
    rating: 5,
    text: "Simple, powerful, and affordable. Perfect for small businesses like ours. The free trial convinced us immediately.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-4"
          >
            <Star className="w-4 h-4 fill-amber-600" />
            Testimonials
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900"
          >
            Loved by{' '}
            <span className="gradient-text">thousands</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-600"
          >
            See what our customers across Bangladesh have to say about Prochar.xyz
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-slate-100 rounded-2xl p-8 hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
            >
              <Quote className="w-8 h-8 text-brand-200 group-hover:text-brand-300 transition-colors mb-4" />
              
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                <div className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center text-white text-sm font-bold`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
