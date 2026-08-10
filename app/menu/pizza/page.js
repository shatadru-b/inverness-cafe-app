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
  title: 'Pizza in Inverness',
  description:
    'Hand-stretched Italian pizza in Inverness — Margherita, pepperoni, meat feast and more at Inverness Cafe & Pizzeria on Academy Street. Dine in or takeaway.',
  path: '/menu/pizza/',
});

export default function PizzaMenuPage() {
  const breadcrumbs = buildBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Menu', url: '/menu/' },
    { name: 'Pizza', url: '/menu/pizza/' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <section className="site-section section-padding" style={{ background: 'var(--clr-bg-primary)', paddingBottom: 0 }}>
        <div className="container">
          <SeoPageHeader
            tag="Pizza"
            title="Pizza in Inverness"
            lead="Hand-stretched dough and classic Italian toppings at our Academy Street pizzeria. Add extras when you order — perfect for dine-in or takeaway."
          />
          <p style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--clr-text-muted)' }}>
            <a href="/menu/" style={{ color: 'var(--clr-amber-400)' }}>Full menu</a>
            {' · '}
            <a href="/menu/pasta/" style={{ color: 'var(--clr-amber-400)' }}>Pasta</a>
            {' · '}
            <a href="/menu/burgers/" style={{ color: 'var(--clr-amber-400)' }}>Burgers</a>
            {' · '}
            <a href="/takeaway/" style={{ color: 'var(--clr-amber-400)' }}>Takeaway</a>
          </p>
        </div>
      </section>
      <MenuSection onlyCategories={['pizza']} hideHeader />
    </>
  );
}
