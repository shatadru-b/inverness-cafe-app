import Link from 'next/link';
import SeoPageHeader from '@/components/SeoPageHeader';
import JsonLd from '@/components/JsonLd';
import MenuSection from '@/components/sections/MenuSection';
import {
  buildBreadcrumbJsonLd,
  buildMetadata,
  getActiveRestaurant,
} from '@/lib/restaurants';

const restaurant = getActiveRestaurant();

export const metadata = buildMetadata(restaurant, {
  title: 'Takeaway Inverness – Order Pizza & Pasta Online',
  description:
    'Takeaway from Inverness Cafe & Pizzeria on Academy Street — Italian pizza, pasta, burgers and more. Order online, collect or arrange delivery.',
  path: '/takeaway/',
});

export default function TakeawayPage() {
  const breadcrumbs = buildBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Takeaway', url: '/takeaway/' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <section className="site-section section-padding" style={{ background: 'var(--clr-bg-primary)', paddingBottom: 0 }}>
        <div className="container">
          <SeoPageHeader
            tag="Takeaway"
            title="Takeaway in Inverness"
            lead={`${restaurant.name} on Academy Street — order Italian pizza, pasta and favourites for collection or takeaway. Build your order online, then checkout via WhatsApp or call.`}
          />
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link href="/cart/" className="btn btn-primary" style={{ marginRight: '0.75rem' }}>
              View cart & order
            </Link>
            <Link href="/menu/pizza/" className="btn btn-outline">
              View our pizza menu
            </Link>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--clr-text-muted)', maxWidth: 640, margin: '0 auto 1rem' }}>
            Phone: <a href={`tel:${restaurant.phone.e164}`} style={{ color: 'var(--clr-amber-400)' }}>{restaurant.phone.display}</a>
            {' · '}
            {restaurant.address.street}, {restaurant.address.locality} {restaurant.address.postalCode}
          </p>
        </div>
      </section>
      <MenuSection
        hideHeader
        heading="Takeaway Menu"
        subtitle="Add dishes to your cart for takeaway from Academy Street"
      />
    </>
  );
}
