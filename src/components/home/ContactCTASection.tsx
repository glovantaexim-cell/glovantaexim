'use client';

import AnimatedSection from '@/components/animations/AnimatedSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getWhatsAppLink } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';

export default function ContactCTASection() {
  const whatsappUrl = getWhatsAppLink(
    SITE_CONFIG.whatsapp,
    'Hi! I would like to discuss export opportunities with your company.'
  );

  return (
    <AnimatedSection className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Export Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get in touch with our team today. We're ready to discuss your requirements 
            and provide customized solutions for your business needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-6"
              asChild
            >
              <Link href="/contact">
                Send Inquiry
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 text-lg px-8 py-6"
              asChild
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>

          <div className="mt-12 pt-12 border-t border-blue-500/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-blue-200">Available Support</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">Fast</div>
                <div className="text-blue-200">Response Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">Premium</div>
                <div className="text-blue-200">Quality Products</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
