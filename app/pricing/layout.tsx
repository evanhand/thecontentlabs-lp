import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - The Content Labs | Plans Starting at $39/mo',
  description:
    'Choose your Content Labs plan. Get AI-powered content strategies, competitor analysis, and a 30-day calendar with full scripts. Starter ($39/mo), Pro ($79/mo), and Studio ($129/mo) plans available. Free content audit included.',
  openGraph: {
    title: 'Pricing - The Content Labs | Plans Starting at $39/mo',
    description:
      'Get AI-powered content strategies, competitor analysis, and a 30-day calendar with full scripts. Plans from $39/mo.',
    url: 'https://thecontentlabs.app/pricing',
    images: [{ url: 'https://thecontentlabs.app/og-image.png' }],
  },
  twitter: {
    title: 'Pricing - The Content Labs',
    description:
      'Get AI-powered content strategies and a 30-day calendar with full scripts. Plans from $39/mo.',
    images: ['https://thecontentlabs.app/og-image.png'],
  },
  alternates: {
    canonical: 'https://thecontentlabs.app/pricing',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
