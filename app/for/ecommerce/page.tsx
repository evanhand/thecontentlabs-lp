import type { Metadata } from 'next';
import { ShoppingBag } from 'lucide-react';
import { SolutionPageTemplate } from '@/components/templates/SolutionPageTemplate';
import type { SolutionPageConfig } from '@/components/templates/SolutionPageTemplate';

const config: SolutionPageConfig = {
  slug: 'ecommerce',
  personaName: 'E-Commerce Brands',
  pageTitle: 'Content Labs for E-Commerce - Organic Content That Sells | The Content Labs',
  metaDescription: 'Stop relying on ads alone. Content Labs helps e-commerce brands build an organic content strategy that drives product sales with AI-powered video audits and content planning.',
  heroTagline: 'Built for E-Commerce Brands',
  heroHeadline: 'Build an organic content engine that drives product sales',
  heroDescription: 'Content Labs helps e-commerce brands and DTC companies create short-form video content that converts browsers into buyers, powered by data, not guesswork.',
  icon: ShoppingBag,
  iconColor: 'text-content-coral',
  iconBg: 'bg-content-coral/10',
  painPoints: [
    'Paying for ads while your organic content underperforms - leaving money on the table.',
    'Don\'t know which product content formats actually drive conversions vs. just views.',
    'Can\'t keep up with the posting schedule needed to stay visible on short-form platforms.',
    'Competitors are growing with organic content but you can\'t figure out what they\'re doing differently.',
  ],
  solutions: [
    { title: 'Audit What Product Content Performs', description: 'Our AI analyzes your product videos - unboxings, demos, UGC-style content - to identify which formats, hooks, and styles actually drive engagement and clicks.' },
    { title: 'Competitor Analysis on Top DTC Brands', description: 'See what content strategy the fastest-growing brands in your category are using. Understand their posting frequency, content mix, and which videos go viral.' },
    { title: 'AI Calendar with Product-Focused Ideas', description: 'Get a content calendar packed with product-focused content ideas - launches, seasonal content, trend-jacking, social proof - all scheduled and ready to execute.' },
    { title: 'Data-Backed Content Strategy', description: 'Build a content strategy around what your audience actually responds to. Know which products to feature, which angles to use, and which formats convert.' },
  ],
  features: [
    { name: 'Video Audit', description: 'Analyze every product video\'s performance - hooks, retention, CTAs - to understand what makes your audience stop scrolling and start shopping.' },
    { name: 'Competitor Analysis', description: 'Track and analyze competitor brands to see their content strategy, top-performing videos, posting patterns, and engagement trends in your product category.' },
    { name: 'Content Calendar', description: 'Receive an AI-generated content calendar with product-focused content ideas timed to your launch schedule, seasonal trends, and optimal posting windows.' },
    { name: 'Content Strategy', description: 'Get a comprehensive content strategy built around your product catalog, audience data, and competitive landscape. Every recommendation is backed by real performance data.' },
  ],
  howItWorks: [
    { step: '1', title: 'Connect Your Accounts', description: 'Link your brand\'s TikTok, Instagram, or YouTube. We pull your product content and performance data automatically.' },
    { step: '2', title: 'Get Your Audit', description: 'AI analyzes your product content - which formats, hooks, and styles drive the most engagement and purchase intent.' },
    { step: '3', title: 'Build Your Strategy', description: 'Receive a content strategy designed to drive organic product discovery, featuring content pillars, format recommendations, and posting cadence.' },
    { step: '4', title: 'Plan & Execute', description: 'Use your AI-generated content calendar to maintain a consistent posting schedule with product content that actually converts.' },
  ],
  faq: [
    { q: 'How does Content Labs help e-commerce brands specifically?', a: 'We analyze your product content to identify which formats - demos, unboxings, lifestyle, UGC-style - actually drive engagement and clicks. Then we build you a strategy and calendar focused on the content types that sell.' },
    { q: 'Can I analyze competitor brands?', a: 'Yes. Our Competitor Analysis feature lets you track any public brand account. See their content strategy, posting patterns, top-performing videos, and engagement trends so you can learn from what works in your category.' },
    { q: 'How much does Content Labs cost for e-commerce brands?', a: 'Plans start at $39/mo. For teams managing multiple product lines or brands, the Studio plan at $149/mo includes expanded audits and competitor tracking across all accounts.' },
    { q: 'We already run ads. Why do we need organic content?', a: 'Organic content builds trust and social proof that ads can\'t replicate. The best DTC brands use organic content to warm up audiences, showcase real product experiences, and reduce customer acquisition costs alongside their paid strategy.' },
    { q: 'Can our whole team use Content Labs?', a: 'Yes. All plans include access for your team. The Studio plan is designed specifically for teams managing content at scale, with expanded limits across all features.' },
  ],
  cta: 'Stop relying on ads alone. Build an organic content engine that sells.',
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

export default function EcommercePage() {
  return <SolutionPageTemplate config={config} />;
}
