import { ChevronRight, ArrowRight, Check, Sparkles, Star, Quote } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PublicNav } from '@/components/PublicNav';

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
    slug,
    title,
    heroTagline,
    heroHeadline,
    heroDescription,
    icon: Icon,
    iconColor,
    iconBg,
    benefits,
    howItWorks,
    cta,
    faq,
    heroImage,
    heroImageAlt,
    monitorLabel,
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

  const [featured, ...rest] = benefits;

  return (
    <div className="min-h-screen bg-[#fffbf9] text-slate-900 overflow-x-hidden">
      <PublicNav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />

      {/* ============================================================ */}
      {/* Hero                                                         */}
      {/* ============================================================ */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        {/* Background accents */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 lab-grid-bg opacity-90"
        />
        <div
          aria-hidden
          className="absolute -top-20 -right-40 -z-10 h-[480px] w-[480px] rounded-full bg-content-coral/20 blur-[120px]"
        />
        <div
          aria-hidden
          className="absolute -bottom-40 -left-40 -z-10 h-[420px] w-[420px] rounded-full bg-amber-200/30 blur-[120px]"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-1.5 text-sm text-slate-500">
              <li>
                <a href="/" className="hover:text-content-coral transition-colors">
                  Home
                </a>
              </li>
              <li><ChevronRight className="h-3.5 w-3.5 text-slate-400" /></li>
              <li>
                <a href="/#features" className="hover:text-content-coral transition-colors">
                  Features
                </a>
              </li>
              <li><ChevronRight className="h-3.5 w-3.5 text-slate-400" /></li>
              <li className="text-slate-900 font-medium">{title}</li>
            </ol>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${iconBg} border border-content-coral/15 mb-6`}>
              <Icon className={`h-4 w-4 ${iconColor}`} />
              <span className={`text-xs font-semibold uppercase tracking-wider ${iconColor}`}>
                {heroTagline}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight">
              {heroHeadline}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              {heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href="/register"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-content-cta-dark to-content-cta text-white rounded-xl font-bold shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                Get My Free Audit
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/70 backdrop-blur border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-white hover:border-slate-300 transition-all"
              >
                See Pricing
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 mt-8 text-sm text-slate-500 flex-wrap">
              <div className="flex -space-x-2">
                {TESTIMONIALS.map((t) => (
                  <img
                    key={t.name}
                    src={t.image}
                    alt={t.name}
                    className="h-7 w-7 rounded-full object-cover border-2 border-[#fffbf9] shadow-sm"
                  />
                ))}
              </div>
              <span>
                Trusted by creators across <strong className="text-slate-700">100+</strong> niches
              </span>
              <span className="text-slate-300">·</span>
              <div className="flex items-center gap-0.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Hero product shot                                            */}
      {/* ============================================================ */}
      {heroImage && (
        <section className="relative -mt-6 pb-12 sm:pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lab-monitor-frame-dark relative shadow-2xl shadow-content-coral/10 ring-1 ring-content-coral/10">
              <div
                aria-hidden
                className="absolute -top-12 -right-12 h-56 w-56 rounded-full bg-content-coral/20 blur-[80px] pointer-events-none -z-10"
              />
              <div className="lab-monitor-bar-dark">
                <span className="lab-monitor-dot bg-red-500/60" />
                <span className="lab-monitor-dot bg-amber-500/60" />
                <span className="lab-monitor-dot bg-green-500/60" />
                {monitorLabel && (
                  <span className="font-mono text-[10px] text-slate-500 ml-2 tracking-wider">
                    {monitorLabel}
                  </span>
                )}
              </div>
              <img
                src={heroImage}
                alt={heroImageAlt || `${title} preview`}
                loading="lazy"
                decoding="async"
                className="w-full h-auto block object-cover object-top"
              />
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* Trust Strip                                                  */}
      {/* ============================================================ */}
      <section className="border-y border-slate-200 bg-white/60 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {TRUST_STATS.map((t, i) => (
              <div
                key={i}
                className="text-center md:border-r md:last:border-r-0 border-slate-200"
              >
                <div className="text-2xl sm:text-3xl font-heading font-bold text-slate-900">
                  {t.stat}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1 uppercase tracking-wider">
                  {t.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Benefits (bento)                                             */}
      {/* ============================================================ */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-content-coral mb-3">
              What You Get
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 leading-tight">
              Everything built around one goal: you getting to your next viral video faster.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            {/* Featured benefit spans 3 columns on desktop */}
            <div className="md:col-span-3 md:row-span-2 group relative bg-gradient-to-br from-content-coral/5 via-white to-amber-50/40 rounded-2xl border border-content-coral/15 p-8 hover:border-content-coral/40 hover:shadow-xl hover:shadow-content-coral/5 transition-all duration-300 overflow-hidden">
              <div
                aria-hidden
                className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-content-coral/10 blur-3xl group-hover:bg-content-coral/20 transition-colors"
              />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-content-coral/10 border border-content-coral/20 mb-5">
                  <Sparkles className="h-3.5 w-3.5 text-content-coral" />
                  <span className="text-xs font-semibold text-content-coral uppercase tracking-wider">
                    Headline feature
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 mb-4 leading-tight">
                  {featured.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-[15px]">
                  {featured.description}
                </p>
              </div>
            </div>

            {rest.map((b, i) => (
              <div
                key={i}
                className="md:col-span-3 group bg-white rounded-2xl border border-slate-200 p-6 hover:border-content-coral/30 hover:shadow-lg hover:shadow-content-coral/5 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 mb-1.5 group-hover:text-content-coral transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* How It Works                                                 */}
      {/* ============================================================ */}
      <section className="py-24 bg-gradient-to-b from-white to-content-coral/[0.03]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-content-coral mb-3">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 leading-tight">
              Three steps from sign-up to actionable data.
            </h2>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {/* Desktop connector line */}
            <div
              aria-hidden
              className="hidden lg:block absolute top-10 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-content-coral/30 to-transparent"
            />

            {howItWorks.map((step, i) => (
              <div key={i} className="relative">
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="relative mb-5 z-10">
                    <div className="absolute inset-0 bg-content-coral/30 blur-lg rounded-full" />
                    <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-content-coral to-amber-500 shadow-lg shadow-content-coral/25 flex items-center justify-center">
                      <span className="text-3xl font-heading font-bold text-white">
                        {step.step}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-slate-900 mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[15px]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Testimonials                                                 */}
      {/* ============================================================ */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-content-coral mb-3">
              What creators say
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 leading-tight">
              Creators are using this to grow right now.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={i}
                className="relative bg-white rounded-2xl border border-slate-200 p-7 hover:border-content-coral/30 hover:shadow-lg hover:shadow-content-coral/5 transition-all duration-300"
              >
                <Quote className="h-7 w-7 text-content-coral/30 mb-4" />
                <blockquote className="text-slate-800 text-[15px] leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3 pt-5 border-t border-slate-100">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-content-coral/10"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 text-sm truncate">
                      {t.name}
                    </div>
                    <div className="text-xs text-slate-500 truncate">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FAQ                                                          */}
      {/* ============================================================ */}
      <section className="py-24 bg-gradient-to-b from-content-coral/[0.03] to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-content-coral mb-3">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
              Common questions
            </h2>
          </div>

          <div className="space-y-3">
            {faq.map((f, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-slate-200 open:border-content-coral/30 open:shadow-md open:shadow-content-coral/5 overflow-hidden transition-all duration-200"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 text-left font-semibold text-slate-900 hover:text-content-coral transition-colors list-none [&::-webkit-details-marker]:hidden">
                  <span className="pr-4">{f.q}</span>
                  <span
                    className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 group-open:bg-content-coral/15 group-open:text-content-coral group-open:rotate-90 group-open:scale-110 group-hover:bg-content-coral/10 group-hover:text-content-coral transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    aria-hidden="true"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </summary>
                <div className="px-5 pb-5 text-[15px] text-slate-600 leading-relaxed">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Final CTA                                                    */}
      {/* ============================================================ */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 px-8 py-16 sm:px-16 sm:py-20 overflow-hidden border border-slate-800">
            <div
              aria-hidden
              className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-content-coral/30 blur-[100px]"
            />
            <div
              aria-hidden
              className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-amber-400/20 blur-[100px]"
            />

            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-5 leading-[1.1]">
                {cta}
              </h2>
              <p className="text-slate-300 mb-10 text-lg">
                Built for creators who take their content seriously.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  href="/register"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-content-cta-dark to-content-cta text-white rounded-xl font-bold shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/50 transition-all hover:scale-[1.03] active:scale-[0.98]"
                >
                  Start My Free Audit
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="/pricing"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur border border-white/10 text-white rounded-xl font-semibold hover:bg-white/15 transition-all"
                >
                  Plans from $39/mo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple footer */}
      <footer className="border-t border-slate-200 py-8 text-center">
        <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
          <a href="/" className="hover:text-slate-900 transition-colors">&larr; Home</a>
          <span>&middot;</span>
          <a href="/pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
          <span>&middot;</span>
          <a href="/blog" className="hover:text-slate-900 transition-colors">Resources</a>
        </div>
      </footer>
    </div>
  );
}
