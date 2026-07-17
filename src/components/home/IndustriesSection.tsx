'use client';

import AnimatedSection from '@/components/animations/AnimatedSection';
import { motion } from 'framer-motion';

const industries = [
  {
    title: 'Hospitality',
    description: 'Hotels, resorts, and restaurants worldwide',
    badge: 'Global Supply',
  },
  {
    title: 'Healthcare',
    description: 'Hospitals, clinics, and medical facilities',
    badge: 'Worldwide Export',
  },
  {
    title: 'Retail',
    description: 'Supermarkets, specialty stores, and distributors',
    badge: 'Bulk Orders Available',
  },
  {
    title: 'Food & Beverage',
    description: 'Food processing and manufacturing companies',
    badge: 'Global Supply',
  },
  {
    title: 'E-commerce',
    description: 'Online marketplaces and direct-to-consumer brands',
    badge: 'Worldwide Export',
  },
  {
    title: 'Wholesale',
    description: 'Bulk buyers and importers',
    badge: 'Bulk Orders Available',
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function IndustriesSection() {
  return (
    <AnimatedSection className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Industries We Serve
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Delivering quality products across diverse sectors worldwide
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {industries.map((industry, index) => {
            return (
              <motion.div
                key={industry.title}
                variants={cardVariants}
                whileHover={{ y: -12, scale: 1.03 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="group relative bg-white rounded-[20px] p-8 border border-[#E7EEF9] hover:border-[#2563EB] overflow-hidden cursor-pointer"
                style={{
                  minHeight: '280px',
                  boxShadow: '0 12px 40px rgba(37, 99, 235, 0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(37, 99, 235, 0.18)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(37, 99, 235, 0.08)';
                }}
                role="article"
                aria-label={industry.title}
                tabIndex={0}
              >
                {/* World map watermark */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                  <svg viewBox="0 0 200 120" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                    <path d="M30,40 L50,35 L70,45 L90,40 L110,50 L130,45 L150,55 M40,60 L60,55 L80,65 L100,60 L120,70 M50,80 L70,75 L90,85 L110,80" stroke="#2563EB" strokeWidth="1" fill="none" opacity="0.3"/>
                    <circle cx="45" cy="42" r="1.5" fill="#2563EB" opacity="0.4"/>
                    <circle cx="75" cy="48" r="1.5" fill="#2563EB" opacity="0.4"/>
                    <circle cx="105" cy="52" r="1.5" fill="#2563EB" opacity="0.4"/>
                    <circle cx="65" cy="62" r="1.5" fill="#2563EB" opacity="0.4"/>
                    <circle cx="95" cy="67" r="1.5" fill="#2563EB" opacity="0.4"/>
                  </svg>
                </div>

                {/* Dotted pattern - top right */}
                <div className="absolute top-3 right-3 w-10 h-10 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-400">
                  <svg viewBox="0 0 32 32" className="w-full h-full">
                    <defs>
                      <pattern id={`dots-ind-${index}`} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1" fill="#2563EB" />
                      </pattern>
                    </defs>
                    <rect width="32" height="32" fill={`url(#dots-ind-${index})`} />
                  </svg>
                </div>

                {/* Large blurred radial gradient - bottom right */}
                <div 
                  className="absolute -bottom-8 -right-8 w-40 h-40 opacity-20 group-hover:opacity-40 transition-opacity duration-400 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.3) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col">
                  <h3 className="text-[26px] font-bold text-[#0F172A] mb-3 leading-tight">
                    {industry.title}
                  </h3>
                  
                  {/* Blue accent line */}
                  <div
                    className="h-[3px] bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-full mb-4 transition-all duration-400 w-[50px] group-hover:w-[90px]"
                  />

                  <p className="text-[15px] text-[#64748B] leading-[1.7] mb-6">
                    {industry.description}
                  </p>
                </div>

                {/* Bottom badge */}
                <div
                  className="absolute bottom-6 left-8 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 group-hover:bg-[#2563EB] group-hover:border-[#2563EB] transition-all duration-400"
                >
                  <span className="text-xs font-semibold text-blue-700 group-hover:text-white transition-colors">
                    {industry.badge}
                  </span>
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
