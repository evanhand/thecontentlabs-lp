import { PublicNav } from '@/components/PublicNav';
import { ArrowRight, ChevronRight, Scale } from 'lucide-react';

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

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PublicNav />

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"
      >
        <ol className="flex items-center gap-1 text-sm text-slate-400">
          <li>
            <a href="/" className="hover:text-slate-700 transition-colors">
              Home
            </a>
          </li>
          <li>
            <ChevronRight className="h-3 w-3" />
          </li>
          <li>
            <span className="text-slate-600">Compare</span>
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
          <Scale className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
          How We Compare
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Honest breakdowns of how The Content Labs stacks up against other AI
          tools. We built something different. Here&apos;s why.
        </p>
      </section>

      {/* Comparison Cards */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-4">
          {comparisons.map((item) => (
            <a
              key={item.slug}
              href={`/blog/${item.slug}`}
              className="group flex items-center justify-between p-6 bg-white border border-slate-200 rounded-xl hover:border-content-coral/30 hover:shadow-md transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-content-coral transition-colors">
                    {item.title}
                  </h2>
                  {item.badge && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-content-coral/10 text-content-coral">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-content-coral group-hover:translate-x-1 transition-all flex-shrink-0 ml-6" />
            </a>
          ))}
        </div>
      </section>

      {/* Why We're Different */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
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
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl border border-slate-200 p-5"
              >
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            See it for yourself
          </h2>
          <p className="text-slate-600 mb-8">
            Get a free content audit - no credit card required. See how your
            content stacks up before you commit.
          </p>
          <a
            href="https://thecontentlabs.app/register"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-content-cta-dark to-content-cta text-white rounded-xl font-bold shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all hover:scale-105 active:scale-95"
          >
            Get Your Free Content Audit
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 text-center">
        <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
          <a
            href="/"
            className="hover:text-slate-900 transition-colors"
          >
            &larr; Home
          </a>
          <span>&middot;</span>
          <a
            href="/pricing"
            className="hover:text-slate-900 transition-colors"
          >
            Pricing
          </a>
          <span>&middot;</span>
          <a
            href="/blog"
            className="hover:text-slate-900 transition-colors"
          >
            Resources
          </a>
        </div>
      </footer>
    </div>
  );
}
