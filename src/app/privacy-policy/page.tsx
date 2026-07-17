import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Global Export Solutions. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 mb-4">
                {SITE_CONFIG.name} ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website or use our services.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Personal Information</h3>
              <p className="text-gray-600 mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Submit an inquiry or contact form</li>
                <li>Subscribe to our newsletter</li>
                <li>Request product samples or quotes</li>
                <li>Communicate with us via email or phone</li>
              </ul>
              <p className="text-gray-600 mb-4">
                This information may include:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Name and company name</li>
                <li>Email address and phone number</li>
                <li>Country and address</li>
                <li>Business requirements and preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.2 Automatically Collected Information</h3>
              <p className="text-gray-600">
                When you visit our website, we automatically collect certain information about your device, 
                including IP address, browser type, operating system, referring URLs, and pages visited.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Respond to your inquiries and provide customer service</li>
                <li>Process your orders and send you relevant information</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Analyze website usage and trends</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-gray-600 mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share 
                your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>With service providers who help us operate our business</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transaction (merger, acquisition, etc.)</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-600">
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction. However, 
                no method of transmission over the Internet is 100% secure.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-600 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate or incomplete data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Withdraw consent at any time</li>
                <li>Unsubscribe from marketing communications</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies</h2>
              <p className="text-gray-600">
                We use cookies and similar tracking technologies to enhance your experience on our website. 
                You can control cookies through your browser settings.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to This Policy</h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-none text-gray-600 space-y-2">
                <li><strong>Email:</strong> {SITE_CONFIG.email}</li>
                <li><strong>Phone:</strong> {SITE_CONFIG.phone}</li>
                <li><strong>Address:</strong> {SITE_CONFIG.address}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
