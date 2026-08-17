import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import { PRODUCT_CATEGORIES, SITE_CONFIG } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Package, MessageCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getWhatsAppLink } from '@/lib/utils';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = PRODUCT_CATEGORIES.find((c) => c.slug === categorySlug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.title} - Premium Export Quality`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  
  // Redirect specific categories to their dedicated pages
  if (categorySlug === 'textile') {
    redirect('/products/textile');
  }
  
  if (categorySlug === 'spices') {
    redirect('/products/spices');
  }
  
  if (categorySlug === 'dehydrated' || categorySlug === 'dehydrated-products') {
    redirect('/products/dehydrated');
  }

  const category = PRODUCT_CATEGORIES.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const categoryIndex = PRODUCT_CATEGORIES.findIndex((c) => c.slug === categorySlug);
  const whatsappMessage = `Hi! I&apos;m interested in your ${category.title}. I&apos;d like to know more about products and pricing.`;
  const whatsappUrl = getWhatsAppLink(SITE_CONFIG.whatsapp, whatsappMessage);

  const faqs = [
    {
      question: `What types of ${category.title.toLowerCase()} do you offer?`,
      answer: `We offer a comprehensive range of ${category.products.length}+ products including ${category.products.slice(0, 5).join(', ')}, and many more. Each product is sourced from trusted suppliers and undergoes strict quality control.`,
    },
    {
      question: 'What is the minimum order quantity?',
      answer: 'Minimum order quantities vary by product. Please contact us with your specific requirements for detailed MOQ information.',
    },
    {
      question: 'Do you provide product samples?',
      answer: 'Yes, we provide samples for quality evaluation. Sample costs and shipping charges apply, which can be adjusted against your first bulk order.',
    },
    {
      question: 'What certifications do your products have?',
      answer: 'All our products are backed by international certifications including ISO 9001:2015, HACCP, FSSAI, and relevant organic certifications where applicable.',
    },
    {
      question: 'Can you customize packaging?',
      answer: 'Yes, we offer custom packaging solutions including private labeling, customized box designs, and bulk packaging options to meet your specific requirements.',
    },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{category.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 text-white overflow-hidden min-h-[450px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={
              categoryIndex === 0 ? '/spices-card.png' :
              categoryIndex === 1 ? '/dehydrated-card.png' :
              '/textile-card.png'
            }
            alt={category.title}
            width="1920"
            height="1080"
            loading="eager"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">{category.title}</h1>
            <p className="text-xl text-white drop-shadow-md">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="p-12 text-center bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Products Coming Soon!
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                We&apos;re currently updating our product catalog with detailed information and images. 
                In the meantime, we&apos;d love to discuss your requirements directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Get Pre-Order Quote
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 w-5 h-5" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Product List Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our {category.title} Range
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.products.map((product) => (
                <Card
                  key={product}
                  className="p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl mb-2">📦</div>
                  <h3 className="font-semibold text-gray-900 text-sm">{product}</h3>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
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
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Interested in Our {category.title}?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your requirements, get samples, and receive a customized quote
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-700 hover:bg-blue-50"
            asChild
          >
            <Link href="/contact">
              Send Inquiry Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
