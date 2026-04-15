'use client';

import { motion } from 'framer-motion';
import { Rocket, ArrowRight, Shield, Check } from 'lucide-react';
import { TextReveal } from '@/components/ui/TextReveal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { HexMolecule } from '@/components/ui/HexMolecule';
import { fadeUp, scaleIn, staggerContainer, VIEWPORT_ONCE } from '@/lib/motionVariants';

export function FinalCTA() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10">
      <AuroraBackground variant="cta" />
      <HexMolecule size={80} className="absolute left-[10%] top-[20%] opacity-[0.05] animate-float pointer-events-none" />
      <HexMolecule size={50} className="absolute right-[15%] top-[30%] opacity-[0.06] animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
      <HexMolecule size={60} className="absolute left-[20%] bottom-[15%] opacity-[0.04] animate-float pointer-events-none" style={{ animationDelay: '4s' }} />

      <motion.div
        initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
        variants={staggerContainer}
        className="max-w-4xl mx-auto text-center relative"
      >
        <motion.h2 variants={fadeUp} transition={{ duration: 0.7 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
          <TextReveal>Your Content Formula Is Ready</TextReveal>
        </motion.h2>
        <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Every week without a strategy is another week of posting into the void. Join Jen, Matt, and Manny - they stopped guessing and look what happened.
        </motion.p>

        {/* Trust bar */}
        <motion.div variants={scaleIn} transition={{ duration: 0.6 }} className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 px-5 py-3 sm:px-6 bg-content-coral-500/5 backdrop-blur-sm rounded-xl border border-content-coral-500/15 mb-10">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-content-coral-600" />
            <span className="text-content-coral-700 text-sm font-medium">Free content audit in minutes</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-slate-300"></div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-content-coral-600" />
            <span className="text-slate-600 text-sm">Cancel anytime</span>
          </div>
        </motion.div>

        <motion.div variants={scaleIn} className="block">
          <MagneticButton className="inline-block">
            <a
              href="/register"
              className="lab-bubbles group inline-flex items-center px-6 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-content-cta-dark to-content-cta rounded-xl font-bold text-base sm:text-lg text-white shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all duration-300 hover:scale-105 active:scale-95 animate-progress-glow"
            >
              <span className="flex items-center">
                <Rocket className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                Get Your Free Audit
                <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </MagneticButton>
        </motion.div>

        {/* Experiment parameters */}
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="mt-8 inline-block bg-white/80 border border-slate-200 rounded-lg px-4 py-2.5 sm:px-6 sm:py-3">
          <p className="font-mono text-[10px] sm:text-xs text-slate-500 tracking-wide">
            <span className="hidden sm:inline">30-day plan&nbsp;&nbsp;|&nbsp;&nbsp;Built for your niche&nbsp;&nbsp;|&nbsp;&nbsp;Full scripts + hooks&nbsp;&nbsp;|&nbsp;&nbsp;From $39/mo</span>
            <span className="sm:hidden">30-day plan · Full scripts · From $39/mo</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
