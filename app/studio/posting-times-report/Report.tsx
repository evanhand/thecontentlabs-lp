"use client";

import { useEffect, useRef, useState } from "react";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/landing/Footer";

// RAW views by hour (biased — big creators post late)
const RAW_HOURS = [
  { hour: "9a", views: 337 },
  { hour: "10a", views: 342 },
  { hour: "11p", views: 277 },
  { hour: "10p", views: 653 },
  { hour: "5p", views: 295 },
];

// NORMALIZED: views per follower (TikTok medians) — real data
const NORMALIZED_HOURS = [
  { hour: "7a", ratio: 0.035, videos: 30 },
  { hour: "8a", ratio: 0.054, videos: 36 },
  { hour: "9a", ratio: 0.068, videos: 86 },
  { hour: "10a", ratio: 0.057, videos: 149 },
  { hour: "11a", ratio: 0.039, videos: 155 },
  { hour: "12p", ratio: 0.034, videos: 185 },
  { hour: "1p", ratio: 0.062, videos: 174 },
  { hour: "2p", ratio: 0.082, videos: 163 },
  { hour: "3p", ratio: 0.064, videos: 180 },
  { hour: "4p", ratio: 0.059, videos: 148 },
  { hour: "5p", ratio: 0.061, videos: 154 },
  { hour: "6p", ratio: 0.063, videos: 149 },
  { hour: "7p", ratio: 0.089, videos: 171 },
  { hour: "8p", ratio: 0.070, videos: 113 },
  { hour: "9p", ratio: 0.111, videos: 87 },
  { hour: "10p", ratio: 0.094, videos: 84 },
  { hour: "11p", ratio: 0.062, videos: 64 },
  { hour: "12a", ratio: 0.090, videos: 58 },
];

// Follower count inflation by hour (the bias)
const FOLLOWER_BIAS = [
  { hour: "7a", followers: 193 },
  { hour: "10a", followers: 194 },
  { hour: "12p", followers: 276 },
  { hour: "3p", followers: 297 },
  { hour: "5p", followers: 401 },
  { hour: "8p", followers: 429 },
  { hour: "10p", followers: 540 },
  { hour: "11p", followers: 879 },
];

// Day-of-week (TikTok median view/follower)
const DAYS_NORMALIZED = [
  { day: "Sun", ratio: 0.085, videos: 256 },
  { day: "Mon", ratio: 0.067, videos: 341 },
  { day: "Tue", ratio: 0.061, videos: 376 },
  { day: "Wed", ratio: 0.040, videos: 370 },
  { day: "Thu", ratio: 0.059, videos: 384 },
  { day: "Fri", ratio: 0.072, videos: 336 },
  { day: "Sat", ratio: 0.080, videos: 216 },
];

// Instagram day-of-week (median view/follower)
const DAYS_INSTAGRAM = [
  { day: "Sun", ratio: 0.152, videos: 68 },
  { day: "Mon", ratio: 0.080, videos: 44 },
  { day: "Tue", ratio: 0.047, videos: 45 },
  { day: "Wed", ratio: 0.075, videos: 34 },
  { day: "Thu", ratio: 0.060, videos: 38 },
  { day: "Fri", ratio: 0.115, videos: 41 },
  { day: "Sat", ratio: 0.187, videos: 27 },
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
      className={`relative flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      } ${id === "cover" ? "pt-32 sm:pt-40" : ""} ${className}`}
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
      ? "text-ink"
      : color === "red"
        ? "text-ink-3"
        : "text-ink-3";
  return (
    <p
      className={`text-meta text-ink-3 mb-4`}
    >
      {children}
    </p>
  );
}

function RatioBar({
  label,
  ratio,
  max,
  highlight,
  muted,
}: {
  label: string;
  ratio: number;
  max: number;
  highlight?: boolean;
  muted?: boolean;
}) {
  const width = (ratio / max) * 100;
  return (
    <div className={`flex items-center gap-4 ${muted ? "opacity-40" : ""}`}>
      <div className="w-14 text-right text-sm font-mono text-ink-3 flex-shrink-0 tabular-nums">
        {label}
      </div>
      <div className="flex-1 h-9 bg-sunken rounded-lg overflow-hidden">
        <div
          className={`h-full rounded-lg transition-[width] duration-[900ms] ease-out ${
            highlight
              ? "bg-content-coral"
              : "bg-slate-400"
          }`}
          style={{ width: `${width}%` }}
        />
      </div>
      <div
        className={`w-20 text-right font-semibold text-sm flex-shrink-0 tabular-nums ${
          highlight ? "text-ink" : "text-ink-2"
        }`}
      >
        {ratio.toFixed(3)}
      </div>
    </div>
  );
}

function DayBar({
  day,
  ratio,
  max,
  highlight,
}: {
  day: string;
  ratio: number;
  max: number;
  highlight?: boolean;
}) {
  const height = (ratio / max) * 100;
  return (
    <div className="flex flex-col items-center gap-3 flex-1">
      <div className="text-xs font-mono tabular-nums font-semibold text-ink-3 h-5">
        {ratio.toFixed(3)}
      </div>
      <div className="w-full max-w-[72px] h-80 bg-sunken rounded-xl flex items-end overflow-hidden">
        <div
          className={`w-full transition-[height] duration-[900ms] ease-out ${
            highlight
              ? "bg-content-coral"
              : "bg-slate-400"
          }`}
          style={{ height: `${height}%` }}
        />
      </div>
      <div
        className={`text-sm font-semibold ${
          highlight ? "text-ink" : "text-ink-2"
        }`}
      >
        {day}
      </div>
    </div>
  );
}

function FollowerBar({ hour, followers, max }: { hour: string; followers: number; max: number }) {
  const width = (followers / max) * 100;
  return (
    <div className="flex items-center gap-4">
      <div className="w-14 text-right text-sm font-mono text-ink-3 flex-shrink-0 tabular-nums">
        {hour}
      </div>
      <div className="flex-1 h-7 bg-sunken rounded-md overflow-hidden">
        <div
          className="h-full rounded-md transition-[width] duration-[900ms] ease-out bg-slate-400"
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="w-16 text-right font-semibold text-sm flex-shrink-0 tabular-nums text-ink-3">
        {followers}K
      </div>
    </div>
  );
}

export function PostingTimesReport() {

  const maxRatio = Math.max(...NORMALIZED_HOURS.map((d) => d.ratio));
  const maxDayRatio = Math.max(...DAYS_NORMALIZED.map((d) => d.ratio));
  const maxDayRatioIG = Math.max(...DAYS_INSTAGRAM.map((d) => d.ratio));
  const maxFollowers = Math.max(...FOLLOWER_BIAS.map((d) => d.followers));

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <PublicNav />

      {/* COVER */}
      <Section id="cover">
        <div className="max-w-5xl text-center relative">
          <Eyebrow color="coral">Data Report &middot; 2026</Eyebrow>
          <h1 className="font-heading text-4xl sm:text-6xl font-semibold tracking-[-0.03em] leading-[1.05] mb-8">
            Does <span className="text-ink-3">posting time</span>
            <br />
            actually matter?
          </h1>
          <p className="text-lg sm:text-xl text-ink-2 max-w-2xl mx-auto leading-[1.6]">
            We analyzed 7,261 videos. Then we accounted for follower counts.
            The answer isn't what most articles tell you.
          </p>
        </div>
      </Section>

      {/* THE PROBLEM WITH RAW DATA */}
      <Section id="problem">
        <div className="max-w-4xl text-center">
          <Eyebrow>The problem with "best time to post" articles</Eyebrow>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-[-0.02em] leading-[1.05] mb-10">
            Raw averages
            <br />
            <span className="text-ink-3">lie to you.</span>
          </h2>
          <p className="text-lg sm:text-xl text-ink-2 leading-[1.6] max-w-2xl mx-auto">
            Because the accounts posting at each hour aren't the same size.
          </p>
        </div>
      </Section>

      {/* THE BIAS EXPOSED */}
      <Section id="bias">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <Eyebrow>The bias</Eyebrow>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
              Big accounts post later.
            </h2>
            <p className="text-ink-2 max-w-2xl mx-auto leading-relaxed">
              Median follower count by posting hour (thousands). Late-night
              posters have 4.5× more followers than morning posters.
            </p>
          </div>

          <div className="lab-card p-5 sm:p-6 space-y-2.5">
            {FOLLOWER_BIAS.map((d) => (
              <FollowerBar
                key={d.hour}
                hour={d.hour}
                followers={d.followers}
                max={maxFollowers}
              />
            ))}
          </div>

          <p className="text-center text-base sm:text-lg text-ink-2 mt-10 max-w-xl mx-auto">
            So of course videos posted at 11pm show higher average views. The
            accounts are bigger.
          </p>
        </div>
      </Section>

      {/* THE FIX — SIMPLE EXPLANATION */}
      <Section id="fix">
        <div className="max-w-4xl text-center">
          <Eyebrow color="coral">The fix</Eyebrow>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-[-0.02em] leading-[1.05] mb-6">
            Compare <span className="text-ink-3">apples to apples.</span>
          </h2>
          <p className="text-lg sm:text-xl text-ink-2 leading-[1.6] max-w-2xl mx-auto">
            Instead of comparing raw views, we compare how well each video did
            relative to its own creator's follower count.
          </p>
        </div>
      </Section>

      {/* THE EXAMPLE */}
      <Section id="example">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-14">
            <Eyebrow>Here's what we mean</Eyebrow>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
              Who performed better?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-12">
            {/* Creator A */}
            <div className="lab-card p-6">
              <p className="text-meta font-medium text-ink-2 mb-4 font-semibold">
                Creator A &middot; Big account
              </p>
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-ink-3">Followers</span>
                  <span className="font-heading text-2xl font-semibold text-ink tabular-nums">
                    1,000,000
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-ink-3">Views</span>
                  <span className="font-heading text-2xl font-semibold text-ink tabular-nums">
                    500,000
                  </span>
                </div>
                <div className="h-px bg-line/[0.08] my-3" />
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-ink-3">
                    Views per follower
                  </span>
                  <span className="font-heading text-3xl font-semibold text-ink-2 tabular-nums">
                    0.5
                  </span>
                </div>
              </div>
            </div>

            {/* Creator B */}
            <div className="lab-card border-line/[0.16] p-6">
              <p className="text-meta font-medium text-ink-2 mb-4 font-semibold">
                Creator B &middot; Small account
              </p>
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-ink-3">Followers</span>
                  <span className="font-heading text-2xl font-semibold text-ink tabular-nums">
                    10,000
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-ink-3">Views</span>
                  <span className="font-heading text-2xl font-semibold text-ink tabular-nums">
                    50,000
                  </span>
                </div>
                <div className="h-px bg-line/[0.08] my-3" />
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-ink">
                    Views per follower
                  </span>
                  <span className="font-heading text-3xl font-semibold text-ink tabular-nums">
                    5.0
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-base sm:text-lg text-ink-2 leading-relaxed mb-4">
              Creator A got more <em>total</em> views (500K vs 50K). But Creator
              B's video reached <span className="font-semibold text-ink">10×</span> their
              follower base while Creator A's barely reached half of theirs.
            </p>
            <p className="text-lg sm:text-xl text-ink font-semibold">
              Creator B crushed it. Creator A didn't.
            </p>
          </div>
        </div>
      </Section>

      {/* WHY IT MATTERS */}
      <Section id="why-it-matters">
        <div className="max-w-4xl text-center">
          <Eyebrow color="coral">Why this is the only fair way</Eyebrow>
          <h2 className="font-heading text-3xl sm:text-5xl font-semibold tracking-[-0.02em] leading-[1.1] mb-10">
            It measures the thing that actually matters.
          </h2>
          <p className="text-lg sm:text-xl text-ink-2 leading-[1.7] max-w-2xl mx-auto">
            Total views just tell you who has the biggest account. Views per
            follower tells you which videos broke out of their follower base
            and reached new people.
          </p>
          <p className="text-base sm:text-lg text-ink font-semibold mt-8 tracking-tight">
            That's what going viral actually means.
          </p>
        </div>
      </Section>

      {/* NORMALIZED CHART */}
      <Section id="normalized">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <Eyebrow>TikTok &middot; Median view/follower ratio</Eyebrow>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
              The real picture
            </h2>
            <p className="text-ink-2 max-w-2xl mx-auto leading-relaxed">
              Median ratio by posting hour (ET). Bars dimmed where sample size
              is thin.
            </p>
          </div>

          <div className="lab-card p-5 sm:p-6 space-y-2.5">
            {NORMALIZED_HOURS.map((d) => (
              <RatioBar
                key={d.hour}
                label={d.hour}
                ratio={d.ratio}
                max={maxRatio}
                highlight={d.hour === "9p" || d.hour === "10p"}
                muted={d.videos < 50}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* EVENING REVEAL */}
      <Section id="evening">
        <div className="max-w-4xl text-center relative">
          <Eyebrow>The real winner</Eyebrow>
          <div className="font-heading text-[5rem] sm:text-[8rem] font-semibold leading-[0.9] tracking-[-0.04em] text-ink mb-8">
            7&ndash;10pm
          </div>
          <p className="text-2xl sm:text-3xl font-semibold text-ink mb-4 tracking-tight">
            Not 9am. Not 6pm. Evening.
          </p>
          <p className="text-base sm:text-lg text-ink-2 max-w-xl mx-auto leading-relaxed">
            When you account for who's actually posting, the evening window is
            where videos outperform their follower base the most.
          </p>
        </div>
      </Section>

      {/* DAYS */}
      <Section id="days">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-14">
            <Eyebrow>By Day &middot; TikTok</Eyebrow>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
              Which day wins on TikTok?
            </h2>
            <p className="text-ink-2 max-w-2xl mx-auto leading-relaxed">
              Median views per follower. Sunday edges out the rest. Wednesday
              lags everyone.
            </p>
          </div>

          <div className="lab-card p-5 sm:p-6">
            <div className="flex items-end gap-3 sm:gap-4 h-80 px-2 sm:px-4">
              {DAYS_NORMALIZED.map((d) => (
                <DayBar
                  key={d.day}
                  day={d.day}
                  ratio={d.ratio}
                  max={maxDayRatio}
                  highlight={d.day === "Sun"}
                />
              ))}
            </div>
          </div>

          <p className="text-center text-base sm:text-lg text-ink-2 mt-10 max-w-xl mx-auto">
            Range: <span className="font-semibold text-ink-2">0.040 to 0.085</span>.
            About 2× between best and worst.
          </p>
        </div>
      </Section>

      {/* PLATFORM DIFFERENCE INTRO */}
      <Section id="platform-intro">
        <div className="max-w-4xl text-center">
          <Eyebrow color="coral">But wait</Eyebrow>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-[-0.02em] leading-[1.05] mb-10">
            Instagram plays by
            <br />
            <span className="text-ink-3">different rules.</span>
          </h2>
          <p className="text-lg sm:text-xl text-ink-2 leading-[1.6] max-w-2xl mx-auto">
            Same data, filtered by platform. The patterns are not the same.
          </p>
        </div>
      </Section>

      {/* INSTAGRAM DAYS */}
      <Section id="days-ig">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-14">
            <Eyebrow>By Day &middot; Instagram Reels</Eyebrow>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
              Instagram rewards the weekend much harder
            </h2>
            <p className="text-ink-2 max-w-2xl mx-auto leading-relaxed">
              Same normalized metric. Completely different shape.
            </p>
          </div>

          <div className="lab-card p-5 sm:p-6">
            <div className="flex items-end gap-3 sm:gap-4 h-80 px-2 sm:px-4">
              {DAYS_INSTAGRAM.map((d) => (
                <DayBar
                  key={d.day}
                  day={d.day}
                  ratio={d.ratio}
                  max={maxDayRatioIG}
                  highlight={d.day === "Sat"}
                />
              ))}
            </div>
          </div>

          <p className="text-center text-base sm:text-lg text-ink-2 mt-10 max-w-xl mx-auto">
            Range: <span className="font-semibold text-ink-2">0.047 to 0.187</span>.
            Saturday is <span className="font-semibold text-ink">4× better</span> than
            Tuesday on Instagram.
          </p>
        </div>
      </Section>

      {/* PLATFORM SIDE BY SIDE */}
      <Section id="platform-compare">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-14">
            <Eyebrow color="coral">Platform vs platform</Eyebrow>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
              Two different games
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <div className="lab-card border-line/[0.16] p-6">
              <p className="text-meta font-medium text-ink-2 mb-5 font-semibold">
                Instagram Reels
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-ink-3 mb-1">
                    Median views per follower
                  </p>
                  <p className="font-heading text-4xl font-semibold text-ink tabular-nums tracking-tight">
                    0.099
                  </p>
                </div>
                <div>
                  <p className="text-xs text-ink-3 mb-1">
                    Best vs worst day
                  </p>
                  <p className="font-heading text-4xl font-semibold text-ink tabular-nums tracking-tight">
                    4&times;
                  </p>
                </div>
                <div>
                  <p className="text-xs text-ink-3 mb-1">
                    Peak day
                  </p>
                  <p className="text-xl font-semibold text-ink">Saturday</p>
                </div>
              </div>
            </div>

            <div className="lab-card p-6">
              <p className="text-meta font-medium text-ink-2 mb-5 font-semibold">
                TikTok
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-ink-3 mb-1">
                    Median views per follower
                  </p>
                  <p className="font-heading text-4xl font-semibold text-ink-2 tabular-nums tracking-tight">
                    0.063
                  </p>
                </div>
                <div>
                  <p className="text-xs text-ink-3 mb-1">
                    Best vs worst day
                  </p>
                  <p className="font-heading text-4xl font-semibold text-ink-2 tabular-nums tracking-tight">
                    2&times;
                  </p>
                </div>
                <div>
                  <p className="text-xs text-ink-3 mb-1">
                    Peak day
                  </p>
                  <p className="text-xl font-semibold text-ink-2">Sunday</p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center mt-14 space-y-3">
            <p className="text-base sm:text-lg text-ink-2 leading-relaxed">
              Instagram reaches <span className="font-semibold text-ink-2">57% more people</span> per
              follower on an average post, and its weekend boost is twice as
              strong as TikTok's.
            </p>
            <p className="text-lg sm:text-xl text-ink font-semibold tracking-tight">
              If you post the same thing on both platforms, timing matters more
              on Instagram.
            </p>
          </div>
        </div>
      </Section>

      {/* THE GAP IS SMALL */}
      <Section id="gap">
        <div className="max-w-4xl text-center">
          <Eyebrow color="coral">The honest truth</Eyebrow>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-[-0.02em] leading-[1.05] mb-12">
            The gap between best
            <br />
            and worst is <span className="text-ink-3">small.</span>
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
            <div className="lab-card p-5 sm:p-6">
              <p className="text-meta font-medium text-ink-2 mb-4 font-semibold">
                Best hour
              </p>
              <p className="font-heading text-3xl sm:text-4xl font-semibold text-ink tabular-nums tracking-tight">
                0.111
              </p>
              <p className="text-xs sm:text-sm text-ink-3 mt-3 font-medium">
                9 PM &middot; views/follower
              </p>
            </div>
            <div className="lab-card p-5 sm:p-6">
              <p className="text-meta font-medium text-ink-2 mb-4 font-semibold">
                Worst hour
              </p>
              <p className="font-heading text-3xl sm:text-4xl font-semibold text-ink-3 tabular-nums tracking-tight">
                0.034
              </p>
              <p className="text-xs sm:text-sm text-ink-3 mt-3 font-medium">
                12 PM &middot; views/follower
              </p>
            </div>
          </div>

          <p className="text-lg sm:text-xl text-ink-2 mt-12 max-w-xl mx-auto leading-relaxed">
            A ~3× difference between the best and worst reasonable hour. Same
            creator. Same content. Different time.
          </p>
        </div>
      </Section>

      {/* THE REAL VARIABLE */}
      <Section id="real-variable">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-14">
            <Eyebrow color="coral">The real variable</Eyebrow>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
              What actually moves the needle
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <div className="lab-card p-6">
              <p className="text-meta font-medium text-ink-2 mb-4 font-semibold">
                Posting time effect
              </p>
              <p className="font-heading text-5xl sm:text-6xl font-semibold text-ink-2 tabular-nums tracking-tight mb-3">
                ~3&times;
              </p>
              <p className="text-sm text-ink-3 leading-relaxed">
                Best hour vs worst reasonable hour (normalized for account
                size).
              </p>
            </div>
            <div className="lab-card border-line/[0.16] p-6">
              <p className="text-meta font-medium text-ink-2 mb-4 font-semibold">
                Content quality effect
              </p>
              <p className="font-heading text-5xl sm:text-6xl font-semibold text-ink tabular-nums tracking-tight mb-3">
                100&times;+
              </p>
              <p className="text-sm text-ink-3 leading-relaxed">
                Median video: 17K views. Top videos: millions. The gap between
                good and bad dwarfs everything else.
              </p>
            </div>
          </div>

          <p className="text-center text-base sm:text-lg text-ink-2 mt-14 max-w-2xl mx-auto leading-relaxed">
            A great video posted at the wrong time still crushes a bad video
            posted at the "perfect" time. It's not even close.
          </p>
        </div>
      </Section>

      {/* CONCLUSION */}
      <Section id="conclusion">

        <div className="max-w-4xl text-center relative w-full">
          <Eyebrow color="coral">The ultimate conclusion</Eyebrow>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-[-0.02em] leading-[1.05] mb-14">
            Posting time matters.
            <br />
            <span className="text-ink-3">Content matters more.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto mb-14 text-left">
            <div className="lab-card border-line/[0.16] p-6">
              <p className="text-meta font-medium text-ink-2 mb-4 font-semibold">
                If you post on TikTok
              </p>
              <p className="text-xl font-semibold mb-1 text-ink tracking-tight">
                Sunday &middot; 7&ndash;10 PM ET
              </p>
              <p className="text-sm text-ink-3 leading-relaxed mt-3">
                Evening posts outperform. Don't stress the specific hour.
              </p>
            </div>
            <div className="lab-card border-line/[0.16] p-6">
              <p className="text-meta font-medium text-ink-2 mb-4 font-semibold">
                If you post on Instagram
              </p>
              <p className="text-xl font-semibold mb-1 text-ink tracking-tight">
                Saturday &middot; 7&ndash;10 PM ET
              </p>
              <p className="text-sm text-ink-3 leading-relaxed mt-3">
                Weekend effect is 4× bigger here. Post weekends if you can.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-14">
            <div className="lab-card p-5 flex items-center gap-5">
              <p className="text-meta font-medium text-ink-2 font-semibold flex-shrink-0">
                Avoid
              </p>
              <p className="text-base sm:text-lg font-semibold text-ink">
                3 AM &ndash; 6 AM ET on any platform
              </p>
            </div>
          </div>

          <p className="text-base sm:text-xl text-ink-2 max-w-2xl mx-auto leading-relaxed">
            Stop obsessing over the clock. The difference between your best and
            worst video dwarfs the difference between 9am and 9pm.
          </p>
          <p className="text-base sm:text-xl text-ink font-semibold mt-4 tracking-tight">
            Make better content. Post when you're ready. Keep going.
          </p>
        </div>
      </Section>

      {/* SIGNATURE */}
      <Section id="signature" className="min-h-[40vh]">
        <div className="text-center">
          <p className="text-meta text-ink-3">
            Data Report &middot; The Content Labs
          </p>
          <p className="text-meta text-ink-3 mt-1">
            7,261 videos &middot; thecontentlabs.app
          </p>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
