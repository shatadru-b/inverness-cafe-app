'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useRestaurant } from '@/lib/RestaurantContext';
import { RESERVATIONS_ENABLED } from '@/lib/features';

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const restaurant = useRestaurant();
  const isHome = pathname === '/' || pathname === '';

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  const goToSection = (id, e, options = {}) => {
    const { cat, href } = options;
    // Prefer real SEO routes when leaving home; on home, smooth-scroll
    if (href && !isHome) {
      // let Link/default navigation work
      return;
    }
    if (href && isHome && (id === 'menu' || id === 'reserve' || id === 'about' || id === 'contact' || id === 'home')) {
      e.preventDefault();
      const targetId = cat ? `menu-${cat}` : id;
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(
        null,
        '',
        cat ? `/?cat=${cat}#menu` : id === 'home' ? '/' : `/#${id}`
      );
      return;
    }
    e.preventDefault();
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
            <Link href="/" className="nav-brand" onClick={(e) => goToSection('home', e, { href: '/' })}>
              <img
                src={restaurant.logo.image}
                alt={restaurant.name}
                className="nav-brand-logo"
              />
            </Link>
            <p className="footer-brand-text">
              {restaurant.content.footerBlurb}
            </p>
            <div className="footer-social">
              <a
                href={restaurant.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <img src="/images/instagram.png" alt="" width={24} height={24} />
              </a>
              <a
                href={restaurant.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <img src="/images/youtube.png" alt="" width={24} height={24} />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link href="/" onClick={(e) => goToSection('home', e, { href: '/' })}>Home</Link>
              </li>
              <li>
                <Link href="/menu/" onClick={(e) => goToSection('menu', e, { href: '/menu/' })}>Our Menu</Link>
              </li>
              {RESERVATIONS_ENABLED ? (
                <li>
                  <Link href="/reserve/" onClick={(e) => goToSection('reserve', e, { href: '/reserve/' })}>Reservations</Link>
                </li>
              ) : null}
              <li>
                <Link href="/about/" onClick={(e) => goToSection('about', e, { href: '/about/' })}>About Us</Link>
              </li>
              <li>
                <Link href="/contact/" onClick={(e) => goToSection('contact', e, { href: '/contact/' })}>Contact</Link>
              </li>
              <li>
                <Link href="/takeaway/">Takeaway</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Our Menu</h4>
            <ul>
              <li><Link href="/menu/pizza/">Pizza</Link></li>
              <li><Link href="/menu/pasta/">Pasta</Link></li>
              <li><Link href="/menu/burgers/">Burgers</Link></li>
              <li><Link href="/menu/?cat=kitchen">Kitchen Food</Link></li>
              <li><Link href="/menu/?cat=sides">Side Plates</Link></li>
              <li><Link href="/menu/?cat=juices">Juices</Link></li>
              <li><Link href="/menu/?cat=shakes">Shakes</Link></li>
              <li><Link href="/menu/?cat=coffee">Coffee</Link></li>
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
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--clr-text-muted)' }}>
              {restaurant.address.street}, {restaurant.address.locality} {restaurant.address.postalCode}
            </p>
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
