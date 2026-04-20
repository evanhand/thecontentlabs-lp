'use client';

import { motion } from 'framer-motion';
import { Rocket, ArrowRight, Shield, Check } from 'lucide-react';
import { TextReveal } from '@/components/ui/TextReveal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { HexMolecule } from '@/components/ui/HexMolecule';
import { fadeUp, scaleIn, staggerContainer, VIEWPORT_ONCE } from '@/lib/motionVariants';

export function FinalCTA() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
          className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 px-6 py-16 sm:px-16 sm:py-24 overflow-hidden border border-slate-800 shadow-2xl shadow-slate-900/40"
        >
          <div
            aria-hidden
            className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-content-coral/30 blur-[120px] pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-amber-400/20 blur-[120px] pointer-events-none"
          />
          <HexMolecule size={80} className="absolute left-[8%] top-[18%] opacity-[0.08] animate-float pointer-events-none" />
          <HexMolecule size={50} className="absolute right-[10%] top-[28%] opacity-[0.1] animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
          <HexMolecule size={60} className="absolute left-[18%] bottom-[12%] opacity-[0.06] animate-float pointer-events-none" style={{ animationDelay: '4s' }} />

          <div className="relative text-center max-w-3xl mx-auto">
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 tracking-tight leading-[1.05]"
            >
              <TextReveal>Your Content Formula Is Ready</TextReveal>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Every week without a strategy is another week of posting into the void. Join Jen, Matt, and Manny - they stopped guessing and look what happened.
            </motion.p>

            <motion.div
              variants={scaleIn}
              transition={{ duration: 0.6 }}
              className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 px-5 py-3 sm:px-6 bg-white/[0.06] backdrop-blur-sm rounded-xl border border-white/10 mb-10"
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-content-coral-400" />
                <span className="text-slate-200 text-sm font-medium">Free content audit in minutes</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-white/20"></div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-content-coral-400" />
                <span className="text-slate-300 text-sm">Cancel anytime</span>
              </div>
            </motion.div>

            <motion.div variants={scaleIn} className="block">
              <MagneticButton className="inline-block">
                <a
                  href="/register"
                  className="lab-bubbles group inline-flex items-center px-8 py-5 sm:px-12 sm:py-6 bg-gradient-to-r from-content-cta-dark to-content-cta rounded-2xl font-bold text-lg sm:text-xl text-white shadow-xl shadow-content-coral/40 hover:shadow-2xl hover:shadow-content-coral/60 transition-all duration-300 hover:scale-105 active:scale-95 animate-progress-glow"
                >
                  <span className="flex items-center">
                    <Rocket className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                    Get Your Free Audit
                    <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </MagneticButton>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mt-10 inline-block bg-white/[0.06] border border-white/10 rounded-lg px-4 py-2.5 sm:px-6 sm:py-3"
            >
              <p className="font-mono text-[10px] sm:text-xs text-slate-400 tracking-wide">
                <span className="hidden sm:inline">30-day plan&nbsp;&nbsp;|&nbsp;&nbsp;Built for your niche&nbsp;&nbsp;|&nbsp;&nbsp;Full scripts + hooks&nbsp;&nbsp;|&nbsp;&nbsp;From $39/mo</span>
                <span className="sm:hidden">30-day plan · Full scripts · From $39/mo</span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
