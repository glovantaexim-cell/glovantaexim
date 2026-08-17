'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-[auto,1fr,auto] items-center h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <img 
              src="/logo.png" 
              alt="Glovanta Exim"
              width="48"
              height="48"
              loading="eager"
              className="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
            />
            <div className="hidden md:block">
              <div className="font-bold text-lg text-gray-900">
                {SITE_CONFIG.name}
              </div>
              <div className="text-xs text-gray-600">{SITE_CONFIG.tagline}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 justify-self-center">
            {NAV_LINKS.map((link) => (
              <div key={link.href} className="relative group">
                {link.submenu ? (
                  <>
                    <button
                      className="flex items-center space-x-1 text-gray-700 hover:text-primary font-medium transition-colors"
                      onMouseEnter={() => setOpenSubmenu(link.label)}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {openSubmenu === link.label && (
                      <div
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                        onMouseLeave={() => setOpenSubmenu(null)}
                      >
                        {link.submenu.map((sublink) => (
                          <Link
                            key={sublink.href}
                            href={sublink.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors"
                          >
                            {sublink.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="text-gray-700 hover:text-primary font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden justify-self-end p-2 text-gray-700 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {NAV_LINKS.map((link) => (
                <div key={link.href}>
                  {link.submenu ? (
                    <>
                      <button
                        className="flex items-center justify-between w-full text-gray-700 hover:text-primary font-medium transition-colors"
                        onClick={() =>
                          setOpenSubmenu(
                            openSubmenu === link.label ? null : link.label
                          )
                        }
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={cn(
                            'w-4 h-4 transition-transform',
                            openSubmenu === link.label && 'rotate-180'
                          )}
                        />
                      </button>
                      {openSubmenu === link.label && (
                        <div className="mt-2 ml-4 space-y-2">
                          {link.submenu.map((sublink) => (
                            <Link
                              key={sublink.href}
                              href={sublink.href}
                              className="block text-gray-600 hover:text-primary transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {sublink.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className="block text-gray-700 hover:text-primary font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
