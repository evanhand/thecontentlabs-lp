'use client';

import { useRef, useState, useEffect } from 'react';
import { useSpring, useInView } from 'framer-motion';

export function AnimatedCounter({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const springVal = useSpring(0, { stiffness: 30, damping: 20 });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (isInView) springVal.set(end);
  }, [isInView, end, springVal]);

  useEffect(() => {
    const unsub = springVal.on('change', (v) => {
      setDisplay(Math.round(v).toLocaleString());
    });
    return unsub;
  }, [springVal]);

  return <span ref={ref}>{display}{suffix}</span>;
}
