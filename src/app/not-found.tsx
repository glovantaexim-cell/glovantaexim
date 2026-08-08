import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '@/lib/constants';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-9xl font-bold text-primary mb-4">404</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild>
              <Link href="/">
                <Home className="mr-2 w-5 h-5" />
                Go to Homepage
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                <Search className="mr-2 w-5 h-5" />
                Contact Support
              </Link>
            </Button>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PRODUCT_CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={`/products/${category.slug}`}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all group"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
