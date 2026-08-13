'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BadgeCheck, ClipboardCheck, PackageCheck, ShieldCheck, Sparkles, Truck, UsersRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCT_CATEGORIES, SITE_CONFIG } from '@/lib/constants';
import { getWhatsAppLink } from '@/lib/utils';
import HeroBackground from './HeroBackground';

const categoryImages = ['/spices-card.png', '/dehydrated-card.png', '/textile-card.png'];

const reasons = [
  { icon: ShieldCheck, title: 'Quality-led sourcing', copy: 'A deliberate sourcing process built around the product details that matter to your market.' },
  { icon: ClipboardCheck, title: 'Clear communication', copy: 'Requirements, documentation, and next steps kept straightforward from enquiry to dispatch.' },
  { icon: PackageCheck, title: 'Flexible presentation', copy: 'Packaging and product specifications shaped around the practical needs of your business.' },
  { icon: Truck, title: 'Export-ready coordination', copy: 'A reliable partner for moving high-quality Indian products from origin to destination.' },
];

const heroChildren = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function PremiumHome() {
  const whatsappUrl = getWhatsAppLink(SITE_CONFIG.whatsapp, 'Hello, I would like to discuss my product requirements.');

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#062b43]">
        <HeroBackground />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,34,53,0.98)_0%,rgba(4,34,53,0.92)_34%,rgba(4,34,53,0.54)_58%,rgba(4,34,53,0.16)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#062b43] to-transparent" />

        <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-5 py-20 sm:px-6 lg:min-h-[710px] lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } } }} className="max-w-3xl">
            <motion.div variants={heroChildren} transition={{ duration: 0.55, ease: 'easeOut' }} className="inline-flex items-center gap-2 rounded-full border border-[#87d1e0]/35 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#bcecf2] backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#f2a15b]" /> Premium Indian goods, globally connected
            </motion.div>
            <motion.h1 variants={heroChildren} transition={{ duration: 0.65, ease: 'easeOut' }} className="mt-7 max-w-3xl text-5xl font-bold leading-[0.98] tracking-[-0.065em] text-white sm:text-6xl lg:text-7xl">
              India&apos;s finest, <span className="text-[#88d8e8]">delivered worldwide.</span>
            </motion.h1>
            <motion.p variants={heroChildren} transition={{ duration: 0.6, ease: 'easeOut' }} className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              Glovanta brings together premium spices, dehydrated ingredients, and home textiles for buyers who value quality, clarity, and dependable export support.
            </motion.p>
            <motion.div variants={heroChildren} transition={{ duration: 0.6, ease: 'easeOut' }} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/products" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f3a35d] px-6 py-3.5 text-sm font-bold text-[#3b2414] shadow-[0_12px_28px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#ffc282]">Explore product lines <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20">Talk to our team <ArrowUpRight className="h-4 w-4" /></Link>
            </motion.div>
            <motion.div variants={heroChildren} transition={{ duration: 0.6, ease: 'easeOut' }} className="mt-12 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              {['Spices', 'Dehydrated ingredients', 'Home textiles'].map((item) => <div key={item} className="flex items-center gap-2 border-l border-[#7ad0e0]/50 pl-3 text-sm font-semibold text-white/85"><BadgeCheck className="h-4 w-4 shrink-0 text-[#89d9e7]" />{item}</div>)}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.65, ease: 'easeOut' }} className="relative">
            <div className="overflow-hidden rounded-[2rem] bg-[#dcebed] shadow-[0_24px_55px_rgba(5,40,61,0.14)]"><Image src="/about-us.png" alt="Glovanta Exim team and products" width={1200} height={900} sizes="(max-width: 1024px) 100vw, 50vw" className="aspect-[4/3] h-full w-full object-cover" /></div>
            <div className="absolute -bottom-5 -right-3 max-w-[15rem] rounded-2xl border border-[#d3e3e6] bg-[#fbfaf7] p-4 shadow-[0_16px_35px_rgba(5,40,61,0.14)] sm:-right-8 sm:p-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#0780a7]">The Glovanta approach</span>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#12384c]">Practical export expertise, brought together with a human touch.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.65, ease: 'easeOut' }}>
            <span className="eyebrow">Your export partner</span>
            <h2 className="section-heading">Sourcing from India should feel certain—not complicated.</h2>
            <p className="section-copy">We make it easier to find the right products, understand the options, and move forward with confidence. Our focus is long-term partnerships, grounded in responsiveness and attention to detail.</p>
            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              {[
                ['Quality', 'Carefully selected product ranges'],
                ['Clarity', 'Straight answers at every stage'],
                ['Flexibility', 'Requirements shaped to fit'],
              ].map(([title, description]) => <div key={title} className="border-l-2 border-[#e3723e] pl-4"><p className="font-bold text-[#062b43]">{title}</p><p className="mt-1 text-sm leading-5 text-[#647f8b]">{description}</p></div>)}
            </div>
            <Link href="/about" className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#086d98] transition-colors hover:text-[#e3723e]">Meet Glovanta <ArrowRight className="h-4 w-4" /></Link>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#eef5f4] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div><span className="eyebrow">What we export</span><h2 className="section-heading">A focused portfolio with global potential.</h2></div>
            <p className="max-w-md text-base leading-7 text-[#58717d]">Three complementary product lines, each backed by the same commitment to thoughtful sourcing and service.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PRODUCT_CATEGORIES.map((category, index) => {
              const href = category.slug === 'dehydrated-products' ? '/products/dehydrated' : `/products/${category.slug}`;
              return (
                <motion.div key={category.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: index * 0.08 }} whileHover={{ y: -8 }} className="group h-full">
                  <Link href={href} className="block h-full overflow-hidden rounded-[1.6rem] border border-[#d7e5e6] bg-[#fbfaf7] shadow-[0_10px_26px_rgba(5,40,61,0.06)] transition-shadow duration-300 hover:shadow-[0_22px_42px_rgba(5,40,61,0.14)]">
                    <div className="relative h-60 overflow-hidden"><Image src={categoryImages[index]} alt={category.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#062b43]/75 to-transparent" /><span className="absolute bottom-5 left-5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#076d9e]">0{index + 1} / 03</span></div>
                    <div className="p-6"><h3 className="text-2xl font-bold tracking-[-0.04em] text-[#062b43]">{category.title}</h3><p className="mt-3 min-h-[3.5rem] text-sm leading-6 text-[#5f7782]">{category.description}</p><div className="mt-5 flex flex-wrap gap-2">{category.products.slice(0, 3).map((product) => <span key={product} className="rounded-full bg-[#e7f2f3] px-2.5 py-1 text-[10px] font-semibold text-[#417080]">{product}</span>)}</div><span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#076d9e]">View range <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#062b43] py-20 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl"><span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#96d9e6]"><span className="h-px w-7 bg-[#f3a35d]" /> Why partners choose us</span><h2 className="mt-4 text-4xl font-bold tracking-[-0.05em] sm:text-5xl">Trade with more confidence.</h2><p className="mt-5 text-base leading-7 text-white/65 sm:text-lg">The small details shape a strong export relationship. We give them the focus they deserve.</p></div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 md:grid-cols-2">
            {reasons.map((reason, index) => { const Icon = reason.icon; return <motion.div key={reason.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: index * 0.06 }} className="group bg-[#062b43] p-7 transition-colors hover:bg-[#0a3853] sm:p-8"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0d698d] text-[#bcecf2] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105"><Icon className="h-5 w-5" /></span><h3 className="mt-6 text-xl font-bold tracking-[-0.03em]">{reason.title}</h3><p className="mt-3 max-w-md text-sm leading-6 text-white/65">{reason.copy}</p></motion.div>; })}
          </div>
        </div>
      </section>

      <section className="bg-[#f3a35d] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8">
          <div><span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6b3d1f]">Start a conversation</span><h2 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-[-0.05em] text-[#2f2013] sm:text-5xl">Let&apos;s find the right fit for your market.</h2></div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end"><Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#062b43] px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#0b405f]">Request a quote <ArrowUpRight className="h-4 w-4" /></Link><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#6b3d1f]/40 bg-[#f9b77c] px-6 py-3.5 text-sm font-bold text-[#3d241a] transition-all hover:-translate-y-0.5 hover:bg-[#ffc58f]">Message on WhatsApp <UsersRound className="h-4 w-4" /></a></div>
        </div>
      </section>
    </>
  );
}
