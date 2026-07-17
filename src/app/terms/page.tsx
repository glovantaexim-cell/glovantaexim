import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for using Global Export Solutions services and website.',
};

export default function TermsPage() {
  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-600">
                By accessing or using the {SITE_CONFIG.name} website and services, you agree to be bound by 
                these Terms and Conditions. If you do not agree with these terms, please do not use our services.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use of Services</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Eligibility</h3>
              <p className="text-gray-600 mb-4">
                Our services are intended for business-to-business transactions. You must be at least 18 years 
                old and have the authority to enter into binding contracts on behalf of your organization.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Account Responsibilities</h3>
              <p className="text-gray-600">
                You are responsible for maintaining the confidentiality of any account information and for all 
                activities that occur under your account.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Products and Services</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Product Information</h3>
              <p className="text-gray-600 mb-4">
                We strive to provide accurate product descriptions and specifications. However, we do not warrant 
                that product descriptions or other content is accurate, complete, or error-free.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Pricing</h3>
              <p className="text-gray-600 mb-4">
                All prices are quoted based on current market conditions and are subject to change without notice. 
                Final pricing will be confirmed in your quotation.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Orders</h3>
              <p className="text-gray-600">
                Submission of an order constitutes an offer to purchase. We reserve the right to accept or decline 
                any order. Order confirmation will be sent via email.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payment Terms</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Payment terms will be specified in your quotation and invoice</li>
                <li>We accept various payment methods including LC and TT</li>
                <li>Late payments may incur additional charges</li>
                <li>All prices are in USD unless otherwise specified</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Shipping and Delivery</h2>
              <p className="text-gray-600 mb-4">
                Shipping terms will be agreed upon for each order. We are not responsible for delays caused by:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Customs clearance processes</li>
                <li>Force majeure events</li>
                <li>Shipping carrier delays</li>
                <li>Inaccurate delivery information provided by the buyer</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Quality Assurance</h2>
              <p className="text-gray-600 mb-4">
                All products undergo quality control before shipment. Claims regarding product quality must be 
                made within:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>7 days of receipt for visible defects</li>
                <li>30 days of receipt for latent defects</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-600">
                All content on this website, including text, graphics, logos, and images, is the property of 
                {SITE_CONFIG.name} and is protected by intellectual property laws. Unauthorized use is prohibited.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-600">
                To the maximum extent permitted by law, {SITE_CONFIG.name} shall not be liable for any indirect, 
                incidental, special, or consequential damages arising from your use of our services or products.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Governing Law</h2>
              <p className="text-gray-600">
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes 
                shall be subject to the exclusive jurisdiction of the courts in Mumbai, India.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                For questions about these Terms & Conditions, please contact us:
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
