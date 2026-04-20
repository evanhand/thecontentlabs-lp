import fs from "node:fs";
import path from "node:path";

const DIR = path.resolve("content/blog");

const ctaByFile = {
  "ai-content-strategy-coaching.mdx": "Build your coaching content strategy with AI",
  "ai-content-strategy-cooking.mdx": "Build your cooking content strategy with AI",
  "ai-content-strategy-ecommerce.mdx": "Build your ecommerce content strategy with AI",
  "ai-content-strategy-finance.mdx": "Build your finance content strategy with AI",
  "ai-content-strategy-fitness.mdx": "Build your fitness content strategy with AI",
  "ai-content-strategy-real-estate.mdx": "Build your real estate content strategy with AI",
  "benlikessports-content-strategy.mdx": "Build a sports content engine like this",
  "best-ai-content-strategy-tools.mdx": "Try The Content Labs free",
  "best-emotional-triggers-for-viral-content.mdx": "Find the emotional triggers that work for your niche",
  "best-time-to-post-on-tiktok.mdx": "Find your ideal posting schedule",
  "content-labs-vs-chatgpt.mdx": "Try The Content Labs free",
  "content-labs-vs-jasper.mdx": "Try The Content Labs free",
  "content-labs-vs-later.mdx": "Try The Content Labs free",
  "ev-hand-sports-content-strategy.mdx": "Build a sports content engine like @ev_handd",
  "ev-handd-full-strategy-breakdown.mdx": "Build a sports content engine like @ev_handd",
  "frankmichaelsmith-instagram-strategy.mdx": "Analyze your Instagram strategy with AI",
  "how-long-should-tiktok-video-be.mdx": "Analyze your TikTok runtime with AI",
  "how-to-create-content-calendar.mdx": "Generate your 30-day content calendar",
  "how-to-escape-tiktok-300-view-jail.mdx": "Escape 300-view jail with AI analysis",
  "manny-watkins-basketball-coaching-strategy.mdx": "Build a coaching content engine like this",
  "saves-vs-shares-vs-reach.mdx": "See which metric your content drives",
  "small-accounts-more-reach.mdx": "Get more reach with a tighter content strategy",
  "tiktok-content-strategy-guide.mdx": "Build your TikTok content strategy with AI",
  "tiktok-hooks-that-work.mdx": "Find your winning hooks with AI analysis",
  "tiktok-vs-instagram-reels-2026.mdx": "Optimize your strategy for both platforms",
  "what-is-ai-content-strategy.mdx": "Try AI content strategy free",
  "wunderpar-golf-brand-building-strategy.mdx": "Build a brand content engine like Wunderpar",
};

let updated = 0;
let skipped = 0;

for (const [file, ctaText] of Object.entries(ctaByFile)) {
  const full = path.join(DIR, file);
  if (!fs.existsSync(full)) {
    console.warn("missing:", file);
    continue;
  }
  const raw = fs.readFileSync(full, "utf8");

  const midCTA = `\n<CTA text="${ctaText}" />\n`;
  if (raw.includes(midCTA.trim())) {
    console.log("already has mid CTA:", file);
    skipped++;
    continue;
  }

  // find the 3rd occurrence of a line that is exactly '---'
  // (open frontmatter, close frontmatter, first body divider)
  const lines = raw.split(/\r?\n/);
  let seen = 0;
  let insertAfter = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === "---") {
      seen++;
      if (seen === 3) {
        insertAfter = i;
        break;
      }
    }
  }
  if (insertAfter === -1) {
    console.warn("no body divider found:", file);
    skipped++;
    continue;
  }

  lines.splice(insertAfter + 1, 0, "", `<CTA text="${ctaText}" />`);
  const out = lines.join("\n");
  fs.writeFileSync(full, out, "utf8");
  console.log("updated:", file);
  updated++;
}

console.log(`\ndone. updated=${updated} skipped=${skipped}`);
