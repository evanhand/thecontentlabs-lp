# Design system v2 — The Content Labs

The goal: calm, put-together, premium. Brand colors stay (coral `#f4632a`, cream, navy). What changes is restraint: one header pattern, one card, one accent moment per screen.

## Rules that matter most

1. **Coral is for the single primary action on a screen** (and tiny active indicators like the active nav icon). Never coral banners, coral tinted cards, coral gradients, coral badges, coral tab fills, coral section icons.
2. **No gradients** anywhere in the app (backgrounds, buttons, text, avatars). No glows, blurs, `animate-pulse`/`animate-ping` decoration, shimmer sweeps, hover `scale-105`.
3. **No icon tiles.** Headings carry no colored square icon beside them. Icons appear only inside buttons, list rows, nav, and small inline meta (16px, `text-ink-3`).
4. **No eyebrow / kicker labels** (tiny uppercase tracking-wide text above a heading). Delete them; the heading speaks. Mono only for numbers, timestamps and code.
5. **No navy hero banners inside pages.** Pages sit on the cream canvas; content goes in white cards.
6. **No nested cards.** Inside a card, group with spacing, a hairline divider (`border-line/[0.08]`), or a `ds-well` (sunken) block.
7. **No colored side-stripe borders** (`border-l-4 border-coral` etc.).
8. **No emoji as icons.** Use lucide-react.

## Tokens (Tailwind)

| Use | Class |
|---|---|
| Page background | `bg-canvas` (cream light / deep navy dark) |
| Card | `lab-card` (= white `bg-surface`, 1px `border-line/[0.08]`, rounded-2xl, soft shadow; flat in dark) |
| Well / input / tab track | `bg-sunken` (or `ds-well`) |
| Primary text | `text-ink` |
| Secondary text | `text-ink-2` |
| Tertiary / meta | `text-ink-3` |
| Hairline | `border-line/[0.08]`; stronger `border-line/[0.14]` |
| Accent | `bg-content-coral` / `text-content-coral` (rare) |
| Success / warning / error | emerald / amber / red at `/10` backgrounds with `-700` text (`dark:-300`) — only for real status |

These tokens are dark-mode aware: **do not add `dark:` variants for them.** Replace `bg-white dark:bg-slate-800` with `bg-surface`, `text-slate-900 dark:text-white` with `text-ink`, `text-slate-500 dark:text-slate-400` with `text-ink-3`, `border-slate-200 dark:border-slate-700` with `border-line/[0.08]`, `bg-slate-50/100 dark:bg-slate-900/700` (inner fills) with `bg-sunken`.

## Type scale

- Page title: `PageHeader` (Clash, 28/32, semibold). One per page.
- Section title: `font-heading text-section text-ink` (18/24) — or `SectionHeader`.
- Card title: `text-[15px] font-semibold text-ink` (DM Sans).
- Body: `text-body text-ink-2` (15/24). Max ~65ch for prose.
- Meta: `text-meta text-ink-3` (13/18). **Nothing smaller than 12px** (`text-xs`). Remove `text-[9px]`, `text-[10px]`, `text-[11px]`.
- Numbers: `ds-num` (tabular). Big stat numbers: `font-heading text-2xl font-semibold text-ink ds-num`.
- Weight: 400 body, 500 labels/buttons, 600 titles. Avoid `font-bold`/`font-black` except the page title is 600 too.

## Spacing & shape

- 4pt grid. Page rhythm: `gap-6 sm:gap-8` between sections; card padding `p-5 sm:p-6`; inside cards `gap-3`/`gap-4`.
- Radius: card `rounded-2xl` (16); inner elements `rounded-xl` (12) or `rounded-[10px]` for buttons/inputs; pills `rounded-full`.
- Page width: wrap page content in `PageShell` (`max-w-6xl`, `narrow` = 3xl, `wide` = 1400). Layout already provides outer padding.

## Components (import from `src/components/ui`)

- `PageHeader` — `title`, `subtitle`, `actions`, `backLink` (detail pages only). Every app page starts with it (except Chemist & Calendar which are full-bleed tools).
- `PageShell` — width + vertical rhythm.
- `SectionHeader` — section title + description + action.
- `Button` — `primary` (coral, one per screen), `secondary` (white bordered), `ghost`, `accent` (ink/black), `danger`. Heights 32/40/44.
- `Tabs` — underline (ink indicator) or pills (white on sunken).
- `Badge` — neutral by default; status colors only for status.
- `EmptyState`, `InfoBanner`, `SectionCard` — already restyled.
- `ChemistCTA` — the neutral "take it to the Chemist" handoff; the coral is only on its button.

## Motion

- Ease-out `cubic-bezier(0.23,1,0.32,1)`, 150–240ms. Animate transform/opacity/colors only.
- Press: `active:scale-[0.97]` on buttons.
- **No entrance animations on app pages** (no fade-up on every card, no stagger). Data should just be there.
- Hover: color/border change; no lifts (`-translate-y`), no shadow growth.

## States

Every list/data block needs: loading (skeleton using `bg-sunken animate-pulse` is OK — the one allowed pulse), empty (`EmptyState`), error (`InfoBanner variant="error"`).

## Charts

Neutral axes `ink-3`, gridlines `line/8`. Primary series coral; comparison series slate-400. No gradients under lines (a flat 8% fill is fine). No more than 3 series colors.

## Marketing site addendum (thecontentlabs.app)

- One nav (`components/PublicNav.tsx`) and one footer (`components/landing/Footer.tsx`) on **every** page, including pricing, compare, blog, features, for/, playbooks, reports, trends, legal.
- Page canvas: cream `bg-canvas`. One dark navy band is allowed per page (hero **or** final CTA, not both, not alternating light/dark every section).
- Marketing headings may go larger: h1 `font-heading text-4xl sm:text-6xl font-semibold tracking-[-0.03em] text-ink`, h2 `text-3xl sm:text-4xl`. Body `text-lg text-ink-2` max 60ch.
- Section rhythm: `py-20 sm:py-28`, container `max-w-6xl mx-auto px-4 sm:px-6`.
- Motion: one hero moment; sections may fade-up 12px once with ease-out (`lib/motionVariants.ts`), no blur/scale/rotate, no parallax, cursor glows, aurora, tilt, magnetic buttons, noise overlays, hover bubbles, molecule decorations.
- No kicker/eyebrow labels, no gradient text, no glass cards, no coral-tinted section backgrounds.
- Article pages: `max-w-[68ch]` prose, `text-[17px] leading-7`, real headings, images full content width with `rounded-2xl`.
