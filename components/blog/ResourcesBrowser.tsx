"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { PostMeta } from "@/lib/blog";
import { BlogCard } from "./BlogCard";

const TABS = [
  { key: "all", label: "All" },
  { key: "blog", label: "Data studies" },
  { key: "guide", label: "Guides" },
  { key: "comparison", label: "Comparisons" },
  { key: "niche", label: "Niche guides" },
] as const;

const PAGE_SIZE = 12;

type EnrichedPost = PostMeta & { imageUrl: string | null; thumbnailUrl: string | null };

export function ResourcesBrowser({ posts }: { posts: EnrichedPost[] }) {
  const [active, setActive] = useState<string>("all");
  const [shown, setShown] = useState(PAGE_SIZE);
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: posts.length };
    for (const p of posts) c[p.category] = (c[p.category] || 0) + 1;
    return c;
  }, [posts]);

  const filtered = useMemo(() => {
    const byTab =
      active === "all" ? posts : posts.filter((p) => p.category === active);
    const q = query.trim().toLowerCase();
    if (!q) return byTab;
    return byTab.filter((p) => {
      const hay = `${p.title} ${p.description} ${(p.tags || []).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [posts, active, query]);

  const visible = filtered.slice(0, shown);
  const hasMore = shown < filtered.length;

  return (
    <div id="all-resources">
      {/* Filter rail */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
        {/* Search */}
        <div className="relative lg:w-[340px] flex-shrink-0">
          <label htmlFor="resources-search" className="sr-only">
            Search resources
          </label>
          <Search
            aria-hidden
            className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none"
          />
          <input
            id="resources-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShown(PAGE_SIZE);
            }}
            placeholder="Search studies and guides..."
            className="w-full h-11 pl-10 pr-9 bg-white border border-slate-200 rounded-full text-sm text-slate-800 placeholder:text-slate-400 placeholder:font-mono placeholder:text-[13px] focus:outline-none focus:ring-2 focus:ring-content-coral/40 focus:border-content-coral/40 transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full inline-flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Filter resources"
          className="flex flex-wrap gap-2 -mx-1 px-1 overflow-x-auto"
        >
          {TABS.map((tab) => {
            const isActive = active === tab.key;
            const count = counts[tab.key] ?? 0;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActive(tab.key);
                  setShown(PAGE_SIZE);
                }}
                className={`group inline-flex items-center gap-2 h-11 px-4 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-content-coral/40 focus-visible:ring-offset-1 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono tabular-nums tracking-wider px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                  }`}
                >
                  {count.toString().padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results meta */}
      {(query || active !== "all") && (
        <p className="mb-5 text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500">
          {filtered.length} result{filtered.length === 1 ? "" : "s"}
          {query && (
            <span className="text-slate-400">
              {" "}for &ldquo;{query}&rdquo;
            </span>
          )}
        </p>
      )}

      {/* Bento grid: first card spans 2 cols on desktop */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((post, i) => {
            const isWide = i === 0 && active === "all" && !query;
            if (isWide) {
              return (
                <div key={post.slug} className="sm:col-span-2 lg:col-span-3">
                  <BlogCard post={post} variant="wide" thumbnailUrl={post.thumbnailUrl} />
                </div>
              );
            }
            return (
              <BlogCard
                key={post.slug}
                post={post}
                variant="default"
                thumbnailUrl={post.thumbnailUrl}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-slate-300 bg-white">
          <p className="font-heading text-xl text-slate-900 mb-2">
            No resources match that yet
          </p>
          <p className="text-sm text-slate-500 mb-4">
            Try a different search or switch tabs.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActive("all");
            }}
            className="inline-flex items-center text-sm font-semibold text-content-coral hover:underline"
          >
            Reset filters
          </button>
        </div>
      )}

      {hasMore && (
        <div className="text-center mt-10">
          <button
            type="button"
            onClick={() => setShown((s) => s + PAGE_SIZE)}
            className="inline-flex items-center h-11 px-6 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:border-content-coral/40 hover:text-content-coral transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-content-coral/40"
          >
            Load more
            <span className="ml-2 text-[10px] font-mono text-slate-400 tracking-wider">
              {shown} / {filtered.length}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
