import { Metadata } from "next";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/landing/Footer";
import {
  CTA,
  DataBarChart,
  HookExample,
  StatCard,
  StatGrid,
} from "@/components/blog/MDXComponents";

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
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-mono uppercase tracking-wider">
        New
      </span>
    );
  const isUp = delta > 0;
  const isFlat = delta === 0;
  const Icon = isUp ? ArrowUp : isFlat ? Minus : ArrowDown;
  const cls = isUp
    ? "bg-emerald-100 text-emerald-700"
    : isFlat
      ? "bg-slate-100 text-slate-500"
      : "bg-red-100 text-red-700";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${cls} tabular-nums`}
    >
      <Icon className="h-3 w-3" />
      {Math.abs(delta)}%
    </span>
  );
}

export default function TrendsPage() {
  return (
    <div className="min-h-screen bg-[#fffbf9]">
      <PublicNav />

      {/* ========== Header ========== */}
      <section className="relative pt-32 sm:pt-36 pb-10 sm:pb-14 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,23,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          aria-hidden
          className="absolute -top-20 right-0 -z-10 h-[420px] w-[420px] rounded-full bg-content-coral/15 blur-[120px]"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <span
              aria-hidden
              className="h-2 w-2 rounded-full bg-content-coral animate-pulse"
            />
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-content-coral font-bold">
              Monthly trends report · {EDITION.month}
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 items-end">
            <h1 className="font-heading font-semibold text-slate-900 tracking-tight leading-[1.02] text-[40px] sm:text-5xl lg:text-[58px]">
              What&rsquo;s actually winning on TikTok and Instagram right now
              <span className="text-content-coral">.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed lg:max-w-md lg:justify-self-end lg:text-right">
              Live cuts from {EDITION.videosAnalyzed.toLocaleString()} videos
              analyzed this month. Updated on the 1st. Built for creators who
              want signal, not vibes.
            </p>
          </div>
        </div>
      </section>

      {/* ========== Stat strip ========== */}
      <section className="px-4 sm:px-6 lg:px-8 mb-10">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-6 sm:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-3xl sm:text-4xl font-heading font-semibold text-slate-900 tabular-nums">
                  {EDITION.videosAnalyzed.toLocaleString()}
                </p>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mt-1">
                  videos this month
                </p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-heading font-semibold text-slate-900 tabular-nums">
                  Hot Take
                </p>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mt-1">
                  most consistent hook
                </p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-heading font-semibold text-slate-900 tabular-nums">
                  Skit
                </p>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mt-1">
                  top format (255K median)
                </p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-heading font-semibold text-content-coral tabular-nums">
                  +27%
                </p>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mt-1">
                  median reach vs July
                </p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-[11px] font-mono uppercase tracking-wider text-slate-400">
            data as of {EDITION.asOf}
          </p>
        </div>
      </section>

      {/* ========== Hook leaderboard ========== */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-6 border-b border-slate-200 pb-4">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-content-coral font-bold mb-2">
                01 · Hook leaderboard
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
                Hook archetypes ranked by median views
              </h2>
            </div>
            <span className="hidden sm:block text-[11px] font-mono uppercase tracking-wider text-slate-500 tabular-nums">
              {EDITION.month}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
            <DataBarChart
              data={HOOKS.map((h) => ({ archetype: h.archetype, median: h.median }))}
              xKey="archetype"
              yKey="median"
              title=""
              yLabel="Median views"
              height={360}
              horizontal
            />

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-4">
                vs. July 2026
              </p>
              <ul className="space-y-3">
                {HOOKS.map((h) => (
                  <li
                    key={h.archetype}
                    className="flex items-center justify-between gap-3 py-2 border-b border-slate-100 last:border-0"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 leading-tight">
                        {h.archetype}
                      </p>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-0.5 tabular-nums">
                        n={h.n}
                      </p>
                    </div>
                    <DeltaPill delta={h.delta} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-6 text-sm text-slate-600 leading-relaxed max-w-3xl">
            <strong className="text-slate-900">The story:</strong> reach
            expanded almost everywhere this month. Contrarian more than doubled
            (+128%), Fortune Teller jumped +52%, Investigator +35%. Hot Take
            dipped slightly (-10%) but still holds the top median at 93K, so
            it remains the workhorse. Teacher went nowhere again (+5% on the
            lowest median by far). If you're choosing what to film this week:
            a Hot Take for the floor, a Contrarian for the upside.
          </p>
        </div>
      </section>

      {/* ========== Format leaderboard ========== */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-6 border-b border-slate-200 pb-4">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-content-coral font-bold mb-2">
                02 · Format leaderboard
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
                The format gap is enormous this month
              </h2>
            </div>
          </div>

          <DataBarChart
            data={FORMATS.map((f) => ({ name: f.name, median: f.median }))}
            xKey="name"
            yKey="median"
            title=""
            yLabel="Median views"
            height={360}
            horizontal
          />

          <p className="mt-6 text-sm text-slate-600 leading-relaxed max-w-3xl">
            <strong className="text-slate-900">The story:</strong> Skit content
            (255K median) is pulling about 11x what plain talking-head content
            gets (22.7K median, n=165, still the most common format and still
            the worst-performing). Layered talking head (voiceover + B-roll on
            top) runs 170K, roughly 7x the plain version. The lesson hasn't
            changed since spring: the camera-on-face format isn't the problem,
            the lack of a second visual layer is.
          </p>
        </div>
      </section>

      {/* ========== Viral examples ========== */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-6 border-b border-slate-200 pb-4">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-content-coral font-bold mb-2">
                03 · This month&rsquo;s biggest hits
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
                Top virals from {EDITION.month}
              </h2>
            </div>
          </div>

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

      {/* ========== Subscribe / CTA ========== */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <CTA
            headline="Stop chasing trends. Get a calendar built from this data, automatically."
            sub="The Content Labs runs the same trend cuts you're reading here on your own account every week. Connect TikTok and Instagram, get a 30-day script calendar tuned to what's actually winning in your niche right now."
            primary="Audit my account free"
            secondary="See how it works"
            secondaryHref="/features/content-strategy"
          />

          <p className="mt-8 text-center text-[11px] font-mono uppercase tracking-[0.18em] text-slate-400">
            Next edition: September 1, 2026
          </p>
        </div>
      </section>

      {/* ========== Methodology ========== */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-3xl mx-auto rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500 mb-3">
            Methodology
          </p>
          <h3 className="font-heading text-lg font-semibold text-slate-900 mb-3">
            How this report is generated
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            Pulled from 460 TikTok and Instagram videos posted in
            {" "}{EDITION.month} that we&rsquo;ve analyzed across hook archetype,
            format, runtime, and emotional trigger. Buckets shown only when
            n&nbsp;&geq;&nbsp;20 to avoid noise.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            Median views (not average) is the headline metric. A handful of
            celebrity virals can pull averages 10-20x higher than what a
            working creator should expect. Median is the honest summary.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Pulled from our analyzed video dataset on {EDITION.asOf}.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
