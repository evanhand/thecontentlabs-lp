'use client';

import { useEffect, useRef } from 'react';
import { capture } from '@/lib/analytics';

interface Props {
  slug: string;
  category: string;
  title: string;
  readingTime: string;
}

const SCROLL_BUCKETS = [25, 50, 75, 100] as const;

export function BlogPostTracker({ slug, category, title, readingTime }: Props) {
  const firedScroll = useRef<Set<number>>(new Set());
  const firedView = useRef(false);

  useEffect(() => {
    if (firedView.current) return;
    firedView.current = true;
    capture('blog_post_viewed', { slug, category, title, reading_time: readingTime });
  }, [slug, category, title, readingTime]);

  useEffect(() => {
    function onScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      for (const bucket of SCROLL_BUCKETS) {
        if (pct >= bucket && !firedScroll.current.has(bucket)) {
          firedScroll.current.add(bucket);
          capture('blog_scroll_depth', { slug, depth_pct: bucket });
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;
      const article = anchor.closest('[data-blog-article]');
      if (!article) return;
      const href = anchor.getAttribute('href') || '';
      if (!href || href.startsWith('#')) return;

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPct = scrollable > 0
        ? Math.min(100, Math.round((window.scrollY / scrollable) * 100))
        : 0;

      if (href.startsWith('/register') || href.startsWith('/signup')) {
        capture('blog_cta_clicked', { slug, destination: 'register', href, scroll_pct: scrollPct });
      } else if (href.startsWith('/pricing')) {
        capture('blog_cta_clicked', { slug, destination: 'pricing', href, scroll_pct: scrollPct });
      } else if (href.startsWith('/features') || href.startsWith('/compare') || href.startsWith('/for') || href.startsWith('/studio')) {
        capture('blog_product_link_clicked', { slug, destination: href, scroll_pct: scrollPct });
      } else if (href.startsWith('/blog/')) {
        capture('blog_internal_link_clicked', { slug, target_slug: href.replace('/blog/', ''), scroll_pct: scrollPct });
      } else if (href.startsWith('http')) {
        capture('blog_external_link_clicked', { slug, href, scroll_pct: scrollPct });
      }
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [slug]);

  return null;
}
