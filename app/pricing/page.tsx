'use client';

import { useState } from 'react';
import { Check, ChevronDown, ChevronRight, Star } from 'lucide-react';
import { PublicNav } from '@/components/PublicNav';
import { Footer } from '@/components/landing/Footer';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { FAQList } from '@/components/landing/FAQ';
import { PlanCard } from '@/components/landing/PlanCard';
import { CONTAINER, H1, LEAD, Reveal, Section, SectionHeading } from '@/components/landing/Section';
import { capture } from '@/lib/analytics';

type PlanId = 'starter' | 'pro' | 'enterprise';

function trackPricingCta(plan: PlanId, billingPeriod: 'monthly' | 'yearly', position: string) {
  capture('pricing_cta_clicked', {
    plan,
    billing_period: billingPeriod,
    location: 'marketing',
    position,
    is_logged_in: false,
  });
}

/* ------------------------------------------------------------------ */
/*  Inline plan limits & pricing (mirrors app's subscriptionLimits +  */
/*  stripe-config so we don't import app internals)                   */
/* ------------------------------------------------------------------ */
const PLAN_LIMITS = {
  starter: {
    calendarItems: 30,
    videoAudits: 40,
    competitors: 4,
    videosPerCompetitor: 10,
    labCreditsPerMonth: 1000,
    strategiesPerMonth: 1,
    calendarGenerationsPerMonth: 1,
  },
  pro: {
    calendarItems: 30,
    videoAudits: 80,
    competitors: 6,
    videosPerCompetitor: 15,
    labCreditsPerMonth: 2500,
    strategiesPerMonth: 1,
    calendarGenerationsPerMonth: 1,
  },
  enterprise: {
    calendarItems: 30,
    videoAudits: 160,
    competitors: 8,
    videosPerCompetitor: 25,
    labCreditsPerMonth: 5000,
    strategiesPerMonth: 1,
    calendarGenerationsPerMonth: 1,
  },
} as const;

const PRODUCTS = {
  starter: { price: 19, yearlyPrice: 190, firstMonth: 5 },
  pro: { price: 39, yearlyPrice: 390, firstMonth: 5 },
  enterprise: { price: 99, yearlyPrice: 990 },
} as const;

const FREE_PLAN = ['Weekly numbers on your videos', '3 videos analyzed', '20 Chemist messages / mo', 'Your Videos + Analytics pages', 'No card'];

/* ------------------------------------------------------------------ */
/*  Schema markup                                                     */
/* ------------------------------------------------------------------ */
const faqSchemaData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Can't I just use ChatGPT for this?", acceptedAnswer: { '@type': 'Answer', text: "ChatGPT doesn't know your content performance, your niche, or your competitors. We've analyzed over 10,000 videos across every niche and use that data, plus your content and your competitors', to build a strategy based on what's actually working." } },
    { '@type': 'Question', name: 'Is it worth $19 to $99 a month?', acceptedAnswer: { '@type': 'Answer', text: 'The free plan is free for good. Starter is $19 a month and the first month is $5, so you see every one of your videos analyzed before you pay full price. A strategist costs far more and has never watched your videos.' } },
    { '@type': 'Question', name: 'Will the scripts actually sound like me?', acceptedAnswer: { '@type': 'Answer', text: "We don't write content for you. We give you the strategy, the structure, and the hooks based on what's working in your niche. You bring your voice and personality." } },
    { '@type': 'Question', name: "What if it doesn't work for my niche?", acceptedAnswer: { '@type': 'Answer', text: "Every strategy we generate is built from real data in your niche: your content performance and your competitors' top-performing videos. Cancel anytime, no contracts, no hassle." } },
    { '@type': 'Question', name: "What's the difference between plans?", acceptedAnswer: { '@type': 'Answer', text: 'Free tracks your videos weekly and analyzes three. Starter ($19) analyzes every video, adds 4 competitors, a monthly strategy and a 30-day calendar. Pro ($39) tracks daily, with 6 competitors, a weekly strategy refresh and a 7-day calendar every week. Studio ($99) adds 8 competitors, YouTube Shorts, 5,000 Chemist credits and 2 seats.' } },
    { '@type': 'Question', name: 'Can I cancel my subscription anytime?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period. No hidden fees, no hassle.' } },
    { '@type': 'Question', name: 'Can I upgrade or downgrade my plan?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. You can change your plan at any time through your account settings. Changes are prorated and take effect immediately.' } },
  ],
};

const softwareSchemaData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'The Content Labs',
  description: 'AI-powered content strategy platform for creators',
  url: 'https://thecontentlabs.app/pricing',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: [
    { '@type': 'Offer', name: 'Free Plan', price: '0', priceCurrency: 'USD', priceValidUntil: '2027-12-31', availability: 'https://schema.org/InStock' },
    { '@type': 'Offer', name: 'Starter Plan', price: '19', priceCurrency: 'USD', priceValidUntil: '2027-12-31', availability: 'https://schema.org/InStock' },
    { '@type': 'Offer', name: 'Pro Plan', price: '39', priceCurrency: 'USD', priceValidUntil: '2027-12-31', availability: 'https://schema.org/InStock' },
    { '@type': 'Offer', name: 'Studio Plan', price: '99', priceCurrency: 'USD', priceValidUntil: '2027-12-31', availability: 'https://schema.org/InStock' },
  ],
};

const breadcrumbSchemaData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thecontentlabs.app/' },
    { '@type': 'ListItem', position: 2, name: 'Pricing' },
  ],
};

/* ------------------------------------------------------------------ */
/*  Hardcoded testimonials                                            */
/* ------------------------------------------------------------------ */
const testimonials = [
  { name: 'Jen Thompson', role: '11-Time World Champion Powerlifter', quote: 'This Content Strategy Was a Game Changer!', rating: 5, image: '/testimonials/jen-thompson.jpg' },
  { name: 'Matt Gehlbach', role: 'Full Time Firefighter & Business Owner', quote: 'Helped me scale my coaching business so fast, I literally had to start saying no to people.', rating: 5, image: '/testimonials/matt-gehlbach.jpg' },
  { name: 'Manny Watkins', role: 'Former D1 Basketball Star & Coach', quote: "It's a detailed, strategic approach. Not just 'post consistently and hope for growth.'", rating: 5, image: '/testimonials/manny-watkins.jpg' },
];

type Cell = string | boolean;

const COMPARISON_ROWS: { feature: string; free: Cell; starter: Cell; pro: Cell; enterprise: Cell }[] = [
  { feature: 'Your videos tracked', free: '10 / week', starter: '25 / month', pro: 'Daily', enterprise: 'Daily' },
  { feature: 'Videos analyzed', free: '3, ever', starter: 'Every one', pro: 'Every one', enterprise: 'Every one' },
  { feature: 'Beat map per video', free: '3 videos', starter: true, pro: true, enterprise: true },
  { feature: 'What wins for you', free: false, starter: true, pro: true, enterprise: true },
  { feature: 'Competitors', free: '0', starter: `${PLAN_LIMITS.starter.competitors}`, pro: `${PLAN_LIMITS.pro.competitors}`, enterprise: `${PLAN_LIMITS.enterprise.competitors}` },
  { feature: 'Videos per competitor', free: '0', starter: `${PLAN_LIMITS.starter.videosPerCompetitor}`, pro: `${PLAN_LIMITS.pro.videosPerCompetitor}`, enterprise: `${PLAN_LIMITS.enterprise.videosPerCompetitor}` },
  { feature: 'Strategy', free: false, starter: 'Monthly', pro: 'Weekly', enterprise: 'Weekly' },
  { feature: 'Calendar', free: false, starter: '30-day / month', pro: '7-day / week', enterprise: '7-day / week' },
  { feature: 'YouTube Shorts', free: false, starter: false, pro: false, enterprise: true },
  { feature: 'The Chemist', free: '20 messages', starter: `${PLAN_LIMITS.starter.labCreditsPerMonth.toLocaleString()} credits`, pro: `${PLAN_LIMITS.pro.labCreditsPerMonth.toLocaleString()} credits`, enterprise: `${PLAN_LIMITS.enterprise.labCreditsPerMonth.toLocaleString()} credits` },
  { feature: 'Weekly email', free: 'Your numbers', starter: 'Lab note', pro: 'Lab note', enterprise: 'Lab note' },
  { feature: 'Team seats', free: '1', starter: '1', pro: '1', enterprise: '2' },
  { feature: 'Priority support', free: false, starter: false, pro: false, enterprise: true },
];

function CellValue({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <>
        <Check className="h-4 w-4 text-ink mx-auto" aria-hidden="true" />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <span className="text-ink-3" aria-hidden="true">&mdash;</span>
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="text-sm text-ink-2 tabular-nums">{value}</span>;
}

const PAID_ADDS = [
  { title: 'Every video analyzed', desc: 'Beat map, traits and what wins for you across all of them' },
  { title: 'Competitors', desc: 'Their best videos, read the same way as yours' },
  { title: 'Strategy and calendar', desc: 'Built from your own numbers, refreshed monthly or weekly' },
  { title: 'More Chemist', desc: 'Scripts in your voice, 1,000 to 5,000 credits a month' },
];

const FAQS = [
  { q: "Can't I just use ChatGPT for this?", a: "ChatGPT has never seen your videos or your numbers. We pull every video you post, timestamp it, score its traits and compare them against your own median. The Chemist answers from that, not from the internet's average advice." },
  { q: 'Is it worth $19 to $99 a month?', a: 'The free plan is free for good. Starter is $19 a month and the first month is $5, so you see every one of your videos analyzed before you pay full price. A strategist costs far more and has never watched your videos.' },
  { q: 'What does the $5 first month mean?', a: "Starter and Pro bill $5 for your first month, then the normal price. Card required, cancel any time before the second charge and you've paid $5." },
  { q: 'Will the scripts actually sound like me?', a: "The Chemist writes from your own transcripts, so it has your phrasing, your pacing and the structure of your videos that worked. It's your voice with the tangents cut out." },
  { q: "What's the difference between plans?", a: `Free tracks your videos weekly and analyzes three. Starter ($${PRODUCTS.starter.price}) analyzes every video, adds ${PLAN_LIMITS.starter.competitors} competitors, a monthly strategy and a 30-day calendar. Pro ($${PRODUCTS.pro.price}) tracks daily, with ${PLAN_LIMITS.pro.competitors} competitors, a weekly strategy refresh and a 7-day calendar every week. Studio ($${PRODUCTS.enterprise.price}) adds ${PLAN_LIMITS.enterprise.competitors} competitors, YouTube Shorts, ${PLAN_LIMITS.enterprise.labCreditsPerMonth.toLocaleString()} Chemist credits and 2 seats.` },
  { q: 'Can I cancel my subscription anytime?', a: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period. No hidden fees, no hassle.' },
  { q: 'Can I upgrade or downgrade my plan?', a: 'Absolutely. You can change your plan at any time through your account settings. Changes are prorated and take effect immediately.' },
];

const REGISTER = 'https://thecontentlabs.app/register';

/* ================================================================== */
/*  Page Component                                                    */
/* ================================================================== */
export default function PricingPage() {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('yearly');
  const [showComparison, setShowComparison] = useState(false);

  const yearly = billingInterval === 'yearly';

  const paidPrice = (p: { price: number; yearlyPrice: number }) =>
    yearly ? `$${Math.round(p.yearlyPrice / 12)}` : `$${p.price}`;

  const paidNote = (p: { price: number; yearlyPrice: number; firstMonth?: number }) =>
    yearly ? (
      <>
        <span className="text-ink-3 line-through tabular-nums">${p.price}/mo</span>{' '}
        <span className="tabular-nums">${p.yearlyPrice} billed yearly, save ${p.price * 12 - p.yearlyPrice}</span>
      </>
    ) : p.firstMonth != null ? (
      <span className="tabular-nums">${p.firstMonth} first month</span>
    ) : null;

  return (
    <div className="min-h-screen bg-canvas text-ink overflow-x-clip">
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }}
      />

      <PublicNav />

      <main>
        {/* Hero */}
        <section className="pt-28 sm:pt-32 pb-12 sm:pb-16">
          <div className={CONTAINER}>
            <nav aria-label="Breadcrumb" className="mb-10 sm:mb-12">
              <ol className="flex items-center gap-1 text-meta text-ink-3">
                <li><a href="/" className="hover:text-ink transition-colors">Home</a></li>
                <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
                <li><span className="text-ink-2">Pricing</span></li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className={H1}>
                Free to start.
                <span className="block text-ink-2">$5 to go further.</span>
              </h1>
              <p className={`${LEAD} mx-auto mt-6`}>
                The free plan tracks your videos for good. Paid plans analyze every one you post, then add competitors, a strategy and a calendar.
              </p>

              {/* Billing toggle */}
              <div className="mt-10 flex flex-col items-center gap-3">
                <div role="group" aria-label="Billing period" className="inline-flex p-1 rounded-xl bg-sunken border border-line/[0.08]">
                  {(['monthly', 'yearly'] as const).map((period) => {
                    const active = billingInterval === period;
                    return (
                      <button
                        key={period}
                        type="button"
                        onClick={() => setBillingInterval(period)}
                        aria-pressed={active}
                        className={`h-9 px-5 rounded-[10px] text-sm font-medium transition-[background-color,color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                          active ? 'bg-surface text-ink shadow-card' : 'text-ink-3 hover:text-ink'
                        }`}
                      >
                        {period === 'monthly' ? 'Monthly' : 'Yearly'}
                      </button>
                    );
                  })}
                </div>
                <p className="text-meta text-ink-3">
                  {yearly ? 'Yearly is two months free' : 'Go yearly for two months free'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="pb-20 sm:pb-28">
          <div className={CONTAINER}>
            <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <PlanCard
                name="Free"
                description="Your numbers, for good"
                price="$0"
                features={FREE_PLAN}
                ctaLabel="Start free"
                ctaHref={REGISTER}
                onCtaClick={() => capture('pricing_cta_clicked', { plan: 'free', billing_period: billingInterval, location: 'marketing', position: 'plan_card', is_logged_in: false })}
              />
              <PlanCard
                name="Starter"
                description="Every video, analyzed"
                price={paidPrice(PRODUCTS.starter)}
                priceNote={paidNote(PRODUCTS.starter)}
                features={[
                  '25 videos / platform tracked monthly',
                  'Every video analyzed: beat map + traits',
                  `${PLAN_LIMITS.starter.competitors} competitors (${PLAN_LIMITS.starter.videosPerCompetitor} videos each)`,
                  'Monthly strategy + 30-day calendar',
                  `The Chemist (${PLAN_LIMITS.starter.labCreditsPerMonth.toLocaleString()} credits / mo)`,
                  'Weekly lab note by email',
                ]}
                ctaLabel="Get Started"
                ctaHref={REGISTER}
                onCtaClick={() => trackPricingCta('starter', billingInterval, 'plan_card')}
              />
              <PlanCard
                highlighted
                name="Pro"
                description="Daily tracking, weekly refresh"
                price={paidPrice(PRODUCTS.pro)}
                priceNote={paidNote(PRODUCTS.pro)}
                features={[
                  'Daily tracking, every video analyzed',
                  `${PLAN_LIMITS.pro.competitors} competitors (${PLAN_LIMITS.pro.videosPerCompetitor} videos each), refreshed weekly`,
                  'Weekly strategy refresh',
                  '7-day calendar, every week',
                  `The Chemist (${PLAN_LIMITS.pro.labCreditsPerMonth.toLocaleString()} credits / mo)`,
                  'What wins for you, across all your videos',
                  'Weekly lab note by email',
                ]}
                ctaLabel="Get Started"
                ctaHref={REGISTER}
                onCtaClick={() => trackPricingCta('pro', billingInterval, 'plan_card')}
              />
              <PlanCard
                name="Studio"
                description="For agencies"
                price={paidPrice(PRODUCTS.enterprise)}
                priceNote={paidNote(PRODUCTS.enterprise)}
                features={[
                  'Daily tracking, every video analyzed',
                  `${PLAN_LIMITS.enterprise.competitors} competitors (${PLAN_LIMITS.enterprise.videosPerCompetitor} videos each), refreshed weekly`,
                  'YouTube Shorts tracking',
                  'Weekly strategy refresh + 7-day calendar',
                  `The Chemist (${PLAN_LIMITS.enterprise.labCreditsPerMonth.toLocaleString()} credits / mo)`,
                  '2 team seats',
                  'Priority support',
                ]}
                ctaLabel="Get Started"
                ctaHref={REGISTER}
                onCtaClick={() => trackPricingCta('enterprise', billingInterval, 'plan_card')}
              />
            </Reveal>

            <p className="mt-8 text-center text-meta text-ink-3">
              Free plan needs no card &middot; Paid plans are $5 for the first month &middot; Cancel anytime
            </p>

            {/* Inline comparison toggle */}
            <div className="mt-10">
              <button
                type="button"
                onClick={() => setShowComparison(!showComparison)}
                aria-expanded={showComparison}
                aria-controls="plan-comparison"
                className="mx-auto flex items-center gap-2 h-11 px-5 rounded-[10px] bg-surface border border-line/[0.14] text-sm font-medium text-ink hover:border-line/[0.24] transition-colors duration-150"
              >
                Compare plans side by side
                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 text-ink-3 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${showComparison ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                id="plan-comparison"
                className={`overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  showComparison ? 'max-h-[1200px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'
                }`}
              >
                <div className="lab-card relative overflow-x-auto">
                  <table className="w-full min-w-[560px] text-left">
                    <caption className="sr-only">Plan comparison</caption>
                    <thead>
                      <tr className="border-b border-line/[0.08]">
                        <th scope="col" className="text-meta font-medium text-ink-3 py-4 px-5 sm:px-6">Feature</th>
                        {['Free', 'Starter', 'Pro', 'Studio'].map((h) => (
                          <th key={h} scope="col" className="text-center text-sm font-semibold text-ink py-4 px-3">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/[0.08]">
                      {COMPARISON_ROWS.map((row) => (
                        <tr key={row.feature}>
                          <th scope="row" className="text-sm font-normal text-ink py-3.5 px-5 sm:px-6">{row.feature}</th>
                          <td className="text-center py-3.5 px-3"><CellValue value={row.free} /></td>
                          <td className="text-center py-3.5 px-3"><CellValue value={row.starter} /></td>
                          <td className="text-center py-3.5 px-3 bg-sunken/50"><CellValue value={row.pro} /></td>
                          <td className="text-center py-3.5 px-3"><CellValue value={row.enterprise} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What the paid plans add */}
        <Section>
          <Reveal>
            <SectionHeading
              title="What the paid plans add"
              description="The free plan is the numbers and three analyzed videos. Paid analyzes every video you post and adds the rest."
            />
          </Reveal>
          <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
            {PAID_ADDS.map(({ title, desc }) => (
              <div key={title} className="border-t border-line/[0.14] pt-6">
                <h3 className="text-[15px] font-semibold text-ink mb-2">{title}</h3>
                <p className="text-body text-ink-2">{desc}</p>
              </div>
            ))}
          </Reveal>
        </Section>

        {/* Testimonials */}
        <Section>
          <Reveal>
            <SectionHeading title="Lab-tested. Creator-approved." />
          </Reveal>
          <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <figure key={t.name} className="lab-card p-5 sm:p-6 flex flex-col">
                <div className="flex gap-0.5 mb-4" aria-label={`${t.rating} out of 5 stars`} role="img">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} aria-hidden="true" className={`h-4 w-4 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-ink-3'}`} />
                  ))}
                </div>
                <blockquote className="text-lg text-ink leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-6 pt-5 border-t border-line/[0.08] flex items-center gap-3">
                  <span className="relative w-10 h-10 rounded-full overflow-hidden bg-sunken flex-shrink-0 ring-1 ring-line/[0.08]">
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-ink-2">{t.name.charAt(0)}</span>
                    {t.image && (
                      <img
                        src={t.image}
                        alt={t.name}
                        loading="lazy"
                        className="relative w-full h-full object-cover"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    )}
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-ink">{t.name}</span>
                    <span className="block text-meta text-ink-3">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </Section>

        {/* FAQ */}
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12">
            <Reveal>
              <SectionHeading title="Got questions?" />
            </Reveal>
            <Reveal>
              <FAQList items={FAQS} />
            </Reveal>
          </div>
        </Section>

        <FinalCTA
          title="See why your last videos did what they did."
          body="Connect your handles and the free plan starts tracking today. Three videos analyzed by tonight, your numbers every week after that."
          ctaHref={REGISTER}
          onCtaClick={() => capture('pricing_cta_clicked', { plan: 'unspecified', billing_period: billingInterval, location: 'marketing', position: 'final_cta', is_logged_in: false })}
          secondary={{ label: 'See what’s trending', href: '/trends' }}
          footnote="21,000+ videos analyzed · Free plan · No card · Cancel anytime. No contracts."
        />
      </main>

      <Footer />
    </div>
  );
}
