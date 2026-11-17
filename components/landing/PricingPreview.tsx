'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { fadeUp, popIn, staggerContainer, VIEWPORT_ONCE } from '@/lib/motionVariants';

const plans = [
  { name: 'Free', price: 0, desc: 'Your numbers, for good', cta: 'Start free', highlights: ['Weekly numbers on your videos', '3 videos analyzed', '20 Chemist messages / mo', 'No card'] },
  { name: 'Starter', price: 19, firstMonth: 5, desc: 'Every video, analyzed', cta: 'Start Starter', highlights: ['25 videos / platform, monthly', 'Every video analyzed', '4 competitors', 'Monthly strategy + 30-day calendar', '1,000 Chemist credits'] },
  { name: 'Pro', price: 39, firstMonth: 5, desc: 'Daily tracking, weekly refresh', popular: true, cta: 'Start Pro', highlights: ['Daily tracking', '6 competitors, 15 videos each', 'Weekly strategy refresh', '7-day calendar, weekly', '2,500 Chemist credits'] },
  { name: 'Studio', price: 99, desc: 'For agencies', cta: 'Start Studio', highlights: ['Daily tracking', '8 competitors, 25 videos each', 'YouTube Shorts', '5,000 Chemist credits', '2 seats, priority support'] },
] as Array<{ name: string; price: number; firstMonth?: number; desc: string; cta: string; popular?: boolean; highlights: string[] }>;
const REGISTER = 'https://thecontentlabs.app/register';

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
            Free to start. $5 to go further.
          </h2>
          <p className="text-lg text-slate-600">
            The free plan tracks your videos for good. Paid plans analyze every one and add competitors, strategy and a calendar.
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 items-stretch"
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
                    ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-2 border-content-coral/60 shadow-2xl shadow-content-coral/20 lg:-my-4 lg:py-10 z-10 lg:scale-[1.04]'
                    : 'bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 lg:mt-2 lg:mb-2 opacity-95 hover:opacity-100'
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
                  {plan.firstMonth != null && (
                    <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] ${isPopular ? 'bg-content-coral/20 text-content-coral-400' : 'bg-content-coral/10 text-content-coral'}`}>
                      ${plan.firstMonth} first month
                    </span>
                  )}
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
                  href={REGISTER}
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
          Yearly is two months free &middot; Free plan needs no card &middot; Cancel anytime &middot; <a href="/pricing" className="underline underline-offset-2 hover:text-content-coral">Compare plans</a>
        </motion.p>
      </div>
    </section>
  );
}
