import type { Metadata } from 'next';
import { GraduationCap } from 'lucide-react';
import { SolutionPageTemplate } from '@/components/templates/SolutionPageTemplate';
import type { SolutionPageConfig } from '@/components/templates/SolutionPageTemplate';

const config: SolutionPageConfig = {
  slug: 'coaches',
  personaName: 'Coaches',
  pageTitle: 'Content Labs for Coaches - Turn Content Into Clients | The Content Labs',
  metaDescription: 'Stop posting and hoping. Content Labs helps online coaches build a content strategy that actually converts followers into paying clients with AI-powered audits and planning.',
  heroTagline: 'Built for Online Coaches',
  heroHeadline: 'Turn your content into a client acquisition machine',
  heroDescription: 'Content Labs gives fitness, business, and life coaches a data-driven content strategy that attracts the right audience and converts them into paying clients.',
  icon: GraduationCap,
  iconColor: 'text-content-coral',
  iconBg: 'bg-content-coral/10',
  painPoints: [
    'Stuck in the "post and hope" cycle - putting out content daily but not seeing it translate into clients.',
    'Content gets engagement but doesn\'t convert - likes and comments don\'t pay the bills.',
    'No real strategy beyond "be consistent" - you\'re winging it and the results show.',
    'Spending hours creating content that doesn\'t move the needle on bookings or DMs.',
  ],
  solutions: [
    { title: 'Content Strategy Aligned to Client Acquisition', description: 'We build you a content strategy specifically designed to move followers through your funnel, from awareness to trust to booking. Every post has a purpose.' },
    { title: 'Competitor Analysis on Top Coaches', description: 'See exactly what content is working for the most successful coaches in your niche. Understand their posting patterns, hooks, and CTAs so you can adapt what works.' },
    { title: 'Never Run Out of Content Ideas', description: 'Your AI-generated content calendar gives you weeks of planned content - topics, hooks, formats - all aligned to your coaching offer and audience.' },
    { title: 'AI Strategy Assistant', description: 'Use The Chemist to brainstorm content angles, refine your messaging, and get instant feedback on your content strategy - like having a marketing consultant available 24/7.' },
  ],
  features: [
    { name: 'Content Strategy', description: 'Get a personalized content strategy built around your coaching niche, your ideal client, and your offer. Every recommendation is backed by performance data.' },
    { name: 'Content Calendar', description: 'Receive a ready-to-use content calendar with topics, hooks, and formats tailored to your coaching business. No more "what should I post today?" moments.' },
    { name: 'Competitor Analysis', description: 'Analyze the top coaches in your space to see what content drives their growth. Understand posting frequency, hook styles, content mix, and engagement patterns.' },
    { name: 'The Chemist (AI Chat)', description: 'Ask our AI anything about your content performance, brainstorm offer-aligned content ideas, or get feedback on scripts before you film.' },
  ],
  howItWorks: [
    { step: '1', title: 'Connect Your Accounts', description: 'Link your social profiles where you share coaching content. We pull your recent videos and posts automatically.' },
    { step: '2', title: 'Get Your Audit', description: 'AI analyzes your content performance and identifies which posts drive engagement, authority, and - most importantly - client inquiries.' },
    { step: '3', title: 'Build Your Strategy', description: 'Receive a content strategy designed around your coaching offer, with content pillars mapped to each stage of your client journey.' },
    { step: '4', title: 'Plan & Execute', description: 'Follow your AI-generated content calendar to post with confidence, knowing every piece of content is moving potential clients closer to working with you.' },
  ],
  faq: [
    { q: 'How is this different from a generic social media tool?', a: 'Most tools help you schedule posts. Content Labs builds you a strategy. We analyze what\'s actually working in your coaching niche, then give you a data-backed plan to turn content into client conversations.' },
    { q: 'Will this work for my type of coaching?', a: 'Yes. Content Labs works for fitness coaches, business coaches, life coaches, mindset coaches, and any other coaching niche. The AI adapts its strategy recommendations to your specific audience and offer.' },
    { q: 'How much does Content Labs cost for coaches?', a: 'Plans start at $39/mo. Most coaches choose the Pro plan at $79/mo for expanded audits, competitor analysis, and unlimited access to The Chemist AI chatbot.' },
    { q: 'I\'m already posting consistently. How will this help?', a: 'Consistency is great, but it\'s not a strategy. Content Labs shows you which of your consistent posts actually drive results and which are just noise - then helps you do more of what works.' },
    { q: 'Can I analyze what other coaches are posting?', a: 'Yes. Our Competitor Analysis feature lets you analyze any public creator account to see their content strategy, posting patterns, top-performing content, and engagement trends.' },
  ],
  cta: 'Stop posting and hoping. Start converting content into clients.',
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

export default function CoachesPage() {
  return <SolutionPageTemplate config={config} />;
}
