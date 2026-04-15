import type { Metadata } from "next";
import { PostingTimesReport } from "./Report";

export const metadata: Metadata = {
  title: "Posting Times Report",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function Page() {
  return <PostingTimesReport />;
}
