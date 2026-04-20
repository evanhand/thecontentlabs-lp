'use client';

import { ArrowRight } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { CursorGlow } from '@/components/ui/CursorGlow';

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
  return (
    <section id="hero-section" className="relative pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
      <CursorGlow />
      <AuroraBackground variant="hero" />

      <div className="max-w-7xl mx-auto pb-8">
        <div className="text-center max-w-4xl mx-auto">
          <div
            className="inline-flex items-center px-4 py-1.5 font-mono text-xs border border-content-coral-500/20 bg-content-coral-500/5 rounded-full text-content-coral-600 mb-6 tracking-wider"
          >
            TRUSTED BY 47,598 CREATORS
          </div>

          <h1 className="font-heading font-bold tracking-tight mb-5 text-[2rem] sm:text-5xl md:text-6xl leading-[1.05]">
            <span className="block text-slate-900">Stop Guessing What to Post.</span>
            <span className="block text-content-coral">Post What Actually Works.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Get your first content strategy in under 10 minutes. A 30-day plan with full scripts, built from what's going viral in your niche. You just hit record.
          </p>

          <div className="mb-2">
            <MagneticButton className="inline-block">
              <a
                href="/register"
                className="lab-bubbles group inline-flex items-center px-6 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-content-cta-dark to-content-cta rounded-xl font-bold text-base sm:text-lg text-white shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Get Your Free Audit
                <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </MagneticButton>
            <p className="text-sm text-slate-400 mt-3">Free content audit in under 60 seconds &middot; No credit card required</p>
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

        <div className="flex flex-wrap justify-center gap-3">
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
