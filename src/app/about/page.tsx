import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CompanyIntroSection from '@/components/home/CompanyIntroSection';
import ExportProcessSection from '@/components/home/ExportProcessSection';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - Glovanta Exim',
  description: 'Learn about our journey, mission, and commitment to delivering premium quality export products from India to the world.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-200 to-blue-400 text-white overflow-hidden min-h-[500px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/about-hero.png" 
            alt="About Glovanta Exim"
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
            <p className="text-xl text-white drop-shadow-md">
              Building bridges between India and the world through quality exports
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/about-us.png" 
                  alt="About Glovanta Exim"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                About Glovanta Exim
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Glovanta Exim is dedicated to showcasing India&apos;s finest products to the global market. 
                  We specialize in exporting premium quality spices, dehydrated products, and textiles 
                  to customers worldwide.
                </p>
                <p>
                  We work closely with trusted farmers, manufacturers, and quality control experts 
                  across India. This extensive network allows us to source the finest products while 
                  maintaining the highest quality standards.
                </p>
                <p>
                  Our commitment to quality, transparency, and customer satisfaction drives everything 
                  we do. We strive to be your reliable export partner, delivering exceptional products 
                  and service with every order.
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
          </div>
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
            Connect with us to explore premium quality export products from India
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
