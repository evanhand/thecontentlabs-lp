'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { fadeUp, popIn, staggerContainer, VIEWPORT_ONCE } from '@/lib/motionVariants';

const faqData = [
  { q: "Can't I just use ChatGPT for this?", a: "ChatGPT has never seen your videos or your numbers. We pull every video you post, timestamp it, score its traits and compare them against your own median. The Chemist answers from that, not from the internet's average advice." },
  { q: "Will this work for my niche?", a: "We've built strategies across 50+ niches, from fitness to finance to cooking to real estate. But we don't use templates. Your strategy is built from what's already going viral in your specific niche, with your specific competitors. If people are posting content in your space, we can break down exactly what's working." },
  { q: "Do I need a big following to start?", a: "Not at all. This is built for creators who are starting out or stuck. Manny went from zero to 30,000 followers with the strategy we gave him. You don't need a following to start. You need a plan." },
  { q: "Will the scripts sound like me?", a: "The Chemist writes from your own transcripts, so it has your phrasing, your pacing and the structure of your videos that worked. It's your voice with the tangents cut out." },
  { q: "What if I don't like it?", a: "The free plan is free for good: your numbers every week, three videos analyzed, 20 Chemist messages a month, no card. If you go paid and it's not for you, cancel in two clicks. No contracts." },
  { q: "How much does it cost?", a: "Free is $0 and stays that way. Starter is $19/month ($5 for your first month) and analyzes every video you post, with 4 competitors, a monthly strategy and a 30-day calendar. Pro is $39/month ($5 first month) with daily tracking, 6 competitors and a weekly refresh. Studio is $99/month for agencies. Yearly billing is two months free." },
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
