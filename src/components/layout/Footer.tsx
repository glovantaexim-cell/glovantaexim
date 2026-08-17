import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SITE_CONFIG, PRODUCT_CATEGORIES, CERTIFICATIONS } from '@/lib/constants';
import NewsletterForm from '@/components/forms/NewsletterForm';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo.png" 
                alt="Glovanta Exim"
                width="40"
                height="40"
                loading="lazy"
                className="h-10 w-auto object-contain"
              />
              <div>
                <div className="font-bold text-lg">{SITE_CONFIG.name}</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              {SITE_CONFIG.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-start space-x-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{SITE_CONFIG.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>{SITE_CONFIG.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">Our Products</h3>
            <ul className="space-y-2">
              {PRODUCT_CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/products/${category.slug}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="font-semibold text-sm mb-2">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                {CERTIFICATIONS.slice(0, 3).map((cert) => (
                  <span
                    key={cert}
                    className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get the latest updates on products and export opportunities.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>
              © {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <p className="mt-2 md:mt-0">
              Exporting Quality Products Worldwide Since 2010
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
