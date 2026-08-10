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
  title: 'Burgers in Inverness',
  description:
    'Gourmet burgers in Inverness at Inverness Cafe & Pizzeria on Academy Street — classics, combos and more. Dine in or takeaway.',
  path: '/menu/burgers/',
});

export default function BurgersMenuPage() {
  const breadcrumbs = buildBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Menu', url: '/menu/' },
    { name: 'Burgers', url: '/menu/burgers/' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <section className="site-section section-padding" style={{ background: 'var(--clr-bg-primary)', paddingBottom: 0 }}>
        <div className="container">
          <SeoPageHeader
            tag="Burgers"
            title="Burgers in Inverness"
            lead="Juicy burgers and combos from our kitchen on Academy Street — ideal for a hearty dine-in meal or takeaway in Inverness."
          />
          <p style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--clr-text-muted)' }}>
            <a href="/menu/" style={{ color: 'var(--clr-amber-400)' }}>Full menu</a>
            {' · '}
            <a href="/menu/pizza/" style={{ color: 'var(--clr-amber-400)' }}>Pizza</a>
            {' · '}
            <a href="/menu/pasta/" style={{ color: 'var(--clr-amber-400)' }}>Pasta</a>
            {' · '}
            <a href="/takeaway/" style={{ color: 'var(--clr-amber-400)' }}>Takeaway</a>
          </p>
        </div>
      </section>
      <MenuSection onlyCategories={['burgers']} hideHeader />
    </>
  );
}
