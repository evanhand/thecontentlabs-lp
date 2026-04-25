import type { Metadata } from "next";
import { ArrowRight, Activity, BookOpen, Compass } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/landing/Footer";
import { CTA } from "@/components/blog/MDXComponents";
import { NICHES, type NicheSlug } from "@/lib/playbooks";

export const metadata: Metadata = {
  title: "Niche Playbooks | The Content Labs",
  description:
    "Per-niche TikTok and Instagram playbooks built from real performance data. Hook archetypes, formats, and patterns that win in your specific niche.",
  alternates: { canonical: "https://thecontentlabs.app/playbooks" },
  openGraph: {
    title: "Niche Playbooks — The Content Labs",
    description:
      "Per-niche TikTok and Instagram playbooks built from real performance data.",
    url: "https://thecontentlabs.app/playbooks",
    images: ["https://thecontentlabs.app/og-image.png"],
  },
};

const NICHE_ORDER: NicheSlug[] = [
  "fitness",
  "finance",
  "coaching",
  "cooking",
  "ecommerce",
  "real-estate",
];

const NICHE_PALETTES: Record<NicheSlug, string> = {
  fitness: "from-emerald-500/30",
  finance: "from-sky-500/30",
  coaching: "from-violet-500/30",
  cooking: "from-amber-500/30",
  ecommerce: "from-pink-500/30",
  "real-estate": "from-content-coral/30",
};

export default function PlaybooksIndex() {
  return (
    <div className="min-h-screen bg-[#fffbf9]">
      <PublicNav />

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

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full bg-content-coral/10 border border-content-coral/25">
            <Compass className="h-3.5 w-3.5 text-content-coral" />
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-content-coral font-bold">
              Niche playbooks
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 items-end">
            <h1 className="font-heading font-semibold text-slate-900 tracking-tight leading-[1.05] text-[40px] sm:text-5xl lg:text-[58px]">
              Pick your niche. Get the playbook
              <span className="text-content-coral">.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed lg:max-w-md lg:justify-self-end lg:text-right">
              Hook archetypes, formats, and patterns that actually win in your
              specific space, ranked by real median view counts.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-14">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {NICHE_ORDER.map((slug) => {
              const n = NICHES[slug];
              const top = [...n.hooks].sort((a, b) => b.median - a.median)[0];
              return (
                <a
                  key={slug}
                  href={`/playbooks/${slug}/best-tiktok-hooks`}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-content-coral/40 hover:shadow-lg hover:shadow-content-coral/5 transition-all"
                >
                  <div
                    aria-hidden
                    className={`h-2 w-full bg-gradient-to-r ${NICHE_PALETTES[slug]} via-slate-100 to-slate-50`}
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 font-semibold tabular-nums">
                        {n.totalVideos.toLocaleString()} videos
                      </span>
                      <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-content-coral group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-slate-900 group-hover:text-content-coral mb-1.5 leading-tight">
                      {n.label}
                    </h3>
                    <p className="text-[13px] text-slate-600 leading-relaxed mb-4">
                      Best TikTok hooks for {n.audience}
                    </p>
                    {top && (
                      <div className="rounded-lg bg-slate-50 border border-slate-100 px-3.5 py-2.5">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-0.5">
                          Top hook this month
                        </p>
                        <p className="text-sm font-semibold text-slate-900 tabular-nums">
                          {top.archetype}{" "}
                          <span className="text-slate-400 font-mono text-[11px] font-normal">
                            · {top.median.toLocaleString()} med
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 mb-14">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500 mb-3">
              Also useful
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="/trends"
                className="group flex items-center justify-between gap-3 rounded-xl bg-slate-50 hover:bg-content-coral/5 border border-slate-200 hover:border-content-coral/30 px-4 py-3 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Activity className="h-4 w-4 text-content-coral" />
                  <span className="text-sm font-semibold text-slate-900 group-hover:text-content-coral">
                    Live monthly trends
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-content-coral group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </a>
              <a
                href="/blog"
                className="group flex items-center justify-between gap-3 rounded-xl bg-slate-50 hover:bg-content-coral/5 border border-slate-200 hover:border-content-coral/30 px-4 py-3 transition-all"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-content-coral" />
                  <span className="text-sm font-semibold text-slate-900 group-hover:text-content-coral">
                    All studies and guides
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-content-coral group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <CTA
            headline="Don't see your niche? Get a custom playbook from your own data."
            sub="Connect TikTok and Instagram. The Content Labs runs the same hook + format breakdown on your account plus your top competitors, then writes a 30-day calendar tuned to what's winning in your specific space."
            primary="Audit my account free"
            secondary="See how it works"
            secondaryHref="/features/content-strategy"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
