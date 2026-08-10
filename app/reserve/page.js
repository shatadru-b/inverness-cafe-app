import ReserveSection from '@/components/sections/ReserveSection';
import SeoPageHeader from '@/components/SeoPageHeader';
import JsonLd from '@/components/JsonLd';
import SectionRedirect from '@/components/SectionRedirect';
import { RESERVATIONS_ENABLED } from '@/lib/features';
import {
  buildBreadcrumbJsonLd,
  buildMetadata,
  getActiveRestaurant,
} from '@/lib/restaurants';

const restaurant = getActiveRestaurant();

// When reservations are off: keep route file + component code, but do not index or show UI
export const metadata = RESERVATIONS_ENABLED
  ? buildMetadata(restaurant, {
      title: 'Book a Table',
      description:
        'Reserve a table at Inverness Cafe & Pizzeria on Academy Street, Inverness. Book online for Italian dining in the Highlands.',
      path: '/reserve/',
    })
  : buildMetadata(restaurant, {
      title: 'Book a Table',
      description: 'Table reservations are temporarily unavailable online.',
      path: '/reserve/',
      noIndex: true,
    });

export default function ReservePage() {
  // Feature off: unmount section (no display:none). Full UI restored via RESERVATIONS_ENABLED.
  // See archive/reservation-section.html
  if (!RESERVATIONS_ENABLED) {
    return <SectionRedirect section="home" />;
  }

  const breadcrumbs = buildBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Book a Table', url: '/reserve/' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <section className="site-section section-padding" style={{ background: 'var(--clr-bg-primary)', paddingBottom: 0 }}>
        <div className="container">
          <SeoPageHeader
            tag="Reservations"
            title="Book a Table in Inverness"
            lead="Reserve your table at our Italian restaurant on Academy Street — perfect for families, couples and groups."
          />
        </div>
      </section>
      <ReserveSection hideHeader />
    </>
  );
}
