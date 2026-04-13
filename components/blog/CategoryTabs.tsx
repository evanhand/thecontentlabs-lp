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
      <div className="flex flex-wrap gap-2 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActive(tab.key);
              setShown(PAGE_SIZE);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              active === tab.key
                ? "bg-content-coral text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:border-content-coral/30"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShown((s) => s + PAGE_SIZE)}
            className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-content-coral/30 hover:text-content-coral transition-colors"
          >
            Load More
          </button>
        </div>
      )}

      {visible.length === 0 && (
        <p className="text-center text-slate-500 py-12">
          No posts in this category yet.
        </p>
      )}
    </>
  );
}
