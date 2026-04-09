'use client';

import { useState, useEffect, useRef } from 'react';

export function MarqueeRow({ urls, direction }: { urls: string[]; direction: 'left' | 'right' }) {
  const doubled = [...urls, ...urls];
  const rowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={rowRef} className="overflow-hidden">
      <div
        className={`flex gap-3 w-max ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{ willChange: 'transform', animationPlayState: isVisible ? 'running' : 'paused' }}
      >
        {doubled.map((url, i) => (
          <div
            key={`${url}-${i}`}
            className="w-28 h-40 sm:w-32 sm:h-44 flex-shrink-0 rounded-xl overflow-hidden border border-content-coral-200/40 bg-slate-100"
          >
            <img
              src={url}
              alt=""
              loading="lazy"
              decoding="async"
              width={128}
              height={176}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
