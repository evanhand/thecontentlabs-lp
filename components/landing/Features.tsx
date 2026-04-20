'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, TestTube2, LineChart, Atom, Check, ArrowRight } from 'lucide-react';
import { HexMolecule } from '@/components/ui/HexMolecule';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { fadeUp, popIn, staggerContainer, VIEWPORT_ONCE } from '@/lib/motionVariants';

const FEATURES = [
  { title: "See Exactly Why Their Videos Go Viral", description: "Pick any competitor. We'll break down their top-performing content and show you the hooks, formats, and patterns driving their growth so you can use the same formula.", icon: Microscope, benefit: "Know what works before you hit record", tag: "COMPETITOR BREAKDOWN", monitorLabel: "competitor_analysis", image: "/features/competitor-analysis.jpg" },
  { title: "Never Stare at a Blank Screen Again", description: "Get a full month of content planned for you, complete with hooks, scripts, and posting schedule. Every piece is built from what's already proven in your niche.", icon: TestTube2, benefit: "End creative block forever", tag: "CONTENT CALENDAR", monitorLabel: "content_calendar", image: "/features/content-calendar.jpg" },
  { title: "Know What's Growing and What's Not", description: "See which of your videos are actually driving followers and engagement, which formats are working, and where to double down.", icon: LineChart, benefit: "Stop guessing, start seeing what's actually working", tag: "YOUR ANALYTICS", monitorLabel: "content_analytics", image: "/features/analytics.jpg" },
  { title: "Ask Anything. Get Real Answers.", description: "The Chemist knows your niche, your content history, and your competitors. Ask it what to post next, why a video flopped, or how to write a better hook. It's like having a strategist on call 24/7.", icon: Atom, benefit: "Get unstuck in seconds, not hours", tag: "THE CHEMIST", monitorLabel: "the_chemist", image: "/features/chemist.jpg" },
];

const [featured, ...rest] = FEATURES;

export function Features() {
  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10 bg-slate-950">
      <HexMolecule size={200} className="absolute -right-16 top-32 opacity-[0.05] pointer-events-none" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-content-coral/10 blur-[140px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={fadeUp} transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4 tracking-tight">
            What You Get
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Everything you need to know what to post, why it works, and how to grow.
          </p>
        </motion.div>

        {/* Bento: featured card + 3 tiles */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 auto-rows-auto gap-5"
        >
          {/* Featured (Competitor Breakdown) — spans 7 cols × 2 rows on desktop */}
          <motion.div
            variants={popIn}
            className="lg:col-span-7 lg:row-span-2 group relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-2xl border border-white/[0.08] overflow-hidden hover:shadow-xl hover:shadow-content-coral/10 hover:border-content-coral/30 transition-all duration-300"
          >
            <div
              aria-hidden
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-content-coral/20 blur-[100px] group-hover:bg-content-coral/30 transition-colors"
            />
            <div className="lab-readout-scan absolute inset-0 rounded-2xl pointer-events-none z-20" />
            <div className="relative p-6 sm:p-8 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-content-coral/15 border border-content-coral/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-content-coral animate-pulse" />
                  <span className="font-mono text-[10px] tracking-wider text-content-coral-400 uppercase font-bold">
                    Featured
                  </span>
                </span>
                <span className="font-mono text-xs tracking-wider text-content-coral-400 uppercase">
                  {featured.tag}
                </span>
              </div>

              <div className="lab-monitor-frame-dark shadow-sm mb-5 group-hover:shadow-lg group-hover:shadow-content-coral/10 transition-shadow duration-300">
                <div className="lab-monitor-bar-dark">
                  <span className="lab-monitor-dot bg-red-500/60" />
                  <span className="lab-monitor-dot bg-amber-500/60" />
                  <span className="lab-monitor-dot bg-green-500/60" />
                  <span className="font-mono text-[10px] text-slate-500 ml-2 tracking-wider">{featured.monitorLabel}</span>
                </div>
                <div className="overflow-hidden h-[240px] sm:h-[340px] lg:h-[400px]">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3 tracking-tight leading-tight">
                {featured.title}
              </h3>
              <p className="text-slate-400 text-[15px] mb-5 leading-relaxed">
                {featured.description}
              </p>
              <p className="text-content-coral-400 text-sm font-medium flex items-center gap-2 mt-auto">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-content-coral-500/15">
                  <Check className="h-3 w-3 text-content-coral-400" />
                </span>
                {featured.benefit}
              </p>
            </div>
          </motion.div>

          {/* Tiles: 2 stacked (right side) + 1 full-width (bottom) */}
          {rest.map((feature, index) => {
            const isFullWidth = index === rest.length - 1;
            return (
              <motion.div
                key={feature.tag}
                variants={popIn}
                className={`${isFullWidth ? 'lg:col-span-12' : 'lg:col-span-5'} group relative bg-slate-900 rounded-2xl border border-white/[0.08] overflow-hidden hover:shadow-lg hover:shadow-content-coral/5 hover:border-content-coral/25 transition-all duration-300`}
              >
                <div className={`relative ${isFullWidth ? 'flex flex-col lg:flex-row' : ''}`}>
                  <div className={`${isFullWidth ? 'lg:w-1/2 lg:order-2 flex-shrink-0' : ''}`}>
                    <div className="lab-monitor-frame-dark shadow-sm">
                      <div className="lab-monitor-bar-dark">
                        <span className="lab-monitor-dot bg-red-500/60" />
                        <span className="lab-monitor-dot bg-amber-500/60" />
                        <span className="lab-monitor-dot bg-green-500/60" />
                        <span className="font-mono text-[10px] text-slate-500 ml-2 tracking-wider">{feature.monitorLabel}</span>
                      </div>
                      <div className={`overflow-hidden ${isFullWidth ? 'h-[220px] lg:h-[260px]' : 'h-[180px] sm:h-[200px]'}`}>
                        <img
                          src={feature.image}
                          alt={feature.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`p-5 sm:p-6 ${isFullWidth ? 'lg:w-1/2 lg:order-1 lg:flex lg:flex-col lg:justify-center' : ''}`}>
                    <span className="inline-block font-mono text-[10px] tracking-wider text-content-coral-400 uppercase mb-2">
                      {feature.tag}
                    </span>
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-white mb-2 tracking-tight leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-3 leading-relaxed">
                      {feature.description}
                    </p>
                    <p className="text-content-coral-400 text-xs font-medium flex items-center gap-2">
                      <span className="flex items-center justify-center w-4 h-4 rounded-full bg-content-coral-500/15">
                        <Check className="h-2.5 w-2.5 text-content-coral-400" />
                      </span>
                      {feature.benefit}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Secondary inline CTA — less loud than primary button to avoid button fatigue */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={fadeUp} transition={{ duration: 0.6 }}
          className="mt-14 flex justify-center"
        >
          <a
            href="/register"
            className="group inline-flex items-center gap-2 text-slate-300 hover:text-white text-sm font-medium border border-white/10 hover:border-content-coral/40 rounded-full px-5 py-2.5 transition-all backdrop-blur"
          >
            Try It Free - See Your Audit
            <ArrowRight className="h-4 w-4 text-content-coral group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
