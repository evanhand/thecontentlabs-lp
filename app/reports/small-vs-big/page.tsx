import type { Metadata } from "next";
import { SmallVsBigReport } from "@/app/studio/small-vs-big-report/Report";

export const metadata: Metadata = {
  title: "Small Accounts Get 14× More Reach | Data Report | The Content Labs",
  description: "We measured views per follower across 2,537 videos. Accounts under 10K get 14× more algorithmic reach than accounts over 1M. Full visual data report.",
  alternates: { canonical: "https://thecontentlabs.app/reports/small-vs-big" },
  openGraph: {
    title: "Small Accounts Get 14× More Reach (2,537 Videos Analyzed)",
    description: "The algorithm feeds small accounts. We proved it with data.",
    url: "https://thecontentlabs.app/reports/small-vs-big",
    type: "article",
    images: ["https://thecontentlabs.app/og/report-small-vs-big.png"],
  },
};

export default function Page() {
  return <SmallVsBigReport />;
}
