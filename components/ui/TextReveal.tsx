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
          // Subtle y translate only — no blur, which caused visible artifacts
          // when combined with opacity: 1 (blur was always showing).
          initial={{ opacity: 1, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 16,
            delay: i * 0.03,
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </span>
  );
}
