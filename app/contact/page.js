import ContactSection from '@/components/sections/ContactSection';
import SeoPageHeader from '@/components/SeoPageHeader';
import JsonLd from '@/components/JsonLd';
import {
  buildBreadcrumbJsonLd,
  buildMetadata,
  getActiveRestaurant,
} from '@/lib/restaurants';

const restaurant = getActiveRestaurant();

export const metadata = buildMetadata(restaurant, {
  title: 'Contact – Academy Street, Inverness',
  description:
    'Contact Inverness Cafe & Pizzeria on Academy Street, Inverness. Phone, WhatsApp, email and opening hours — book a table or ask about takeaway.',
  path: '/contact/',
});

export default function ContactPage() {
  const breadcrumbs = buildBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact/' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <section className="site-section section-padding" style={{ background: 'var(--clr-bg-primary)', paddingBottom: 0 }}>
        <div className="container">
          <SeoPageHeader
            tag="Contact"
            title="Contact Us – Academy Street, Inverness"
            lead={`Find ${restaurant.name} on Academy Street. Call, WhatsApp or send a message — we would love to hear from you.`}
          />
        </div>
      </section>
      <ContactSection hideHeader />
    </>
  );
}
