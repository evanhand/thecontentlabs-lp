import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Compare The Content Labs - Alternatives & Comparisons | The Content Labs',
  description:
    'See how The Content Labs compares to ChatGPT, Later, Jasper, and other AI content tools. Honest comparisons with feature breakdowns, pricing, and who each tool is best for.',
  openGraph: {
    title: 'Compare The Content Labs - Alternatives & Comparisons',
    description:
      'How does The Content Labs compare to ChatGPT, Later, and Jasper? Honest breakdowns with pricing and features.',
    url: 'https://thecontentlabs.app/compare',
    images: [{ url: 'https://thecontentlabs.app/og-image.png' }],
  },
  alternates: {
    canonical: 'https://thecontentlabs.app/compare',
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
