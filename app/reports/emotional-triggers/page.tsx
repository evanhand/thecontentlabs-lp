import type { Metadata } from "next";
import { EmotionalTriggersReport } from "@/app/studio/emotional-triggers-report/Report";

export const metadata: Metadata = {
  title:
    "Which Emotions Go Viral? Data Report from 1,833 Videos | The Content Labs",
  description:
    "We tagged 1,833 videos by primary emotion and measured views per follower. Outrage beats inspiration by 9×. Full visual data report with methodology.",
  alternates: {
    canonical: "https://thecontentlabs.app/reports/emotional-triggers",
  },
  openGraph: {
    title: "Which Emotions Actually Go Viral? (1,833 Videos Analyzed)",
    description:
      "Outrage beats Inspiration by 9×. The full data report on emotional triggers that drive reach.",
    url: "https://thecontentlabs.app/reports/emotional-triggers",
    type: "article",
    images: ["https://thecontentlabs.app/og/report-emotional-triggers.png"],
  },
  twitter: {
    title: "Which Emotions Actually Go Viral? (1,833 Videos)",
    description:
      "Outrage beats Inspiration by 9×. Full data report inside.",
    images: ["https://thecontentlabs.app/og/report-emotional-triggers.png"],
  },
};

export default function Page() {
  return <EmotionalTriggersReport />;
}
