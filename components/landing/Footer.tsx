import { LOGO_LIGHT } from '@/lib/logos';

const COLUMNS: { title: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  {
    title: 'Product',
    links: [
      { href: '/features/video-audit', label: 'Video Audit' },
      { href: '/features/competitor-analysis', label: 'Competitor Analysis' },
      { href: '/features/content-strategy', label: 'Content Strategy' },
      { href: '/features/content-calendar', label: 'Content Calendar' },
      { href: '/features/ai-chatbot', label: 'The Chemist' },
      { href: '/pricing', label: 'Pricing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/compare', label: 'Compare' },
      { href: '/blog/what-is-ai-content-strategy', label: 'What Is AI Content Strategy?' },
      { href: '/blog/tiktok-content-strategy-guide', label: 'TikTok Strategy Guide' },
      { href: '/blog/content-labs-vs-chatgpt', label: 'Content Labs vs ChatGPT' },
      { href: '/blog', label: 'All Resources →' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { href: '/for/ugc-creators', label: 'UGC Creators' },
      { href: '/for/coaches', label: 'Coaches' },
      { href: '/for/ecommerce', label: 'E-commerce' },
      { href: '/for/social-media-managers', label: 'Social Media Managers' },
      { href: '/for/small-businesses', label: 'Small Businesses' },
      { href: '/for/personal-brands', label: 'Personal Brands' },
    ],
  },
];

const COMPANY = [
  { href: 'mailto:business@thecontentlabs.io', label: 'Contact' },
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/refund-policy', label: 'Refund Policy' },
];

const ASK_AI = [
  { href: 'https://chatgpt.com/?q=What+is+The+Content+Labs+and+how+does+it+help+content+creators', label: 'ChatGPT' },
  { href: 'https://www.perplexity.ai/search?q=What+is+The+Content+Labs+thecontentlabs.app', label: 'Perplexity' },
  { href: 'https://claude.ai/new?q=What+is+The+Content+Labs+and+how+does+it+help+content+creators', label: 'Claude' },
  { href: 'https://www.google.com/search?q=The+Content+Labs+AI+content+strategy+tool', label: 'Google' },
];

const LINK = 'text-sm text-ink-3 hover:text-ink transition-colors duration-150';
const HEADING = 'text-sm font-medium text-ink mb-4';

export function Footer() {
  return (
    <footer className="bg-canvas border-t border-line/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-6 gap-y-10 mb-12">
          <div className="col-span-2">
            <img
              src={LOGO_LIGHT}
              alt="The Content Labs"
              loading="lazy"
              decoding="async"
              width={501}
              height={151}
              className="h-10 w-auto mb-4"
            />
            <p className="text-sm text-ink-3 max-w-xs">
              Your shortcut to content that actually grows. Strategy, scripts, and tools built for creators.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className={HEADING}>{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className={LINK}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className={HEADING}>Company</h3>
            <ul className="space-y-2.5">
              {COMPANY.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={LINK}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className={`${HEADING} mt-8`}>Ask AI About Us</h3>
            <ul className="space-y-2.5">
              {ASK_AI.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-line/[0.08]">
          <p className="text-meta text-ink-3">&copy; 2026 The Content Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
