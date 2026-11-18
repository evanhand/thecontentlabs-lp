import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/landing/Footer";
import { ResourceHeader } from "@/components/blog/ResourceHeader";

export const metadata: Metadata = {
  title: "Data Reports — The Content Labs",
  description:
    "Free data reports on what actually goes viral. We analyze thousands of videos, normalize for account size, and publish what the data really says.",
  alternates: { canonical: "https://thecontentlabs.app/reports" },
  openGraph: {
    title: "Data Reports — The Content Labs",
    description:
      "Free data reports on what actually goes viral.",
    url: "https://thecontentlabs.app/reports",
    images: ["https://thecontentlabs.app/og-image.png"],
  },
};

const REPORTS = [
  {
    slug: "300-view-jail",
    title: "How to Escape 300 View Jail",
    description:
      "We pulled 8,500 analyzed videos from our dataset. The conventional 300-view-jail advice is wrong on almost every count. Instagram is 2.5× worse than TikTok. Longer videos escape more. Trust-based content gets stuck.",
    stat: "8,500",
    statLabel: "Videos analyzed",
    badge: "New",
  },
  {
    slug: "small-vs-big",
    title: "Small Accounts Get 14× More Reach",
    description:
      "We measured views per follower across 2,537 videos. The algorithm feeds small accounts. Big accounts aren't suppressed — they just lost the discovery boost.",
    stat: "2,537",
    statLabel: "Videos analyzed",
    badge: null,
  },
  {
    slug: "emotional-triggers",
    title: "Which Emotions Actually Go Viral?",
    description:
      "We tagged 1,833 videos by primary emotion and normalized for follower count. Outrage beats inspiration by 9×.",
    stat: "1,833",
    statLabel: "Videos analyzed",
    badge: null,
  },
  {
    slug: "posting-times",
    title: "Does Posting Time Really Matter?",
    description:
      "7,261 videos, normalized for account size. The 'best time to post' advice is mostly wrong. Here's the honest answer.",
    stat: "7,261",
    statLabel: "Videos analyzed",
    badge: null,
  },
];

export default function ReportsIndex() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <PublicNav />

      <main>
        <ResourceHeader
          title="What the data actually says"
          description="We analyze thousands of videos, normalize for follower count, and publish what the data really shows. No generic advice. No cherry-picked stats."
        />

        <section className="pb-20 sm:pb-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {REPORTS.map((r) => (
                <a
                  key={r.slug}
                  href={`/reports/${r.slug}`}
                  className="group lab-card flex flex-col p-5 sm:p-6 transition-colors duration-200 hover:border-line/[0.16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
                >
                  {r.badge && (
                    <span className="self-start mb-3 inline-flex items-center px-2 py-0.5 rounded-full bg-sunken text-xs font-medium text-ink-2">
                      {r.badge}
                    </span>
                  )}
                  <h2 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-ink leading-tight">
                    {r.title}
                  </h2>
                  <p className="mt-2 text-body text-ink-2 flex-1">
                    {r.description}
                  </p>
                  <div className="mt-6 pt-4 border-t border-line/[0.08] flex items-end justify-between gap-4">
                    <div>
                      <p className="font-heading text-2xl font-semibold text-ink tabular-nums leading-none">
                        {r.stat}
                      </p>
                      <p className="mt-1 text-meta text-ink-3">{r.statLabel}</p>
                    </div>
                    <span className="inline-flex items-center text-sm font-medium text-ink-2 group-hover:text-ink transition-colors">
                      View report
                      <ArrowRight aria-hidden className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <p className="mt-10 text-meta text-ink-3">
              More reports coming every week. Got one you want us to run?{" "}
              <a
                href="mailto:business@thecontentlabs.io"
                className="font-medium text-ink underline decoration-line/[0.24] underline-offset-[3px] hover:decoration-ink"
              >
                Tell us.
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
