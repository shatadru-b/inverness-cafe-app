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
  title: 'Pasta in Inverness',
  description:
    'Fresh pasta in Inverness — carbonara, bolognese, pesto and more at Inverness Cafe & Pizzeria on Academy Street. Choose penne, fusilli or spaghetti.',
  path: '/menu/pasta/',
});

export default function PastaMenuPage() {
  const breadcrumbs = buildBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Menu', url: '/menu/' },
    { name: 'Pasta', url: '/menu/pasta/' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <section className="site-section section-padding" style={{ background: 'var(--clr-bg-primary)', paddingBottom: 0 }}>
        <div className="container">
          <SeoPageHeader
            tag="Pasta"
            title="Fresh Pasta in Inverness"
            lead="Classic Italian pasta dishes at our restaurant on Academy Street. Pick your shape — penne, fusilli or spaghetti — when you order."
          />
          <p style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--clr-text-muted)' }}>
            <a href="/menu/" style={{ color: 'var(--clr-amber-400)' }}>Full menu</a>
            {' · '}
            <a href="/menu/pizza/" style={{ color: 'var(--clr-amber-400)' }}>Pizza</a>
            {' · '}
            <a href="/menu/burgers/" style={{ color: 'var(--clr-amber-400)' }}>Burgers</a>
            {' · '}
            <a href="/takeaway/" style={{ color: 'var(--clr-amber-400)' }}>Takeaway</a>
          </p>
        </div>
      </section>
      <MenuSection onlyCategories={['pasta']} hideHeader />
    </>
  );
}
