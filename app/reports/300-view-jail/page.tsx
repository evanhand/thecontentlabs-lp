import type { Metadata } from "next";
import { ViewJailReport } from "@/app/studio/300-view-jail-report/Report";

export const metadata: Metadata = {
  title: "How to Escape 300 View Jail | Data Report | The Content Labs",
  description:
    "We pulled 8,500 analyzed videos to find what actually separates the stuck from the escaped on TikTok and Instagram. Account size, platform, hook archetype, emotional trigger — the real data, not the common advice.",
  alternates: { canonical: "https://thecontentlabs.app/reports/300-view-jail" },
  openGraph: {
    title: "How to Escape 300 View Jail (8,500 Videos Analyzed)",
    description:
      "Instagram is 2.6× worse than TikTok. Longer videos escape more. Trust-based content gets trapped. The full data.",
    url: "https://thecontentlabs.app/reports/300-view-jail",
    type: "article",
    images: ["https://thecontentlabs.app/og-image.png"],
  },
};

export default function Page() {
  return <ViewJailReport />;
}
