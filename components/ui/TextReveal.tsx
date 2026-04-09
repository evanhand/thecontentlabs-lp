'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';

export function TextReveal({ children, className = '' }: { children: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const words = children.split(' ');
  const isMobile = useIsMobile();

  // On mobile, render plain text — animating each word with blur filter kills the CPU
  if (isMobile) return <span className={className}>{children}</span>;

  return (
    <span ref={ref} className={`inline ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          // Start VISIBLE (opacity: 1) so Lighthouse sees content on first paint.
          // Animation still runs via y and blur transforms for the reveal effect.
          initial={{ opacity: 1, y: 12, filter: 'blur(6px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 12,
            delay: i * 0.04,
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </span>
  );
}
