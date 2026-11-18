import type { ReactNode } from 'react';
import { ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';

/* Shared building blocks for the feature / solution marketing templates.
   Spec: DESIGN.md -> "Marketing site addendum". */

export const container = 'max-w-6xl mx-auto px-4 sm:px-6';

export function PrimaryButton({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center h-11 px-5 rounded-[10px] bg-content-coral text-white text-sm font-medium transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-content-coral/90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-content-coral/40 focus-visible:ring-offset-2 ${className}`}
    >
      {children}
      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

export function SecondaryButton({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center h-11 px-5 rounded-[10px] bg-surface border border-line/[0.14] text-ink text-sm font-medium transition-colors duration-150 hover:bg-sunken active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 ${className}`}
    >
      {children}
    </a>
  );
}

export function MarketingBreadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-meta text-ink-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight aria-hidden className="h-3.5 w-3.5" />}
            {item.href ? (
              <a href={item.href} className="hover:text-ink transition-colors">
                {item.label}
              </a>
            ) : (
              <span aria-current={i === items.length - 1 ? 'page' : undefined} className="text-ink-2">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function MarketingHero({
  breadcrumbs,
  title,
  description,
  actions,
  footnote,
}: {
  breadcrumbs?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  footnote?: ReactNode;
}) {
  return (
    <section className="pt-32 sm:pt-40 pb-16 sm:pb-20">
      <div className={container}>
        {breadcrumbs && <div className="mb-8">{breadcrumbs}</div>}
        <div className="max-w-3xl">
          <h1 className="font-heading text-4xl sm:text-6xl font-semibold tracking-[-0.03em] leading-[1.05] text-ink text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-6 text-lg text-ink-2 max-w-[60ch] leading-relaxed">{description}</p>
          )}
          {actions && <div className="mt-8 flex flex-col sm:flex-row gap-3">{actions}</div>}
          {footnote && <div className="mt-6 text-meta text-ink-3">{footnote}</div>}
        </div>
      </div>
    </section>
  );
}

export function Section({
  title,
  description,
  children,
  narrow = false,
  bordered = true,
}: {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  narrow?: boolean;
  bordered?: boolean;
}) {
  return (
    <section className={`py-20 sm:py-28 ${bordered ? 'border-t border-line/[0.08]' : ''}`}>
      <div className={narrow ? 'max-w-3xl mx-auto px-4 sm:px-6' : container}>
        <div className="max-w-2xl mb-10 sm:mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-[-0.02em] leading-tight text-ink text-balance">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-ink-2 max-w-[60ch]">{description}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

export function Steps({
  steps,
}: {
  steps: { step: string; title: string; description: string }[];
}) {
  return (
    <ol
      className={`grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 ${
        steps.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
      }`}
    >
      {steps.map((s, i) => (
        <li key={i} className="border-t border-line/[0.14] pt-5">
          <span className="font-mono text-sm text-ink-3 tabular-nums">
            {s.step.padStart(2, '0')}
          </span>
          <h3 className="mt-3 text-[17px] font-semibold text-ink">{s.title}</h3>
          <p className="mt-2 text-body text-ink-2">{s.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="lab-card divide-y divide-line/[0.08]">
      {items.map((f, i) => (
        <details key={i} className="group">
          <summary className="flex items-center justify-between gap-4 cursor-pointer px-5 sm:px-6 py-5 text-left text-[15px] font-medium text-ink list-none [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:bg-sunken">
            <span>{f.q}</span>
            <ChevronDown
              aria-hidden
              className="h-4 w-4 flex-shrink-0 text-ink-3 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-open:rotate-180"
            />
          </summary>
          <div className="px-5 sm:px-6 pb-5 -mt-1 text-body text-ink-2 max-w-[65ch]">{f.a}</div>
        </details>
      ))}
    </div>
  );
}

export function ClosingCTA({
  title,
  description,
  primary,
  secondary,
}: {
  title: ReactNode;
  description?: ReactNode;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="py-20 sm:py-28 border-t border-line/[0.08]">
      <div className={container}>
        <div className="lab-card px-5 py-12 sm:px-12 sm:py-16 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-[-0.02em] leading-tight text-ink max-w-2xl mx-auto text-balance">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-ink-2 max-w-[60ch] mx-auto">{description}</p>
          )}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <PrimaryButton href={primary.href}>{primary.label}</PrimaryButton>
            {secondary && <SecondaryButton href={secondary.href}>{secondary.label}</SecondaryButton>}
          </div>
        </div>
      </div>
    </section>
  );
}
