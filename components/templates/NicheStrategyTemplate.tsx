import { ArrowRight, Check } from 'lucide-react';
import { RelatedResources, getNicheRelated } from '@/components/blog/BlogComponents';
import { ArticleLayout } from '@/components/blog/ArticleLayout';

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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "datePublished": "2026-03-12",
    "dateModified": "2026-03-12",
    "author": { "@type": "Organization", "name": "The Content Labs", "url": "https://thecontentlabs.app" },
    "publisher": { "@type": "Organization", "name": "The Content Labs", "url": "https://thecontentlabs.app" },
    "mainEntityOfPage": canonical,
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  const h2 = "font-heading text-[24px] sm:text-[28px] font-semibold tracking-[-0.02em] leading-tight text-ink mb-4";
  const p = "text-[17px] leading-7 text-ink-2";

  return (
    <ArticleLayout
      crumbs={[{ label: `AI Content Strategy for ${niche}` }]}
      title={`AI Content Strategy for ${niche} Creators`}
      date="2026-03-12"
      readingTime="8 min read"
      schemas={[articleSchema, faqSchema]}
    >
        <div className="space-y-14">
          {/* Definition block */}
          <section>
            <p className="text-lg leading-8 text-ink">
              <strong className="font-semibold">AI content strategy for {nicheAdjective} creators</strong> uses artificial intelligence to analyze competitor videos, performance data, and viral trends specifically within the {nicheAdjective} niche to build personalized content plans. Instead of guessing what to post, {nicheAdjective} creators get a data-driven 30-day content calendar with full scripts, hooks, and CTAs based on what&apos;s actually performing in their space.
            </p>
            {statsNote && <p className="text-meta text-ink-3 mt-3">{statsNote}</p>}
          </section>

          {/* Pain points */}
          <section>
            <h2 className={h2}>Common Challenges for {niche} Creators</h2>
            <p className={`${p} mb-4`}>
              {niche} is one of the most competitive niches on social media. Here&apos;s what most {nicheAdjective} creators struggle with:
            </p>
            <ul className="pl-5 list-disc marker:text-ink-3 space-y-2 text-[17px] leading-7 text-ink-2">
              {painPoints.map(point => (
                <li key={point} className="pl-1">{point}</li>
              ))}
            </ul>
          </section>

          {/* Content pillars */}
          <section>
            <h2 className={h2}>Recommended Content Pillars for {niche}</h2>
            <p className={`${p} mb-6`}>
              Based on our analysis of top-performing {nicheAdjective} content across thousands of videos, these content pillars consistently drive engagement:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contentPillars.map(({ pillar, examples }) => (
                <div key={pillar} className="lab-card p-5">
                  <h3 className="text-[15px] font-semibold text-ink mb-2">{pillar}</h3>
                  <ul className="text-sm text-ink-2 space-y-1.5">
                    {examples.map(ex => (
                      <li key={ex} className="flex items-start gap-2">
                        <Check aria-hidden className="h-3.5 w-3.5 text-ink-3 flex-shrink-0 mt-1" />
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
            <h2 className={h2}>High-Performing Hooks for {niche} Content</h2>
            <p className={`${p} mb-4`}>
              The first 1-3 seconds determine whether someone watches or scrolls. These hook patterns consistently outperform in the {nicheAdjective} niche:
            </p>
            <div className="space-y-3">
              {hookExamples.map((hook, i) => (
                <div key={i} className="bg-surface border border-line/[0.08] rounded-xl px-5 py-3">
                  <p className="text-ink font-medium">&ldquo;{hook}&rdquo;</p>
                </div>
              ))}
            </div>
            <p className="text-meta text-ink-3 mt-4">
              These hooks are derived from patterns in top-performing {nicheAdjective} videos. The Content Labs generates custom hooks based on what&apos;s working for your specific competitors.
            </p>
          </section>

          {/* How TCL helps */}
          <section>
            <h2 className={h2}>How The Content Labs Works for {niche} Creators</h2>
            <ol className="space-y-5">
              {[
                { step: '1. Add your competitors', desc: `Tell us which ${nicheAdjective} creators you want to analyze. We'll break down their top-performing videos, hooks, formats, and posting patterns.` },
                { step: '2. Get your content audited', desc: `We analyze your existing ${nicheAdjective} content to identify what's working, what's not, and why. You'll know exactly what to change.` },
                { step: '3. Receive your 30-day plan', desc: `Get a personalized content calendar with full scripts, hooks, and CTAs — all based on what's driving results in the ${nicheAdjective} niche right now.` },
                { step: '4. Ask The Chemist', desc: `Your AI strategist knows your ${nicheAdjective} niche, your competitors, and your performance data. Ask it anything, 24/7.` },
              ].map(item => (
                <li key={item.step} className="border-t border-line/[0.08] pt-4">
                  <h3 className="text-[17px] font-semibold text-ink mb-1">{item.step}</h3>
                  <p className={p}>{item.desc}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ */}
          <section>
            <h2 className={h2}>Frequently Asked Questions</h2>
            <div className="divide-y divide-line/[0.08] border-y border-line/[0.08]">
              {faqs.map(item => (
                <div key={item.q} className="py-5">
                  <h3 className="text-[17px] font-semibold text-ink mb-2">{item.q}</h3>
                  <p className="text-body text-ink-2">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="lab-card p-5 sm:p-8 text-center">
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-ink mb-3">Get Your {niche} Content Strategy</h2>
            <p className="text-body text-ink-2 mb-6 max-w-xl mx-auto">
              The Content Labs builds your personalized {nicheAdjective} content strategy from real data — competitor analysis, niche trends, and your performance. Full 30-day plan with scripts included.
            </p>
            <a
              href="/pricing"
              className="group inline-flex items-center h-11 px-5 bg-content-coral rounded-[10px] text-sm font-medium text-white transition-[background-color,transform] duration-150 hover:bg-content-coral/90 active:scale-[0.97]"
            >
              Get Your Free Audit
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <p className="text-meta text-ink-3 mt-3">Plans from $39/mo &middot; Free content audit in minutes</p>
          </section>

          <RelatedResources items={getNicheRelated(slug)} />
        </div>
    </ArticleLayout>
  );
}
