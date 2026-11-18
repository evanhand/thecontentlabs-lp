import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - The Content Labs | Free Plan, Paid From $19/mo',
  description:
    'Choose your Content Labs plan. Get AI-powered content strategies, competitor analysis, and a 30-day calendar with full scripts. Free plan, then Starter ($19/mo), Pro ($39/mo) and Studio ($99/mo). First month $5 on Starter and Pro.',
  openGraph: {
    title: 'Pricing - The Content Labs | Free Plan, Paid From $19/mo',
    description:
      'Get AI-powered content strategies, competitor analysis, and a 30-day calendar with full scripts. Free plan; paid from $19/mo.',
    url: 'https://thecontentlabs.app/pricing',
    images: [{ url: 'https://thecontentlabs.app/og-image.png' }],
  },
  twitter: {
    title: 'Pricing - The Content Labs',
    description:
      'Get AI-powered content strategies and a 30-day calendar with full scripts. Free plan; paid from $19/mo.',
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
