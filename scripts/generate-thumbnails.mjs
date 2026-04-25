/**
 * Brand-consistent AI thumbnail generator for blog + guide posts.
 *
 * Reads each MDX, derives a visual metaphor via Gemini 2.5 Flash, then
 * generates the image via Gemini 2.5 Flash Image (a.k.a. Nano Banana)
 * using a fixed brand-style prompt.
 * Output: public/thumbnails/<slug>.png (no text).
 *
 * Idempotent — skips slugs whose PNG already exists. Pass --force to
 * regenerate everything, or --only=slug-a,slug-b to regenerate specific.
 *
 * Usage:
 *   GEMINI_API_KEY=AIza... npm run thumbnails
 *   GEMINI_API_KEY=AIza... npm run thumbnails -- --force
 *   GEMINI_API_KEY=AIza... npm run thumbnails -- --only=how-many-hashtags-tiktok-instagram
 *
 * Also accepts GOOGLE_API_KEY as a fallback.
 */
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const GUIDES_DIR = path.join(process.cwd(), "content", "guides");
const OUT_DIR = path.join(process.cwd(), "public", "thumbnails");

const TEXT_MODEL = "gemini-2.5-flash";
const IMAGE_MODEL = "gemini-2.5-flash-image";

const STYLE_PROMPT = `A clean editorial illustration in the style of a scientific lab notebook crossed with minimalist data visualization, 16:9 aspect ratio.
Background: dark slate gradient (#0f172a to #1e293b to #020617).
Accent color: vibrant coral (#f4632a) used sparingly for emphasis only.
Subtle white grid pattern overlay (1px lines, 32px spacing, 5% opacity).
Composition: centered geometric subject with soft volumetric glow and atmospheric depth (subtle blur, dust particles).
Aesthetic: technical, scientific, premium, restrained. Mood: thoughtful, analytical.

Subject: __SUBJECT__

CRITICAL CONSTRAINTS: no text, no words, no letters, no numbers, no logos, no watermarks, no human faces, no UI screenshots, no charts with labels.`;

const SUBJECT_SYSTEM = `You convert blog post titles into single-sentence visual metaphor descriptions for editorial illustrations.
Return ONLY the visual metaphor, no explanation, no quotes, no preamble.
The metaphor must be a concrete visual scene with specific objects (not abstract concepts).
Style hints: geometric, isometric, cinematic, minimalist, technical, atmospheric.
Hard rules: no text, no letters, no numbers, no faces, no logos, no UI elements.
Length: one sentence, ~25 words max.`;

function getKey() {
  const k = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!k) throw new Error("Missing GEMINI_API_KEY (or GOOGLE_API_KEY) env var.");
  return k;
}

function parseArgs() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const onlyArg = args.find((a) => a.startsWith("--only="));
  const only = onlyArg ? onlyArg.slice(7).split(",").map((s) => s.trim()) : null;
  return { force, only };
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function callGemini(model, body) {
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

async function deriveSubject(title, description) {
  const data = await callGemini(TEXT_MODEL, {
    systemInstruction: { parts: [{ text: SUBJECT_SYSTEM }] },
    contents: [
      {
        parts: [
          {
            text: `Title: "${title}"\nDescription: "${description}"\n\nVisual metaphor:`,
          },
        ],
      },
    ],
    generationConfig: { temperature: 0.9, maxOutputTokens: 120 },
  });
  const parts = data?.candidates?.[0]?.content?.parts || [];
  const text = parts.map((p) => p.text || "").join("").trim();
  if (!text) throw new Error("Empty subject derivation response");
  return text.replace(/^["']|["']$/g, "");
}

async function generateImage(prompt) {
  const data = await callGemini(IMAGE_MODEL, {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ["IMAGE"] },
  });
  const parts = data?.candidates?.[0]?.content?.parts || [];
  const imgPart = parts.find(
    (p) => p.inlineData && p.inlineData.mimeType?.startsWith("image/"),
  );
  if (!imgPart) {
    throw new Error(
      `No image in response. Got parts: ${JSON.stringify(parts).slice(0, 300)}`,
    );
  }
  return imgPart.inlineData.data; // base64
}

async function saveBase64(b64, filepath) {
  const buffer = Buffer.from(b64, "base64");
  await fs.writeFile(filepath, buffer);
}

async function listMdx(dir) {
  try {
    const files = await fs.readdir(dir);
    return files.filter((f) => f.endsWith(".mdx")).map((f) => ({ dir, name: f }));
  } catch {
    return [];
  }
}

async function main() {
  const { force, only } = parseArgs();
  await fs.mkdir(OUT_DIR, { recursive: true });

  const files = [...(await listMdx(BLOG_DIR)), ...(await listMdx(GUIDES_DIR))];

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const { dir, name } of files) {
    const slug = name.replace(/\.mdx$/, "");
    if (only && !only.includes(slug)) continue;

    const outFile = path.join(OUT_DIR, `${slug}.png`);
    if (!force && (await fileExists(outFile))) {
      skipped++;
      console.log(`✓ ${slug}  (exists)`);
      continue;
    }

    try {
      const raw = await fs.readFile(path.join(dir, name), "utf-8");
      const { data } = matter(raw);
      if (!data.title) throw new Error("Missing title in frontmatter");

      process.stdout.write(`→ ${slug}  deriving subject...`);
      const subject = await deriveSubject(data.title, data.description || "");
      process.stdout.write(` ✓\n  subject: ${subject}\n  generating image...`);

      const fullPrompt = STYLE_PROMPT.replace("__SUBJECT__", subject);
      const b64 = await generateImage(fullPrompt);
      await saveBase64(b64, outFile);
      process.stdout.write(` ✓\n`);
      generated++;
    } catch (err) {
      failed++;
      console.error(`✗ ${slug}: ${err.message}`);
    }
  }

  console.log(`\nDone. ${generated} generated, ${skipped} skipped, ${failed} failed.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
