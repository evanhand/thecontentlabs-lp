import { Check } from 'lucide-react';
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
  container,
} from '@/components/templates/MarketingParts';

export interface FeaturePageConfig {
  slug: string;
  title: string;
  pageTitle: string;
  metaDescription: string;
  heroTagline: string;
  heroHeadline: string;
  heroDescription: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  benefits: { title: string; description: string }[];
  howItWorks: { step: string; title: string; description: string }[];
  cta: string;
  faq: { q: string; a: string }[];
  heroImage?: string;
  heroImageAlt?: string;
  monitorLabel?: string;
}

const TRUST_STATS = [
  { stat: '10,000+', label: 'videos analyzed' },
  { stat: '100+', label: 'niches covered' },
  { stat: 'Daily', label: 'auto-updates' },
  { stat: '4.9/5', label: 'average review' },
];

const TESTIMONIALS = [
  {
    quote:
      "Helped me scale my coaching business so fast, I literally had to start saying no to people.",
    name: 'Matt Gehlbach',
    role: 'Full Time Firefighter & Business Owner',
    image: '/testimonials/matt-gehlbach.jpg',
  },
  {
    quote:
      "It's a detailed, strategic approach. Not just 'post consistently and hope for growth.'",
    name: 'Manny Watkins',
    role: 'Former D1 Basketball Star & Coach',
    image: '/testimonials/manny-watkins.jpg',
  },
  {
    quote:
      'This Content Strategy Was a Game Changer!',
    name: 'Jen Thompson',
    role: '11-Time World Champion Powerlifter',
    image: '/testimonials/jen-thompson.jpg',
  },
];

export function FeaturePageTemplate({ config }: { config: FeaturePageConfig }) {
  const {
    title,
    heroHeadline,
    heroDescription,
    benefits,
    howItWorks,
    cta,
    faq,
    heroImage,
    heroImageAlt,
  } = config;

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  });

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thecontentlabs.app/' },
      { '@type': 'ListItem', position: 2, name: 'Features', item: 'https://thecontentlabs.app/features' },
      { '@type': 'ListItem', position: 3, name: title },
    ],
  });

  return (
    <div className="min-h-screen bg-canvas text-ink overflow-x-hidden">
      <PublicNav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />

      <main>
        <MarketingHero
          breadcrumbs={
            <MarketingBreadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Features', href: '/#features' },
                { label: title },
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
          footnote={
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <div className="flex -space-x-2">
                {TESTIMONIALS.map((t) => (
                  <img
                    key={t.name}
                    src={t.image}
                    alt={t.name}
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full object-cover ring-2 ring-canvas"
                  />
                ))}
              </div>
              <span>
                Trusted by creators across <strong className="font-medium text-ink-2">100+</strong> niches
              </span>
            </div>
          }
        />

        {/* Product shot */}
        {heroImage && (
          <section className="pb-16 sm:pb-20">
            <div className={container}>
              <img
                src={heroImage}
                alt={heroImageAlt || `${title} preview`}
                loading="lazy"
                decoding="async"
                className="w-full h-auto block rounded-2xl border border-line/[0.08] shadow-[0_1px_2px_rgb(15_23_42/0.04),0_12px_32px_-16px_rgb(15_23_42/0.18)] object-cover object-top"
              />
            </div>
          </section>
        )}

        {/* Trust strip */}
        <section className="border-t border-line/[0.08]">
          <div className={`${container} py-10`}>
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {TRUST_STATS.map((t) => (
                <div key={t.label} className="flex flex-col-reverse gap-1">
                  <dt className="text-meta text-ink-3">{t.label}</dt>
                  <dd className="font-heading text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-ink tabular-nums">
                    {t.stat}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Section title="Everything built around one goal: you getting to your next viral video faster.">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {benefits.map((b, i) => (
              <div key={i} className="lab-card p-5 sm:p-6">
                <h3 className="flex items-start gap-2 text-[15px] font-semibold text-ink">
                  <Check aria-hidden className="h-4 w-4 mt-0.5 flex-shrink-0 text-ink-3" />
                  {b.title}
                </h3>
                <p className="mt-2 text-body text-ink-2">{b.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Three steps from sign-up to actionable data.">
          <Steps steps={howItWorks} />
        </Section>

        <Section title="Creators are using this to grow right now.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {TESTIMONIALS.map((t, i) => (
              <figure key={i} className="lab-card p-5 sm:p-6 flex flex-col">
                <blockquote className="text-[15px] leading-relaxed text-ink flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3 mt-6 pt-5 border-t border-line/[0.08]">
                  <img
                    src={t.image}
                    alt={t.name}
                    width={40}
                    height={40}
                    loading="lazy"
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-ink truncate">{t.name}</div>
                    <div className="text-meta text-ink-3 truncate">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section title="Common questions" narrow>
          <FaqList items={faq} />
        </Section>

        <ClosingCTA
          title={cta}
          description="Built for creators who take their content seriously."
          primary={{ href: '/register', label: 'Start my free audit' }}
          secondary={{ href: '/pricing', label: 'Plans from $39/mo' }}
        />
      </main>

      <Footer />
    </div>
  );
}
