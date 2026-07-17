import { Metadata } from 'next';
import Link from 'next/link';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Products - Spices, Dehydrated Products & Textiles',
  description: 'Browse our extensive range of premium export products including Indian spices, dehydrated vegetables, and quality textiles for global markets.',
};

export default function ProductsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-200 to-blue-400 text-white overflow-hidden min-h-[400px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/about-hero.png" 
            alt="Our Products"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full text-sm font-semibold mb-6 drop-shadow-lg">
              <Package className="w-4 h-4" />
              Premium Export Products
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Our Product Categories
            </h1>
            <p className="text-xl text-white drop-shadow-md">
              Discover our wide range of premium quality export products sourced from the finest suppliers across India
            </p>
          </div>
        </div>
      </section>

      {/* Product Categories Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCT_CATEGORIES.map((category, index) => (
              <Link
                key={category.slug}
                href={category.slug === 'dehydrated-products' ? '/products/dehydrated' : `/products/${category.slug}`}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full">
                  <div className="h-64 relative overflow-hidden">
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {category.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="space-y-2 mb-6">
                      <p className="text-sm font-semibold text-gray-700">
                        Product Range:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {category.products.slice(0, 5).map((product) => (
                          <span
                            key={product}
                            className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                          >
                            {product}
                          </span>
                        ))}
                        {category.products.length > 5 && (
                          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
                            +{category.products.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                    <Button variant="link" className="p-0 h-auto group/btn">
                      View Category
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Need Custom Solutions?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            We offer customized packaging, private labeling, and tailored product specifications
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-700 hover:bg-blue-50"
            asChild
          >
            <Link href="/contact">
              Request a Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
