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
            TRUSTED BY 47,598 CREATORS
          </div>

          <h1 className="font-heading font-bold tracking-tight mb-5 text-[2rem] sm:text-5xl md:text-6xl leading-[1.05]">
            {fromPrealgo ? (
              <>
                <span className="block text-slate-900">You picked the right hooks.</span>
                <span className="block text-content-coral">Now get the full strategy.</span>
              </>
            ) : (
              <>
                <span className="block text-slate-900">Stop Guessing What to Post.</span>
                <span className="block text-content-coral">Post What Actually Works.</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            {fromPrealgo
              ? 'PreAlgo gave you the trending sounds and hooks. The Content Labs gives you the 30-day plan that uses them. Free audit in under 60 seconds.'
              : "Get your first content strategy in under 10 minutes. A 30-day plan with full scripts, built from what's going viral in your niche. You just hit record."}
          </p>

          <div className="mb-2 flex flex-col sm:flex-row gap-3 items-center justify-center">
            <MagneticButton className="inline-block">
              <a
                href={registerHref}
                onClick={handleHeroCtaClick}
                className="lab-bubbles group inline-flex items-center px-6 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-content-cta-dark to-content-cta rounded-xl font-bold text-base sm:text-lg text-white shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {fromPrealgo ? 'Claim my free audit' : 'Get Your Free Audit'}
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
          <p className="text-sm text-slate-400 mt-3">Free content audit in under 60 seconds &middot; No credit card required</p>

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

      {/* Product Demo Video */}
      <div className="-mt-1 max-w-3xl lg:max-w-4xl mx-auto" style={{ transform: 'translateZ(0)' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero-demo-poster.jpg"
          width={1920}
          height={1080}
          className="w-full rounded-2xl shadow-2xl"
          src="/hero-demo.mp4"
        />
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
