import type { Metadata } from "next";
import { EmotionalTriggersReport } from "./Report";

export const metadata: Metadata = {
  title: "Emotional Triggers Report",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function Page() {
  return <EmotionalTriggersReport />;
}
