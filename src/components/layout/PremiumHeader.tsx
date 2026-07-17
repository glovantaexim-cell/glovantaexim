'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronRight, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function PremiumHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="hidden bg-[#062b43] text-white md:block">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-6 text-[10px] font-semibold uppercase tracking-[0.17em] text-white/70 lg:px-8">
          <span>India to the world · export-ready supply</span>
          <a href={`mailto:${SITE_CONFIG.email}`} className="transition-colors hover:text-white">{SITE_CONFIG.email}</a>
        </div>
      </div>

      <div className={cn('border-b transition-all duration-500', isScrolled ? 'border-[#dce7eb]/80 bg-[#fbfaf7]/95 shadow-[0_12px_32px_rgba(5,40,61,0.08)] backdrop-blur-xl' : 'border-[#e3ecee] bg-[#fbfaf7]')}>
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3" aria-label={`${SITE_CONFIG.name} home`}>
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#d4e2e7] bg-white shadow-[0_5px_15px_rgba(5,40,61,0.08)] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
              <Image src="/logo.png" alt="" width={48} height={48} className="h-full w-full object-cover" />
            </span>
            <span className="hidden sm:block">
              <span className="block text-[17px] font-bold tracking-[-0.04em] text-[#062b43]">Glovanta Exim</span>
              <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.16em] text-[#4784a0]">Global trade solutions</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => {
              const active = link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href);
              return (
                <Link key={link.href} href={link.href} className={cn('relative rounded-full px-4 py-2 text-sm font-semibold transition-colors', active ? 'text-[#076d9e]' : 'text-[#25475a] hover:text-[#076d9e]')}>
                  {link.label}
                  {active && <motion.span layoutId="nav-active" className="absolute inset-x-4 -bottom-[17px] h-0.5 bg-[#e3723e]" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/contact" className="hidden items-center gap-1.5 rounded-full bg-[#076d9e] px-5 py-3 text-sm font-bold text-white shadow-[0_9px_20px_rgba(7,109,158,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#055a84] hover:shadow-[0_12px_24px_rgba(7,109,158,0.3)] sm:inline-flex">
              Request a quote <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button type="button" onClick={() => setIsMobileMenuOpen((open) => !open)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d8e5e8] text-[#062b43] transition-colors hover:border-[#a5cdd9] hover:bg-[#edf6f7] lg:hidden" aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMobileMenuOpen}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.22, ease: 'easeOut' }} className="border-b border-[#dce7eb] bg-[#fbfaf7] px-5 pb-6 pt-3 shadow-[0_16px_30px_rgba(5,40,61,0.1)] lg:hidden">
            <nav className="mx-auto grid max-w-7xl gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, index) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }}>
                  <Link href={link.href} className={cn('flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold', (link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href)) ? 'bg-[#e9f5f7] text-[#076d9e]' : 'text-[#183e53] hover:bg-[#f0f5f4]')}>
                    {link.label}<ChevronRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              ))}
              <Link href="/contact" className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-[#076d9e] px-5 py-3.5 text-sm font-bold text-white">Request a quote <ArrowUpRight className="h-4 w-4" /></Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
