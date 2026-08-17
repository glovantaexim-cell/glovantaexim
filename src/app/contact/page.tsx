import { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import { SITE_CONFIG } from '@/lib/constants';
import { Card } from '@/components/ui/card';
import { 
  getOrganizationSchema, 
  getContactPageSchema 
} from '@/lib/structured-data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.glovantaexim.com';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch',
  description: 'Contact Glovanta Exim for inquiries about spices, dehydrated ingredients, and textiles. We respond within 24 hours.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact Us - Get in Touch | Glovanta Exim',
    description: 'Contact Glovanta Exim for inquiries about spices, dehydrated ingredients, and textiles. We respond within 24 hours.',
    type: 'website',
    url: `${SITE_URL}/contact`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Get in Touch | Glovanta Exim',
    description: 'Contact Glovanta Exim for inquiries about spices, dehydrated ingredients, and textiles. We respond within 24 hours.',
  },
};

export default async function ContactPage({ searchParams }: { searchParams?: Promise<{ product?: string }> }) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const defaultProductInterest = resolvedSearchParams?.product ? decodeURIComponent(resolvedSearchParams.product) : undefined;

  const organizationSchema = getOrganizationSchema();
  const contactPageSchema = getContactPageSchema();

  return (
    <>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} 
      />
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-200 to-blue-400 text-white overflow-hidden min-h-[400px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/about-hero.png" 
            alt="Contact Us"
            width="1920"
            height="1080"
            loading="eager"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Get in Touch
            </h1>
            <p className="text-xl text-white drop-shadow-md">
              Have questions? We&apos;re here to help with your sourcing needs
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      For general inquiries
                    </p>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="text-primary hover:underline"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Mon-Sat: 9:00 AM - 6:00 PM IST
                    </p>
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Visit Us</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Our office location
                    </p>
                    <address className="text-gray-700 not-italic">{SITE_CONFIG.address}</address>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Business Hours</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8" id="inquiry-form">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we&apos;ll get back to you within 24 hours with details, pricing, MOQ, and shipping information
                </p>
                
                {/* Export Inquiry Information */}
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Inquiry Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <p><strong>Response Time:</strong> Within 24 hours</p>
                      <p><strong>Sample Policy:</strong> Available (charges apply)</p>
                      <p><strong>Documentation:</strong> Complete docs provided</p>
                    </div>
                    <div>
                      <p><strong>Payment Terms:</strong> Flexible options available</p>
                      <p><strong>Shipping:</strong> Worldwide delivery</p>
                      <p><strong>Support:</strong> Dedicated team</p>
                    </div>
                  </div>
                </div>
                
                <ContactForm defaultProductInterest={defaultProductInterest} />
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
