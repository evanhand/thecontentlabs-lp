import { Check, Minus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PublicNav } from '@/components/PublicNav';
import { Footer } from '@/components/landing/Footer';
import {
  ClosingCTA,
  FaqList,
  MarketingBreadcrumbs,
  MarketingHero,
  PrimaryButton,
  SecondaryButton,
  Section,
  Steps,
} from '@/components/templates/MarketingParts';

export interface SolutionPageConfig {
  slug: string;
  personaName: string;
  pageTitle: string;
  metaDescription: string;
  heroTagline: string;
  heroHeadline: string;
  heroDescription: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  painPoints: string[];
  solutions: { title: string; description: string }[];
  features: { name: string; description: string }[];
  howItWorks: { step: string; title: string; description: string }[];
  faq: { q: string; a: string }[];
  cta: string;
}

export function SolutionPageTemplate({ config }: { config: SolutionPageConfig }) {
  const {
    personaName,
    heroHeadline,
    heroDescription,
    painPoints,
    solutions,
    features,
    howItWorks,
    faq,
    cta,
  } = config;

  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thecontentlabs.app/" },
      { "@type": "ListItem", "position": 2, "name": "Solutions", "item": "https://thecontentlabs.app/for" },
      { "@type": "ListItem", "position": 3, "name": personaName },
    ],
  });

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  });

  return (
    <div className="min-h-screen bg-canvas text-ink overflow-x-hidden">
      <PublicNav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <main>
        <MarketingHero
          breadcrumbs={
            <MarketingBreadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Solutions' },
                { label: personaName },
              ]}
            />
          }
          title={heroHeadline}
          description={heroDescription}
          actions={
            <>
              <PrimaryButton href="/register">Get my free audit</PrimaryButton>
              <SecondaryButton href="/pricing">See pricing</SecondaryButton>
            </>
          }
        />

        <Section title="The challenge">
          <ul className="lab-card divide-y divide-line/[0.08]">
            {painPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3 px-5 sm:px-6 py-4">
                <Minus aria-hidden className="h-4 w-4 mt-1 flex-shrink-0 text-ink-3" />
                <p className="text-body text-ink-2">{point}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="How Content Labs helps">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {solutions.map((s, i) => (
              <div key={i} className="lab-card p-5 sm:p-6">
                <h3 className="text-[17px] font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-body text-ink-2">{s.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title={`Key features for ${personaName}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {features.map((f, i) => (
              <div key={i} className="lab-card p-5 sm:p-6">
                <h3 className="flex items-start gap-2 text-[15px] font-semibold text-ink">
                  <Check aria-hidden className="h-4 w-4 mt-0.5 flex-shrink-0 text-ink-3" />
                  {f.name}
                </h3>
                <p className="mt-2 text-body text-ink-2">{f.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="How it works">
          <Steps steps={howItWorks} />
        </Section>

        <Section title="FAQ" narrow>
          <FaqList items={faq} />
        </Section>

        <ClosingCTA
          title={cta}
          description="21,000+ videos analyzed. Start on the free plan, no card."
          primary={{ href: '/register', label: 'Start my free audit' }}
          secondary={{ href: '/pricing', label: 'Plans from $39/mo' }}
        />
      </main>

      <Footer />
    </div>
  );
}
