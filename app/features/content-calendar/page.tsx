import type { Metadata } from 'next';
import { LineChart } from 'lucide-react';
import { FeaturePageTemplate } from '@/components/templates/FeaturePageTemplate';
import type { FeaturePageConfig } from '@/components/templates/FeaturePageTemplate';

const config: FeaturePageConfig = {
  slug: 'content-calendar',
  title: 'Content Calendar',
  pageTitle: 'AI Content Calendar with Full Scripts | The Content Labs',
  metaDescription: 'Get a personalized 30-day content calendar with full scripts, hooks, and CTAs - built from what\'s actually working in your niche. Not generic templates. Data-driven content plans.',
  heroTagline: 'Content Calendar',
  heroHeadline: 'A 30-day content plan built from your data, not a template',
  heroDescription: 'Every content idea in your calendar comes from real performance data - your audits, your competitors\' top videos, and viral trends in your niche. Complete with full scripts, hooks, and CTAs.',
  icon: LineChart,
  iconColor: 'text-emerald-600',
  iconBg: 'bg-emerald-100',
  benefits: [
    { title: 'Full Scripts', description: 'Every calendar item includes a complete script: intro hook, body structure, and closing CTA. Ready to film, not just an idea.' },
    { title: 'Data-Driven Topics', description: 'Topics are selected based on what\'s performing in your niche right now, not generic suggestions pulled from a template library.' },
    { title: 'Hook Variations', description: 'Each script comes with multiple hook options tested against top-performing patterns in your space.' },
    { title: 'Content Pillars', description: 'Your calendar balances content across your key pillars (educational, entertaining, promotional, and personal) based on what works for creators like you.' },
    { title: 'Optimal Posting Schedule', description: 'Timing recommendations based on when your competitors\' content gets the most engagement.' },
    { title: 'Drag and Rearrange', description: 'Reorder your calendar to fit your schedule. Move ideas between days, mark items as complete, and track your progress.' },
  ],
  howItWorks: [
    { step: '1', title: 'Run your content formula', description: 'Complete the setup wizard with your accounts and competitors. Our AI builds your strategy from real data.' },
    { step: '2', title: 'Calendar generates automatically', description: 'Your personalized calendar appears with content ideas, full scripts, and a posting schedule - typically 21-60 items depending on your plan.' },
    { step: '3', title: 'Film, post, repeat', description: 'Use the scripts as-is or customize them with your voice. Mark items complete as you post, and regenerate when you need fresh ideas.' },
  ],
  cta: 'Never stare at a blank page again.',
  faq: [
    { q: 'How many content ideas do I get?', a: 'Starter includes 21 calendar items per generation. Pro includes 30, and Studio includes 60. Each comes with a full script, hooks, and CTAs.' },
    { q: 'Can I customize the scripts?', a: 'Absolutely. The scripts are a starting point built from data. Bring your voice and personality - that\'s what makes content stand out.' },
    { q: 'How often can I regenerate my calendar?', a: 'Starter and Pro plans include 1 calendar generation per month. Studio includes 2. Each generation creates a fresh batch of ideas based on latest data.' },
    { q: 'Is this just ChatGPT writing scripts?', a: 'No. Every script is informed by real performance data - your content audits, competitor analysis, and niche trends. ChatGPT doesn\'t have access to any of this data.' },
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

export default function ContentCalendarPage() {
  return <FeaturePageTemplate config={config} />;
}
