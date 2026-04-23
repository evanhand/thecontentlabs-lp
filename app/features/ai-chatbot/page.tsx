import type { Metadata } from 'next';
import { Atom } from 'lucide-react';
import { FeaturePageTemplate } from '@/components/templates/FeaturePageTemplate';
import type { FeaturePageConfig } from '@/components/templates/FeaturePageTemplate';

const config: FeaturePageConfig = {
  slug: 'ai-chatbot',
  title: 'The Chemist',
  pageTitle: 'The Chemist - AI Content Strategist Chatbot | The Content Labs',
  metaDescription: 'Meet The Chemist: an AI chatbot that knows your content data, your competitors, and your niche. Ask questions, get script help, brainstorm ideas, and refine your strategy - all with context.',
  heroTagline: 'The Chemist',
  heroHeadline: 'An AI strategist that actually knows your content',
  heroDescription: 'The Chemist isn\'t ChatGPT. It has context - your audit results, your competitor data, your niche trends. Ask it anything about your content strategy and get answers built from real data.',
  icon: Atom,
  iconColor: 'text-content-coral',
  iconBg: 'bg-content-coral/10',
  benefits: [
    { title: 'Context-Aware', description: 'The Chemist knows your content performance, your competitors, and your niche. Every answer is informed by your actual data.' },
    { title: 'Script Refinement', description: 'Paste a script draft and get specific feedback: hook improvements, structure suggestions, and CTA optimization based on what works in your niche.' },
    { title: 'Idea Generation', description: 'Stuck on what to post? Ask The Chemist for ideas based on trending topics, competitor gaps, and your content pillars.' },
    { title: 'Strategy Q&A', description: 'Ask questions about your strategy, your niche, or your competitors. Get answers backed by data, not generic AI responses.' },
    { title: 'Hook Writing', description: 'Need a better hook? The Chemist generates options based on top-performing patterns in your specific niche.' },
    { title: 'Always Available', description: 'Your AI strategist is available 24/7. No scheduling calls, no waiting for email replies.' },
  ],
  howItWorks: [
    { step: '1', title: 'Run your content formula first', description: 'The Chemist works best after you\'ve completed your audit and competitor analysis - that gives it the context it needs.' },
    { step: '2', title: 'Ask anything', description: 'Chat naturally. Ask for script help, content ideas, strategy questions, hook variations, or feedback on drafts.' },
    { step: '3', title: 'Get data-informed answers', description: 'Every response draws on your content data, competitor analysis, and niche trends. Not generic advice - answers tailored to you.' },
  ],
  cta: 'Your personal AI strategist is waiting.',
  heroImage: '/features/chemist.jpg',
  heroImageAlt: 'The Chemist chat interface with context-aware AI strategy answers',
  monitorLabel: 'the_chemist',
  faq: [
    { q: 'How is The Chemist different from ChatGPT?', a: 'ChatGPT knows nothing about your content, your competitors, or your niche performance data. The Chemist has full context from your content audits, competitor analysis, and strategy - so every answer is personalized to your situation.' },
    { q: 'Does it cost extra to use?', a: 'The Chemist is included in every plan. Usage is measured in Lab Credits - Starter gets 1,000/month, Pro gets 2,500, and Studio gets 5,000. You can also purchase credit packs if you need more.' },
    { q: 'Can I use it for writing full scripts?', a: 'Yes. You can ask The Chemist to write scripts, refine drafts, generate hook variations, or create entire content briefs. It works best when you\'ve already run your content formula so it has data to work with.' },
    { q: 'What if I run out of Lab Credits?', a: 'You can purchase additional credit packs starting at $5 for 250 credits. Your credits reset each billing period.' },
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

export default function AIChatbotPage() {
  return <FeaturePageTemplate config={config} />;
}
