'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TextReveal } from '@/components/ui/TextReveal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { CursorGlow } from '@/components/ui/CursorGlow';

// Hero uses local variants that start VISIBLE (opacity: 1) so content paints
// on first load for fast FCP/LCP. The entrance animation still runs via y/blur
// transforms, but the content is never invisible to Lighthouse or crawlers.
const heroStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const heroFadeUp = {
  hidden: { opacity: 1, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 14, duration: 0.6 } },
};

const heroFadeBlur = {
  hidden: { opacity: 1, y: 16, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring' as const, stiffness: 100, damping: 14, duration: 0.6 } },
};

export function Hero() {
  return (
    <section id="hero-section" className="relative pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
      {/* Cursor-following glow (desktop only) */}
      <CursorGlow />
      {/* Aurora gradient mesh */}
      <AuroraBackground variant="hero" />

      <div className="max-w-7xl mx-auto pb-8">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={heroStagger}
        >
          {/* Specimen badge */}
          <motion.div
            variants={heroFadeBlur}
            className="inline-flex items-center px-4 py-1.5 font-mono text-xs border border-content-coral-500/20 bg-content-coral-500/5 rounded-full text-content-coral-600 mb-6 tracking-wider"
          >
            TRUSTED BY 47,598 CREATORS
          </motion.div>

          <motion.h1
            variants={heroFadeUp}
            className="font-bold tracking-tight mb-4"
          >
            <span className="block text-center text-slate-900 text-[1.7rem] sm:text-5xl md:text-6xl leading-[1.1]">
              <TextReveal>Stop Guessing What to Post.</TextReveal>
            </span>
            <span className="block text-center text-content-coral text-[1.7rem] sm:text-5xl md:text-6xl leading-[1.1] pb-1">
              <TextReveal>Post What Actually Works.</TextReveal>
            </span>
          </motion.h1>

          <motion.p
            variants={heroFadeBlur}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Get your first content strategy in under 10 minutes. A 30-day plan with full scripts, built from what's going viral in your niche. You just hit record.
          </motion.p>

          {/* CTA */}
          <motion.div variants={heroFadeBlur} className="mb-2">
            <MagneticButton className="inline-block">
              <a
                href="/register"
                className="lab-bubbles group inline-flex items-center px-6 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-content-cta-dark to-content-cta rounded-xl font-bold text-base sm:text-lg text-white shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Get My 30-Day Content Plan
                <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </MagneticButton>
            <p className="text-sm text-slate-400 mt-3">Free content audit in under 60 seconds &middot; No credit card required</p>
          </motion.div>

        </motion.div>
      </div>

      {/* Product Demo Video */}
      {/* Initial state is opacity: 1 so the video poster is visible on first paint
          (critical for LCP). Only the y/scale/blur transforms animate in. */}
      <motion.div
        className="-mt-1 max-w-3xl lg:max-w-4xl mx-auto"
        initial={{ opacity: 1, y: 30, scale: 0.96, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ type: 'spring', stiffness: 60, damping: 14 }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero-demo-poster.jpg"
          width={1920}
          height={1080}
          className="w-full rounded-2xl shadow-2xl"
          src="/hero-demo.mp4"
        />
      </motion.div>

      {/* Persona callouts + social proof */}
      <div className="max-w-5xl mx-auto text-center mt-12">
          <motion.p initial="hidden" animate="visible" variants={heroFadeBlur} transition={{ duration: 0.5 }} className="text-sm text-slate-500 mb-8">
            Built for{' '}
            <a href="/for/ugc-creators" className="text-slate-700 hover:text-content-coral transition-colors underline decoration-slate-300 underline-offset-2">UGC creators</a>,{' '}
            <a href="/for/coaches" className="text-slate-700 hover:text-content-coral transition-colors underline decoration-slate-300 underline-offset-2">coaches</a>,{' '}
            <a href="/for/ecommerce" className="text-slate-700 hover:text-content-coral transition-colors underline decoration-slate-300 underline-offset-2">e-commerce brands</a>,{' '}
            <a href="/for/personal-brands" className="text-slate-700 hover:text-content-coral transition-colors underline decoration-slate-300 underline-offset-2">personal brands</a>,{' '}
            and <a href="/for/small-businesses" className="text-slate-700 hover:text-content-coral transition-colors underline decoration-slate-300 underline-offset-2">small businesses</a>.
          </motion.p>

          <motion.div initial="hidden" animate="visible" variants={heroStagger} className="flex flex-wrap justify-center gap-3">
            {[
              { image: '/testimonials/jen-thompson.jpg', name: 'Jen T.', stat: '+60K followers' },
              { image: '/testimonials/manny-watkins.jpg', name: 'Manny W.', stat: '0 to 30K+' },
              { image: '/testimonials/matt-gehlbach.jpg', name: 'Matt G.', stat: '+10K in 2mo' },
            ].map((t) => (
              <motion.div key={t.name} variants={heroFadeUp} transition={{ duration: 0.5 }} className="flex items-center gap-2.5 px-3 py-2 border border-slate-200 rounded-lg bg-white/70">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-600 text-xs font-bold">{t.name.charAt(0)}</div>
                  <img src={t.image} alt={t.name} loading="lazy" decoding="async" width={32} height={32} className="relative w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold text-slate-900">{t.name}</p>
                  <p className="font-mono text-[10px] text-content-coral-600">{t.stat}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
      </div>
    </section>
  );
}
