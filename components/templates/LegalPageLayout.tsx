import type { ReactNode } from 'react';
import { PublicNav } from '@/components/PublicNav';
import { Footer } from '@/components/landing/Footer';
import { MarketingBreadcrumbs } from '@/components/templates/MarketingParts';

/** Shared shell for legal pages (terms, privacy, refund policy). */
export function LegalPageLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <PublicNav />
      <main className="px-4 sm:px-6 pt-32 sm:pt-40 pb-20 sm:pb-28">
        <article className="mx-auto w-full max-w-[68ch]">
          <header className="flex flex-col gap-4">
            <MarketingBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: title }]} />
            <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.08] text-ink">
              {title}
            </h1>
            <p className="text-meta text-ink-3">Last updated: {updated}</p>
          </header>
          <div className="mt-10 pt-8 border-t border-line/[0.08] space-y-10 text-[17px] leading-7 text-ink-2 [&_h2]:font-heading [&_h2]:text-[22px] [&_h2]:font-semibold [&_h2]:tracking-[-0.01em] [&_h2]:text-ink [&_h3]:text-[17px] [&_h3]:font-semibold [&_h3]:text-ink [&_a]:font-medium [&_a]:text-ink [&_a]:underline [&_a]:decoration-line/[0.24] [&_a]:underline-offset-[3px] hover:[&_a]:decoration-ink [&_strong]:text-ink [&_strong]:font-semibold [&_ul]:marker:text-ink-3">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
