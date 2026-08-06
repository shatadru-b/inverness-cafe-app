'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useRestaurant } from '@/lib/RestaurantContext';

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const restaurant = useRestaurant();
  const isHome = pathname === '/' || pathname === '';

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  const goToSection = (id, e, options = {}) => {
    e.preventDefault();
    const { cat } = options;
    const targetId = cat ? `menu-${cat}` : id;
    if (!isHome) {
      router.push(cat ? `/?cat=${cat}#menu` : `/#${id}`);
      return;
    }
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState(
      null,
      '',
      cat ? `/?cat=${cat}#menu` : id === 'home' ? '/' : `/#${id}`
    );
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="/#home" className="nav-brand" onClick={(e) => goToSection('home', e)}>
              <img
                src={restaurant.logo.image}
                alt={restaurant.name}
                className="nav-brand-logo"
              />
            </a>
            <p className="footer-brand-text">
              {restaurant.content.footerBlurb}
            </p>
            <div className="footer-social">
              <a href={restaurant.social.facebook} aria-label="Facebook">FB</a>
              <a href={restaurant.social.instagram} aria-label="Instagram">IG</a>
              <a href={restaurant.social.tripadvisor} aria-label="TripAdvisor">TA</a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/#home" onClick={(e) => goToSection('home', e)}>Home</a></li>
              <li><a href="/#menu" onClick={(e) => goToSection('menu', e)}>Our Menu</a></li>
              <li><a href="/#reserve" onClick={(e) => goToSection('reserve', e)}>Reservations</a></li>
              <li><a href="/#about" onClick={(e) => goToSection('about', e)}>About Us</a></li>
              <li><a href="/#contact" onClick={(e) => goToSection('contact', e)}>Contact</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Our Menu</h4>
            <ul>
              <li><a href="/?cat=pizza#menu" onClick={(e) => goToSection('menu', e, { cat: 'pizza' })}>Pizza</a></li>
              <li><a href="/?cat=pasta#menu" onClick={(e) => goToSection('menu', e, { cat: 'pasta' })}>Pasta</a></li>
              <li><a href="/?cat=burgers#menu" onClick={(e) => goToSection('menu', e, { cat: 'burgers' })}>Burgers</a></li>
              <li><a href="/?cat=kitchen#menu" onClick={(e) => goToSection('menu', e, { cat: 'kitchen' })}>Kitchen Food</a></li>
              <li><a href="/?cat=sides#menu" onClick={(e) => goToSection('menu', e, { cat: 'sides' })}>Side Plates</a></li>
              <li><a href="/?cat=juices#menu" onClick={(e) => goToSection('menu', e, { cat: 'juices' })}>Juices</a></li>
              <li><a href="/?cat=shakes#menu" onClick={(e) => goToSection('menu', e, { cat: 'shakes' })}>Shakes</a></li>
              <li><a href="/?cat=coffee#menu" onClick={(e) => goToSection('menu', e, { cat: 'coffee' })}>Coffee</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Opening Hours</h4>
            <div className="footer-hours">
              {restaurant.hours.map((h) => (
                <div className="footer-hours-row" key={h.label}>
                  <span>{h.label}</span>
                  <span>{h.opens} – {h.closes}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {restaurant.name}. All rights reserved.</p>
          <p>{restaurant.content.footerCredit}</p>
        </div>
      </div>
    </footer>
  );
}
