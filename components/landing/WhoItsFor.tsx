'use client';

import { motion } from 'framer-motion';
import { fadeUp, popIn, staggerContainer, VIEWPORT_ONCE } from '@/lib/motionVariants';

export function WhoItsFor() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-content-coral/[0.015]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={fadeUp} transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Built for Creators Who Are Ready to Grow
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Whether you're a solo creator or running a brand, we build your strategy from real data.
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {[
            { name: 'UGC Creators', desc: 'Data-backed scripts for brand deals', to: '/for/ugc-creators' },
            { name: 'Coaches', desc: 'Content that converts to clients', to: '/for/coaches' },
            { name: 'E-commerce', desc: 'Product content that drives sales', to: '/for/ecommerce' },
            { name: 'Social Media Managers', desc: 'Strategy decks for every client', to: '/for/social-media-managers' },
            { name: 'Small Businesses', desc: 'Know what to post without an agency', to: '/for/small-businesses' },
            { name: 'Personal Brands', desc: 'Stand out in a crowded niche', to: '/for/personal-brands' },
          ].map((persona) => (
            <motion.div key={persona.name} variants={popIn}>
              <a
                href={persona.to}
                className="group block bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-content-coral/20 transition-all duration-300"
              >
                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1 group-hover:text-content-coral transition-colors">{persona.name}</h3>
                <p className="text-slate-500 text-xs sm:text-sm">{persona.desc}</p>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
