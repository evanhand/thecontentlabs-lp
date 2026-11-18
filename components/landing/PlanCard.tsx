'use client';

import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { BTN_PRIMARY, BTN_SECONDARY } from '@/components/landing/Section';

/**
 * One plan in the 4-column grid (home preview + /pricing).
 * The highlighted plan gets an ink border; coral appears only on its button.
 */
export function PlanCard({
  name,
  description,
  price,
  priceSuffix = '/mo',
  priceNote,
  features,
  ctaLabel,
  ctaHref,
  onCtaClick,
  highlighted = false,
}: {
  name: string;
  description: string;
  price: ReactNode;
  priceSuffix?: string;
  priceNote?: ReactNode;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  onCtaClick?: () => void;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl bg-surface p-5 sm:p-6 border ${
        highlighted ? 'border-ink ring-1 ring-ink shadow-raised' : 'border-line/[0.08] shadow-card'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-heading text-xl font-semibold tracking-[-0.01em] text-ink">{name}</h3>
        {highlighted && (
          <span className="inline-flex items-center h-6 px-2.5 rounded-full bg-ink text-canvas text-xs font-medium">
            Most popular
          </span>
        )}
      </div>
      <p className="text-meta text-ink-3 mt-1">{description}</p>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-heading text-4xl font-semibold tracking-[-0.02em] text-ink tabular-nums">{price}</span>
        <span className="text-meta text-ink-3">{priceSuffix}</span>
      </div>
      <div className="min-h-[2.25rem] mt-1 text-meta text-ink-2">{priceNote}</div>

      <a href={ctaHref} onClick={onCtaClick} className={`${highlighted ? BTN_PRIMARY : BTN_SECONDARY} mt-4 w-full h-11`}>
        {ctaLabel}
      </a>

      <ul className="mt-6 pt-6 border-t border-line/[0.08] space-y-3 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-ink-2">
            <Check className="h-4 w-4 text-ink-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
