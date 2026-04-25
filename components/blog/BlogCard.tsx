import { ArrowRight, Activity, BookOpen, GitCompare, Target } from "lucide-react";
import { PostMeta } from "@/lib/blog";

const CATEGORY_DOTS: Record<string, string> = {
  comparison: "bg-sky-400",
  guide: "bg-emerald-400",
  niche: "bg-violet-400",
  blog: "bg-content-coral",
};

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

const CATEGORY_PALETTES: Record<string, { from: string; via: string; accent: string; glow: string }> = {
  comparison: {
    from: "from-sky-500/40",
    via: "via-slate-900",
    accent: "text-sky-200",
    glow: "bg-sky-400/30",
  },
  guide: {
    from: "from-emerald-500/40",
    via: "via-slate-900",
    accent: "text-emerald-200",
    glow: "bg-emerald-400/30",
  },
  niche: {
    from: "from-violet-500/40",
    via: "via-slate-900",
    accent: "text-violet-200",
    glow: "bg-violet-400/30",
  },
  blog: {
    from: "from-content-coral/45",
    via: "via-slate-900",
    accent: "text-content-coral",
    glow: "bg-content-coral/30",
  },
};

// Deterministic slug-hash → 0..n
function slugHash(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export type BlogCardVariant = "default" | "wide" | "compact";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function CardEyebrow({ post }: { post: PostMeta }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${CATEGORY_DOTS[post.category] || CATEGORY_DOTS.blog}`}
      />
      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500 font-bold">
        {CATEGORY_LABELS[post.category] || "Blog"}
      </span>
      <span aria-hidden className="text-slate-300 text-[10px]">·</span>
      <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-slate-400">
        {post.readingTime}
      </span>
    </div>
  );
}

function CardThumbnail({
  slug,
  category,
  ratio = "16/9",
  imageUrl,
  alt,
}: {
  slug: string;
  category: string;
  ratio?: string;
  imageUrl?: string | null;
  alt?: string;
}) {
  if (imageUrl) {
    return (
      <div
        className="relative w-full overflow-hidden rounded-lg ring-1 ring-slate-200/60 group-hover:ring-content-coral/30 bg-slate-900 transition-all"
        style={{ aspectRatio: ratio }}
      >
        <img
          src={imageUrl}
          alt={alt || ""}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
    );
  }
  const palette = CATEGORY_PALETTES[category] || CATEGORY_PALETTES.blog;
  const Icon = CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] || CATEGORY_ICONS.blog;
  const h = slugHash(slug);
  const gradientDir = ["bg-gradient-to-br", "bg-gradient-to-bl", "bg-gradient-to-tr", "bg-gradient-to-tl"][h % 4];
  const glowPos = [
    "-top-10 -right-10",
    "-top-10 -left-10",
    "-bottom-10 -right-10",
    "-bottom-10 -left-10",
  ][(h >> 2) % 4];
  const accentPos = [
    "top-1/3 left-1/4",
    "bottom-1/3 right-1/4",
    "top-1/2 right-1/3",
    "bottom-1/4 left-1/3",
  ][(h >> 4) % 4];
  const iconRotation = ((h >> 6) % 12) - 6; // -6 .. +5 deg
  const labelRaw = CATEGORY_LABELS[category] || "Blog";

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg ring-1 ring-slate-200/60 group-hover:ring-content-coral/30 transition-all"
      style={{ aspectRatio: ratio }}
    >
      <div
        aria-hidden
        className={`absolute inset-0 ${gradientDir} ${palette.from} ${palette.via} to-slate-950`}
      />
      {/* Glow blob */}
      <div
        aria-hidden
        className={`absolute w-44 h-44 rounded-full ${palette.glow} blur-3xl ${glowPos}`}
      />
      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Decorative ring (per slug) */}
      <div
        aria-hidden
        className={`absolute w-24 h-24 rounded-full border border-white/10 ${accentPos} group-hover:scale-110 transition-transform duration-700`}
      />
      {/* Category icon centerpiece */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          aria-hidden
          className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 group-hover:ring-white/20 transition-all"
          style={{ transform: `rotate(${iconRotation}deg)` }}
        >
          <Icon className={`h-6 w-6 ${palette.accent}`} strokeWidth={1.5} />
        </div>
      </div>
      {/* Mono category label, top-left */}
      <span className="absolute top-2.5 left-3 font-mono text-[9px] uppercase tracking-[0.22em] text-white/70 font-bold">
        {labelRaw}
      </span>
      {/* Slug code, bottom-right */}
      <span className="absolute bottom-2 right-3 font-mono text-[8px] uppercase tracking-wider text-white/30">
        #{(h % 9999).toString().padStart(4, "0")}
      </span>
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

  if (variant === "wide") {
    return (
      <a
        href={href}
        className="group flex flex-col sm:flex-row gap-5 sm:gap-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 hover:border-content-coral/40 hover:shadow-lg hover:shadow-content-coral/5 transition-all duration-300"
      >
        <div className="sm:w-[42%] flex-shrink-0">
          <CardThumbnail slug={post.slug} category={post.category} imageUrl={thumbnailUrl} alt={post.title} />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <CardEyebrow post={post} />
          <h3 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 group-hover:text-content-coral transition-colors leading-[1.2] mb-2">
            {post.title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
            {post.description}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-content-coral">
              Read
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </a>
    );
  }

  if (variant === "compact") {
    return (
      <a
        href={href}
        className="group flex items-start gap-4 bg-white rounded-xl border border-slate-200 p-4 hover:border-content-coral/40 hover:shadow-md hover:shadow-content-coral/5 transition-all"
      >
        <div className="w-20 sm:w-24 flex-shrink-0">
          <CardThumbnail slug={post.slug} category={post.category} ratio="1/1" imageUrl={thumbnailUrl} alt={post.title} />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <CardEyebrow post={post} />
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-content-coral transition-colors leading-snug line-clamp-2 mb-1">
            {post.title}
          </h3>
          <span className="mt-auto text-[10px] font-mono uppercase tracking-wider text-slate-400">
            {formatDate(post.date)}
          </span>
        </div>
      </a>
    );
  }

  return (
    <a
      href={href}
      className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-content-coral/40 hover:shadow-lg hover:shadow-content-coral/5 transition-all duration-300"
    >
      <div className="p-3 pb-0">
        <CardThumbnail slug={post.slug} category={post.category} />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <CardEyebrow post={post} />
        <h3 className="font-heading text-lg font-semibold tracking-tight text-slate-900 group-hover:text-content-coral transition-colors leading-[1.25] mb-2">
          {post.title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
          {post.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
            {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-content-coral">
            Read
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </a>
  );
}
