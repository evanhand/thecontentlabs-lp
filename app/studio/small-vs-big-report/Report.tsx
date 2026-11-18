"use client";

import { useEffect, useRef, useState } from "react";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/landing/Footer";

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
    <section ref={ref} id={id} className={`relative flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"} ${id === "cover" ? "pt-32 sm:pt-40" : ""} ${className}`}>
      {children}
    </section>
  );
}

function Eyebrow({ children, color = "slate" }: { children: React.ReactNode; color?: "slate" | "coral" | "red" }) {
  const c = color === "coral" ? "text-ink" : color === "red" ? "text-ink-3" : "text-ink-3";
  return <p className={`text-meta text-ink-3 mb-4`}>{children}</p>;
}

export function SmallVsBigReport() {

  const maxRatio = Math.max(...BUCKETS.map((b) => b.ratio));

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <PublicNav />

      <Section id="cover">
        <div className="max-w-5xl text-center relative">
          <Eyebrow color="coral">Data Report &middot; 2026</Eyebrow>
          <h1 className="font-heading text-4xl sm:text-6xl font-semibold tracking-[-0.03em] leading-[1.05] mb-8">
            Small accounts get
            <br /><span className="text-ink-3">14&times; more reach.</span>
          </h1>
          <p className="text-lg sm:text-xl text-ink-2 max-w-2xl mx-auto leading-[1.6]">
            We measured views per follower across 2,537 videos. The algorithm
            feeds small accounts. The data proves it.
          </p>
        </div>
      </Section>

      <Section id="question">
        <div className="max-w-4xl text-center">
          <Eyebrow>The question</Eyebrow>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-[-0.02em] leading-[1.05] mb-10">
            Is the algorithm
            <br /><span className="text-ink-3">suppressing you?</span>
          </h2>
          <p className="text-lg sm:text-xl text-ink-2 leading-[1.6] max-w-2xl mx-auto">
            Big creators say it all the time. "My reach dropped." "The
            algorithm changed." "They're suppressing me."
          </p>
          <p className="text-2xl sm:text-3xl font-semibold mt-14 text-ink tracking-tight">
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
              <div key={s.label} className="lab-card p-5 sm:p-6">
                <div className="font-heading text-3xl sm:text-4xl font-semibold text-ink mb-2 tracking-tight tabular-nums">{s.stat}</div>
                <div className="text-xs text-ink-3 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="chart">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <Eyebrow>Views per follower by account size</Eyebrow>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight mb-4">The curve</h2>
          </div>
          <div className="lab-card p-5 sm:p-6 space-y-3">
            {BUCKETS.map((b) => (
              <div key={b.size} className="flex items-center gap-4">
                <div className="w-24 text-right text-sm font-semibold text-ink-2 flex-shrink-0">{b.size}</div>
                <div className="flex-1 h-12 bg-sunken rounded-lg overflow-hidden">
                  <div
                    className={`h-full rounded-lg transition-[width] duration-[1000ms] ease-out ${
                      b.size === "0-10K"
                        ? "bg-content-coral"
                        : "bg-slate-400"
                    }`}
                    style={{ width: `${(b.ratio / maxRatio) * 100}%` }}
                  />
                </div>
                <div className={`w-16 text-right font-semibold text-lg flex-shrink-0 tabular-nums ${b.size === "0-10K" ? "text-ink" : "text-ink-2"}`}>
                  {b.ratio}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="reveal">
        <div className="max-w-4xl text-center relative">
          <Eyebrow>The gap</Eyebrow>
          <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            <div className="lab-card border-line/[0.16] p-6">
              <p className="text-meta font-medium text-ink-2 mb-4 font-semibold">Under 10K</p>
              <p className="font-heading text-6xl sm:text-7xl font-semibold text-ink tabular-nums tracking-tight">0.440</p>
              <p className="text-sm text-ink-3 mt-3">views per follower</p>
              <p className="text-base text-ink-2 mt-4 font-medium">44% of your followers see each post</p>
            </div>
            <div className="lab-card p-6 opacity-75">
              <p className="text-meta font-medium text-ink-2 mb-4 font-semibold">Over 1M</p>
              <p className="font-heading text-6xl sm:text-7xl font-semibold text-ink-3 tabular-nums tracking-tight">0.031</p>
              <p className="text-sm text-ink-3 mt-3">views per follower</p>
              <p className="text-base text-ink-2 mt-4">3% of your followers see each post</p>
            </div>
          </div>
          <p className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight">
            14&times; difference.
          </p>
        </div>
      </Section>

      <Section id="total-views">
        <div className="max-w-4xl text-center">
          <Eyebrow>But before you celebrate</Eyebrow>
          <h2 className="font-heading text-3xl sm:text-5xl font-semibold tracking-[-0.02em] leading-[1.1] mb-14">
            Total views still go up
            <br /><span className="text-ink-3">with scale.</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {BUCKETS.map((b) => (
              <div key={b.size} className="lab-card p-5">
                <p className="text-meta font-medium text-ink-2 mb-2 font-semibold">{b.size}</p>
                <p className="font-heading text-2xl sm:text-3xl font-semibold text-ink tabular-nums tracking-tight">
                  {b.views >= 1000 ? `${Math.round(b.views / 1000)}K` : b.views}
                </p>
                <p className="text-xs text-ink-3 mt-1">median views</p>
              </div>
            ))}
          </div>
          <p className="text-base sm:text-lg text-ink-2 mt-12 max-w-xl mx-auto leading-relaxed">
            A 1M+ account still gets 65K median views per post. They're not
            struggling. They just don't get the same algorithmic boost.
          </p>
        </div>
      </Section>

      <Section id="why">
        <div className="max-w-4xl text-center">
          <Eyebrow color="coral">Why this happens</Eyebrow>
          <h2 className="font-heading text-3xl sm:text-5xl font-semibold tracking-[-0.02em] leading-[1.1] mb-14">
            The algorithm has two modes.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <div className="lab-card border-line/[0.16] p-6">
              <p className="text-meta font-medium text-ink-2 mb-4 font-semibold">Discovery mode</p>
              <p className="text-xl font-semibold text-ink mb-3">Under ~50K followers</p>
              <p className="text-sm text-ink-3 leading-relaxed">
                The algorithm doesn't know your audience yet. It pushes your
                content wider to test who responds. More reach per follower. More
                non-followers see your videos.
              </p>
            </div>
            <div className="lab-card p-6">
              <p className="text-meta font-medium text-ink-2 mb-4 font-semibold">Retention mode</p>
              <p className="text-xl font-semibold text-ink mb-3">Over ~100K followers</p>
              <p className="text-sm text-ink-3 leading-relaxed">
                The algorithm knows your audience. It shows your content to
                existing followers first. If they engage, it pushes further. Less
                free discovery. More earned reach.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="conclusion">
        <div className="max-w-4xl text-center relative w-full">
          <Eyebrow color="coral">The ultimate conclusion</Eyebrow>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-[-0.02em] leading-[1.05] mb-14">
            Under 10K?
            <br /><span className="text-ink-3">This is your window.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-14 text-left">
            <div className="lab-card border-line/[0.16] p-6">
              <p className="text-meta font-medium text-ink-2 mb-4 font-semibold">Under 10K</p>
              <p className="text-sm text-ink-3 leading-relaxed">Post your best content now. The algorithm will never push it this hard again.</p>
            </div>
            <div className="lab-card p-6">
              <p className="text-meta font-medium text-ink-2 mb-4 font-semibold">10K-100K</p>
              <p className="text-sm text-ink-3 leading-relaxed">The squeeze. Stay consistent. Strong hooks matter more now.</p>
            </div>
            <div className="lab-card p-6">
              <p className="text-meta font-medium text-ink-2 mb-4 font-semibold">100K+</p>
              <p className="text-sm text-ink-3 leading-relaxed">Stop comparing to when you were small. Optimize for retention, not discovery.</p>
            </div>
          </div>
          <p className="text-base sm:text-xl text-ink-2 max-w-2xl mx-auto leading-relaxed">
            The algorithm isn't against you. It's just not for you the same way
            it was at 2,000 followers. That's the game.
          </p>
          <p className="text-base sm:text-xl text-ink font-semibold mt-4 tracking-tight">
            Play it accordingly.
          </p>
        </div>
      </Section>

      <Section id="signature" className="min-h-[40vh]">
        <div className="text-center">
          <p className="text-meta text-ink-3">Data Report &middot; The Content Labs</p>
          <p className="text-meta text-ink-3 mt-1">2,537 videos &middot; thecontentlabs.app</p>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
