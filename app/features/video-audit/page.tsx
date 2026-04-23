import type { Metadata } from 'next';
import { Microscope } from 'lucide-react';
import { FeaturePageTemplate } from '@/components/templates/FeaturePageTemplate';
import type { FeaturePageConfig } from '@/components/templates/FeaturePageTemplate';

const config: FeaturePageConfig = {
  slug: 'video-audit',
  title: 'Video Audit',
  pageTitle: 'AI Video Audit Tool - Analyze Your Content Performance | The Content Labs',
  metaDescription: 'Get AI-powered video audits that break down what\'s working, what\'s not, and exactly how to improve. Analyze hooks, retention, CTAs, and more across TikTok, YouTube Shorts, and Instagram Reels.',
  heroTagline: 'Content Audit',
  heroHeadline: 'Know exactly why your videos perform the way they do',
  heroDescription: 'Our AI analyzes your videos frame-by-frame: hooks, retention patterns, CTAs, pacing, and structure. Then it tells you exactly what to fix and what to double down on.',
  icon: Microscope,
  iconColor: 'text-content-coral',
  iconBg: 'bg-content-coral/10',
  benefits: [
    { title: 'Hook Analysis', description: 'See how your opening seconds compare to top performers in your niche. Get specific rewrites that match viral patterns.' },
    { title: 'Retention Scoring', description: 'Understand where viewers drop off and why. Get actionable fixes for pacing, transitions, and structure.' },
    { title: 'CTA Effectiveness', description: 'Measure how your calls-to-action perform and get data-backed suggestions for stronger closes.' },
    { title: 'Niche Benchmarking', description: 'Compare your metrics against top creators in your niche. Know where you stand and what "good" looks like.' },
    { title: 'Script Breakdown', description: 'Full structural analysis of your content (intro, body, outro) with specific improvement recommendations.' },
    { title: 'Trend Alignment', description: 'See how well your content aligns with what\'s currently working in your space. Spot opportunities you\'re missing.' },
  ],
  howItWorks: [
    { step: '1', title: 'Connect your accounts', description: 'Link your TikTok, YouTube, or Instagram in the setup wizard. We pull your recent content automatically.' },
    { step: '2', title: 'AI analyzes your videos', description: 'Our AI breaks down each video - hooks, structure, pacing, CTAs, and performance patterns - using data from 10,000+ analyzed videos.' },
    { step: '3', title: 'Get your audit report', description: 'Review detailed scores and specific recommendations for every video. See exactly what to change and what to keep.' },
  ],
  cta: 'Stop guessing. Start knowing what works.',
  heroImage: '/features/analytics.jpg',
  heroImageAlt: 'Video audit report with hook, retention, and CTA scoring',
  monitorLabel: 'video_audit',
  faq: [
    { q: 'How many videos can I audit per month?', a: 'Starter plans include 40 video audits per month. Pro gets 80, and Studio gets 160. Each audit gives you a full breakdown of hooks, retention, CTAs, and structure.' },
    { q: 'What platforms do you support?', a: 'We analyze content from TikTok, YouTube (including Shorts), and Instagram Reels. Connect one or all three during setup.' },
    { q: 'How is this different from native analytics?', a: 'Platform analytics tell you what happened (views, likes). Our audit tells you why it happened and how to improve. We analyze content structure, hook patterns, and compare against top performers in your niche.' },
    { q: 'Can I audit competitor videos too?', a: 'Competitor video analysis is part of our competitor analysis feature. Your video audit focuses on your own content performance.' },
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

export default function VideoAuditPage() {
  return <FeaturePageTemplate config={config} />;
}
