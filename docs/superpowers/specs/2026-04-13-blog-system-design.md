# Blog System Design — MDX-Powered SEO Blog

**Date:** 2026-04-13
**Status:** Draft
**Goal:** Replace hardcoded blog articles with a scalable MDX-based blog system supporting a blog-a-day cadence, SEO, AI SEO, and programmatic SEO.

---

## 1. Architecture Overview

All blog content moves to MDX files in a `/content/blog/` directory. A single dynamic route (`/app/blog/[slug]/page.tsx`) renders every post at build time via `generateStaticParams`. The blog index (`/app/blog/page.tsx`) becomes a dynamic listing with category tabs and pagination. Static export (`output: "export"`) is preserved — every page is pre-rendered HTML.

### Key Libraries
- `@next/mdx` + `@mdx-js/loader` + `@mdx-js/react` — first-party MDX compilation via Next.js webpack/turbopack loader
- `gray-matter` — parse YAML frontmatter from MDX files (used only in `lib/blog.ts` for index/metadata gathering, not for rendering)
- `reading-time` — calculate read time from content
- `@tailwindcss/typography` — prose styling for MDX content via `prose` classes

### MDX Compilation Strategy
MDX files are compiled by `@next/mdx` through the build pipeline. Individual post pages use dynamic imports (`await import(\`@/content/blog/${slug}.mdx\`)`) — the officially documented Next.js 16 pattern for dynamic MDX routes with static export.

---

## 2. Content Model

### File Location
```
/content/blog/
  what-is-ai-content-strategy.mdx
  content-labs-vs-chatgpt.mdx
  ai-content-strategy-fitness.mdx
  5-tiktok-hook-formulas.mdx
  ...
```

### Frontmatter Schema
Each MDX file uses YAML frontmatter (parsed by `gray-matter` in `lib/blog.ts` for index pages and metadata generation):

```yaml
---
title: "What Is AI Content Strategy?"
description: "AI content strategy uses artificial intelligence to analyze..."
category: "guide"                    # guide | comparison | niche | blog
date: "2026-03-12"                   # publish date (ISO 8601)
updatedDate: "2026-04-10"            # optional, signals freshness to Google
tags: ["ai", "content-strategy"]     # for related posts + future filtering
ogImage: "/og/what-is-ai-strategy.png"  # optional, defaults to site OG
faqs:                                # optional, generates FAQPage schema
  - q: "What is AI content strategy?"
    a: "AI content strategy uses..."
---
```

### Categories
| Category | Purpose | Example |
|----------|---------|---------|
| `guide` | Tactical how-to content | "How to Create a Content Calendar" |
| `comparison` | vs pages, tool roundups | "Content Labs vs ChatGPT" |
| `niche` | "AI Content Strategy for [X]" | "AI Content Strategy for Fitness" |
| `blog` | Daily posts: tips, data insights, listicles | "5 TikTok Hook Formulas That Get Views" |

---

## 3. Content Utilities — `lib/blog.ts`

A single module that handles all blog data operations. This module uses `gray-matter` to parse frontmatter from `.mdx` files for index/metadata purposes only — the actual MDX rendering is handled by `@next/mdx` via dynamic imports.

```typescript
// Core functions:
getAllPosts()        // Returns all posts sorted by date desc, with frontmatter + slug + readingTime
getPostsByCategory(category)  // Filtered list for tabs
getAllTags()          // Unique tag list for future tag pages
getAllSlugs()         // For generateStaticParams
getPostMeta(slug)    // Single post frontmatter for generateMetadata
```

**How it works:**
- Reads all `.mdx` files from `/content/blog/` using `fs.readFileSync`
- Parses frontmatter with `gray-matter` (metadata extraction only)
- Calculates reading time with `reading-time`
- Sorts by `date` descending

---

## 4. MDX Components

Custom React components available inside MDX files for rich content. Defined in `/components/blog/MDXComponents.tsx` and registered globally via the root `mdx-components.tsx` file.

### Components to Build
| Component | Purpose | Used In |
|-----------|---------|---------|
| `<ComparisonTable>` | Feature comparison grid with check/X icons | Comparison posts |
| `<ProConList>` | Pros and cons side-by-side | Comparison posts |
| `<ContentPillars>` | Pillar cards with examples | Niche guides |
| `<HookExamples>` | Styled hook quote cards | Niche guides, blog posts |
| `<FAQ>` | Accordion FAQ (also generates schema) | All post types |
| `<CTA>` | Standard bottom CTA block | All post types |
| `<StepProcess>` | Numbered step-by-step section | Guides |
| `<StatCard>` | Data highlight card | Data-driven posts |
| `<Callout>` | Tip/warning/info callout box | All post types |

### Usage in MDX
```mdx
---
title: "Content Labs vs ChatGPT"
category: "comparison"
---

# Why creators switch from ChatGPT

<ComparisonTable
  features={[
    { name: "Personalized strategy", us: true, them: false },
    { name: "Competitor analysis", us: true, them: false },
  ]}
/>

<CTA text="Get Your 30-Day Plan" />
```

### Root `mdx-components.tsx`
Required by Next.js App Router. Uses `@tailwindcss/typography` prose classes for base styling, with custom overrides where needed:

```tsx
import type { MDXComponents } from 'mdx/types';
import { ComparisonTable, ProConList, ... } from '@/components/blog/MDXComponents';

export function useMDXComponents(): MDXComponents {
  return {
    // Custom blog components
    ComparisonTable,
    ProConList,
    ContentPillars,
    HookExamples,
    FAQ,
    CTA,
    StepProcess,
    StatCard,
    Callout,
    // HTML element overrides (supplement @tailwindcss/typography)
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith('http');
      return <a href={href} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>{children}</a>;
    },
  };
}
```

The article wrapper uses `prose` classes for typography, so most HTML elements (h1-h6, p, ul, ol, blockquote, table, etc.) are styled automatically.

---

## 5. Routes

### `/app/blog/[slug]/page.tsx` — Post Page

**`generateStaticParams`**: calls `getAllSlugs()` to generate all post pages at build time.

**`dynamicParams = false`**: ensures unknown slugs return 404 (required for static export correctness).

**MDX rendering**: uses dynamic import per the Next.js 16 documented pattern:
```tsx
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { default: Post } = await import(`@/content/blog/${slug}.mdx`);
  const meta = getPostMeta(slug);
  // ... render Post component with layout wrapper
}
```

**`generateMetadata`**: reads frontmatter via `getPostMeta(slug)` to produce:
- `<title>` — post title
- `<meta name="description">` — post description
- `<link rel="canonical">` — `https://thecontentlabs.app/blog/{slug}`
- Open Graph tags (title, description, url, image, type=article)
- Twitter card tags
- `article:published_time`, `article:modified_time`

**Page layout:**
1. `<PublicNav />`
2. Breadcrumbs: Home > Resources > [Post Title]
3. Article header: category badge, title, date, reading time, updated date
4. Article body: rendered MDX content wrapped in `prose` classes
5. Structured data: Article schema, FAQPage schema (if faqs in frontmatter), BreadcrumbList schema
6. Related posts: 3-6 posts from same category + shared tags
7. Bottom CTA section
8. `<Footer />`

### `/app/blog/page.tsx` — Blog Index

**Dynamic listing** that reads all post frontmatter at build time.

**Layout:**
1. `<PublicNav />`
2. Hero: "Resources for Creators" heading + description
3. Category tabs: All | Guides | Comparisons | Niche Guides | Blog
4. Post grid: cards sorted by date desc, 12 per page
5. Pagination: "Load More" button
6. Bottom CTA
7. `<Footer />`

**Category tabs:**
- Client-side filtering (no page reload), no query params needed
- URL stays clean at `/blog` — categories are client-side state, not separate routes
- "All" tab shows everything, other tabs filter by category

**Pagination approach:**
- Show 12 posts initially, "Load More" button appends the next 12 (client-side, all data already in the page since it's static)
- All post metadata is embedded in the page at build time (just frontmatter, not content)
- **Scaling note:** At blog-a-day cadence, this embeds ~365 post metadata entries per year. If page weight becomes a concern around the 200-300 post mark, switch to true static paginated routes via `generateStaticParams` (`/blog/page/2`, `/blog/page/3`, etc.) or a lightweight JSON index loaded client-side.

### Existing routes removed
All 13 individual `page.tsx` files under `/app/blog/*` are deleted. Their content migrates to `/content/blog/*.mdx`. The `[slug]` catch-all route serves them at the same URLs — **no URL changes, no redirects needed**.

---

## 6. SEO Implementation

### Structured Data (per post)
Every post page includes:

**Article schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "description": "...",
  "url": "https://thecontentlabs.app/blog/...",
  "image": "https://thecontentlabs.app/og-image.png",
  "datePublished": "2026-03-12",
  "dateModified": "2026-04-10",
  "author": { "@type": "Organization", "name": "The Content Labs", "url": "https://thecontentlabs.app" },
  "publisher": {
    "@type": "Organization",
    "name": "The Content Labs",
    "url": "https://thecontentlabs.app",
    "logo": { "@type": "ImageObject", "url": "https://thecontentlabs.app/logo.png" }
  },
  "mainEntityOfPage": "https://thecontentlabs.app/blog/..."
}
```

**FAQPage schema** (when `faqs` present in frontmatter):
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{ "@type": "Question", "name": "...", "acceptedAnswer": { "@type": "Answer", "text": "..." } }]
}
```

**BreadcrumbList schema** (on every page — already exists via `BlogComponents.tsx`).

### Sitemap
Add a build-time script (`scripts/generate-sitemap.ts`) that:
1. Reads all MDX files from `/content/blog/`
2. Reads all other static routes from `/app/`
3. Generates `/public/sitemap.xml` with proper `<lastmod>` dates
4. Runs **before** `next build` as a pre-build step

Build script updated in `package.json`:
```json
"build": "tsx scripts/generate-sitemap.ts && next build"
```

### RSS Feed
Add a build-time script (`scripts/generate-rss.ts`) that:
1. Reads all MDX frontmatter from `/content/blog/`
2. Generates `/public/rss.xml` (Atom feed)
3. Runs alongside the sitemap script in the pre-build step

For a blog-a-day cadence, RSS is cheap to implement and provides SEO value via feed aggregators and Google News indexing.

Updated build script:
```json
"build": "tsx scripts/generate-sitemap.ts && tsx scripts/generate-rss.ts && next build"
```

### Internal Linking
- Related posts section at bottom of every article (category + tag based)
- Blog index links to all posts
- Footer "Resources" section stays, linking to featured posts
- MDX content can link between posts naturally: `[content calendar guide](/blog/how-to-create-content-calendar)`

### AI SEO
- Clean semantic HTML (proper heading hierarchy, structured data)
- Descriptive alt text on any images
- Long-form content with clear section structure
- FAQ sections with schema markup
- Consistent author/publisher attribution

---

## 7. Migration Plan — Existing 13 Articles

Each existing `page.tsx` becomes an `.mdx` file. The approach varies by type:

### Niche guides (6 articles)
Currently use `NicheStrategyTemplate` with a config object. Migration:
- Move the prose content into MDX body
- Use `<ContentPillars>`, `<HookExamples>`, `<FAQ>`, `<CTA>` components in MDX
- Frontmatter inherits title, description, date from the existing metadata
- `NicheStrategyTemplate.tsx` is deleted after migration

### Comparison pages (4 articles)
Currently have custom JSX with tables, check/X grids. Migration:
- Move prose into MDX body
- Use `<ComparisonTable>`, `<ProConList>` components for structured content
- Preserve all existing structured data via frontmatter `faqs`

### Guide pages (3 articles)
Currently custom JSX. Migration:
- Most straightforward — these are primarily prose with some structured sections
- Use `<StepProcess>`, `<Callout>`, `<FAQ>` components where needed

### URL Preservation
All URLs remain identical (`/blog/{slug}`). No redirects needed. Google sees no change.

---

## 8. File Changes Summary

### New Files
```
/content/blog/*.mdx                          — 13 migrated + new daily posts
/lib/blog.ts                                 — content utilities (frontmatter parsing)
/components/blog/MDXComponents.tsx           — custom MDX components
/components/blog/BlogCard.tsx                — post card for index grid
/components/blog/CategoryTabs.tsx            — tab filter UI
/mdx-components.tsx                          — required root file for Next.js
/scripts/generate-sitemap.ts                 — build-time sitemap generator
/scripts/generate-rss.ts                     — build-time RSS feed generator
```

### Modified Files
```
/app/blog/page.tsx                           — rewrite: dynamic listing with tabs
/app/blog/[slug]/page.tsx                    — new: dynamic post route
/next.config.ts                              — add pageExtensions + createMDX wrapper
/package.json                                — add @next/mdx, @mdx-js/loader, @mdx-js/react, @types/mdx, gray-matter, reading-time, @tailwindcss/typography, tsx (devDep)
/components/blog/BlogComponents.tsx          — keep Breadcrumbs + RelatedResources, remove hardcoded RELATED maps
/components/landing/Footer.tsx               — update Resources links (dynamic or keep curated)
```

### Deleted Files
```
/app/blog/ai-content-strategy-coaching/page.tsx
/app/blog/ai-content-strategy-cooking/page.tsx
/app/blog/ai-content-strategy-ecommerce/page.tsx
/app/blog/ai-content-strategy-finance/page.tsx
/app/blog/ai-content-strategy-fitness/page.tsx
/app/blog/ai-content-strategy-real-estate/page.tsx
/app/blog/best-ai-content-strategy-tools/page.tsx
/app/blog/content-labs-vs-chatgpt/page.tsx
/app/blog/content-labs-vs-jasper/page.tsx
/app/blog/content-labs-vs-later/page.tsx
/app/blog/how-to-create-content-calendar/page.tsx
/app/blog/tiktok-content-strategy-guide/page.tsx
/app/blog/what-is-ai-content-strategy/page.tsx
/components/templates/NicheStrategyTemplate.tsx
```

---

## 9. Authoring Workflow (Daily Posts)

1. User asks Claude to write a blog post on topic X
2. Claude creates `/content/blog/{slug}.mdx` with frontmatter + content
3. Claude commits and pushes
4. Netlify auto-rebuilds (~1-2 min)
5. Post is live at `thecontentlabs.app/blog/{slug}`

No CMS, no admin UI, no manual steps beyond "write and commit."

---

## 10. Out of Scope (for now)

- Tag pages (`/blog/tag/[tag]`) — can be added later when there are enough posts
- Search — not needed until 100+ posts
- Author pages — single-author site for now
- Comments — not planned
- Image optimization pipeline — using unoptimized images per current config
