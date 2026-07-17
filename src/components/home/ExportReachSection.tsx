'use client';

import AnimatedSection from '@/components/animations/AnimatedSection';
import { motion } from 'framer-motion';

// Country data with flags (emoji) and better grouping
const featuredCountries = [
  { name: 'United States', flag: '🇺🇸', continent: 'North America', x: 15, y: 40 },
  { name: 'Canada', flag: '🇨🇦', continent: 'North America', x: 20, y: 25 },
  { name: 'United Kingdom', flag: '🇬🇧', continent: 'Europe', x: 48, y: 30 },
  { name: 'Germany', flag: '🇩🇪', continent: 'Europe', x: 52, y: 28 },
  { name: 'France', flag: '🇫🇷', continent: 'Europe', x: 50, y: 32 },
  { name: 'Italy', flag: '🇮🇹', continent: 'Europe', x: 53, y: 35 },
  { name: 'Spain', flag: '🇪🇸', continent: 'Europe', x: 48, y: 36 },
  { name: 'Netherlands', flag: '🇳🇱', continent: 'Europe', x: 51, y: 27 },
  { name: 'Belgium', flag: '🇧🇪', continent: 'Europe', x: 51, y: 29 },
  { name: 'UAE', flag: '🇦🇪', continent: 'Middle East', x: 58, y: 40 },
  { name: 'Saudi Arabia', flag: '🇸🇦', continent: 'Middle East', x: 56, y: 42 },
  { name: 'Singapore', flag: '🇸🇬', continent: 'Asia', x: 73, y: 52 },
  { name: 'Japan', flag: '🇯🇵', continent: 'Asia', x: 80, y: 35 },
  { name: 'South Korea', flag: '🇰🇷', continent: 'Asia', x: 78, y: 36 },
  { name: 'Australia', flag: '🇦🇺', continent: 'Oceania', x: 82, y: 70 },
  { name: 'New Zealand', flag: '🇳🇿', continent: 'Oceania', x: 90, y: 75 },
  { name: 'Brazil', flag: '🇧🇷', continent: 'South America', x: 32, y: 65 },
  { name: 'Mexico', flag: '🇲🇽', continent: 'North America', x: 18, y: 42 },
];

export default function ExportReachSection() {
  return (
    <AnimatedSection className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Reaching{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              50+ Countries
            </span>
            <br />
            <span className="text-3xl md:text-4xl text-gray-700">Across 6 Continents</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            From bustling cities to emerging markets, our products power industries worldwide with
            unmatched quality and reliability
          </motion.p>
        </div>

        {/* Interactive World Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-7xl mx-auto mb-20"
        >
          <div className="relative bg-white rounded-3xl shadow-2xl p-4 md:p-8 border border-gray-200">
            {/* Stylized World Map SVG */}
            <div className="relative aspect-[2/1] overflow-visible">
              <svg viewBox="0 0 1000 500" className="w-full h-full">
                <defs>
                  {/* Gradient for map */}
                  <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#dbeafe" />
                    <stop offset="50%" stopColor="#bfdbfe" />
                    <stop offset="100%" stopColor="#93c5fd" />
                  </linearGradient>
                  {/* Glow effect */}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Simplified world map continents */}
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  fill="url(#mapGradient)"
                  stroke="#3b82f6"
                  strokeWidth="1"
                >
                  {/* North America */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.3 }}
                    d="M 100 120 Q 150 80, 200 90 L 250 110 Q 260 150, 250 180 L 200 200 Q 150 190, 120 170 Z"
                    opacity="0.7"
                  />
                  
                  {/* South America */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.4 }}
                    d="M 230 250 L 270 280 Q 280 350, 260 400 Q 240 420, 220 410 L 200 350 Q 210 300, 230 250 Z"
                    opacity="0.7"
                  />
                  
                  {/* Europe */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.5 }}
                    d="M 470 110 Q 520 100, 550 120 L 560 160 Q 540 180, 500 170 L 470 150 Z"
                    opacity="0.7"
                  />
                  
                  {/* Africa */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.6 }}
                    d="M 480 200 Q 520 190, 560 210 L 570 280 Q 560 340, 520 360 L 480 340 Q 470 280, 480 200 Z"
                    opacity="0.7"
                  />
                  
                  {/* Asia */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.7 }}
                    d="M 600 100 Q 700 80, 800 110 L 820 180 Q 800 240, 750 250 L 650 240 Q 600 200, 600 100 Z"
                    opacity="0.7"
                  />
                  
                  {/* Australia */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.8 }}
                    d="M 780 350 Q 840 340, 880 360 L 890 390 Q 870 420, 820 410 L 780 390 Z"
                    opacity="0.7"
                  />
                </motion.g>

                {/* Animated connection lines from origin */}
                <g>
                  {featuredCountries.map((country, index) => (
                    <motion.line
                      key={`line-${index}`}
                      x1="500"
                      y1="250"
                      x2={country.x * 10}
                      y2={country.y * 10}
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      opacity="0.3"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 1 + index * 0.05 }}
                    />
                  ))}
                </g>

                {/* Animated location markers */}
                {featuredCountries.map((country, index) => (
                  <g key={`marker-${index}`}>
                    <motion.circle
                      cx={country.x * 10}
                      cy={country.y * 10}
                      r="8"
                      fill="#2563eb"
                      filter="url(#glow)"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.2 + index * 0.05 }}
                    />
                    <motion.circle
                      cx={country.x * 10}
                      cy={country.y * 10}
                      r="8"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      animate={{
                        r: [8, 20, 8],
                        opacity: [0.8, 0, 0.8]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    />
                  </g>
                ))}

                {/* Central origin point */}
                <motion.g
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <circle cx="500" cy="250" r="30" fill="#1e40af" opacity="0.2" />
                  <circle cx="500" cy="250" r="20" fill="#2563eb" />
                  <motion.circle
                    cx="500"
                    cy="250"
                    r="20"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    animate={{
                      r: [20, 40, 20],
                      opacity: [0.8, 0, 0.8]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity
                    }}
                  />
                  {/* India flag or text */}
                  <text x="500" y="255" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
                    IN
                  </text>
                </motion.g>
              </svg>

              {/* Floating stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-blue-200"
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">50+</p>
                  <p className="text-xs text-gray-600">Active Countries</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Countries Grid with Beautiful Cards */}
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
              Featured Export Destinations
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
              {featuredCountries.map((country, index) => (
                <motion.div
                  key={country.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.03 }}
                  whileHover={{ scale: 1.08, y: -8 }}
                  className="bg-gradient-to-br from-white to-blue-50 p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-400 group"
                >
                  <div className="text-center space-y-2">
                    <motion.div
                      whileHover={{ scale: 1.3, rotate: [0, -10, 10, -10, 0] }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="text-4xl md:text-5xl mb-2"
                    >
                      {country.flag}
                    </motion.div>
                    <div>
                      <p className="text-sm md:text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                        {country.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{country.continent}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 shadow-xl"
          >
            <p className="text-white text-lg md:text-xl font-semibold mb-2">
              And expanding to more markets every day!
            </p>
            <p className="text-blue-100 text-sm md:text-base">
              Serving customers across{' '}
              <span className="font-bold text-white">
                North America • Europe • Asia • Middle East • Oceania • South America
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

