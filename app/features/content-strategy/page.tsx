import type { Metadata } from 'next';
import { Brain } from 'lucide-react';
import { FeaturePageTemplate } from '@/components/templates/FeaturePageTemplate';
import type { FeaturePageConfig } from '@/components/templates/FeaturePageTemplate';

const config: FeaturePageConfig = {
  slug: 'content-strategy',
  title: 'Content Strategy',
  pageTitle: 'AI Content Strategy for Creators - Data-Driven Plans | The Content Labs',
  metaDescription: 'Get a personalized content strategy built from your performance data, competitor analysis, and niche trends. Not generic advice - a real strategy based on what\'s working in your space.',
  heroTagline: 'Strategy Engine',
  heroHeadline: 'A content strategy built from data, not guesswork',
  heroDescription: 'Our AI combines your content audit, competitor intelligence, and niche trend data to build a strategy tailored to your goals. Content pillars, posting cadence, hook frameworks, and growth levers - all personalized.',
  icon: Brain,
  iconColor: 'text-purple-600',
  iconBg: 'bg-purple-100',
  benefits: [
    { title: 'Personalized Content Pillars', description: 'Discover which content themes drive the most engagement in your niche, then build your strategy around them.' },
    { title: 'Hook Frameworks', description: 'Get proven hook templates based on what\'s working for top creators in your space. Adapted to your style and topics.' },
    { title: 'Growth Levers', description: 'Identify the specific actions that will move the needle - whether it\'s posting frequency, content format, or topic selection.' },
    { title: 'Niche Positioning', description: 'Understand where you fit in your niche landscape and how to differentiate from competitors covering similar topics.' },
    { title: 'Performance Insights', description: 'See patterns across your content and your competitors\'. Know which formats, topics, and styles are trending up or down.' },
    { title: 'Actionable Roadmap', description: 'Not a 50-page deck. A clear, actionable plan you can start executing immediately.' },
  ],
  howItWorks: [
    { step: '1', title: 'Connect and configure', description: 'Link your social accounts, add competitors, and tell us your goals. The setup wizard takes about 5 minutes.' },
    { step: '2', title: 'AI builds your strategy', description: 'We analyze your content, your competitors, and your niche to create a personalized strategy: content pillars, hook frameworks, posting cadence, and more.' },
    { step: '3', title: 'Execute with confidence', description: 'Use your strategy to guide your content calendar. Pro and Studio plans get automatic strategy refreshes every time new content is detected.' },
  ],
  cta: 'Stop posting randomly. Start posting strategically.',
  faq: [
    { q: 'How is this different from asking ChatGPT for a strategy?', a: 'ChatGPT has no access to your content data, your competitors, or real performance metrics from your niche. Our strategies are built from actual video analysis data: what hooks are working, what topics are trending, what your competitors are doing. It\'s the difference between generic advice and a real strategy.' },
    { q: 'How often should I regenerate my strategy?', a: 'Pro and Studio plans automatically refresh your strategy whenever new content is detected \u2014 typically daily. Starter plans can regenerate once per week. Your strategy stays current as trends shift and your content evolves.' },
    { q: 'Does this work for small creators?', a: 'Yes. In fact, it\'s most valuable for smaller creators who can\'t afford a $2,000-5,000/month content strategist. You get the same data-driven output starting at $39/month.' },
    { q: 'What if I\'m in a niche you haven\'t seen before?', a: 'Our AI has analyzed videos across 50+ niches. Even for uncommon niches, we analyze your specific content and competitors to build a relevant strategy. The data comes from your space, not a generic template.' },
  ],
};

export const metadata: Metadata = {
  title: config.pageTitle,
  description: config.metaDescription,
  openGraph: {
    title: config.pageTitle,
    description: config.metaDescription,
    url: `https://thecontentlabs.app/features/${config.slug}`,
    images: ['https://thecontentlabs.app/og-image.png'],
  },
  alternates: {
    canonical: `https://thecontentlabs.app/features/${config.slug}`,
  },
};

export default function ContentStrategyPage() {
  return <FeaturePageTemplate config={config} />;
}
