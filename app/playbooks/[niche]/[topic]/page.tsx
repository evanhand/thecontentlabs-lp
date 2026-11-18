import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/landing/Footer";
import {
  CTA,
  DataBarChart,
} from "@/components/blog/MDXComponents";
import { ResourceHeader } from "@/components/blog/ResourceHeader";
import { MarketingBreadcrumbs } from "@/components/templates/MarketingParts";
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

  const related = [
    { href: "/blog/tiktok-hooks-that-work", label: "7 TikTok Hooks That Actually Go Viral (Full Study)" },
    { href: "/blog/do-tiktok-videos-need-on-screen-text", label: "Do Your Videos Need On-Screen Text? (14x Reach Gap)" },
    { href: "/trends", label: "This month\u2019s trends report" },
    { href: "/blog", label: "Browse all data studies" },
  ];

  const sectionTitle =
    "font-heading text-3xl sm:text-4xl font-semibold tracking-[-0.02em] leading-tight text-ink";

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <PublicNav />

      <main>
        <ResourceHeader
          breadcrumbs={
            <MarketingBreadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Resources", href: "/blog" },
                { label: "Playbooks", href: "/playbooks" },
                { label: n.label },
              ]}
            />
          }
          title={`${t.titleSuffix} ${n.label}`}
          description={
            <>
              Based on{" "}
              <span className="font-medium text-ink tabular-nums">
                {n.totalVideos.toLocaleString()}
              </span>{" "}
              analyzed {n.audience} videos on TikTok and Instagram. Here&rsquo;s
              the hook archetype actually winning right now, the median view
              count for each, and how to write them.
            </>
          }
        />

        {/* Top 3 hooks */}
        <section className="pb-16 sm:pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className={`${sectionTitle} mb-6 sm:mb-8`}>
              The top 3 hooks for {n.audience}
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {top3.map((h, i) => {
                const guide = ARCHETYPE_GUIDANCE[h.archetype];
                const isWinner = i === 0;
                return (
                  <li
                    key={h.archetype}
                    className={`lab-card p-5 sm:p-6 flex flex-col ${isWinner ? "border-line/[0.16]" : ""}`}
                  >
                    <p className="text-meta text-ink-3 tabular-nums">
                      #{i + 1}
                      {isWinner && <span className="ml-1.5 font-medium text-content-coral">Winner</span>}
                    </p>
                    <h3 className="mt-2 font-heading text-xl font-semibold text-ink">
                      {h.archetype}
                    </h3>
                    {guide && (
                      <p className="mt-1 text-body text-ink-2">{guide.tagline}</p>
                    )}
                    <div className="mt-auto pt-5">
                      <div className="border-t border-line/[0.08] pt-4">
                        <p className="font-heading text-3xl font-semibold text-ink tabular-nums leading-none">
                          {h.median.toLocaleString()}
                        </p>
                        <p className="mt-1.5 text-meta text-ink-3 tabular-nums">
                          Median views · n={h.n}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Full leaderboard */}
        <section className="py-16 sm:py-20 border-t border-line/[0.08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className={sectionTitle}>
              Every hook archetype, ranked by median views
            </h2>
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
        <section className="py-16 sm:py-20 border-t border-line/[0.08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className={`${sectionTitle} mb-6 sm:mb-8`}>
              Templates and examples for {n.audience}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {sorted.map((h) => {
                const guide = ARCHETYPE_GUIDANCE[h.archetype];
                if (!guide) return null;
                return (
                  <article key={h.archetype} className="lab-card p-5 sm:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <h3 className="text-[17px] font-semibold text-ink">
                        {h.archetype}
                      </h3>
                      <span className="text-meta text-ink-3 tabular-nums whitespace-nowrap">
                        {h.median.toLocaleString()} median · n={h.n}
                      </span>
                    </div>
                    <p className="mt-1.5 text-body text-ink-2">{guide.tagline}</p>
                    <div className="mt-4 rounded-xl bg-sunken px-4 py-3">
                      <p className="text-meta text-ink-3 mb-1">Example</p>
                      <p className="text-sm font-medium text-ink leading-snug">
                        {guide.example}
                      </p>
                    </div>
                    <p className="mt-4 text-sm text-ink-2 leading-relaxed">
                      <span className="font-semibold text-ink">How:</span>{" "}
                      {guide.how}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-16 sm:py-20 border-t border-line/[0.08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-heading text-section text-ink mb-4">Related data studies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <a
                  key={r.href}
                  href={r.href}
                  className="group lab-card flex items-center justify-between gap-3 px-5 py-4 transition-colors hover:border-line/[0.16]"
                >
                  <span className="text-[15px] font-medium text-ink">{r.label}</span>
                  <ArrowRight aria-hidden className="h-4 w-4 text-ink-3 transition-[color,transform] group-hover:text-ink group-hover:translate-x-0.5 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20 sm:pb-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <CTA
              headline={`Get a 30-day calendar built on the patterns winning in ${n.audienceShort}.`}
              sub={`The Content Labs runs this same hook breakdown on your account plus your top ${n.audience}, then writes a 30-day script calendar tuned to what's actually winning in your space right now.`}
              primary={`Audit my ${n.audienceShort} account free`}
              secondary="See how it works"
              secondaryHref="/features/content-strategy"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
