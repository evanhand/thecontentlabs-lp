import type { Metadata } from 'next';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { PublicNav } from '@/components/PublicNav';

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <PublicNav />
      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <ol className="flex items-center gap-1 text-sm text-slate-400">
          <li><a href="/" className="hover:text-slate-700 transition-colors">Home</a></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li><span className="text-slate-600">Terms & Conditions</span></li>
        </ol>
      </nav>
      <main>
      <article>
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-content-coral/10 rounded-lg">
                <FileText className="h-6 w-6 text-content-coral" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Terms and Conditions</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">Last updated: March 13, 2026</p>
              </div>
            </div>
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Home
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 space-y-8">

          {/* Introduction */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">1. Introduction</h2>
            <p className="text-slate-700 dark:text-slate-400 mb-4">
              Welcome to The Content Labs ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your use of our website and services located at thecontentlabs.app (the "Service") operated by The Content Labs.
            </p>
            <p className="text-slate-700 dark:text-slate-400">
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
            </p>
          </div>

          {/* Acceptance of Terms */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">2. Acceptance of Terms</h2>
            <p className="text-slate-700 dark:text-slate-400">
              By creating an account or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </div>

          {/* Description of Service */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">3. Description of Service</h2>
            <p className="text-slate-700 dark:text-slate-400 mb-4">
              The Content Labs provides AI-powered content creation and strategy tools, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-400">
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
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">4. User Accounts</h2>
            <p className="text-slate-700 dark:text-slate-400 mb-4">
              To access certain features of our Service, you must create an account. You are responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-400 mb-4">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete information</li>
              <li>Updating your information to keep it current</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-400">
              You must notify us immediately of any unauthorized use of your account or any other breach of security.
            </p>
          </div>

          {/* Subscription and Payment */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">5. Subscription and Payment</h2>
            <p className="text-slate-700 dark:text-slate-400 mb-4">
              Our Service is available through paid subscription plans (Starter, Pro, and Studio). For paid subscriptions:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-400 mb-4">
              <li>Subscription fees are billed in advance on a monthly or annual basis depending on your selected billing interval</li>
              <li>Annual plans are billed as a single upfront payment at a discounted rate</li>
              <li>All fees are subject to our <a href="/refund-policy" className="text-content-coral hover:underline">Refund Policy</a></li>
              <li>You may cancel your subscription at any time through your account settings</li>
              <li>Upon cancellation, your access will continue until the end of your current billing period</li>
              <li>Plan changes (upgrades or downgrades) take effect at the end of your current billing period</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-400">
              Because our platform uses third-party APIs and compute resources, costs are incurred when analyses are run. Please review our <a href="/refund-policy" className="text-content-coral hover:underline">Refund Policy</a> for complete details on refund eligibility.
            </p>
            <p className="text-slate-700 dark:text-slate-400 mt-4">
              Certain features consume Lab Credits, a usage-based currency included with your subscription plan. Lab Credits reset each billing period and do not roll over. Additional credit packs may be purchased as one-time transactions. Credit packs do not expire.
            </p>
          </div>

          {/* Refunds */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">6. Refunds</h2>
            <p className="text-slate-700 dark:text-slate-400 mb-4">
              Due to the nature of our AI-powered services, refund eligibility is limited. In summary:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-400 mb-4">
              <li>No full refunds are available after analyses have been run or Lab Credits consumed</li>
              <li>Full refunds may be considered if a technical issue on our end completely prevents access to the platform</li>
              <li>Partial refunds or account credits may be offered for service-impacting bugs or stability issues</li>
              <li>Refund requests must be submitted within 7 days of purchase</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-400">
              For full details, see our <a href="/refund-policy" className="text-content-coral hover:underline">Refund Policy</a>.
            </p>
          </div>

          {/* Acceptable Use */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">7. Acceptable Use</h2>
            <p className="text-slate-700 dark:text-slate-400 mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-400">
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
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">8. AI-Generated Content</h2>
            <p className="text-slate-700 dark:text-slate-400 mb-4">
              Our Service uses artificial intelligence to generate content strategies, scripts, hooks, and recommendations. By using these features, you acknowledge and agree that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-400 mb-4">
              <li>AI-generated outputs are suggestions and may not always be accurate, complete, or suitable for your specific needs</li>
              <li>You are solely responsible for reviewing, editing, and approving any AI-generated content before publishing or distributing it</li>
              <li>We do not guarantee any specific results, engagement, or performance from content created using our tools</li>
              <li>AI outputs may occasionally produce content that is repetitive, factually incorrect, or inappropriate - you should always exercise editorial judgment</li>
              <li>You retain full ownership of content you create using AI-generated suggestions, but we are not liable for any claims arising from your use of that content</li>
            </ul>
          </div>

          {/* Intellectual Property */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">9. Intellectual Property</h2>
            <p className="text-slate-700 dark:text-slate-400 mb-4">
              The Service and its original content, features, and functionality are and will remain the exclusive property of The Content Labs and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>
            <p className="text-slate-700 dark:text-slate-400">
              You retain ownership of any content you create using our Service, but you grant us a license to use, store, and process such content solely for the purpose of providing the Service.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">10. Limitation of Liability</h2>
            <p className="text-slate-700 dark:text-slate-400">
              In no event shall The Content Labs, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
            </p>
          </div>

          {/* Termination */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">11. Termination</h2>
            <p className="text-slate-700 dark:text-slate-400">
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </div>

          {/* Changes to Terms */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">12. Changes to Terms</h2>
            <p className="text-slate-700 dark:text-slate-400 mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
            </p>
            <p className="text-slate-700 dark:text-slate-400">
              In the event of a data breach, we will notify affected users in accordance with our <a href="/privacy" className="text-content-coral hover:underline">Privacy Policy</a> and applicable law.
            </p>
          </div>

          {/* Social Media Data and Third-Party Platforms */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">13. Social Media Data and Third-Party Platforms</h2>
            <p className="text-slate-700 dark:text-slate-400 mb-4">
              Our platform analyzes publicly available social media content to provide content audits, competitor analysis, and strategy recommendations. By using these features, you acknowledge and agree that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-400 mb-4">
              <li>You warrant that you have the right to submit the social media accounts you choose to analyze, or that the accounts contain publicly available content</li>
              <li>You must comply with the Terms of Service of third-party platforms (including but not limited to TikTok and Instagram) when using our analysis features</li>
              <li>We are not responsible for changes to social media platform APIs, data availability, or access restrictions imposed by third-party platforms</li>
              <li>We do not access private, restricted, or direct message content - our analysis is limited to publicly available data such as video metadata, captions, engagement metrics, and profile information</li>
              <li>You are responsible for ensuring your use of analysis results complies with all applicable laws and platform policies</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Contact Us</h2>
            <p className="text-slate-700 dark:text-slate-400">
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <p className="text-slate-700 dark:text-slate-400 mt-2">
              Email: business@thecontentlabs.io
            </p>
          </div>

          <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              See also: <a href="/refund-policy" className="text-content-coral hover:underline">Refund Policy</a> | <a href="/privacy" className="text-content-coral hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
      </article>
      </main>
    </div>
  );
}
