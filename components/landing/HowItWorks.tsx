'use client';

import { motion } from 'framer-motion';
import { Target, Microscope, Brain } from 'lucide-react';
import { HoverBubbles } from '@/components/ui/HoverBubbles';
import { TextReveal } from '@/components/ui/TextReveal';
import { fadeUp, slideFromLeft, slideFromRight, staggerContainer, VIEWPORT_ONCE } from '@/lib/motionVariants';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10 bg-slate-950"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(244,99,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(244,99,42,0.03) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={fadeUp} transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4 tracking-tight">
            <TextReveal>We Do the Research. You Hit Record.</TextReveal>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Connect your accounts, tell us your niche, and we'll hand you a complete content plan with full scripts.
          </p>
        </motion.div>

        {/* Vertical pipeline */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[3px] md:-translate-x-[1.5px] bg-content-coral shadow-[0_0_12px_rgba(244,99,42,0.4),0_0_24px_rgba(244,99,42,0.2)]"
          />

          {[
            { step: "01", element: "In", title: "Tell Us About You", description: "Connect your TikTok and Instagram and tell us your niche, goals, and content style.", icon: Target, borderColor: 'border-content-coral/30', bgColor: 'bg-content-coral/5', textColor: 'text-content-coral', dotColor: 'bg-content-coral' },
            { step: "02", element: "An", title: "We Do the Research", description: "We audit your content and break down your competitors' best videos to find what's actually working and why.", icon: Microscope, borderColor: 'border-content-coral-500/30', bgColor: 'bg-content-coral-500/5', textColor: 'text-content-coral-600', dotColor: 'bg-content-coral-500' },
            { step: "03", element: "Rs", title: "Get Your Plan", description: "Get a personalized content strategy and 30-day calendar with full scripts, hooks, and CTAs. You just hit record.", icon: Brain, borderColor: 'border-content-coral/30', bgColor: 'bg-content-coral/5', textColor: 'text-content-coral', dotColor: 'bg-content-coral' },
          ].map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
                variants={isEven ? slideFromLeft : slideFromRight}
                className="relative flex items-start mb-12 last:mb-0"
              >
                {/* Node on pipeline */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <span className={`absolute inset-0 rounded-full ${step.dotColor} opacity-40 blur-md animate-pulse`} />
                  <div className={`relative w-6 h-6 rounded-full ${step.dotColor} border-4 border-slate-950 shadow-[0_0_14px_rgba(244,99,42,0.7)]`} />
                </div>

                {/* Card */}
                <div className={`ml-16 md:ml-0 md:w-[45%] ${isEven ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                  <div className="group relative bg-slate-900 rounded-2xl p-6 border border-white/10 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-content-coral/10 hover:border-content-coral/30 transition-all duration-300 hover:-translate-y-1">
                    <div className="absolute inset-0 rounded-2xl opacity-[0.02] dot-grid-texture pointer-events-none" />
                    <HoverBubbles />
                    <div className="flex items-start gap-4 relative">
                      <div className={`flex-shrink-0 w-12 h-12 flex flex-col items-center justify-center border-2 ${step.borderColor} rounded-lg ${step.bgColor}`}>
                        <span className={`text-sm font-bold ${step.textColor} leading-none`}>{step.step}</span>
                        <span className={`text-[10px] font-mono font-bold ${step.textColor} leading-none mt-0.5`}>{step.element}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <step.icon className={`h-4 w-4 ${step.textColor}`} />
                          <h3 className="text-lg font-bold text-white">{step.title}</h3>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
