'use client';

import AnimatedSection from '@/components/animations/AnimatedSection';
import { EXPORT_PROCESS_STEPS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function ExportProcessSection() {
  return (
    <AnimatedSection className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Export Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A seamless journey from inquiry to delivery
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-blue-400 to-primary" />

            {/* Steps */}
            {EXPORT_PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.step}
                className={`relative flex items-start mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg ml-20 md:ml-0">
                    <div className="flex items-center gap-2 mb-2 md:justify-end">
                      <span className="text-sm font-semibold text-primary">Step {step.step}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>

                {/* Step Number Circle */}
                <div className="absolute left-3.5 md:left-1/2 md:transform md:-translate-x-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10">
                  <Check className="w-6 h-6 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
