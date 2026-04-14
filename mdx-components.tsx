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
        >
          {children}
        </a>
      );
    },
  };
}
