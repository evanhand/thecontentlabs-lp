import { ArrowRight } from "lucide-react";
import { PostMeta } from "@/lib/blog";

const CATEGORY_COLORS: Record<string, string> = {
  comparison: "bg-blue-50 text-blue-700 border-blue-200",
  guide: "bg-green-50 text-green-700 border-green-200",
  niche: "bg-purple-50 text-purple-700 border-purple-200",
  blog: "bg-amber-50 text-amber-700 border-amber-200",
};

const CATEGORY_LABELS: Record<string, string> = {
  comparison: "Comparison",
  guide: "Guide",
  niche: "Niche Guide",
  blog: "Blog",
};

export function BlogCard({ post }: { post: PostMeta }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl border border-slate-200 p-6 hover:border-content-coral/30 hover:shadow-md transition-all duration-200"
    >
      <span
        className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full border mb-3 ${CATEGORY_COLORS[post.category] || CATEGORY_COLORS.blog}`}
      >
        {CATEGORY_LABELS[post.category] || "Blog"}
      </span>
      <h3 className="text-base font-bold text-slate-900 group-hover:text-content-coral transition-colors mb-2">
        {post.title}
      </h3>
      <p className="text-sm text-slate-600 leading-relaxed mb-3 line-clamp-2">
        {post.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          {" · "}
          {post.readingTime}
        </span>
        <span className="inline-flex items-center text-sm font-medium text-content-coral">
          Read{" "}
          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </a>
  );
}
