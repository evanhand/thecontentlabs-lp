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
  heroImage?: string;
  faqs?: { q: string; a: string }[];
  slug: string;
  readingTime: string;
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
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
    heroImage: data.heroImage,
    faqs: data.faqs,
    slug,
    readingTime: rt.text,
  };
}

// Existing articles that haven't been migrated to MDX yet.
// These still live as page.tsx files under /app/blog/[name]/
// but we list them here so they appear on the blog index.
const LEGACY_POSTS: PostMeta[] = [
  { title: "The Content Labs vs ChatGPT", description: "Generic AI vs data-driven strategy. See why ChatGPT falls short for content planning.", category: "comparison", date: "2026-03-12", tags: ["comparison", "chatgpt"], slug: "content-labs-vs-chatgpt", readingTime: "8 min read" },
  { title: "The Content Labs vs Later", description: "Strategy vs scheduling. Why you need to know what to post before you schedule it.", category: "comparison", date: "2026-03-12", tags: ["comparison", "later"], slug: "content-labs-vs-later", readingTime: "7 min read" },
  { title: "The Content Labs vs Jasper", description: "Creator strategy vs AI writing. Different tools for different needs.", category: "comparison", date: "2026-03-12", tags: ["comparison", "jasper"], slug: "content-labs-vs-jasper", readingTime: "7 min read" },
  { title: "Best AI Content Strategy Tools (2026)", description: "Side-by-side comparison of the top 6 AI tools for content creators.", category: "comparison", date: "2026-03-12", tags: ["comparison", "tools"], slug: "best-ai-content-strategy-tools", readingTime: "10 min read" },
  { title: "What Is AI Content Strategy?", description: "Definition, benefits, and how AI-powered strategy works for creators.", category: "guide", date: "2026-03-12", tags: ["guide", "ai", "content-strategy"], slug: "what-is-ai-content-strategy", readingTime: "9 min read" },
  { title: "How to Build a TikTok Content Strategy", description: "7-step framework based on data from 10,000+ analyzed videos.", category: "guide", date: "2026-03-12", tags: ["guide", "tiktok"], slug: "tiktok-content-strategy-guide", readingTime: "10 min read" },
  { title: "How to Create a Content Calendar", description: "Step-by-step guide with templates and AI automation tips.", category: "guide", date: "2026-03-12", tags: ["guide", "content-calendar"], slug: "how-to-create-content-calendar", readingTime: "8 min read" },
  { title: "AI Content Strategy for Fitness", description: "Content pillars, hooks, and strategy tips for fitness creators.", category: "niche", date: "2026-03-12", tags: ["niche", "fitness"], slug: "ai-content-strategy-fitness", readingTime: "7 min read" },
  { title: "AI Content Strategy for Real Estate", description: "Data-driven content plans for real estate agents and brokers.", category: "niche", date: "2026-03-12", tags: ["niche", "real-estate"], slug: "ai-content-strategy-real-estate", readingTime: "7 min read" },
  { title: "AI Content Strategy for Finance", description: "How finance creators can stand out with data-informed content.", category: "niche", date: "2026-03-12", tags: ["niche", "finance"], slug: "ai-content-strategy-finance", readingTime: "7 min read" },
  { title: "AI Content Strategy for Cooking & Food", description: "Hook patterns and content pillars for food creators.", category: "niche", date: "2026-03-12", tags: ["niche", "cooking"], slug: "ai-content-strategy-cooking", readingTime: "7 min read" },
  { title: "AI Content Strategy for Coaching", description: "Turn content into clients with a strategic approach.", category: "niche", date: "2026-03-12", tags: ["niche", "coaching"], slug: "ai-content-strategy-coaching", readingTime: "7 min read" },
  { title: "AI Content Strategy for E-commerce", description: "Content strategy for DTC brands and e-commerce creators.", category: "niche", date: "2026-03-12", tags: ["niche", "ecommerce"], slug: "ai-content-strategy-ecommerce", readingTime: "7 min read" },
];

export function getAllPosts(): PostMeta[] {
  const mdxPosts = getAllSlugs().map(getPostMeta);
  return [...mdxPosts, ...LEGACY_POSTS].sort((a, b) =>
    a.date > b.date ? -1 : 1
  );
}

export function getPostsByCategory(category: PostMeta["category"]): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}
