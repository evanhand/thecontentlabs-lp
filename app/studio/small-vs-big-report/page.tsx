import type { Metadata } from "next";
import { SmallVsBigReport } from "./Report";

export const metadata: Metadata = {
  title: "Small vs Big Accounts Report",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function Page() {
  return <SmallVsBigReport />;
}
