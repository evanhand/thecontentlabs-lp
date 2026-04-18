import type { Metadata } from "next";
import { PostingTimesReport } from "@/app/studio/posting-times-report/Report";

export const metadata: Metadata = {
  title:
    "Does Posting Time Matter? Data Report from 7,261 Videos | The Content Labs",
  description:
    "We analyzed 7,261 videos, normalized for follower count. The real best time to post isn't what the articles tell you. Full visual data report.",
  alternates: {
    canonical: "https://thecontentlabs.app/reports/posting-times",
  },
  openGraph: {
    title: "Does Posting Time Actually Matter? (7,261 Videos Analyzed)",
    description:
      "Most 'best time to post' articles are biased. Here's what the data really says when you normalize for follower count.",
    url: "https://thecontentlabs.app/reports/posting-times",
    type: "article",
    images: ["https://thecontentlabs.app/og/report-posting-times.png"],
  },
  twitter: {
    title: "Does Posting Time Actually Matter? (7,261 Videos)",
    description:
      "Content beats timing 100×. Full data report inside.",
    images: ["https://thecontentlabs.app/og/report-posting-times.png"],
  },
};

export default function Page() {
  return <PostingTimesReport />;
}
