import fs from "node:fs";
import path from "node:path";
import { Metadata } from "next";
import { getAllSlugs, getPostMeta } from "@/lib/blog";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { BlogPostTracker } from "@/components/blog/BlogPostTracker";

function resolveHeroImage(slug: string, explicit?: string): string | null {
  if (explicit) return explicit;
  const localPath = path.join(process.cwd(), "public", "thumbnails", `${slug}.png`);
  if (fs.existsSync(localPath)) return `/thumbnails/${slug}.png`;
  return null;
}

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
  const heroImage = resolveHeroImage(slug, meta.heroImage);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    url: `https://thecontentlabs.app/blog/${slug}`,
    image: heroImage || meta.ogImage || "https://thecontentlabs.app/og-image.png",
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
    <ArticleLayout
      crumbs={[{ label: meta.title }]}
      title={meta.title}
      description={meta.description}
      date={meta.date}
      updatedDate={meta.updatedDate}
      readingTime={meta.readingTime}
      heroImage={heroImage}
      articleProps={{ "data-blog-article": "" }}
      schemas={faqSchema ? [articleSchema, faqSchema] : [articleSchema]}
      beforeArticle={
        <BlogPostTracker
          slug={slug}
          category={meta.category}
          title={meta.title}
          readingTime={meta.readingTime}
        />
      }
    >
      <Post />
    </ArticleLayout>
  );
}
