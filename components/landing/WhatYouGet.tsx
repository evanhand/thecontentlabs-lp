'use client';

import { motion } from 'framer-motion';
import { LineChart, Microscope, Atom } from 'lucide-react';
import { fadeUp, popIn, staggerContainer, VIEWPORT_ONCE } from '@/lib/motionVariants';

// Three things, no mockups. Each card is the plain claim and one line of
// what it looks like in the product. Screenshots can replace the
// placeholder comments once real captures exist.
const ITEMS = [
  {
    tag: 'Your numbers',
    title: 'Weekly numbers on your own videos',
    description:
      'Views, likes, comments, shares and follower change on every video you post, tracked week over week. One page, no spreadsheet.',
    example: 'Which of last week\'s posts actually moved followers, and by how much.',
    icon: LineChart,
  },
  {
    tag: 'Why this one did what it did',
    title: 'A beat map for every video',
    description:
      'Every video gets timestamped: hook, setup, build, payoff, CTA, and where people are most likely to swipe. Then we compare traits across all of them so you learn what wins for you, not for some average creator.',
    example: 'Payoff at 40 to 60 seconds, no tangents, heavy on-screen text: 3x your median.',
    icon: Microscope,
  },
  {
    tag: 'The Chemist',
    title: 'The next one, written in your voice',
    description:
      'The Chemist knows your niche, your pillars, your voice and your numbers. Ask it what to post, why a video flopped, or to write the script for the next one.',
    example: '"Write the next version of my best video, same structure, new story."',
    icon: Atom,
  },
];

export function WhatYouGet() {
  return (
    <section id="what-you-get" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={fadeUp} transition={{ duration: 0.7 }}
          className="max-w-2xl mb-14"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-content-coral mb-3">What you get</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight leading-[1.05]">
            Research on other people&rsquo;s videos is a start. This is research on yours.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {ITEMS.map((item) => (
            <motion.div
              key={item.tag}
              variants={popIn}
              className="relative rounded-2xl bg-slate-900 border border-white/[0.08] p-6 sm:p-7 flex flex-col"
            >
              {/* SCREENSHOT SLOT: real product capture for "{item.tag}" goes here when available. */}
              <div className="flex items-center gap-2 mb-5">
                <item.icon className="h-4 w-4 text-content-coral" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">{item.tag}</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-semibold text-white tracking-tight leading-tight mb-3">
                {item.title}
              </h3>
              <p className="text-slate-400 text-[15px] leading-relaxed mb-6">{item.description}</p>
              <p className="mt-auto border-l-2 border-content-coral/60 pl-3 text-sm text-slate-300 leading-relaxed">
                {item.example}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
