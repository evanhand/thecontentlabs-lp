# MDX Blog System Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace hardcoded blog articles with a scalable MDX blog system and publish the first data-driven blog post about @ev_handd sports content.

**Architecture:** MDX files in `/content/blog/` compiled by `@next/mdx` via dynamic imports. Single `[slug]` route with `generateStaticParams`. Blog index with client-side category tabs. Static export preserved.

**Tech Stack:** Next.js 16, @next/mdx, gray-matter, reading-time, @tailwindcss/typography, Tailwind CSS

**Spec:** `docs/superpowers/specs/2026-04-13-blog-system-design.md`

---

## Chunk 1: MDX Infrastructure

### Task 1: Configure Next.js for MDX

**Files:**
- Modify: `next.config.ts`
- Create: `mdx-components.tsx`

- [ ] **Step 1: Update next.config.ts for MDX support**

```typescript
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
```

- [ ] **Step 2: Create root mdx-components.tsx**

Create `mdx-components.tsx` at project root. This is required by Next.js App Router for MDX. Start minimal — just pass through defaults. Custom components added in Task 4.

```tsx
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(): MDXComponents {
  return {};
}
```

- [ ] **Step 3: Verify dev server still starts**

Run: `npm run dev`
Expected: No errors, site loads normally

- [ ] **Step 4: Commit**

```bash
git add next.config.ts mdx-components.tsx
git commit -m "feat: configure next.js for mdx support"
```

### Task 2: Create content utilities — `lib/blog.ts`

**Files:**
- Create: `lib/blog.ts`

- [ ] **Step 1: Create lib/blog.ts**

This module reads MDX frontmatter using `gray-matter` for index pages and metadata. It does NOT compile MDX — that's handled by `@next/mdx` via dynamic imports.

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  title: string;
  description: string;
  category: "guide" | "comparison" | "niche" | "blog";
  date: string;
  updatedDate?: string;
  tags: string[];
  ogImage?: string;
  faqs?: { q: string; a: string }[];
  slug: string;
  readingTime: string;
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostMeta(slug: string): PostMeta {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    title: data.title,
    description: data.description,
    category: data.category,
    date: data.date,
    updatedDate: data.updatedDate,
    tags: data.tags || [],
    ogImage: data.ogImage,
    faqs: data.faqs,
    slug,
    readingTime: rt.text,
  };
}

export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map(getPostMeta)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostsByCategory(category: PostMeta["category"]): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}
```

- [ ] **Step 2: Create content/blog/ directory**

```bash
mkdir -p content/blog
```

- [ ] **Step 3: Commit**

```bash
git add lib/blog.ts
git commit -m "feat: add blog content utilities for frontmatter parsing"
```

### Task 3: Create dynamic [slug] route

**Files:**
- Create: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Create the dynamic blog post page**

```tsx
import { Metadata } from "next";
import { getAllSlugs, getPostMeta } from "@/lib/blog";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/blog/BlogComponents";

const CATEGORY_LABELS: Record<string, string> = {
  guide: "Guide",
  comparison: "Comparison",
  niche: "Niche Guide",
  blog: "Blog",
};

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

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      type: "article",
      images: [meta.ogImage || "https://thecontentlabs.app/og-image.png"],
      publishedTime: meta.date,
      modifiedTime: meta.updatedDate || meta.date,
    },
    twitter: {
      title: meta.title,
      description: meta.description,
      images: [meta.ogImage || "https://thecontentlabs.app/og-image.png"],
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    url: `https://thecontentlabs.app/blog/${slug}`,
    image: meta.ogImage || "https://thecontentlabs.app/og-image.png",
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
    <div className="min-h-screen bg-slate-50">
      <PublicNav />
      <Breadcrumbs items={[{ label: meta.title }]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-4">
            <a
              href="/blog"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Resources
            </a>
            <div>
              <p className="text-sm text-content-coral font-medium mb-1">
                {CATEGORY_LABELS[meta.category] || "Blog"}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {meta.title}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {new Date(meta.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {meta.updatedDate &&
                  ` · Updated ${new Date(meta.updatedDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`}
                {" · "}
                {meta.readingTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-10 prose prose-slate max-w-none prose-headings:scroll-mt-20 prose-a:text-content-coral prose-a:no-underline hover:prose-a:underline">
          <Post />
        </article>
      </div>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/blog/\[slug\]/page.tsx
git commit -m "feat: add dynamic mdx blog post route"
```

### Task 4: Update mdx-components.tsx with custom components and prose overrides

**Files:**
- Modify: `mdx-components.tsx`
- Create: `components/blog/MDXComponents.tsx`

- [ ] **Step 1: Create MDX custom components**

Create `components/blog/MDXComponents.tsx` with the reusable blog components:

```tsx
import { ArrowRight, Check, X } from "lucide-react";

/* -- CTA Block -- */
export function CTA({
  text = "Get My 30-Day Content Plan",
  href = "/pricing",
}: {
  text?: string;
  href?: string;
}) {
  return (
    <section className="not-prose bg-gradient-to-br from-content-coral/5 to-content-coral/10 rounded-xl p-8 text-center my-8">
      <a
        href={href}
        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-content-cta-dark to-content-cta rounded-xl font-bold text-white shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {text}
        <ArrowRight className="ml-3 h-5 w-5" />
      </a>
    </section>
  );
}

/* -- Comparison Table -- */
interface ComparisonFeature {
  name: string;
  us: boolean;
  them: boolean;
}

export function ComparisonTable({
  features,
  usLabel = "Content Labs",
  themLabel = "Competitor",
}: {
  features: ComparisonFeature[];
  usLabel?: string;
  themLabel?: string;
}) {
  return (
    <div className="not-prose overflow-x-auto my-8">
      <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-slate-50">
            <th className="text-left px-4 py-3 font-semibold text-slate-900">
              Feature
            </th>
            <th className="text-center px-4 py-3 font-semibold text-content-coral">
              {usLabel}
            </th>
            <th className="text-center px-4 py-3 font-semibold text-slate-500">
              {themLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((f) => (
            <tr key={f.name} className="border-t border-slate-100">
              <td className="px-4 py-3 text-slate-700">{f.name}</td>
              <td className="px-4 py-3 text-center">
                {f.us ? (
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-red-400 mx-auto" />
                )}
              </td>
              <td className="px-4 py-3 text-center">
                {f.them ? (
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-red-400 mx-auto" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -- Callout -- */
export function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "tip" | "warning";
  children: React.ReactNode;
}) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-900",
    tip: "bg-green-50 border-green-200 text-green-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
  };
  return (
    <div
      className={`not-prose rounded-xl border p-4 my-6 text-sm leading-relaxed ${styles[type]}`}
    >
      {children}
    </div>
  );
}

/* -- Stat Card -- */
export function StatCard({
  stat,
  label,
}: {
  stat: string;
  label: string;
}) {
  return (
    <div className="not-prose bg-slate-50 rounded-xl border border-slate-200 p-5 text-center">
      <p className="text-3xl font-bold text-content-coral">{stat}</p>
      <p className="text-sm text-slate-600 mt-1">{label}</p>
    </div>
  );
}

export function StatGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose grid grid-cols-2 sm:grid-cols-3 gap-4 my-8">
      {children}
    </div>
  );
}

/* -- Video Embed -- */
export function VideoEmbed({
  src,
  caption,
  poster,
}: {
  src: string;
  caption?: string;
  poster?: string;
}) {
  return (
    <figure className="not-prose my-8">
      <video
        src={src}
        controls
        playsInline
        preload="metadata"
        poster={poster}
        className="w-full rounded-xl border border-slate-200"
      />
      {caption && (
        <figcaption className="text-sm text-slate-500 text-center mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* -- Instagram Embed (iframe) -- */
export function InstagramEmbed({ url }: { url: string }) {
  return (
    <div className="not-prose my-8 flex justify-center">
      <iframe
        src={`${url}embed/`}
        width="400"
        height="500"
        frameBorder="0"
        scrolling="no"
        allowTransparency
        className="rounded-xl border border-slate-200 max-w-full"
      />
    </div>
  );
}
```

- [ ] **Step 2: Update mdx-components.tsx to register custom components**

```tsx
import type { MDXComponents } from "mdx/types";
import {
  CTA,
  ComparisonTable,
  Callout,
  StatCard,
  StatGrid,
  VideoEmbed,
  InstagramEmbed,
} from "@/components/blog/MDXComponents";

export function useMDXComponents(): MDXComponents {
  return {
    CTA,
    ComparisonTable,
    Callout,
    StatCard,
    StatGrid,
    VideoEmbed,
    InstagramEmbed,
    a: ({
      href,
      children,
      ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
      const isExternal = href?.startsWith("http");
      return (
        <a
          href={href}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...props}
        >
          {children}
        </a>
      );
    },
  };
}
```

- [ ] **Step 3: Commit**

```bash
git add components/blog/MDXComponents.tsx mdx-components.tsx
git commit -m "feat: add custom mdx components for blog posts"
```

### Task 5: Rewrite blog index with category tabs

**Files:**
- Modify: `app/blog/page.tsx`
- Create: `components/blog/BlogCard.tsx`
- Create: `components/blog/CategoryTabs.tsx`

- [ ] **Step 1: Create BlogCard component**

Create `components/blog/BlogCard.tsx`:

```tsx
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
```

- [ ] **Step 2: Create CategoryTabs component**

Create `components/blog/CategoryTabs.tsx`:

```tsx
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
    </>
  );
}
```

- [ ] **Step 3: Rewrite app/blog/page.tsx**

```tsx
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/landing/Footer";
import { CategoryTabs } from "@/components/blog/CategoryTabs";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Resources — The Content Labs | Guides, Comparisons & Strategy Tips",
  description:
    "Free guides, comparisons, and strategy tips for content creators. Learn about AI content strategy, TikTok growth, content calendars, and how The Content Labs compares to other tools.",
  alternates: { canonical: "https://thecontentlabs.app/blog" },
  openGraph: {
    title: "Resources — The Content Labs",
    description:
      "Free guides and comparisons for content creators. AI content strategy, TikTok growth, and more.",
    url: "https://thecontentlabs.app/blog",
    images: ["https://thecontentlabs.app/og-image.png"],
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicNav />

      <div className="bg-white border-b border-slate-200 pt-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Resources for Creators
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Guides, comparisons, and strategy tips to help you grow — whether
            you use The Content Labs or not.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryTabs posts={posts} />

        <section className="mt-16 bg-gradient-to-br from-content-coral/5 to-content-coral/10 rounded-xl p-8 sm:p-10 text-center border border-content-coral/20">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Ready to Put Strategy Into Action?
          </h2>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            47,598+ creators use The Content Labs to turn data into content
            plans. Competitor analysis, 30-day calendars, and full scripts —
            starting at $39/mo.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-content-cta-dark to-content-cta rounded-xl font-bold text-white shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Get My 30-Day Content Plan
            <ArrowRight className="ml-3 h-5 w-5" />
          </a>
        </section>
      </div>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/blog/BlogCard.tsx components/blog/CategoryTabs.tsx app/blog/page.tsx
git commit -m "feat: rewrite blog index with category tabs and dynamic listing"
```

## Chunk 2: First Blog Post + Verification

### Task 6: Write the ev_handd sports case study blog post

**Files:**
- Create: `content/blog/ev-hand-sports-content-strategy.mdx`

- [ ] **Step 1: Create the MDX blog post**

Write `content/blog/ev-hand-sports-content-strategy.mdx` using all the data gathered from Supabase for @ev_handd. The post should:

- Use frontmatter with title, description, category "blog", date, tags
- Include real performance stats from the data (7.8M views on Phillies Karen, 5M on Would You Rather, etc.)
- Reference specific video examples with Instagram embed URLs
- Use `<StatCard>`, `<StatGrid>`, `<Callout>` components
- Include FAQs in frontmatter for schema markup
- Be 1500-2000 words, SEO-optimized for "sports content strategy" keywords
- End with CTA

(Full content written at implementation time — too long for plan)

- [ ] **Step 2: Verify the post renders**

Run: `npm run dev`, navigate to `http://localhost:3001/blog/ev-hand-sports-content-strategy`
Expected: Post renders with proper layout, structured data, category badge, reading time

- [ ] **Step 3: Verify the blog index shows the post**

Navigate to `http://localhost:3001/blog`
Expected: Post appears in "All" and "Blog" tabs

- [ ] **Step 4: Commit**

```bash
git add content/blog/ev-hand-sports-content-strategy.mdx
git commit -m "feat: add ev hand sports content strategy case study"
```

### Task 7: Verify build works with static export

- [ ] **Step 1: Run production build**

Run: `npm run build`
Expected: Build succeeds, generates static HTML for blog index and all blog post pages

- [ ] **Step 2: Commit any fixes**

If build fails, fix issues and commit.

## Chunk 3: Migrate Existing Articles (deferred)

> Migration of the 13 existing `page.tsx` articles to MDX is a separate effort. The new system works alongside the old articles — both `/app/blog/[slug]/page.tsx` (dynamic MDX) and `/app/blog/*/page.tsx` (existing static) routes will coexist until migration is complete. No URLs break.
>
> Each existing article becomes its own migration task in a future plan.
