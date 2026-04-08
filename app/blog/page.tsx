import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { PublicNav } from '@/components/PublicNav';

export const metadata: Metadata = {
  title: 'Resources — The Content Labs | Guides, Comparisons & Strategy Tips',
  description: 'Free guides, comparisons, and strategy tips for content creators. Learn about AI content strategy, TikTok growth, content calendars, and how The Content Labs compares to other tools.',
  alternates: { canonical: 'https://thecontentlabs.app/blog' },
  openGraph: {
    title: 'Resources — The Content Labs',
    description: 'Free guides and comparisons for content creators. AI content strategy, TikTok growth, and more.',
    url: 'https://thecontentlabs.app/blog',
    images: ['https://thecontentlabs.app/og-image.png'],
  },
};

const comparisons = [
  { title: 'The Content Labs vs ChatGPT', desc: 'Generic AI vs data-driven strategy. See why ChatGPT falls short for content planning.', slug: 'content-labs-vs-chatgpt' },
  { title: 'The Content Labs vs Later', desc: 'Strategy vs scheduling. Why you need to know what to post before you schedule it.', slug: 'content-labs-vs-later' },
  { title: 'The Content Labs vs Jasper', desc: 'Creator strategy vs AI writing. Different tools for different needs.', slug: 'content-labs-vs-jasper' },
  { title: 'Best AI Content Strategy Tools (2026)', desc: 'Side-by-side comparison of the top 6 AI tools for content creators.', slug: 'best-ai-content-strategy-tools' },
];

const guides = [
  { title: 'What Is AI Content Strategy?', desc: 'Definition, benefits, and how AI-powered strategy works for creators.', slug: 'what-is-ai-content-strategy' },
  { title: 'How to Build a TikTok Content Strategy', desc: '7-step framework based on data from 10,000+ analyzed videos.', slug: 'tiktok-content-strategy-guide' },
  { title: 'How to Create a Content Calendar', desc: 'Step-by-step guide with templates and AI automation tips.', slug: 'how-to-create-content-calendar' },
];

const nicheGuides = [
  { title: 'AI Content Strategy for Fitness', desc: 'Content pillars, hooks, and strategy tips for fitness creators.', slug: 'ai-content-strategy-fitness' },
  { title: 'AI Content Strategy for Real Estate', desc: 'Data-driven content plans for real estate agents and brokers.', slug: 'ai-content-strategy-real-estate' },
  { title: 'AI Content Strategy for Finance', desc: 'How finance creators can stand out with data-informed content.', slug: 'ai-content-strategy-finance' },
  { title: 'AI Content Strategy for Cooking & Food', desc: 'Hook patterns and content pillars for food creators.', slug: 'ai-content-strategy-cooking' },
  { title: 'AI Content Strategy for Coaching', desc: 'Turn content into clients with a strategic approach.', slug: 'ai-content-strategy-coaching' },
  { title: 'AI Content Strategy for E-commerce', desc: 'Content strategy for DTC brands and e-commerce creators.', slug: 'ai-content-strategy-ecommerce' },
];

function ResourceCard({ title, desc, slug }: { title: string; desc: string; slug: string }) {
  return (
    <a
      href={`/blog/${slug}`}
      className="group block bg-white rounded-xl border border-slate-200 p-6 hover:border-content-coral/30 hover:shadow-md transition-all duration-200"
    >
      <h3 className="text-base font-bold text-slate-900 group-hover:text-content-coral transition-colors mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed mb-3">{desc}</p>
      <span className="inline-flex items-center text-sm font-medium text-content-coral">
        Read more <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </a>
  );
}

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PublicNav />

      {/* Hero */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Resources for Creators</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Guides, comparisons, and strategy tips to help you grow — whether you use The Content Labs or not.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Comparisons */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-6">Comparisons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {comparisons.map(item => <ResourceCard key={item.slug} {...item} />)}
          </div>
        </section>

        {/* Guides */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-6">Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {guides.map(item => <ResourceCard key={item.slug} {...item} />)}
          </div>
        </section>

        {/* Niche Guides */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-2">AI Content Strategy by Niche</h2>
          <p className="text-slate-600 mb-6">Niche-specific guides with content pillars, hook examples, and strategy tips.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nicheGuides.map(item => <ResourceCard key={item.slug} {...item} />)}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-content-coral/5 to-content-coral/10 rounded-xl p-8 sm:p-10 text-center border border-content-coral/20">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Ready to Put Strategy Into Action?</h2>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            47,598+ creators use The Content Labs to turn data into content plans. Competitor analysis, 30-day calendars, and full scripts — starting at $39/mo.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-content-cta-dark to-content-cta rounded-xl font-bold text-white shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Get My 30-Day Content Plan
            <ArrowRight className="ml-3 h-5 w-5" />
          </a>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 text-center">
        <a href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
          &larr; Back to The Content Labs
        </a>
      </footer>
    </div>
  );
}
