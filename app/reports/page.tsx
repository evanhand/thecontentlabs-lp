import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/landing/Footer";
import { HexMolecule } from "@/components/ui/HexMolecule";

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
    slug: "small-vs-big",
    title: "Small Accounts Get 14× More Reach",
    description:
      "We measured views per follower across 2,537 videos. The algorithm feeds small accounts. Big accounts aren't suppressed — they just lost the discovery boost.",
    stat: "2,537",
    statLabel: "Videos analyzed",
    badge: "New",
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
    <div className="lab-grid-bg min-h-screen">
      <PublicNav />

      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <HexMolecule
          size={180}
          className="absolute top-20 right-8 opacity-25 pointer-events-none"
        />
        <HexMolecule
          size={140}
          className="absolute bottom-10 left-6 opacity-20 pointer-events-none"
        />

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-content-coral text-[11px] font-mono uppercase tracking-[0.3em] mb-6">
              Data Reports
            </p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.05] mb-6 text-slate-900">
              What the data
              <br />
              <span className="text-content-coral">actually says.</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              We analyze thousands of videos, normalize for follower count, and
              publish what the data really shows. No generic advice. No
              cherry-picked stats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {REPORTS.map((r) => (
              <a
                key={r.slug}
                href={`/reports/${r.slug}`}
                className="group bg-white/80 rounded-2xl border border-content-coral/15 p-7 sm:p-8 hover:border-content-coral/50 hover:shadow-lg hover:shadow-content-coral/10 transition-all flex flex-col"
              >
                {r.badge && (
                  <span className="self-start text-[10px] font-mono uppercase tracking-[0.25em] text-content-coral bg-content-coral/10 rounded-full px-2.5 py-1 mb-4 font-bold">
                    {r.badge}
                  </span>
                )}
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-3 group-hover:text-content-coral transition-colors">
                  {r.title}
                </h2>
                <p className="text-slate-500 leading-relaxed text-[15px] mb-6 flex-1">
                  {r.description}
                </p>
                <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                  <div>
                    <p className="text-3xl font-bold text-content-coral tabular-nums tracking-tight">
                      {r.stat}
                    </p>
                    <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">
                      {r.statLabel}
                    </p>
                  </div>
                  <span className="inline-flex items-center text-sm font-bold text-content-coral">
                    View report
                    <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-400 text-sm">
              More reports coming every week. Got one you want us to run?{" "}
              <a
                href="mailto:business@thecontentlabs.io"
                className="text-content-coral font-medium hover:underline"
              >
                Tell us.
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
