"use client";

import { useEffect, useRef, useState } from "react";
import { HexMolecule } from "@/components/ui/HexMolecule";

// Normalized: views per follower by emotion (combined platforms)
const EMOTIONS = [
  { name: "Outrage", ratio: 0.186, videos: 44, color: "coral" },
  { name: "Humor", ratio: 0.172, videos: 116, color: "coral" },
  { name: "Curiosity", ratio: 0.091, videos: 562, color: "mid" },
  { name: "Relief", ratio: 0.060, videos: 126, color: "mid" },
  { name: "Belonging", ratio: 0.057, videos: 62, color: "mid" },
  { name: "Trust", ratio: 0.053, videos: 150, color: "mid" },
  { name: "Identity", ratio: 0.051, videos: 131, color: "mid" },
  { name: "Anger", ratio: 0.049, videos: 57, color: "mid" },
  { name: "Aspiration", ratio: 0.048, videos: 86, color: "mid" },
  { name: "Desire", ratio: 0.043, videos: 353, color: "low" },
  { name: "Fear", ratio: 0.037, videos: 96, color: "low" },
  { name: "Inspiration", ratio: 0.021, videos: 50, color: "low" },
];

// TikTok-specific breakout (where outrage really shines)
const TIKTOK_EMOTIONS = [
  { name: "Outrage", ratio: 0.307 },
  { name: "Humor", ratio: 0.172 },
  { name: "Curiosity", ratio: 0.090 },
  { name: "Utility", ratio: 0.080 },
  { name: "Relief", ratio: 0.059 },
  { name: "Belonging", ratio: 0.057 },
  { name: "Trust", ratio: 0.053 },
  { name: "Identity", ratio: 0.051 },
  { name: "Aspiration", ratio: 0.048 },
  { name: "Desire", ratio: 0.043 },
  { name: "Fear", ratio: 0.037 },
  { name: "Anger", ratio: 0.031 },
  { name: "Inspiration", ratio: 0.021 },
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative min-h-[100dvh] flex flex-col items-center justify-center px-6 py-24 transition-all duration-[600ms] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </section>
  );
}

function Eyebrow({
  children,
  color = "slate",
}: {
  children: React.ReactNode;
  color?: "slate" | "coral" | "red";
}) {
  const colorClass =
    color === "coral"
      ? "text-content-coral"
      : color === "red"
        ? "text-red-500"
        : "text-slate-400";
  return (
    <p
      className={`${colorClass} text-[11px] font-mono uppercase tracking-[0.3em] mb-10`}
    >
      {children}
    </p>
  );
}

function EmotionBar({
  name,
  ratio,
  max,
  tier,
  rank,
}: {
  name: string;
  ratio: number;
  max: number;
  tier: "top" | "mid" | "low";
  rank: number;
}) {
  const width = (ratio / max) * 100;
  const barColor =
    tier === "top"
      ? "bg-gradient-to-r from-content-coral to-orange-400 shadow-md shadow-content-coral/30"
      : tier === "mid"
        ? "bg-gradient-to-r from-content-coral/35 to-content-coral/25"
        : "bg-gradient-to-r from-slate-400/60 to-slate-400/40";
  const numberColor =
    tier === "top"
      ? "text-content-coral"
      : tier === "mid"
        ? "text-slate-700"
        : "text-slate-400";
  const labelColor =
    tier === "low" ? "text-slate-400" : "text-slate-700";

  return (
    <div className="flex items-center gap-4">
      <div className="w-6 text-right text-xs font-mono text-slate-400 flex-shrink-0 tabular-nums">
        {rank}
      </div>
      <div className={`w-28 text-left text-sm font-bold flex-shrink-0 ${labelColor}`}>
        {name}
      </div>
      <div className="flex-1 h-9 bg-white/60 border border-content-coral/10 rounded-lg overflow-hidden">
        <div
          className={`h-full rounded-lg transition-[width] duration-[1000ms] ease-out ${barColor}`}
          style={{ width: `${width}%` }}
        />
      </div>
      <div className={`w-20 text-right font-bold text-sm flex-shrink-0 tabular-nums ${numberColor}`}>
        {ratio.toFixed(3)}
      </div>
    </div>
  );
}

function EmotionStatCard({
  label,
  emotion,
  ratio,
  color = "coral",
  subtitle,
}: {
  label: string;
  emotion: string;
  ratio: number;
  color?: "coral" | "slate";
  subtitle?: string;
}) {
  const borderClass =
    color === "coral"
      ? "border-2 border-content-coral shadow-lg shadow-content-coral/15"
      : "border border-slate-200/60";
  const textClass =
    color === "coral" ? "text-content-coral" : "text-slate-400";
  return (
    <div className={`bg-white rounded-2xl p-7 ${borderClass}`}>
      <p className={`text-[11px] font-mono uppercase tracking-[0.25em] ${textClass} mb-4 font-bold`}>
        {label}
      </p>
      <p className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-2">
        {emotion}
      </p>
      <p className={`text-3xl sm:text-4xl font-bold tabular-nums tracking-tight ${textClass}`}>
        {ratio.toFixed(3)}
      </p>
      {subtitle && (
        <p className="text-xs text-slate-500 mt-3 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

export function EmotionalTriggersReport() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const maxRatio = Math.max(...EMOTIONS.map((d) => d.ratio));
  const maxTikTok = Math.max(...TIKTOK_EMOTIONS.map((d) => d.ratio));

  return (
    <div className="lab-grid-bg text-slate-900 min-h-screen [font-feature-settings:'ss01','cv11']">
      <div
        className={`hidden md:block fixed top-6 right-8 z-50 text-[11px] font-mono uppercase tracking-[0.25em] transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-slate-400">The Content Labs</span>
        <span className="mx-3 text-slate-300">/</span>
        <span className="text-content-coral">Emotional Triggers</span>
      </div>

      {/* COVER */}
      <Section id="cover">
        <HexMolecule size={200} className="absolute top-16 right-16 opacity-30" />
        <HexMolecule size={140} className="absolute bottom-24 left-12 opacity-25" />

        <div className="max-w-5xl text-center relative">
          <Eyebrow color="coral">Data Report &middot; 2026</Eyebrow>
          <h1 className="text-6xl sm:text-8xl font-bold tracking-[-0.03em] leading-[0.95] mb-8">
            Which <span className="text-content-coral">emotion</span>
            <br />
            actually goes viral?
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-[1.6]">
            We tagged the primary emotion of 1,833 videos, then normalized for
            follower count. The winner isn't what you'd expect.
          </p>
          <div className="mt-20 flex flex-col items-center gap-3 text-slate-400">
            <p className="text-[11px] font-mono uppercase tracking-[0.3em]">Scroll</p>
            <div className="w-px h-12 bg-gradient-to-b from-slate-400 to-transparent animate-pulse" />
          </div>
        </div>
      </Section>

      {/* THE CLAIM */}
      <Section id="claim">
        <div className="max-w-4xl text-center">
          <Eyebrow>The common advice</Eyebrow>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.1] mb-12">
            "Make people feel something."
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { emotion: "Inspire", subtitle: "Motivational content" },
              { emotion: "Fear sells", subtitle: "Scarcity & urgency" },
              { emotion: "Desire", subtitle: "Show the result" },
              { emotion: "Trust", subtitle: "Build authority" },
            ].map((b) => (
              <div
                key={b.emotion}
                className="bg-white/70 border border-slate-200/60 rounded-xl p-4"
              >
                <p className="text-base font-bold text-slate-900 mb-1">
                  {b.emotion}
                </p>
                <p className="text-xs text-slate-500 leading-snug">
                  {b.subtitle}
                </p>
              </div>
            ))}
          </div>

          <p className="text-lg sm:text-xl text-slate-500 mt-12 leading-[1.6] max-w-2xl mx-auto">
            Every content guru says something different. None of them have the
            data to back it up.
          </p>
        </div>
      </Section>

      {/* THE DATASET */}
      <Section id="data">
        <div className="max-w-4xl w-full text-center">
          <Eyebrow>The dataset</Eyebrow>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-12">
            What we looked at
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {[
              { stat: "1,833", label: "Videos tagged" },
              { stat: "12", label: "Primary emotions" },
              { stat: "2", label: "Platforms" },
              { stat: "ALL", label: "Normalized by followers" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/70 border border-content-coral/15 rounded-2xl p-6 sm:p-8"
              >
                <div className="text-3xl sm:text-5xl font-bold text-content-coral mb-2 tracking-tight tabular-nums">
                  {s.stat}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-wide font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Same methodology as our posting times report. Median views per
            follower so small accounts compete fairly with large ones.
          </p>
        </div>
      </Section>

      {/* THE RANKING */}
      <Section id="ranking">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <Eyebrow>All 12 emotions &middot; Ranked</Eyebrow>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Views per follower by emotion
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Higher bars = videos reaching further beyond their creator's own
              audience.
            </p>
          </div>

          <div className="bg-white/50 border border-content-coral/10 rounded-2xl p-6 sm:p-8 space-y-2.5">
            {EMOTIONS.map((e, i) => (
              <EmotionBar
                key={e.name}
                name={e.name}
                ratio={e.ratio}
                max={maxRatio}
                tier={e.color === "coral" ? "top" : e.color === "mid" ? "mid" : "low"}
                rank={i + 1}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* THE WINNER */}
      <Section id="winner">
        <HexMolecule size={240} className="absolute top-20 left-12 opacity-20" />
        <HexMolecule size={180} className="absolute bottom-32 right-16 opacity-25" />
        <div className="max-w-4xl text-center relative">
          <Eyebrow>The winner</Eyebrow>
          <div className="text-[6rem] sm:text-[11rem] font-bold leading-[0.85] tracking-[-0.05em] text-content-coral mb-10">
            Outrage
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 tracking-tight tabular-nums">
            0.186 median views per follower
          </p>
          <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Videos built to make people furious reach nearly twice as many
            people beyond their follower base as the next closest emotion.
          </p>
        </div>
      </Section>

      {/* EXAMPLE */}
      <Section id="outrage-example">
        <div className="max-w-3xl w-full">
          <div className="text-center mb-10">
            <Eyebrow>What outrage looks like</Eyebrow>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Real hooks. Real numbers.
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                creator: "higherupwellness",
                quote:
                  "It's no secret that many of you are demanding that I speak out about what happened in Minneapolis.",
                views: "2.5M",
              },
              {
                creator: "jackmacbarstool",
                quote:
                  "Chappell Roan allegedly made one of her 11-year-old fans cry this morning because she looked at her while she was eating breakfast.",
                views: "2.4M",
              },
              {
                creator: "ev_handd",
                quote:
                  "The internet is OUTRAGED after this Phillies Karen stole a ball from a kid during the Phillies vs Marlins game last night.",
                views: "7.9M",
              },
            ].map((e) => (
              <div
                key={e.creator}
                className="bg-white rounded-2xl p-6 border border-content-coral/20"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-content-coral text-2xl leading-none mt-1">&ldquo;</span>
                  <p className="text-base sm:text-lg text-slate-800 leading-snug font-medium flex-1">
                    {e.quote}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <p className="text-sm text-slate-500">@{e.creator}</p>
                  <p className="text-sm font-bold text-content-coral tabular-nums">
                    {e.views} views
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* INSPIRATION FAILS */}
      <Section id="inspiration-fails">
        <div className="max-w-4xl text-center">
          <Eyebrow color="red">The loser</Eyebrow>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-[-0.025em] leading-[1.05] mb-10">
            <span className="text-slate-400">Inspiration</span>
            <br />
            finishes last.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto mt-12">
            <EmotionStatCard
              label="1st place"
              emotion="Outrage"
              ratio={0.186}
              color="coral"
              subtitle="The content people say they hate but share the most."
            />
            <EmotionStatCard
              label="12th place"
              emotion="Inspiration"
              ratio={0.021}
              color="slate"
              subtitle="The content everyone says they want and nobody actually watches."
            />
          </div>

          <p className="text-lg sm:text-xl text-slate-500 mt-12 max-w-xl mx-auto leading-relaxed">
            Outrage beats inspiration by{" "}
            <span className="font-bold text-content-coral">9 times</span>.
            Despite every "motivational content" guru telling you otherwise.
          </p>
        </div>
      </Section>

      {/* FEAR DOESN'T SELL */}
      <Section id="fear-myth">
        <div className="max-w-4xl text-center">
          <Eyebrow color="red">Another myth busted</Eyebrow>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.1] mb-14">
            "Fear sells" is{" "}
            <span className="text-content-coral">mostly wrong.</span>
          </h2>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {[
              { rank: 1, emotion: "Outrage", ratio: 0.186, tier: "top" },
              { rank: 11, emotion: "Fear", ratio: 0.037, tier: "low" },
              { rank: 12, emotion: "Inspiration", ratio: 0.021, tier: "low" },
            ].map((e) => (
              <div
                key={e.emotion}
                className={`rounded-2xl p-5 sm:p-6 ${
                  e.tier === "top"
                    ? "bg-white border-2 border-content-coral shadow-lg shadow-content-coral/15"
                    : "bg-white/70 border border-slate-200/60"
                }`}
              >
                <p
                  className={`text-[11px] font-mono uppercase tracking-[0.25em] mb-3 font-bold ${
                    e.tier === "top" ? "text-content-coral" : "text-slate-400"
                  }`}
                >
                  Rank {e.rank}
                </p>
                <p className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight mb-1">
                  {e.emotion}
                </p>
                <p
                  className={`text-xl sm:text-2xl font-bold tabular-nums tracking-tight ${
                    e.tier === "top" ? "text-content-coral" : "text-slate-400"
                  }`}
                >
                  {e.ratio.toFixed(3)}
                </p>
              </div>
            ))}
          </div>

          <p className="text-base sm:text-xl text-slate-500 mt-12 max-w-xl mx-auto leading-relaxed">
            Fear ranks 11th out of 12. The classic "everyone is doing it wrong
            and you're at risk" angle doesn't actually get viewers to click.
          </p>
        </div>
      </Section>

      {/* TIKTOK SPOTLIGHT */}
      <Section id="tiktok-outrage">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <Eyebrow>On TikTok specifically</Eyebrow>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              The gap is even bigger
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
              TikTok's algorithm rewards outrage like no other platform.
            </p>
          </div>

          <div className="bg-white/50 border border-content-coral/10 rounded-2xl p-6 sm:p-8 space-y-2.5">
            {TIKTOK_EMOTIONS.slice(0, 8).map((e, i) => (
              <EmotionBar
                key={e.name}
                name={e.name}
                ratio={e.ratio}
                max={maxTikTok}
                tier={i === 0 ? "top" : i < 3 ? "mid" : "low"}
                rank={i + 1}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-6 border-2 border-content-coral shadow-lg shadow-content-coral/15">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-content-coral mb-3 font-bold">
                TikTok Outrage
              </p>
              <p className="text-4xl font-bold text-content-coral tabular-nums tracking-tight">
                0.307
              </p>
              <p className="text-xs text-slate-500 mt-2">views per follower</p>
            </div>
            <div className="bg-white/70 rounded-2xl p-6 border border-slate-200/60">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400 mb-3 font-bold">
                TikTok Inspiration
              </p>
              <p className="text-4xl font-bold text-slate-400 tabular-nums tracking-tight">
                0.021
              </p>
              <p className="text-xs text-slate-500 mt-2">views per follower</p>
            </div>
          </div>

          <p className="text-center text-lg sm:text-xl text-slate-900 font-bold mt-10 tracking-tight max-w-xl mx-auto">
            15&times; difference on TikTok. Not a typo.
          </p>
        </div>
      </Section>

      {/* THE UNDERUSED CHEAT CODE */}
      <Section id="cheat-code">
        <div className="max-w-4xl text-center">
          <Eyebrow color="coral">The cheat code</Eyebrow>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.1] mb-14">
            Outrage is the{" "}
            <span className="text-content-coral">most underused</span>{" "}
            emotion.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <div className="bg-white/70 rounded-2xl p-7 border border-slate-200/60">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400 mb-4 font-bold">
                Most used emotion
              </p>
              <p className="text-2xl font-bold text-slate-900 mb-2">Curiosity</p>
              <p className="text-4xl font-bold text-slate-500 tabular-nums tracking-tight mb-3">
                562 videos
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                Mid-tier performance (3rd place).
              </p>
            </div>
            <div className="bg-white rounded-2xl p-7 border-2 border-content-coral shadow-lg shadow-content-coral/15">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-content-coral mb-4 font-bold">
                Best-performing emotion
              </p>
              <p className="text-2xl font-bold text-slate-900 mb-2">Outrage</p>
              <p className="text-4xl font-bold text-content-coral tabular-nums tracking-tight mb-3">
                44 videos
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                13× less usage. 2× better performance. Clear arbitrage.
              </p>
            </div>
          </div>

          <p className="text-base sm:text-xl text-slate-500 mt-12 max-w-xl mx-auto leading-relaxed">
            Creators pile into curiosity and desire. Almost nobody leans into
            outrage. That's the opportunity.
          </p>
        </div>
      </Section>

      {/* ULTIMATE CONCLUSION */}
      <Section id="conclusion">
        <HexMolecule size={280} className="absolute top-16 left-8 opacity-20" />
        <HexMolecule size={200} className="absolute bottom-20 right-10 opacity-25" />

        <div className="max-w-4xl text-center relative w-full">
          <Eyebrow color="coral">The ultimate conclusion</Eyebrow>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-[-0.025em] leading-[1.05] mb-14">
            People say they want inspiration.
            <br />
            <span className="text-content-coral">They click on outrage.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-14 text-left">
            <div className="bg-white rounded-2xl p-6 border-2 border-content-coral shadow-lg shadow-content-coral/15">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-content-coral mb-4 font-bold">
                Lead with
              </p>
              <p className="text-lg sm:text-xl font-bold mb-2 text-slate-900 tracking-tight">
                Outrage or Humor
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                The only two emotions that consistently break beyond the
                follower base.
              </p>
            </div>
            <div className="bg-white/80 rounded-2xl p-6 border border-content-coral/20">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400 mb-4 font-bold">
                Safe middle
              </p>
              <p className="text-lg sm:text-xl font-bold mb-2 text-slate-900 tracking-tight">
                Curiosity
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                Won't blow up but won't die either. Workhorse emotion.
              </p>
            </div>
            <div className="bg-white/80 rounded-2xl p-6 border border-content-coral/20">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-red-500 mb-4 font-bold">
                Stop using
              </p>
              <p className="text-lg sm:text-xl font-bold mb-2 text-slate-900 tracking-tight">
                Inspiration, Fear
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                Both rank in the bottom 3 despite being the most
                guru-recommended.
              </p>
            </div>
          </div>

          <p className="text-base sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            The audience will tell you they want positive, uplifting content.
            Don't listen to what they say. Look at what they actually watch.
          </p>
          <p className="text-base sm:text-xl text-slate-900 font-bold mt-4 tracking-tight">
            Make them mad. Make them laugh. That's the formula.
          </p>
        </div>
      </Section>

      {/* SIGNATURE */}
      <Section id="signature" className="min-h-[40vh]">
        <div className="text-center">
          <HexMolecule size={40} className="mx-auto mb-5 opacity-50" />
          <p className="text-slate-400 text-[11px] font-mono uppercase tracking-[0.3em]">
            Data Report &middot; The Content Labs
          </p>
          <p className="text-slate-400 text-[11px] font-mono mt-2">
            1,833 videos &middot; thecontentlabs.app
          </p>
        </div>
      </Section>
    </div>
  );
}
