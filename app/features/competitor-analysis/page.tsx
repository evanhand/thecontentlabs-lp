import type { Metadata } from 'next';
import { Target } from 'lucide-react';
import { FeaturePageTemplate } from '@/components/templates/FeaturePageTemplate';
import type { FeaturePageConfig } from '@/components/templates/FeaturePageTemplate';

const config: FeaturePageConfig = {
  slug: 'competitor-analysis',
  title: 'Competitor Analysis',
  pageTitle: 'AI Competitor Analysis for Content Creators | The Content Labs',
  metaDescription: 'Analyze your competitors\' top-performing videos across TikTok, YouTube, and Instagram. See their hooks, content pillars, posting patterns, and what\'s actually driving their growth.',
  heroTagline: 'Competitor Intelligence',
  heroHeadline: 'See exactly what\'s working for your competitors',
  heroDescription: 'Stop guessing what to post. Our AI analyzes your competitors\' top-performing content - hooks, structure, topics, and posting patterns - so you can build a strategy based on proven data.',
  icon: Target,
  iconColor: 'text-blue-600',
  iconBg: 'bg-blue-100',
  benefits: [
    { title: 'Top-Performing Content', description: 'See which of your competitors\' videos are getting the most engagement and understand the patterns behind their success.' },
    { title: 'Hook Patterns', description: 'Reverse-engineer the opening hooks your competitors use most. See which styles drive the highest retention in your niche.' },
    { title: 'Content Pillars', description: 'Map out what topics your competitors cover and how often. Identify gaps in their strategy you can exploit.' },
    { title: 'Posting Cadence', description: 'Track when and how often competitors post. Find the patterns that correlate with their highest-performing content.' },
    { title: 'Cross-Platform Comparison', description: 'Compare competitor performance across TikTok, YouTube, and Instagram to see where they\'re strongest and weakest.' },
    { title: 'Growth Signals', description: 'Spot competitors who are accelerating. Early signals of what content types or strategies are about to trend in your niche.' },
  ],
  howItWorks: [
    { step: '1', title: 'Add your competitors', description: 'Enter the creators you want to track - up to 6 competitors across platforms on Starter and Pro, or 8 on Studio.' },
    { step: '2', title: 'AI scrapes and analyzes', description: 'We pull their recent videos and run the same deep analysis we do on your content - hooks, structure, engagement, and topics.' },
    { step: '3', title: 'Get actionable intel', description: 'See what\'s working, what topics to cover, and which hooks to adapt for your own content. Updated with every analysis cycle.' },
  ],
  cta: 'Know what your competitors know - and more.',
  heroImage: '/features/competitor-analysis.jpg',
  heroImageAlt: 'Competitor analysis dashboard showing top-performing videos and hook patterns',
  monitorLabel: 'competitor_analysis',
  faq: [
    { q: 'How many competitors can I track?', a: 'Starter and Pro plans include 6 competitors (3 per platform). Studio includes 8 competitors (4 per platform). Each competitor is analyzed with multiple videos.' },
    { q: 'Can I change my competitors later?', a: 'Yes. You can update your competitor list when you re-run your analysis. Swap out competitors anytime as your strategy evolves.' },
    { q: 'Do competitors know I\'m analyzing them?', a: 'No. We analyze publicly available content. Competitors are never notified and have no way to know they\'re being tracked.' },
    { q: 'How often is competitor data updated?', a: 'Data is refreshed each time you run a new analysis cycle. Starter and Pro get 1 cycle per month; Studio gets 2 cycles per month.' },
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

export default function CompetitorAnalysisPage() {
  return <FeaturePageTemplate config={config} />;
}
