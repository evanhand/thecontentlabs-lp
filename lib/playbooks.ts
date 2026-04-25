// Per-niche playbook data. Pulled from the scrapes + content_audits tables.
// To regenerate: see scripts/regenerate-playbooks.sql for the source query.

export type NicheSlug =
  | "fitness"
  | "finance"
  | "coaching"
  | "cooking"
  | "ecommerce"
  | "real-estate";

export type TopicSlug = "best-tiktok-hooks";

export interface HookRow {
  archetype: string;
  n: number;
  median: number;
}

export interface NicheMeta {
  slug: NicheSlug;
  label: string; // "Fitness Creators"
  audience: string; // "fitness creators"
  audienceShort: string; // "fitness"
  totalVideos: number;
  hooks: HookRow[];
}

export const NICHES: Record<NicheSlug, NicheMeta> = {
  fitness: {
    slug: "fitness",
    label: "Fitness Creators",
    audience: "fitness creators",
    audienceShort: "fitness",
    totalVideos: 361,
    hooks: [
      { archetype: "Fortune Teller", n: 20, median: 59900 },
      { archetype: "Proof Drop", n: 15, median: 38800 },
      { archetype: "Magician", n: 19, median: 12800 },
      { archetype: "Investigator", n: 62, median: 11400 },
      { archetype: "Contrarian", n: 78, median: 8770 },
      { archetype: "Experimenter", n: 17, median: 3908 },
      { archetype: "Teacher", n: 96, median: 3036 },
      { archetype: "Hot Take", n: 24, median: 2292 },
      { archetype: "FaceTime Energy", n: 30, median: 1527 },
    ],
  },
  finance: {
    slug: "finance",
    label: "Finance Creators",
    audience: "finance creators",
    audienceShort: "finance",
    totalVideos: 339,
    hooks: [
      { archetype: "Hot Take", n: 69, median: 16738 },
      { archetype: "Proof Drop", n: 16, median: 13350 },
      { archetype: "Investigator", n: 87, median: 13336 },
      { archetype: "Fortune Teller", n: 54, median: 11662 },
      { archetype: "Contrarian", n: 65, median: 8417 },
      { archetype: "Teacher", n: 48, median: 5562 },
    ],
  },
  coaching: {
    slug: "coaching",
    label: "Coaches",
    audience: "coaches",
    audienceShort: "coaching",
    totalVideos: 111,
    hooks: [
      { archetype: "Hot Take", n: 23, median: 42500 },
      { archetype: "Investigator", n: 34, median: 37800 },
      { archetype: "Teacher", n: 20, median: 7012 },
      { archetype: "Contrarian", n: 34, median: 5138 },
    ],
  },
  cooking: {
    slug: "cooking",
    label: "Food and Cooking Creators",
    audience: "food and cooking creators",
    audienceShort: "cooking",
    totalVideos: 124,
    hooks: [
      { archetype: "Magician", n: 12, median: 207627 },
      { archetype: "Experimenter", n: 19, median: 145800 },
      { archetype: "Investigator", n: 29, median: 133197 },
      { archetype: "Contrarian", n: 13, median: 55900 },
      { archetype: "Teacher", n: 22, median: 48500 },
      { archetype: "Proof Drop", n: 12, median: 46558 },
      { archetype: "Fortune Teller", n: 9, median: 22800 },
      { archetype: "Hot Take", n: 8, median: 18496 },
    ],
  },
  ecommerce: {
    slug: "ecommerce",
    label: "E-commerce Brands",
    audience: "ecommerce brands",
    audienceShort: "ecommerce",
    totalVideos: 397,
    hooks: [
      { archetype: "Magician", n: 20, median: 25232 },
      { archetype: "Investigator", n: 106, median: 10225 },
      { archetype: "Hot Take", n: 64, median: 9705 },
      { archetype: "Proof Drop", n: 20, median: 8698 },
      { archetype: "Fortune Teller", n: 38, median: 5996 },
      { archetype: "FaceTime Energy", n: 15, median: 3935 },
      { archetype: "Contrarian", n: 40, median: 3929 },
      { archetype: "Teacher", n: 94, median: 3418 },
    ],
  },
  "real-estate": {
    slug: "real-estate",
    label: "Real Estate Agents",
    audience: "real estate agents",
    audienceShort: "real estate",
    totalVideos: 148,
    hooks: [
      { archetype: "Investigator", n: 35, median: 11200 },
      { archetype: "Magician", n: 16, median: 6384 },
      { archetype: "Fortune Teller", n: 19, median: 4881 },
      { archetype: "Contrarian", n: 40, median: 3586 },
      { archetype: "Teacher", n: 38, median: 2190 },
    ],
  },
};

// Per-archetype "how to write it" guidance shared across niches.
export const ARCHETYPE_GUIDANCE: Record<string, { tagline: string; example: string; how: string }> = {
  "Hot Take": {
    tagline: "A specific, contrarian opinion stated as fact in the first second.",
    example: "\"Cardio doesn't burn fat. Here's what does.\"",
    how: "Pick a widely-held belief in your niche. Disagree with it specifically. Don't soften it.",
  },
  Investigator: {
    tagline: "Open with a knowledge-gap question your audience genuinely wants closed.",
    example: "\"Why do top creators in [your niche] always do X first?\"",
    how: "The setup creates curiosity. The payoff is your answer. Front-load the question, never the credentials.",
  },
  "Proof Drop": {
    tagline: "Lead with a hard number, result, or before/after that pre-qualifies you.",
    example: "\"3 months. Zero ads. 47K followers. Here's what we did.\"",
    how: "Numbers stop the scroll. Pair with a specific, repeatable action you'll explain.",
  },
  "Fortune Teller": {
    tagline: "Predict a future outcome the viewer cares about.",
    example: "\"In 6 months, every gym account will be doing this format.\"",
    how: "Confidence sells the prediction. Hedging kills the hook. Pick something specific enough to be wrong about.",
  },
  Magician: {
    tagline: "Open with a visual reveal that creates intrigue without explanation.",
    example: "Hands holding an unexpected object, no text.",
    how: "The visual does the hook work. Talk after the viewer is committed. Top performers in cooking use this most.",
  },
  Contrarian: {
    tagline: "Challenge a common practice your audience does daily.",
    example: "\"Stop doing X. It's been wrong this whole time.\"",
    how: "Similar to Hot Take but framed as a correction. Works for tactical, executable critiques.",
  },
  Experimenter: {
    tagline: "Run a real test on camera and report what happened.",
    example: "\"I tried 5 [things] in 5 days. Here's what worked.\"",
    how: "The experiment IS the hook. Higher production effort but the format itself signals 'real findings, not opinion.'",
  },
  Teacher: {
    tagline: "Open with what you're about to teach in a single sentence.",
    example: "\"Today I'm gonna show you how to do X.\"",
    how: "Lowest-performing archetype across our data. Don't lead with the lesson. Lead with why it matters or what's wrong without it.",
  },
  Story: {
    tagline: "Open mid-narrative with a specific scene.",
    example: "\"My first viral video came at 2 AM after I almost gave up.\"",
    how: "Specificity sells the story. Generic openers ('Let me tell you about the time...') kill it.",
  },
  "FaceTime Energy": {
    tagline: "Direct, conversational opener as if FaceTiming a friend.",
    example: "\"Okay so this is wild. You have to see this.\"",
    how: "Works for parasocial creators with established audiences. Underperforms for new accounts because there's no relationship to lean on yet.",
  },
};
