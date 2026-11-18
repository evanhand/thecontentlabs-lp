'use client';

import { motion } from 'framer-motion';
import { LineChart, Microscope, Atom } from 'lucide-react';
import { fadeUp, popIn, staggerContainer, VIEWPORT_ONCE } from '@/lib/motionVariants';

// Three things, each with a real capture of the product above the claim.
const ITEMS = [
  {
    tag: 'Your numbers',
    title: 'Weekly numbers on your own videos',
    description:
      'Views, likes, comments, shares and follower change on every video you post, tracked week over week. One page, no spreadsheet.',
    example: 'Which of last week\'s posts actually moved followers, and by how much.',
    icon: LineChart,
    image: '/screens/dashboard.png',
    alt: 'The dashboard: followers across handles, the latest lab note, and three next moves',
  },
  {
    tag: 'Why this one did what it did',
    title: 'A beat map for every video',
    description:
      'Every video gets timestamped: hook, setup, build, payoff, CTA, and where people are most likely to swipe. Then we compare traits across all of them so you learn what wins for you, not for some average creator.',
    example: 'Payoff at 40 to 60 seconds, no tangents, heavy on-screen text: 3x your median.',
    icon: Microscope,
    image: '/screens/beat-map.png',
    alt: 'A beat map: hook, setup, build, payoff and CTA on a timeline, with the two moments viewers are most likely to swipe',
  },
  {
    tag: 'The Chemist',
    title: 'The next one, written in your voice',
    description:
      'The Chemist knows your niche, your pillars, your voice and your numbers. Ask it what to post, why a video flopped, or to write the script for the next one.',
    example: '"Write the next version of my best video, same structure, new story."',
    icon: Atom,
    image: '/screens/chemist.png',
    alt: 'The Chemist: write the next script, five hooks, or cook an idea, with today\'s post already suggested',
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
              <div className="-mx-6 -mt-6 sm:-mx-7 sm:-mt-7 mb-6 overflow-hidden rounded-t-2xl border-b border-white/[0.08] bg-slate-950">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-44 sm:h-52 object-cover object-top"
                />
              </div>
              <div className="flex items-center gap-2 mb-5">
                <item.icon className="h-4 w-4 text-content-coral" />
                <span className="text-xs font-medium text-slate-300">{item.tag}</span>
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
