'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, VIEWPORT_ONCE } from '@/lib/motionVariants';

/**
 * Shared marketing section primitives (DESIGN.md, marketing addendum):
 * one container, one rhythm, one heading scale for every section.
 */
export const CONTAINER = 'max-w-6xl mx-auto px-4 sm:px-6';
export const H1 = 'font-heading text-[2.75rem] sm:text-7xl font-semibold tracking-[-0.04em] leading-[1.02] text-ink';
export const H2 = 'font-heading text-3xl sm:text-4xl font-semibold tracking-[-0.02em] leading-[1.1] text-ink';
export const LEAD = 'text-lg text-ink-2 max-w-[60ch]';

/** Product screenshots and the hero video frame all share this treatment. */
export const SCREEN_FRAME = 'rounded-2xl border border-line/[0.08] bg-surface shadow-raised overflow-hidden';

const BTN_BASE =
  'inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[10px] text-[15px] font-medium transition-[background-color,border-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas';
/** The one coral action per screen. */
export const BTN_PRIMARY = `${BTN_BASE} bg-content-coral text-white hover:bg-content-coral-600`;
/** White bordered button on canvas. */
export const BTN_SECONDARY = `${BTN_BASE} bg-surface text-ink border border-line/[0.14] hover:border-line/[0.24]`;

export function Section({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <div className={CONTAINER}>{children}</div>
    </section>
  );
}

/** Fades its children up 12px once when they enter the viewport. */
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  title,
  description,
  align = 'left',
}: {
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
}) {
  const centered = align === 'center';
  return (
    <div className={`mb-12 sm:mb-14 ${centered ? 'text-center' : ''}`}>
      <h2 className={`${H2} ${centered ? 'mx-auto' : ''} max-w-[22ch]`}>{title}</h2>
      {description && <p className={`${LEAD} mt-4 ${centered ? 'mx-auto' : ''}`}>{description}</p>}
    </div>
  );
}
