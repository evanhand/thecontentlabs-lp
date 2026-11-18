import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { PostHogProvider } from "@/components/PostHogProvider";
import { PrealgoIdentityBridge } from "@/components/PrealgoIdentityBridge";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "The Content Labs - AI-Powered Content Strategy Platform for Creators",
  description:
    "The Content Labs analyzes every video you post and tells you what wins for you: hook length, payoff timing, tangents, text, topic. Then the Chemist writes the next one in your voice. 21,000+ videos analyzed. Free plan, no card. Paid from $19/mo.",
  openGraph: {
    title: "The Content Labs - AI-Powered Content Strategy Platform",
    description:
      "See why your last videos did what they did. Weekly numbers, a beat map per video, and the Chemist writing the next one in your voice. 21,000+ videos analyzed. Free plan, no card.",
    url: "https://thecontentlabs.app/",
    siteName: "The Content Labs",
    images: [{ url: "https://thecontentlabs.app/og-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Content Labs - AI-Powered Content Strategy Platform",
    description:
      "See why your last videos did what they did. 21,000+ videos analyzed. Free plan, no card.",
    images: ["https://thecontentlabs.app/og-image.png"],
  },
  alternates: {
    canonical: "https://thecontentlabs.app/",
  },
  icons: {
    // Browsers pick the smallest matching size for tabs (16/32) — they grab the white-bg one.
    // Google's favicon crawler prefers >= 48x48 — it grabs the navy-bg one so the orange beaker
    // stays visible against Google's white search backdrop.
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-dark.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  metadataBase: new URL("https://thecontentlabs.app"),
};

const LOGO_LIGHT =
  "https://jzhpazqyoceojfvjhpoo.supabase.co/storage/v1/object/sign/Site%20Assets/Logo%20Dark%20Text%20(The,%20Labs).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMGJhNjZhNy01MzVmLTQyNGQtOGEyMC1lNTViNjVkNzA3ZmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTaXRlIEFzc2V0cy9Mb2dvIERhcmsgVGV4dCAoVGhlLCBMYWJzKS5wbmciLCJpYXQiOjE3NzM1NzkyNTEsImV4cCI6MjA4ODkzOTI1MX0.MiY_5spRpSXmi5WUodI2Myv7zXtQmKNmJbCkBPWfkug";

// JSON-LD schemas — rendered server-side in real HTML
//
// NOTE on sameAs: Google uses this array to disambiguate "The Content Labs"
// from other "Content Lab/Labs" entities in search. Add URLs ONLY after each
// profile is live and matches the brand name exactly. Broken URLs hurt more
// than they help. Recommended order to claim:
//   1. LinkedIn company page (highest leverage)
//   2. Crunchbase profile
//   3. Product Hunt
//   4. G2 listing
//   5. Wikidata entry
//   6. X / Twitter
const organizationSameAs: string[] = [
  // "https://www.linkedin.com/company/the-content-labs",
  // "https://www.crunchbase.com/organization/the-content-labs",
  // "https://www.producthunt.com/products/the-content-labs",
  // "https://www.g2.com/products/the-content-labs",
  // "https://www.wikidata.org/wiki/QXXXXXXX",
  // "https://x.com/thecontentlabs",
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Content Labs",
  alternateName: ["TheContentLabs", "Content Labs"],
  url: "https://thecontentlabs.app",
  logo: LOGO_LIGHT,
  description:
    "AI-powered content strategy platform for creators. Analyzes 10,000+ videos across 50+ niches to generate 30-day content plans with full scripts, hooks, and CTAs.",
  email: "business@thecontentlabs.io",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3792 Poppleton CT",
    addressLocality: "Troy",
    addressRegion: "MI",
    postalCode: "48084",
    addressCountry: "US",
  },
  ...(organizationSameAs.length > 0 ? { sameAs: organizationSameAs } : {}),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The Content Labs",
  url: "https://thecontentlabs.app",
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "The Content Labs",
  description:
    "Content analytics for creators. Analyzes every video a creator posts (21,000+ videos analyzed), maps each one beat by beat, finds the traits that win for that creator, and writes the next script in their voice.",
  url: "https://thecontentlabs.app",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "0",
    highPrice: "99",
    priceCurrency: "USD",
    offerCount: "4",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "3",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Matt Gehlbach",
        jobTitle: "Full Time Firefighter & Business Owner",
      },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "Helped me scale my coaching business so fast, I literally had to start saying no to people.",
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Manny Watkins",
        jobTitle: "Former D1 Basketball Star & Coach",
      },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "It's a detailed, strategic approach. Not just 'post consistently and hope for growth.'",
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Jen Thompson",
        jobTitle: "11-Time World Champion Powerlifter",
      },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody: "This Content Strategy Was a Game Changer!",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <head>
        {/* Preload hero poster as the LCP candidate. High priority
            ensures it beats the video download on slow mobile networks. */}
        <link
          rel="preload"
          as="image"
          href="/hero-demo-poster.jpg"
          fetchPriority="high"
        />

        {/* Clash Display from Fontshare — heading font.
            Loaded async via media="print" trick. Next.js auto-preloads the
            stylesheet, so we don't add a manual preload (avoids duplicates). */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600&display=swap"
        />

        {/* RSS feed auto-discovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="The Content Labs — Data Reports & Strategy Guides"
          href="https://thecontentlabs.app/rss.xml"
        />

        {/* JSON-LD Structured Data — rendered in real HTML for crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        {/* FAQ schema moved to page.tsx (homepage only) to avoid duplicates on proxied pages */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareSchema),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-canvas text-ink">
        <PostHogProvider>
          <PrealgoIdentityBridge />
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
