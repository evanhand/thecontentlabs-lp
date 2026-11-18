import { PublicNav } from '@/components/PublicNav';
import { Hero } from '@/components/landing/Hero';
import { WhatYouGet } from '@/components/landing/WhatYouGet';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { FAQ } from '@/components/landing/FAQ';
import { PricingPreview } from '@/components/landing/PricingPreview';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can't I just use ChatGPT for this?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ChatGPT has never seen your videos or your numbers. We pull every video you post, timestamp it, score its traits and compare them against your own median. The Chemist answers from that, not from the internet's average advice.",
      },
    },
    {
      "@type": "Question",
      name: "Will this work for my niche?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We've built strategies across 50+ niches, from fitness to finance to cooking to real estate. Your strategy is built from what's already going viral in your specific niche, with your specific competitors.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a big following to start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not at all. This is built for creators who are starting out or stuck. Manny went from zero to 30,000 followers with the strategy we gave him. You don't need a following to start. You need a plan.",
      },
    },
    {
      "@type": "Question",
      name: "Will the scripts sound like me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Chemist writes from your own transcripts, so it has your phrasing, your pacing and the structure of your videos that worked. It's your voice with the tangents cut out.",
      },
    },
    {
      "@type": "Question",
      name: "What if I don't like it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The free plan is free for good: your numbers every week, three videos analyzed, 20 Chemist messages a month, no card. If you go paid and it's not for you, cancel in two clicks. No contracts.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Free is $0 and stays that way. Starter is $19/month ($5 for your first month) and analyzes every video you post, with 4 competitors, a monthly strategy and a 30-day calendar. Pro is $39/month ($5 first month) with daily tracking, 6 competitors and a weekly refresh. Studio is $99/month for agencies. Yearly billing is two months free.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from other content tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most content tools give you a list of topic ideas. We give you full scripts with hooks, CTAs, emotional flow, and pacing, all built from real data on what's actually performing in your niche.",
      },
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-canvas text-ink overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PublicNav />
      <main>
        <Hero />
        <WhatYouGet />
        <HowItWorks />
        <PricingPreview />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA watchId="hero-section" />
    </div>
  );
}
