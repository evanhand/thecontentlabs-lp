import { ArrowRight, Check, ChevronRight, Minus } from 'lucide-react';
import { PublicNav } from '@/components/PublicNav';
import { Footer } from '@/components/landing/Footer';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { CONTAINER, H1, LEAD, Reveal, Section, SectionHeading } from '@/components/landing/Section';

const comparisons = [
  {
    title: 'The Content Labs vs ChatGPT',
    description:
      'ChatGPT gives generic content advice. We build personalized strategies from your actual data: audits, competitors, and niche trends.',
    slug: 'content-labs-vs-chatgpt',
    badge: 'Most Read',
  },
  {
    title: 'The Content Labs vs Later',
    description:
      'Later schedules your posts. We tell you what to post. Strategy first, scheduling second. Different tools for different problems.',
    slug: 'content-labs-vs-later',
    badge: null,
  },
  {
    title: 'The Content Labs vs Jasper',
    description:
      'Jasper writes blog copy and ads. We build video content strategies from real performance data. Different tools, different outputs.',
    slug: 'content-labs-vs-jasper',
    badge: null,
  },
  {
    title: 'Best AI Content Strategy Tools (2026)',
    description:
      'Side-by-side comparison of the top 6 AI tools for content creators: features, pricing, and who each one is best for.',
    slug: 'best-ai-content-strategy-tools',
    badge: 'Roundup',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://thecontentlabs.app/',
    },
    { '@type': 'ListItem', position: 2, name: 'Compare' },
  ],
};

// At-a-glance matrix. Every cell is sourced from the comparison posts
// (content/blog/content-labs-vs-*.mdx and best-ai-content-strategy-tools.mdx).
type Mark = boolean | string;
const TOOLS = ['The Content Labs', 'ChatGPT', 'Later', 'Jasper'] as const;
const MATRIX: { feature: string; values: [Mark, Mark, Mark, Mark] }[] = [
  { feature: 'Analyzes your own videos', values: [true, false, false, false] },
  { feature: 'Competitor video analysis', values: [true, false, false, false] },
  { feature: 'Hook data per niche', values: [true, false, false, false] },
  { feature: '30-day strategy and calendar', values: [true, false, false, false] },
  { feature: 'Video scripts with data-backed hooks', values: [true, false, false, false] },
  { feature: 'Post scheduling and publishing', values: [false, false, true, false] },
  { feature: 'Blog, ad and email copy', values: [false, true, 'Basic', true] },
];

function MarkCell({ value }: { value: Mark }) {
  if (value === true) {
    return (
      <>
        <Check className="h-4 w-4 text-ink mx-auto" aria-hidden="true" />
        <span className="sr-only">Yes</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <Minus className="h-4 w-4 text-ink-3/60 mx-auto" aria-hidden="true" />
        <span className="sr-only">No</span>
      </>
    );
  }
  return <span className="text-sm text-ink-2">{value}</span>;
}

const DIFFERENCES = [
  {
    title: 'Built on real data',
    desc: "Every strategy comes from analyzed videos - your content, your competitors, your niche. Not a language model guessing.",
  },
  {
    title: 'Strategy, not just content',
    desc: "We don't just write copy. We build full strategies: content pillars, hook frameworks, posting cadence, and growth levers.",
  },
  {
    title: 'For video creators',
    desc: 'Purpose-built for TikTok, YouTube Shorts, and Instagram Reels. Not a generic writing tool adapted for video.',
  },
  {
    title: 'Full scripts included',
    desc: 'Your content calendar comes with complete scripts, hooks, and CTAs. Not just topic ideas - everything you need to film.',
  },
];

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-canvas text-ink overflow-x-clip">
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PublicNav />

      <main>
        {/* Hero */}
        <section className="pt-28 sm:pt-32 pb-12 sm:pb-16">
          <div className={CONTAINER}>
            <nav aria-label="Breadcrumb" className="mb-10 sm:mb-12">
              <ol className="flex items-center gap-1 text-meta text-ink-3">
                <li>
                  <a href="/" className="hover:text-ink transition-colors">
                    Home
                  </a>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li>
                  <span className="text-ink-2">Compare</span>
                </li>
              </ol>
            </nav>

            <h1 className={H1}>How we compare</h1>
            <p className={`${LEAD} mt-6`}>
              Honest breakdowns of how The Content Labs stacks up against other AI
              tools. We built something different. Here&apos;s why.
            </p>
          </div>
        </section>

        {/* At a glance */}
        <section className="pb-20 sm:pb-28">
          <div className={CONTAINER}>
            <Reveal className="lab-card relative overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <caption className="sr-only">The Content Labs compared with ChatGPT, Later and Jasper</caption>
                <thead>
                  <tr className="border-b border-line/[0.08]">
                    <th scope="col" className="py-4 px-5 sm:px-6 text-meta font-medium text-ink-3">Feature</th>
                    {TOOLS.map((tool, i) => (
                      <th
                        key={tool}
                        scope="col"
                        className={`py-4 px-3 text-center text-sm font-semibold text-ink ${i === 0 ? 'bg-sunken/50' : ''}`}
                      >
                        {tool}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/[0.08]">
                  {MATRIX.map((row) => (
                    <tr key={row.feature}>
                      <th scope="row" className="py-3.5 px-5 sm:px-6 text-sm font-normal text-ink">
                        {row.feature}
                      </th>
                      {row.values.map((v, i) => (
                        <td key={TOOLS[i]} className={`py-3.5 px-3 text-center ${i === 0 ? 'bg-sunken/50' : ''}`}>
                          <MarkCell value={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </section>

        {/* Full comparisons */}
        <Section className="!pt-0">
          <Reveal>
            <SectionHeading title="Read the full breakdowns" />
          </Reveal>
          <Reveal className="lab-card divide-y divide-line/[0.08] overflow-hidden">
            {comparisons.map((item) => (
              <a
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group flex items-center justify-between gap-6 p-5 sm:p-6 hover:bg-sunken/60 transition-colors duration-150"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5">
                    <h2 className="text-[15px] font-semibold text-ink">{item.title}</h2>
                    {item.badge && (
                      <span className="inline-flex items-center h-6 px-2.5 rounded-full bg-sunken text-xs font-medium text-ink-2">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-body text-ink-2 max-w-[65ch]">{item.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-ink-3 group-hover:text-ink group-hover:translate-x-0.5 transition-[color,transform] duration-150 flex-shrink-0" />
              </a>
            ))}
          </Reveal>
        </Section>

        {/* Why We're Different */}
        <Section className="!pt-0">
          <Reveal>
            <SectionHeading title="What makes us different" />
          </Reveal>
          <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
            {DIFFERENCES.map((item) => (
              <div key={item.title} className="border-t border-line/[0.14] pt-6">
                <h3 className="text-[15px] font-semibold text-ink mb-2">{item.title}</h3>
                <p className="text-body text-ink-2">{item.desc}</p>
              </div>
            ))}
          </Reveal>
        </Section>

        <FinalCTA
          title="See it for yourself"
          body="Get a free content audit - no credit card required. See how your content stacks up before you commit."
          ctaLabel="Get Your Free Content Audit"
          ctaHref="https://thecontentlabs.app/register"
          footnote={null}
        />
      </main>

      <Footer />
    </div>
  );
}
