import { Metadata } from "next";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/landing/Footer";
import {
  CTA,
  DataBarChart,
  HookExample,
} from "@/components/blog/MDXComponents";
import { ResourceHeader } from "@/components/blog/ResourceHeader";

export const metadata: Metadata = {
  title:
    "What's Trending on TikTok and Instagram This Month | The Content Labs Trends Report",
  description:
    "Live monthly trends report. Top hook archetypes, formats, and viral videos from the TikTok and Instagram videos we analyze every month. Updated on the 1st of every month.",
  alternates: { canonical: "https://thecontentlabs.app/trends" },
  openGraph: {
    title: "Trends — The Content Labs",
    description:
      "What's actually winning on TikTok and Instagram this month. Updated monthly.",
    url: "https://thecontentlabs.app/trends",
    images: ["https://thecontentlabs.app/og-image.png"],
  },
};

const EDITION = {
  month: "August 2026",
  monthSlug: "august-2026",
  videosAnalyzed: 460,
  asOf: "August 20, 2026",
};

const HOOKS = [
  { archetype: "Hot Take", median: 93100, n: 98, prior: 103700, delta: -10 },
  { archetype: "Investigator", median: 69300, n: 121, prior: 51424, delta: 35 },
  { archetype: "Fortune Teller", median: 58657, n: 51, prior: 38647, delta: 52 },
  { archetype: "Contrarian", median: 34200, n: 61, prior: 15024, delta: 128 },
  { archetype: "Teacher", median: 6469, n: 51, prior: 6132, delta: 5 },
] as const;

const FORMATS = [
  { name: "Skit", median: 255400, n: 25 },
  { name: "Talking Head + Voiceover + B-Roll", median: 170433, n: 25 },
  { name: "Mixed", median: 88590, n: 64 },
  { name: "Greenscreen", median: 83142, n: 42 },
  { name: "Voiceover + B-Roll", median: 25620, n: 26 },
  { name: "Talking Head (plain)", median: 22700, n: 165 },
] as const;

const TOP_VIRALS = [
  {
    handle: "benlikessports",
    platform: "TikTok",
    views: "2.0M",
    text: "I really don't need you on my bumper right now, man",
    url: "https://www.tiktok.com/@benlikessports/video/7673216728167451934",
    hook: "Commentary · Skit",
  },
  {
    handle: "jackmacbarstool",
    platform: "TikTok",
    views: "1.8M",
    text: "Sophie Cunningham was assaulted on the basketball court today",
    url: "https://www.tiktok.com/@jackmacbarstool/video/7671771746189561101",
    hook: "Hot Take · Talking Head",
  },
  {
    handle: "theballboypodcast",
    platform: "Instagram",
    views: "1.6M",
    text: "Can we talk about the Raiders drafting a demigod at running back?",
    url: "https://www.instagram.com/p/DcAWTQkts3N/",
    hook: "Hot Take · Mixed",
  },
  {
    handle: "hammy.golf",
    platform: "TikTok",
    views: "1.4M",
    text: "Wow, went in the face. Might need a different club to be honest.",
    url: "https://www.tiktok.com/@hammy.golf/video/7668869769247886605",
    hook: "Experimenter · Skit",
  },
  {
    handle: "cleoabram",
    platform: "Instagram",
    views: "1.4M",
    text: "The Sun isn't the center of our solar system! At least not right now.",
    url: "https://www.instagram.com/p/DblYaBMoS6k/",
    hook: "Contrarian · Mixed",
  },
] as const;

function DeltaPill({ delta }: { delta: number | null }) {
  if (delta === null)
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sunken text-ink-2 text-xs font-medium">
        New
      </span>
    );
  const isUp = delta > 0;
  const isFlat = delta === 0;
  const Icon = isUp ? ArrowUp : isFlat ? Minus : ArrowDown;
  const cls = isUp
    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
    : isFlat
      ? "bg-sunken text-ink-2"
      : "bg-red-500/10 text-red-700 dark:text-red-300";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cls} tabular-nums`}
    >
      <Icon className="h-3 w-3" />
      {Math.abs(delta)}%
    </span>
  );
}

const STATS = [
  { value: EDITION.videosAnalyzed.toLocaleString(), label: "videos this month" },
  { value: "Hot Take", label: "most consistent hook" },
  { value: "Skit", label: "top format (255K median)" },
  { value: "+27%", label: "median reach vs July" },
];

function SectionHeading({ title, aside }: { title: string; aside?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 mb-6 sm:mb-8">
      <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-[-0.02em] leading-tight text-ink">
        {title}
      </h2>
      {aside && (
        <span className="hidden sm:block text-meta text-ink-3 tabular-nums whitespace-nowrap">
          {aside}
        </span>
      )}
    </div>
  );
}

export default function TrendsPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <PublicNav />

      <main>
        <ResourceHeader
          title="What’s actually winning on TikTok and Instagram right now"
          description={`Live cuts from ${EDITION.videosAnalyzed.toLocaleString()} videos analyzed this month. Updated on the 1st. Built for creators who want signal, not vibes.`}
          meta={`Monthly trends report · ${EDITION.month} · data as of ${EDITION.asOf}`}
        />

        {/* Stat strip */}
        <section className="pb-16 sm:pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <dl className="lab-card grid grid-cols-2 md:grid-cols-4 gap-6 p-5 sm:p-6">
              {STATS.map((st) => (
                <div key={st.label} className="flex flex-col-reverse gap-1">
                  <dt className="text-meta text-ink-3">{st.label}</dt>
                  <dd className="font-heading text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-ink tabular-nums">
                    {st.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Hook leaderboard */}
        <section className="py-16 sm:py-20 border-t border-line/[0.08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading title="Hook archetypes ranked by median views" aside={EDITION.month} />

            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5 lg:gap-8 items-start [&>figure]:my-0">
              <DataBarChart
                data={HOOKS.map((h) => ({ archetype: h.archetype, median: h.median }))}
                xKey="archetype"
                yKey="median"
                title=""
                yLabel="Median views"
                height={360}
                horizontal
              />

              <div className="lab-card p-5 sm:p-6">
                <h3 className="text-[15px] font-semibold text-ink mb-2">vs. July 2026</h3>
                <ul className="divide-y divide-line/[0.08]">
                  {HOOKS.map((h) => (
                    <li
                      key={h.archetype}
                      className="flex items-center justify-between gap-3 py-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ink leading-tight">
                          {h.archetype}
                        </p>
                        <p className="text-xs text-ink-3 mt-0.5 tabular-nums">
                          n={h.n}
                        </p>
                      </div>
                      <DeltaPill delta={h.delta} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-8 text-body sm:text-[17px] sm:leading-7 text-ink-2 max-w-[68ch]">
              <strong className="font-semibold text-ink">The story:</strong> reach
              expanded almost everywhere this month. Contrarian more than doubled
              (+128%), Fortune Teller jumped +52%, Investigator +35%. Hot Take
              dipped slightly (-10%) but still holds the top median at 93K, so
              it remains the workhorse. Teacher went nowhere again (+5% on the
              lowest median by far). If you're choosing what to film this week:
              a Hot Take for the floor, a Contrarian for the upside.
            </p>
          </div>
        </section>

        {/* Format leaderboard */}
        <section className="py-16 sm:py-20 border-t border-line/[0.08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 [&>figure]:my-0">
            <SectionHeading title="The format gap is enormous this month" />

            <DataBarChart
              data={FORMATS.map((f) => ({ name: f.name, median: f.median }))}
              xKey="name"
              yKey="median"
              title=""
              yLabel="Median views"
              height={360}
              horizontal
            />

            <p className="mt-8 text-body sm:text-[17px] sm:leading-7 text-ink-2 max-w-[68ch]">
              <strong className="font-semibold text-ink">The story:</strong> Skit content
              (255K median) is pulling about 11x what plain talking-head content
              gets (22.7K median, n=165, still the most common format and still
              the worst-performing). Layered talking head (voiceover + B-roll on
              top) runs 170K, roughly 7x the plain version. The lesson hasn't
              changed since spring: the camera-on-face format isn't the problem,
              the lack of a second visual layer is.
            </p>
          </div>
        </section>

        {/* Viral examples */}
        <section className="py-16 sm:py-20 border-t border-line/[0.08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading title={`Top virals from ${EDITION.month}`} />

            <div className="space-y-3">
              {TOP_VIRALS.map((v) => (
                <HookExample
                  key={v.handle + v.text}
                  quote={v.text}
                  creator={v.handle}
                  views={v.views + " · " + v.platform + " · " + v.hook}
                  url={v.url}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16 sm:pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <CTA
              headline="Stop chasing trends. Get a calendar built from this data, automatically."
              sub="The Content Labs runs the same trend cuts you're reading here on your own account every week. Connect TikTok and Instagram, get a 30-day script calendar tuned to what's actually winning in your niche right now."
              primary="Audit my account free"
              secondary="See how it works"
              secondaryHref="/features/content-strategy"
            />

            <p className="mt-6 text-center text-meta text-ink-3">
              Next edition: September 1, 2026
            </p>
          </div>
        </section>

        {/* Methodology */}
        <section className="pb-20 sm:pb-28">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="lab-card p-5 sm:p-6">
              <h3 className="font-heading text-section text-ink mb-3">
                How this report is generated
              </h3>
              <div className="space-y-3 text-body text-ink-2">
                <p>
                  Pulled from 460 TikTok and Instagram videos posted in
                  {" "}{EDITION.month} that we&rsquo;ve analyzed across hook archetype,
                  format, runtime, and emotional trigger. Buckets shown only when
                  n&nbsp;&geq;&nbsp;20 to avoid noise.
                </p>
                <p>
                  Median views (not average) is the headline metric. A handful of
                  celebrity virals can pull averages 10-20x higher than what a
                  working creator should expect. Median is the honest summary.
                </p>
                <p>
                  Pulled from our analyzed video dataset on {EDITION.asOf}.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
