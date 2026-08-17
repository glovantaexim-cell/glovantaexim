'use client';

import AnimatedSection from '@/components/animations/AnimatedSection';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Premium Quality',
    description: 'Stringent quality control at every stage ensures only the best products reach you',
  },
  {
    title: 'Competitive Pricing',
    description: 'Direct sourcing and efficient operations mean the best value for your money',
  },
  {
    title: 'Reliable Supply',
    description: 'Consistent availability and on-time delivery you can count on',
  },
  {
    title: 'Global Reach',
    description: 'Exporting to 50+ countries with established logistics networks',
  },
  {
    title: 'Custom Solutions',
    description: 'Flexible packaging, labeling, and product specifications to match your needs',
  },
  {
    title: 'Expert Support',
    description: '24/7 customer service with dedicated account managers',
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function WhyChooseUsSection() {
  return (
    <AnimatedSection className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine quality, reliability, and expertise to deliver exceptional value
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature, index) => {
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ 
                  duration: 0.4, 
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="group relative bg-white rounded-[20px] p-8 border border-[#E8F0FF] hover:border-[#2563EB] h-full flex flex-col"
                style={{
                  boxShadow: '0 12px 35px rgba(37, 99, 235, 0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 25px 60px rgba(37, 99, 235, 0.18)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(37, 99, 235, 0.08)';
                }}
                role="article"
                aria-label={feature.title}
              >
                {/* Decorative dotted pattern - top right */}
                <div className="absolute top-4 right-4 w-12 h-12 opacity-0 group-hover:opacity-10 transition-opacity duration-400">
                  <svg viewBox="0 0 32 32" className="w-full h-full">
                    <defs>
                      <pattern id={`dots-why-${index}`} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1" fill="#2563EB" />
                      </pattern>
                    </defs>
                    <rect width="32" height="32" fill={`url(#dots-why-${index})`} />
                  </svg>
                </div>

                {/* Decorative radial gradient - bottom right */}
                <div 
                  className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-30 transition-opacity duration-400 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.15) 0%, transparent 70%)',
                  }}
                />

                <div className="mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#3B82F6] text-2xl font-bold text-white shadow-lg">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-[30px] font-bold text-[#0F172A] mb-4 leading-tight">
                    {feature.title}
                  </h3>
                  
                  {/* Blue accent line with expand animation */}
                  <div
                    className="h-[4px] bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-full mb-4 transition-all duration-400 w-[50px] group-hover:w-[90px]"
                  />

                  <p className="text-[16px] text-[#475569] leading-[1.8] flex-1">
                    {feature.description}
                  </p>
                </div>

                {/* Focus ring for accessibility */}
                <div className="absolute inset-0 rounded-[20px] ring-2 ring-[#2563EB] ring-offset-2 opacity-0 focus-within:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
