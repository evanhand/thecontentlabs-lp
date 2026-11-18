import type { ReactNode } from "react";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/blog/BlogComponents";

type Crumb = { label: string; to?: string };

function formatLongDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Shared shell for long-form pages (blog posts, guides): cream canvas,
 * a single 68ch column, Clash h1, quiet meta line, optional hero image.
 * Markdown elements are styled through mdx-components.tsx.
 */
export function ArticleLayout({
  crumbs,
  title,
  description,
  date,
  updatedDate,
  readingTime,
  heroImage,
  children,
  articleProps,
  beforeArticle,
  schemas = [],
}: {
  crumbs: Crumb[];
  title: string;
  description?: string;
  date: string;
  updatedDate?: string;
  readingTime?: string;
  heroImage?: string | null;
  children: ReactNode;
  articleProps?: Record<string, string>;
  beforeArticle?: ReactNode;
  schemas?: object[];
}) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <PublicNav />

      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main className="px-4 sm:px-6 pt-32 sm:pt-40 pb-20 sm:pb-28">
        <div className="mx-auto w-full max-w-[68ch] text-[17px]">
          <header className="flex flex-col gap-4 sm:gap-5">
            <Breadcrumbs items={crumbs} />
            <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.08] text-ink text-balance">
              {title}
            </h1>
            {description && (
              <p className="text-lg text-ink-2 leading-relaxed">{description}</p>
            )}
            <p className="text-meta text-ink-3">
              <time dateTime={date}>{formatLongDate(date)}</time>
              {updatedDate && (
                <>
                  <span aria-hidden className="mx-1.5">·</span>
                  Updated <time dateTime={updatedDate}>{formatLongDate(updatedDate)}</time>
                </>
              )}
              {readingTime && (
                <>
                  <span aria-hidden className="mx-1.5">·</span>
                  {readingTime}
                </>
              )}
            </p>
          </header>

          {heroImage && (
            <img
              src={heroImage}
              alt={title}
              decoding="async"
              className="mt-8 sm:mt-10 w-full aspect-video object-cover rounded-2xl bg-sunken outline outline-1 -outline-offset-1 outline-black/[0.06]"
            />
          )}

          {beforeArticle}

          <article
            {...articleProps}
            className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-line/[0.08] text-ink-2 leading-7 break-words [&>:first-child]:mt-0 [&>:last-child]:mb-0"
          >
            {children}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
