'use client';

import AnimatedSection from '@/components/animations/AnimatedSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const faqs = [
  {
    question: 'What products do you export?',
    answer: 'We specialize in three main categories: premium Indian spices (turmeric, red chilli, cumin, etc.), dehydrated products (onion powder, garlic powder, vegetable powders), and textile products (bedsheets, towels, hotel linen, hospital linen).',
  },
  {
    question: 'Which countries do you export to?',
    answer: 'We export to over 50 countries across North America, Europe, Asia, Australia, and the Middle East. Our major markets include the USA, UK, Germany, Australia, UAE, and Singapore.',
  },
  {
    question: 'What certifications do you have?',
    answer: 'We hold ISO 9001:2015, HACCP, FSSAI License, Organic Certification, GMP Certification, and all necessary export licenses. Quality and compliance are our top priorities.',
  },
  {
    question: 'What is your minimum order quantity (MOQ)?',
    answer: 'MOQ varies by product category. For spices and dehydrated products, it typically starts from 500 kg. For textiles, it depends on the specific item. Contact us for detailed MOQ information.',
  },
  {
    question: 'How long does shipping take?',
    answer: 'Shipping time depends on the destination and shipping method. Typically, sea freight takes 15-30 days, while air freight takes 5-7 days. We provide complete tracking information for all shipments.',
  },
  {
    question: 'Can you provide product samples?',
    answer: 'Yes, we offer samples for quality evaluation. Sample costs and shipping charges apply, which can be adjusted against your first bulk order.',
  },
  {
    question: 'What payment terms do you accept?',
    answer: 'We accept various payment terms including LC (Letter of Credit), TT (Telegraphic Transfer), and advance payment for new clients. Payment terms can be negotiated based on order value and client relationship.',
  },
  {
    question: 'Do you offer customization and private labeling?',
    answer: 'Absolutely! We provide custom packaging, private labeling, and can tailor products to your specific requirements. Our team works closely with you to create solutions that match your brand needs.',
  },
];

export default function FAQSection() {
  return (
    <AnimatedSection className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our products and services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Have more questions? We're here to help!
            </p>
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
