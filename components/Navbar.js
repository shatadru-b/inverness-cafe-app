'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { useRestaurant } from '@/lib/RestaurantContext';
import { RESERVATIONS_ENABLED } from '@/lib/features';

const SECTION_IDS = RESERVATIONS_ENABLED
  ? ['home', 'menu', 'reserve', 'about', 'contact']
  : ['home', 'menu', 'about', 'contact'];

/** hrefs are crawlable SEO routes; on home we still smooth-scroll to sections */
const navItems = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'menu', label: 'Menu', href: '/menu/' },
  ...(RESERVATIONS_ENABLED
    ? [{ id: 'reserve', label: 'Reserve', href: '/reserve/' }]
    : []),
  { id: 'about', label: 'About', href: '/about/' },
  { id: 'contact', label: 'Contact', href: '/contact/' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart();
  const restaurant = useRestaurant();
  const isHome = pathname === '/' || pathname === '';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }, [pathname]);

  // Highlight nav tab based on which section is in view (home page only)
  useEffect(() => {
    if (!isHome) return;

    const observers = [];
    const ratios = {};

    const updateActive = () => {
      let bestId = 'home';
      let bestRatio = 0;
      for (const id of SECTION_IDS) {
        const r = ratios[id] || 0;
        if (r > bestRatio) {
          bestRatio = r;
          bestId = id;
        }
      }
      // Near top of page, always treat as Home
      if (window.scrollY < 120) bestId = 'home';
      setActiveSection(bestId);
    };

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          ratios[id] = entry.isIntersecting ? entry.intersectionRatio : 0;
          updateActive();
        },
        {
          root: null,
          // Bias toward the middle of the viewport under the fixed nav
          rootMargin: '-20% 0px -45% 0px',
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isHome]);

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  const goToSection = useCallback((id, href) => {
    closeMenu();
    if (isHome) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', id === 'home' ? '/' : `/#${id}`);
        setActiveSection(id);
        return;
      }
    }
    router.push(href || (id === 'home' ? '/' : `/${id}/`));
  }, [isHome, router]);

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = !menuOpen ? 'hidden' : '';
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation">
      <div className="container">
        <a
          href="/"
          className="nav-brand"
          onClick={(e) => {
            e.preventDefault();
            goToSection('home', '/');
          }}
        >
          <img
            src={restaurant.logo.image}
            alt={restaurant.name}
            className="nav-brand-logo"
          />
        </a>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => {
            const pathActive =
              !isHome &&
              (item.href === '/'
                ? false
                : pathname === item.href || pathname === item.href.replace(/\/$/, ''));
            return (
              <a
                key={item.id}
                href={item.href}
                className={(isHome && activeSection === item.id) || pathActive ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  goToSection(item.id, item.href);
                }}
              >
                {item.label}
              </a>
            );
          })}
          <Link href="/cart/" className={`nav-cart-btn ${pathname === '/cart' || pathname === '/cart/' ? 'active' : ''}`} onClick={closeMenu}>
            Cart
            {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
          </Link>
          <Link href="/cart/" className="nav-cta" onClick={closeMenu}>
            Order Now
          </Link>
        </div>

        <button
          className={`nav-toggle ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
