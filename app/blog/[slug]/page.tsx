import { Metadata } from "next";
import { getAllSlugs, getPostMeta } from "@/lib/blog";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/blog/BlogComponents";
import { BlogCTACard } from "@/components/blog/BlogCTACard";

const CATEGORY_LABELS: Record<string, string> = {
  guide: "Guide",
  comparison: "Comparison",
  niche: "Niche Guide",
  blog: "Blog",
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getPostMeta(slug);
  const url = `https://thecontentlabs.app/blog/${slug}`;
  const ogImage =
    meta.ogImage || `https://thecontentlabs.app/og/blog-${slug}.png`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      type: "article",
      images: [ogImage],
      publishedTime: meta.date,
      modifiedTime: meta.updatedDate || meta.date,
    },
    twitter: {
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getPostMeta(slug);
  const { default: Post } = await import(`@/content/blog/${slug}.mdx`);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    url: `https://thecontentlabs.app/blog/${slug}`,
    image: meta.heroImage || meta.ogImage || "https://thecontentlabs.app/og-image.png",
    datePublished: meta.date,
    dateModified: meta.updatedDate || meta.date,
    author: {
      "@type": "Organization",
      name: "The Content Labs",
      url: "https://thecontentlabs.app",
    },
    publisher: {
      "@type": "Organization",
      name: "The Content Labs",
      url: "https://thecontentlabs.app",
      logo: {
        "@type": "ImageObject",
        url: "https://thecontentlabs.app/logo.png",
      },
    },
    mainEntityOfPage: `https://thecontentlabs.app/blog/${slug}`,
  };

  const faqSchema =
    meta.faqs && meta.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: meta.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicNav />
      <Breadcrumbs items={[{ label: meta.title }]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32">
          <a
            href="/blog"
            className="inline-flex items-center text-sm text-slate-400 hover:text-slate-600 transition-colors mb-6"
          >
            &larr; All Resources
          </a>

          <span className="inline-block text-xs font-semibold text-content-coral bg-content-coral/10 px-3 py-1 rounded-full mb-4">
            {CATEGORY_LABELS[meta.category] || "Blog"}
          </span>

          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15] mb-4">
            {meta.title}
          </h1>

          <p className="text-base text-slate-500 mb-8 max-w-2xl">
            {meta.description}
          </p>

          <div className="flex items-center gap-3 text-sm text-slate-400 pb-8">
            <span>
              {new Date(meta.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {meta.updatedDate && (
              <>
                <span>&middot;</span>
                <span>
                  Updated{" "}
                  {new Date(meta.updatedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </>
            )}
            <span>&middot;</span>
            <span>{meta.readingTime}</span>
          </div>
        </div>

        {/* Hero image */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mb-px">
          {meta.heroImage ? (
            <img
              src={meta.heroImage}
              alt={meta.title}
              className="w-full aspect-video object-cover rounded-2xl border border-slate-200"
            />
          ) : (
            <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-content-coral/30 relative overflow-hidden">
              {/* Grid pattern */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
                <span className="text-content-coral text-xs font-bold uppercase tracking-widest mb-4">
                  {CATEGORY_LABELS[meta.category] || "Blog"}
                </span>
                <h2 className="text-white text-xl sm:text-3xl lg:text-4xl font-bold text-center leading-tight max-w-2xl">
                  {meta.title}
                </h2>
              </div>
              {/* Corner accent */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-content-coral/10 rounded-full blur-3xl" />
            </div>
          )}
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <article
          className={[
            "bg-white rounded-2xl shadow-sm border border-slate-200",
            "px-5 py-8 sm:px-10 sm:py-12 lg:px-14",
            // Prose base
            "prose prose-slate prose-lg max-w-none",
            // Consistent vertical rhythm
            "[&>*]:mb-6 [&>*:last-child]:mb-0",
            // Typography
            "prose-p:text-[17px] prose-p:leading-[1.8] prose-p:my-0",
            "prose-li:text-[17px] prose-li:leading-[1.8] prose-li:my-0",
            "prose-p:text-slate-600 prose-li:text-slate-600",
            "prose-ul:my-0 prose-ol:my-0",
            // Headings
            "prose-headings:scroll-mt-24 prose-headings:my-0",
            "prose-h2:text-[24px] sm:prose-h2:text-[28px] prose-h2:font-bold prose-h2:tracking-tight prose-h2:text-slate-900 prose-h2:pt-6",
            "prose-h3:text-[19px] sm:prose-h3:text-[22px] prose-h3:font-semibold prose-h3:text-slate-800 prose-h3:pt-2",
            // Links
            "prose-a:text-content-coral prose-a:no-underline hover:prose-a:underline prose-a:font-medium",
            // Strong
            "prose-strong:text-slate-800 prose-strong:font-semibold",
            // Horizontal rules
            "prose-hr:my-0 prose-hr:border-slate-200 [&>hr]:pt-4 [&>hr]:pb-2",
            // Tables: wrapped with border and rounded corners
            "[&_table]:w-full [&_table]:text-sm [&_table]:border-collapse",
            "[&_table]:rounded-xl [&_table]:overflow-hidden [&_table]:border [&_table]:border-slate-200",
            "[&_thead]:bg-slate-50",
            "[&_th]:text-left [&_th]:font-semibold [&_th]:text-slate-700 [&_th]:px-4 [&_th]:py-3 [&_th]:text-[13px]",
            "[&_td]:px-4 [&_td]:py-3 [&_td]:text-slate-600 [&_td]:text-[14px] [&_td]:border-t [&_td]:border-slate-100",
            "[&_tbody_tr:hover]:bg-slate-50/50 [&_tbody_tr]:transition-colors",
            // Blockquotes
            "prose-blockquote:my-0 prose-blockquote:border-content-coral/30 prose-blockquote:bg-slate-50 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:not-italic",
            // Images
            "prose-img:rounded-xl prose-img:my-0",
            // Inline code: allow wrapping so long regex/strings don't overflow
            "[&_code]:break-all [&_code]:whitespace-normal",
            // Pre/code blocks: scroll horizontally on overflow
            "[&_pre]:overflow-x-auto [&_pre]:max-w-full",
          ].join(" ")}
        >
          <Post />
          <BlogCTACard slug={slug} />
        </article>
      </div>

      <Footer />
    </div>
  );
}
