import { getActiveRestaurant } from '@/lib/restaurants';

/**
 * Menu entry. The dish list lives on Flipdish; this is the button that opens it.
 */
export default function MenuSection({
  heading = 'Our Menu',
  subtitle = 'Crafted with passion, served with love',
  hideHeader = false,
} = {}) {
  const restaurant = getActiveRestaurant();

  return (
    <section id="menu" className="site-section section-padding" style={{ background: 'var(--clr-bg-primary)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        {!hideHeader && (
          <div className="section-header" style={{ marginBottom: '2rem' }}>
            <div className="section-tag">Full Menu</div>
            <h2 className="section-title">{heading}</h2>
            <p className="section-subtitle">{subtitle}</p>
          </div>
        )}
        <a href={restaurant.orderUrl} className="btn btn-primary">
          View Our Menu
        </a>
      </div>
    </section>
  );
}
