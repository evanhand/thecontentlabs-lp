'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, TestTube2, LineChart, Atom, Check, ArrowRight } from 'lucide-react';
import { HexMolecule } from '@/components/ui/HexMolecule';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { fadeUp, popIn, staggerContainer, VIEWPORT_ONCE } from '@/lib/motionVariants';

const FEATURES = [
  { title: "See Exactly Why Their Videos Go Viral", description: "Pick any competitor. We'll break down their top-performing content and show you the hooks, formats, and patterns driving their growth so you can use the same formula.", icon: Microscope, benefit: "Know what works before you hit record", tag: "COMPETITOR BREAKDOWN", monitorLabel: "competitor_analysis", wide: true, image: "/features/competitor-analysis.jpg" },
  { title: "Never Stare at a Blank Screen Again", description: "Get a full month of content planned for you, complete with hooks, scripts, and posting schedule. Every piece is built from what's already proven in your niche.", icon: TestTube2, benefit: "End creative block forever", tag: "CONTENT CALENDAR", monitorLabel: "content_calendar", wide: false, image: "/features/content-calendar.jpg" },
  { title: "Know What's Growing and What's Not", description: "See which of your videos are actually driving followers and engagement, which formats are working, and where to double down.", icon: LineChart, benefit: "Stop guessing, start seeing what's actually working", tag: "YOUR ANALYTICS", monitorLabel: "content_analytics", wide: false, image: "/features/analytics.jpg" },
  { title: "Ask Anything. Get Real Answers.", description: "The Chemist knows your niche, your content history, and your competitors. Ask it what to post next, why a video flopped, or how to write a better hook. It's like having a strategist on call 24/7.", icon: Atom, benefit: "Get unstuck in seconds, not hours", tag: "THE CHEMIST", monitorLabel: "the_chemist", wide: true, image: "/features/chemist.jpg" },
];

export function Features() {
  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10 bg-slate-950">
      <HexMolecule size={200} className="absolute -right-16 top-32 opacity-[0.05] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={fadeUp} transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            What You Get
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Everything you need to know what to post, why it works, and how to grow.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              variants={popIn}
              className={`group relative bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-white/[0.08] overflow-hidden hover:shadow-lg hover:shadow-content-coral/10 hover:border-content-coral/20 transition-all duration-300 ${feature.wide ? 'lg:col-span-2' : 'lg:col-span-1'}`}
            >
              {/* Scan line effect */}
              <div className="lab-readout-scan absolute inset-0 rounded-2xl pointer-events-none z-20" />
              <div className="p-6 relative">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-content-coral animate-pulse" />
                  <span className="font-mono text-xs tracking-wider text-content-coral-400 uppercase">{feature.tag}</span>
                </div>

                {/* Product screenshot */}
                <div className="lab-monitor-frame-dark shadow-sm mb-5 group-hover:shadow-md group-hover:shadow-content-coral/5 transition-shadow duration-300">
                  <div className="lab-monitor-bar-dark">
                    <span className="lab-monitor-dot bg-red-500/60" />
                    <span className="lab-monitor-dot bg-amber-500/60" />
                    <span className="lab-monitor-dot bg-green-500/60" />
                    <span className="font-mono text-[10px] text-slate-500 ml-2 tracking-wider">{feature.monitorLabel}</span>
                  </div>
                  <div className="overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-cover object-top max-h-[340px]"
                    />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{feature.description}</p>
                <p className="text-content-coral-400 text-sm font-medium flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-content-coral-500/15">
                    <Check className="h-3 w-3 text-content-coral-400" />
                  </span>
                  {feature.benefit}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={fadeUp} transition={{ duration: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <MagneticButton className="inline-block">
            <a
              href="/register"
              className="lab-bubbles group inline-flex items-center px-8 py-4 bg-gradient-to-r from-content-cta-dark to-content-cta rounded-xl font-semibold text-base text-white shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Try It Free - See Your Audit
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
