"use client";

import {
  ArrowRight,
  Check,
  X,
  Volume2,
  Eye,
  Type,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

/* -- CTA Block -- */
export function CTA({
  headline = "Stop guessing what to post. Post what actually works.",
  sub = "Connect TikTok, Instagram, and YouTube. The Content Labs audits your videos plus your competitors and builds you a 30-day calendar with scripts and hooks.",
  primary,
  primaryHref = "/register",
  secondary,
  secondaryHref = "/pricing",
  text,
  href,
}: {
  headline?: string;
  sub?: string;
  primary?: string;
  primaryHref?: string;
  secondary?: string;
  secondaryHref?: string;
  text?: string;
  href?: string;
}) {
  const primaryText = primary || text || "Get your free audit";
  const primaryLink = href || primaryHref;

  return (
    <section className="not-prose my-10 relative overflow-hidden rounded-2xl border border-content-coral/30 shadow-2xl shadow-content-coral/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-content-coral/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-content-coral/15 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative px-6 py-9 sm:px-10 sm:py-11">
        <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full bg-content-coral/15 border border-content-coral/25">
          <span className="h-1.5 w-1.5 rounded-full bg-content-coral animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-content-coral">
            The Content Labs
          </span>
        </div>

        <h3 className="text-2xl sm:text-[28px] font-bold text-white leading-[1.2] tracking-tight mb-3 max-w-3xl">
          {headline}
        </h3>
        <p className="text-[15px] sm:text-base text-slate-300 leading-relaxed mb-7 max-w-2xl">
          {sub}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <a
            href={primaryLink}
            className="group inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-content-cta-dark to-content-cta rounded-xl font-bold text-white shadow-lg shadow-content-cta/30 hover:shadow-xl hover:shadow-content-cta/50 transition-all duration-300 hover:scale-[1.02] active:scale-95"
          >
            {primaryText}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
          </a>
          {secondary && (
            <a
              href={secondaryHref}
              className="inline-flex items-center justify-center px-6 py-3.5 bg-white/5 border border-white/15 rounded-xl font-semibold text-slate-100 hover:bg-white/10 hover:border-white/25 transition-all"
            >
              {secondary}
            </a>
          )}
        </div>

        <p className="text-[12px] text-slate-400 mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-content-coral" />
            47,598 creators
          </span>
          <span className="text-slate-600">·</span>
          <span>No credit card required</span>
          <span className="text-slate-600">·</span>
          <span>60 seconds</span>
        </p>
      </div>
    </section>
  );
}

/* -- Comparison Table -- */
interface ComparisonFeature {
  name: string;
  us: boolean;
  them: boolean;
}

export function ComparisonTable({
  features,
  usLabel = "Content Labs",
  themLabel = "Competitor",
}: {
  features: ComparisonFeature[];
  usLabel?: string;
  themLabel?: string;
}) {
  return (
    <div className="not-prose overflow-x-auto my-8">
      <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-slate-50">
            <th className="text-left px-4 py-3 font-semibold text-slate-900">
              Feature
            </th>
            <th className="text-center px-4 py-3 font-semibold text-content-coral">
              {usLabel}
            </th>
            <th className="text-center px-4 py-3 font-semibold text-slate-500">
              {themLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((f) => (
            <tr key={f.name} className="border-t border-slate-100">
              <td className="px-4 py-3 text-slate-700">{f.name}</td>
              <td className="px-4 py-3 text-center">
                {f.us ? (
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-red-400 mx-auto" />
                )}
              </td>
              <td className="px-4 py-3 text-center">
                {f.them ? (
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-red-400 mx-auto" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -- Callout -- */
export function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "tip" | "warning";
  children: React.ReactNode;
}) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-900",
    tip: "bg-green-50 border-green-200 text-green-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
  };
  return (
    <div
      className={`not-prose rounded-xl border p-4 my-6 text-sm leading-relaxed ${styles[type]}`}
    >
      {children}
    </div>
  );
}

/* -- Stat Card -- */
export function StatCard({
  stat,
  label,
}: {
  stat: string;
  label: string;
}) {
  return (
    <div className="not-prose bg-slate-50 rounded-xl border border-slate-200 p-5 text-center">
      <p className="text-3xl font-bold text-content-coral">{stat}</p>
      <p className="text-sm text-slate-600 mt-1">{label}</p>
    </div>
  );
}

export function StatGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose grid grid-cols-2 sm:grid-cols-3 gap-4 my-8">
      {children}
    </div>
  );
}

/* -- Video Embed (self-hosted) -- */
export function VideoEmbed({
  src,
  caption,
  poster,
}: {
  src: string;
  caption?: string;
  poster?: string;
}) {
  return (
    <figure className="not-prose my-8">
      <video
        src={src}
        controls
        playsInline
        preload="metadata"
        poster={poster}
        className="w-full rounded-xl border border-slate-200"
      />
      {caption && (
        <figcaption className="text-sm text-slate-500 text-center mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* -- Instagram Reel Embed -- */
export function InstagramEmbed({
  url,
  caption,
}: {
  url: string;
  caption?: string;
}) {
  // Extract the reel/post URL and append /embed
  const cleanUrl = url.replace(/\/+$/, "");
  const embedUrl = `${cleanUrl}/embed/captioned/`;
  return (
    <figure className="not-prose my-8 flex flex-col items-center">
      <iframe
        src={embedUrl}
        width="400"
        height="580"
        scrolling="no"
        allow="encrypted-media"
        className="rounded-xl border border-slate-200 max-w-full"
      />
      {caption && (
        <figcaption className="text-sm text-slate-500 text-center mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* -- TikTok Embed -- */
export function TikTokEmbed({
  url,
  caption,
}: {
  url: string;
  caption?: string;
}) {
  // Extract video ID from TikTok URL
  const videoId = url.match(/video\/(\d+)/)?.[1] || "";
  return (
    <figure className="not-prose my-8 flex flex-col items-center">
      <iframe
        src={`https://www.tiktok.com/embed/v2/${videoId}`}
        width="325"
        height="580"
        scrolling="no"
        allow="encrypted-media"
        className="rounded-xl border border-slate-200"
      />
      {caption && (
        <figcaption className="text-sm text-slate-500 text-center mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* -- Video Card Grid (side by side embeds) -- */
export function VideoGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
      {children}
    </div>
  );
}

/* -- Highlight Box -- */
export function Highlight({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="not-prose bg-white rounded-xl border-2 border-content-coral/20 p-6 my-8">
      {title && (
        <p className="text-sm font-bold text-content-coral uppercase tracking-wide mb-3">
          {title}
        </p>
      )}
      <div className="text-slate-700 text-[15px] leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
}

/* -- Number Block -- */
export function NumberBlock({
  items,
}: {
  items: { number: string; text: string }[];
}) {
  return (
    <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
      {items.map((item) => (
        <div
          key={item.number}
          className="flex gap-4 items-start bg-slate-50 rounded-xl border border-slate-200 p-5"
        >
          <span className="text-2xl font-bold text-content-coral flex-shrink-0">
            {item.number}
          </span>
          <p className="text-sm text-slate-700 leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

/* -- Phone mockup used by hook framework + combo cards -- */
function PhoneMockup({
  hasVisual = true,
  hasText = false,
  hasSpoken = false,
  width = 180,
  textHook = "STOP SCROLLING",
  handle = "@creator",
}: {
  hasVisual?: boolean;
  hasText?: boolean;
  hasSpoken?: boolean;
  width?: number;
  textHook?: string;
  handle?: string;
}) {
  const height = Math.round(width * (19.5 / 9));
  const activeChannels = [
    hasVisual && "visual",
    hasText && "text",
    hasSpoken && "spoken",
  ]
    .filter(Boolean)
    .join(" + ");
  const detailed = width >= 150;
  return (
    <div
      role="img"
      aria-label={`Phone mockup showing ${activeChannels || "no"} hook channel${activeChannels.split(" + ").length > 1 ? "s" : ""} active`}
      className="relative flex-shrink-0"
      style={{ width, height }}
    >
      {/* Outer bezel with subtle gradient for depth */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-slate-700 via-slate-900 to-slate-950 p-[5px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
        {/* Inner screen */}
        <div className="relative h-full w-full rounded-[1.65rem] overflow-hidden bg-slate-950">
          {/* Visual layer: cinematic mesh gradient */}
          {hasVisual ? (
            <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-violet-700 via-fuchsia-600 to-amber-500">
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-cyan-400/40 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-44 h-44 rounded-full bg-amber-300/50 blur-3xl" />
              <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-24 h-24 rounded-full bg-pink-400/30 blur-2xl" />
              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            </div>
          ) : (
            <div aria-hidden className="absolute inset-0 bg-slate-900">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]" />
            </div>
          )}

          {/* Status bar */}
          <div aria-hidden className="absolute top-0 inset-x-0 z-30 px-3.5 pt-1.5 flex items-center justify-between text-white">
            <span className="text-[9px] font-bold tracking-tight">9:41</span>
            <div className="flex items-center gap-[3px]">
              {/* Signal */}
              <svg width="10" height="8" viewBox="0 0 12 9" fill="currentColor" className="opacity-90">
                <rect x="0" y="6" width="2" height="3" rx="0.5" />
                <rect x="3" y="4" width="2" height="5" rx="0.5" />
                <rect x="6" y="2" width="2" height="7" rx="0.5" />
                <rect x="9" y="0" width="2" height="9" rx="0.5" />
              </svg>
              {/* Battery */}
              <svg width="14" height="7" viewBox="0 0 18 9" fill="none" className="opacity-90">
                <rect x="0" y="0.5" width="15" height="8" rx="1.5" stroke="currentColor" strokeWidth="0.8" />
                <rect x="16" y="3" width="1.5" height="3" rx="0.5" fill="currentColor" />
                <rect x="1.5" y="2" width="11" height="5" rx="0.5" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Dynamic Island */}
          <div
            aria-hidden
            className="absolute top-[7px] left-1/2 -translate-x-1/2 bg-black rounded-full z-40"
            style={{ width: width * 0.32, height: width * 0.07 }}
          />

          {/* Right-side action rail (TikTok/Reels style) */}
          {detailed && hasVisual && (
            <div aria-hidden className="absolute right-2 bottom-16 flex flex-col items-center gap-2.5 z-20">
              {[Heart, MessageCircle, Bookmark, Share2].map((Icon, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/10">
                    <Icon className="h-3.5 w-3.5 text-white" strokeWidth={2} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom: username strip + audio bar */}
          {(hasSpoken || detailed) && hasVisual && (
            <div className="absolute bottom-0 inset-x-0 z-20 px-3 pb-3 pt-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <p className="text-white text-[10px] font-bold mb-1 tracking-tight">{handle}</p>
              {hasSpoken ? (
                <div className="flex items-center gap-1.5 max-w-[80%]">
                  <Volume2 className="h-2.5 w-2.5 text-white flex-shrink-0" />
                  <div className="flex items-end gap-[1.5px] h-2.5 flex-1">
                    {[35, 60, 80, 100, 75, 55, 90, 100, 65, 40, 70, 50, 85, 60].map((h, i) => (
                      <span
                        key={i}
                        className="flex-1 bg-sky-300 rounded-full"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-white/60 text-[8px]">—</p>
              )}
            </div>
          )}

          {/* Text hook overlay */}
          {hasText && (
            <div className="absolute inset-x-3 top-[38%] z-25">
              <div className="px-3 py-2 rounded-lg bg-content-coral shadow-lg shadow-black/40 ring-1 ring-white/15">
                <p className="text-white font-bold leading-tight uppercase tracking-tight text-center" style={{ fontSize: width >= 150 ? 12 : 10 }}>
                  {textHook}
                </p>
              </div>
            </div>
          )}

          {/* Home indicator */}
          <div
            aria-hidden
            className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 bg-white/80 rounded-full z-30"
            style={{ width: width * 0.32 }}
          />
        </div>
      </div>
    </div>
  );
}

/* -- Hook Framework hero diagram -- */
const CHANNEL_INFO = [
  {
    id: "visual",
    icon: Eye,
    number: "01",
    label: "Visual hook",
    description: "What's on screen at the moment of scroll. The frame. Always firing if your camera is on.",
    color: "violet",
  },
  {
    id: "text",
    icon: Type,
    number: "02",
    label: "Text hook",
    description: "On-screen text overlay in the first second. Often skipped. Single highest-leverage channel.",
    color: "coral",
  },
  {
    id: "spoken",
    icon: Volume2,
    number: "03",
    label: "Spoken hook",
    description: "The first words out of your mouth (or voiceover). The variable. Wins on TikTok, hurts on Reels.",
    color: "sky",
  },
] as const;

const COLOR_TOKENS = {
  violet: { tile: "bg-violet-500/15 border-violet-400/40 text-violet-200", icon: "text-violet-300" },
  coral: { tile: "bg-content-coral/15 border-content-coral/40 text-content-coral", icon: "text-content-coral" },
  sky: { tile: "bg-sky-500/15 border-sky-400/40 text-sky-200", icon: "text-sky-300" },
} as const;

export function HookFramework() {
  return (
    <section className="not-prose my-10 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
      <div aria-hidden className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-content-coral/15 blur-[80px] pointer-events-none" />
      <div aria-hidden className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-violet-500/10 blur-[80px] pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-12 items-center p-8 sm:p-10">
        <div className="mx-auto lg:mx-0">
          <PhoneMockup hasVisual hasText hasSpoken width={188} />
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-content-coral mb-4">
            The three-hook framework
          </p>
          <h3 className="text-2xl sm:text-[26px] font-bold text-white leading-[1.2] tracking-tight mb-6">
            Every short-form video can fire up to three hook channels at once.
          </h3>
          <ul className="space-y-4">
            {CHANNEL_INFO.map((c) => {
              const Icon = c.icon;
              const tokens = COLOR_TOKENS[c.color];
              return (
                <li key={c.id} className="flex items-start gap-4">
                  <span
                    className={`flex-shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl border ${tokens.tile} font-mono text-[11px] font-bold`}
                    aria-hidden
                  >
                    <Icon className={`h-5 w-5 ${tokens.icon}`} />
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-white font-bold text-base leading-tight mb-1">
                      <span className="font-mono text-xs text-slate-500 mr-2">{c.number}</span>
                      {c.label}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{c.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -- Hook Combo Grid -- */
type ComboStatus = "winner" | "default" | "avoid" | "lottery";

const STATUS_STYLE: Record<
  ComboStatus,
  { ring: string; chipBg: string; chipText: string; label: string }
> = {
  winner: {
    ring: "ring-2 ring-emerald-400/60 shadow-lg shadow-emerald-500/10",
    chipBg: "bg-emerald-500",
    chipText: "text-white",
    label: "Winner",
  },
  default: {
    ring: "ring-1 ring-amber-400/40",
    chipBg: "bg-amber-500",
    chipText: "text-white",
    label: "Default",
  },
  avoid: {
    ring: "ring-2 ring-red-400/50",
    chipBg: "bg-red-500",
    chipText: "text-white",
    label: "Avoid",
  },
  lottery: {
    ring: "ring-1 ring-slate-400/30",
    chipBg: "bg-slate-700",
    chipText: "text-white",
    label: "Lottery",
  },
};

export function HookComboGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-5 my-10">{children}</div>
  );
}

function ChannelPill({ active, channel }: { active: boolean; channel: "visual" | "text" | "spoken" }) {
  const palette = {
    visual: active
      ? "bg-violet-500/15 border-violet-500/40 text-violet-700"
      : "bg-slate-50 border-slate-200 text-slate-300",
    text: active
      ? "bg-content-coral/10 border-content-coral/40 text-content-coral"
      : "bg-slate-50 border-slate-200 text-slate-300",
    spoken: active
      ? "bg-sky-500/15 border-sky-500/40 text-sky-700"
      : "bg-slate-50 border-slate-200 text-slate-300",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-mono uppercase tracking-wider font-semibold ${palette[channel]}`}
    >
      {active ? <Check className="h-2.5 w-2.5" aria-hidden /> : <X className="h-2.5 w-2.5" aria-hidden />}
      {channel}
    </span>
  );
}

export function HookComboCard({
  visual = true,
  text = false,
  spoken = false,
  name,
  medianViews,
  sampleSize,
  status,
  note,
  textHook = "STOP SCROLLING",
}: {
  visual?: boolean;
  text?: boolean;
  spoken?: boolean;
  name: string;
  medianViews: string;
  sampleSize: string;
  status: ComboStatus;
  note?: string;
  textHook?: string;
}) {
  const s = STATUS_STYLE[status];
  return (
    <div
      className={`relative rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 ${s.ring}`}
    >
      <span
        className={`absolute -top-2.5 left-5 inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase ${s.chipBg} ${s.chipText}`}
      >
        {s.label}
      </span>
      <div className="flex items-start gap-5">
        <PhoneMockup hasVisual={visual} hasText={text} hasSpoken={spoken} width={132} textHook={textHook} />
        <div className="flex-1 min-w-0">
          <h4 className="text-slate-900 font-bold text-lg leading-tight mb-2">{name}</h4>
          <div className="flex flex-wrap gap-1.5 mb-4">
            <ChannelPill active={visual} channel="visual" />
            <ChannelPill active={text} channel="text" />
            <ChannelPill active={spoken} channel="spoken" />
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900 leading-none tabular-nums">
              {medianViews}
            </p>
            <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">
              Median views
            </p>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">Sample: {sampleSize}</p>
          {note && (
            <p className="text-[12px] text-slate-600 mt-3 leading-snug border-t border-slate-100 pt-3">{note}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* -- Caption mockup card (used by hashtags blog) -- */
export function CaptionCardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-5 my-10">{children}</div>
  );
}

export function CaptionCard({
  status,
  bucket,
  caption,
  handle = "@creator",
  hashtags = [],
  medianViews,
  sampleSize,
  platform = "Instagram",
  note,
}: {
  status: ComboStatus;
  bucket: string;
  caption: string;
  handle?: string;
  hashtags?: string[];
  medianViews: string;
  sampleSize: string;
  platform?: string;
  note?: string;
}) {
  const s = STATUS_STYLE[status];
  return (
    <div
      className={`relative rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 ${s.ring}`}
    >
      <span
        className={`absolute -top-2.5 left-5 inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase ${s.chipBg} ${s.chipText}`}
      >
        {s.label}
      </span>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
          {bucket}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
          {platform}
        </span>
      </div>

      {/* Caption mockup styled like an IG caption */}
      <div className="rounded-xl bg-slate-50/70 border border-slate-200/80 p-4 mb-5">
        <p className="text-[13px] font-bold text-slate-900 mb-1.5 leading-tight">{handle}</p>
        <p className="text-[13px] text-slate-700 leading-relaxed whitespace-pre-line">{caption}</p>
        {hashtags.length > 0 ? (
          <p className="text-[13px] leading-relaxed mt-2">
            {hashtags.map((h, i) => (
              <span key={i}>
                <span className="text-blue-600 font-medium">#{h}</span>
                {i < hashtags.length - 1 ? <span className="text-blue-600"> </span> : null}
              </span>
            ))}
          </p>
        ) : (
          <p className="text-[11px] text-slate-400 italic mt-2">no hashtags</p>
        )}
      </div>

      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-3xl font-bold text-slate-900 leading-none tabular-nums">
            {medianViews}
          </p>
          <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">
            Median views
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-slate-400 leading-snug">
            <span className="text-slate-500 font-semibold">{hashtags.length}</span>{" "}
            hashtag{hashtags.length === 1 ? "" : "s"}
          </p>
          <p className="text-[11px] text-slate-400 leading-snug mt-0.5">{sampleSize}</p>
        </div>
      </div>

      {note && (
        <p className="text-[12px] text-slate-600 mt-4 leading-snug border-t border-slate-100 pt-3">
          {note}
        </p>
      )}
    </div>
  );
}

/* -- Hashtag count visualizer (small inline pictogram) -- */
export function HashtagCountBar({
  count,
  max = 30,
  label,
}: {
  count: number;
  max?: number;
  label?: string;
}) {
  const filled = Math.min(count, max);
  return (
    <span className="not-prose inline-flex items-center gap-2 align-middle">
      <span className="inline-flex items-center gap-[2px]">
        {Array.from({ length: max }).map((_, i) => (
          <span
            key={i}
            className={`block h-2 w-1 rounded-full ${
              i < filled
                ? count >= 16
                  ? "bg-red-400"
                  : count >= 7
                    ? "bg-amber-400"
                    : "bg-emerald-400"
                : "bg-slate-200"
            }`}
          />
        ))}
      </span>
      {label && <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">{label}</span>}
    </span>
  );
}

/* -- Hook Section -- */
export function HookSection({
  rank,
  name,
  tagline,
  engagement,
  videos,
  topViews,
  engagementLabel,
  videosLabel,
  topViewsLabel,
  children,
}: {
  rank: number;
  name: string;
  tagline: string;
  color?: string;
  engagement: string;
  videos: string;
  topViews: string;
  engagementLabel?: string;
  videosLabel?: string;
  topViewsLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="not-prose border-t-2 border-slate-200 pt-10 my-10 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-center gap-3 mb-1">
        <span className="text-content-coral text-sm font-bold">
          #{rank}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {name}
        </h2>
      </div>
      <p className="text-slate-500 text-base mb-6">{tagline}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
          <p className="text-2xl font-bold text-slate-900">{engagement}</p>
          <p className="text-xs text-slate-500 mt-1">{engagementLabel || "Avg engagement"}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
          <p className="text-2xl font-bold text-slate-900">{videos}</p>
          <p className="text-xs text-slate-500 mt-1">{videosLabel || "Videos analyzed"}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
          <p className="text-2xl font-bold text-slate-900">{topViews}</p>
          <p className="text-xs text-slate-500 mt-1">{topViewsLabel || "Top video views"}</p>
        </div>
      </div>

      <div className="text-slate-700 text-[16px] leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  );
}

/* -- Hook Example Quote -- */
export function HookExample({
  quote,
  creator,
  views,
  url,
}: {
  quote: string;
  creator?: string;
  views?: string;
  url?: string;
}) {
  const inner = (
    <div className="not-prose bg-white rounded-xl border border-slate-200 px-5 py-4 my-3 flex items-start gap-3 group hover:border-content-coral/30 hover:shadow-sm transition-all">
      <span className="text-content-coral text-xl leading-none mt-0.5">&ldquo;</span>
      <div className="flex-1 min-w-0">
        <p className="text-slate-800 font-medium text-[15px] leading-snug">{quote}</p>
        {(creator || views) && (
          <p className="text-xs text-slate-400 mt-1.5">
            {creator && <span>@{creator}</span>}
            {creator && views && <span> &middot; </span>}
            {views && <span>{views} views</span>}
          </p>
        )}
      </div>
      {url && (
        <span className="text-xs text-slate-300 group-hover:text-content-coral transition-colors flex-shrink-0 mt-1">
          &#9654;
        </span>
      )}
    </div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="no-underline block">
        {inner}
      </a>
    );
  }
  return inner;
}

/* -- "When to use" mini box -- */
export function WhenToUse({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose bg-slate-50 rounded-xl border border-slate-200 px-5 py-4 mt-6">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">When to use this</p>
      <p className="text-sm text-slate-600 leading-relaxed">{children}</p>
    </div>
  );
}

/* -- Bar Chart -- */
const CHART_COLORS = [
  "#f4632a", // content-coral
  "#1e293b", // slate-800
  "#f4632a99", // coral 60%
  "#475569", // slate-600
  "#f4632a66", // coral 40%
  "#94a3b8", // slate-400
  "#f4632a40", // coral 25%
  "#cbd5e1", // slate-300
  "#f4632acc", // coral 80%
  "#334155", // slate-700
];

export function DataBarChart({
  data,
  xKey,
  yKey,
  title,
  yLabel,
  height = 350,
  suffix = "",
  horizontal = false,
}: {
  data: Record<string, string | number>[];
  xKey: string;
  yKey: string;
  title?: string;
  yLabel?: string;
  height?: number;
  suffix?: string;
  horizontal?: boolean;
}) {
  return (
    <figure className="not-prose my-8">
      {title && (
        <p className="text-xs sm:text-sm font-bold text-slate-700 mb-4 text-center">
          {title}
        </p>
      )}
      <div
        className="bg-white rounded-xl border border-slate-200 p-3 sm:p-6 overflow-x-auto"
        style={{ minHeight: height }}
      >
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer width="100%" height="100%">
            {horizontal ? (
              <BarChart data={data} layout="vertical" margin={{ left: 0, right: 20, top: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: "#64748b" }}
                  tickFormatter={(v) => `${v}${suffix}`}
                />
                <YAxis
                  dataKey={xKey}
                  type="category"
                  tick={{ fontSize: 10, fill: "#334155" }}
                  width={90}
                />
                <Tooltip
                  formatter={(value) => [`${value}${suffix}`, yLabel || yKey]}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    fontSize: 12,
                    padding: "8px 12px",
                  }}
                />
                <Bar dataKey={yKey} radius={[0, 6, 6, 0]} barSize={24}>
                  {data.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <BarChart data={data} margin={{ left: -15, right: 5, top: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey={xKey}
                  tick={{ fontSize: 9, fill: "#64748b" }}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  height={55}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#64748b" }}
                  tickFormatter={(v) => `${v}${suffix}`}
                  width={40}
                />
                <Tooltip
                  formatter={(value) => [`${value}${suffix}`, yLabel || yKey]}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    fontSize: 12,
                    padding: "8px 12px",
                  }}
                />
                <Bar dataKey={yKey} radius={[6, 6, 0, 0]} barSize={32}>
                  {data.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </figure>
  );
}

/* -- Pie / Donut Chart -- */
export function DataPieChart({
  data,
  nameKey,
  valueKey,
  title,
  height = 350,
  donut = false,
}: {
  data: Record<string, string | number>[];
  nameKey: string;
  valueKey: string;
  title?: string;
  height?: number;
  donut?: boolean;
}) {
  return (
    <figure className="not-prose my-8">
      {title && (
        <p className="text-xs sm:text-sm font-bold text-slate-700 mb-4 text-center">
          {title}
        </p>
      )}
      <div
        className="bg-white rounded-xl border border-slate-200 p-3 sm:p-6"
        style={{ height }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey={valueKey}
              nameKey={nameKey}
              cx="50%"
              cy="50%"
              innerRadius={donut ? "40%" : 0}
              outerRadius="65%"
              paddingAngle={2}
              label={({ name, percent }) =>
                `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
              }
              labelLine={{ stroke: "#94a3b8" }}
              fontSize={9}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                fontSize: 13,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}

/* -- Niche Bubble Map (size = volume, color = hit rate) -- */
export function NicheBubbleMap({
  rows,
  metric = "% hit 100K+",
  suffix = "%",
  title,
  legendNote,
}: {
  rows: {
    niche: string;
    value: number;
    volume: number;
    extra?: string;
  }[];
  metric?: string;
  suffix?: string;
  title?: string;
  legendNote?: string;
}) {
  const maxVolume = Math.max(...rows.map((r) => r.volume));
  const sortedByVolume = [...rows].sort((a, b) => b.volume - a.volume);

  // sqrt scale so volume doesn't dominate too much
  function sizeFor(volume: number) {
    const t = Math.sqrt(volume) / Math.sqrt(maxVolume); // 0..1
    return Math.round(96 + 144 * t); // 96px..240px
  }

  function colorFor(v: number) {
    if (v >= 32)
      return {
        bg: "bg-content-coral",
        text: "text-white",
        ring: "ring-content-coral/40",
        accent: "text-white/85",
        glow: "shadow-[0_8px_28px_-6px_rgba(255,107,107,0.55)]",
      };
    if (v >= 25)
      return {
        bg: "bg-content-coral/85",
        text: "text-white",
        ring: "ring-content-coral/30",
        accent: "text-white/85",
        glow: "shadow-[0_8px_28px_-6px_rgba(255,107,107,0.4)]",
      };
    if (v >= 19)
      return {
        bg: "bg-orange-400",
        text: "text-white",
        ring: "ring-orange-300/40",
        accent: "text-white/85",
        glow: "shadow-[0_6px_20px_-6px_rgba(251,146,60,0.5)]",
      };
    if (v >= 14)
      return {
        bg: "bg-amber-300",
        text: "text-amber-900",
        ring: "ring-amber-200/60",
        accent: "text-amber-900/75",
        glow: "shadow-[0_6px_18px_-6px_rgba(252,211,77,0.5)]",
      };
    if (v >= 9)
      return {
        bg: "bg-slate-300",
        text: "text-slate-700",
        ring: "ring-slate-200/60",
        accent: "text-slate-600",
        glow: "shadow-[0_4px_14px_-4px_rgba(148,163,184,0.4)]",
      };
    return {
      bg: "bg-slate-200",
      text: "text-slate-500",
      ring: "ring-slate-200/60",
      accent: "text-slate-400",
      glow: "shadow-[0_4px_14px_-4px_rgba(148,163,184,0.3)]",
    };
  }

  return (
    <figure className="not-prose my-10">
      {title && (
        <p className="text-xs sm:text-sm font-bold text-slate-700 mb-4 text-center">
          {title}
        </p>
      )}
      <div className="relative rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-50 p-5 sm:p-8 overflow-hidden">
        {/* Subtle grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,23,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative flex flex-wrap gap-3 sm:gap-4 justify-center items-center">
          {sortedByVolume.map((row) => {
            const c = colorFor(row.value);
            const size = sizeFor(row.volume);
            const fontScale = Math.max(0.7, Math.min(1.15, size / 180));
            return (
              <div
                key={row.niche}
                className={`group relative ${c.bg} ${c.text} rounded-full ring-1 ${c.ring} ${c.glow} flex flex-col items-center justify-center text-center p-3 transition-transform hover:scale-[1.04] cursor-default`}
                style={{
                  width: size,
                  height: size,
                  flexShrink: 0,
                }}
                title={`${row.niche}: ${row.value}${suffix} hit rate · ${row.volume.toLocaleString()} videos`}
              >
                <p
                  className="font-bold leading-tight tracking-tight px-2"
                  style={{ fontSize: Math.round(13 * fontScale) }}
                >
                  {row.niche}
                </p>
                <p
                  className="font-bold tabular-nums leading-none mt-1"
                  style={{ fontSize: Math.round(28 * fontScale) }}
                >
                  {row.value.toFixed(1)}
                  {suffix}
                </p>
                {row.extra && (
                  <p
                    className={`${c.accent} font-mono uppercase tracking-wider mt-1`}
                    style={{ fontSize: Math.round(9 * fontScale) }}
                  >
                    {row.extra}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Legend */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4 px-1">
        <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-slate-300 ring-1 ring-slate-200" />
            <span className="h-4 w-4 rounded-full bg-slate-300 ring-1 ring-slate-200" />
            <span className="h-5 w-5 rounded-full bg-slate-300 ring-1 ring-slate-200" />
            Size = sample
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-slate-200" />
            <span className="h-3 w-3 rounded-sm bg-amber-300" />
            <span className="h-3 w-3 rounded-sm bg-orange-400" />
            <span className="h-3 w-3 rounded-sm bg-content-coral" />
            Color = {metric}
          </span>
        </div>
        {legendNote && (
          <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-400">
            {legendNote}
          </p>
        )}
      </div>
    </figure>
  );
}

/* -- Niche Heat Map (ranked horizontal heat bars) -- */
export function NicheHeatMap({
  rows,
  metric = "hit rate",
  suffix = "%",
  title,
}: {
  rows: {
    niche: string;
    value: number;
    sample: string;
    extra?: string;
  }[];
  metric?: string;
  suffix?: string;
  title?: string;
}) {
  const max = Math.max(...rows.map((r) => r.value));
  const min = Math.min(...rows.map((r) => r.value));
  const range = Math.max(1, max - min);

  // Coral → orange → amber → slate as values descend
  function colorFor(v: number) {
    const t = (v - min) / range; // 0..1, higher = hotter
    if (t > 0.85) return { bg: "bg-content-coral", text: "text-white", chip: "bg-content-coral text-white" };
    if (t > 0.65) return { bg: "bg-content-coral/80", text: "text-white", chip: "bg-content-coral/85 text-white" };
    if (t > 0.45) return { bg: "bg-orange-400", text: "text-white", chip: "bg-orange-400 text-white" };
    if (t > 0.25) return { bg: "bg-amber-300", text: "text-amber-900", chip: "bg-amber-300 text-amber-900" };
    if (t > 0.1) return { bg: "bg-slate-300", text: "text-slate-700", chip: "bg-slate-300 text-slate-700" };
    return { bg: "bg-slate-200", text: "text-slate-500", chip: "bg-slate-200 text-slate-500" };
  }

  return (
    <figure className="not-prose my-10">
      {title && (
        <p className="text-xs sm:text-sm font-bold text-slate-700 mb-4 text-center">
          {title}
        </p>
      )}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[180px_1fr_70px] gap-2 sm:gap-4 px-4 sm:px-5 py-3 bg-slate-50 border-b border-slate-200 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500 font-bold">
          <span>Niche</span>
          <span className="hidden sm:block">{metric}</span>
          <span className="text-right">Value</span>
        </div>
        {/* Rows */}
        <ol className="divide-y divide-slate-100">
          {rows.map((row, i) => {
            const c = colorFor(row.value);
            const widthPct = ((row.value - 0) / Math.max(1, max)) * 100;
            return (
              <li
                key={row.niche}
                className="grid grid-cols-[1fr_auto] sm:grid-cols-[180px_1fr_70px] gap-2 sm:gap-4 items-center px-4 sm:px-5 py-3 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[11px] font-mono tabular-nums text-slate-400 w-5 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 leading-tight truncate">
                      {row.niche}
                    </p>
                    <p className="text-[10px] font-mono text-slate-400 truncate">
                      {row.sample}
                      {row.extra ? ` · ${row.extra}` : ""}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block relative h-8 bg-slate-100 rounded-md overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 ${c.bg} rounded-md transition-all`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-1 rounded-md text-[12px] font-mono font-bold tabular-nums ${c.chip}`}
                  >
                    {row.value.toFixed(1)}
                    {suffix}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-3 text-[10px] font-mono uppercase tracking-wider text-slate-500">
        <span>Low</span>
        <span className="inline-flex items-center gap-0.5">
          <span className="h-3 w-3 rounded-sm bg-slate-200" />
          <span className="h-3 w-3 rounded-sm bg-slate-300" />
          <span className="h-3 w-3 rounded-sm bg-amber-300" />
          <span className="h-3 w-3 rounded-sm bg-orange-400" />
          <span className="h-3 w-3 rounded-sm bg-content-coral/80" />
          <span className="h-3 w-3 rounded-sm bg-content-coral" />
        </span>
        <span>High</span>
      </div>
    </figure>
  );
}

/* -- Tier Heat Matrix (niches × tiers) -- */
export function TierHeatMatrix({
  rows,
  title,
}: {
  rows: {
    niche: string;
    t1: number;
    t2: number;
    t3: number;
    sample?: string;
  }[];
  title?: string;
}) {
  const allValues = rows.flatMap((r) => [r.t1, r.t2, r.t3]);
  const max = Math.max(...allValues);

  function cellStyle(v: number) {
    const t = v / Math.max(1, max);
    if (t > 0.85) return "bg-content-coral text-white";
    if (t > 0.6) return "bg-content-coral/75 text-white";
    if (t > 0.4) return "bg-orange-400 text-white";
    if (t > 0.22) return "bg-amber-300 text-amber-900";
    if (t > 0.1) return "bg-slate-200 text-slate-700";
    return "bg-slate-100 text-slate-500";
  }

  return (
    <figure className="not-prose my-10">
      {title && (
        <p className="text-xs sm:text-sm font-bold text-slate-700 mb-4 text-center">
          {title}
        </p>
      )}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500">
              <th className="text-left px-4 py-3 font-bold">Niche</th>
              <th className="text-center px-3 py-3 font-bold">Under 100K</th>
              <th className="text-center px-3 py-3 font-bold">100K-1M</th>
              <th className="text-center px-3 py-3 font-bold">1M+</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.niche} className="border-b border-slate-100 last:border-b-0">
                <td className="px-4 py-3 align-middle">
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">
                      {row.niche}
                    </p>
                    {row.sample && (
                      <p className="text-[10px] font-mono text-slate-400">
                        {row.sample}
                      </p>
                    )}
                  </div>
                </td>
                {([row.t1, row.t2, row.t3] as const).map((v, i) => (
                  <td key={i} className="px-2 py-2 align-middle">
                    <div
                      className={`mx-auto w-full h-12 sm:h-14 rounded-md flex items-center justify-center font-mono font-bold tabular-nums text-xs sm:text-sm ${cellStyle(v)}`}
                    >
                      {v.toFixed(1)}%
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

/* -- Multi-Series Bar Chart (tier comparison) -- */
export function TierComparisonChart({
  data,
  xKey,
  series,
  title,
  height = 360,
  suffix = "%",
}: {
  data: Record<string, string | number>[];
  xKey: string;
  series: { key: string; label: string; color: string }[];
  title?: string;
  height?: number;
  suffix?: string;
}) {
  return (
    <figure className="not-prose my-8">
      {title && (
        <p className="text-xs sm:text-sm font-bold text-slate-700 mb-4 text-center">
          {title}
        </p>
      )}
      <div
        className="bg-white rounded-xl border border-slate-200 p-3 sm:p-6 overflow-x-auto"
        style={{ minHeight: height }}
      >
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: -10, right: 5, top: 5, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey={xKey}
                tick={{ fontSize: 10, fill: "#334155" }}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#64748b" }}
                tickFormatter={(v) => `${v}${suffix}`}
                width={42}
              />
              <Tooltip
                formatter={(value, name) => [`${value}${suffix}`, name]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                  padding: "8px 12px",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                iconType="circle"
              />
              {series.map((s) => (
                <Bar
                  key={s.key}
                  dataKey={s.key}
                  name={s.label}
                  fill={s.color}
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </figure>
  );
}

/* -- Hook Archetype Glossary -- */
type ArchetypeTrend = "scales" | "peaks-mid" | "collapses" | "bimodal" | "flat";

const TREND_STYLE: Record<ArchetypeTrend, { label: string; chip: string; ring: string; arrow: string }> = {
  scales: {
    label: "Scales with views",
    chip: "bg-emerald-50 text-emerald-700 border-emerald-200",
    ring: "ring-1 ring-emerald-200",
    arrow: "↗",
  },
  "peaks-mid": {
    label: "Peaks at 100K-1M",
    chip: "bg-amber-50 text-amber-700 border-amber-200",
    ring: "ring-1 ring-amber-200",
    arrow: "△",
  },
  collapses: {
    label: "Collapses past 100K",
    chip: "bg-rose-50 text-rose-700 border-rose-200",
    ring: "ring-1 ring-rose-200",
    arrow: "↘",
  },
  bimodal: {
    label: "Bimodal (T1 + T3)",
    chip: "bg-violet-50 text-violet-700 border-violet-200",
    ring: "ring-1 ring-violet-200",
    arrow: "⇡⇣",
  },
  flat: {
    label: "Flat across tiers",
    chip: "bg-slate-100 text-slate-700 border-slate-200",
    ring: "ring-1 ring-slate-200",
    arrow: "→",
  },
};

export function HookArchetypeGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      {children}
    </div>
  );
}

export function HookArchetypeCard({
  name,
  meaning,
  example,
  trend = "flat",
  tierShare,
}: {
  name: string;
  meaning: string;
  example: string;
  trend?: ArchetypeTrend;
  tierShare?: string;
}) {
  const t = TREND_STYLE[trend];
  return (
    <div
      className={`relative rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 ${t.ring} transition-shadow hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span
            className="text-2xl font-bold text-slate-300 tabular-nums leading-none"
            aria-hidden
          >
            {t.arrow}
          </span>
          <h4 className="text-slate-900 font-bold text-lg leading-tight">
            {name}
          </h4>
        </div>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-mono uppercase tracking-wider font-semibold whitespace-nowrap ${t.chip}`}
        >
          {t.label}
        </span>
      </div>
      <p className="text-[14px] text-slate-700 leading-relaxed mb-3">
        {meaning}
      </p>
      <blockquote className="text-[13px] text-slate-500 italic leading-snug border-l-2 border-slate-200 pl-3 py-1 mb-3">
        &ldquo;{example}&rdquo;
      </blockquote>
      {tierShare && (
        <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 border-t border-slate-100 pt-3">
          {tierShare}
        </p>
      )}
    </div>
  );
}

/* -- Tier Scale Visual: hero-scale view-jump visualization -- */
export function TierScaleVisual({
  tiers,
}: {
  tiers: {
    label: string;
    median: string;
    medianRaw: number;
    sample: string;
    color?: "slate" | "coral" | "emerald";
  }[];
}) {
  const palette = {
    slate: { dot: "bg-slate-400", text: "text-slate-700", glow: "bg-slate-200" },
    coral: { dot: "bg-content-coral", text: "text-content-coral", glow: "bg-content-coral/20" },
    emerald: { dot: "bg-emerald-500", text: "text-emerald-700", glow: "bg-emerald-200" },
  } as const;

  return (
    <figure className="not-prose my-10">
      <div className="relative rounded-2xl bg-gradient-to-br from-slate-50 via-white to-slate-50 border border-slate-200 p-6 sm:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-3 items-end relative">
          {tiers.map((tier, i) => {
            const c = palette[tier.color || "slate"];
            const sizeScale = 0.55 + 0.45 * (i / Math.max(1, tiers.length - 1));
            const dotSize = Math.round(60 + 60 * sizeScale);
            const fontSize = i === tiers.length - 1 ? "text-3xl sm:text-5xl" : i === 0 ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl";
            const nextTier = tiers[i + 1];
            const multiplier = nextTier
              ? Math.round(nextTier.medianRaw / Math.max(1, tier.medianRaw))
              : null;
            return (
              <div key={tier.label} className="relative flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div
                    className={`absolute inset-0 rounded-full blur-2xl ${c.glow}`}
                    aria-hidden
                  />
                  <div
                    className={`relative rounded-full ${c.dot} flex items-center justify-center shadow-md`}
                    style={{ width: dotSize, height: dotSize }}
                    aria-hidden
                  >
                    <span className="text-white font-bold text-lg">{i + 1}</span>
                  </div>
                </div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500 font-bold mb-2">
                  {tier.label}
                </p>
                <p className={`${fontSize} font-bold tabular-nums leading-none ${c.text} mb-1`}>
                  {tier.median}
                </p>
                <p className="text-xs text-slate-500 font-mono">
                  median views
                </p>
                <p className="text-[11px] text-slate-400 mt-2">{tier.sample}</p>
                {multiplier && (
                  <span
                    className="hidden sm:inline-flex absolute top-1/3 -right-3 translate-x-1/2 items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-[11px] font-mono font-bold text-slate-700 z-10"
                    aria-hidden
                  >
                    <ArrowRight className="h-3 w-3 text-content-coral" />
                    {multiplier}x
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </figure>
  );
}
