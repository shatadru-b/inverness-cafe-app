'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';

const SECTION_IDS = ['home', 'menu', 'reserve', 'about', 'contact'];

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu' },
  { id: 'reserve', label: 'Reserve' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart();
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

  const goToSection = useCallback((id) => {
    closeMenu();
    if (!isHome) {
      router.push(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', id === 'home' ? '/' : `/#${id}`);
      setActiveSection(id);
    }
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
          href="/#home"
          className="nav-brand"
          onClick={(e) => {
            e.preventDefault();
            goToSection('home');
          }}
        >
          <div className="nav-brand-icon">🍕</div>
          <div className="nav-brand-text">
            <span className="nav-brand-name">Inverness</span>
            <span className="nav-brand-sub">Cafe & Pizzeria</span>
          </div>
        </a>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              className={isHome && activeSection === item.id ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                goToSection(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
          <Link href="/cart" className={`nav-cart-btn ${pathname === '/cart' || pathname === '/cart/' ? 'active' : ''}`} onClick={closeMenu}>
            🛒 Cart
            {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
          </Link>
          <Link href="/cart" className="nav-cta" onClick={closeMenu}>
            📞 Order Now
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
