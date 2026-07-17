'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/lib/constants';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Actual background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/hero-bg.png')`,
          }}
        />
        {/* Gradient overlay for better text readability on the left side */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/20" />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 rounded-full border-2 border-blue-400/50 bg-blue-500/10 mb-6"
              >
                <span className="text-blue-300 text-sm font-semibold tracking-wide uppercase">
                  Premium Quality from India
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                <span className="text-white">Premium Quality</span>
                <br />
                <span className="text-blue-300">Export Solutions</span>
                <br />
                <span className="text-white">from India</span>
              </motion.h1>

              {/* Decorative Line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '80px' }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="h-1 bg-gradient-to-r from-blue-400 to-blue-300 mb-6"
              />

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed"
              >
                Premium Quality Exports from India to the World. Your trusted partner for exceptional quality,
                reliability, and competitive pricing.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <Button 
                  size="lg" 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base px-8 py-6 rounded-lg shadow-xl hover:shadow-2xl transition-all"
                  asChild
                >
                  <Link href="/products">
                    Explore Products
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-400/50 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 font-semibold text-base px-8 py-6 rounded-lg transition-all"
                  asChild
                >
                  <Link href="/contact">
                    Get a Quote
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
