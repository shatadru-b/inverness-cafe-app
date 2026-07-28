'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
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
              <div className="nav-brand-icon">🍕</div>
              <div className="nav-brand-text">
                <span className="nav-brand-name">Inverness</span>
                <span className="nav-brand-sub">Cafe & Pizzeria</span>
              </div>
            </a>
            <p className="footer-brand-text">
              Bringing the best of Italian cuisine to the Scottish Highlands. Handcrafted pizzas, fresh pasta, and gourmet comfort food.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="TripAdvisor">🗺️</a>
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
              <div className="footer-hours-row">
                <span>Mon – Thu</span>
                <span>11:00 – 22:00</span>
              </div>
              <div className="footer-hours-row">
                <span>Fri – Sat</span>
                <span>11:00 – 23:00</span>
              </div>
              <div className="footer-hours-row">
                <span>Sunday</span>
                <span>12:00 – 21:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Inverness Cafe & Pizzeria. All rights reserved.</p>
          <p>Made with ❤️ in the Scottish Highlands</p>
        </div>
      </div>
    </footer>
  );
}
