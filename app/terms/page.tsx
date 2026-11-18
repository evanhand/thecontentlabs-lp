import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/templates/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Terms and Conditions - The Content Labs',
  description:
    'Terms and Conditions for The Content Labs. Read our terms of service, acceptable use policy, and subscription details.',
  alternates: {
    canonical: 'https://thecontentlabs.app/terms',
  },
  openGraph: {
    title: 'Terms and Conditions - The Content Labs',
    description:
      'Terms and Conditions for The Content Labs. Read our terms of service, acceptable use policy, and subscription details.',
    url: 'https://thecontentlabs.app/terms',
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
    { '@type': 'ListItem', position: 2, name: 'Terms & Conditions' },
  ],
});

export default function TermsAndConditions() {
  return (
    <LegalPageLayout title="Terms and Conditions" updated="March 13, 2026">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />

          {/* Introduction */}
          <div>
            <h2 className="mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to The Content Labs ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your use of our website and services located at thecontentlabs.app (the "Service") operated by The Content Labs.
            </p>
            <p>
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
            </p>
          </div>

          {/* Acceptance of Terms */}
          <div>
            <h2 className="mb-4">2. Acceptance of Terms</h2>
            <p>
              By creating an account or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </div>

          {/* Description of Service */}
          <div>
            <h2 className="mb-4">3. Description of Service</h2>
            <p className="mb-4">
              The Content Labs provides AI-powered content creation and strategy tools, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Content analysis and optimization recommendations</li>
              <li>Competitor analysis and insights</li>
              <li>AI-powered content generation tools (The Chemist)</li>
              <li>Content calendar and planning features</li>
              <li>Performance tracking and analytics</li>
              <li>Educational resources and training materials</li>
            </ul>
          </div>

          {/* User Accounts */}
          <div>
            <h2 className="mb-4">4. User Accounts</h2>
            <p className="mb-4">
              To access certain features of our Service, you must create an account. You are responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete information</li>
              <li>Updating your information to keep it current</li>
            </ul>
            <p>
              You must notify us immediately of any unauthorized use of your account or any other breach of security.
            </p>
          </div>

          {/* Subscription and Payment */}
          <div>
            <h2 className="mb-4">5. Subscription and Payment</h2>
            <p className="mb-4">
              Our Service is available through paid subscription plans (Starter, Pro, and Studio). For paid subscriptions:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Subscription fees are billed in advance on a monthly or annual basis depending on your selected billing interval</li>
              <li>Annual plans are billed as a single upfront payment at a discounted rate</li>
              <li>All fees are subject to our <a href="/refund-policy">Refund Policy</a></li>
              <li>You may cancel your subscription at any time through your account settings</li>
              <li>Upon cancellation, your access will continue until the end of your current billing period</li>
              <li>Plan changes (upgrades or downgrades) take effect at the end of your current billing period</li>
            </ul>
            <p>
              Because our platform uses third-party APIs and compute resources, costs are incurred when analyses are run. Please review our <a href="/refund-policy">Refund Policy</a> for complete details on refund eligibility.
            </p>
            <p className="mt-4">
              Certain features consume Lab Credits, a usage-based currency included with your subscription plan. Lab Credits reset each billing period and do not roll over. Additional credit packs may be purchased as one-time transactions. Credit packs do not expire.
            </p>
          </div>

          {/* Refunds */}
          <div>
            <h2 className="mb-4">6. Refunds</h2>
            <p className="mb-4">
              Due to the nature of our AI-powered services, refund eligibility is limited. In summary:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>No full refunds are available after analyses have been run or Lab Credits consumed</li>
              <li>Full refunds may be considered if a technical issue on our end completely prevents access to the platform</li>
              <li>Partial refunds or account credits may be offered for service-impacting bugs or stability issues</li>
              <li>Refund requests must be submitted within 7 days of purchase</li>
            </ul>
            <p>
              For full details, see our <a href="/refund-policy">Refund Policy</a>.
            </p>
          </div>

          {/* Acceptable Use */}
          <div>
            <h2 className="mb-4">7. Acceptable Use</h2>
            <p className="mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Upload or transmit malicious code or harmful content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Reverse engineer or attempt to extract source code</li>
              <li>Resell, redistribute, or sublicense AI-generated outputs as a competing service</li>
            </ul>
          </div>

          {/* AI-Generated Content */}
          <div>
            <h2 className="mb-4">8. AI-Generated Content</h2>
            <p className="mb-4">
              Our Service uses artificial intelligence to generate content strategies, scripts, hooks, and recommendations. By using these features, you acknowledge and agree that:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>AI-generated outputs are suggestions and may not always be accurate, complete, or suitable for your specific needs</li>
              <li>You are solely responsible for reviewing, editing, and approving any AI-generated content before publishing or distributing it</li>
              <li>We do not guarantee any specific results, engagement, or performance from content created using our tools</li>
              <li>AI outputs may occasionally produce content that is repetitive, factually incorrect, or inappropriate - you should always exercise editorial judgment</li>
              <li>You retain full ownership of content you create using AI-generated suggestions, but we are not liable for any claims arising from your use of that content</li>
            </ul>
          </div>

          {/* Intellectual Property */}
          <div>
            <h2 className="mb-4">9. Intellectual Property</h2>
            <p className="mb-4">
              The Service and its original content, features, and functionality are and will remain the exclusive property of The Content Labs and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>
            <p>
              You retain ownership of any content you create using our Service, but you grant us a license to use, store, and process such content solely for the purpose of providing the Service.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 className="mb-4">10. Limitation of Liability</h2>
            <p>
              In no event shall The Content Labs, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
            </p>
          </div>

          {/* Termination */}
          <div>
            <h2 className="mb-4">11. Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </div>

          {/* Changes to Terms */}
          <div>
            <h2 className="mb-4">12. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
            </p>
            <p>
              In the event of a data breach, we will notify affected users in accordance with our <a href="/privacy">Privacy Policy</a> and applicable law.
            </p>
          </div>

          {/* Social Media Data and Third-Party Platforms */}
          <div>
            <h2 className="mb-4">13. Social Media Data and Third-Party Platforms</h2>
            <p className="mb-4">
              Our platform analyzes publicly available social media content to provide content audits, competitor analysis, and strategy recommendations. By using these features, you acknowledge and agree that:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>You warrant that you have the right to submit the social media accounts you choose to analyze, or that the accounts contain publicly available content</li>
              <li>You must comply with the Terms of Service of third-party platforms (including but not limited to TikTok and Instagram) when using our analysis features</li>
              <li>We are not responsible for changes to social media platform APIs, data availability, or access restrictions imposed by third-party platforms</li>
              <li>We do not access private, restricted, or direct message content - our analysis is limited to publicly available data such as video metadata, captions, engagement metrics, and profile information</li>
              <li>You are responsible for ensuring your use of analysis results complies with all applicable laws and platform policies</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lab-card p-5 sm:p-6">
            <h2 className="mb-4">Contact Us</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <p className="mt-2">
              Email: business@thecontentlabs.io
            </p>
          </div>

          <div className="pt-6 border-t border-line/[0.08]">
            <p className="text-meta text-ink-3">
              See also: <a href="/refund-policy">Refund Policy</a> | <a href="/privacy">Privacy Policy</a>
            </p>
          </div>
    </LegalPageLayout>
  );
}
