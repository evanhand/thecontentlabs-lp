import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

const SITE_URL = "https://thecontentlabs.app";

const FEATURED_REPORTS = [
  {
    slug: "300-view-jail",
    title: "How to Escape 300 View Jail (8,500 Videos Analyzed)",
    description:
      "We pulled 8,500 analyzed videos from our dataset. Instagram is 2.5× worse than TikTok. Longer videos escape more. Trust-based content gets stuck.",
    date: "2026-04-17",
  },
  {
    slug: "small-vs-big",
    title: "Small Accounts Get 14× More Reach",
    description:
      "We measured views per follower across 2,537 videos. The algorithm feeds small accounts.",
    date: "2026-04-16",
  },
  {
    slug: "emotional-triggers",
    title: "Which Emotions Actually Go Viral?",
    description:
      "We tagged 1,833 videos by primary emotion and normalized for follower count. Outrage beats inspiration by 9×.",
    date: "2026-04-10",
  },
  {
    slug: "posting-times",
    title: "Does Posting Time Really Matter?",
    description:
      "7,261 videos, normalized for account size. The 'best time to post' advice is mostly wrong.",
    date: "2026-04-05",
  },
];

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateStr: string): string {
  return new Date(dateStr).toUTCString();
}

export async function GET() {
  const posts = getAllPosts();

  const items = [
    ...FEATURED_REPORTS.map((r) => ({
      title: r.title,
      description: r.description,
      url: `${SITE_URL}/reports/${r.slug}`,
      pubDate: toRfc822(r.date),
      category: "Data Report",
    })),
    ...posts.map((p) => ({
      title: p.title,
      description: p.description,
      url: `${SITE_URL}/blog/${p.slug}`,
      pubDate: toRfc822(p.updatedDate || p.date),
      category: p.category,
    })),
  ];

  const itemsXml = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <description>${escapeXml(item.description)}</description>
      <category>${escapeXml(item.category)}</category>
      <pubDate>${item.pubDate}</pubDate>
    </item>`
    )
    .join("\n");

  const now = new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Content Labs — Data-Backed Content Strategy</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Data reports and content strategy guides for creators, built from our analysis of 8,500+ TikToks and Instagram Reels.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
