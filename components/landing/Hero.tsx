'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { capture } from '@/lib/analytics';

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
    <section id="hero-section" className="relative pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
      <CursorGlow />
      <AuroraBackground variant="hero" />

      <div className="max-w-7xl mx-auto pb-8">
        <div className="text-center max-w-4xl mx-auto">
          {fromPrealgo ? (
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-content-coral text-white text-xs font-bold uppercase tracking-[0.18em]">
              <Sparkles className="h-3.5 w-3.5" />
              Welcome from PreAlgo
              <span className="hidden sm:inline font-normal opacity-90 normal-case tracking-normal">
                · your free TCL audit is ready
              </span>
            </div>
          ) : (
            <a
              href="/trends"
              className="group inline-flex items-center gap-2 mb-4 pl-2 pr-4 py-1 rounded-full bg-white/80 border border-slate-200 hover:border-content-coral/40 hover:bg-white transition-all"
            >
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-content-coral text-white text-[9px] font-mono uppercase tracking-[0.2em] font-bold">
                <span className="h-1 w-1 rounded-full bg-white animate-pulse" />
                Live
              </span>
              <span className="text-[12px] sm:text-[13px] font-medium text-slate-700">
                <span className="font-bold text-slate-900">Hot Take</span> is the top hook this month
              </span>
              <ArrowRight className="h-3 w-3 text-slate-400 group-hover:text-content-coral group-hover:translate-x-0.5 transition-all" />
            </a>
          )}

          <div
            className="inline-flex items-center px-4 py-2 sm:py-1.5 font-mono text-[13px] sm:text-xs border border-content-coral-500/30 sm:border-content-coral-500/20 bg-content-coral-500/10 sm:bg-content-coral-500/5 rounded-full text-content-coral-700 sm:text-content-coral-600 mb-6 tracking-wider font-semibold sm:font-normal"
          >
            21,000+ VIDEOS ANALYZED
          </div>

          <h1 className="font-heading font-bold tracking-tight mb-5 text-[2rem] sm:text-5xl md:text-6xl leading-[1.05]">
            {fromPrealgo ? (
              <>
                <span className="block text-slate-900">You picked the right hooks.</span>
                <span className="block text-content-coral">Now see why your videos land.</span>
              </>
            ) : (
              <>
                <span className="block text-slate-900">See why your last videos</span>
                <span className="block text-content-coral">did what they did.</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            {fromPrealgo
              ? 'PreAlgo gave you the trending sounds and hooks. The Content Labs analyzes every video you post, shows you what wins for you, and writes the next one in your voice. Free plan, no card.'
              : 'The Content Labs analyzes every video you post and tells you what wins for you specifically: hook length, payoff timing, tangents, on-screen text, topic. Then the Chemist writes the next one in your voice.'}
          </p>

          <div className="mb-2 flex flex-col sm:flex-row gap-3 items-center justify-center">
            <MagneticButton className="inline-block">
              <a
                href={registerHref}
                onClick={handleHeroCtaClick}
                className="lab-bubbles group inline-flex items-center px-6 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-content-cta-dark to-content-cta rounded-xl font-bold text-base sm:text-lg text-white shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Start free
                <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </MagneticButton>
            <a
              href="/pricing"
              onClick={handleSecondaryCtaClick}
              className="inline-flex items-center px-5 py-3 sm:py-4 text-sm sm:text-base font-semibold text-slate-700 hover:text-content-coral transition-colors"
            >
              See pricing
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
          </div>
          <p className="text-sm text-slate-400 mt-3">Free plan. No card. Your numbers every week and three videos analyzed.</p>

          {/* Mobile-only social proof — sits between CTA and video so phone
              users see real creator results in the first viewport instead of
              having to scroll past the autoplay product demo. */}
          <div className="sm:hidden mt-7 flex flex-wrap justify-center gap-2">
            {HERO_CHIPS.map((t) => (
              <div key={`mobile-${t.name}`} className="flex items-center gap-2 px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white/70">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  decoding="async"
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover border border-slate-200 flex-shrink-0"
                />
                <div className="text-left">
                  <p className="font-mono text-[10px] font-semibold text-slate-900 leading-none">{t.name}</p>
                  <p className="font-mono text-[9px] text-content-coral-600 leading-tight mt-0.5">{t.stat}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product demo: a 36-second recorded walkthrough of the real app
          (dashboard, a video's beat map, what wins, the Chemist), framed
          like a browser window. Autoplays muted and loops. */}
      <div className="-mt-1 max-w-3xl lg:max-w-5xl mx-auto" style={{ transform: 'translateZ(0)' }}>
        <div className="rounded-2xl bg-slate-950 shadow-2xl ring-1 ring-black/10 overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 h-9 bg-slate-900 border-b border-white/[0.06]">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="ml-3 h-5 flex-1 max-w-xs rounded-md bg-white/[0.06] text-[11px] leading-5 text-slate-400 px-3 font-mono truncate">thecontentlabs.app/dashboard</span>
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
            className="w-full block"
            src="/hero-demo.mp4"
            aria-label="Walkthrough of The Content Labs: the dashboard, a video's beat map, what wins for you, and the Chemist writing the next script"
          />
        </div>
      </div>

      {/* Persona chips */}
      <div className="max-w-5xl mx-auto text-center mt-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">
          Built for
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {PERSONAS.map((p) => (
            <a
              key={p.href}
              href={p.href}
              className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium text-slate-700 bg-white/80 border border-slate-200 rounded-full hover:border-content-coral/40 hover:text-content-coral hover:bg-white transition-all"
            >
              {p.label}
              <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </a>
          ))}
        </div>

        <div className="hidden sm:flex flex-wrap justify-center gap-3">
          {HERO_CHIPS.map((t) => (
            <div key={t.name} className="flex items-center gap-2.5 px-3 py-2 border border-slate-200 rounded-lg bg-white/70">
              <img
                src={t.image}
                alt={t.name}
                loading="lazy"
                decoding="async"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover border border-slate-200 flex-shrink-0"
              />
              <div>
                <p className="font-mono text-xs font-semibold text-slate-900">{t.name}</p>
                <p className="font-mono text-[10px] text-content-coral-600">{t.stat}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
