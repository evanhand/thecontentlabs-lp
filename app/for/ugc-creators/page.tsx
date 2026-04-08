import type { Metadata } from 'next';
import { Video } from 'lucide-react';
import { SolutionPageTemplate } from '@/components/templates/SolutionPageTemplate';
import type { SolutionPageConfig } from '@/components/templates/SolutionPageTemplate';

const config: SolutionPageConfig = {
  slug: 'ugc-creators',
  personaName: 'UGC Creators',
  pageTitle: 'Content Labs for UGC Creators - Data-Driven UGC That Brands Love | The Content Labs',
  metaDescription: 'Stop guessing what brands want. Content Labs helps UGC creators audit past performance, generate scroll-stopping hooks, and build data-backed scripts that convert.',
  heroTagline: 'Built for UGC Creators',
  heroHeadline: 'Create UGC that actually converts, backed by data, not guesswork',
  heroDescription: 'Content Labs analyzes what hooks, scripts, and formats drive real results so you can deliver content brands keep coming back for.',
  icon: Video,
  iconColor: 'text-content-coral',
  iconBg: 'bg-content-coral/10',
  painPoints: [
    'Inconsistent results - some videos crush it while others flop, and you don\'t know why.',
    'No data on what hooks or scripts actually drive conversions for brands.',
    'Spending hours scripting and brainstorming content ideas from scratch every time.',
    'Hard to know what brands actually want beyond vague creative briefs.',
  ],
  solutions: [
    { title: 'Audit Your Past Content Performance', description: 'Our AI breaks down every video you\'ve created - hooks, retention, CTAs, pacing - so you can see exactly what patterns drive results and replicate them.' },
    { title: 'AI-Generated Scripts & Hooks', description: 'Generate scroll-stopping hooks and full video scripts based on what\'s proven to work in your niche. No more staring at a blank page.' },
    { title: 'Data-Backed Strategy for Brand Pitches', description: 'Use your performance data to build a compelling case when pitching brands. Show them the numbers behind your content, not just follower count.' },
    { title: 'Know What Formats Convert', description: 'Competitor analysis reveals what top UGC creators in your space are doing differently - formats, lengths, hooks, and styles that get brands to re-book.' },
  ],
  features: [
    { name: 'Video Audit', description: 'Get a detailed breakdown of every video\'s performance - hooks, retention curves, CTAs, and structure - so you know exactly what to replicate and what to fix.' },
    { name: 'Content Strategy', description: 'Receive a personalized content strategy built from your actual data. Know which formats, topics, and styles deliver the best results for your UGC portfolio.' },
    { name: 'The Chemist (AI Chat)', description: 'Ask our AI chatbot anything about your content performance. Get instant answers, script ideas, and strategy advice tailored to your data.' },
    { name: 'Hook Generator', description: 'Generate proven hook variations for any brief or topic. Every suggestion is based on patterns from top-performing content in your niche.' },
  ],
  howItWorks: [
    { step: '1', title: 'Connect Your Accounts', description: 'Link your TikTok, Instagram, or YouTube where you post UGC. We\'ll pull your content data automatically.' },
    { step: '2', title: 'Get Your Audit', description: 'Our AI analyzes your UGC portfolio - hooks, scripts, retention, and CTAs - to identify what\'s driving results for brands.' },
    { step: '3', title: 'Build Your Strategy', description: 'Receive a personalized UGC strategy based on your performance data, including which formats and hooks convert best.' },
    { step: '4', title: 'Plan & Execute', description: 'Use AI-generated scripts, hooks, and your content calendar to deliver UGC that brands love, consistently.' },
  ],
  faq: [
    { q: 'How does Content Labs help me get more brand deals?', a: 'Content Labs gives you real performance data you can share with brands. Instead of just showing follower count, you can show hook effectiveness, retention rates, and CTA performance - the metrics brands actually care about.' },
    { q: 'Can I use the Hook Generator for brand briefs?', a: 'Absolutely. Paste in any brief or topic and the Hook Generator creates multiple scroll-stopping hook variations based on what\'s proven to work in that niche. It\'s like having a creative director on call.' },
    { q: 'How much does Content Labs cost for UGC creators?', a: 'Plans start at $39/mo for the Starter tier, which includes video audits, content strategy, and access to The Chemist AI chatbot. Most UGC creators find the Pro plan at $79/mo gives them everything they need.' },
    { q: 'Do I need a certain number of followers to use this?', a: 'Not at all. Content Labs analyzes your content quality and performance patterns, not vanity metrics. Whether you have 500 or 500,000 followers, the insights work the same.' },
    { q: 'What platforms does Content Labs support?', a: 'We support TikTok, Instagram Reels, and YouTube Shorts. Connect one or all three during onboarding and we\'ll analyze your content across platforms.' },
  ],
  cta: 'Stop guessing what brands want. Start proving it with data.',
};

export const metadata: Metadata = {
  title: config.pageTitle,
  description: config.metaDescription,
  openGraph: {
    title: config.pageTitle,
    description: config.metaDescription,
    url: `https://thecontentlabs.app/for/${config.slug}`,
    images: ['https://thecontentlabs.app/og-image.png'],
  },
  alternates: {
    canonical: `https://thecontentlabs.app/for/${config.slug}`,
  },
};

export default function UGCCreatorsPage() {
  return <SolutionPageTemplate config={config} />;
}
