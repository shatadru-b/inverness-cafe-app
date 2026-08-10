import AboutSection from '@/components/sections/AboutSection';
import SeoPageHeader from '@/components/SeoPageHeader';
import JsonLd from '@/components/JsonLd';
import {
  buildBreadcrumbJsonLd,
  buildMetadata,
  getActiveRestaurant,
} from '@/lib/restaurants';

const restaurant = getActiveRestaurant();

export const metadata = buildMetadata(restaurant, {
  title: 'About Us – Italian Restaurant on Academy Street',
  description:
    'Meet Inverness Cafe & Pizzeria — an Italian restaurant on Academy Street serving handcrafted pizza, fresh pasta and Scottish favourites in the Highlands.',
  path: '/about/',
});

export default function AboutPage() {
  const breadcrumbs = buildBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about/' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <section className="site-section section-padding" style={{ background: 'var(--clr-bg-primary)', paddingBottom: 0 }}>
        <div className="container">
          <SeoPageHeader
            tag="About Us"
            title="About Inverness Cafe & Pizzeria"
            lead="Our Italian restaurant on Academy Street brings authentic pizza, pasta and warm hospitality to the heart of Inverness."
          />
        </div>
      </section>
      <AboutSection hideIntroHeader />
    </>
  );
}
