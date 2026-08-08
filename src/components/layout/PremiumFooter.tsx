import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { CERTIFICATIONS, PRODUCT_CATEGORIES, SITE_CONFIG } from '@/lib/constants';
import NewsletterForm from '@/components/forms/NewsletterForm';

export default function PremiumFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="overflow-hidden bg-[#062b43] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-12 pt-16 sm:px-6 lg:grid-cols-[1.35fr_0.75fr_0.9fr_1.1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-12 w-12 overflow-hidden rounded-full border border-white/20 bg-white"><Image src="/logo.png" alt="Glovanta Exim" width={48} height={48} className="h-full w-full object-cover" /></span>
            <span><span className="block text-xl font-bold tracking-[-0.04em]">Glovanta Exim</span><span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#9ed4e3]">Global trade solutions</span></span>
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">{SITE_CONFIG.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {CERTIFICATIONS.slice(0, 3).map((certification) => <span key={certification} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#d4edf1]">{certification}</span>)}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[#a6d6e1]">Explore</h2>
          <ul className="mt-5 space-y-3">
            {[['About us', '/about'], ['Our products', '/products'], ['Insights', '/blog'], ['Contact', '/contact']].map(([label, href]) => <li key={href}><Link href={href} className="group inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white">{label}<ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[#a6d6e1]">Product lines</h2>
          <ul className="mt-5 space-y-3">
            {PRODUCT_CATEGORIES.map((category) => <li key={category.slug}><Link href={category.slug === 'dehydrated-products' ? '/products/dehydrated' : `/products/${category.slug}`} className="text-sm text-white/70 transition-colors hover:text-white">{category.title}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[#a6d6e1]">Stay connected</h2>
          <p className="mt-5 text-sm leading-6 text-white/65">Export insight, product updates, and sourcing opportunities—sent occasionally.</p>
          <div className="mt-5"><NewsletterForm /></div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-7 text-xs text-white/55 sm:px-6 md:grid-cols-3 lg:px-8">
          <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 transition-colors hover:text-white"><Mail className="h-3.5 w-3.5 text-[#7ec5d8]" />{SITE_CONFIG.email}</a>
          <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 transition-colors hover:text-white"><Phone className="h-3.5 w-3.5 text-[#7ec5d8]" />{SITE_CONFIG.phone}</a>
          <span className="flex items-start gap-2 leading-5"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7ec5d8]" />Surat, Gujarat, India</span>
        </div>
      </div>
      <div className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-[11px] text-white/45 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"><span>© Glovanta Exim. All rights reserved.</span><span>Premium Indian goods, thoughtfully exported.</span></div></div>
    </footer>
  );
}
