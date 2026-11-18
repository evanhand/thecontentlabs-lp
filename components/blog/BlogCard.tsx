import { Activity, BookOpen, GitCompare, Target } from "lucide-react";
import { PostMeta } from "@/lib/blog";

const CATEGORY_LABELS: Record<string, string> = {
  comparison: "Comparison",
  guide: "Guide",
  niche: "Niche guide",
  blog: "Data study",
};

const CATEGORY_ICONS = {
  comparison: GitCompare,
  guide: BookOpen,
  niche: Target,
  blog: Activity,
} as const;

export type BlogCardVariant = "default" | "wide" | "compact";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function CardMeta({ post }: { post: PostMeta }) {
  return (
    <p className="text-meta text-ink-3">
      {CATEGORY_LABELS[post.category] || "Blog"}
      <span aria-hidden className="mx-1.5">·</span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      {post.readingTime && (
        <>
          <span aria-hidden className="mx-1.5">·</span>
          {post.readingTime}
        </>
      )}
    </p>
  );
}

function CardThumbnail({
  category,
  ratio = "16/9",
  imageUrl,
  alt,
}: {
  category: string;
  ratio?: string;
  imageUrl?: string | null;
  alt?: string;
}) {
  if (imageUrl) {
    return (
      <div
        className="relative w-full overflow-hidden rounded-xl bg-sunken outline outline-1 -outline-offset-1 outline-black/[0.06]"
        style={{ aspectRatio: ratio }}
      >
        <img
          src={imageUrl}
          alt={alt || ""}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    );
  }
  const Icon =
    CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] || CATEGORY_ICONS.blog;
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl bg-sunken flex items-center justify-center"
      style={{ aspectRatio: ratio }}
    >
      <Icon aria-hidden className="h-6 w-6 text-ink-3" strokeWidth={1.5} />
    </div>
  );
}

export function BlogCard({
  post,
  variant = "default",
  thumbnailUrl,
}: {
  post: PostMeta;
  variant?: BlogCardVariant;
  thumbnailUrl?: string | null;
}) {
  const href = `${post.isGuide ? "/guides" : "/blog"}/${post.slug}`;
  const cardBase =
    "group lab-card transition-colors duration-200 hover:border-line/[0.16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20";

  if (variant === "wide") {
    return (
      <a href={href} className={`${cardBase} flex flex-col sm:flex-row gap-5 sm:gap-6 p-5 sm:p-6`}>
        <div className="sm:w-[42%] flex-shrink-0">
          <CardThumbnail category={post.category} imageUrl={thumbnailUrl} alt={post.title} />
        </div>
        <div className="flex flex-col flex-1 min-w-0 gap-2">
          <h3 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-ink leading-[1.2] group-hover:text-ink-2 transition-colors">
            {post.title}
          </h3>
          <p className="text-body text-ink-2 line-clamp-2">{post.description}</p>
          <div className="mt-auto pt-2">
            <CardMeta post={post} />
          </div>
        </div>
      </a>
    );
  }

  if (variant === "compact") {
    return (
      <a href={href} className={`${cardBase} flex items-start gap-4 p-4`}>
        <div className="w-20 sm:w-24 flex-shrink-0">
          <CardThumbnail category={post.category} ratio="1/1" imageUrl={thumbnailUrl} alt={post.title} />
        </div>
        <div className="flex flex-col flex-1 min-w-0 gap-1.5">
          <h3 className="text-[15px] font-semibold text-ink leading-snug line-clamp-2 group-hover:text-ink-2 transition-colors">
            {post.title}
          </h3>
          <CardMeta post={post} />
        </div>
      </a>
    );
  }

  return (
    <a href={href} className={`${cardBase} flex flex-col overflow-hidden`}>
      <div className="p-3 pb-0">
        <CardThumbnail category={post.category} imageUrl={thumbnailUrl} alt={post.title} />
      </div>
      <div className="flex flex-col flex-1 gap-2 p-5">
        <h3 className="font-heading text-lg font-semibold tracking-tight text-ink leading-[1.25] group-hover:text-ink-2 transition-colors">
          {post.title}
        </h3>
        <p className="text-body text-ink-2 line-clamp-2">{post.description}</p>
        <div className="mt-auto pt-2">
          <CardMeta post={post} />
        </div>
      </div>
    </a>
  );
}
