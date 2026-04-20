'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { fadeUp, popIn, staggerContainer, VIEWPORT_ONCE } from '@/lib/motionVariants';

const faqData = [
  { q: "Can't I just use ChatGPT for this?", a: "You can try. But ChatGPT doesn't know your content history, your niche, or your competitors. It's never seen your analytics. We pull real performance data from your account and your competitors' accounts, then build your strategy from what's actually working. That's not something a generic chatbot can do." },
  { q: "Will this work for my niche?", a: "We've built strategies across 50+ niches, from fitness to finance to cooking to real estate. But we don't use templates. Your strategy is built from what's already going viral in your specific niche, with your specific competitors. If people are posting content in your space, we can break down exactly what's working." },
  { q: "Do I need a big following to start?", a: "Not at all. This is built for creators who are starting out or stuck. Manny went from zero to 30,000 followers with the strategy we gave him. You don't need a following to start. You need a plan." },
  { q: "Will the scripts sound like me?", a: "We give you the structure, the hooks, the flow, and the CTA, all built from what's working in your niche. You bring your voice and your personality. Think of it like getting a brief from a strategist who's studied your niche inside out. You still show up as you." },
  { q: "What if I don't like it?", a: "Cancel anytime. No contracts. No questions asked. Start with a free content audit to see what we deliver - no credit card needed. If it's not for you after subscribing, two clicks and you're out." },
  { q: "How much does it cost?", a: "Plans start at $39/month for the Starter plan, which includes video audits, competitor analysis, full strategy generation, a 30-day content calendar with scripts, and access to The Chemist AI. The Pro plan is $79/month with higher limits, and Studio is $129/month for teams and agencies. Save 17% with annual billing. No contracts, cancel anytime." },
  { q: "How is this different from other content tools?", a: "Most content tools give you a list of topic ideas and call it a day. We give you full scripts with hooks, CTAs, emotional flow, and pacing, all built from real data on what's actually performing in your niche. We also break down your competitors' best videos so you can see exactly why they went viral. It's the difference between \"post about trending topics\" and \"here's your script, here's the hook, here's why it works.\"" },
];

export function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10 bg-gradient-to-b from-white via-content-coral/[0.04] to-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={fadeUp} transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4 tracking-tight">
            Still Have Questions?
          </h2>
          <p className="text-xl text-slate-600">
            We get it. Here&apos;s the straight answer.
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
          className="space-y-3"
        >
          {faqData.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <motion.div key={index} variants={popIn}>
                <div className={`bg-white/90 backdrop-blur-sm rounded-xl border overflow-hidden transition-all duration-300 ${isOpen ? 'border-content-coral/40 shadow-lg shadow-content-coral/10' : 'border-slate-200 hover:shadow-sm hover:border-slate-300'}`}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between cursor-pointer p-5 sm:p-6 text-left font-bold text-slate-900 hover:text-content-coral transition-colors group"
                  >
                    <span className="pr-4">{item.q}</span>
                    <span
                      aria-hidden="true"
                      className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                        isOpen
                          ? 'bg-content-coral/15 text-content-coral rotate-90 scale-110'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-content-coral/10 group-hover:text-content-coral'
                      }`}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </button>
                  <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                    <div>
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 text-[15px] leading-relaxed">{item.a}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
