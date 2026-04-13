import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { PostHogProvider } from "@/components/PostHogProvider";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "The Content Labs - AI-Powered Content Strategy Platform for Creators",
  description:
    "The Content Labs is an AI-powered content strategy platform for creators. Get a 30-day content plan with full scripts, hooks, and CTAs built from 10,000+ analyzed videos in your niche. Used by 47,598+ creators across 50+ niches. Plans from $39/mo.",
  openGraph: {
    title: "The Content Labs - AI-Powered Content Strategy Platform",
    description:
      "AI-powered content strategy platform for creators. Get a 30-day content plan with full scripts built from 10,000+ analyzed videos. Trusted by 47,598+ creators across 50+ niches.",
    url: "https://thecontentlabs.app/",
    siteName: "The Content Labs",
    images: [{ url: "https://thecontentlabs.app/og-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Content Labs - AI-Powered Content Strategy Platform",
    description:
      "AI-powered content strategy for creators. 30-day plans with full scripts from 10,000+ analyzed videos. Trusted by 47,598+ creators.",
    images: ["https://thecontentlabs.app/og-image.png"],
  },
  alternates: {
    canonical: "https://thecontentlabs.app/",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  metadataBase: new URL("https://thecontentlabs.app"),
};

const LOGO_LIGHT =
  "https://jzhpazqyoceojfvjhpoo.supabase.co/storage/v1/object/sign/Site%20Assets/Logo%20Dark%20Text%20(The,%20Labs).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMGJhNjZhNy01MzVmLTQyNGQtOGEyMC1lNTViNjVkNzA3ZmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTaXRlIEFzc2V0cy9Mb2dvIERhcmsgVGV4dCAoVGhlLCBMYWJzKS5wbmciLCJpYXQiOjE3NzM1NzkyNTEsImV4cCI6MjA4ODkzOTI1MX0.MiY_5spRpSXmi5WUodI2Myv7zXtQmKNmJbCkBPWfkug";

// JSON-LD schemas — rendered server-side in real HTML
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Content Labs",
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
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The Content Labs",
  url: "https://thecontentlabs.app",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can't I just use ChatGPT for this?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ChatGPT doesn't know your content history, your niche, or your competitors. It's never seen your analytics. We pull real performance data from your account and your competitors' accounts, then build your strategy from what's actually working.",
      },
    },
    {
      "@type": "Question",
      name: "Will this work for my niche?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We've built strategies across 50+ niches, from fitness to finance to cooking to real estate. Your strategy is built from what's already going viral in your specific niche, with your specific competitors.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a big following to start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not at all. This is built for creators who are starting out or stuck. Manny went from zero to 30,000 followers with the strategy we gave him. You don't need a following to start. You need a plan.",
      },
    },
    {
      "@type": "Question",
      name: "Will the scripts sound like me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We give you the structure, the hooks, the flow, and the CTA, all built from what's working in your niche. You bring your voice and your personality.",
      },
    },
    {
      "@type": "Question",
      name: "What if I don't like it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cancel anytime. No contracts. No questions asked. Start with a free content audit to see what we deliver before you pay anything.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plans start at $39/month for the Starter plan, which includes video audits, competitor analysis, full strategy generation, a 30-day content calendar with scripts, and access to The Chemist AI. The Pro plan is $79/month with higher limits, and Studio is $129/month for teams and agencies. Save 17% with annual billing.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from other content tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Most content tools give you a list of topic ideas. We give you full scripts with hooks, CTAs, emotional flow, and pacing, all built from real data on what\'s actually performing in your niche.',
      },
    },
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "The Content Labs",
  description:
    "AI-powered content strategy platform that helps creators build data-driven content strategies. Analyzes 10,000+ videos across 50+ niches to generate 30-day content plans with full scripts, hooks, and CTAs. Used by 47,598+ creators.",
  url: "https://thecontentlabs.app",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "39",
    highPrice: "129",
    priceCurrency: "USD",
    offerCount: "3",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareSchema),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
