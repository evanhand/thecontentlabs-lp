'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { fadeUp, popIn, staggerContainer, VIEWPORT_ONCE } from '@/lib/motionVariants';

const plans = [
  { name: 'Starter', price: 39, desc: 'For creators getting started', cta: 'Start Free Audit', highlights: ['Video Audits', '3 Competitors', 'Full Strategy', 'Content Calendar', 'The Chemist AI'] },
  { name: 'Pro', price: 79, desc: 'For creators ready to scale', popular: true, cta: 'Start My Pro Plan', highlights: ['More Audits & Competitors', 'Full Strategy', 'Content Calendar', 'Priority Support', 'Advanced Analytics'] },
  { name: 'Studio', price: 129, desc: 'For teams and agencies', cta: 'Start Studio Plan', highlights: ['Highest Limits', '2 Team Seats', '2 Analysis Cycles/mo', 'Priority Chemist', 'Studio Badge'] },
];

export function PricingPreview() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={fadeUp} transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600">
            Every plan includes a full content audit, strategy, and 30-day calendar with scripts.
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={popIn}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`relative bg-white rounded-2xl border p-6 cursor-pointer transition-shadow duration-300 ${plan.popular ? 'border-content-coral shadow-lg shadow-content-coral/10 hover:shadow-xl hover:shadow-content-coral/20' : 'border-slate-200 hover:shadow-lg hover:border-slate-300'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-content-coral text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
                </div>
              )}
              <div className="text-center mb-4">
                <h3 className="font-bold text-slate-900 text-lg">{plan.name}</h3>
                <p className="text-slate-500 text-xs mt-1">{plan.desc}</p>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-slate-900">${plan.price}</span>
                  <span className="text-slate-500 text-sm">/mo</span>
                </div>
              </div>
              <ul className="space-y-2 mb-5">
                {plan.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="h-3.5 w-3.5 text-content-coral flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
              <a
                href="/pricing"
                className={`block text-center py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${plan.popular
                  ? 'bg-gradient-to-r from-content-cta-dark to-content-cta text-white shadow-sm hover:shadow-md hover:brightness-110'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={fadeUp} transition={{ duration: 0.5 }}
          className="text-center text-sm text-slate-500 mt-6"
        >
          Save 17% with annual billing &middot; No credit card required to start &middot; Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}
