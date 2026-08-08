'use client';

import AnimatedSection from '@/components/animations/AnimatedSection';
import { Card } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'John Smith',
    company: 'Global Foods Inc., USA',
    text: 'Outstanding quality and reliability. We have been importing spices from them for 5 years, and the consistency in quality is remarkable.',
    rating: 5,
  },
  {
    name: 'Sarah Johnson',
    company: 'Euro Textiles, Germany',
    text: 'Their textile products exceed our expectations every time. Professional service and timely deliveries make them our preferred partner.',
    rating: 5,
  },
  {
    name: 'David Chen',
    company: 'Pacific Imports, Australia',
    text: 'The dehydrated products are of exceptional quality. Their attention to detail and commitment to excellence is truly impressive.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <AnimatedSection className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by businesses worldwide for quality and reliability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass p-6 h-full hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <Quote className="w-10 h-10 text-primary/20" />
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">&quot;{testimonial.text}&quot;</p>
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
