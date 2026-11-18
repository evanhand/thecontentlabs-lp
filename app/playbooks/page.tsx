import type { Metadata } from "next";
import { ArrowRight, Activity, BookOpen } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/landing/Footer";
import { CTA } from "@/components/blog/MDXComponents";
import { ResourceHeader } from "@/components/blog/ResourceHeader";
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

export default function PlaybooksIndex() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <PublicNav />

      <main>
        <ResourceHeader
          title="Pick your niche. Get the playbook."
          description="Hook archetypes, formats, and patterns that actually win in your specific space, ranked by real median view counts."
        />

        <section className="pb-16 sm:pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {NICHE_ORDER.map((slug) => {
                const n = NICHES[slug];
                const top = [...n.hooks].sort((a, b) => b.median - a.median)[0];
                return (
                  <a
                    key={slug}
                    href={`/playbooks/${slug}/best-tiktok-hooks`}
                    className="group lab-card flex flex-col p-5 sm:p-6 transition-colors duration-200 hover:border-line/[0.16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-heading text-xl font-semibold tracking-[-0.01em] text-ink leading-tight">
                        {n.label}
                      </h2>
                      <ArrowRight aria-hidden className="h-4 w-4 mt-1 text-ink-3 transition-[color,transform] group-hover:text-ink group-hover:translate-x-0.5" />
                    </div>
                    <p className="mt-1.5 text-body text-ink-2">
                      Best TikTok hooks for {n.audience}
                    </p>
                    <p className="mt-1 text-meta text-ink-3 tabular-nums">
                      {n.totalVideos.toLocaleString()} videos
                    </p>
                    {top && (
                      <div className="mt-5 pt-4 border-t border-line/[0.08]">
                        <p className="text-meta text-ink-3">Top hook this month</p>
                        <p className="mt-0.5 text-sm font-semibold text-ink tabular-nums">
                          {top.archetype}
                          <span className="ml-1.5 font-normal text-ink-3">
                            {top.median.toLocaleString()} median views
                          </span>
                        </p>
                      </div>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-heading text-section text-ink mb-4">Also useful</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { href: "/trends", label: "Live monthly trends", Icon: Activity },
                { href: "/blog", label: "All studies and guides", Icon: BookOpen },
              ].map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  className="group lab-card flex items-center justify-between gap-3 px-5 py-4 transition-colors hover:border-line/[0.16]"
                >
                  <span className="flex items-center gap-3 text-[15px] font-medium text-ink">
                    <Icon aria-hidden className="h-4 w-4 text-ink-3" />
                    {label}
                  </span>
                  <ArrowRight aria-hidden className="h-4 w-4 text-ink-3 transition-[color,transform] group-hover:text-ink group-hover:translate-x-0.5 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20 sm:pb-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <CTA
              headline="Don't see your niche? Get a custom playbook from your own data."
              sub="Connect TikTok and Instagram. The Content Labs runs the same hook + format breakdown on your account plus your top competitors, then writes a 30-day calendar tuned to what's winning in your specific space."
              primary="Audit my account free"
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
