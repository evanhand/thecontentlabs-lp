import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/templates/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Refund Policy - The Content Labs',
  description:
    'Refund Policy for The Content Labs. Learn about our refund eligibility, cancellation process, and how refund requests are handled.',
  alternates: {
    canonical: 'https://thecontentlabs.app/refund-policy',
  },
  openGraph: {
    title: 'Refund Policy - The Content Labs',
    description:
      'Refund Policy for The Content Labs. Learn about our refund eligibility, cancellation process, and how refund requests are handled.',
    url: 'https://thecontentlabs.app/refund-policy',
    images: ['https://thecontentlabs.app/og-image.png'],
  },
};

const breadcrumbSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://thecontentlabs.app/',
    },
    { '@type': 'ListItem', position: 2, name: 'Refund Policy' },
  ],
});

export default function RefundPolicy() {
  return (
    <LegalPageLayout title="Refund Policy" updated="March 13, 2026">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />

          {/* Overview */}
          <div>
            <h2 className="mb-4">1. Overview</h2>
            <p className="mb-4">
              The Content Labs provides AI-powered content analysis and strategy tools that rely on third-party APIs and significant compute resources. Because costs are incurred the moment an analysis is run, we have established the following refund policy to ensure fairness for all users.
            </p>
            <p>
              We are committed to providing the best possible service and will always work with you to resolve any issues you encounter.
            </p>
          </div>

          {/* Non-Refundable Usage */}
          <div>
            <h2 className="mb-4">2. Non-Refundable Usage</h2>
            <p className="mb-4">
              We do not offer full refunds for accounts that have consumed platform resources. Once any of the following actions have been performed, the associated costs cannot be recovered:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Running a content audit on your social media accounts</li>
              <li>Running a competitor analysis</li>
              <li>Generating a content strategy or content calendar</li>
              <li>Using The Chemist (AI chatbot) beyond incidental usage</li>
            </ul>
          </div>

          {/* Full Refund Eligibility */}
          <div>
            <h2 className="mb-4">3. Full Refund Eligibility</h2>
            <p className="mb-4">
              A full refund may be considered in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>A technical issue on our end completely prevents you from accessing or using the platform</li>
              <li>You were charged in error (e.g., duplicate charges or billing after cancellation)</li>
              <li>You cancel within 24 hours of subscribing and have not run any analyses</li>
            </ul>
          </div>

          {/* Partial Refunds & Credits */}
          <div>
            <h2 className="mb-4">4. Partial Refunds and Credits</h2>
            <p className="mb-4">
              If the service is accessible but your experience is significantly impacted by bugs, failed analyses, or stability issues, we may offer:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>A partial refund proportional to the extent of the issue</li>
              <li>Account credit applied toward your next billing period</li>
              <li>A complimentary re-run of any failed analysis at no additional cost</li>
            </ul>
          </div>

          {/* Request Timeline */}
          <div>
            <h2 className="mb-4">5. Request Timeline</h2>
            <p className="mb-4">
              Refund requests must be submitted within 7 days of the charge in question. Requests received after 7 days will be evaluated on a case-by-case basis but are not guaranteed.
            </p>
            <p>
              All requests are evaluated based on actual platform usage and system logs. We aim to respond to all refund requests within 3 business days.
            </p>
          </div>

          {/* Credit Packs */}
          <div>
            <h2 className="mb-4">6. Credit Pack Purchases</h2>
            <p className="mb-4">
              Lab Credit packs are one-time purchases. Because credits are delivered instantly and can be used immediately:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Credit pack purchases are non-refundable once delivered to your account</li>
              <li>If credits fail to appear after purchase, contact us and we will resolve the issue or issue a full refund</li>
            </ul>
          </div>

          {/* Cancellations */}
          <div>
            <h2 className="mb-4">7. Cancellations</h2>
            <p className="mb-4">
              You may cancel your subscription at any time through your account settings. Upon cancellation:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your access continues until the end of your current billing period</li>
              <li>No further charges will be made after the current period ends</li>
              <li>Unused time on your current billing period is not refunded</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lab-card p-5 sm:p-6">
            <h2 className="mb-4">Request a Refund</h2>
            <p className="mb-4">
              If you believe you are eligible for a refund or would like to discuss your situation, please contact us at:
            </p>
            <a href="mailto:business@thecontentlabs.io">
              business@thecontentlabs.io
            </a>
            <p className="text-meta text-ink-3 mt-3">
              Please include your account email, the date of the charge, and a description of the issue.
            </p>
          </div>

          <div className="pt-6 border-t border-line/[0.08]">
            <p className="text-meta text-ink-3">
              See also: <a href="/terms">Terms and Conditions</a> | <a href="/privacy">Privacy Policy</a>
            </p>
          </div>
    </LegalPageLayout>
  );
}
