import type { Metadata } from 'next';
import { Store } from 'lucide-react';
import { SolutionPageTemplate } from '@/components/templates/SolutionPageTemplate';
import type { SolutionPageConfig } from '@/components/templates/SolutionPageTemplate';

const config: SolutionPageConfig = {
  slug: 'small-businesses',
  personaName: 'Small Businesses',
  pageTitle: 'Content Labs for Small Businesses - Content Strategy Without the Agency | The Content Labs',
  metaDescription: 'No time for content strategy? Content Labs builds your plan in minutes with AI. Small business owners get a personalized strategy, content calendar, and AI assistant - no agency required.',
  heroTagline: 'Built for Small Businesses',
  heroHeadline: 'Get an agency-level content strategy without the agency price tag',
  heroDescription: 'Content Labs gives small business owners AI-powered content strategy, a done-for-you content calendar, and an AI assistant that does the thinking so you can focus on running your business.',
  icon: Store,
  iconColor: 'text-content-coral',
  iconBg: 'bg-content-coral/10',
  painPoints: [
    'No time to figure out content strategy when you\'re busy running a business.',
    'Don\'t know what to post - every day feels like starting from zero.',
    'Can\'t afford an agency but know you need professional content to grow.',
    'Tried posting consistently but it didn\'t move the needle on sales or inquiries.',
  ],
  solutions: [
    { title: 'Strategy Built in Minutes', description: 'Our onboarding wizard builds a personalized content strategy for your business in minutes. Just answer a few questions about your business and audience, and AI does the rest.' },
    { title: 'AI Does the Thinking', description: 'The Chemist AI chatbot acts as your on-demand marketing advisor. Ask it what to post, how to position your business, or how to respond to trends - anytime you need help.' },
    { title: 'Calendar Tells You Exactly What to Post', description: 'Your AI-generated content calendar gives you specific post ideas, hooks, and formats for every day of the week. No more guessing - just open it and start creating.' },
    { title: 'Data-Backed Hook & Script Ideas', description: 'The Hook Generator creates attention-grabbing opening lines for your videos and posts, based on what\'s proven to work for businesses like yours.' },
  ],
  features: [
    { name: 'Content Strategy', description: 'Get a complete content strategy tailored to your business, your audience, and your goals. Built by AI in minutes, not weeks, and based on data from thousands of businesses.' },
    { name: 'Content Calendar', description: 'Receive a ready-to-use content calendar with specific topics, hooks, and formats for every post. Just open it, see what to create today, and go.' },
    { name: 'The Chemist (AI Chat)', description: 'Your AI marketing advisor, available 24/7. Ask it anything - what to post, how to handle a trend, how to promote a sale - and get instant, actionable answers.' },
    { name: 'Hook Generator', description: 'Generate attention-grabbing hooks for your videos and posts. Each suggestion is tailored to your business type and based on what works in your industry.' },
  ],
  howItWorks: [
    { step: '1', title: 'Connect Your Accounts', description: 'Link your business social profiles. Don\'t have content yet? No problem - we\'ll build your strategy from your business info and goals.' },
    { step: '2', title: 'Get Your Audit', description: 'If you have existing content, AI analyzes what\'s working and what\'s not. New to content? We skip straight to building your strategy.' },
    { step: '3', title: 'Build Your Strategy', description: 'Answer a few questions about your business, audience, and goals. AI builds you a complete content strategy in minutes, not weeks.' },
    { step: '4', title: 'Plan & Execute', description: 'Open your content calendar, see exactly what to post today, and use AI tools to help you create it. It\'s that simple.' },
  ],
  faq: [
    { q: 'I don\'t have any content yet. Can I still use Content Labs?', a: 'Absolutely. If you\'re starting from scratch, our onboarding wizard builds your strategy based on your business type, audience, and goals. You don\'t need existing content to get started.' },
    { q: 'How much time does this take?', a: 'Initial setup takes about 10 minutes. After that, your content calendar and AI tools save you hours every week. Most small business owners spend 15-20 minutes per day creating content with Content Labs, down from over an hour.' },
    { q: 'How much does Content Labs cost for small businesses?', a: 'Plans start at $39/mo, a fraction of what an agency charges. You get a full content strategy, AI-generated calendar, and access to The Chemist AI chatbot. No contracts, cancel anytime.' },
    { q: 'Is this just another scheduling tool?', a: 'No. Content Labs doesn\'t just schedule posts - it tells you what to post and why. We build your strategy, generate your content calendar, and give you AI tools to create the actual content. It\'s strategy + planning + creation in one.' },
    { q: 'What kind of businesses does this work for?', a: 'Content Labs works for any small business using social media to attract customers - restaurants, gyms, salons, retail shops, service businesses, and more. The AI adapts to your specific industry and audience.' },
  ],
  cta: 'Stop overthinking your content. Get a strategy that works - in minutes.',
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

export default function SmallBusinessesPage() {
  return <SolutionPageTemplate config={config} />;
}
