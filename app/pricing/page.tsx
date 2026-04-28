'use client';

import { useState } from 'react';
import { PublicNav } from '@/components/PublicNav';
import { motion, type Variants } from 'framer-motion';
import {
  Check,
  Zap,
  Calendar,
  BarChart3,
  Atom,
  Target,
  Sparkles,
  Star,
  ChevronLeft,
  ChevronDown,
  Crown,
  Shield,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
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
    competitors: 6,
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
  starter: { price: 39, yearlyPrice: 390 },
  pro: { price: 79, yearlyPrice: 790 },
  enterprise: { price: 129, yearlyPrice: 1290 },
} as const;

/* ------------------------------------------------------------------ */
/*  Motion variants (inlined to avoid importing app internals)        */
/* ------------------------------------------------------------------ */
const VIEWPORT_ONCE = { once: true, margin: '-50px' } as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const fadeUpBlur: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const popIn: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const fanIn = (index: number): Variants => ({
  hidden: { opacity: 0, y: 40, rotate: index === 0 ? -3 : index === 2 ? 3 : 0 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: index * 0.1 },
  },
});

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ------------------------------------------------------------------ */
/*  Schema markup                                                     */
/* ------------------------------------------------------------------ */
const faqSchemaData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Can't I just use ChatGPT for this?", acceptedAnswer: { '@type': 'Answer', text: "ChatGPT doesn't know your content performance, your niche, or your competitors. We've analyzed over 10,000 videos across every niche and use that data, plus your content and your competitors', to build a strategy based on what's actually working." } },
    { '@type': 'Question', name: 'Is it actually worth $39-129 a month?', acceptedAnswer: { '@type': 'Answer', text: 'A content strategist costs $2-5K a month. Doing the research yourself takes 10+ hours a week. We give you the same output for less than the cost of a nice dinner. Try our free content audit before you pay anything.' } },
    { '@type': 'Question', name: 'Will the scripts actually sound like me?', acceptedAnswer: { '@type': 'Answer', text: "We don't write content for you. We give you the strategy, the structure, and the hooks based on what's working in your niche. You bring your voice and personality." } },
    { '@type': 'Question', name: "What if it doesn't work for my niche?", acceptedAnswer: { '@type': 'Answer', text: "Every strategy we generate is built from real data in your niche: your content performance and your competitors' top-performing videos. Cancel anytime, no contracts, no hassle." } },
    { '@type': 'Question', name: "What's the difference between plans?", acceptedAnswer: { '@type': 'Answer', text: 'Starter gives you a monthly content audit, competitor analysis, strategy, and 30-idea calendar. Pro adds daily automatic video tracking, weekly competitor refreshes, a fresh 7-day calendar and strategy every week, advanced analytics, and priority support. Studio includes everything in Pro plus more competitors, more videos per competitor, team seats, and higher Chemist credits.' } },
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
    { '@type': 'Offer', name: 'Starter Plan', price: '39', priceCurrency: 'USD', priceValidUntil: '2027-12-31', availability: 'https://schema.org/InStock' },
    { '@type': 'Offer', name: 'Pro Plan', price: '79', priceCurrency: 'USD', priceValidUntil: '2027-12-31', availability: 'https://schema.org/InStock' },
    { '@type': 'Offer', name: 'Studio Plan', price: '129', priceCurrency: 'USD', priceValidUntil: '2027-12-31', availability: 'https://schema.org/InStock' },
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
/*  FAQ Accordion                                                     */
/* ------------------------------------------------------------------ */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      className="w-full text-left bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-content-coral focus-visible:ring-offset-2 focus-visible:outline-none shadow-sm"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900 pr-4">{question}</h3>
        <span
          className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            open
              ? 'bg-content-coral/15 text-content-coral rotate-180 scale-110'
              : 'bg-slate-100 text-slate-500'
          }`}
          aria-hidden="true"
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </div>
      {open && (
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">{answer}</p>
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Hardcoded testimonials                                            */
/* ------------------------------------------------------------------ */
const testimonials = [
  { name: 'Jen Thompson', role: '11-Time World Champion Powerlifter', quote: 'This Content Strategy Was a Game Changer!', rating: 5, image: '/testimonials/jen-thompson.jpg' },
  { name: 'Matt Gehlbach', role: 'Full Time Firefighter & Business Owner', quote: 'Helped me scale my coaching business so fast, I literally had to start saying no to people.', rating: 5, image: '/testimonials/matt-gehlbach.jpg' },
  { name: 'Manny Watkins', role: 'Former D1 Basketball Star & Coach', quote: "It's a detailed, strategic approach. Not just 'post consistently and hope for growth.'", rating: 5, image: '/testimonials/manny-watkins.jpg' },
];

/* ================================================================== */
/*  Page Component                                                    */
/* ================================================================== */
export default function PricingPage() {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('yearly');
  const [showComparison, setShowComparison] = useState(false);

  const starter = PRODUCTS.starter;
  const pro = PRODUCTS.pro;
  const enterprise = PRODUCTS.enterprise;

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
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

      <div className="relative overflow-x-hidden">
        {/* Navigation */}
        <PublicNav />

        <main>
        {/* Hero + breadcrumb share a single gradient background so there's no
            harsh transition between the fixed nav area and the hero. */}
        <section
          style={{ background: 'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(255,124,14,0.08) 0%, transparent 55%)' }}
        >
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <ol className="flex items-center gap-1 text-sm text-slate-400">
            <li><a href="/" className="hover:text-slate-700 transition-colors">Home</a></li>
            <li><ChevronDown className="h-3 w-3 -rotate-90" /></li>
            <li><span className="text-slate-600">Pricing</span></li>
          </ol>
        </nav>

        {/* Hero */}
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-center"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={fadeUpBlur}
          >
            <div className="flex flex-col items-center gap-3 mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-content-coral/10 backdrop-blur-sm rounded-full border border-content-coral/20">
                <Shield className="h-4 w-4 text-content-coral mr-2" />
                <span className="text-sm font-medium text-content-coral-700">Get a free content audit in minutes</span>
              </div>
            </div>
          </motion.div>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={fadeUpBlur}
            className="text-[clamp(1.45rem,4.5vw,4.5rem)] font-bold tracking-tight mb-6"
          >
            <span className="block whitespace-nowrap text-slate-900 pb-1 leading-tight">
              Post What Actually Works.
            </span>
            <span className="block whitespace-nowrap bg-gradient-to-r from-content-cta-dark to-content-cta bg-clip-text text-transparent pb-2 leading-tight">
              Pick Your Plan.
            </span>
          </motion.h1>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={fadeUp}
            className="text-xl text-slate-600 max-w-3xl mx-auto"
          >
            Your content strategy, competitor insights, and a 30-day calendar with scripts. All based on what&apos;s working in your niche.
          </motion.p>

          {/* Billing toggle */}
          <div className="flex flex-col items-center mt-10 gap-4">
            <div className="relative inline-flex items-center p-1.5 bg-slate-100 rounded-2xl shadow-sm border border-slate-200">
              <button
                onClick={() => setBillingInterval('monthly')}
                className={`relative z-10 px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  billingInterval === 'monthly'
                    ? 'text-white'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingInterval('yearly')}
                className={`relative z-10 px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  billingInterval === 'yearly'
                    ? 'text-white'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Yearly
              </button>
              {/* Sliding background */}
              <div
                className={`absolute top-1.5 h-[calc(100%-12px)] w-[calc(50%-6px)] rounded-xl bg-gradient-to-r from-content-cta-dark to-content-cta shadow-lg shadow-content-cta/30 transition-all duration-300 ${
                  billingInterval === 'yearly' ? 'left-[calc(50%+3px)]' : 'left-1.5'
                }`}
              />
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-content-cta/10 border border-content-cta/20 rounded-full">
              <Sparkles className="h-4 w-4 text-content-cta" />
              <span className="text-sm font-bold text-content-cta-dark">
                {billingInterval === 'yearly'
                  ? "You're saving up to $258/year!"
                  : 'Go yearly and save up to $258'
                }
              </span>
            </div>
          </div>
        </div>
        </section>

        {/* Pricing Cards */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={staggerContainer}
            className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8"
          >

            {/* Starter Plan */}
            <motion.div variants={popIn} className="relative w-full max-w-md lg:flex-1 group">
              <div className="relative bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-md hover:border-slate-300 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-content-coral/10 rounded-xl">
                    <Zap className="h-6 w-6 text-content-coral" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Starter</h3>
                    <p className="text-xs text-slate-500">For creators ready to start growing</p>
                  </div>
                </div>

                <div className="flex items-baseline mb-6">
                  {billingInterval === 'yearly' ? (
                    <>
                      <span className="text-4xl sm:text-5xl font-bold text-slate-900">${Math.round(starter.yearlyPrice / 12)}</span>
                      <span className="ml-2 text-xl text-slate-400">/mo</span>
                      <span className="ml-3 text-sm text-slate-400 line-through">${starter.price}/mo</span>
                    </>
                  ) : (
                    <>
                      <span className="text-4xl sm:text-5xl font-bold text-slate-900">${starter.price}</span>
                      <span className="ml-2 text-xl text-slate-400">/month</span>
                    </>
                  )}
                </div>
                {billingInterval === 'yearly' && (
                  <div className="-mt-4 mb-6">
                    <p className="text-sm text-content-cta">${starter.yearlyPrice} billed annually. You save ${starter.price * 12 - starter.yearlyPrice}</p>
                    <p className="text-xs text-slate-400 mt-1">That&apos;s ${(starter.yearlyPrice / 365).toFixed(2)}/day, less than a coffee</p>
                  </div>
                )}

                <a
                  href="https://thecontentlabs.app/register"
                  onClick={() => trackPricingCta('starter', billingInterval, 'plan_card')}
                  className="w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-content-cta-dark to-content-cta text-white rounded-xl font-bold shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all hover:scale-105 active:scale-95"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>

                <ul className="mt-8 space-y-4 flex-1">
                  {[
                    'Monthly Content Analysis (25 videos / platform)',
                    `${PLAN_LIMITS.starter.competitors} Competitors (${PLAN_LIMITS.starter.videosPerCompetitor} videos each)`,
                    '30-Day Content Calendar (monthly)',
                    'Monthly Strategy Refresh',
                    `The Chemist AI (${PLAN_LIMITS.starter.labCreditsPerMonth} Credits / mo)`,
                    'Video Compare Tool',
                    'Email Support',
                  ].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-content-coral mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Pro Plan */}
            <motion.div variants={popIn} className="relative w-full max-w-md lg:flex-1 group">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-gradient-to-r from-content-cta-dark to-content-cta text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-content-cta/30 flex items-center">
                  <Star className="h-4 w-4 mr-2 fill-white" />
                  Most Popular
                </div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-content-cta/30 to-content-cta-dark/30 rounded-3xl blur-xl opacity-50"></div>
              <div className="relative bg-white rounded-3xl p-5 sm:p-8 border-2 border-content-cta/40 hover:border-content-cta/60 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-content-cta/10 rounded-xl">
                    <Crown className="h-6 w-6 text-content-cta" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Pro</h3>
                    <p className="text-xs text-slate-500">For creators ready to break through</p>
                  </div>
                </div>

                <div className="flex items-baseline mb-6">
                  {billingInterval === 'yearly' ? (
                    <>
                      <span className="text-4xl sm:text-5xl font-bold text-slate-900">${Math.round(pro.yearlyPrice / 12)}</span>
                      <span className="ml-2 text-xl text-slate-400">/mo</span>
                      <span className="ml-3 text-sm text-slate-400 line-through">${pro.price}/mo</span>
                    </>
                  ) : (
                    <>
                      <span className="text-4xl sm:text-5xl font-bold text-slate-900">${pro.price}</span>
                      <span className="ml-2 text-xl text-slate-400">/month</span>
                    </>
                  )}
                </div>
                {billingInterval === 'yearly' && (
                  <div className="-mt-4 mb-6">
                    <p className="text-sm text-content-cta">${pro.yearlyPrice} billed annually. You save ${pro.price * 12 - pro.yearlyPrice}</p>
                    <p className="text-xs text-slate-400 mt-1">That&apos;s ${(pro.yearlyPrice / 365).toFixed(2)}/day</p>
                  </div>
                )}

                <a
                  href="https://thecontentlabs.app/register"
                  onClick={() => trackPricingCta('pro', billingInterval, 'plan_card')}
                  className="w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-content-cta-dark to-content-cta text-white rounded-xl font-bold shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all hover:scale-105 active:scale-95"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>

                <ul className="mt-8 space-y-4 flex-1">
                  {[
                    'Daily Video Tracking (7 videos / platform)',
                    `${PLAN_LIMITS.pro.competitors} Competitors (${PLAN_LIMITS.pro.videosPerCompetitor} videos each)`,
                    'Weekly Competitor Refreshes',
                    '7-Day Content Calendar (weekly)',
                    'Weekly Strategy Refresh',
                    `The Chemist AI (${PLAN_LIMITS.pro.labCreditsPerMonth} Credits / mo)`,
                    'Video Compare Tool',
                    'Advanced Analytics Dashboard',
                    'Priority Support (24hr response)',
                  ].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-content-cta mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Studio Plan */}
            <motion.div variants={popIn} className="relative w-full max-w-md lg:flex-1 group">
              <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 rounded-3xl blur-xl opacity-50"></div>
              <div className="relative bg-white rounded-3xl p-5 sm:p-8 border-2 border-purple-400/40 hover:border-purple-400/60 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-purple-500/10 rounded-xl">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Studio</h3>
                    <p className="text-xs text-slate-500">For teams and agencies</p>
                  </div>
                </div>

                <div className="flex items-baseline mb-6">
                  {billingInterval === 'yearly' ? (
                    <>
                      <span className="text-4xl sm:text-5xl font-bold text-slate-900">${Math.round(enterprise.yearlyPrice / 12)}</span>
                      <span className="ml-2 text-xl text-slate-400">/mo</span>
                      <span className="ml-3 text-sm text-slate-400 line-through">${enterprise.price}/mo</span>
                    </>
                  ) : (
                    <>
                      <span className="text-4xl sm:text-5xl font-bold text-slate-900">${enterprise.price}</span>
                      <span className="ml-2 text-xl text-slate-400">/month</span>
                    </>
                  )}
                </div>
                {billingInterval === 'yearly' && (
                  <div className="-mt-4 mb-6">
                    <p className="text-sm text-purple-600">${enterprise.yearlyPrice} billed annually. You save ${enterprise.price * 12 - enterprise.yearlyPrice}</p>
                    <p className="text-xs text-slate-400 mt-1">That&apos;s ${(enterprise.yearlyPrice / 365).toFixed(2)}/day</p>
                  </div>
                )}

                <a
                  href="https://thecontentlabs.app/register"
                  onClick={() => trackPricingCta('enterprise', billingInterval, 'plan_card')}
                  className="w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-purple-600/25 hover:shadow-xl hover:shadow-purple-600/40 transition-all hover:scale-105 active:scale-95"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>

                <ul className="mt-8 space-y-4 flex-1">
                  {[
                    'Daily Video Tracking (10 videos / platform)',
                    `${PLAN_LIMITS.enterprise.competitors} Competitors (${PLAN_LIMITS.enterprise.videosPerCompetitor} videos each)`,
                    'Weekly Competitor Refreshes',
                    '7-Day Content Calendar (weekly)',
                    'Weekly Strategy Refresh',
                    `The Chemist AI (${PLAN_LIMITS.enterprise.labCreditsPerMonth} Credits / mo)`,
                    'Video Compare Tool',
                    '2 Team Seats',
                    'Advanced Analytics Dashboard',
                    'Priority Support (24hr response)',
                  ].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>

          {/* Trust badges */}
          <div className="text-center mt-12">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 px-6 sm:px-8 py-4 bg-content-coral/10 backdrop-blur-sm rounded-2xl border border-content-coral/20">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-content-coral" />
                <span className="text-content-coral-700 font-medium text-sm">Free content audit included</span>
              </div>
              <div className="hidden sm:block h-6 w-px bg-slate-300"></div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-content-coral" />
                <span className="text-slate-600 text-sm">Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Inline comparison toggle */}
          <div className="mt-10">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="mx-auto flex items-center gap-3 px-6 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-2xl text-base font-medium text-slate-600 hover:text-slate-900 transition-all duration-300"
            >
              <Atom className="h-5 w-5 text-content-coral" />
              Compare plans side by side
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  showComparison ? 'rotate-180 text-content-coral' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                showComparison ? 'max-h-[800px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'
              }`}
            >
              <div className="bg-white border border-slate-200 rounded-3xl overflow-x-auto shadow-sm">
                <table className="w-full min-w-[480px]">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left text-xs sm:text-sm font-medium text-slate-500 py-4 sm:py-5 px-3 sm:px-6">Feature</th>
                      <th className="text-center text-xs sm:text-sm font-bold text-content-coral py-4 sm:py-5 px-2 sm:px-4">Starter</th>
                      <th className="text-center text-xs sm:text-sm font-bold text-content-cta py-4 sm:py-5 px-2 sm:px-4">Pro</th>
                      <th className="text-center text-xs sm:text-sm font-bold text-purple-600 py-4 sm:py-5 px-2 sm:px-4">Studio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {([
                      { feature: 'Video Tracking', starter: '25 / month', pro: '7 / day', enterprise: '10 / day' },
                      { feature: 'Tracking Cadence', starter: 'Monthly', pro: 'Daily', enterprise: 'Daily' },
                      { feature: 'Competitors', starter: `${PLAN_LIMITS.starter.competitors}`, pro: `${PLAN_LIMITS.pro.competitors}`, enterprise: `${PLAN_LIMITS.enterprise.competitors}` },
                      { feature: 'Videos per Competitor', starter: `${PLAN_LIMITS.starter.videosPerCompetitor}`, pro: `${PLAN_LIMITS.pro.videosPerCompetitor}`, enterprise: `${PLAN_LIMITS.enterprise.videosPerCompetitor}` },
                      { feature: 'Competitor Refreshes', starter: 'Monthly', pro: 'Weekly', enterprise: 'Weekly' },
                      { feature: 'Content Calendar', starter: '30 ideas / month', pro: '7-day / week', enterprise: '7-day / week' },
                      { feature: 'Strategy Refresh', starter: '1 / month', pro: '1 / week', enterprise: '1 / week' },
                      { feature: 'The Chemist AI', starter: `${PLAN_LIMITS.starter.labCreditsPerMonth} Credits`, pro: `${PLAN_LIMITS.pro.labCreditsPerMonth} Credits`, enterprise: `${PLAN_LIMITS.enterprise.labCreditsPerMonth} Credits` },
                      { feature: 'Video Compare Tool', starter: true as string | boolean, pro: true as string | boolean, enterprise: true as string | boolean },
                      { feature: 'Team Seats', starter: '1', pro: '1', enterprise: '2' },
                      { feature: 'Advanced Analytics', starter: false as string | boolean, pro: true as string | boolean, enterprise: true as string | boolean },
                      { feature: 'Priority Support', starter: false as string | boolean, pro: true as string | boolean, enterprise: true as string | boolean },
                    ] as { feature: string; starter: string | boolean; pro: string | boolean; enterprise: string | boolean }[]).map(({ feature, starter: s, pro: p, enterprise: e }) => (
                      <tr key={feature} className="hover:bg-slate-50 transition-colors">
                        <td className="text-xs sm:text-sm text-slate-700 py-3 sm:py-4 px-3 sm:px-6">{feature}</td>
                        <td className="text-center py-3 sm:py-4 px-2 sm:px-4">
                          {typeof s === 'boolean' ? (
                            s ? (
                              <Check className="h-4 w-4 sm:h-5 sm:w-5 text-content-coral mx-auto" />
                            ) : (
                              <span className="text-slate-300">&mdash;</span>
                            )
                          ) : (
                            <span className="text-xs sm:text-sm text-slate-600">{s}</span>
                          )}
                        </td>
                        <td className="text-center py-3 sm:py-4 px-2 sm:px-4">
                          {typeof p === 'boolean' ? (
                            p ? (
                              <Check className="h-4 w-4 sm:h-5 sm:w-5 text-content-cta mx-auto" />
                            ) : (
                              <span className="text-slate-300">&mdash;</span>
                            )
                          ) : (
                            <span className="text-xs sm:text-sm font-medium text-slate-900">{p}</span>
                          )}
                        </td>
                        <td className="text-center py-3 sm:py-4 px-2 sm:px-4">
                          {typeof e === 'boolean' ? (
                            e ? (
                              <Check className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mx-auto" />
                            ) : (
                              <span className="text-slate-300">&mdash;</span>
                            )
                          ) : (
                            <span className="text-xs sm:text-sm font-medium text-slate-900">{e}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* What You Get */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 relative bg-content-coral/[0.02]">
          <div className="relative max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything You Need in One Platform</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Stop juggling a dozen tools. The Content Labs gives you the complete toolkit to go from idea to viral content.</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { icon: Atom, title: 'The Chemist', desc: 'Your content strategist trained on viral patterns', gradient: 'from-content-coral/20 to-content-coral/5' },
                { icon: Target, title: 'Competitor Intel', desc: "See exactly what's working in your niche", gradient: 'from-content-coral/20 to-content-coral/5' },
                { icon: BarChart3, title: 'Content Audits', desc: "Deep analysis of what's performing and why", gradient: 'from-content-coral/20 to-content-coral/5' },
                { icon: Calendar, title: 'Smart Calendar', desc: "AI-generated content calendar you'll actually follow", gradient: 'from-content-coral/20 to-content-coral/5' },
              ].map(({ icon: Icon, title, desc, gradient }) => (
                <motion.div key={title} variants={popIn} className="group relative">
                  <div className="relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-content-coral/20 transition-all duration-300 h-full shadow-sm group-hover:-translate-y-1">
                    <div className={`inline-flex p-3 bg-gradient-to-br ${gradient} rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-content-coral" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 relative bg-content-navy">
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />
          <div className="relative max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">Lab-Tested. Creator-Approved.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, index) => (
                <motion.div
                  key={t.name + index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_ONCE}
                  variants={fanIn(index % 3)}
                  className="group relative"
                >
                  <div className="relative bg-slate-800/60 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 shadow-sm hover:border-content-coral/30 transition-all duration-300 h-full flex flex-col group-hover:-translate-y-2">
                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full overflow-hidden border-4 border-slate-700 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-700 text-white text-lg font-bold">{t.name.charAt(0)}</div>
                      {t.image && <img src={t.image} alt={t.name} className="relative w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />}
                    </div>

                    <div className="inline-flex items-center self-start px-3 py-1.5 rounded-full mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                      ))}
                    </div>

                    <div className="mb-4 mt-4">
                      <svg width="40" height="32" className="text-slate-700 fill-current">
                        <path d="M13.415.001C6.07 5.185.887 13.681.887 23.041c0 7.632 4.608 12.096 9.936 12.096 5.04 0 8.784-4.032 8.784-8.784 0-4.752-3.312-8.208-7.632-8.208-.864 0-2.016.144-2.304.288.72-4.896 5.328-10.656 9.936-13.536L13.415.001zm24.768 0c-7.2 5.184-12.384 13.68-12.384 23.04 0 7.632 4.608 12.096 9.936 12.096 4.896 0 8.784-4.032 8.784-8.784 0-4.752-3.456-8.208-7.776-8.208-.864 0-1.872.144-2.16.288.72-4.896 5.184-10.656 9.792-13.536L38.183.001z"></path>
                      </svg>
                    </div>

                    <p className="text-slate-300 text-lg mb-8 leading-relaxed italic flex-1">&ldquo;{t.quote}&rdquo;</p>

                    <div className="mt-auto">
                      <p className="font-bold text-white">{t.name}</p>
                      <p className="text-slate-400 text-sm">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-content-coral/[0.02]"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Got questions?</h2>
          </motion.div>
          <div className="space-y-4">
            {[
              { question: "Can't I just use ChatGPT for this?", answer: "ChatGPT doesn't know your content performance, your niche, or your competitors. It gives generic advice because it has no data to work with. We've analyzed over 10,000 videos across every niche and we use that data, plus your content and your competitors', to build a strategy based on what's actually working." },
              { question: "Is it actually worth $39-129 a month?", answer: "A content strategist costs $2-5K a month. Doing the research yourself takes 10+ hours a week. We give you the same output for less than the cost of a nice dinner. One of our creators grew so fast he had to start turning away clients. Plus, you can try our free content audit before you pay anything." },
              { question: "Will the scripts actually sound like me?", answer: "We don't write content for you. We give you the strategy, the structure, and the hooks based on what's working in your niche. You bring your voice and personality. Think of it as getting a brief from a strategist, not a script from a ghostwriter." },
              { question: "What if it doesn't work for my niche?", answer: "Every strategy we generate is built from real data in your niche: your content performance and your competitors' top-performing videos. It's not generic advice. And you can cancel anytime, no contracts, no hassle." },
              { question: "What's the difference between plans?", answer: `Starter gives you ${PLAN_LIMITS.starter.videoAudits} video audits, ${PLAN_LIMITS.starter.competitors} competitor analyses, and ${PLAN_LIMITS.starter.calendarItems} calendar ideas per month. Pro bumps that to ${PLAN_LIMITS.pro.videoAudits} audits, ${PLAN_LIMITS.pro.competitors} competitors, ${PLAN_LIMITS.pro.calendarItems} calendar ideas, plus analytics and priority support. Studio goes further with ${PLAN_LIMITS.enterprise.videoAudits} audits, ${PLAN_LIMITS.enterprise.competitors} competitors, ${PLAN_LIMITS.enterprise.calendarItems} calendar ideas, ${PLAN_LIMITS.enterprise.strategiesPerMonth} strategies/mo, ${PLAN_LIMITS.enterprise.calendarGenerationsPerMonth} calendar generations/mo, ${PLAN_LIMITS.enterprise.labCreditsPerMonth} Chemist Lab Credits/mo, 2 team seats, and 2 analysis cycles per month.` },
              { question: "Can I cancel my subscription anytime?", answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period. No hidden fees, no hassle." },
              { question: "Can I upgrade or downgrade my plan?", answer: "Absolutely. You can change your plan at any time through your account settings. Changes are prorated and take effect immediately." },
            ].map((item, index) => (
              <motion.div key={index} variants={popIn}>
                <FAQItem question={item.question} answer={item.answer} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 relative"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(255,124,14,0.08) 0%, transparent 55%)' }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={staggerContainer}
            className="relative max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-content-coral/10 border border-content-coral/25">
              <span className="h-1.5 w-1.5 rounded-full bg-content-coral animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-content-coral font-bold">
                47,598 creators · No card · 60 seconds
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-heading text-3xl sm:text-5xl md:text-[56px] font-semibold tracking-tight text-slate-900 mb-5 leading-[1.05]">
              Stop guessing what to post<span className="text-content-coral">.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Every week without a strategy is another week of posting and hoping. Connect TikTok and Instagram, get a 30-day calendar in under 10 minutes.
            </motion.p>
            <motion.div variants={scaleIn} className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
              <a
                href="https://thecontentlabs.app/register"
                onClick={() => capture('pricing_cta_clicked', { plan: 'unspecified', billing_period: billingInterval, location: 'marketing', position: 'final_cta', is_logged_in: false })}
                className="lab-bubbles group inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-content-cta-dark to-content-cta rounded-xl font-bold text-lg text-white shadow-lg shadow-content-cta/30 hover:shadow-xl hover:shadow-content-cta/50 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Get my free audit
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="/trends"
                className="inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:border-content-coral/40 hover:text-content-coral transition-all"
              >
                See what&rsquo;s trending
              </a>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-6 text-sm text-slate-500">Cancel anytime. No contracts.</motion.p>
          </motion.div>
        </section>
        </main>
      </div>
    </div>
  );
}
