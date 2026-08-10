import MenuSection from '@/components/sections/MenuSection';
import SeoPageHeader from '@/components/SeoPageHeader';
import JsonLd from '@/components/JsonLd';
import {
  buildBreadcrumbJsonLd,
  buildMetadata,
  getActiveRestaurant,
} from '@/lib/restaurants';

const restaurant = getActiveRestaurant();

export const metadata = buildMetadata(restaurant, {
  title: 'Menu – Italian Pizza, Pasta & More in Inverness',
  description:
    'Browse the full menu at Inverness Cafe & Pizzeria on Academy Street — Italian pizza, fresh pasta, burgers, Scottish favourites, sides and drinks. Order for dine-in or takeaway.',
  path: '/menu/',
});

export default function MenuPage() {
  const breadcrumbs = buildBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Menu', url: '/menu/' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <section className="site-section section-padding" style={{ background: 'var(--clr-bg-primary)', paddingBottom: 0 }}>
        <div className="container">
          <SeoPageHeader
            tag="Full Menu"
            title="Our Menu – Italian Food in Inverness"
            lead={`Order authentic Italian pizza, pasta and more from ${restaurant.name} on Academy Street. Add items to your cart for takeaway or collection.`}
          />
          <p style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--clr-text-muted)' }}>
            Looking for something specific?{' '}
            <a href="/menu/pizza/" style={{ color: 'var(--clr-amber-400)' }}>View our pizza menu</a>
            {', '}
            <a href="/menu/pasta/" style={{ color: 'var(--clr-amber-400)' }}>pasta</a>
            {' or '}
            <a href="/menu/burgers/" style={{ color: 'var(--clr-amber-400)' }}>burgers</a>
            {'. '}
            Prefer collection? See our{' '}
            <a href="/takeaway/" style={{ color: 'var(--clr-amber-400)' }}>takeaway options</a>.
          </p>
        </div>
      </section>
      <MenuSection hideHeader />
    </>
  );
}
