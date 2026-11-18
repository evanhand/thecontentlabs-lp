'use client';

import { ArrowRight } from 'lucide-react';
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
    <aside className="not-prose mt-12 mb-2">
      <div className="lab-card p-5 sm:p-6">
        <h3 className="font-heading text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-ink leading-tight mb-2">
          Stop reading. Start posting what works.
        </h3>
        <p className="text-body text-ink-2 mb-5 max-w-[60ch]">
          Get a 30-day content plan with full scripts, built from the videos
          actually performing in your niche. Free audit in 60 seconds, no card
          required.
        </p>
        <a
          href={`https://thecontentlabs.app/register?utm_source=blog&utm_medium=cta_card&utm_campaign=${slug}`}
          onClick={handleClick}
          className="group inline-flex items-center gap-2 h-11 px-5 bg-content-coral text-white rounded-[10px] text-sm font-medium no-underline transition-[background-color,transform] duration-150 hover:bg-content-coral/90 active:scale-[0.97]"
        >
          Get my free audit
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <p className="mt-3 text-meta text-ink-3">
          21,000+ videos analyzed · Free plan, no card
        </p>
      </div>
    </aside>
  );
}
