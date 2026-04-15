import { ChevronLeft, ArrowRight, Check } from 'lucide-react';
import { Breadcrumbs, RelatedResources, getNicheRelated } from '@/components/blog/BlogComponents';

export interface NicheConfig {
  niche: string;
  slug: string;
  nicheAdjective: string;
  painPoints: string[];
  contentPillars: { pillar: string; examples: string[] }[];
  hookExamples: string[];
  faqExtra: { q: string; a: string }[];
  statsNote: string;
}

export function NicheStrategyPage({ config }: { config: NicheConfig }) {
  const { niche, slug, nicheAdjective, painPoints, contentPillars, hookExamples, faqExtra, statsNote } = config;

  const title = `AI Content Strategy for ${niche} Creators (2026 Guide)`;
  const description = `How to build an AI-powered content strategy for ${nicheAdjective} content. Learn what to post, how to analyze ${nicheAdjective} competitors, and get a 30-day content plan with full scripts. Based on data from 10,000+ analyzed videos across 50+ niches.`;
  const canonical = `https://thecontentlabs.app/blog/${slug}`;

  const faqs = [
    { q: `How do I create a content strategy for ${nicheAdjective} content?`, a: `Start by analyzing what's already working in the ${nicheAdjective} niche — your top-performing content and your competitors' best videos. Identify patterns in hooks, formats, and topics. Then build a 30-day content calendar based on those patterns. The Content Labs automates this entire process using AI and data from 10,000+ analyzed videos.` },
    { q: `What should ${nicheAdjective} creators post on TikTok?`, a: `The best content comes from analyzing what's performing in your specific niche right now. Common high-performing formats for ${nicheAdjective} creators include how-to content, myth-busting, behind-the-scenes, and personal story hooks. The Content Labs analyzes your competitors' top videos to tell you exactly what formats and topics work.` },
    { q: `Is AI content strategy worth it for ${nicheAdjective} creators?`, a: `Yes. ${nicheAdjective} creators who use data-driven strategy grow significantly faster than those who guess. A content strategist costs $2,000-5,000/month. The Content Labs gives you the same strategic output for $39-129/month, personalized to the ${nicheAdjective} niche.` },
    ...faqExtra,
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumbs items={[{ label: `AI Content Strategy for ${niche}` }]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": title,
          "description": description,
          "datePublished": "2026-03-12",
          "dateModified": "2026-03-12",
          "author": { "@type": "Organization", "name": "The Content Labs", "url": "https://thecontentlabs.app" },
          "publisher": { "@type": "Organization", "name": "The Content Labs", "url": "https://thecontentlabs.app" },
          "mainEntityOfPage": canonical,
        }) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a },
          })),
        }) }}
      />

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-4">
            <a href="/blog" className="hidden sm:inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Resources
            </a>
            <div>
              <p className="text-sm text-content-coral font-medium mb-1">Niche Guide</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">AI Content Strategy for {niche} Creators</h1>
              <p className="text-sm text-slate-500 mt-1">Last updated: March 12, 2026 &middot; 8 min read</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-10 space-y-10">

          {/* Definition block */}
          <section>
            <p className="text-lg text-slate-700 leading-relaxed font-medium">
              <strong>AI content strategy for {nicheAdjective} creators</strong> uses artificial intelligence to analyze competitor videos, performance data, and viral trends specifically within the {nicheAdjective} niche to build personalized content plans. Instead of guessing what to post, {nicheAdjective} creators get a data-driven 30-day content calendar with full scripts, hooks, and CTAs based on what&apos;s actually performing in their space.
            </p>
            {statsNote && <p className="text-sm text-slate-500 mt-3">{statsNote}</p>}
          </section>

          {/* Pain points */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Common Challenges for {niche} Creators</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {niche} is one of the most competitive niches on social media. Here&apos;s what most {nicheAdjective} creators struggle with:
            </p>
            <ul className="space-y-3">
              {painPoints.map(point => (
                <li key={point} className="flex gap-3 text-slate-600">
                  <span className="text-content-coral font-bold flex-shrink-0">&bull;</span>
                  {point}
                </li>
              ))}
            </ul>
          </section>

          {/* Content pillars */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Recommended Content Pillars for {niche}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Based on our analysis of top-performing {nicheAdjective} content across thousands of videos, these content pillars consistently drive engagement:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contentPillars.map(({ pillar, examples }) => (
                <div key={pillar} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-2">{pillar}</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {examples.map(ex => (
                      <li key={ex} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-content-coral flex-shrink-0 mt-0.5" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Hooks */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">High-Performing Hooks for {niche} Content</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              The first 1-3 seconds determine whether someone watches or scrolls. These hook patterns consistently outperform in the {nicheAdjective} niche:
            </p>
            <div className="space-y-3">
              {hookExamples.map((hook, i) => (
                <div key={i} className="bg-content-coral/5 border border-content-coral/15 rounded-lg px-5 py-3">
                  <p className="text-slate-800 font-medium italic">&ldquo;{hook}&rdquo;</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 mt-4">
              These hooks are derived from patterns in top-performing {nicheAdjective} videos. The Content Labs generates custom hooks based on what&apos;s working for your specific competitors.
            </p>
          </section>

          {/* How TCL helps */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">How The Content Labs Works for {niche} Creators</h2>
            <div className="space-y-4">
              {[
                { step: '1. Add your competitors', desc: `Tell us which ${nicheAdjective} creators you want to analyze. We'll break down their top-performing videos, hooks, formats, and posting patterns.` },
                { step: '2. Get your content audited', desc: `We analyze your existing ${nicheAdjective} content to identify what's working, what's not, and why. You'll know exactly what to change.` },
                { step: '3. Receive your 30-day plan', desc: `Get a personalized content calendar with full scripts, hooks, and CTAs — all based on what's driving results in the ${nicheAdjective} niche right now.` },
                { step: '4. Ask The Chemist', desc: `Your AI strategist knows your ${nicheAdjective} niche, your competitors, and your performance data. Ask it anything, 24/7.` },
              ].map(item => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-2 bg-content-coral/20 rounded-full flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{item.step}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map(item => (
                <div key={item.q} className="border-b border-slate-100 pb-5">
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{item.q}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-content-coral/5 to-content-coral/10 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Get Your {niche} Content Strategy</h2>
            <p className="text-slate-600 mb-6 max-w-xl mx-auto">
              The Content Labs builds your personalized {nicheAdjective} content strategy from real data — competitor analysis, niche trends, and your performance. Full 30-day plan with scripts included.
            </p>
            <a
              href="/pricing"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-content-cta-dark to-content-cta rounded-xl font-bold text-white shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Get Your Free Audit
              <ArrowRight className="ml-3 h-5 w-5" />
            </a>
            <p className="text-sm text-slate-500 mt-3">Plans from $39/mo &middot; Free content audit in minutes</p>
          </section>

          <RelatedResources items={getNicheRelated(slug)} />
        </article>
      </div>
    </div>
  );
}
