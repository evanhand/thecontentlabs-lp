"use client";

import { ArrowRight, Check, X } from "lucide-react";
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
  text = "Get My 30-Day Content Plan",
  href = "/pricing",
}: {
  text?: string;
  href?: string;
}) {
  return (
    <section className="not-prose bg-gradient-to-br from-content-coral/5 to-content-coral/10 rounded-xl p-8 text-center my-8">
      <a
        href={href}
        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-content-cta-dark to-content-cta rounded-xl font-bold text-white shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {text}
        <ArrowRight className="ml-3 h-5 w-5" />
      </a>
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
        frameBorder="0"
        scrolling="no"
        allowTransparency
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
        frameBorder="0"
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

/* -- Hook Section -- */
export function HookSection({
  rank,
  name,
  tagline,
  engagement,
  videos,
  topViews,
  children,
}: {
  rank: number;
  name: string;
  tagline: string;
  color?: string;
  engagement: string;
  videos: string;
  topViews: string;
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

      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
          <p className="text-2xl font-bold text-slate-900">{engagement}</p>
          <p className="text-xs text-slate-500 mt-1">Avg engagement</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
          <p className="text-2xl font-bold text-slate-900">{videos}</p>
          <p className="text-xs text-slate-500 mt-1">Videos analyzed</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
          <p className="text-2xl font-bold text-slate-900">{topViews}</p>
          <p className="text-xs text-slate-500 mt-1">Top video views</p>
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
  "#ef4444", "#f97316", "#f59e0b", "#3b82f6", "#a855f7", "#22c55e", "#6366f1",
  "#ec4899", "#14b8a6", "#8b5cf6",
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
        <p className="text-sm font-bold text-slate-700 mb-4 text-center">
          {title}
        </p>
      )}
      <div
        className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6"
        style={{ height }}
      >
        <ResponsiveContainer width="100%" height="100%">
          {horizontal ? (
            <BarChart data={data} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickFormatter={(v) => `${v}${suffix}`}
              />
              <YAxis
                dataKey={xKey}
                type="category"
                tick={{ fontSize: 12, fill: "#334155" }}
                width={120}
              />
              <Tooltip
                formatter={(value: number) => [`${value}${suffix}`, yLabel || yKey]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  fontSize: 13,
                }}
              />
              <Bar dataKey={yKey} radius={[0, 6, 6, 0]} barSize={28}>
                {data.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <BarChart data={data} margin={{ left: -10, right: 10, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey={xKey}
                tick={{ fontSize: 11, fill: "#64748b" }}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickFormatter={(v) => `${v}${suffix}`}
              />
              <Tooltip
                formatter={(value: number) => [`${value}${suffix}`, yLabel || yKey]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  fontSize: 13,
                }}
              />
              <Bar dataKey={yKey} radius={[6, 6, 0, 0]} barSize={40}>
                {data.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
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
        <p className="text-sm font-bold text-slate-700 mb-4 text-center">
          {title}
        </p>
      )}
      <div
        className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6"
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
              innerRadius={donut ? "45%" : 0}
              outerRadius="75%"
              paddingAngle={2}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={{ stroke: "#94a3b8" }}
              fontSize={11}
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
