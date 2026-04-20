'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { fadeUp, popIn, staggerContainer, VIEWPORT_ONCE } from '@/lib/motionVariants';

const plans = [
  { name: 'Starter', price: 39, desc: 'For creators getting started', cta: 'Start Free Audit', highlights: ['Video Audits', '3 Competitors', 'Full Strategy', 'Content Calendar', 'The Chemist AI'] },
  { name: 'Pro', price: 79, desc: 'For creators ready to scale', popular: true, cta: 'Start My Pro Plan', highlights: ['More Audits & Competitors', 'Full Strategy', 'Content Calendar', 'Priority Support', 'Advanced Analytics'] },
  { name: 'Studio', price: 129, desc: 'For teams and agencies', cta: 'Start Studio Plan', highlights: ['Highest Limits', '2 Team Seats', '2 Analysis Cycles/mo', 'Priority Chemist', 'Studio Badge'] },
];

export function PricingPreview() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={fadeUp} transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4 tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600">
            Every plan includes a full content audit, strategy, and 30-day calendar with scripts.
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 items-stretch"
        >
          {plans.map((plan) => {
            const isPopular = !!plan.popular;
            return (
              <motion.div
                key={plan.name}
                variants={popIn}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`relative rounded-2xl p-6 sm:p-7 cursor-pointer transition-all duration-300 flex flex-col ${
                  isPopular
                    ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-2 border-content-coral/60 shadow-2xl shadow-content-coral/20 md:-my-4 md:py-10 z-10 md:scale-[1.04]'
                    : 'bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 md:mt-2 md:mb-2 opacity-95 hover:opacity-100'
                }`}
              >
                {isPopular && (
                  <>
                    <div
                      aria-hidden
                      className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-content-coral/25 blur-[80px] pointer-events-none"
                    />
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-content-cta-dark to-content-cta text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-lg shadow-content-coral/30">
                        <Sparkles className="h-3 w-3" />
                        MOST POPULAR
                      </span>
                    </div>
                  </>
                )}

                <div className={`text-center mb-5 relative ${isPopular ? 'pt-2' : ''}`}>
                  <h3 className={`font-heading font-bold text-xl tracking-tight ${isPopular ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs mt-1 ${isPopular ? 'text-slate-400' : 'text-slate-500'}`}>{plan.desc}</p>
                  <div className="mt-4 flex items-baseline justify-center gap-1">
                    <span className={`text-4xl sm:text-5xl font-heading font-bold tabular-nums ${isPopular ? 'text-white' : 'text-slate-900'}`}>
                      ${plan.price}
                    </span>
                    <span className={`text-sm ${isPopular ? 'text-slate-400' : 'text-slate-500'}`}>/mo</span>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-6 flex-1 relative">
                  {plan.highlights.map((h) => (
                    <li key={h} className={`flex items-start gap-2.5 text-sm ${isPopular ? 'text-slate-200' : 'text-slate-600'}`}>
                      <span className={`flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full mt-0.5 ${isPopular ? 'bg-content-coral/25' : 'bg-content-coral/10'}`}>
                        <Check className={`h-2.5 w-2.5 ${isPopular ? 'text-content-coral-400' : 'text-content-coral'}`} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>

                <a
                  href="/pricing"
                  className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 relative ${
                    isPopular
                      ? 'bg-gradient-to-r from-content-cta-dark to-content-cta text-white shadow-lg shadow-content-coral/30 hover:shadow-xl hover:shadow-content-coral/50 hover:scale-[1.02]'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={fadeUp} transition={{ duration: 0.5 }}
          className="text-center text-sm text-slate-500 mt-8"
        >
          Save 17% with annual billing &middot; No credit card required to start &middot; Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}
