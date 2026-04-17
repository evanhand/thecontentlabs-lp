import { ArrowRight } from "lucide-react";
import { getPostMeta } from "@/lib/blog";

const FEATURED_REPORT = {
  slug: "300-view-jail",
  title: "How to Escape 300 View Jail",
  description:
    "We pulled 8,500 analyzed videos from our dataset. The conventional advice is wrong on almost every count.",
  stat: "8,500",
  statLabel: "Videos analyzed",
};

const FEATURED_SLUGS = [
  "tiktok-content-strategy-guide",
  "small-accounts-more-reach",
  "how-to-escape-tiktok-300-view-jail",
];

export function LatestContent() {
  const recentPosts = FEATURED_SLUGS.map((slug) => getPostMeta(slug));

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-content-coral text-[11px] font-mono uppercase tracking-[0.3em] mb-4">
            Fresh from the lab
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.02em] text-slate-900 mb-4">
            Data-backed strategy content.
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Every report and guide below is built from our analysis of thousands
            of real videos. No generic advice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-10">
          {/* Featured report card */}
          <a
            href={`/reports/${FEATURED_REPORT.slug}`}
            className="lg:col-span-2 group relative rounded-2xl border border-content-coral/25 bg-gradient-to-br from-content-coral/5 to-content-coral/10 p-7 hover:border-content-coral/50 hover:shadow-lg hover:shadow-content-coral/10 transition-all flex flex-col"
          >
            <span className="self-start text-[10px] font-mono uppercase tracking-[0.25em] text-content-coral bg-white/80 rounded-full px-2.5 py-1 mb-5 font-bold">
              New Data Report
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3 group-hover:text-content-coral transition-colors">
              {FEATURED_REPORT.title}
            </h3>
            <p className="text-slate-600 leading-relaxed text-[15px] mb-6 flex-1">
              {FEATURED_REPORT.description}
            </p>
            <div className="flex items-center justify-between pt-5 border-t border-content-coral/15">
              <div>
                <p className="text-3xl font-bold text-content-coral tabular-nums tracking-tight">
                  {FEATURED_REPORT.stat}
                </p>
                <p className="text-[11px] text-slate-500 uppercase tracking-wide font-medium">
                  {FEATURED_REPORT.statLabel}
                </p>
              </div>
              <span className="inline-flex items-center text-sm font-bold text-content-coral">
                View report
                <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </a>

          {/* Latest blog posts */}
          <div className="lg:col-span-3 grid grid-cols-1 gap-4">
            {recentPosts.map((p) => (
              <a
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-content-coral/40 hover:shadow-md transition-all flex items-start gap-5"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
                      {p.category}
                    </span>
                    <span className="text-slate-300">&middot;</span>
                    <span className="text-[11px] text-slate-400">
                      {p.readingTime}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2 group-hover:text-content-coral transition-colors leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                    {p.description}
                  </p>
                </div>
                <ArrowRight className="flex-shrink-0 h-5 w-5 text-slate-300 mt-1 group-hover:text-content-coral group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 text-sm hover:border-content-coral/40 transition-all"
          >
            All blog posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <a
            href="/reports"
            className="inline-flex items-center px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 text-sm hover:border-content-coral/40 transition-all"
          >
            All data reports
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
