import { Metadata } from 'next';
import { NicheStrategyPage, NicheConfig } from '@/components/templates/NicheStrategyTemplate';
import { PublicNav } from '@/components/PublicNav';

const config: NicheConfig = {
  niche: 'Coaching & Consulting',
  slug: 'ai-content-strategy-coaching',
  nicheAdjective: 'coaching',
  painPoints: [
    'Coaching content often sounds generic — "believe in yourself" doesn\'t convert followers or clients',
    'Hard to demonstrate value and expertise in short-form video without giving away too much',
    'The coaching space has a trust problem — audiences are skeptical of "gurus" and fake results',
    'Balancing personal brand content with direct lead generation is tricky',
    'Difficult to stand out when thousands of coaches are posting similar motivational content',
  ],
  contentPillars: [
    { pillar: 'Client Results & Stories', examples: ['Client transformation stories', 'Before/after case studies', 'Specific wins with numbers'] },
    { pillar: 'Contrarian Industry Takes', examples: ['"Most coaches are lying to you"', 'Unpopular opinions', 'Myth-busting common advice'] },
    { pillar: 'Quick Tactical Tips', examples: ['One mindset shift', 'A framework in 60 seconds', 'Actionable challenge'] },
    { pillar: 'Behind the Business', examples: ['Day in the life', 'How I got my first client', 'Revenue breakdowns'] },
    { pillar: 'Authority Content', examples: ['Breakdown of a real coaching call', 'Hot seat snippets', 'Live Q&A highlights'] },
    { pillar: 'Personal Story', examples: ['Why I became a coach', 'My biggest failure', 'Honest business updates'] },
  ],
  hookExamples: [
    'My client went from $0 to $10K/month in 90 days. Here\'s what we changed.',
    'If you\'re a coach posting motivational quotes, stop. Here\'s why.',
    'I made $250K last year coaching. This is the one thing that made it possible.',
    'The biggest lie in the coaching industry',
    'I almost quit coaching. Then I did this.',
  ],
  faqExtra: [
    { q: 'How do coaches get clients from TikTok?', a: 'The most effective approach is demonstrating expertise through specific, actionable content rather than generic motivation. Lead with real client results (with permission), share specific frameworks, and use your content to position yourself as the obvious expert. The Content Labs helps coaches identify exactly what content is driving client acquisition for their competitors.' },
    { q: 'What content should coaches post on social media?', a: 'Client transformation stories (with specific numbers), contrarian takes on common industry advice, quick tactical tips, and behind-the-business transparency content consistently outperform generic motivational posts. Matt Gehlbach, a coaching business owner using The Content Labs, scaled so fast he had to start turning away clients.' },
  ],
  statsNote: 'Based on analysis of coaching and consulting creator content across The Content Labs platform. Matt Gehlbach, a Content Labs user, grew his coaching business by over 10,000 followers in 2 months.',
};

export const metadata: Metadata = {
  title: `AI Content Strategy for Coaching & Consulting Creators (2026 Guide)`,
  description: `How to build an AI-powered content strategy for coaching content. Learn what to post, how to analyze coaching competitors, and get a 30-day content plan with full scripts. Based on data from 10,000+ analyzed videos across 50+ niches.`,
  alternates: { canonical: `https://thecontentlabs.app/blog/${config.slug}` },
  openGraph: {
    title: `AI Content Strategy for Coaching & Consulting Creators (2026 Guide)`,
    description: `AI content strategy for coaching creators. Data-driven plans, competitor analysis, and full scripts.`,
    url: `https://thecontentlabs.app/blog/${config.slug}`,
    images: ['https://thecontentlabs.app/og-image.png'],
  },
  twitter: {
    title: `AI Content Strategy for Coaching & Consulting Creators`,
    description: `AI content strategy for coaching creators. Data-driven plans, competitor analysis, and full scripts.`,
    images: ['https://thecontentlabs.app/og-image.png'],
  },
};

export default function CoachingStrategyPage() {
  return (
    <>
      <PublicNav />
      <NicheStrategyPage config={config} />
    </>
  );
}
