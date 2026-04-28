'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import { capture } from '@/lib/analytics';

interface BlogCTACardProps {
  slug: string;
}

export function BlogCTACard({ slug }: BlogCTACardProps) {
  const handleClick = () => {
    capture('blog_cta_clicked', {
      slug,
      position: 'end_of_post',
    });
  };

  return (
    <aside className="not-prose mt-10 mb-2">
      <div className="relative overflow-hidden rounded-3xl border border-content-coral/30 bg-gradient-to-br from-content-coral/[0.04] via-white to-content-cta/[0.06] p-7 sm:p-9">
        <div
          className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-content-coral/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-content-coral text-white text-[10px] font-mono uppercase tracking-[0.18em] font-bold mb-4">
            <Sparkles className="h-3 w-3" />
            Free audit
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-3">
            Stop reading. Start posting what works.
          </h3>
          <p className="text-base text-slate-600 leading-relaxed mb-6 max-w-xl">
            Get a 30-day content plan with full scripts, built from the videos
            actually performing in your niche. Free audit in 60 seconds, no card
            required.
          </p>
          <a
            href={`https://thecontentlabs.app/register?utm_source=blog&utm_medium=cta_card&utm_campaign=${slug}`}
            onClick={handleClick}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-content-cta-dark to-content-cta text-white rounded-xl font-bold shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all hover:scale-[1.02] active:scale-95"
          >
            Get my free audit
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-3 text-xs text-slate-400">
            Trusted by 47,598 creators · Cancel anytime
          </p>
        </div>
      </div>
    </aside>
  );
}
