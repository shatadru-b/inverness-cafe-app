'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible || (pathname && pathname.startsWith('/admin'))) return null;

  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
      title="Order via WhatsApp"
    >
      💬
    </a>
  );
}
