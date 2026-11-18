import type { MDXComponents } from "mdx/types";
import {
  CTA,
  ComparisonTable,
  Callout,
  StatCard,
  StatGrid,
  VideoEmbed,
  InstagramEmbed,
  TikTokEmbed,
  VideoGrid,
  Highlight,
  NumberBlock,
  HookSection,
  HookExample,
  WhenToUse,
  DataBarChart,
  DataPieChart,
  HookFramework,
  HookComboGrid,
  HookComboCard,
  HookArchetypeGrid,
  HookArchetypeCard,
  TierScaleVisual,
  TierComparisonChart,
  NicheHeatMap,
  NicheBubbleMap,
  TierHeatMatrix,
  ReachTalkQuadrant,
  ScriptDNACompare,
  OpenerPodium,
  MetricDelta,
  CaptionCardGrid,
  CaptionCard,
  HashtagCountBar,
} from "@/components/blog/MDXComponents";

export function useMDXComponents(): MDXComponents {
  return {
    CTA,
    ComparisonTable,
    Callout,
    StatCard,
    StatGrid,
    VideoEmbed,
    InstagramEmbed,
    TikTokEmbed,
    VideoGrid,
    Highlight,
    NumberBlock,
    HookSection,
    HookExample,
    WhenToUse,
    DataBarChart,
    DataPieChart,
    HookFramework,
    HookComboGrid,
    HookComboCard,
    HookArchetypeGrid,
    HookArchetypeCard,
    TierScaleVisual,
    TierComparisonChart,
    NicheHeatMap,
    NicheBubbleMap,
    TierHeatMatrix,
    ReachTalkQuadrant,
    ScriptDNACompare,
    OpenerPodium,
    MetricDelta,
    CaptionCardGrid,
    CaptionCard,
    HashtagCountBar,
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        {...props}
        className="font-heading text-[26px] sm:text-[30px] font-semibold tracking-[-0.02em] leading-tight text-ink mt-14 mb-4 scroll-mt-28"
      />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        {...props}
        className="font-heading text-[24px] sm:text-[28px] font-semibold tracking-[-0.02em] leading-tight text-ink mt-14 mb-4 scroll-mt-28"
      />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3
        {...props}
        className="text-[19px] sm:text-xl font-semibold tracking-[-0.01em] leading-snug text-ink mt-10 mb-3 scroll-mt-28"
      />
    ),
    h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h4
        {...props}
        className="text-[17px] font-semibold text-ink mt-8 mb-2 scroll-mt-28"
      />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p {...props} className="text-[17px] leading-7 text-ink-2 my-5" />
    ),
    strong: (props: React.HTMLAttributes<HTMLElement>) => (
      <strong {...props} className="font-semibold text-ink" />
    ),
    em: (props: React.HTMLAttributes<HTMLElement>) => (
      <em {...props} className="italic" />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
      <ul
        {...props}
        className="my-5 pl-5 list-disc marker:text-ink-3 space-y-2 text-[17px] leading-7 text-ink-2 [&_ul]:my-2 [&_ol]:my-2"
      />
    ),
    ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
      <ol
        {...props}
        className="my-5 pl-5 list-decimal marker:text-ink-3 marker:tabular-nums space-y-2 text-[17px] leading-7 text-ink-2 [&_ul]:my-2 [&_ol]:my-2"
      />
    ),
    li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
      <li {...props} className="pl-1 [&>p]:my-0" />
    ),
    blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
      <blockquote
        {...props}
        className="my-8 border-l border-line/[0.14] pl-5 text-ink [&>p]:text-ink [&>p]:my-3"
      />
    ),
    hr: () => <hr className="my-12 border-0 border-t border-line/[0.08]" />,
    img: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={alt || ""}
        loading="lazy"
        decoding="async"
        {...props}
        className="my-8 w-full h-auto rounded-2xl bg-sunken outline outline-1 -outline-offset-1 outline-black/[0.06]"
      />
    ),
    table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
      <div className="my-8 overflow-x-auto rounded-xl border border-line/[0.08] bg-surface">
        <table {...props} className="w-full border-collapse text-left text-sm" />
      </div>
    ),
    thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <thead {...props} className="bg-sunken" />
    ),
    th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
      <th
        {...props}
        className="px-4 py-3 text-meta font-semibold text-ink whitespace-nowrap"
      />
    ),
    td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
      <td
        {...props}
        className="px-4 py-3 text-sm text-ink-2 align-top border-t border-line/[0.08] tabular-nums"
      />
    ),
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
      <pre
        {...props}
        className="my-8 max-w-full overflow-x-auto rounded-xl bg-sunken border border-line/[0.08] p-4 text-sm leading-6 text-ink [&>code]:bg-transparent [&>code]:p-0 [&>code]:break-normal [&>code]:whitespace-pre"
      />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => (
      <code
        {...props}
        className="font-mono text-[0.88em] rounded-md bg-sunken px-1.5 py-0.5 text-ink break-words"
      />
    ),
    a: ({
      href,
      children,
      ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
      const isExternal = href?.startsWith("http");
      return (
        <a
          href={href}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...props}
          className="font-medium text-ink underline decoration-line/[0.24] underline-offset-[3px] transition-colors hover:decoration-ink"
        >
          {children}
        </a>
      );
    },
  };
}
