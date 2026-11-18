import { ArrowRight } from "lucide-react";
import { PostMeta } from "@/lib/blog";

const CATEGORY_LABELS: Record<string, string> = {
  comparison: "Comparison",
  guide: "Guide",
  niche: "Niche guide",
  blog: "Data study",
};

export function FeaturedStudyCard({
  post,
  imageUrl,
}: {
  post: PostMeta;
  imageUrl?: string | null;
}) {
  const href = `${post.isGuide ? "/guides" : "/blog"}/${post.slug}`;
  const categoryLabel = CATEGORY_LABELS[post.category] || "Blog";
  const dateLabel = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="lab-card overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-10 p-5 sm:p-6 lg:p-8 items-center">
        <div className="order-2 lg:order-1 flex flex-col gap-4">
          <p className="text-meta text-ink-3">
            Newest {categoryLabel.toLowerCase()}
            <span aria-hidden className="mx-1.5">·</span>
            <time dateTime={post.date}>{dateLabel}</time>
            {post.readingTime && (
              <>
                <span aria-hidden className="mx-1.5">·</span>
                {post.readingTime}
              </>
            )}
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.02em] leading-[1.1] text-ink">
            <a href={href} className="hover:text-ink-2 transition-colors">
              {post.title}
            </a>
          </h2>
          <p className="text-body sm:text-lg text-ink-2 max-w-[60ch]">
            {post.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={href}
              className="group/cta inline-flex items-center justify-center h-11 px-5 rounded-[10px] bg-ink text-canvas text-sm font-medium transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2"
            >
              Read the study
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
            </a>
            <a
              href="#all-resources"
              className="inline-flex items-center justify-center h-11 px-5 rounded-[10px] bg-surface border border-line/[0.14] text-sm font-medium text-ink transition-colors hover:bg-sunken active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
            >
              Browse all
            </a>
          </div>
        </div>

        <a
          href={href}
          className="order-1 lg:order-2 block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
          aria-label={`Read ${post.title}`}
        >
          <div className="relative overflow-hidden rounded-xl bg-sunken outline outline-1 -outline-offset-1 outline-black/[0.06]">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={post.title}
                loading="eager"
                decoding="async"
                className="w-full aspect-[1200/630] object-cover"
              />
            ) : (
              <div className="w-full aspect-[1200/630] flex items-center justify-center px-8">
                <p className="font-heading text-ink-2 text-center text-xl font-semibold leading-tight">
                  {post.title}
                </p>
              </div>
            )}
          </div>
        </a>
      </div>
    </article>
  );
}
