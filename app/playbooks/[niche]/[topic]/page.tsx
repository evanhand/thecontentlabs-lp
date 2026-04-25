import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/landing/Footer";
import {
  CTA,
  DataBarChart,
} from "@/components/blog/MDXComponents";
import {
  ARCHETYPE_GUIDANCE,
  NICHES,
  type NicheSlug,
  type TopicSlug,
} from "@/lib/playbooks";

const TOPICS: Record<TopicSlug, { label: string; titleSuffix: string }> = {
  "best-tiktok-hooks": {
    label: "Best TikTok Hooks",
    titleSuffix: "Best TikTok Hooks for",
  },
};

export function generateStaticParams() {
  const params: { niche: string; topic: string }[] = [];
  for (const niche of Object.keys(NICHES) as NicheSlug[]) {
    for (const topic of Object.keys(TOPICS) as TopicSlug[]) {
      params.push({ niche, topic });
    }
  }
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ niche: string; topic: string }>;
}): Promise<Metadata> {
  const { niche, topic } = await params;
  const n = NICHES[niche as NicheSlug];
  const t = TOPICS[topic as TopicSlug];
  if (!n || !t) return {};
  const title = `${t.titleSuffix} ${n.label} (2026 Data, ${n.totalVideos} Videos)`;
  const description = `Based on ${n.totalVideos} analyzed ${n.audience} videos on TikTok and Instagram. Here's the hook archetype actually winning right now, the median view count for each, and how to write them.`;
  return {
    title,
    description,
    alternates: {
      canonical: `https://thecontentlabs.app/playbooks/${niche}/${topic}`,
    },
    openGraph: {
      title,
      description,
      url: `https://thecontentlabs.app/playbooks/${niche}/${topic}`,
      images: ["https://thecontentlabs.app/og-image.png"],
    },
  };
}

export default async function PlaybookPage({
  params,
}: {
  params: Promise<{ niche: string; topic: string }>;
}) {
  const { niche, topic } = await params;
  const n = NICHES[niche as NicheSlug];
  const t = TOPICS[topic as TopicSlug];
  if (!n || !t) notFound();

  const sorted = [...n.hooks].sort((a, b) => b.median - a.median);
  const top3 = sorted.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fffbf9]">
      <PublicNav />

      {/* Header */}
      <section className="relative pt-32 sm:pt-36 pb-10 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,23,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          aria-hidden
          className="absolute -top-20 right-0 -z-10 h-[420px] w-[420px] rounded-full bg-content-coral/15 blur-[120px]"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-slate-500">
              <li>
                <a href="/" className="hover:text-content-coral transition-colors">
                  Home
                </a>
              </li>
              <li>
                <ChevronRight className="h-3 w-3 text-slate-400" />
              </li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-content-coral transition-colors"
                >
                  Resources
                </a>
              </li>
              <li>
                <ChevronRight className="h-3 w-3 text-slate-400" />
              </li>
              <li className="text-slate-900 font-semibold">Playbook</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full bg-content-coral/10 border border-content-coral/25">
            <span className="h-1.5 w-1.5 rounded-full bg-content-coral animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-content-coral font-bold">
              Niche playbook · {n.audienceShort}
            </span>
          </div>

          <h1 className="font-heading font-semibold text-slate-900 tracking-tight leading-[1.05] text-[36px] sm:text-5xl lg:text-[56px] mb-5">
            {t.titleSuffix} {n.label}
            <span className="text-content-coral">.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Based on{" "}
            <span className="font-semibold text-slate-900 tabular-nums">
              {n.totalVideos.toLocaleString()}
            </span>{" "}
            analyzed {n.audience} videos on TikTok and Instagram. Here&rsquo;s
            the hook archetype actually winning right now, the median view count
            for each, and how to write them.
          </p>
        </div>
      </section>

      {/* Top 3 hooks bento */}
      <section className="px-4 sm:px-6 lg:px-8 mb-14">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-content-coral font-bold mb-3">
            01 · The top 3 hooks for {n.audience}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {top3.map((h, i) => {
              const guide = ARCHETYPE_GUIDANCE[h.archetype];
              const isWinner = i === 0;
              return (
                <div
                  key={h.archetype}
                  className={`relative rounded-2xl bg-white border p-6 ${
                    isWinner
                      ? "border-content-coral/40 ring-2 ring-content-coral/30 shadow-lg shadow-content-coral/10"
                      : "border-slate-200"
                  }`}
                >
                  {isWinner && (
                    <span className="absolute -top-2.5 left-5 inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-content-coral text-white">
                      Winner
                    </span>
                  )}
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 mb-2">
                    Rank #{i + 1}
                  </p>
                  <h3 className="font-heading text-xl font-semibold text-slate-900 mb-1">
                    {h.archetype}
                  </h3>
                  {guide && (
                    <p className="text-[13px] text-slate-600 leading-relaxed mb-4">
                      {guide.tagline}
                    </p>
                  )}
                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-3xl font-bold text-slate-900 tabular-nums leading-none">
                      {h.median.toLocaleString()}
                    </p>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-1">
                      Median views · n={h.n}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full leaderboard */}
      <section className="px-4 sm:px-6 lg:px-8 mb-14">
        <div className="max-w-5xl mx-auto">
          <div className="border-b border-slate-200 pb-4 mb-6">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-content-coral font-bold mb-2">
              02 · Full hook leaderboard
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Every hook archetype, ranked by median views
            </h2>
          </div>
          <DataBarChart
            data={sorted.map((h) => ({ archetype: h.archetype, median: h.median }))}
            xKey="archetype"
            yKey="median"
            title=""
            yLabel="Median views"
            height={Math.max(280, sorted.length * 38)}
            horizontal
          />
        </div>
      </section>

      {/* How to write each */}
      <section className="px-4 sm:px-6 lg:px-8 mb-14">
        <div className="max-w-5xl mx-auto">
          <div className="border-b border-slate-200 pb-4 mb-6">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-content-coral font-bold mb-2">
              03 · How to write each hook
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Templates and examples for {n.audience}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sorted.map((h) => {
              const guide = ARCHETYPE_GUIDANCE[h.archetype];
              if (!guide) return null;
              return (
                <article
                  key={h.archetype}
                  className="rounded-2xl bg-white border border-slate-200 p-5"
                >
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3 className="font-heading text-lg font-semibold text-slate-900">
                      {h.archetype}
                    </h3>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 tabular-nums whitespace-nowrap">
                      {h.median.toLocaleString()} med · n={h.n}
                    </span>
                  </div>
                  <p className="text-[13px] text-slate-600 leading-relaxed mb-3">
                    {guide.tagline}
                  </p>
                  <div className="rounded-lg bg-slate-50 border border-slate-200 px-3.5 py-2.5 mb-3">
                    <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 mb-1">
                      Example
                    </p>
                    <p className="text-[13px] font-medium text-slate-800 leading-snug italic">
                      {guide.example}
                    </p>
                  </div>
                  <p className="text-[12px] text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    <span className="font-semibold text-slate-900">How:</span>{" "}
                    {guide.how}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Internal link strip */}
      <section className="px-4 sm:px-6 lg:px-8 mb-14">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500 mb-3">
              Related data studies
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="/blog/tiktok-hooks-that-work"
                className="group flex items-center justify-between gap-3 rounded-xl bg-slate-50 hover:bg-content-coral/5 border border-slate-200 hover:border-content-coral/30 px-4 py-3 transition-all"
              >
                <span className="text-sm font-semibold text-slate-900 group-hover:text-content-coral">
                  7 TikTok Hooks That Actually Go Viral (Full Study)
                </span>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-content-coral group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </a>
              <a
                href="/blog/do-tiktok-videos-need-on-screen-text"
                className="group flex items-center justify-between gap-3 rounded-xl bg-slate-50 hover:bg-content-coral/5 border border-slate-200 hover:border-content-coral/30 px-4 py-3 transition-all"
              >
                <span className="text-sm font-semibold text-slate-900 group-hover:text-content-coral">
                  Do Your Videos Need On-Screen Text? (14x Reach Gap)
                </span>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-content-coral group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </a>
              <a
                href="/trends"
                className="group flex items-center justify-between gap-3 rounded-xl bg-slate-50 hover:bg-content-coral/5 border border-slate-200 hover:border-content-coral/30 px-4 py-3 transition-all"
              >
                <span className="text-sm font-semibold text-slate-900 group-hover:text-content-coral">
                  This month&rsquo;s trends report
                </span>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-content-coral group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </a>
              <a
                href="/blog"
                className="group flex items-center justify-between gap-3 rounded-xl bg-slate-50 hover:bg-content-coral/5 border border-slate-200 hover:border-content-coral/30 px-4 py-3 transition-all"
              >
                <span className="text-sm font-semibold text-slate-900 group-hover:text-content-coral">
                  Browse all data studies
                </span>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-content-coral group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <CTA
            headline={`Get a 30-day calendar built on the patterns winning in ${n.audienceShort}.`}
            sub={`The Content Labs runs this same hook breakdown on your account plus your top ${n.audience}, then writes a 30-day script calendar tuned to what's actually winning in your space right now.`}
            primary={`Audit my ${n.audienceShort} account free`}
            secondary="See how it works"
            secondaryHref="/features/content-strategy"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
