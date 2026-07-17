'use client';

import AnimatedSection from '@/components/animations/AnimatedSection';
import { Target, Eye, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

const companyValues = [
  {
    icon: Heart,
    title: 'Our Story',
    description:
      'Glovanta Exim specializes in bringing premium Indian products to global markets. We are committed to delivering exceptional quality and building lasting partnerships with buyers worldwide.',
  },
  {
    icon: Target,
    title: 'Our Mission',
    description:
      'To be a trusted export partner by delivering exceptional quality products, maintaining transparent operations, and building long-term relationships with our global customers.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description:
      'To become a leading global exporter recognized for innovation, sustainability, and excellence in every product we deliver, while empowering local communities and farmers.',
  },
];

export default function CompanyIntroSection() {
  return (
    <AnimatedSection className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Who We Are
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A legacy of quality, trust, and excellence in global exports
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {companyValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                variants={staggerItem}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="group relative bg-white rounded-[20px] p-8 border border-[#E5F0FF] hover:border-blue-600 transition-all duration-400 cursor-pointer h-full flex flex-col"
                style={{
                  boxShadow: '0 10px 35px rgba(37, 99, 235, 0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 25px 60px rgba(37, 99, 235, 0.18)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 35px rgba(37, 99, 235, 0.08)';
                }}
                role="article"
                aria-label={value.title}
                tabIndex={0}
              >
                {/* Decorative corner gradient */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent rounded-tr-[20px] opacity-50" />
                
                {/* Decorative dotted pattern */}
                <div className="absolute bottom-4 right-4 w-16 h-16 opacity-10">
                  <svg viewBox="0 0 40 40" className="w-full h-full">
                    <defs>
                      <pattern id={`dots-${index}`} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1" fill="#2563EB" />
                      </pattern>
                    </defs>
                    <rect width="40" height="40" fill={`url(#dots-${index})`} />
                  </svg>
                </div>

                {/* Icon Container */}
                <motion.div
                  className="relative z-10 w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center mb-6 shadow-lg"
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col">
                  <h3 className="text-[32px] font-bold text-gray-900 mb-3 leading-tight">
                    {value.title}
                  </h3>
                  
                  {/* Blue accent line */}
                  <div
                    className="h-[3px] bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-5 transition-all duration-400 w-[40px] group-hover:w-[60px]"
                  />

                  <p className="text-[16px] text-gray-600 leading-[1.8] flex-1">
                    {value.description}
                  </p>
                </div>

                {/* Focus ring for accessibility */}
                <div className="absolute inset-0 rounded-[20px] ring-2 ring-blue-600 ring-offset-2 opacity-0 focus-within:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
