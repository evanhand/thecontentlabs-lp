'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { capture } from '@/lib/analytics';

interface StickyMobileCTAProps {
  /** Element id to observe; the bar appears once this element scrolls out of view. */
  watchId?: string;
}

export function StickyMobileCTA({ watchId = 'hero-section' }: StickyMobileCTAProps) {
  const [visible, setVisible] = useState(false);
  const [registerHref, setRegisterHref] = useState('https://thecontentlabs.app/register');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.search.length > 1) {
      setRegisterHref(`https://thecontentlabs.app/register${window.location.search}`);
    }

    const target = document.getElementById(watchId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // show when the watched section has scrolled (mostly) out of view
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-40% 0px 0px 0px' },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [watchId]);

  const handleClick = () => {
    capture('landing_cta_clicked', {
      position: 'sticky_mobile',
      from_prealgo: typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('utm_source') === 'prealgo',
    });
  };

  return (
    <div
      aria-hidden={!visible}
      className={`sm:hidden fixed inset-x-0 bottom-0 z-40 px-3 pb-3 pt-2 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        visible ? 'translate-y-0' : 'translate-y-full pointer-events-none'
      }`}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="rounded-2xl bg-surface border border-line/[0.08] shadow-raised flex items-center gap-3 p-2.5">
        <div className="flex-1 min-w-0 pl-2">
          <p className="text-meta font-medium text-ink">Start free, no card</p>
          <p className="text-xs text-ink-3">60 seconds &middot; No card</p>
        </div>
        <a
          href={registerHref}
          onClick={handleClick}
          className="inline-flex items-center gap-1.5 h-11 px-4 bg-content-coral text-white rounded-[10px] font-medium text-sm active:scale-[0.97] transition-transform duration-150"
          tabIndex={visible ? 0 : -1}
        >
          Start free
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
