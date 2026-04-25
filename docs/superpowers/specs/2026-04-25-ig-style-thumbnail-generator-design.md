# IG-Style Thumbnail Generator (v2)

**Status:** Approved (2026-04-25)
**Replaces:** `scripts/generate-thumbnails.mjs` v1 ("scientific lab notebook" style)
**Output:** Same path (`public/thumbnails/<slug>.png`), same dimensions (16:9)

## Why

The v1 generator (shipped 2026-04-24) produces abstract isometric/geometric thumbnails on a slate-and-coral palette. The Instagram brand for The Content Labs is the opposite aesthetic: cinematic painterly illustrations with bold serif typography asserting a punchy thesis ("Virality is *Overrated*.", "Why your content *sucks*."). The blog grid currently feels disconnected from the IG presence.

This redesign aligns blog thumbnails with the IG visual language: painterly background + serif typography overlay + small CONTENT LABS mark.

## Design summary

Each thumbnail is a layered composition:

1. **Background:** AI-generated cinematic painterly oil illustration (Gemini 2.5 Flash Image / Nano Banana), conditioned on 2-3 IG sample images stored in the repo.
2. **Hook phrase:** 3-5 word thesis statement with one italicized emphasis word, generated once per post by Gemini 2.5 Flash and persisted to the post's MDX frontmatter for hand-editing.
3. **Typography overlay:** Hook phrase rendered server-side in Playfair Display (regular + italic) using `satori` + `@resvg/resvg-js` (already deps — used by the OG image script).
4. **Brand mark:** Small "CONTENT LABS" wordmark bottom-right.
5. **Finish:** Subtle vignette overlay (CSS radial gradient inside the satori layout) to unify text and image.

The entire final image is composed by satori in a single pass: the AI-generated background is embedded as a base64 data URI inside an `<img>` element, with text + brand mark + vignette gradient layered above. No `sharp` dependency needed.

## Visual style spec

**Background prompt** (passed to Nano Banana with reference images):

> Cinematic painterly oil illustration in the style of 1970s sci-fi paperback covers crossed with editorial collage. A single symbolic subject in atmospheric landscape — examples: lone figure on mountain ridge, glowing doorway in dusk, open book under cosmic sky, distant city glowing at sunset, person holding torch in cavern. Dramatic backlight, deep shadow, visible painterly brushwork, slight film softness. Mood: contemplative, slightly mysterious, narratively charged. Palette: deep blues, blacks, earth tones, with one warm hot accent (sun, fire, doorway light, ember). 16:9 aspect ratio.
>
> Subject: __SUBJECT__
>
> CRITICAL CONSTRAINTS: no text, no words, no letters, no numbers, no logos, no watermarks, no human faces in close-up, no UI elements.

**Reference images:** 2-3 IG poster screenshots placed in `scripts/thumbnail-references/` (committed to the repo). User adds these once before first run. Passed via `inlineData` parts in the Gemini Image request alongside the text prompt. If the directory is empty, the script logs a warning and runs prompt-only.

**Subject derivation** (unchanged from v1, prompt tightened): Gemini 2.5 Flash converts title + description into a single-sentence concrete visual scene. System prompt updated to bias toward narrative/figure-in-landscape compositions rather than abstract geometric metaphors.

## Hook phrase

**Source:** Auto-generate once via Gemini 2.5 Flash, persist to MDX frontmatter as two new fields:

```yaml
thumbnailHook: "Coaching is broken."
thumbnailEmphasis: "broken"
```

**Generator behavior:**
- If both fields present → use as-is.
- If either missing → call LLM, write back to MDX (in place, preserving rest of frontmatter via `gray-matter` round-trip).
- New flag `--regen-hooks` forces re-generation of all hooks (replaces existing values).

**LLM contract:**
- Input: title, description, first ~500 chars of post body.
- Output: JSON `{"hook": "string", "emphasis": "string"}`.
- Constraints: 3-5 words, period at end, emphasis must be one of the words in hook (verbatim, including casing/punctuation).
- Validation: if emphasis isn't a substring of hook, retry once; if still bad, log and skip writing — leave fields blank for manual entry.

**Style guidance for the LLM:** assertive thesis statements, contrarian framings, lowercase-y casual punctuation. Examples (from the brand IG) included in the system prompt.

## Composition pipeline

Per-post sequence:

1. Read MDX → frontmatter + body.
2. If hook missing → generate + write back to MDX.
3. Derive subject sentence (Gemini 2.5 Flash).
4. Generate background (Gemini 2.5 Flash Image, with reference images + subject prompt) → base64 PNG.
5. Build full-frame SVG via `satori` (1536×864):
   - Root: flex container with the background image as a positioned `<img src="data:image/png;base64,...">` filling the frame.
   - Vignette: absolutely-positioned `<div>` with a radial-gradient CSS background, ~30% strength at edges, transparent center.
   - Hook text: top-left, 64px inset. Hook split into spans; the emphasis substring rendered with `font-style: italic`. Size: 96pt for ≤4 words, 84pt for 5 words. Color: `#ffffff`. `text-shadow: 0 2px 8px rgba(0,0,0,0.5)`.
   - "CONTENT LABS" wordmark: bottom-right, 14pt, all-caps, letter-spacing `0.18em`, color `rgba(255,255,255,0.7)`.
   - Font: Playfair Display 400 (regular) + 400 italic, fetched from Google Fonts on first run, cached to `.fonts-cache/` (matches existing OG-image pattern).
6. Rasterize SVG via `@resvg/resvg-js` → PNG buffer.
7. Write to `public/thumbnails/<slug>.png`.

## Script structure

`scripts/generate-thumbnails.mjs` evolves from 183 → ~330 lines. New helpers:

- `generateHook(title, description, body) → {hook, emphasis}`
- `writeHookToFrontmatter(filepath, hook, emphasis)` — uses `gray-matter` to round-trip MDX without losing other fields or body content
- `loadReferenceImages() → Array<{mimeType, data}>` (one-time read, cached in module scope)
- `loadFonts() → {regular: ArrayBuffer, italic: ArrayBuffer}` (mirrors OG-image script's `getFont`, but for Playfair Display)
- `renderFinalImage({bgBase64, hook, emphasis, fonts}) → PNG buffer` — satori → resvg, single pass

CLI flags:
- `--force` — regenerate images even if output exists (existing).
- `--only=slug,slug` — restrict to specific posts (existing).
- `--regen-hooks` — re-derive hook phrases, overwriting frontmatter (new).
- `--text-only` — skip image regeneration, just re-render text layer over existing background (new; for fast iteration on typography).

## Frontmatter schema additions

Two optional fields added to blog/guide MDX:

```yaml
thumbnailHook: string         # 3-5 word thesis, period at end
thumbnailEmphasis: string     # substring of thumbnailHook to italicize
```

Absent on existing posts → script generates and writes back. Hand-editable thereafter. The blog page rendering code does not need to know about these fields; they're consumed only by the generator script.

## Out of scope

- Updating the BlogCard component — current image-or-fallback behavior works as-is.
- Regenerating OG images — `scripts/generate-og-images.tsx` is a separate system serving 1200×630 social shares.
- 1:1 / IG-format export — single-purpose 16:9 only for now. (Could be added as a parallel output path later.)
- Replacing Nano Banana with Imagen 4 / Flux / etc. — keeping the existing image model.
- Migrating PNG → WebP — separate cleanup task noted in v1's commit message.

## Risks and mitigations

- **Nano Banana quality drift on painterly style:** Mitigated by passing 2-3 IG reference images via image conditioning. If results are inconsistent across runs, we can also seed the request or add more references.
- **LLM produces hooks that don't fit IG voice:** Mitigated by including 5-6 IG examples in the system prompt and persisting output to MDX so user can edit misses.
- **`thumbnailEmphasis` not matching `thumbnailHook` substring:** Validated in code with one retry; on second failure, blank fields and log warning so the user notices and writes manually.
- **Font licensing:** Playfair Display is OFL — fine for commercial use. If user later wants Tiempos / GT Super, swap the font URL + cache path; one-line change.
- **PNG size growth:** Vignette overlay may push file sizes slightly higher. Mitigated by resvg's PNG compression. WebP migration remains the long-term answer.

## Acceptance criteria

1. Running `npm run thumbnails -- --force` regenerates all 34 existing thumbnails with the new style.
2. Each post's MDX frontmatter contains `thumbnailHook` and `thumbnailEmphasis` after the run.
3. Visual review: the generated thumbnails read as visually consistent with the IG samples in `scripts/thumbnail-references/` (same painterly mood, same serif treatment, same brand mark).
4. Re-running without flags is idempotent (no API calls, no file changes).
5. `--only=<slug>` regenerates a single post's thumbnail in under 30 seconds.
6. `--text-only` regenerates the text overlay without calling Nano Banana (under 5 seconds per post).
