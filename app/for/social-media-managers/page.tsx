import type { Metadata } from 'next';
import { Users } from 'lucide-react';
import { SolutionPageTemplate } from '@/components/templates/SolutionPageTemplate';
import type { SolutionPageConfig } from '@/components/templates/SolutionPageTemplate';

const config: SolutionPageConfig = {
  slug: 'social-media-managers',
  personaName: 'Social Media Managers',
  pageTitle: 'Content Labs for Social Media Managers - Scale Strategy Across Clients | The Content Labs',
  metaDescription: 'Manage multiple clients without burning out. Content Labs gives social media managers AI-powered audits, data-backed strategies, and auto-generated calendars for every account.',
  heroTagline: 'Built for Social Media Managers',
  heroHeadline: 'Scale your content strategy across every client without burning out',
  heroDescription: 'Content Labs gives social media managers the AI tools to deliver data-backed strategies, content audits, and calendars for multiple accounts in a fraction of the time.',
  icon: Users,
  iconColor: 'text-content-coral',
  iconBg: 'bg-content-coral/10',
  painPoints: [
    'Managing multiple clients with limited time. Every account needs a unique strategy but you\'re stretched thin.',
    'Hard to develop a unique, data-backed strategy for each client when you\'re context-switching all day.',
    'Proving ROI to clients is difficult when you don\'t have clear performance data to point to.',
    'Content calendars take hours to build from scratch for each account, every single month.',
    'Staying on top of trends and what works across different niches and industries.',
  ],
  solutions: [
    { title: 'Per-Client Content Audits', description: 'Run AI-powered audits on each client\'s account to instantly understand what\'s working, what\'s not, and where the biggest opportunities are - in minutes, not hours.' },
    { title: 'Data-Backed Strategy Decks', description: 'Generate professional content strategies backed by real performance data. Show clients exactly why you\'re recommending what you\'re recommending.' },
    { title: 'AI-Generated Calendars Per Client', description: 'Generate a full content calendar for each client in minutes. Every idea is tailored to their niche, audience, and strategy - no more starting from a blank spreadsheet.' },
    { title: 'Competitor Intelligence for Any Niche', description: 'Analyze competitors for each client to build strategies informed by what\'s actually working in their specific industry and category.' },
  ],
  features: [
    { name: 'Video Audit', description: 'Run detailed content audits for each client account. Analyze hooks, retention, CTAs, and performance patterns to build strategies based on real data.' },
    { name: 'Content Strategy', description: 'Generate personalized content strategies per client, complete with content pillars, format recommendations, and posting cadence - all backed by audit data.' },
    { name: 'Content Calendar', description: 'Auto-generate content calendars for each client account. Get weeks of planned content with topics, hooks, and formats ready to present or execute.' },
    { name: 'Competitor Analysis', description: 'Analyze any competitor account for any client. Understand posting patterns, top-performing content, and engagement trends across any niche.' },
  ],
  howItWorks: [
    { step: '1', title: 'Connect Your Accounts', description: 'Link each client\'s social profiles. We support multiple accounts so you can manage your entire roster from one dashboard.' },
    { step: '2', title: 'Get Your Audit', description: 'AI audits each client\'s content performance, identifying what\'s working and what needs improvement - giving you instant insights for every account.' },
    { step: '3', title: 'Build Your Strategy', description: 'Receive a personalized content strategy for each client based on their unique data, audience, and competitive landscape.' },
    { step: '4', title: 'Plan & Execute', description: 'Generate content calendars per client, then use the AI tools to create hooks, scripts, and content ideas at scale.' },
  ],
  faq: [
    { q: 'Can I manage multiple client accounts?', a: 'Yes. Content Labs is designed for managing multiple accounts. You can run audits, build strategies, and generate calendars for each client independently.' },
    { q: 'How does this help me prove ROI to clients?', a: 'Every strategy recommendation comes with performance data behind it. Use audit reports and competitor analysis to show clients exactly what\'s working, why you\'re making changes, and how their content is improving over time.' },
    { q: 'How much does Content Labs cost for social media managers?', a: 'Plans start at $39/mo for the Starter tier. Most social media managers managing three or more clients choose the Pro plan at $79/mo or Studio at $149/mo for expanded audits and competitor tracking across all accounts.' },
    { q: 'How much time will this save me per client?', a: 'Most social media managers report saving 3-5 hours per client per month on strategy development and content planning. The AI handles the research, analysis, and calendar generation so you can focus on execution and client relationships.' },
    { q: 'Can I white-label the reports for clients?', a: 'The audit data and strategy recommendations can be shared with clients directly. You get professional, data-backed insights that make your client presentations more compelling and evidence-driven.' },
  ],
  cta: 'Stop spinning your wheels. Scale your strategy across every client.',
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

export default function SocialMediaManagersPage() {
  return <SolutionPageTemplate config={config} />;
}
