'use client';

import AnimatedSection from '@/components/animations/AnimatedSection';
import { CERTIFICATIONS } from '@/lib/constants';
import { motion } from 'framer-motion';

export default function CertificationsSection() {
  return (
    <AnimatedSection className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Certifications & Quality Assurance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to quality is validated by international certifications
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, index) => (
              <motion.div
                key={cert}
                className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border-2 border-blue-200 hover:border-primary hover:shadow-lg transition-all group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all text-primary font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-bold text-gray-900">{cert}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Quality Control at Every Step</h3>
            <p className="text-blue-100 max-w-2xl mx-auto">
              From sourcing raw materials to final packaging, every product undergoes rigorous quality 
              checks to meet international standards and exceed customer expectations.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
