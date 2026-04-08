import type { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { SolutionPageTemplate } from '@/components/templates/SolutionPageTemplate';
import type { SolutionPageConfig } from '@/components/templates/SolutionPageTemplate';

const config: SolutionPageConfig = {
  slug: 'personal-brands',
  personaName: 'Personal Brands',
  pageTitle: 'Content Labs for Personal Brands - Build Authority With Data-Driven Content | The Content Labs',
  metaDescription: 'Stand out in a crowded niche. Content Labs helps personal brand builders create authority-building content with AI-powered audits, strategy, and content planning.',
  heroTagline: 'Built for Personal Brands',
  heroHeadline: 'Build authority in your niche with content that actually compounds',
  heroDescription: 'Content Labs helps thought leaders, speakers, and consultants create a data-driven content strategy that builds real authority, not just vanity metrics.',
  icon: Sparkles,
  iconColor: 'text-content-coral',
  iconBg: 'bg-content-coral/10',
  painPoints: [
    'Content feels scattered with no clear positioning. You\'re posting about everything and building authority in nothing.',
    'Hard to stand out in a crowded niche when everyone is posting the same advice.',
    'Don\'t know which content drives authority and business opportunities vs. what\'s just noise.',
    'Spending time creating content that gets views but doesn\'t translate into speaking gigs, clients, or partnerships.',
  ],
  solutions: [
    { title: 'Content Audit Reveals What Resonates', description: 'Our AI analyzes your content to identify which topics, formats, and angles your audience connects with most. Stop guessing what resonates - see the data.' },
    { title: 'Strategy Built Around Your Unique Angle', description: 'Receive a content strategy built around your unique positioning. We help you find and double down on the content pillars that differentiate you from everyone else in your niche.' },
    { title: 'Calendar Focused on Authority-Building Content', description: 'Your AI-generated calendar is designed around content that builds authority - thought leadership, unique insights, and expertise-driven posts that compound over time.' },
    { title: 'See What Works for Top Voices in Your Space', description: 'Competitor analysis shows you what the most successful personal brands in your niche are doing, so you can learn from their strategy and differentiate from it.' },
  ],
  features: [
    { name: 'Content Strategy', description: 'Get a content strategy built around your unique expertise and positioning. Every recommendation is designed to build authority and attract the right audience to your brand.' },
    { name: 'Video Audit', description: 'Understand which of your content drives real authority. See what hooks, topics, and formats your audience responds to and which content just generates empty engagement.' },
    { name: 'Content Calendar', description: 'Receive a content calendar focused on authority-building content - thought leadership, case studies, unique insights - all planned and ready to execute.' },
    { name: 'The Chemist (AI Chat)', description: 'Brainstorm content angles, refine your messaging, and get instant feedback on ideas. The Chemist helps you find your unique voice and turn expertise into compelling content.' },
  ],
  howItWorks: [
    { step: '1', title: 'Connect Your Accounts', description: 'Link your social profiles where you\'re building your personal brand. We\'ll pull your content and performance data automatically.' },
    { step: '2', title: 'Get Your Audit', description: 'AI analyzes your content to identify which topics and formats build authority versus which are just noise. See exactly where your brand resonates most.' },
    { step: '3', title: 'Build Your Strategy', description: 'Receive a content strategy built around your unique positioning, with content pillars designed to establish you as the go-to voice in your niche.' },
    { step: '4', title: 'Plan & Execute', description: 'Use your authority-focused content calendar and AI tools to consistently publish content that builds your reputation and attracts opportunities.' },
  ],
  faq: [
    { q: 'How is this different from generic content planning tools?', a: 'Generic tools help you schedule posts. Content Labs builds you a strategy around your personal brand positioning. We analyze what content builds authority in your niche and create a plan that compounds your reputation over time.' },
    { q: 'I\'m in a really crowded niche. Can this help me stand out?', a: 'That\'s exactly what it\'s designed for. Our audit identifies the unique angles and topics where your content outperforms - your unfair advantage. Then we build a strategy that doubles down on what makes you different.' },
    { q: 'How much does Content Labs cost for personal brands?', a: 'Plans start at $39/mo. Most personal brand builders choose the Pro plan at $79/mo for expanded audits, competitor analysis, and unlimited AI chat to refine their messaging and strategy.' },
    { q: 'Can I see what other thought leaders in my space are doing?', a: 'Yes. Our Competitor Analysis feature lets you analyze any public account. See their content strategy, posting patterns, top-performing content, and engagement trends to inform your own strategy.' },
    { q: 'Will this help me get speaking gigs or consulting clients?', a: 'Content Labs helps you build the kind of content presence that attracts opportunities. By focusing on authority-building content instead of chasing views, you create a portfolio that positions you as an expert, which is exactly what event organizers and potential clients look for.' },
  ],
  cta: 'Stop blending in. Build a personal brand that opens doors.',
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

export default function PersonalBrandsPage() {
  return <SolutionPageTemplate config={config} />;
}
