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

export default function Home() {
  return (
    <div className="min-h-screen lab-grid-bg text-slate-900 overflow-hidden">
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
