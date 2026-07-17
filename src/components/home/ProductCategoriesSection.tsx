'use client';

import AnimatedSection from '@/components/animations/AnimatedSection';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProductCategoriesSection() {
  return (
    <AnimatedSection className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Product Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our wide range of premium export products
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {PRODUCT_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.slug}
              variants={staggerItem}
              className="group"
            >
              <Link href={`/products/${category.slug}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow h-full">
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={
                        index === 0 ? '/spices-card.png' :
                        index === 1 ? '/dehydrated-card.png' :
                        '/textile-card.png'
                      }
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.products.slice(0, 3).map((product) => (
                        <span
                          key={product}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {product}
                        </span>
                      ))}
                      {category.products.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          +{category.products.length - 3} more
                        </span>
                      )}
                    </div>
                    <Button variant="link" className="p-0 h-auto group/btn">
                      Explore {category.title}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}
