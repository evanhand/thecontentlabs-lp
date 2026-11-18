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
    <div id="all-resources" className="scroll-mt-28">
      {/* Filter rail */}
      <div className="mb-6 sm:mb-8 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
        <div
          role="tablist"
          aria-label="Filter resources"
          className="flex flex-wrap gap-2 flex-1"
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
                className={`inline-flex items-center gap-2 h-9 px-4 rounded-full text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-1 ${
                  isActive
                    ? "bg-ink text-canvas"
                    : "bg-surface text-ink-2 border border-line/[0.08] hover:text-ink hover:border-line/[0.14]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-xs tabular-nums ${isActive ? "text-canvas/70" : "text-ink-3"}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative lg:w-[300px] flex-shrink-0">
          <label htmlFor="resources-search" className="sr-only">
            Search resources
          </label>
          <Search
            aria-hidden
            className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-3 pointer-events-none"
          />
          <input
            id="resources-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShown(PAGE_SIZE);
            }}
            placeholder="Search studies and guides"
            className="w-full h-10 pl-10 pr-9 bg-surface border border-line/[0.14] rounded-[10px] text-sm text-ink placeholder:text-ink-3 focus:outline-none focus:ring-2 focus:ring-ink/10 focus:border-line/[0.24] transition-colors"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full inline-flex items-center justify-center text-ink-3 hover:text-ink hover:bg-sunken transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Results meta */}
      {(query || active !== "all") && (
        <p className="mb-5 text-meta text-ink-3">
          {filtered.length} result{filtered.length === 1 ? "" : "s"}
          {query && <> for &ldquo;{query}&rdquo;</>}
        </p>
      )}

      {visible.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              variant="default"
              thumbnailUrl={post.thumbnailUrl}
            />
          ))}
        </div>
      ) : (
        <div className="lab-card text-center py-14 px-5">
          <p className="font-heading text-section text-ink mb-1">
            No resources match that yet
          </p>
          <p className="text-body text-ink-3 mb-4">
            Try a different search or switch tabs.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActive("all");
            }}
            className="inline-flex items-center h-9 px-4 rounded-[10px] border border-line/[0.14] bg-surface text-sm font-medium text-ink hover:bg-sunken transition-colors"
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
            className="inline-flex items-center h-10 px-5 bg-surface border border-line/[0.14] rounded-[10px] text-sm font-medium text-ink hover:bg-sunken transition-colors active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
          >
            Load more
            <span className="ml-2 text-xs tabular-nums text-ink-3">
              {shown} / {filtered.length}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
