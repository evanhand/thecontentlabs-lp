'use client';

import { motion } from 'framer-motion';
import { Video, Megaphone, ShoppingBag, Share2, Store, Sparkles } from 'lucide-react';
import { fadeUp, popIn, staggerContainer, VIEWPORT_ONCE } from '@/lib/motionVariants';

const PERSONAS = [
  { name: 'UGC Creators', desc: 'Data-backed scripts for brand deals', to: '/for/ugc-creators', icon: Video },
  { name: 'Coaches', desc: 'Content that converts to clients', to: '/for/coaches', icon: Megaphone },
  { name: 'E-commerce', desc: 'Product content that drives sales', to: '/for/ecommerce', icon: ShoppingBag },
  { name: 'Social Media Managers', desc: 'Strategy decks for every client', to: '/for/social-media-managers', icon: Share2 },
  { name: 'Small Businesses', desc: 'Know what to post without an agency', to: '/for/small-businesses', icon: Store },
  { name: 'Personal Brands', desc: 'Stand out in a crowded niche', to: '/for/personal-brands', icon: Sparkles },
];

export function WhoItsFor() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-white via-content-coral/[0.04] to-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={fadeUp} transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mb-4 tracking-tight">
            Built for Creators Who Are Ready to Grow
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Whether you're a solo creator or running a brand, we build your strategy from real data.
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {PERSONAS.map((persona) => {
            const Icon = persona.icon;
            return (
              <motion.div key={persona.name} variants={popIn}>
                <a
                  href={persona.to}
                  className="group relative block bg-white rounded-xl border border-slate-200 p-5 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-content-coral/10 hover:border-content-coral/30 transition-all duration-300 overflow-hidden"
                >
                  <div
                    aria-hidden
                    className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-content-coral/0 group-hover:bg-content-coral/[0.08] blur-2xl transition-colors duration-500"
                  />
                  <div className="relative flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-content-coral/10 border border-content-coral/20 flex items-center justify-center group-hover:bg-content-coral/15 group-hover:scale-105 transition-all">
                      <Icon className="h-5 w-5 text-content-coral" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-0.5 group-hover:text-content-coral transition-colors leading-tight">
                        {persona.name}
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm leading-snug">{persona.desc}</p>
                    </div>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
