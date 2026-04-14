import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://thecontentlabs.app";
const PUBLIC_DIR = path.join(process.cwd(), "public");
const APP_DIR = path.join(process.cwd(), "app");
const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function getStaticRoutes(): string[] {
  const routes: string[] = [];

  function walk(dir: string, prefix: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      // Skip dynamic routes, components, and special dirs
      if (entry.name.startsWith("[") || entry.name.startsWith("_")) continue;

      if (entry.isDirectory()) {
        // Check if this directory has a page file
        const hasPage = fs.readdirSync(path.join(dir, entry.name)).some(
          (f) => f.startsWith("page.")
        );
        if (hasPage) {
          routes.push(`${prefix}/${entry.name}`);
        }
        walk(path.join(dir, entry.name), `${prefix}/${entry.name}`);
      }
    }
  }

  // Root page
  routes.push("");
  walk(APP_DIR, "");

  return routes;
}

function getBlogRoutes(): { url: string; lastmod: string }[] {
  const routes: { url: string; lastmod: string }[] = [];

  // MDX blog posts
  if (fs.existsSync(CONTENT_DIR)) {
    const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
      const { data } = matter(raw);
      const slug = file.replace(/\.mdx$/, "");
      routes.push({
        url: `/blog/${slug}`,
        lastmod: data.updatedDate || data.date || new Date().toISOString().split("T")[0],
      });
    }
  }

  // Legacy blog posts (page.tsx files under /app/blog/*)
  const blogDir = path.join(APP_DIR, "blog");
  if (fs.existsSync(blogDir)) {
    const entries = fs.readdirSync(blogDir, { withFileTypes: true });
    for (const entry of entries) {
      if (
        entry.isDirectory() &&
        !entry.name.startsWith("[") &&
        fs.existsSync(path.join(blogDir, entry.name, "page.tsx"))
      ) {
        routes.push({
          url: `/blog/${entry.name}`,
          lastmod: "2026-03-12",
        });
      }
    }
  }

  return routes;
}

function generateSitemap() {
  const today = new Date().toISOString().split("T")[0];
  const staticRoutes = getStaticRoutes();
  const blogRoutes = getBlogRoutes();

  // Deduplicate (blog index appears in both static and blog)
  const allUrls = new Map<string, string>();

  for (const route of staticRoutes) {
    allUrls.set(route, today);
  }

  for (const { url, lastmod } of blogRoutes) {
    allUrls.set(url, lastmod);
  }

  const entries = Array.from(allUrls.entries())
    .map(
      ([url, lastmod]) => `  <url>
    <loc>${SITE_URL}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${url.startsWith("/blog/") ? "weekly" : "monthly"}</changefreq>
    <priority>${url === "" ? "1.0" : url === "/blog" ? "0.8" : "0.7"}</priority>
  </url>`
    )
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), sitemap);
  console.log(
    `Sitemap generated: ${allUrls.size} URLs written to public/sitemap.xml`
  );
}

generateSitemap();
