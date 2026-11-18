"use client";

import { useState } from "react";
import { PostMeta } from "@/lib/blog";
import { BlogCard } from "./BlogCard";

const TABS = [
  { key: "all", label: "All" },
  { key: "blog", label: "Blog" },
  { key: "guide", label: "Guides" },
  { key: "comparison", label: "Comparisons" },
  { key: "niche", label: "Niche Guides" },
] as const;

const PAGE_SIZE = 12;

export function CategoryTabs({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState<string>("all");
  const [shown, setShown] = useState(PAGE_SIZE);

  const filtered =
    active === "all" ? posts : posts.filter((p) => p.category === active);
  const visible = filtered.slice(0, shown);
  const hasMore = shown < filtered.length;

  return (
    <>
      <div role="tablist" className="flex flex-wrap gap-2 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={active === tab.key}
            onClick={() => {
              setActive(tab.key);
              setShown(PAGE_SIZE);
            }}
            className={`h-9 px-4 rounded-full text-sm font-medium transition-colors ${
              active === tab.key
                ? "bg-ink text-canvas"
                : "bg-surface text-ink-2 border border-line/[0.08] hover:text-ink hover:border-line/[0.14]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShown((s) => s + PAGE_SIZE)}
            className="h-10 px-5 bg-surface border border-line/[0.14] rounded-[10px] text-sm font-medium text-ink hover:bg-sunken transition-colors active:scale-[0.97]"
          >
            Load more
          </button>
        </div>
      )}

      {visible.length === 0 && (
        <p className="text-center text-ink-3 py-12">
          No posts in this category yet.
        </p>
      )}
    </>
  );
}
