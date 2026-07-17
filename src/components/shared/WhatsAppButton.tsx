'use client';

import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';

export default function WhatsAppButton() {
  const message = `Hi! I'm interested in your export products. I'd like to know more about your offerings.`;
  const whatsappUrl = getWhatsAppLink(SITE_CONFIG.whatsapp, message);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us on WhatsApp
      </span>
    </a>
  );
}
