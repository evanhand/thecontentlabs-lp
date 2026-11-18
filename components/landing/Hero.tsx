'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { capture } from '@/lib/analytics';
import { BTN_PRIMARY, CONTAINER, H1, SCREEN_FRAME } from '@/components/landing/Section';

const PERSONAS = [
  { label: 'UGC creators', href: '/for/ugc-creators' },
  { label: 'Coaches', href: '/for/coaches' },
  { label: 'E-commerce brands', href: '/for/ecommerce' },
  { label: 'Personal brands', href: '/for/personal-brands' },
  { label: 'Small businesses', href: '/for/small-businesses' },
];

const HERO_CHIPS = [
  { image: '/testimonials/jen-thompson.jpg', name: 'Jen T.', stat: '+60K followers' },
  { image: '/testimonials/manny-watkins.jpg', name: 'Manny W.', stat: '0 to 30K+' },
  { image: '/testimonials/matt-gehlbach.jpg', name: 'Matt G.', stat: '+10K in 2mo' },
];

export function Hero() {
  // Read query string after mount so the page can stay static. There's a brief
  // flash of the default headline for prealgo visitors, but the alternative is
  // useSearchParams + a Suspense boundary that breaks SSG.
  const [fromPrealgo, setFromPrealgo] = useState(false);
  const [registerHref, setRegisterHref] = useState('https://thecontentlabs.app/register');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const search = window.location.search;
    const params = new URLSearchParams(search);
    setFromPrealgo(params.get('utm_source') === 'prealgo');
    if (search.length > 1) {
      // Pass utm + ph_distinct_id through so attribution + cross-app identity
      // stitching survive the jump to /register on the dashboard.
      setRegisterHref(`https://thecontentlabs.app/register${search}`);
    }
  }, []);

  const handleHeroCtaClick = () => {
    capture('landing_cta_clicked', {
      position: 'hero_primary',
      from_prealgo: fromPrealgo,
    });
  };

  const handleSecondaryCtaClick = () => {
    capture('landing_cta_clicked', {
      position: 'hero_secondary',
      from_prealgo: fromPrealgo,
    });
  };

  return (
    <section id="hero-section" className="pt-32 sm:pt-40 pb-20 sm:pb-28">
      <div className={CONTAINER}>
        <div className="text-center max-w-4xl mx-auto">
          {fromPrealgo ? (
            <p className="inline-flex items-center gap-1.5 mb-6 px-3 py-1 rounded-full bg-surface border border-line/[0.08] text-meta text-ink-2">
              <span className="font-medium text-ink">Welcome from PreAlgo</span>
              <span className="hidden sm:inline">· your free TCL audit is ready</span>
            </p>
          ) : (
            <a
              href="/trends"
              className="group inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-surface border border-line/[0.08] text-meta text-ink-2 hover:border-line/[0.14] hover:text-ink transition-colors duration-150"
            >
              <span>
                <span className="font-medium text-ink">Hot Take</span> is the top hook this month
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-ink-3 transition-transform duration-150 group-hover:translate-x-0.5" />
            </a>
          )}

          <h1 className={`${H1} mb-6`}>
            {fromPrealgo ? (
              <>
                You picked the right hooks.
                <span className="block text-ink-2">Now see why your videos land.</span>
              </>
            ) : (
              <>
                See why your last videos
                <span className="block text-ink-2">did what they did.</span>
              </>
            )}
          </h1>

          <p className="text-lg text-ink-2 max-w-[60ch] mx-auto mb-8">
            {fromPrealgo
              ? 'PreAlgo gave you the trending sounds and hooks. The Content Labs analyzes every video you post, shows you what wins for you, and writes the next one in your voice. Free plan, no card.'
              : 'The Content Labs analyzes every video you post and tells you what wins for you specifically: hook length, payoff timing, tangents, on-screen text, topic. Then the Chemist writes the next one in your voice.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center justify-center">
            <a href={registerHref} onClick={handleHeroCtaClick} className={`${BTN_PRIMARY} w-full sm:w-auto`}>
              Start free
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/pricing"
              onClick={handleSecondaryCtaClick}
              className="inline-flex items-center gap-1.5 h-12 px-4 text-[15px] font-medium text-ink-2 hover:text-ink transition-colors duration-150"
            >
              See pricing
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="text-meta text-ink-3 mt-4">
            <span className="font-medium text-ink-2 tabular-nums">21,000+ videos analyzed.</span> Free plan, no card: your numbers every week and three videos analyzed.
          </p>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3" aria-label="Creator results">
            {HERO_CHIPS.map((t) => (
              <li key={t.name} className="flex items-center gap-2.5">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  decoding="async"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-line/[0.08] flex-shrink-0"
                />
                <p className="text-meta leading-tight">
                  <span className="block font-medium text-ink">{t.name}</span>
                  <span className="block text-ink-3 tabular-nums">{t.stat}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Product demo: a 30-second motion cut of the real app
            (dashboard, a video's beat map, what wins, the Chemist), framed
            like a browser window. Autoplays muted and loops. */}
        <div className={`mt-14 sm:mt-16 max-w-5xl mx-auto ${SCREEN_FRAME}`} style={{ transform: 'translateZ(0)' }}>
          <div className="flex items-center gap-1.5 px-4 h-10 bg-sunken border-b border-line/[0.08]">
            <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
            <span className="ml-3 h-6 flex-1 max-w-xs rounded-md bg-surface border border-line/[0.08] text-xs leading-[22px] text-ink-3 px-3 truncate">
              thecontentlabs.app/dashboard
            </span>
          </div>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/hero-demo-poster.jpg"
            width={1440}
            height={900}
            className="w-full h-auto block"
            src="/hero-demo.mp4"
            aria-label="Walkthrough of The Content Labs: the dashboard, a video's beat map, what wins for you, and the Chemist writing the next script"
          />
        </div>

        {/* Who it's for */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <span className="text-meta text-ink-3 mr-1">Built for</span>
            {PERSONAS.map((p) => (
              <a
                key={p.href}
                href={p.href}
                className="inline-flex items-center h-8 px-3 text-meta font-medium text-ink-2 bg-surface border border-line/[0.08] rounded-full hover:text-ink hover:border-line/[0.14] transition-colors duration-150"
              >
                {p.label}
              </a>
            ))}
        </div>
      </div>
    </section>
  );
}
