import { Metadata } from "next";
import { getAllSlugs, getPostMeta } from "@/lib/blog";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/blog/BlogComponents";

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

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      type: "article",
      images: [meta.ogImage || "https://thecontentlabs.app/og-image.png"],
      publishedTime: meta.date,
      modifiedTime: meta.updatedDate || meta.date,
    },
    twitter: {
      title: meta.title,
      description: meta.description,
      images: [meta.ogImage || "https://thecontentlabs.app/og-image.png"],
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
    image: meta.ogImage || "https://thecontentlabs.app/og-image.png",
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

      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-28">
          <div className="space-y-4">
            <a
              href="/blog"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              &larr; Resources
            </a>
            <div>
              <p className="text-sm text-content-coral font-medium mb-1">
                {CATEGORY_LABELS[meta.category] || "Blog"}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {meta.title}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {new Date(meta.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {meta.updatedDate &&
                  ` · Updated ${new Date(meta.updatedDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`}
                {" · "}
                {meta.readingTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-10 prose prose-slate max-w-none prose-headings:scroll-mt-20 prose-headings:mt-10 prose-headings:mb-4 prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-content-coral prose-a:no-underline hover:prose-a:underline prose-hr:my-10">
          <Post />
        </article>
      </div>

      <Footer />
    </div>
  );
}
