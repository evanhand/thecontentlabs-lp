import fs from "fs";
import path from "path";
import { Metadata } from "next";
import { ArrowRight, Activity } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/landing/Footer";
import { FeaturedStudyCard } from "@/components/blog/FeaturedStudyCard";
import { ResourcesBrowser } from "@/components/blog/ResourcesBrowser";
import { ResourceHeader } from "@/components/blog/ResourceHeader";
import { CTA } from "@/components/blog/MDXComponents";
import { getAllPosts, type PostMeta } from "@/lib/blog";
import { getAllGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Resources — The Content Labs | Data Studies, Guides, Strategy",
  description:
    "Free data studies, guides, and comparisons for content creators. Built from 21,000+ analyzed TikTok and Instagram videos. AI content strategy, hooks, hashtags, posting times, and more.",
  alternates: { canonical: "https://thecontentlabs.app/blog" },
  openGraph: {
    title: "Resources — The Content Labs",
    description:
      "Free data studies and guides for content creators. Built from 21,000+ analyzed videos.",
    url: "https://thecontentlabs.app/blog",
    images: ["https://thecontentlabs.app/og-image.png"],
  },
};

function resolveImageUrl(post: PostMeta): string | null {
  if (post.ogImage) return post.ogImage;
  const filename = post.isGuide
    ? `guide-${post.slug}.png`
    : `blog-${post.slug}.png`;
  const localPath = path.join(process.cwd(), "public", "og", filename);
  if (fs.existsSync(localPath)) return `/og/${filename}`;
  return null;
}

function resolveThumbnailUrl(slug: string): string | null {
  const localPath = path.join(process.cwd(), "public", "thumbnails", `${slug}.png`);
  if (fs.existsSync(localPath)) return `/thumbnails/${slug}.png`;
  return null;
}

export default function BlogIndex() {
  const allPosts: PostMeta[] = [...getAllPosts(), ...getAllGuides()].sort(
    (a, b) => (a.date > b.date ? -1 : 1),
  );

  const enriched = allPosts.map((p) => ({
    ...p,
    imageUrl: resolveImageUrl(p),
    thumbnailUrl: resolveThumbnailUrl(p.slug),
  }));
  const [featured] = enriched;

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <PublicNav />

      <main>
        <ResourceHeader
          title="Data studies, guides, and strategy"
          description="Built from 21,000+ analyzed TikTok and Instagram videos. Useful whether you use The Content Labs or not."
        />

        {/* Featured (lead study) */}
        {featured && (
          <section className="pb-6 sm:pb-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <FeaturedStudyCard post={featured} imageUrl={featured.imageUrl} />
            </div>
          </section>
        )}

        {/* Live monthly trends strip */}
        <section className="pb-16 sm:pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <a
              href="/trends"
              className="group lab-card flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-5 sm:p-6 transition-colors duration-200 hover:border-line/[0.16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
            >
              <Activity aria-hidden className="hidden sm:block h-5 w-5 text-ink-3 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h2 className="text-[15px] font-semibold text-ink">
                  See what&rsquo;s actually winning right now
                  <span className="ml-2 font-normal text-ink-3">April 2026</span>
                </h2>
                <p className="text-body text-ink-2 mt-1">
                  Hook leaderboard, format winners, and viral examples from
                  1,439 videos posted this month. Updated monthly.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-ink flex-shrink-0">
                Live trends
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </div>
        </section>

        {/* Browse */}
        <section className="pb-20 sm:pb-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-baseline justify-between gap-4 mb-6">
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-ink">
                All resources
              </h2>
              <span className="text-meta text-ink-3 tabular-nums">
                {enriched.length} entries
              </span>
            </div>
            <ResourcesBrowser posts={enriched} />
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20 sm:pb-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <CTA
              headline="Stop reading studies. Start running them on your own account."
              sub="Connect TikTok and Instagram. The Content Labs runs the same audits you've been reading about across every video on your account, then writes a 30-day calendar with hooks and scripts built from what's actually winning in your niche."
              primary="Get my free audit"
              secondary="See pricing"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
