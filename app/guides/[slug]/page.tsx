import { Metadata } from "next";
import { getAllGuideSlugs, getGuideMeta } from "@/lib/guides";
import { ArticleLayout } from "@/components/blog/ArticleLayout";

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getGuideMeta(slug);
  const url = `https://thecontentlabs.app/guides/${slug}`;
  const ogImage =
    meta.ogImage || `https://thecontentlabs.app/og/guide-${slug}.png`;

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

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getGuideMeta(slug);
  const { default: Post } = await import(`@/content/guides/${slug}.mdx`);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    url: `https://thecontentlabs.app/guides/${slug}`,
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
    mainEntityOfPage: `https://thecontentlabs.app/guides/${slug}`,
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
    <ArticleLayout
      crumbs={[{ label: "Guides", to: "/guides" }, { label: meta.title }]}
      title={meta.title}
      description={meta.description}
      date={meta.date}
      updatedDate={meta.updatedDate}
      readingTime={meta.readingTime}
      heroImage={meta.heroImage}
      schemas={faqSchema ? [articleSchema, faqSchema] : [articleSchema]}
    >
      <Post />
    </ArticleLayout>
  );
}
