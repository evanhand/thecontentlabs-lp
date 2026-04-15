import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/landing/Footer";
import { CategoryTabs } from "@/components/blog/CategoryTabs";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Resources — The Content Labs | Guides, Comparisons & Strategy Tips",
  description:
    "Free guides, comparisons, and strategy tips for content creators. Learn about AI content strategy, TikTok growth, content calendars, and how The Content Labs compares to other tools.",
  alternates: { canonical: "https://thecontentlabs.app/blog" },
  openGraph: {
    title: "Resources — The Content Labs",
    description:
      "Free guides and comparisons for content creators. AI content strategy, TikTok growth, and more.",
    url: "https://thecontentlabs.app/blog",
    images: ["https://thecontentlabs.app/og-image.png"],
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicNav />

      <div className="bg-white border-b border-slate-200 pt-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Resources for Creators
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Guides, comparisons, and strategy tips to help you grow — whether
            you use The Content Labs or not.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryTabs posts={posts} />

        <section className="mt-16 bg-gradient-to-br from-content-coral/5 to-content-coral/10 rounded-xl p-8 sm:p-10 text-center border border-content-coral/20">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Ready to Put Strategy Into Action?
          </h2>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            47,598+ creators use The Content Labs to turn data into content
            plans. Competitor analysis, 30-day calendars, and full scripts —
            starting at $39/mo.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-content-cta-dark to-content-cta rounded-xl font-bold text-white shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Get Your Free Audit
            <ArrowRight className="ml-3 h-5 w-5" />
          </a>
        </section>
      </div>

      <Footer />
    </div>
  );
}
