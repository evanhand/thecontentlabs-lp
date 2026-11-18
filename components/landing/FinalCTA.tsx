'use client';

import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, VIEWPORT_ONCE } from '@/lib/motionVariants';
import { BTN_PRIMARY, CONTAINER } from '@/components/landing/Section';

/**
 * The page's single navy band (DESIGN.md: one per page). Used as the closing
 * CTA on home, pricing and compare so every page ends the same way.
 */
export function FinalCTA({
  title = 'Your next video is already in your last ten.',
  body = 'Connect your handles and the free plan starts tracking today. Three videos analyzed by tonight, your numbers every week after that.',
  ctaLabel = 'Start free',
  ctaHref = '/register',
  onCtaClick,
  secondary,
  footnote = 'Free plan, no card · Cancel anytime · Paid from $19/mo, $5 first month',
}: {
  title?: ReactNode;
  body?: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  secondary?: { label: string; href: string };
  footnote?: ReactNode;
}) {
  return (
    <section className="bg-content-navy py-20 sm:py-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={fadeUp}
        className={`${CONTAINER} text-center`}
      >
        <h2 className="font-heading text-3xl sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.08] text-white max-w-[20ch] mx-auto">
          {title}
        </h2>
        <p className="mt-5 text-lg text-white/70 max-w-[60ch] mx-auto">{body}</p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
          <a href={ctaHref} onClick={onCtaClick} className={`${BTN_PRIMARY} focus-visible:ring-offset-content-navy`}>
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </a>
          {secondary && (
            <a
              href={secondary.href}
              className="inline-flex items-center justify-center h-12 px-6 rounded-[10px] border border-white/15 text-[15px] font-medium text-white hover:border-white/30 transition-colors duration-150"
            >
              {secondary.label}
            </a>
          )}
        </div>

        {footnote && <p className="mt-6 text-meta text-white/55">{footnote}</p>}
      </motion.div>
    </section>
  );
}
