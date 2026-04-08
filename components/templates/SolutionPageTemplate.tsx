import { ChevronRight, ArrowRight, AlertTriangle, Lightbulb, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PublicNav } from '@/components/PublicNav';

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
    slug,
    personaName,
    heroTagline,
    heroHeadline,
    heroDescription,
    icon: Icon,
    iconColor,
    iconBg,
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
    <div className="min-h-screen lab-grid-bg">
      <PublicNav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-36">
        <ol className="flex items-center gap-1 text-sm text-slate-400">
          <li><a href="/" className="hover:text-slate-700 transition-colors">Home</a></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li><span className="hover:text-slate-700 transition-colors">Solutions</span></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li><span className="text-slate-600">{personaName}</span></li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
        <div className={`inline-flex items-center justify-center w-16 h-16 ${iconBg} rounded-2xl mb-6`}>
          <Icon className={`h-8 w-8 ${iconColor}`} />
        </div>
        <p className="text-sm font-semibold text-content-coral uppercase tracking-wider mb-3">{heroTagline}</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 max-w-3xl mx-auto leading-tight">{heroHeadline}</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">{heroDescription}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/register"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-content-cta-dark to-content-cta text-white rounded-xl font-bold shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all hover:scale-105 active:scale-95"
          >
            Get My Free Audit
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <a
            href="/pricing"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
          >
            See Pricing
          </a>
        </div>
      </section>

      {/* The Challenge */}
      <section className="bg-content-coral/[0.02] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 text-center mb-12">The Challenge</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((point, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 flex items-start gap-4 hover:shadow-md hover:border-content-coral/20 transition-all duration-200">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Content Labs Helps */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 text-center mb-12">How Content Labs Helps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md hover:border-content-coral/20 transition-all duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="h-4 w-4 text-green-600" />
                  </div>
                  <h3 className="font-bold text-slate-900">{s.title}</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-content-coral/[0.02] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 text-center mb-12">Key Features for {personaName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md hover:border-content-coral/20 transition-all duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-content-coral/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-4 w-4 text-content-coral" />
                  </div>
                  <h3 className="font-bold text-slate-900">{f.name}</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 text-center mb-12">How It Works</h2>
          <div className="space-y-8">
            {howItWorks.map((step, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-content-coral/10 border border-content-coral/20 flex items-center justify-center">
                  <span className="text-sm font-bold font-mono text-content-coral">{step.step}</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-content-coral/[0.02] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold text-slate-900 text-center mb-8">FAQ</h2>
          <div className="space-y-4">
            {faq.map((f, i) => (
              <details key={i} className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md hover:border-content-coral/20 transition-all duration-200">
                <summary className="flex items-center justify-between cursor-pointer p-5 text-left font-semibold text-slate-900 hover:bg-slate-50 transition-colors">
                  {f.q}
                  <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-90 flex-shrink-0 ml-4" />
                </summary>
                <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 mb-4">{cta}</h2>
          <p className="text-slate-600 mb-8">Join 47,598+ creators building data-driven content strategies.</p>
          <a
            href="/register"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-content-cta-dark to-content-cta text-white rounded-xl font-bold shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all hover:scale-105 active:scale-95"
          >
            Start My Free Audit - Plans from $39/mo
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
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
