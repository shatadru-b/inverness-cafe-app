import SeoPageHeader from '@/components/SeoPageHeader';
import JsonLd from '@/components/JsonLd';
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
            lead={`${restaurant.name} on Academy Street — order Italian pizza, pasta and favourites for collection or takeaway.`}
          />
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <a href={restaurant.orderUrl} className="btn btn-primary">
              View our pizza menu
            </a>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--clr-text-muted)', maxWidth: 640, margin: '0 auto 1rem' }}>
            Phone: <a href={`tel:${restaurant.phone.e164}`} style={{ color: 'var(--clr-amber-400)' }}>{restaurant.phone.display}</a>
            {' · '}
            {restaurant.address.street}, {restaurant.address.locality} {restaurant.address.postalCode}
          </p>
        </div>
      </section>
    </>
  );
}
