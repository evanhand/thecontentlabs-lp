import { PublicNav } from '@/components/PublicNav';
import { DesktopEffects } from '@/components/landing/DesktopEffects';
import { Hero } from '@/components/landing/Hero';
import { PainSection } from '@/components/landing/PainSection';
import { WhoItsFor } from '@/components/landing/WhoItsFor';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Features } from '@/components/landing/Features';
import { SocialProof } from '@/components/landing/SocialProof';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQ } from '@/components/landing/FAQ';
import { PricingPreview } from '@/components/landing/PricingPreview';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can't I just use ChatGPT for this?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ChatGPT doesn't know your content history, your niche, or your competitors. It's never seen your analytics. We pull real performance data from your account and your competitors' accounts, then build your strategy from what's actually working.",
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
        text: "We give you the structure, the hooks, the flow, and the CTA, all built from what's working in your niche. You bring your voice and your personality.",
      },
    },
    {
      "@type": "Question",
      name: "What if I don't like it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cancel anytime. No contracts. No questions asked. Start with a free content audit to see what we deliver before you pay anything.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plans start at $39/month for the Starter plan, which includes video audits, competitor analysis, full strategy generation, a 30-day content calendar with scripts, and access to The Chemist AI. The Pro plan is $79/month with higher limits, and Studio is $129/month for teams and agencies. Save 17% with annual billing.",
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
    <div className="min-h-screen lab-grid-bg text-slate-900 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DesktopEffects />
      <PublicNav />
      <main>
        <Hero />
        <PainSection />
        <WhoItsFor />
        <HowItWorks />
        <Features />
        <SocialProof />
        <Testimonials />
        <FAQ />
        <PricingPreview />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
