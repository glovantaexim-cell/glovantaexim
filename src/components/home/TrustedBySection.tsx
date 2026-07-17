'use client';

import AnimatedSection from '@/components/animations/AnimatedSection';

const clientLogos = [
  'Hilton', 'Marriott', 'Walmart', 'Costco', 'Amazon',
  'Tesco', 'Carrefour', 'IKEA', 'Target', 'Whole Foods',
];

export default function TrustedBySection() {
  return (
    <AnimatedSection className="py-16 bg-white border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
            Trusted by Global Leaders
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee space-x-12">
            {[...clientLogos, ...clientLogos].map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              >
                <span className="text-2xl font-bold text-gray-400">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
