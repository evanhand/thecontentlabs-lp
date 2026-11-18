'use client';

import { PlanCard } from '@/components/landing/PlanCard';
import { Reveal, Section, SectionHeading } from '@/components/landing/Section';

const plans = [
  { name: 'Free', price: 0, desc: 'Your numbers, for good', cta: 'Start free', highlights: ['Weekly numbers on your videos', '3 videos analyzed', '20 Chemist messages / mo', 'No card'] },
  { name: 'Starter', price: 19, firstMonth: 5, desc: 'Every video, analyzed', cta: 'Start Starter', highlights: ['25 videos / platform, monthly', 'Every video analyzed', '4 competitors', 'Monthly strategy + 30-day calendar', '1,000 Chemist credits'] },
  { name: 'Pro', price: 39, firstMonth: 5, desc: 'Daily tracking, weekly refresh', popular: true, cta: 'Start Pro', highlights: ['Daily tracking', '6 competitors, 15 videos each', 'Weekly strategy refresh', '7-day calendar, weekly', '2,500 Chemist credits'] },
  { name: 'Studio', price: 99, desc: 'For agencies', cta: 'Start Studio', highlights: ['Daily tracking', '8 competitors, 25 videos each', 'YouTube Shorts', '5,000 Chemist credits', '2 seats, priority support'] },
] as Array<{ name: string; price: number; firstMonth?: number; desc: string; cta: string; popular?: boolean; highlights: string[] }>;
const REGISTER = 'https://thecontentlabs.app/register';

export function PricingPreview() {
  return (
    <Section id="pricing">
      <Reveal>
        <SectionHeading
          title="Free to start. $5 to go further."
          description="The free plan tracks your videos for good. Paid plans analyze every one and add competitors, strategy and a calendar."
        />
      </Reveal>

      <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan) => (
          <PlanCard
            key={plan.name}
            name={plan.name}
            description={plan.desc}
            price={`$${plan.price}`}
            priceNote={plan.firstMonth != null ? `$${plan.firstMonth} first month` : null}
            features={plan.highlights}
            ctaLabel={plan.cta}
            ctaHref={REGISTER}
            highlighted={!!plan.popular}
          />
        ))}
      </Reveal>

      <p className="text-meta text-ink-3 mt-8">
        Yearly is two months free &middot; Free plan needs no card &middot; Cancel anytime &middot;{' '}
        <a href="/pricing" className="font-medium text-ink-2 underline underline-offset-4 decoration-line/[0.24] hover:text-ink">
          Compare plans
        </a>
      </p>
    </Section>
  );
}
