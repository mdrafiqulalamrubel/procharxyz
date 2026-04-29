import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const partnerLogos: string[] = [
  '/images/partnerslogo/ap.png',
  '/images/partnerslogo/bvcl.png',
  '/images/partnerslogo/dcl.png',
  '/images/partnerslogo/diit.png',
  '/images/partnerslogo/dil.png',
  '/images/partnerslogo/dipti.png',
  '/images/partnerslogo/dis.png',
  '/images/partnerslogo/diu.png',
  '/images/partnerslogo/dol.png',
  '/images/partnerslogo/dpi.png',
  '/images/partnerslogo/ge.png',
  '/images/partnerslogo/gg.png',
  '/images/partnerslogo/nist1.png',
  '/images/partnerslogo/np.png',
  '/images/partnerslogo/oif.png',
  '/images/partnerslogo/pia.png',
  '/images/partnerslogo/sj.png',
];

const CARD_WIDTH = 160;   // px — logo card width
const GAP        = 24;    // px — gap between cards
const STEP       = CARD_WIDTH + GAP; // px per slide
const PAUSE_MS   = 1800;  // ms — pause between slides
const SLIDE_MS   = 0.55;  // seconds — slide animation duration
const VISIBLE    = 6;     // cards visible at once (desktop)

export default function Partners() {
  const controls = useAnimation();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Duplicate logos so we can loop seamlessly
  const items = [...partnerLogos, ...partnerLogos];
  const total  = partnerLogos.length;

  const slideTo = (index: number, animate = true) => {
    controls.start({
      x: -(index * STEP),
      transition: animate
        ? { duration: SLIDE_MS, ease: [0.25, 0.46, 0.45, 0.94] }
        : { duration: 0 },
    });
  };

  useEffect(() => {
    if (paused) return;

    timerRef.current = setTimeout(() => {
      const next = current + 1;

      if (next >= total) {
        // Jump to duplicate without animation, then continue
        slideTo(next, true);
        setTimeout(() => {
          setCurrent(0);
          slideTo(0, false);
        }, SLIDE_MS * 1000 + 50);
      } else {
        slideTo(next, true);
        setCurrent(next);
      }
    }, PAUSE_MS);

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, paused]);

  // Kick off initial position
  useEffect(() => {
    slideTo(0, false);
  }, []);

  return (
    <section id="partners" className="py-16 lg:py-24 bg-slate-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
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
      </div>

      {/* Slider */}
      <div
        className="relative w-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgb(248,250,252), transparent)' }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, rgb(248,250,252), transparent)' }}
        />

        {/* Track viewport — shows exactly VISIBLE cards */}
        <div
          className="overflow-hidden mx-auto px-6"
          style={{ maxWidth: `${VISIBLE * STEP + 48}px` }}
        >
          <motion.div
            animate={controls}
            className="flex"
            style={{ gap: `${GAP}px` }}
          >
            {items.map((src, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center bg-white rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/5 transition-shadow duration-300"
                style={{
                  width:  `${CARD_WIDTH}px`,
                  height: '80px',
                  padding: '12px 20px',
                }}
              >
                <img
                  src={src}
                  alt=""
                  style={{
                    height: '48px',
                    width: 'auto',
                    maxWidth: '120px',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-6">
          {partnerLogos.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); slideTo(i); }}
              className="transition-all duration-300 rounded-full"
              style={{
                width:  current === i ? '20px' : '6px',
                height: '6px',
                background: current === i ? '#2563eb' : '#cbd5e1',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
