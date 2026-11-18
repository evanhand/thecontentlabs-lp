import { ChevronRight, ArrowRight } from 'lucide-react';

/* -- Breadcrumbs -- */

interface BreadcrumbItem {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schemaItems = [
    { "@type": "ListItem" as const, "position": 1, "name": "Home", "item": "https://thecontentlabs.app/" },
    { "@type": "ListItem" as const, "position": 2, "name": "Resources", "item": "https://thecontentlabs.app/blog" },
    ...items.map((item, i) => ({
      "@type": "ListItem" as const,
      "position": i + 3,
      "name": item.label,
      ...(item.to ? { "item": `https://thecontentlabs.app${item.to}` } : {}),
    })),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": schemaItems,
        }) }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 text-meta text-ink-3 flex-wrap">
          <li><a href="/" className="hover:text-ink transition-colors">Home</a></li>
          <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
          <li><a href="/blog" className="hover:text-ink transition-colors">Resources</a></li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1 min-w-0">
              <ChevronRight aria-hidden className="h-3.5 w-3.5 flex-shrink-0" />
              {item.to ? (
                <a href={item.to} className="hover:text-ink transition-colors">{item.label}</a>
              ) : (
                <span aria-current="page" className="text-ink-2 line-clamp-1">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/* -- Related Resources -- */

interface RelatedItem {
  title: string;
  slug: string;
  type: 'comparison' | 'guide' | 'niche';
}

const TYPE_LABELS = {
  comparison: 'Comparison',
  guide: 'Guide',
  niche: 'Niche Guide',
};

export function RelatedResources({ items }: { items: RelatedItem[] }) {
  return (
    <section className="border-t border-line/[0.08] pt-8">
      <h2 className="font-heading text-section text-ink mb-4">Related resources</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map(item => (
          <a
            key={item.slug}
            href={`/blog/${item.slug}`}
            className="group lab-card flex flex-col gap-1.5 p-5 transition-colors hover:border-line/[0.16]"
          >
            <span className="text-meta text-ink-3">{TYPE_LABELS[item.type]}</span>
            <span className="text-[15px] font-semibold text-ink leading-snug">
              {item.title}
            </span>
            <span className="mt-1 inline-flex items-center text-meta font-medium text-ink-2 group-hover:text-ink transition-colors">
              Read more <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* -- Pre-built related item sets for each page -- */

export const RELATED = {
  vsChatGPT: [
    { title: 'Best AI Content Strategy Tools', slug: 'best-ai-content-strategy-tools', type: 'comparison' as const },
    { title: 'Content Labs vs Later', slug: 'content-labs-vs-later', type: 'comparison' as const },
    { title: 'Content Labs vs Jasper', slug: 'content-labs-vs-jasper', type: 'comparison' as const },
    { title: 'What Is AI Content Strategy?', slug: 'what-is-ai-content-strategy', type: 'guide' as const },
  ],
  vsLater: [
    { title: 'Content Labs vs ChatGPT', slug: 'content-labs-vs-chatgpt', type: 'comparison' as const },
    { title: 'Content Labs vs Jasper', slug: 'content-labs-vs-jasper', type: 'comparison' as const },
    { title: 'Best AI Content Strategy Tools', slug: 'best-ai-content-strategy-tools', type: 'comparison' as const },
    { title: 'How to Create a Content Calendar', slug: 'how-to-create-content-calendar', type: 'guide' as const },
  ],
  vsJasper: [
    { title: 'Content Labs vs ChatGPT', slug: 'content-labs-vs-chatgpt', type: 'comparison' as const },
    { title: 'Content Labs vs Later', slug: 'content-labs-vs-later', type: 'comparison' as const },
    { title: 'Best AI Content Strategy Tools', slug: 'best-ai-content-strategy-tools', type: 'comparison' as const },
    { title: 'What Is AI Content Strategy?', slug: 'what-is-ai-content-strategy', type: 'guide' as const },
  ],
  bestTools: [
    { title: 'Content Labs vs ChatGPT', slug: 'content-labs-vs-chatgpt', type: 'comparison' as const },
    { title: 'Content Labs vs Later', slug: 'content-labs-vs-later', type: 'comparison' as const },
    { title: 'Content Labs vs Jasper', slug: 'content-labs-vs-jasper', type: 'comparison' as const },
    { title: 'What Is AI Content Strategy?', slug: 'what-is-ai-content-strategy', type: 'guide' as const },
  ],
  whatIsAIStrategy: [
    { title: 'TikTok Content Strategy Guide', slug: 'tiktok-content-strategy-guide', type: 'guide' as const },
    { title: 'How to Create a Content Calendar', slug: 'how-to-create-content-calendar', type: 'guide' as const },
    { title: 'Content Labs vs ChatGPT', slug: 'content-labs-vs-chatgpt', type: 'comparison' as const },
    { title: 'AI Strategy for Fitness', slug: 'ai-content-strategy-fitness', type: 'niche' as const },
    { title: 'AI Strategy for Coaching', slug: 'ai-content-strategy-coaching', type: 'niche' as const },
    { title: 'AI Strategy for Real Estate', slug: 'ai-content-strategy-real-estate', type: 'niche' as const },
  ],
  tiktokGuide: [
    { title: 'How to Create a Content Calendar', slug: 'how-to-create-content-calendar', type: 'guide' as const },
    { title: 'What Is AI Content Strategy?', slug: 'what-is-ai-content-strategy', type: 'guide' as const },
    { title: 'Best AI Content Strategy Tools', slug: 'best-ai-content-strategy-tools', type: 'comparison' as const },
    { title: 'AI Strategy for Fitness', slug: 'ai-content-strategy-fitness', type: 'niche' as const },
    { title: 'AI Strategy for Cooking', slug: 'ai-content-strategy-cooking', type: 'niche' as const },
  ],
  contentCalendar: [
    { title: 'TikTok Content Strategy Guide', slug: 'tiktok-content-strategy-guide', type: 'guide' as const },
    { title: 'What Is AI Content Strategy?', slug: 'what-is-ai-content-strategy', type: 'guide' as const },
    { title: 'Content Labs vs Later', slug: 'content-labs-vs-later', type: 'comparison' as const },
    { title: 'AI Strategy for E-commerce', slug: 'ai-content-strategy-ecommerce', type: 'niche' as const },
  ],
};

// For niche pages: related items excluding the current niche
const ALL_NICHES = [
  { title: 'AI Strategy for Fitness', slug: 'ai-content-strategy-fitness' },
  { title: 'AI Strategy for Real Estate', slug: 'ai-content-strategy-real-estate' },
  { title: 'AI Strategy for Finance', slug: 'ai-content-strategy-finance' },
  { title: 'AI Strategy for Cooking & Food', slug: 'ai-content-strategy-cooking' },
  { title: 'AI Strategy for Coaching', slug: 'ai-content-strategy-coaching' },
  { title: 'AI Strategy for E-commerce', slug: 'ai-content-strategy-ecommerce' },
];

export function getNicheRelated(currentSlug: string) {
  const otherNiches = ALL_NICHES
    .filter(n => n.slug !== currentSlug)
    .slice(0, 3)
    .map(n => ({ ...n, type: 'niche' as const }));

  return [
    { title: 'What Is AI Content Strategy?', slug: 'what-is-ai-content-strategy', type: 'guide' as const },
    { title: 'TikTok Content Strategy Guide', slug: 'tiktok-content-strategy-guide', type: 'guide' as const },
    { title: 'How to Create a Content Calendar', slug: 'how-to-create-content-calendar', type: 'guide' as const },
    ...otherNiches,
  ];
}
