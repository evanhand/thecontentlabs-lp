/**
 * Build-time OG image generator.
 * Renders branded 1200x630 PNGs for every blog post + data report.
 * Output: public/og/<slug>.png
 *
 * Run via: npm run build  (chained from scripts/build pipeline)
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const OUT_DIR = path.join(process.cwd(), "public", "og");
const FONT_CACHE = path.join(process.cwd(), ".fonts-cache");

const CORAL = "#f4632a";
const CORAL_LIGHT = "#fde1d6";
const SLATE_900 = "#0f172a";
const SLATE_500 = "#64748b";
const SLATE_400 = "#94a3b8";
const SLATE_100 = "#f1f5f9";
const WHITE = "#ffffff";

const CATEGORY_LABELS: Record<string, string> = {
  guide: "Guide",
  comparison: "Comparison",
  niche: "Niche Guide",
  blog: "Blog",
};

interface Job {
  slug: string;
  outFile: string;
  eyebrow: string;
  title: string;
  heroStat?: string;
  heroLabel?: string;
}

// Reports get hardcoded OG images so we control eyebrow + hero
const REPORT_JOBS: Job[] = [
  {
    slug: "300-view-jail",
    outFile: "report-300-view-jail.png",
    eyebrow: "Data Report",
    title: "How to Escape 300 View Jail",
    heroStat: "8,500",
    heroLabel: "Videos analyzed",
  },
  {
    slug: "small-vs-big",
    outFile: "report-small-vs-big.png",
    eyebrow: "Data Report",
    title: "Small Accounts Get 14× More Reach",
    heroStat: "2,537",
    heroLabel: "Videos analyzed",
  },
  {
    slug: "emotional-triggers",
    outFile: "report-emotional-triggers.png",
    eyebrow: "Data Report",
    title: "Which Emotions Actually Go Viral?",
    heroStat: "1,833",
    heroLabel: "Videos analyzed",
  },
  {
    slug: "posting-times",
    outFile: "report-posting-times.png",
    eyebrow: "Data Report",
    title: "Does Posting Time Really Matter?",
    heroStat: "7,261",
    heroLabel: "Videos analyzed",
  },
];

async function getFont(weight: 400 | 700): Promise<ArrayBuffer> {
  if (!fs.existsSync(FONT_CACHE)) fs.mkdirSync(FONT_CACHE, { recursive: true });
  const cachePath = path.join(FONT_CACHE, `dm-sans-${weight}.ttf`);
  if (fs.existsSync(cachePath)) {
    const buf = fs.readFileSync(cachePath);
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  }

  // Resolve TTF URL from Google Fonts CSS API
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=DM+Sans:wght@${weight}&display=swap`,
    { headers: { "User-Agent": "Mozilla/5.0" } }
  ).then((r) => r.text());

  const url = css.match(/url\((https:\/\/[^)]+\.ttf)\)/)?.[1];
  if (!url) throw new Error(`Couldn't extract TTF URL for weight ${weight}`);

  const buf = await fetch(url).then((r) => r.arrayBuffer());
  fs.writeFileSync(cachePath, Buffer.from(buf));
  return buf;
}

/* SVG hex molecule (7 hexagons in flower pattern), encoded as data URI for the OG */
function hexMoleculeDataUri(size: number, color: string, opacity = 0.18): string {
  const r = size / 6; // hex radius
  // Hexagon centers — center + 6 around
  const centers = [
    [0, 0],
    [r * Math.sqrt(3), 0],
    [-r * Math.sqrt(3), 0],
    [(r * Math.sqrt(3)) / 2, r * 1.5],
    [-(r * Math.sqrt(3)) / 2, r * 1.5],
    [(r * Math.sqrt(3)) / 2, -r * 1.5],
    [-(r * Math.sqrt(3)) / 2, -r * 1.5],
  ];

  const hex = (cx: number, cy: number) => {
    const pts: string[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + Math.PI / 6;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return `<polygon points="${pts.join(" ")}" fill="none" stroke="${color}" stroke-width="2" />`;
  };

  const cx = size / 2;
  const cy = size / 2;
  const polygons = centers.map(([dx, dy]) => hex(cx + dx, cy + dy)).join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" opacity="${opacity}">${polygons}</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/* Subtle dot grid background */
function gridDataUri(): string {
  const tile = 40;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${tile}" height="${tile}"><circle cx="1" cy="1" r="1" fill="${CORAL}" opacity="0.12"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

interface TemplateProps {
  eyebrow: string;
  title: string;
  heroStat?: string;
  heroLabel?: string;
}

function Template({ eyebrow, title, heroStat, heroLabel }: TemplateProps) {
  const hexUri = hexMoleculeDataUri(420, CORAL);
  const gridUri = gridDataUri();
  const hasHero = Boolean(heroStat);

  return (
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        flexDirection: "column",
        backgroundColor: WHITE,
        backgroundImage: `url("${gridUri}")`,
        backgroundRepeat: "repeat",
        position: "relative",
        fontFamily: "DM Sans",
      }}
    >
      {/* Hex molecule in top-right corner */}
      <img
        src={hexUri}
        width={420}
        height={420}
        style={{
          position: "absolute",
          top: -80,
          right: -80,
        }}
      />

      {/* Coral accent bar at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          background: `linear-gradient(90deg, ${CORAL} 0%, ${CORAL_LIGHT} 100%)`,
          display: "flex",
        }}
      />

      {/* Main content area */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "80px 80px 60px 80px",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        {/* Top section: eyebrow + title (+ hero stat) */}
        <div
          style={{
            display: "flex",
            flexDirection: hasHero ? "row" : "column",
            alignItems: hasHero ? "flex-start" : "stretch",
            gap: 48,
          }}
        >
          {/* Eyebrow + title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: hasHero ? "1 1 60%" : "1 1 100%",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 18,
                fontWeight: 700,
                color: CORAL,
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                marginBottom: 28,
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: title.length > 70 ? 56 : title.length > 45 ? 64 : 72,
                fontWeight: 700,
                color: SLATE_900,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </div>
          </div>

          {/* Hero stat */}
          {hasHero && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                flex: "0 0 auto",
                paddingTop: 36,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 96,
                  fontWeight: 700,
                  color: CORAL,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {heroStat}
              </div>
              {heroLabel && (
                <div
                  style={{
                    display: "flex",
                    fontSize: 14,
                    fontWeight: 700,
                    color: SLATE_400,
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    marginTop: 12,
                    textAlign: "right",
                  }}
                >
                  {heroLabel}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer: wordmark + URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 60,
            paddingTop: 28,
            borderTop: `1px solid ${SLATE_100}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 32,
                height: 32,
                borderRadius: 8,
                background: `linear-gradient(135deg, ${CORAL} 0%, ${CORAL_LIGHT} 100%)`,
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 700,
                color: SLATE_900,
                letterSpacing: "-0.01em",
              }}
            >
              The Content Labs
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 16,
              fontWeight: 400,
              color: SLATE_500,
              letterSpacing: "0.02em",
            }}
          >
            thecontentlabs.app
          </div>
        </div>
      </div>
    </div>
  );
}

async function renderOg(job: Job, fonts: Awaited<ReturnType<typeof loadFonts>>) {
  const svg = await satori(
    <Template
      eyebrow={job.eyebrow}
      title={job.title}
      heroStat={job.heroStat}
      heroLabel={job.heroLabel}
    />,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "DM Sans", data: fonts.regular, weight: 400, style: "normal" },
        { name: "DM Sans", data: fonts.bold, weight: 700, style: "normal" },
      ],
    }
  );

  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } })
    .render()
    .asPng();

  fs.writeFileSync(path.join(OUT_DIR, job.outFile), png);
  console.log(`  ✓ ${job.outFile}`);
}

async function loadFonts() {
  console.log("Loading fonts...");
  const [regular, bold] = await Promise.all([getFont(400), getFont(700)]);
  return { regular, bold };
}

function getBlogJobs(): Job[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        outFile: `blog-${slug}.png`,
        eyebrow: CATEGORY_LABELS[data.category as string] || "Blog",
        title: data.title || slug,
      };
    });
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const fonts = await loadFonts();
  const jobs = [...getBlogJobs(), ...REPORT_JOBS];

  console.log(`Generating ${jobs.length} OG images...`);
  for (const job of jobs) {
    await renderOg(job, fonts);
  }
  console.log(`Done: ${jobs.length} images written to public/og/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
