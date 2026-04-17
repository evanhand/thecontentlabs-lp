"use client";

import { useEffect, useRef, useState } from "react";
import { HexMolecule } from "@/components/ui/HexMolecule";

const FOLLOWER_BUCKETS = [
  { bucket: "<1K", pct: 31.3, n: 198 },
  { bucket: "1K-10K", pct: 15.4, n: 221 },
  { bucket: "10K-50K", pct: 4.8, n: 537 },
  { bucket: "50K-250K", pct: 1.0, n: 1906 },
  { bucket: "250K+", pct: 0.4, n: 1438 },
];

const LENGTH_BUCKETS_TT = [
  { bucket: "0-11s", pct: 5.2 },
  { bucket: "12-24s", pct: 9.0 },
  { bucket: "25-44s", pct: 7.2 },
  { bucket: "45-89s", pct: 4.0 },
  { bucket: "90s+", pct: 1.2 },
];

const HOOK_ARCHETYPES = [
  { name: "Proof Drop", pct: 3.7 },
  { name: "Investigator", pct: 4.1 },
  { name: "Story", pct: 4.7 },
  { name: "Experimenter", pct: 4.7 },
  { name: "Hot Take", pct: 5.6 },
  { name: "Magician", pct: 5.9 },
  { name: "Fortune Teller", pct: 6.0 },
  { name: "FaceTime Energy", pct: 7.8 },
  { name: "Teacher", pct: 8.9 },
  { name: "Contrarian", pct: 9.5 },
];

const EMOTIONS = [
  { name: "Outrage", pct: 0.0 },
  { name: "Humor", pct: 1.8 },
  { name: "Curiosity", pct: 2.3 },
  { name: "Inspiration", pct: 2.5 },
  { name: "Desire", pct: 4.6 },
  { name: "Fear", pct: 4.9 },
  { name: "Aspiration", pct: 7.8 },
  { name: "Trust", pct: 12.7 },
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

function HorizontalBar({
  label,
  pct,
  max,
  highlight,
  suffix = "%",
}: {
  label: string;
  pct: number;
  max: number;
  highlight?: boolean;
  suffix?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-28 sm:w-32 text-right text-sm font-bold text-slate-700 flex-shrink-0">{label}</div>
      <div className="flex-1 h-11 bg-white/60 border border-content-coral/10 rounded-lg overflow-hidden">
        <div
          className={`h-full rounded-lg transition-[width] duration-[1000ms] ease-out ${
            highlight
              ? "bg-gradient-to-r from-content-coral to-orange-400 shadow-md shadow-content-coral/30"
              : "bg-gradient-to-r from-content-coral/30 to-content-coral/18"
          }`}
          style={{ width: `${max > 0 ? Math.max((pct / max) * 100, 2) : 0}%` }}
        />
      </div>
      <div className={`w-16 text-right font-bold text-lg flex-shrink-0 tabular-nums ${highlight ? "text-content-coral" : "text-slate-500"}`}>
        {pct}{suffix}
      </div>
    </div>
  );
}

export function ViewJailReport() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const maxFollower = Math.max(...FOLLOWER_BUCKETS.map((b) => b.pct));
  const maxLength = Math.max(...LENGTH_BUCKETS_TT.map((b) => b.pct));
  const maxHook = Math.max(...HOOK_ARCHETYPES.map((b) => b.pct));
  const maxEmotion = Math.max(...EMOTIONS.map((e) => e.pct), 1);

  return (
    <div className="lab-grid-bg text-slate-900 min-h-screen">
      <div className={`hidden md:block fixed top-6 right-8 z-50 text-[11px] font-mono uppercase tracking-[0.25em] transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}>
        <span className="text-slate-400">The Content Labs</span>
        <span className="mx-3 text-slate-300">/</span>
        <span className="text-content-coral">300 View Jail</span>
      </div>

      <Section id="cover">
        <HexMolecule size={200} className="absolute top-16 right-16 opacity-30" />
        <HexMolecule size={140} className="absolute bottom-24 left-12 opacity-25" />
        <div className="max-w-5xl text-center relative">
          <Eyebrow color="coral">Data Report &middot; 2026</Eyebrow>
          <h1 className="text-5xl sm:text-8xl font-bold tracking-[-0.03em] leading-[0.95] mb-8">
            Escaping
            <br /><span className="text-content-coral">300 view jail.</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-[1.6]">
            We pulled 8,500 analyzed videos from our full dataset. Here's what
            actually separates the stuck from the escaped — and why the common
            advice is wrong.
          </p>
          <div className="mt-20 flex flex-col items-center gap-3 text-slate-400">
            <p className="text-[11px] font-mono uppercase tracking-[0.3em]">Scroll</p>
            <div className="w-px h-12 bg-gradient-to-b from-slate-400 to-transparent animate-pulse" />
          </div>
        </div>
      </Section>

      <Section id="question">
        <div className="max-w-4xl text-center">
          <Eyebrow>The pattern every creator knows</Eyebrow>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-[-0.025em] leading-[1.05] mb-10">
            Stuck at
            <br /><span className="text-content-coral">293 views.</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-500 leading-[1.6] max-w-2xl mx-auto">
            The video never breaks out. Creators blame their hook, their
            caption, their length, their timing.
          </p>
          <p className="text-2xl sm:text-3xl font-bold mt-14 text-slate-900 tracking-tight">
            The real answer isn't any of those.
          </p>
        </div>
      </Section>

      <Section id="data">
        <div className="max-w-4xl w-full text-center">
          <Eyebrow>The dataset</Eyebrow>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-12">
            8,500 analyzed videos.
            <br />6.5% stuck at ≤ 300 views.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { stat: "8,500", label: "Total analyzed", color: "coral" },
              { stat: "551", label: "Stuck (≤ 300 views)", color: "slate" },
              { stat: "7,949", label: "Escaped (> 300 views)", color: "coral" },
            ].map((s) => (
              <div key={s.label} className="bg-white/70 border border-content-coral/15 rounded-2xl p-6 sm:p-8">
                <div className={`text-3xl sm:text-4xl font-bold mb-2 tracking-tight tabular-nums ${s.color === "coral" ? "text-content-coral" : "text-slate-400"}`}>
                  {s.stat}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-8 max-w-xl mx-auto">
            TikTok: 4,003 videos. Instagram: 4,497 videos. Account sizes from
            under 1K to multi-million followers.
          </p>
        </div>
      </Section>

      <Section id="platform">
        <HexMolecule size={180} className="absolute top-16 left-10 opacity-25" />
        <div className="max-w-4xl w-full text-center">
          <Eyebrow color="coral">Finding #1</Eyebrow>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.1] mb-6">
            Instagram is the hard mode.
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-14">
            Every article about 300 view jail is written like it's a TikTok
            thing. The data says the opposite.
          </p>
          <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-8 border-2 border-content-coral shadow-xl shadow-content-coral/15 scale-105">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-content-coral mb-4 font-bold">Instagram</p>
              <p className="text-6xl sm:text-7xl font-bold text-content-coral tabular-nums tracking-tight">9.0%</p>
              <p className="text-sm text-slate-500 mt-3">of Reels stuck at ≤ 300</p>
            </div>
            <div className="bg-white/50 rounded-2xl p-8 border border-slate-200/60 opacity-75">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400 mb-4 font-bold">TikTok</p>
              <p className="text-6xl sm:text-7xl font-bold text-slate-400 tabular-nums tracking-tight">3.7%</p>
              <p className="text-sm text-slate-500 mt-3">of videos stuck at ≤ 300</p>
            </div>
          </div>
          <p className="text-3xl sm:text-5xl font-bold text-content-coral tracking-tight">
            2.5&times; more stuck on IG.
          </p>
        </div>
      </Section>

      <Section id="followers">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <Eyebrow>Finding #2 &middot; The real driver</Eyebrow>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.1] mb-4">
              Follower count is the cliff.
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              % of TikTok videos stuck at ≤ 300 views, by account size.
            </p>
          </div>
          <div className="bg-white/50 border border-content-coral/10 rounded-2xl p-6 sm:p-8 space-y-3">
            {FOLLOWER_BUCKETS.map((b) => (
              <HorizontalBar
                key={b.bucket}
                label={b.bucket}
                pct={b.pct}
                max={maxFollower}
                highlight={b.bucket === "<1K"}
              />
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-8 text-center max-w-xl mx-auto">
            An account under 1K followers gets stuck on 1 in 3 videos.
            Over 250K, it's closer to 1 in 250.
          </p>
          <p className="text-3xl sm:text-5xl font-bold text-content-coral tracking-tight text-center mt-10">
            ~80&times; range.
          </p>
        </div>
      </Section>

      <Section id="length">
        <HexMolecule size={220} className="absolute bottom-16 right-10 opacity-20" />
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <Eyebrow color="coral">Finding #3 &middot; Counterintuitive</Eyebrow>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.1] mb-4">
              Longer videos escape more.
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              % stuck by video length on TikTok. "Shorter is better" is wrong.
            </p>
          </div>
          <div className="bg-white/50 border border-content-coral/10 rounded-2xl p-6 sm:p-8 space-y-3">
            {LENGTH_BUCKETS_TT.map((b) => (
              <HorizontalBar
                key={b.bucket}
                label={b.bucket}
                pct={b.pct}
                max={maxLength}
                highlight={b.bucket === "90s+"}
              />
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-8 text-center max-w-xl mx-auto">
            The "12-24s sweet spot" is actually the <span className="font-bold text-slate-700">worst</span> bucket.
            Videos over 90 seconds escape 98.8% of the time.
          </p>
        </div>
      </Section>

      <Section id="hooks">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <Eyebrow>Finding #4 &middot; Hook archetype</Eyebrow>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.1] mb-4">
              Proof Drop &gt; Contrarian.
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              % stuck by hook archetype across 8,411 videos. 2.6&times; spread.
            </p>
          </div>
          <div className="bg-white/50 border border-content-coral/10 rounded-2xl p-6 sm:p-8 space-y-2.5">
            {HOOK_ARCHETYPES.map((h) => (
              <HorizontalBar
                key={h.name}
                label={h.name}
                pct={h.pct}
                max={maxHook}
                highlight={h.pct <= 8}
              />
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-8 text-center max-w-xl mx-auto">
            Mystery-driven questions and strong opinions land in a category fast.
            Talking-to-camera and how-to styles don't.
          </p>
        </div>
      </Section>

      <Section id="emotion">
        <HexMolecule size={240} className="absolute top-10 left-8 opacity-20" />
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <Eyebrow color="coral">Finding #5 &middot; The big surprise</Eyebrow>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.1] mb-4">
              Warm emotions get stuck.
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              % stuck by primary emotional trigger.
            </p>
          </div>
          <div className="bg-white/50 border border-content-coral/10 rounded-2xl p-6 sm:p-8 space-y-3">
            {EMOTIONS.map((e) => (
              <HorizontalBar
                key={e.name}
                label={e.name}
                pct={e.pct}
                max={maxEmotion}
                highlight={e.pct <= 5}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto mt-10">
            <div className="bg-white rounded-2xl p-7 border-2 border-content-coral shadow-lg shadow-content-coral/15">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-content-coral mb-4 font-bold">Outrage</p>
              <p className="text-5xl font-bold text-content-coral tabular-nums tracking-tight">0.0%</p>
              <p className="text-sm text-slate-500 mt-3">Zero stuck videos across 145 tagged as Outrage.</p>
            </div>
            <div className="bg-white/70 rounded-2xl p-7 border border-slate-200/60">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400 mb-4 font-bold">Trust</p>
              <p className="text-5xl font-bold text-slate-400 tabular-nums tracking-tight">12.7%</p>
              <p className="text-sm text-slate-500 mt-3">The emotion creators are told to lean into is the one that traps videos.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="conclusion">
        <HexMolecule size={280} className="absolute top-16 left-8 opacity-20" />
        <HexMolecule size={200} className="absolute bottom-20 right-10 opacity-25" />
        <div className="max-w-4xl text-center relative w-full">
          <Eyebrow color="coral">What the data says to do</Eyebrow>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-[-0.025em] leading-[1.05] mb-6">
            The algorithm isn't suppressing you.
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-14">
            It's asking one question over and over: can I categorize this fast
            enough to find the people who'll engage?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-14 text-left">
            <div className="bg-white rounded-2xl p-6 border-2 border-content-coral shadow-lg shadow-content-coral/15">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-content-coral mb-4 font-bold">Move 1</p>
              <p className="text-lg font-bold text-slate-900 mb-2">Go longer</p>
              <p className="text-sm text-slate-500 leading-relaxed">90s+ TikToks get stuck 1.2% of the time. Short-form isn't the safer bet anymore.</p>
            </div>
            <div className="bg-white/80 rounded-2xl p-6 border border-content-coral/20">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400 mb-4 font-bold">Move 2</p>
              <p className="text-lg font-bold text-slate-900 mb-2">Use Proof Drop / Investigator hooks</p>
              <p className="text-sm text-slate-500 leading-relaxed">Concrete result or mystery-driven question in the first 2 seconds. Skip Teacher and Contrarian openers.</p>
            </div>
            <div className="bg-white/80 rounded-2xl p-6 border border-content-coral/20">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400 mb-4 font-bold">Move 3</p>
              <p className="text-lg font-bold text-slate-900 mb-2">Lean provocative</p>
              <p className="text-sm text-slate-500 leading-relaxed">Outrage, Curiosity, Fear — the fast emotions. Trust and Aspiration flat-line.</p>
            </div>
          </div>
          <p className="text-base sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            And if you're under 10K followers — the jail rate is the baseline,
            not a bug.
          </p>
          <p className="text-base sm:text-xl text-slate-900 font-bold mt-4 tracking-tight">
            Stop optimizing. Start posting.
          </p>
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <a
              href="/register"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-content-cta-dark to-content-cta rounded-xl font-bold text-white shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Get your free audit
            </a>
            <a
              href="/blog/how-to-escape-tiktok-300-view-jail"
              className="inline-flex items-center px-8 py-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:border-content-coral/40 transition-all"
            >
              Read the full article
            </a>
          </div>
        </div>
      </Section>

      <Section id="signature" className="min-h-[40vh]">
        <div className="text-center">
          <HexMolecule size={40} className="mx-auto mb-5 opacity-50" />
          <p className="text-slate-400 text-[11px] font-mono uppercase tracking-[0.3em]">Data Report &middot; The Content Labs</p>
          <p className="text-slate-400 text-[11px] font-mono mt-2">8,500 videos &middot; thecontentlabs.app</p>
        </div>
      </Section>
    </div>
  );
}
