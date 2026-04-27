/**
 * IG-style brand thumbnail generator (v2).
 *
 * Per post:
 *  1. Read MDX frontmatter (title, description, body).
 *  2. If `thumbnailHook` / `thumbnailEmphasis` are missing, ask Gemini Flash
 *     for a 3-5 word thesis with one italicized word, write back to MDX.
 *  3. Derive a one-sentence visual scene via Gemini Flash.
 *  4. Generate a painterly background via Gemini Flash Image (Nano Banana),
 *     conditioned on reference images dropped into scripts/thumbnail-references/.
 *  5. Cache the raw background to .thumbnail-bg-cache/<slug>.png.
 *  6. Compose final thumbnail with satori + resvg: bg + vignette + serif
 *     hook (Playfair Display) + CONTENT LABS wordmark.
 *  7. Write to public/thumbnails/<slug>.png.
 *
 * Usage:
 *   GEMINI_API_KEY=AIza... npm run thumbnails
 *   GEMINI_API_KEY=AIza... npm run thumbnails -- --force         # regen all
 *   GEMINI_API_KEY=AIza... npm run thumbnails -- --only=slug-a,slug-b
 *   GEMINI_API_KEY=AIza... npm run thumbnails -- --regen-hooks   # rewrite hooks
 *   npm run thumbnails -- --text-only                            # re-render text from cached bg
 *
 * Also accepts GOOGLE_API_KEY as a fallback.
 */
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const GUIDES_DIR = path.join(process.cwd(), "content", "guides");
const OUT_DIR = path.join(process.cwd(), "public", "thumbnails");
const BG_CACHE_DIR = path.join(process.cwd(), ".thumbnail-bg-cache");
const REF_DIR = path.join(process.cwd(), "scripts", "thumbnail-references");
const FONT_CACHE = path.join(process.cwd(), ".fonts-cache");

const TEXT_MODEL = "gemini-2.5-flash";
const IMAGE_MODEL = "gemini-2.5-flash-image";

const WIDTH = 1536;
const HEIGHT = 864;

const STYLE_PROMPT = `Cinematic painterly oil illustration in the style of 1970s sci-fi paperback covers crossed with editorial collage. A single symbolic subject in atmospheric landscape. Dramatic backlight, deep shadow, visible painterly brushwork, slight film softness. Mood: contemplative, slightly mysterious, narratively charged. Palette: deep blues, blacks, earth tones, with one warm hot accent (sun, fire, doorway light, ember). 16:9 aspect ratio.

Match the style of the reference images provided.

Subject: __SUBJECT__

CRITICAL CONSTRAINTS: no text, no words, no letters, no numbers, no logos, no watermarks, no human faces in close-up, no UI elements.`;

const SUBJECT_SYSTEM = `You convert blog post titles into single-sentence visual scene descriptions for cinematic painterly editorial illustrations.
Return ONLY the visual scene, no explanation, no quotes, no preamble.
The scene must be a concrete narrative composition with a single symbolic subject in an atmospheric landscape. Examples: "a lone figure standing on a mountain ridge at sunset", "an open book floating in a cosmic void with embers rising", "a glowing doorway in a dusk forest with a single silhouetted figure approaching".
Style hints: cinematic, painterly, narrative, dramatic backlight, single focal subject in atmospheric environment.
Hard rules: no text, no letters, no numbers, no faces in close-up, no logos, no UI elements.
Length: one sentence, ~25 words max.`;

const HOOK_SYSTEM = `You write punchy thesis statements for blog post thumbnails in the style of an editorial Instagram brand.

Output JSON only: {"hook": "string", "emphasis": "string"}.

Rules:
- hook: 3-5 words, ends with a period (or other terminal punctuation)
- emphasis: one word from hook (verbatim, including casing/punctuation), the most loaded/contrarian/surprising word — will be italicized
- voice: assertive, contrarian, simple, slightly provocative, sometimes wry
- never use marketing fluff ("amazing", "powerful", "ultimate", "unlock", "boost", "level up")
- never restate the title literally — find the underlying counter-intuitive claim

VARY THE STRUCTURE. Do not default to "X is broken" or "X is the Y". The phrase "is broken" is overused — avoid it unless no other framing works. Mix sentence types across the corpus.

Use a varied mix of these structures:
- Stat-led: "Text wins. 14×." / "9×. Not 1.5×."
- Imperative: "Stop chasing trends." / "Post less. Win more."
- Counter-intuitive pair: "Less reach. More money." / "Small wins big."
- Accusation: "Your hooks aren't working." / "Your captions are dead weight."
- Diagnosis: "Most hooks are noise." / "Timing barely matters."
- Thesis: "Emotion is the strategy." / "Volume beats virality."
- Rhetorical: "Why bother with hashtags?" / "Who needs SEO captions?"
- Two-part: "Pick a niche. Pick wrong." / "Trust loses. Curiosity wins."

The italicized word should land — choose the word that carries the contradiction or the punchline, not a filler word.`;

function getKey(): string {
  const k = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!k) throw new Error("Missing GEMINI_API_KEY (or GOOGLE_API_KEY) env var.");
  return k;
}

interface Args {
  force: boolean;
  only: string[] | null;
  regenHooks: boolean;
  textOnly: boolean;
}

function parseArgs(): Args {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const regenHooks = args.includes("--regen-hooks");
  const textOnly = args.includes("--text-only");
  const onlyArg = args.find((a) => a.startsWith("--only="));
  const only = onlyArg ? onlyArg.slice(7).split(",").map((s) => s.trim()) : null;
  return { force, only, regenHooks, textOnly };
}

async function fileExists(p: string): Promise<boolean> {
  try {
    await fsp.access(p);
    return true;
  } catch {
    return false;
  }
}

interface GeminiPart {
  text?: string;
  inlineData?: { mimeType: string; data: string };
}

interface GeminiBody {
  contents: { parts: GeminiPart[] }[];
  systemInstruction?: { parts: GeminiPart[] };
  generationConfig?: Record<string, unknown>;
}

async function callGemini(model: string, body: GeminiBody): Promise<any> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${getKey()}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini ${model} ${res.status}: ${text.slice(0, 500)}`);
  }
  return res.json();
}

async function deriveSubject(title: string, description: string): Promise<string> {
  const data = await callGemini(TEXT_MODEL, {
    systemInstruction: { parts: [{ text: SUBJECT_SYSTEM }] },
    contents: [
      {
        parts: [
          {
            text: `Title: "${title}"\nDescription: "${description}"\n\nVisual scene:`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.9,
      maxOutputTokens: 200,
      thinkingConfig: { thinkingBudget: 0 },
    },
  });
  const parts: GeminiPart[] = data?.candidates?.[0]?.content?.parts || [];
  const text = parts.map((p) => p.text || "").join("").trim();
  if (!text) throw new Error("Empty subject derivation response");
  return text.replace(/^["']|["']$/g, "");
}

interface Hook {
  hook: string;
  emphasis: string;
}

async function deriveHook(title: string, description: string, body: string): Promise<Hook> {
  const snippet = body.slice(0, 500).replace(/\s+/g, " ").trim();

  for (let attempt = 0; attempt < 2; attempt++) {
    const data = await callGemini(TEXT_MODEL, {
      systemInstruction: { parts: [{ text: HOOK_SYSTEM }] },
      contents: [
        {
          parts: [
            {
              text: `Title: "${title}"\nDescription: "${description}"\nFirst paragraph: "${snippet}"\n\nReturn JSON:`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.85,
        maxOutputTokens: 200,
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    const parts: GeminiPart[] = data?.candidates?.[0]?.content?.parts || [];
    const text = parts.map((p) => p.text || "").join("").trim();
    if (!text) continue;

    try {
      const parsed = JSON.parse(text);
      const hook = String(parsed.hook || "").trim();
      const emphasis = String(parsed.emphasis || "").trim();
      if (hook && emphasis && hook.includes(emphasis)) {
        return { hook, emphasis };
      }
    } catch {
      // fall through, retry
    }
  }
  throw new Error("Failed to derive valid hook after 2 attempts");
}

async function loadReferenceImages(): Promise<GeminiPart[]> {
  if (!fs.existsSync(REF_DIR)) return [];
  const files = await fsp.readdir(REF_DIR);
  const images = files.filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
  if (images.length === 0) return [];

  const parts: GeminiPart[] = [];
  for (const f of images) {
    const buf = await fsp.readFile(path.join(REF_DIR, f));
    const ext = path.extname(f).slice(1).toLowerCase();
    const mimeType = ext === "jpg" ? "image/jpeg" : `image/${ext}`;
    parts.push({ inlineData: { mimeType, data: buf.toString("base64") } });
  }
  return parts;
}

async function generateBackground(
  subjectPrompt: string,
  refImages: GeminiPart[],
): Promise<Buffer> {
  const parts: GeminiPart[] = [...refImages, { text: subjectPrompt }];
  const data = await callGemini(IMAGE_MODEL, {
    contents: [{ parts }],
    generationConfig: { responseModalities: ["IMAGE"] },
  });
  const responseParts: GeminiPart[] = data?.candidates?.[0]?.content?.parts || [];
  const imgPart = responseParts.find(
    (p) => p.inlineData && p.inlineData.mimeType?.startsWith("image/"),
  );
  if (!imgPart?.inlineData) {
    throw new Error(
      `No image in response. Got parts: ${JSON.stringify(responseParts).slice(0, 300)}`,
    );
  }
  return Buffer.from(imgPart.inlineData.data, "base64");
}

async function getFont(variant: "regular" | "italic"): Promise<ArrayBuffer> {
  if (!fs.existsSync(FONT_CACHE)) fs.mkdirSync(FONT_CACHE, { recursive: true });
  const cachePath = path.join(FONT_CACHE, `playfair-display-${variant}.ttf`);
  if (fs.existsSync(cachePath)) {
    const buf = fs.readFileSync(cachePath);
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  }

  const cssUrl =
    variant === "italic"
      ? "https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&display=swap"
      : "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400&display=swap";

  const css = await fetch(cssUrl, {
    headers: { "User-Agent": "Mozilla/5.0" },
  }).then((r) => r.text());

  const url = css.match(/url\((https:\/\/[^)]+\.ttf)\)/)?.[1];
  if (!url) throw new Error(`Couldn't extract Playfair Display ${variant} TTF URL`);

  const buf = await fetch(url).then((r) => r.arrayBuffer());
  fs.writeFileSync(cachePath, Buffer.from(buf));
  return buf;
}

async function loadFonts(): Promise<{ regular: ArrayBuffer; italic: ArrayBuffer }> {
  const [regular, italic] = await Promise.all([getFont("regular"), getFont("italic")]);
  return { regular, italic };
}

interface ComposeArgs {
  bgBuffer: Buffer;
  hook: string;
  emphasis: string;
  fonts: { regular: ArrayBuffer; italic: ArrayBuffer };
}

/**
 * Splits a hook string around the emphasis substring, preserving order.
 * "Coaching is broken." with emphasis "broken" → ["Coaching is ", "broken", "."]
 * Only the middle segment gets italicized. Empty edge segments are filtered.
 */
function splitHook(hook: string, emphasis: string): { text: string; italic: boolean }[] {
  const idx = hook.indexOf(emphasis);
  if (idx < 0) return [{ text: hook, italic: false }];
  const before = hook.slice(0, idx);
  const after = hook.slice(idx + emphasis.length);
  const segments: { text: string; italic: boolean }[] = [];
  if (before) segments.push({ text: before, italic: false });
  segments.push({ text: emphasis, italic: true });
  if (after) segments.push({ text: after, italic: false });
  return segments;
}

function Frame({ bgDataUri, hook, emphasis }: { bgDataUri: string; hook: string; emphasis: string }) {
  const segments = splitHook(hook, emphasis);
  const wordCount = hook.split(/\s+/).length;
  const fontSize = wordCount <= 3 ? 112 : wordCount <= 4 ? 96 : 84;

  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        display: "flex",
        position: "relative",
        backgroundColor: "#000",
      }}
    >
      {/* Background image */}
      <img
        src={bgDataUri}
        width={WIDTH}
        height={HEIGHT}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: WIDTH,
          height: HEIGHT,
          objectFit: "cover",
        }}
      />

      {/* Vignette overlay — radial gradient darkening edges */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: WIDTH,
          height: HEIGHT,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.45) 100%)",
          display: "flex",
        }}
      />

      {/* Hook text — top-left */}
      <div
        style={{
          position: "absolute",
          top: 64,
          left: 72,
          right: 72,
          display: "flex",
          flexWrap: "wrap",
          fontFamily: "Playfair Display",
          fontSize,
          fontWeight: 400,
          lineHeight: 1.05,
          color: "#ffffff",
          textShadow: "0 2px 12px rgba(0,0,0,0.55)",
          letterSpacing: "-0.01em",
        }}
      >
        {segments.map((seg, i) => (
          <span
            key={i}
            style={{
              fontStyle: seg.italic ? "italic" : "normal",
              whiteSpace: "pre",
            }}
          >
            {seg.text}
          </span>
        ))}
      </div>

      {/* CONTENT LABS wordmark — bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 56,
          display: "flex",
          fontFamily: "Playfair Display",
          fontSize: 18,
          fontWeight: 400,
          color: "rgba(255,255,255,0.72)",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
        }}
      >
        Content Labs
      </div>
    </div>
  );
}

async function compose({ bgBuffer, hook, emphasis, fonts }: ComposeArgs): Promise<Buffer> {
  const bgDataUri = `data:image/png;base64,${bgBuffer.toString("base64")}`;
  const svg = await satori(
    <Frame bgDataUri={bgDataUri} hook={hook} emphasis={emphasis} />,
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: "Playfair Display", data: fonts.regular, weight: 400, style: "normal" },
        { name: "Playfair Display", data: fonts.italic, weight: 400, style: "italic" },
      ],
    },
  );
  return Buffer.from(
    new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } }).render().asPng(),
  );
}

interface PostFile {
  dir: string;
  name: string;
  filepath: string;
  slug: string;
}

async function listMdx(dir: string): Promise<PostFile[]> {
  try {
    const files = await fsp.readdir(dir);
    return files
      .filter((f) => f.endsWith(".mdx"))
      .map((name) => ({
        dir,
        name,
        filepath: path.join(dir, name),
        slug: name.replace(/\.mdx$/, ""),
      }));
  } catch {
    return [];
  }
}

/**
 * Surgically upsert top-level scalar fields in YAML frontmatter without
 * reformatting the rest of the block. Avoids js-yaml's aggressive
 * dump-style changes (single quotes, block folding, list re-indent).
 *
 * Only handles top-level string fields written at column 0. That's all
 * we need for thumbnailHook / thumbnailEmphasis.
 */
function upsertFrontmatterFields(raw: string, fields: Record<string, string>): string {
  const fmMatch = raw.match(/^---(\r?\n)([\s\S]*?)\r?\n---(\r?\n|$)/);
  if (!fmMatch) throw new Error("No frontmatter block found at top of file");
  const lineEnd = fmMatch[1];
  const fmBody = fmMatch[2];
  const fullFmBlock = fmMatch[0];

  let newFmBody = fmBody;
  for (const [key, value] of Object.entries(fields)) {
    const escaped = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    const newLine = `${key}: "${escaped}"`;
    const existing = new RegExp(`^${key}:[^\\n]*$`, "m");
    if (existing.test(newFmBody)) {
      newFmBody = newFmBody.replace(existing, newLine);
    } else {
      // Append at end of frontmatter body (before the closing ---)
      newFmBody = newFmBody.replace(/\s*$/, "") + lineEnd + newLine;
    }
  }

  return `---${lineEnd}${newFmBody}${lineEnd}---${fmMatch[3]}` + raw.slice(fullFmBlock.length);
}

async function ensureHook(
  filepath: string,
  data: Record<string, any>,
  body: string,
  regenHooks: boolean,
): Promise<{ hook: string; emphasis: string }> {
  const hasHook = typeof data.thumbnailHook === "string" && data.thumbnailHook.trim().length > 0;
  const hasEmphasis = typeof data.thumbnailEmphasis === "string" && data.thumbnailEmphasis.trim().length > 0;

  if (hasHook && hasEmphasis && !regenHooks) {
    return { hook: data.thumbnailHook, emphasis: data.thumbnailEmphasis };
  }

  process.stdout.write(`  deriving hook...`);
  const { hook, emphasis } = await deriveHook(
    data.title || "",
    data.description || "",
    body,
  );
  process.stdout.write(` ✓ "${hook}" (italic: "${emphasis}")\n`);

  const raw = await fsp.readFile(filepath, "utf-8");
  const updated = upsertFrontmatterFields(raw, {
    thumbnailHook: hook,
    thumbnailEmphasis: emphasis,
  });
  await fsp.writeFile(filepath, updated, "utf-8");

  return { hook, emphasis };
}

async function main() {
  const { force, only, regenHooks, textOnly } = parseArgs();
  await fsp.mkdir(OUT_DIR, { recursive: true });
  await fsp.mkdir(BG_CACHE_DIR, { recursive: true });

  const fonts = await loadFonts();
  const refImages = textOnly ? [] : await loadReferenceImages();
  if (!textOnly) {
    console.log(
      refImages.length > 0
        ? `Loaded ${refImages.length} reference image(s) from scripts/thumbnail-references/`
        : `No reference images in scripts/thumbnail-references/ — running prompt-only.`,
    );
  }

  const files = [...(await listMdx(BLOG_DIR)), ...(await listMdx(GUIDES_DIR))];

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const post of files) {
    if (only && !only.includes(post.slug)) continue;

    const outFile = path.join(OUT_DIR, `${post.slug}.png`);
    const bgCacheFile = path.join(BG_CACHE_DIR, `${post.slug}.png`);

    if (!force && !regenHooks && !textOnly && (await fileExists(outFile))) {
      skipped++;
      console.log(`✓ ${post.slug}  (exists)`);
      continue;
    }

    try {
      console.log(`→ ${post.slug}`);
      const raw = await fsp.readFile(post.filepath, "utf-8");
      const parsed = matter(raw);
      const data = parsed.data;
      const body = parsed.content;
      if (!data.title) throw new Error("Missing title in frontmatter");

      const { hook, emphasis } = await ensureHook(post.filepath, data, body, regenHooks);

      let bgBuffer: Buffer;
      if (textOnly) {
        if (!(await fileExists(bgCacheFile))) {
          throw new Error(
            `--text-only requires cached background. Run a normal pass first: npm run thumbnails -- --only=${post.slug}`,
          );
        }
        bgBuffer = await fsp.readFile(bgCacheFile);
      } else {
        process.stdout.write(`  deriving subject...`);
        const subject = await deriveSubject(data.title, data.description || "");
        process.stdout.write(` ✓\n  subject: ${subject}\n  generating background...`);

        const fullPrompt = STYLE_PROMPT.replace("__SUBJECT__", subject);
        bgBuffer = await generateBackground(fullPrompt, refImages);
        await fsp.writeFile(bgCacheFile, bgBuffer);
        process.stdout.write(` ✓\n`);
      }

      process.stdout.write(`  composing final...`);
      const final = await compose({ bgBuffer, hook, emphasis, fonts });
      await fsp.writeFile(outFile, final);
      process.stdout.write(` ✓\n`);
      generated++;
    } catch (err) {
      failed++;
      console.error(`✗ ${post.slug}: ${(err as Error).message}`);
    }
  }

  console.log(`\nDone. ${generated} generated, ${skipped} skipped, ${failed} failed.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
