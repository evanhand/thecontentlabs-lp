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
  ExternalLink,
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
    <section className="not-prose my-12 lab-card px-5 py-8 sm:px-10 sm:py-10">
      <h3 className="font-heading text-2xl sm:text-[28px] font-semibold text-ink leading-[1.2] tracking-[-0.02em] mb-3 max-w-3xl text-balance">
        {headline}
      </h3>
      <p className="text-[15px] sm:text-base text-ink-2 leading-relaxed mb-6 max-w-[60ch]">
        {sub}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <a
          href={primaryLink}
          className="group inline-flex items-center justify-center h-11 px-5 bg-content-coral rounded-[10px] text-sm font-medium text-white no-underline transition-[background-color,transform] duration-150 hover:bg-content-coral/90 active:scale-[0.97]"
        >
          {primaryText}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        {secondary && (
          <a
            href={secondaryHref}
            className="inline-flex items-center justify-center h-11 px-5 bg-surface border border-line/[0.14] rounded-[10px] text-sm font-medium text-ink no-underline transition-colors hover:bg-sunken active:scale-[0.97]"
          >
            {secondary}
          </a>
        )}
      </div>

      <p className="text-meta text-ink-3 mt-5 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span>21,000+ videos analyzed</span>
        <span aria-hidden>·</span>
        <span>No credit card required</span>
        <span aria-hidden>·</span>
        <span>60 seconds</span>
      </p>
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
    <div className="not-prose overflow-x-auto my-8 rounded-xl border border-line/[0.08] bg-surface">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-sunken">
            <th className="text-left px-4 py-3 text-meta font-semibold text-ink">
              Feature
            </th>
            <th className="text-center px-4 py-3 text-meta font-semibold text-ink">
              {usLabel}
            </th>
            <th className="text-center px-4 py-3 text-meta font-semibold text-ink-3">
              {themLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((f) => (
            <tr key={f.name} className="border-t border-line/[0.08]">
              <td className="px-4 py-3 text-ink-2">{f.name}</td>
              <td className="px-4 py-3 text-center">
                {f.us ? (
                  <Check aria-label="Yes" className="h-4 w-4 text-ink mx-auto" />
                ) : (
                  <X aria-label="No" className="h-4 w-4 text-ink-3 mx-auto" />
                )}
              </td>
              <td className="px-4 py-3 text-center">
                {f.them ? (
                  <Check aria-label="Yes" className="h-4 w-4 text-ink mx-auto" />
                ) : (
                  <X aria-label="No" className="h-4 w-4 text-ink-3 mx-auto" />
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
    info: "bg-sunken border-line/[0.08] text-ink-2",
    tip: "bg-sunken border-line/[0.08] text-ink-2",
    warning: "bg-amber-500/10 border-amber-500/20 text-amber-800 dark:text-amber-200",
  };
  return (
    <div
      className={`not-prose rounded-xl border px-5 py-4 my-8 text-[15px] leading-relaxed [&>p]:my-2 [&>p]:text-[15px] [&>p]:text-inherit [&>:first-child]:mt-0 [&>:last-child]:mb-0 ${styles[type]}`}
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
    <div className="not-prose lab-card p-5 text-center">
      <p className="font-heading text-3xl font-semibold text-ink tabular-nums">{stat}</p>
      <p className="text-meta text-ink-3 mt-1">{label}</p>
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
        className="w-full rounded-xl border border-line/[0.08] bg-sunken"
      />
      {caption && (
        <figcaption className="text-meta text-ink-3 text-center mt-2">
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
        className="rounded-xl border border-line/[0.08] max-w-full"
      />
      {caption && (
        <figcaption className="text-meta text-ink-3 text-center mt-3">
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
        className="rounded-xl border border-line/[0.08] max-w-full"
      />
      {caption && (
        <figcaption className="text-meta text-ink-3 text-center mt-3">
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
    <div className="not-prose lab-card p-5 sm:p-6 my-8">
      {title && (
        <p className="text-[15px] font-semibold text-ink mb-2">
          {title}
        </p>
      )}
      <div className="text-ink-2 text-[15px] leading-relaxed space-y-2 [&_p]:my-0 [&_p]:text-[15px] [&_ul]:my-2 [&_ol]:my-2 [&_li]:text-[15px]">
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
          className="flex gap-4 items-start lab-card p-5"
        >
          <span className="font-heading text-2xl font-semibold text-ink tabular-nums flex-shrink-0">
            {item.number}
          </span>
          <p className="text-sm text-ink-2 leading-relaxed">{item.text}</p>
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
      {/* Outer bezel */}
      <div className="absolute inset-0 rounded-[2rem] bg-slate-900 p-[5px] shadow-[0_8px_24px_-12px_rgba(15,23,42,0.35)]">
        {/* Inner screen */}
        <div className="relative h-full w-full rounded-[1.65rem] overflow-hidden bg-slate-950">
          {/* Visual layer: a flat "frame" stands in for the video */}
          {hasVisual ? (
            <div aria-hidden className="absolute inset-0 bg-slate-500">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-slate-600" />
            </div>
          ) : (
            <div aria-hidden className="absolute inset-0 bg-slate-900" />
          )}

          {/* Status bar */}
          <div aria-hidden className="absolute top-0 inset-x-0 z-30 px-3.5 pt-1.5 flex items-center justify-between text-white">
            <span className="h-1 w-5 rounded-full bg-white/80" />
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
                  <div className="w-7 h-7 rounded-full bg-black/25 flex items-center justify-center">
                    <Icon className="h-3.5 w-3.5 text-white" strokeWidth={2} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom: username strip + audio bar */}
          {(hasSpoken || detailed) && hasVisual && (
            <div className="absolute bottom-0 inset-x-0 z-20 px-3 pb-3 pt-6 bg-black/40">
              <p className="text-white text-xs font-semibold mb-1 tracking-tight">{handle}</p>
              {hasSpoken ? (
                <div className="flex items-center gap-1.5 max-w-[80%]">
                  <Volume2 className="h-2.5 w-2.5 text-white flex-shrink-0" />
                  <div className="flex items-end gap-[1.5px] h-2.5 flex-1">
                    {[35, 60, 80, 100, 75, 55, 90, 100, 65, 40, 70, 50, 85, 60].map((h, i) => (
                      <span
                        key={i}
                        className="flex-1 bg-white/80 rounded-full"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <span aria-hidden className="block h-1 w-8 rounded-full bg-white/40" />
              )}
            </div>
          )}

          {/* Text hook overlay */}
          {hasText && (
            <div className="absolute inset-x-3 top-[38%] z-25">
              <div className="px-3 py-2 rounded-lg bg-white">
                <p className="text-slate-900 font-semibold leading-tight text-center text-xs">
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

export function HookFramework() {
  return (
    <section className="not-prose my-10 lab-card">
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 items-center p-5 sm:p-8">
        <div className="mx-auto sm:mx-0">
          <PhoneMockup hasVisual hasText hasSpoken width={188} />
        </div>

        <div>
          <h3 className="font-heading text-xl sm:text-2xl font-semibold text-ink leading-[1.2] tracking-[-0.02em] mb-5">
            Every short-form video can fire up to three hook channels at once.
          </h3>
          <ul className="space-y-4">
            {CHANNEL_INFO.map((c) => {
              const Icon = c.icon;
              return (
                <li key={c.id} className="flex items-start gap-3">
                  <Icon aria-hidden className="h-4 w-4 mt-0.5 flex-shrink-0 text-ink-3" />
                  <div className="min-w-0">
                    <h4 className="text-ink font-semibold text-[15px] leading-tight mb-1">
                      <span className="font-mono text-xs text-ink-3 mr-2 tabular-nums">{c.number}</span>
                      {c.label}
                    </h4>
                    <p className="text-ink-2 text-sm leading-relaxed">{c.description}</p>
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
    ring: "",
    chipBg: "bg-emerald-500/10",
    chipText: "text-emerald-700 dark:text-emerald-300",
    label: "Winner",
  },
  default: {
    ring: "",
    chipBg: "bg-amber-500/10",
    chipText: "text-amber-700 dark:text-amber-300",
    label: "Default",
  },
  avoid: {
    ring: "",
    chipBg: "bg-red-500/10",
    chipText: "text-red-700 dark:text-red-300",
    label: "Avoid",
  },
  lottery: {
    ring: "",
    chipBg: "bg-sunken",
    chipText: "text-ink-2",
    label: "Lottery",
  },
};

export function HookComboGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-5 my-10">{children}</div>
  );
}

function ChannelPill({ active, channel }: { active: boolean; channel: "visual" | "text" | "spoken" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium capitalize ${
        active
          ? "bg-surface border-line/[0.14] text-ink"
          : "bg-sunken border-transparent text-ink-3 line-through decoration-ink-3/60"
      }`}
    >
      {active ? <Check className="h-3 w-3" aria-hidden /> : <X className="h-3 w-3" aria-hidden />}
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
      className="relative lab-card p-5 sm:p-6"
    >
      <span
        className={`inline-flex items-center mb-4 px-2 py-0.5 rounded-full text-xs font-medium ${s.chipBg} ${s.chipText}`}
      >
        {s.label}
      </span>
      <div className="flex items-start gap-5">
        <PhoneMockup hasVisual={visual} hasText={text} hasSpoken={spoken} width={132} textHook={textHook} />
        <div className="flex-1 min-w-0">
          <h4 className="text-ink font-semibold text-[17px] leading-tight mb-2">{name}</h4>
          <div className="flex flex-wrap gap-1.5 mb-4">
            <ChannelPill active={visual} channel="visual" />
            <ChannelPill active={text} channel="text" />
            <ChannelPill active={spoken} channel="spoken" />
          </div>
          <div>
            <p className="font-heading text-3xl font-semibold text-ink leading-none tabular-nums">
              {medianViews}
            </p>
            <p className="text-meta text-ink-3 mt-1">
              Median views
            </p>
          </div>
          <p className="text-xs text-ink-3 mt-3">Sample: {sampleSize}</p>
          {note && (
            <p className="text-meta text-ink-2 mt-3 border-t border-line/[0.08] pt-3">{note}</p>
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
      className="relative lab-card p-5 sm:p-6"
    >
      <span
        className={`inline-flex items-center mb-4 px-2 py-0.5 rounded-full text-xs font-medium ${s.chipBg} ${s.chipText}`}
      >
        {s.label}
      </span>
      <div className="flex items-center justify-between mb-4">
        <span className="text-meta font-medium text-ink-2">
          {bucket}
        </span>
        <span className="text-xs text-ink-3">
          {platform}
        </span>
      </div>

      {/* Caption mockup styled like an IG caption */}
      <div className="rounded-xl bg-sunken p-4 mb-5">
        <p className="text-[13px] font-semibold text-ink mb-1.5 leading-tight">{handle}</p>
        <p className="text-[13px] text-ink-2 leading-relaxed whitespace-pre-line">{caption}</p>
        {hashtags.length > 0 ? (
          <p className="text-[13px] leading-relaxed mt-2">
            {hashtags.map((h, i) => (
              <span key={i}>
                <span className="text-sky-700 dark:text-sky-300 font-medium">#{h}</span>
                {i < hashtags.length - 1 ? <span> </span> : null}
              </span>
            ))}
          </p>
        ) : (
          <p className="text-xs text-ink-3 italic mt-2">no hashtags</p>
        )}
      </div>

      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-heading text-3xl font-semibold text-ink leading-none tabular-nums">
            {medianViews}
          </p>
          <p className="text-meta text-ink-3 mt-1">
            Median views
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-ink-3 leading-snug">
            <span className="text-ink-2 font-semibold tabular-nums">{hashtags.length}</span>{" "}
            hashtag{hashtags.length === 1 ? "" : "s"}
          </p>
          <p className="text-xs text-ink-3 leading-snug mt-0.5">{sampleSize}</p>
        </div>
      </div>

      {note && (
        <p className="text-meta text-ink-2 mt-4 border-t border-line/[0.08] pt-3">
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
                : "bg-line/[0.12]"
            }`}
          />
        ))}
      </span>
      {label && <span className="text-xs font-mono text-ink-3">{label}</span>}
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
    <section className="not-prose border-t border-line/[0.08] pt-10 my-12 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline gap-3 mb-2">
        <span className="font-mono text-sm text-ink-3 tabular-nums">
          #{rank}
        </span>
        <h2 className="font-heading text-[24px] sm:text-[28px] font-semibold tracking-[-0.02em] text-ink scroll-mt-28">
          {name}
        </h2>
      </div>
      <p className="text-ink-2 text-[17px] mb-6">{tagline}</p>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          [engagement, engagementLabel || "Avg engagement"],
          [videos, videosLabel || "Videos analyzed"],
          [topViews, topViewsLabel || "Top video views"],
        ].map(([value, label]) => (
          <div key={label} className="bg-sunken rounded-xl p-4 text-center">
            <p className="font-heading text-xl sm:text-2xl font-semibold text-ink tabular-nums">{value}</p>
            <p className="text-xs text-ink-3 mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="text-ink-2 text-[17px] leading-7 space-y-4 [&_p]:my-0">
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
    <div className="not-prose bg-surface rounded-xl border border-line/[0.08] px-5 py-4 my-3 flex items-start gap-3 group transition-colors hover:border-line/[0.16]">
      <span aria-hidden className="text-ink-3 text-xl leading-none mt-0.5">&ldquo;</span>
      <div className="flex-1 min-w-0">
        <p className="text-ink font-medium text-[15px] leading-snug">{quote}</p>
        {(creator || views) && (
          <p className="text-xs text-ink-3 mt-1.5">
            {creator && <span>@{creator}</span>}
            {creator && views && <span> &middot; </span>}
            {views && <span>{views} views</span>}
          </p>
        )}
      </div>
      {url && (
        <ExternalLink aria-hidden className="h-4 w-4 text-ink-3 group-hover:text-ink transition-colors flex-shrink-0 mt-0.5" />
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
    <div className="not-prose bg-sunken rounded-xl px-5 py-4 mt-6">
      <p className="text-meta font-semibold text-ink mb-1">When to use this</p>
      <div className="text-[15px] text-ink-2 leading-relaxed [&_p]:my-0 [&_p]:text-[15px]">{children}</div>
    </div>
  );
}

/* -- Bar Chart -- */
// Charts per DESIGN.md: coral for the primary/leading value, neutral slates
// for everything else. Pie slices step through a neutral ramp after coral.
const CHART_CORAL = "#f4632a";
const CHART_NEUTRAL = "#94a3b8"; // slate-400
const CHART_COLORS = [
  CHART_CORAL,
  "#334155", // slate-700
  CHART_NEUTRAL,
  "#64748b", // slate-500
  "#cbd5e1", // slate-300
  "#475569", // slate-600
  "#e2e8f0", // slate-200
];
const SERIES_COLORS = [CHART_CORAL, "#334155", CHART_NEUTRAL];
const CHART_AXIS = { fontSize: 12, fill: "#64748b" };
const CHART_GRID = "rgba(15,23,42,0.08)";
const CHART_TOOLTIP = {
  borderRadius: 12,
  border: "1px solid rgba(15,23,42,0.08)",
  boxShadow: "0 4px 16px -8px rgba(15,23,42,0.15)",
  fontSize: 13,
  padding: "8px 12px",
};

function barFill(data: Record<string, string | number>[], yKey: string, i: number) {
  let maxIdx = 0;
  data.forEach((d, j) => {
    if (Number(d[yKey]) > Number(data[maxIdx][yKey])) maxIdx = j;
  });
  return i === maxIdx ? CHART_CORAL : CHART_NEUTRAL;
}

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
      <div
        className="lab-card p-4 sm:p-6 overflow-x-auto"
        style={{ minHeight: height }}
      >
        {title && (
          <figcaption className="text-[15px] font-semibold text-ink mb-4">
            {title}
          </figcaption>
        )}
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer width="100%" height="100%">
            {horizontal ? (
              <BarChart data={data} layout="vertical" margin={{ left: 0, right: 20, top: 5, bottom: 5 }}>
                <CartesianGrid stroke={CHART_GRID} horizontal={false} />
                <XAxis
                  type="number"
                  tick={CHART_AXIS}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}${suffix}`}
                />
                <YAxis
                  dataKey={xKey}
                  type="category"
                  tick={CHART_AXIS}
                  axisLine={false}
                  tickLine={false}
                  width={96}
                />
                <Tooltip
                  cursor={{ fill: "rgba(15,23,42,0.04)" }}
                  formatter={(value) => [`${value}${suffix}`, yLabel || yKey]}
                  contentStyle={CHART_TOOLTIP}
                />
                <Bar dataKey={yKey} radius={[0, 6, 6, 0]} barSize={22}>
                  {data.map((_, i) => (
                    <Cell key={i} fill={barFill(data, yKey, i)} />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <BarChart data={data} margin={{ left: -15, right: 5, top: 5, bottom: 5 }}>
                <CartesianGrid stroke={CHART_GRID} vertical={false} />
                <XAxis
                  dataKey={xKey}
                  tick={CHART_AXIS}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={CHART_AXIS}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}${suffix}`}
                  width={44}
                />
                <Tooltip
                  cursor={{ fill: "rgba(15,23,42,0.04)" }}
                  formatter={(value) => [`${value}${suffix}`, yLabel || yKey]}
                  contentStyle={CHART_TOOLTIP}
                />
                <Bar dataKey={yKey} radius={[6, 6, 0, 0]} barSize={32}>
                  {data.map((_, i) => (
                    <Cell key={i} fill={barFill(data, yKey, i)} />
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
      <div className="lab-card p-4 sm:p-6">
        {title && (
          <figcaption className="text-[15px] font-semibold text-ink mb-4">
            {title}
          </figcaption>
        )}
        <div style={{ height }}>
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
              fontSize={12}
              stroke="none"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={CHART_TOOLTIP} />
          </PieChart>
        </ResponsiveContainer>
        </div>
      </div>
    </figure>
  );
}

/* -- Metric Delta: dramatic single-metric tier comparison with punchline -- */
export function MetricDelta({
  metric,
  conclusion,
  direction = "up",
  tiers,
  unit = "",
}: {
  metric: string;
  conclusion: string;
  direction?: "up" | "down";
  tiers: { label: string; value: number; display: string; tone?: "slate" | "amber" | "coral" | "emerald" }[];
  unit?: string;
}) {
  const max = Math.max(...tiers.map((t) => t.value));
  const palette = {
    slate: { bar: "bg-slate-300 dark:bg-slate-600", text: "text-ink" },
    amber: { bar: "bg-slate-400", text: "text-ink" },
    coral: { bar: "bg-content-coral", text: "text-ink" },
    emerald: { bar: "bg-content-coral", text: "text-ink" },
  } as const;
  const winnerIdx = direction === "up"
    ? tiers.indexOf(tiers.reduce((a, b) => (a.value >= b.value ? a : b)))
    : tiers.indexOf(tiers.reduce((a, b) => (a.value <= b.value ? a : b)));
  const arrowChar = direction === "up" ? "↑" : "↓";

  return (
    <figure className="not-prose my-10 lab-card overflow-hidden">
      {/* Header strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 sm:px-6 py-4 border-b border-line/[0.08]">
        <figcaption className="text-[15px] font-semibold text-ink">
          {metric}
        </figcaption>
        <p className="inline-flex items-center gap-1.5 text-meta text-ink-2">
          <span aria-hidden className="tabular-nums">{arrowChar}</span>
          {conclusion}
        </p>
      </div>
      {/* Bars */}
      <div className="px-5 sm:px-6 py-5 space-y-3">
        {tiers.map((tier, i) => {
          const tone = tier.tone || (i === winnerIdx ? "coral" : i === 0 ? "slate" : "amber");
          const c = palette[tone];
          const widthPct = (tier.value / max) * 100;
          const isWinner = i === winnerIdx;
          return (
            <div key={tier.label} className="flex items-center gap-3 sm:gap-4">
              <div className="w-20 sm:w-28 flex-shrink-0">
                <p className="text-meta text-ink-2 leading-tight">
                  {tier.label}
                  {isWinner && (
                    <span className="sr-only"> ({direction === "up" ? "highest" : "lowest"})</span>
                  )}
                </p>
              </div>
              <div className="relative flex-1 h-8 sm:h-10 rounded-lg bg-sunken overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 rounded-lg ${isWinner ? palette.coral.bar : tone === "slate" ? palette.slate.bar : "bg-slate-400"}`}
                  style={{ width: `${widthPct}%` }}
                />
              </div>
              <div className="w-16 sm:w-24 flex-shrink-0 text-right">
                <p className={`font-heading text-xl sm:text-2xl font-semibold tabular-nums leading-none ${isWinner ? c.text : "text-ink-2"}`}>
                  {tier.display}
                  {unit && <span className="text-base ml-0.5">{unit}</span>}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </figure>
  );
}

/* -- Reach × Talk Quadrant Matrix -- */
export function ReachTalkQuadrant({
  rows,
  xLabel = "Hit rate (% videos crossing 100K)",
  yLabel = "Comment rate (% of viewers)",
  xMax = 40,
  yMax = 0.25,
  xMid = 20,
  yMid = 0.1,
  title,
}: {
  rows: { niche: string; reach: number; talk: number }[];
  xLabel?: string;
  yLabel?: string;
  xMax?: number;
  yMax?: number;
  xMid?: number;
  yMid?: number;
  title?: string;
}) {
  function quadrant(reach: number, talk: number) {
    if (reach >= xMid && talk >= yMid) return { label: "TR", style: "bg-content-coral" };
    if (reach >= xMid && talk < yMid) return { label: "BR", style: "bg-slate-700 dark:bg-slate-300" };
    if (reach < xMid && talk >= yMid) return { label: "TL", style: "bg-slate-400" };
    return { label: "BL", style: "bg-slate-300 dark:bg-slate-600" };
  }

  return (
    <figure className="not-prose my-10 lab-card p-4 sm:p-6">
      {title && (
        <figcaption className="text-[15px] font-semibold text-ink mb-1">
          {title}
        </figcaption>
      )}
      <p className="text-meta text-ink-3 mb-4">↑ {yLabel}</p>
      <div className="overflow-x-auto -mx-1 px-1">
        <div className="relative min-w-[520px]" style={{ aspectRatio: "16 / 10", minHeight: 340 }}>
          {/* Quadrant frame */}
          <div className="absolute inset-0 rounded-xl bg-sunken" />
          {/* Quadrant labels */}
          <span className="absolute top-2 left-3 text-xs text-ink-3">
            Talkable, low reach
          </span>
          <span className="absolute top-2 right-3 text-xs font-medium text-ink">
            Sweet spot
          </span>
          <span className="absolute bottom-8 left-3 text-xs text-ink-3">
            Dead zone
          </span>
          <span className="absolute bottom-8 right-3 text-xs text-ink-3">
            Watchable, low talk
          </span>
          {/* Mid-line crosshair */}
          <div
            aria-hidden
            className="absolute left-0 right-0 h-px bg-line/[0.14]"
            style={{ bottom: `${(yMid / yMax) * 100}%` }}
          />
          <div
            aria-hidden
            className="absolute top-0 bottom-6 w-px bg-line/[0.14]"
            style={{ left: `${(xMid / xMax) * 100}%` }}
          />
          {/* Plot area */}
          <div className="absolute inset-0 pl-6 pr-2 pt-2 pb-6">
            <div className="relative w-full h-full">
              {rows.map((r) => {
                const x = Math.min(100, (r.reach / xMax) * 100);
                const y = Math.min(100, (r.talk / yMax) * 100);
                const q = quadrant(r.reach, r.talk);
                return (
                  <div
                    key={r.niche}
                    className="absolute group"
                    style={{ left: `${x}%`, bottom: `${y}%`, transform: "translate(-50%, 50%)" }}
                  >
                    <div
                      className={`w-3 h-3 rounded-full ring-2 ring-surface ${q.style}`}
                      title={`${r.niche}: ${r.reach}% reach · ${r.talk}% comment rate`}
                    />
                    <span
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-medium text-ink-2 pointer-events-none px-1 rounded bg-sunken/80"
                    >
                      {r.niche}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* X-axis label */}
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs text-ink-3 whitespace-nowrap">
            {xLabel} →
          </span>
        </div>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-meta text-ink-3">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-content-coral" /> Sweet spot (high reach + high talk)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-700 dark:bg-slate-300" /> Watchable only
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400" /> Talkable only
        </span>
      </div>
    </figure>
  );
}

/* -- Script DNA Compare (long-tail vs viral linguistic profile) -- */
export function ScriptDNACompare({
  loser,
  winner,
}: {
  loser: { label: string; rows: { metric: string; value: string; note?: string }[] };
  winner: { label: string; rows: { metric: string; value: string; note?: string }[] };
}) {
  return (
    <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
      {/* Loser card */}
      <div className="lab-card p-5 sm:p-6">
        <p className="text-[15px] font-semibold text-ink-2 mb-4">
          <span aria-hidden className="mr-1.5 text-ink-3">↓</span>
          {loser.label}
        </p>
        <ul className="space-y-4">
          {loser.rows.map((r) => (
            <li key={r.metric}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm text-ink-2">{r.metric}</span>
                <span className="font-heading text-2xl font-semibold tabular-nums text-ink-2">
                  {r.value}
                </span>
              </div>
              {r.note && (
                <p className="text-xs text-ink-3 mt-0.5">{r.note}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* Winner card */}
      <div className="lab-card p-5 sm:p-6 border-line/[0.16]">
        <p className="text-[15px] font-semibold text-ink mb-4">
          <span aria-hidden className="mr-1.5 text-content-coral">↑</span>
          {winner.label}
        </p>
        <ul className="space-y-4">
          {winner.rows.map((r) => (
            <li key={r.metric}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm text-ink-2">{r.metric}</span>
                <span className="font-heading text-2xl font-semibold tabular-nums text-ink">
                  {r.value}
                </span>
              </div>
              {r.note && (
                <p className="text-xs text-ink-3 mt-0.5">{r.note}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* -- Opener Podium (top first words on a 1-2-3 podium) -- */
export function OpenerPodium({
  podium,
  losers,
}: {
  podium: { rank: 1 | 2 | 3; word: string; value: string; note?: string }[];
  losers?: { word: string; value: string }[];
}) {
  const order = [2, 1, 3]; // visual order: 2nd, 1st, 3rd (podium layout)
  const heights: Record<number, string> = { 1: "h-44", 2: "h-32", 3: "h-24" };
  const colors: Record<number, { bg: string; text: string }> = {
    1: { bg: "bg-content-coral", text: "text-white" },
    2: { bg: "bg-slate-400", text: "text-white" },
    3: { bg: "bg-slate-300 dark:bg-slate-600", text: "text-slate-700 dark:text-slate-200" },
  };

  return (
    <div className="not-prose my-10">
      <div className="lab-card p-5 sm:p-6">
        <div className="grid grid-cols-3 gap-3 sm:gap-4 items-end">
          {order.map((rank) => {
            const entry = podium.find((p) => p.rank === rank);
            if (!entry) return <div key={rank} />;
            const c = colors[rank];
            return (
              <div key={rank} className="flex flex-col items-center text-center">
                <p className="text-sm font-medium text-ink-2 mb-1">
                  &ldquo;{entry.word}&rdquo;
                </p>
                <p className="font-heading text-2xl sm:text-3xl font-semibold tabular-nums text-ink leading-none mb-2">
                  {entry.value}
                </p>
                {entry.note && (
                  <p className="text-xs text-ink-3 mb-2 px-1 leading-tight">
                    {entry.note}
                  </p>
                )}
                <div
                  className={`relative w-full ${heights[rank]} rounded-t-xl ${c.bg} ${c.text} flex items-end justify-center pb-3`}
                >
                  <span className="font-heading text-2xl sm:text-4xl font-semibold opacity-60 tabular-nums">
                    {rank}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {losers && losers.length > 0 && (
          <div className="mt-6 pt-5 border-t border-line/[0.08]">
            <p className="text-meta font-medium text-ink-2 mb-3 text-center">
              The bottom shelf: openers to avoid
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {losers.map((l) => (
                <div
                  key={l.word}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sunken text-xs"
                >
                  <span className="text-ink-2 font-medium">
                    &ldquo;{l.word}&rdquo;
                  </span>
                  <span className="text-ink-3 tabular-nums font-mono">
                    {l.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
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

  // Sequential coral ramp: hotter = more coral, cooler = neutral.
  function colorFor(v: number) {
    if (v >= 32) return { bg: "bg-content-coral", text: "text-white", accent: "text-white/85" };
    if (v >= 25) return { bg: "bg-content-coral/75", text: "text-white", accent: "text-white/85" };
    if (v >= 19) return { bg: "bg-content-coral/50", text: "text-ink", accent: "text-ink-2" };
    if (v >= 14) return { bg: "bg-content-coral/30", text: "text-ink", accent: "text-ink-2" };
    if (v >= 9) return { bg: "bg-slate-300 dark:bg-slate-600", text: "text-ink", accent: "text-ink-2" };
    return { bg: "bg-sunken", text: "text-ink-2", accent: "text-ink-3" };
  }

  return (
    <figure className="not-prose my-10 lab-card p-4 sm:p-6">
      {title && (
        <figcaption className="text-[15px] font-semibold text-ink mb-4">
          {title}
        </figcaption>
      )}
      <div className="overflow-hidden">
        <div className="flex flex-wrap gap-3 justify-center items-center">
          {sortedByVolume.map((row) => {
            const c = colorFor(row.value);
            const size = sizeFor(row.volume);
            const fontScale = Math.max(0.7, Math.min(1.15, size / 180));
            return (
              <div
                key={row.niche}
                className={`relative ${c.bg} ${c.text} rounded-full flex flex-col items-center justify-center text-center p-3 cursor-default max-w-full`}
                style={{
                  width: size,
                  height: size,
                  flexShrink: 0,
                }}
                title={`${row.niche}: ${row.value}${suffix} hit rate · ${row.volume.toLocaleString()} videos`}
              >
                <p
                  className="font-semibold leading-tight tracking-tight px-2"
                  style={{ fontSize: Math.max(12, Math.round(13 * fontScale)) }}
                >
                  {row.niche}
                </p>
                <p
                  className="font-heading font-semibold tabular-nums leading-none mt-1"
                  style={{ fontSize: Math.round(28 * fontScale) }}
                >
                  {row.value.toFixed(1)}
                  {suffix}
                </p>
                {row.extra && (
                  <p
                    className={`${c.accent} mt-1 text-xs`}
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-5 pt-4 border-t border-line/[0.08]">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-meta text-ink-3">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-3.5 w-3.5 rounded-full bg-slate-300" />
            <span className="h-4 w-4 rounded-full bg-slate-300" />
            Size = sample
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-sunken border border-line/[0.08]" />
            <span className="h-3 w-3 rounded-sm bg-content-coral/30" />
            <span className="h-3 w-3 rounded-sm bg-content-coral/50" />
            <span className="h-3 w-3 rounded-sm bg-content-coral" />
            Color = {metric}
          </span>
        </div>
        {legendNote && (
          <p className="text-meta text-ink-3">
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
    if (t > 0.85) return { bg: "bg-content-coral" };
    if (t > 0.65) return { bg: "bg-content-coral/75" };
    if (t > 0.45) return { bg: "bg-content-coral/50" };
    if (t > 0.25) return { bg: "bg-content-coral/30" };
    return { bg: "bg-slate-300 dark:bg-slate-600" };
  }

  return (
    <figure className="not-prose my-10">
      {title && (
        <figcaption className="text-[15px] font-semibold text-ink mb-3">
          {title}
        </figcaption>
      )}
      <div className="lab-card overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[180px_1fr_70px] gap-2 sm:gap-4 px-4 sm:px-5 py-3 bg-sunken border-b border-line/[0.08] text-meta font-medium text-ink-3">
          <span>Niche</span>
          <span className="hidden sm:block">{metric}</span>
          <span className="text-right">Value</span>
        </div>
        {/* Rows */}
        <ol className="divide-y divide-line/[0.08]">
          {rows.map((row, i) => {
            const c = colorFor(row.value);
            const widthPct = ((row.value - 0) / Math.max(1, max)) * 100;
            return (
              <li
                key={row.niche}
                className="grid grid-cols-[1fr_auto] sm:grid-cols-[180px_1fr_70px] gap-2 sm:gap-4 items-center px-4 sm:px-5 py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-mono tabular-nums text-ink-3 w-5 flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink leading-tight truncate">
                      {row.niche}
                    </p>
                    <p className="text-xs text-ink-3 truncate">
                      {row.sample}
                      {row.extra ? ` · ${row.extra}` : ""}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block relative h-6 bg-sunken rounded-md overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 ${c.bg} rounded-md`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
                <div className="text-right">
                  <span
                    className="inline-block text-sm font-semibold tabular-nums text-ink"
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
      <div className="flex items-center justify-end gap-2 mt-3 text-meta text-ink-3">
        <span>Low</span>
        <span className="inline-flex items-center gap-0.5">
          <span className="h-3 w-3 rounded-sm bg-slate-300 dark:bg-slate-600" />
          <span className="h-3 w-3 rounded-sm bg-content-coral/30" />
          <span className="h-3 w-3 rounded-sm bg-content-coral/50" />
          <span className="h-3 w-3 rounded-sm bg-content-coral/75" />
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
    if (t > 0.4) return "bg-content-coral/50 text-ink";
    if (t > 0.22) return "bg-content-coral/25 text-ink";
    if (t > 0.1) return "bg-sunken text-ink-2";
    return "bg-sunken text-ink-3";
  }

  return (
    <figure className="not-prose my-10">
      {title && (
        <figcaption className="text-[15px] font-semibold text-ink mb-3">
          {title}
        </figcaption>
      )}
      <div className="lab-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-sunken border-b border-line/[0.08] text-meta text-ink-3">
              <th className="text-left px-4 py-3 font-medium">Niche</th>
              <th className="text-center px-3 py-3 font-medium whitespace-nowrap">Under 100K</th>
              <th className="text-center px-3 py-3 font-medium whitespace-nowrap">100K-1M</th>
              <th className="text-center px-3 py-3 font-medium">1M+</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.niche} className="border-b border-line/[0.08] last:border-b-0">
                <td className="px-4 py-3 align-middle">
                  <div>
                    <p className="text-sm font-semibold text-ink leading-tight">
                      {row.niche}
                    </p>
                    {row.sample && (
                      <p className="text-xs text-ink-3">
                        {row.sample}
                      </p>
                    )}
                  </div>
                </td>
                {([row.t1, row.t2, row.t3] as const).map((v, i) => (
                  <td key={i} className="px-2 py-2 align-middle">
                    <div
                      className={`mx-auto w-full min-w-[64px] h-11 sm:h-12 rounded-lg flex items-center justify-center font-medium tabular-nums text-xs sm:text-sm ${cellStyle(v)}`}
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
      <div
        className="lab-card p-4 sm:p-6 overflow-x-auto"
        style={{ minHeight: height }}
      >
        {title && (
          <figcaption className="text-[15px] font-semibold text-ink mb-4">
            {title}
          </figcaption>
        )}
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: -10, right: 5, top: 5, bottom: 30 }}>
              <CartesianGrid stroke={CHART_GRID} vertical={false} />
              <XAxis
                dataKey={xKey}
                tick={CHART_AXIS}
                axisLine={false}
                tickLine={false}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={CHART_AXIS}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}${suffix}`}
                width={44}
              />
              <Tooltip
                cursor={{ fill: "rgba(15,23,42,0.04)" }}
                formatter={(value, name) => [`${value}${suffix}`, name]}
                contentStyle={CHART_TOOLTIP}
              />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 8, color: "#64748b" }}
                iconType="circle"
                iconSize={8}
              />
              {series.map((s, i) => (
                <Bar
                  key={s.key}
                  dataKey={s.key}
                  name={s.label}
                  fill={SERIES_COLORS[i % SERIES_COLORS.length]}
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
    chip: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    ring: "",
    arrow: "↗",
  },
  "peaks-mid": {
    label: "Peaks at 100K-1M",
    chip: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    ring: "",
    arrow: "△",
  },
  collapses: {
    label: "Collapses past 100K",
    chip: "bg-red-500/10 text-red-700 dark:text-red-300",
    ring: "",
    arrow: "↘",
  },
  bimodal: {
    label: "Bimodal (T1 + T3)",
    chip: "bg-sunken text-ink-2",
    ring: "",
    arrow: "⇡⇣",
  },
  flat: {
    label: "Flat across tiers",
    chip: "bg-sunken text-ink-2",
    ring: "",
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
      className="relative lab-card p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <h4 className="text-ink font-semibold text-[17px] leading-tight">
          {name}
        </h4>
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${t.chip}`}
        >
          <span aria-hidden>{t.arrow}</span>
          {t.label}
        </span>
      </div>
      <p className="text-sm text-ink-2 leading-relaxed mb-3">
        {meaning}
      </p>
      <blockquote className="text-[13px] text-ink-3 italic leading-snug border-l border-line/[0.14] pl-3 py-0.5 mb-3">
        &ldquo;{example}&rdquo;
      </blockquote>
      {tierShare && (
        <p className="text-xs text-ink-3 border-t border-line/[0.08] pt-3">
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
    slate: { dot: "bg-slate-400", text: "text-ink" },
    coral: { dot: "bg-content-coral", text: "text-ink" },
    emerald: { dot: "bg-slate-700 dark:bg-slate-300", text: "text-ink" },
  } as const;

  return (
    <figure className="not-prose my-10">
      <div className="relative lab-card p-5 sm:p-8">
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
                    className={`relative rounded-full ${c.dot} flex items-center justify-center`}
                    style={{ width: dotSize, height: dotSize }}
                    aria-hidden
                  >
                    <span className="text-white font-semibold text-lg tabular-nums">{i + 1}</span>
                  </div>
                </div>
                <p className="text-meta font-medium text-ink-2 mb-2">
                  {tier.label}
                </p>
                <p className={`font-heading ${fontSize} font-semibold tabular-nums leading-none ${c.text} mb-1`}>
                  {tier.median}
                </p>
                <p className="text-xs text-ink-3">
                  median views
                </p>
                <p className="text-xs text-ink-3 mt-2">{tier.sample}</p>
                {multiplier && (
                  <span
                    className="hidden sm:inline-flex absolute top-1/3 -right-3 translate-x-1/2 items-center gap-1 px-2.5 py-1 rounded-full bg-surface border border-line/[0.14] text-xs font-mono font-medium text-ink-2 tabular-nums z-10"
                    aria-hidden
                  >
                    <ArrowRight className="h-3 w-3 text-ink-3" />
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
