import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CompanyIntroSection from '@/components/home/CompanyIntroSection';
import ExportProcessSection from '@/components/home/ExportProcessSection';
import { ArrowRight } from 'lucide-react';
import { 
  getOrganizationSchema, 
  getAboutPageSchema,
  getHowToSchema 
} from '@/lib/structured-data';
import { EXPORT_PROCESS_STEPS } from '@/lib/constants';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.glovantaexim.com';

export const metadata: Metadata = {
  title: 'About Us - Glovanta Exim',
  description: 'Learn about our journey, mission, and commitment to delivering quality goods from India to international markets.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'About Us - Glovanta Exim',
    description: 'Learn about our journey, mission, and commitment to delivering quality goods from India to international markets.',
    type: 'website',
    url: `${SITE_URL}/about`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Glovanta Exim',
    description: 'Learn about our journey, mission, and commitment to delivering quality goods from India to international markets.',
  },
};

export default function AboutPage() {
  const organizationSchema = getOrganizationSchema();
  const aboutPageSchema = getAboutPageSchema();
  
  // HowTo Schema for Export Process
  const howToSchema = getHowToSchema({
    name: 'How to Order from Glovanta Exim',
    description: 'A step-by-step guide to ordering premium export products from Glovanta Exim - from initial inquiry to delivery.',
    steps: EXPORT_PROCESS_STEPS.map(step => ({
      name: step.title,
      text: step.description,
    })),
    totalTime: 'P14D', // ISO 8601 duration format: ~14 days typical
  });

  return (
    <>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} 
      />
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-200 to-blue-400 text-white overflow-hidden min-h-[500px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/about-hero.png" 
            alt="About Glovanta Exim"
            width="1920"
            height="1080"
            loading="eager"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Decorative blur elements */}
        <div className="absolute inset-0 opacity-10 z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              About Us
            </h1>
            {/* Speakable content - concise summary suitable for voice assistants */}
            <div className="speakable-content">
              <p className="text-xl text-white drop-shadow-md">
                Building bridges between India and the world through reliable sourcing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <article className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <aside>
              <figure className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/about-us.png" 
                  alt="Glovanta Exim team and facilities"
                  width="1200"
                  height="900"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </figure>
            </aside>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                About Glovanta Exim
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Glovanta Exim is dedicated to showcasing India&apos;s finest offerings to the global market. 
                  We specialize in sourcing spices, dehydrated ingredients, and textiles 
                  for international buyers, serving customers in over 50 countries.
                </p>
                <p>
                  We work closely with trusted farmers, manufacturers, and specialists 
                  across India. This extensive network allows us to source excellent items while 
                  maintaining high standards for markets including the USA, Europe, Middle East, and Asia-Pacific.
                </p>
                <p>
                  Our commitment to transparency, customer satisfaction, and reliable supply chains drives everything 
                  we do. We strive to be your trusted partner, delivering exceptional service 
                  with every order, backed by proper documentation and certifications.
                </p>
                <p>
                  <strong>Why Choose Glovanta Exim:</strong> Direct sourcing relationships, 
                  flexible solutions, competitive pricing, consistent availability, 
                  and comprehensive documentation support for smooth international trade.
                </p>
              </div>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/products">
                    Explore Our Products
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <CompanyIntroSection />

      {/* Export Process - Moved from Home Page */}
      <ExportProcessSection />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Partner With Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Connect with us to explore quality goods from India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50" asChild>
              <Link href="/contact">
                Contact Us Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700" asChild>
              <Link href="/products">View Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
