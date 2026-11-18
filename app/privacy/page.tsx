import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/templates/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy - The Content Labs',
  description:
    'Privacy Policy for The Content Labs. Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://thecontentlabs.app/privacy',
  },
  openGraph: {
    title: 'Privacy Policy - The Content Labs',
    description:
      'Privacy Policy for The Content Labs. Learn how we collect, use, and protect your personal information.',
    url: 'https://thecontentlabs.app/privacy',
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
    { '@type': 'ListItem', position: 2, name: 'Privacy Policy' },
  ],
});

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Privacy Policy" updated="March 13, 2026">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />

          {/* Introduction */}
          <div>
            <h2 className="mb-4">1. Introduction</h2>
            <p className="mb-4">
              The Content Labs ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Service.
            </p>
          </div>

          {/* Information We Collect */}
          <div>
            <h2 className="mb-4">
              2. Information We Collect
            </h2>

            <h3 className="mb-3">Personal Information</h3>
            <p className="mb-4">
              We may collect personal information that you voluntarily provide to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Name and email address</li>
              <li>Account credentials</li>
              <li>Social media usernames (for content analysis)</li>
              <li>Business information and content preferences</li>
              <li>Payment information (processed securely through Stripe)</li>
            </ul>

            <h3 className="mb-3">Usage Information</h3>
            <p className="mb-4">
              We automatically collect certain information when you use our Service:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Log data (IP address, browser type, pages visited)</li>
              <li>Device information</li>
              <li>Usage patterns and preferences</li>
              <li>Content interaction data</li>
            </ul>
          </div>

          {/* How We Use Information */}
          <div>
            <h2 className="mb-4">
              3. How We Use Your Information
            </h2>
            <p className="mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our Service</li>
              <li>Process transactions and manage subscriptions</li>
              <li>Analyze your content and provide personalized recommendations</li>
              <li>Communicate with you about your account and our services</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Detect, prevent, and address technical issues and security threats</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-4">
              All notification emails include an unsubscribe option. You can manage your email preferences at any time in your account <a href="/dashboard/settings">Settings</a>. Our mailing address is 3792 Poppleton CT, Troy, Michigan 48084.
            </p>
          </div>

          {/* Information Sharing */}
          <div>
            <h2 className="mb-4">4. Information Sharing and Disclosure</h2>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our Service</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
              <li><strong>Consent:</strong> With your explicit consent for any other purpose</li>
            </ul>
          </div>

          {/* Data Security */}
          <div>
            <h2 className="mb-4">
              5. Data Security
            </h2>
            <p className="mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Secure payment processing through Stripe</li>
            </ul>
          </div>

          {/* Data Retention */}
          <div>
            <h2 className="mb-4">6. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to provide you with our Service and as described in this Privacy Policy. We will retain and use your information to comply with our legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </div>

          {/* Data Breach Notification */}
          <div>
            <h2 className="mb-4">7. Data Breach Notification</h2>
            <p className="mb-4">
              In the event of a data breach affecting your personal information, we will notify affected users via email within 72 hours of becoming aware of the breach. We will also notify relevant supervisory authorities as required by applicable law.
            </p>
            <p className="mb-4">
              Breach notifications will describe:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>The nature of the data breach</li>
              <li>The types of personal data affected</li>
              <li>The steps we have taken to address the breach</li>
              <li>Recommended actions for affected users to protect themselves</li>
            </ul>
            <p>
              If you have any security concerns, please contact us immediately at business@thecontentlabs.io.
            </p>
          </div>

          {/* Your Rights */}
          <div>
            <h2 className="mb-4">8. Your Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
            </ul>
          </div>

          {/* Cookies and Tracking */}
          <div>
            <h2 className="mb-4">9. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our Service. These technologies help us:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Remember your preferences and settings</li>
              <li>Analyze usage patterns and improve our Service</li>
              <li>Provide personalized content and recommendations</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </div>

          {/* Third-Party Services */}
          <div>
            <h2 className="mb-4">10. Third-Party Services</h2>
            <p className="mb-4">
              Our Service may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.
            </p>
            <p className="mb-4">
              We use the following third-party services to operate our platform:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Stripe</strong> for secure payment processing (card details are never stored on our servers)</li>
              <li><strong>Supabase</strong> for data storage and authentication</li>
              <li><strong>PostHog</strong> for product analytics, session recordings, and feature flags to improve the user experience</li>
              <li><strong>Anthropic (Claude)</strong> for AI-powered content analysis, strategy generation, and The Chemist chatbot</li>
              <li><strong>Social media APIs</strong> for scraping publicly available content data used in audits and competitor analysis</li>
            </ul>
            <p className="mt-4">
              When you use AI-powered features, your content data (such as social media usernames, video captions, and onboarding responses) may be sent to Anthropic for processing. Anthropic processes this data in accordance with their own privacy and data retention policies. We do not share your personal account information (email, password, or payment details) with AI providers.
            </p>
            <p className="mt-4">
              When you submit social media usernames for analysis, you consent to our collection of publicly available data including video metadata, captions, engagement metrics, and profile information. This data is stored and used solely to provide analysis within the platform.
            </p>
          </div>

          {/* Changes to Privacy Policy */}
          <div>
            <h2 className="mb-4">11. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </div>

          {/* Contact Information */}
          <div className="lab-card p-5 sm:p-6">
            <h2 className="mb-4">Contact Us</h2>
            <p className="mb-2">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="space-y-1">
              <p>Email: business@thecontentlabs.io</p>
              <p>Address: 3792 Poppleton CT, Troy, Michigan 48084</p>
            </div>
          </div>
    </LegalPageLayout>
  );
}
