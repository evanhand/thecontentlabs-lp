'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TextReveal } from '@/components/ui/TextReveal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { fadeUp, slideFromLeft, staggerContainerSlow, VIEWPORT_ONCE } from '@/lib/motionVariants';

export function PainSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10 bg-content-coral/[0.02]">
      {/* Cracked flask decoration */}
      <div className="absolute right-4 lg:right-16 top-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none" aria-hidden="true">
        <svg width="120" height="180" viewBox="0 0 120 180" fill="none">
          <path d="M45 10 L45 60 L20 140 Q15 160 35 170 L85 170 Q105 160 100 140 L75 60 L75 10" stroke="#f4632a" strokeWidth="2" fill="none" />
          <line x1="40" y1="10" x2="80" y2="10" stroke="#f4632a" strokeWidth="2" />
          <path d="M65 80 L80 100 L70 110 L85 130" stroke="#f4632a" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="45" cy="145" rx="8" ry="5" fill="rgba(244, 99, 42, 0.3)" />
          <ellipse cx="60" cy="150" rx="6" ry="3" fill="rgba(244, 99, 42, 0.2)" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto relative">
        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={fadeUp} transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            <TextReveal>You're Doing the Work. It's Not Working.</TextReveal>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={staggerContainerSlow}
          className="space-y-10 mb-16"
        >
          {[
            { title: "You're posting every day. Nothing's moving.", body: "It's time to film and you're staring at your notes app with nothing. You've been posting 3, 4, 5 times a week and the numbers barely move. Stuck in 200-view jail while creators half your size are blowing up. The advice says \"just keep posting.\" But posting without a plan isn't a strategy. It's a guess." },
            { title: "You've done the research. Still don't know what to post.", body: "You spend hours watching competitors, saving videos, studying hooks, trying to figure out what's working and why. But scrolling through their feed isn't going to tell you why it worked. You have screenshots. You don't have a strategy." },
            { title: "You don't know what you're doing wrong.", body: "You don't know why your last 10 videos flopped. You don't know if it's the format, the pacing, or the first three seconds. Nobody's told you. You just keep filming and hoping the next one hits." },
          ].map((item, i) => (
            <motion.div key={i} variants={slideFromLeft} className="hazard-stripe pl-4 sm:pl-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">{item.title}</h3>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={fadeUp} transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900">
            What if you knew <span className="bg-gradient-to-r from-content-coral to-content-coral-500 bg-clip-text text-transparent">exactly</span> what to post, and why it works?
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={fadeUp} transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <MagneticButton className="inline-block">
            <a
              href="/register"
              className="lab-bubbles group inline-flex items-center px-8 py-4 bg-gradient-to-r from-content-cta-dark to-content-cta rounded-xl font-semibold text-base text-white shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Show Me What I'm Missing
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </MagneticButton>
          <p className="text-sm text-slate-400 mt-3">Free content audit &middot; No credit card required</p>
        </motion.div>
      </div>
    </section>
  );
}
