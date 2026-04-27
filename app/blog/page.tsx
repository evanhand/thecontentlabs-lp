import fs from "fs";
import path from "path";
import { Metadata } from "next";
import { ArrowRight, Activity } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/landing/Footer";
import { FeaturedStudyCard } from "@/components/blog/FeaturedStudyCard";
import { ResourcesBrowser } from "@/components/blog/ResourcesBrowser";
import { CTA } from "@/components/blog/MDXComponents";
import { getAllPosts, type PostMeta } from "@/lib/blog";
import { getAllGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Resources — The Content Labs | Data Studies, Guides, Strategy",
  description:
    "Free data studies, guides, and comparisons for content creators. Built from 10,000+ analyzed TikTok and Instagram videos. AI content strategy, hooks, hashtags, posting times, and more.",
  alternates: { canonical: "https://thecontentlabs.app/blog" },
  openGraph: {
    title: "Resources — The Content Labs",
    description:
      "Free data studies and guides for content creators. Built from 10,000+ analyzed videos.",
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
    <div className="min-h-screen bg-[#fffbf9]">
      <PublicNav />

      {/* ========== Header ========== */}
      <section className="relative pt-32 sm:pt-36 pb-10 sm:pb-14 overflow-hidden">
        {/* Subtle graph-paper backdrop */}
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

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <span
              aria-hidden
              className="h-2 w-2 rounded-full bg-content-coral animate-pulse"
            />
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-content-coral font-bold">
              The Content Labs · Resources
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 items-end">
            <h1 className="font-heading font-semibold text-slate-900 tracking-tight leading-[1.02] text-[40px] sm:text-5xl lg:text-[58px]">
              Data studies, guides, and strategy<span className="text-content-coral">.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed lg:max-w-md lg:justify-self-end lg:text-right">
              Built from 10,000+ analyzed TikTok and Instagram videos. Useful
              whether you use The Content Labs or not.
            </p>
          </div>
        </div>
      </section>

      {/* ========== Featured (Lead Study) ========== */}
      {featured && (
        <section className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="inline-flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full bg-content-coral animate-pulse"
                />
                <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-content-coral font-bold">
                  Newest study
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400">
                Read it first
              </span>
            </div>
            <FeaturedStudyCard post={featured} imageUrl={featured.imageUrl} />
          </div>
        </section>
      )}

      {/* ========== Live monthly trends strip ========== */}
      <section className="px-4 sm:px-6 lg:px-8 mb-14">
        <div className="max-w-6xl mx-auto">
          <a
            href="/trends"
            className="group block relative overflow-hidden rounded-2xl border border-content-coral/30 bg-gradient-to-r from-slate-50 via-white to-content-coral/5 hover:border-content-coral/50 hover:shadow-lg hover:shadow-content-coral/10 transition-all"
          >
            <div
              aria-hidden
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-content-coral/15 blur-3xl pointer-events-none"
            />
            <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-5 sm:px-7 sm:py-6">
              <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-content-coral/10 border border-content-coral/30">
                <Activity className="h-5 w-5 text-content-coral" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-content-coral text-white text-[9px] font-mono uppercase tracking-[0.2em] font-bold">
                    <span className="h-1 w-1 rounded-full bg-white animate-pulse" />
                    Live
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500 font-bold">
                    Updated monthly
                  </span>
                </div>
                <h2 className="font-heading text-lg sm:text-xl font-semibold text-slate-900 leading-tight">
                  See what&rsquo;s actually winning right now
                  <span className="ml-2 text-slate-500 text-sm font-mono uppercase tracking-wider">
                    April 2026
                  </span>
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Hook leaderboard, format winners, and viral examples from
                  1,439 videos posted this month.
                </p>
              </div>
              <ArrowRight className="hidden sm:block h-5 w-5 text-content-coral group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </div>
          </a>
        </div>
      </section>

      {/* ========== Browse ========== */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-7 border-b border-slate-200 pb-5">
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              All resources
            </h2>
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500 tabular-nums">
              {enriched.length.toString().padStart(2, "0")} entries
            </span>
          </div>
          <ResourcesBrowser posts={enriched} />
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <CTA
            headline="Stop reading studies. Start running them on your own account."
            sub="Connect TikTok and Instagram. The Content Labs runs the same audits you've been reading about across every video on your account, then writes a 30-day calendar with hooks and scripts built from what's actually winning in your niche."
            primary="Get my free audit"
            secondary="See pricing"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
