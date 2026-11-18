import type { ReactNode } from "react";

/**
 * One header pattern for the resource hubs (blog, playbooks, reports,
 * trends, studio): Clash h1 + one supporting line, optional meta/actions.
 */
export function ResourceHeader({
  title,
  description,
  meta,
  breadcrumbs,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  breadcrumbs?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="pt-32 sm:pt-40 pb-10 sm:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {breadcrumbs && <div className="mb-6 sm:mb-8">{breadcrumbs}</div>}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 lg:gap-8 items-end">
          <h1 className="font-heading text-4xl sm:text-6xl font-semibold tracking-[-0.03em] leading-[1.05] text-ink text-balance">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-ink-2 max-w-[60ch] lg:justify-self-end">
              {description}
            </p>
          )}
        </div>
        {meta && <div className="mt-5 text-meta text-ink-3">{meta}</div>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
