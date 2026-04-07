'use client';

import React, { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';

export function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const isMobile = useIsMobile();
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);

  const smoothRotateX = useSpring(rotateX, { stiffness: 150, damping: 15 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 150, damping: 15 });
  const smoothScale = useSpring(scale, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 8);
    rotateX.set(-y * 8);
    scale.set(1.02);
  }, [rotateX, rotateY, scale]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  }, [rotateX, rotateY, scale]);

  // 3D tilt is a desktop hover effect — skip all the spring physics on mobile
  if (isMobile) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        scale: smoothScale,
        perspective: 800,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
