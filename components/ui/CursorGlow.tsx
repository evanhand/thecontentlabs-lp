'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';

export function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(244, 99, 42, 0.07) 0%, rgba(244, 99, 42, 0.02) 40%, transparent 70%)',
        }}
      />
    </div>
  );
}
