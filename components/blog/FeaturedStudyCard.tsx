import { ArrowRight, Sparkles } from "lucide-react";
import { PostMeta } from "@/lib/blog";

const CATEGORY_LABELS: Record<string, string> = {
  comparison: "Comparison",
  guide: "Guide",
  niche: "Niche guide",
  blog: "Data study",
};

export function FeaturedStudyCard({
  post,
  imageUrl,
}: {
  post: PostMeta;
  imageUrl?: string | null;
}) {
  const href = `${post.isGuide ? "/guides" : "/blog"}/${post.slug}`;
  const categoryLabel = CATEGORY_LABELS[post.category] || "Blog";
  const dateLabel = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const daysAgo = Math.floor(
    (Date.now() - new Date(post.date).getTime()) / (1000 * 60 * 60 * 24),
  );
  const isFresh = daysAgo <= 14;

  return (
    <article className="relative overflow-visible rounded-3xl border-2 border-content-coral/50 shadow-[0_0_60px_-15px_rgba(255,107,107,0.45)] shadow-content-coral/30 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 group">
      {/* Floating "NEW" sticker */}
      {isFresh && (
        <div
          aria-hidden
          className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-20"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-content-coral blur-md animate-pulse" />
            <div className="relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-content-coral text-white shadow-lg ring-2 ring-white/40">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] font-extrabold">
                Just dropped
              </span>
            </div>
          </div>
        </div>
      )}
      {/* Top accent bar */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-content-coral via-content-cta to-content-coral"
      />
      {/* Decorative coral glow */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-content-coral/25 blur-[100px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-content-coral/10 blur-[100px] pointer-events-none"
      />
      {/* Subtle grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 p-7 sm:p-10 lg:p-12 items-center">
        {/* Text column */}
        <div>
          {/* Eyebrow chip */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-content-coral/15 border border-content-coral/30">
            <span className="h-1.5 w-1.5 rounded-full bg-content-coral animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-content-coral font-bold">
              Lead study · {categoryLabel} · {post.readingTime}
            </span>
          </div>

          <h2 className="font-heading text-white font-semibold tracking-tight leading-[1.05] mb-5 text-[28px] sm:text-4xl lg:text-[44px]">
            {post.title}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
            {post.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <a
              href={href}
              className="group/cta inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-content-cta-dark to-content-cta rounded-xl font-bold text-white shadow-lg shadow-content-cta/30 hover:shadow-xl hover:shadow-content-cta/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-content-coral focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Read the study
              <ArrowRight className="ml-2 h-5 w-5 group-hover/cta:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#all-resources"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-white/5 border border-white/15 rounded-xl font-semibold text-slate-100 hover:bg-white/10 hover:border-white/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-content-coral focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Browse all
            </a>
          </div>

          <p className="mt-7 text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500">
            {dateLabel}
          </p>
        </div>

        {/* Image column */}
        <a
          href={href}
          className="relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-content-coral focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-2xl"
          aria-label={`Read ${post.title}`}
        >
          <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/40 bg-slate-950">
            {/* Lab monitor bar */}
            <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-950 border-b border-white/5">
              <span className="w-2 h-2 rounded-full bg-red-500/60" />
              <span className="w-2 h-2 rounded-full bg-amber-500/60" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
              <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
                lead_study.pdf
              </span>
            </div>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={post.title}
                loading="eager"
                decoding="async"
                className="w-full aspect-[1200/630] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            ) : (
              <div className="w-full aspect-[1200/630] bg-gradient-to-br from-content-coral/40 via-slate-900 to-slate-950 relative">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center px-8">
                  <p className="text-white text-center font-bold text-2xl leading-tight">
                    {post.title}
                  </p>
                </div>
              </div>
            )}
          </div>
        </a>
      </div>
    </article>
  );
}
