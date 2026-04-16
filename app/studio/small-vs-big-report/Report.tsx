"use client";

import { useEffect, useRef, useState } from "react";
import { HexMolecule } from "@/components/ui/HexMolecule";

const BUCKETS = [
  { size: "0-10K", ratio: 0.440, views: 918 },
  { size: "10-50K", ratio: 0.129, views: 4214 },
  { size: "50-100K", ratio: 0.109, views: 8042 },
  { size: "100-500K", ratio: 0.065, views: 15100 },
  { size: "500K-1M", ratio: 0.058, views: 49700 },
  { size: "1M+", ratio: 0.031, views: 65300 },
];

function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisible(true); return; }
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <section ref={ref} id={id} className={`relative min-h-[100dvh] flex flex-col items-center justify-center px-6 py-24 transition-all duration-[600ms] ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </section>
  );
}

function Eyebrow({ children, color = "slate" }: { children: React.ReactNode; color?: "slate" | "coral" | "red" }) {
  const c = color === "coral" ? "text-content-coral" : color === "red" ? "text-red-500" : "text-slate-400";
  return <p className={`${c} text-[11px] font-mono uppercase tracking-[0.3em] mb-10`}>{children}</p>;
}

export function SmallVsBigReport() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const maxRatio = Math.max(...BUCKETS.map((b) => b.ratio));

  return (
    <div className="lab-grid-bg text-slate-900 min-h-screen">
      <div className={`hidden md:block fixed top-6 right-8 z-50 text-[11px] font-mono uppercase tracking-[0.25em] transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}>
        <span className="text-slate-400">The Content Labs</span>
        <span className="mx-3 text-slate-300">/</span>
        <span className="text-content-coral">Small vs Big</span>
      </div>

      <Section id="cover">
        <HexMolecule size={200} className="absolute top-16 right-16 opacity-30" />
        <HexMolecule size={140} className="absolute bottom-24 left-12 opacity-25" />
        <div className="max-w-5xl text-center relative">
          <Eyebrow color="coral">Data Report &middot; 2026</Eyebrow>
          <h1 className="text-5xl sm:text-8xl font-bold tracking-[-0.03em] leading-[0.95] mb-8">
            Small accounts get
            <br /><span className="text-content-coral">14&times; more reach.</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-[1.6]">
            We measured views per follower across 2,537 videos. The algorithm
            feeds small accounts. The data proves it.
          </p>
          <div className="mt-20 flex flex-col items-center gap-3 text-slate-400">
            <p className="text-[11px] font-mono uppercase tracking-[0.3em]">Scroll</p>
            <div className="w-px h-12 bg-gradient-to-b from-slate-400 to-transparent animate-pulse" />
          </div>
        </div>
      </Section>

      <Section id="question">
        <div className="max-w-4xl text-center">
          <Eyebrow>The question</Eyebrow>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-[-0.025em] leading-[1.05] mb-10">
            Is the algorithm
            <br /><span className="text-content-coral">suppressing you?</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-500 leading-[1.6] max-w-2xl mx-auto">
            Big creators say it all the time. "My reach dropped." "The
            algorithm changed." "They're suppressing me."
          </p>
          <p className="text-2xl sm:text-3xl font-bold mt-14 text-slate-900 tracking-tight">
            It's not suppression. It's math.
          </p>
        </div>
      </Section>

      <Section id="data">
        <div className="max-w-4xl w-full text-center">
          <Eyebrow>The dataset</Eyebrow>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            {[
              { stat: "2,537", label: "Videos" },
              { stat: "6", label: "Account tiers" },
              { stat: "500 to 10M+", label: "Follower range" },
            ].map((s) => (
              <div key={s.label} className="bg-white/70 border border-content-coral/15 rounded-2xl p-6 sm:p-8">
                <div className="text-3xl sm:text-4xl font-bold text-content-coral mb-2 tracking-tight tabular-nums">{s.stat}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="chart">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <Eyebrow>Views per follower by account size</Eyebrow>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">The curve</h2>
          </div>
          <div className="bg-white/50 border border-content-coral/10 rounded-2xl p-6 sm:p-8 space-y-3">
            {BUCKETS.map((b) => (
              <div key={b.size} className="flex items-center gap-4">
                <div className="w-24 text-right text-sm font-bold text-slate-700 flex-shrink-0">{b.size}</div>
                <div className="flex-1 h-12 bg-white/60 border border-content-coral/10 rounded-lg overflow-hidden">
                  <div
                    className={`h-full rounded-lg transition-[width] duration-[1000ms] ease-out ${
                      b.size === "0-10K"
                        ? "bg-gradient-to-r from-content-coral to-orange-400 shadow-md shadow-content-coral/30"
                        : "bg-gradient-to-r from-content-coral/30 to-content-coral/18"
                    }`}
                    style={{ width: `${(b.ratio / maxRatio) * 100}%` }}
                  />
                </div>
                <div className={`w-16 text-right font-bold text-lg flex-shrink-0 tabular-nums ${b.size === "0-10K" ? "text-content-coral" : "text-slate-500"}`}>
                  {b.ratio}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="reveal">
        <HexMolecule size={260} className="absolute top-16 left-8 opacity-20" />
        <HexMolecule size={200} className="absolute bottom-20 right-10 opacity-25" />
        <div className="max-w-4xl text-center relative">
          <Eyebrow>The gap</Eyebrow>
          <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-8 border-2 border-content-coral shadow-xl shadow-content-coral/15 scale-105">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-content-coral mb-4 font-bold">Under 10K</p>
              <p className="text-6xl sm:text-7xl font-bold text-content-coral tabular-nums tracking-tight">0.440</p>
              <p className="text-sm text-slate-500 mt-3">views per follower</p>
              <p className="text-base text-slate-700 mt-4 font-medium">44% of your followers see each post</p>
            </div>
            <div className="bg-white/50 rounded-2xl p-8 border border-slate-200/60 opacity-75">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400 mb-4 font-bold">Over 1M</p>
              <p className="text-6xl sm:text-7xl font-bold text-slate-400 tabular-nums tracking-tight">0.031</p>
              <p className="text-sm text-slate-500 mt-3">views per follower</p>
              <p className="text-base text-slate-500 mt-4">3% of your followers see each post</p>
            </div>
          </div>
          <p className="text-3xl sm:text-5xl font-bold text-content-coral tracking-tight">
            14&times; difference.
          </p>
        </div>
      </Section>

      <Section id="total-views">
        <div className="max-w-4xl text-center">
          <Eyebrow>But before you celebrate</Eyebrow>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.1] mb-14">
            Total views still go up
            <br /><span className="text-content-coral">with scale.</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {BUCKETS.map((b) => (
              <div key={b.size} className="bg-white/70 rounded-2xl p-5 border border-slate-200/60">
                <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400 mb-2 font-bold">{b.size}</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums tracking-tight">
                  {b.views >= 1000 ? `${Math.round(b.views / 1000)}K` : b.views}
                </p>
                <p className="text-xs text-slate-500 mt-1">median views</p>
              </div>
            ))}
          </div>
          <p className="text-base sm:text-lg text-slate-500 mt-12 max-w-xl mx-auto leading-relaxed">
            A 1M+ account still gets 65K median views per post. They're not
            struggling. They just don't get the same algorithmic boost.
          </p>
        </div>
      </Section>

      <Section id="why">
        <div className="max-w-4xl text-center">
          <Eyebrow color="coral">Why this happens</Eyebrow>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.1] mb-14">
            The algorithm has two modes.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-7 border-2 border-content-coral shadow-lg shadow-content-coral/15">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-content-coral mb-4 font-bold">Discovery mode</p>
              <p className="text-xl font-bold text-slate-900 mb-3">Under ~50K followers</p>
              <p className="text-sm text-slate-500 leading-relaxed">
                The algorithm doesn't know your audience yet. It pushes your
                content wider to test who responds. More reach per follower. More
                non-followers see your videos.
              </p>
            </div>
            <div className="bg-white/70 rounded-2xl p-7 border border-slate-200/60">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400 mb-4 font-bold">Retention mode</p>
              <p className="text-xl font-bold text-slate-900 mb-3">Over ~100K followers</p>
              <p className="text-sm text-slate-500 leading-relaxed">
                The algorithm knows your audience. It shows your content to
                existing followers first. If they engage, it pushes further. Less
                free discovery. More earned reach.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="conclusion">
        <HexMolecule size={280} className="absolute top-16 left-8 opacity-20" />
        <HexMolecule size={200} className="absolute bottom-20 right-10 opacity-25" />
        <div className="max-w-4xl text-center relative w-full">
          <Eyebrow color="coral">The ultimate conclusion</Eyebrow>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-[-0.025em] leading-[1.05] mb-14">
            Under 10K?
            <br /><span className="text-content-coral">This is your window.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-14 text-left">
            <div className="bg-white rounded-2xl p-6 border-2 border-content-coral shadow-lg shadow-content-coral/15">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-content-coral mb-4 font-bold">Under 10K</p>
              <p className="text-sm text-slate-500 leading-relaxed">Post your best content now. The algorithm will never push it this hard again.</p>
            </div>
            <div className="bg-white/80 rounded-2xl p-6 border border-content-coral/20">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400 mb-4 font-bold">10K-100K</p>
              <p className="text-sm text-slate-500 leading-relaxed">The squeeze. Stay consistent. Strong hooks matter more now.</p>
            </div>
            <div className="bg-white/80 rounded-2xl p-6 border border-content-coral/20">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400 mb-4 font-bold">100K+</p>
              <p className="text-sm text-slate-500 leading-relaxed">Stop comparing to when you were small. Optimize for retention, not discovery.</p>
            </div>
          </div>
          <p className="text-base sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            The algorithm isn't against you. It's just not for you the same way
            it was at 2,000 followers. That's the game.
          </p>
          <p className="text-base sm:text-xl text-slate-900 font-bold mt-4 tracking-tight">
            Play it accordingly.
          </p>
        </div>
      </Section>

      <Section id="signature" className="min-h-[40vh]">
        <div className="text-center">
          <HexMolecule size={40} className="mx-auto mb-5 opacity-50" />
          <p className="text-slate-400 text-[11px] font-mono uppercase tracking-[0.3em]">Data Report &middot; The Content Labs</p>
          <p className="text-slate-400 text-[11px] font-mono mt-2">2,537 videos &middot; thecontentlabs.app</p>
        </div>
      </Section>
    </div>
  );
}
