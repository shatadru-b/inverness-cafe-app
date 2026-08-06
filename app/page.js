'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './home.module.css';
import MenuSection from '@/components/sections/MenuSection';
import ReserveSection from '@/components/sections/ReserveSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import { useRestaurant } from '@/lib/RestaurantContext';
import { getOpeningStatus } from '@/lib/openingHours';

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function HomePage() {
  const restaurant = useRestaurant();
  const { content, images } = restaurant;
  const { hero } = content;
  const [openStatus, setOpenStatus] = useState(null);

  useEffect(() => {
    const tick = () => setOpenStatus(getOpeningStatus(restaurant.hours));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [restaurant.hours]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Open deep links like /#menu or /?cat=pizza#menu after load
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const t = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* HOME — hero only; scroll-spy targets this section */}
      <section id="home" className="site-section">
        <div className={styles.hero}>
          <div className={styles.heroBg}>
            <Image src={images.hero} alt={`${restaurant.shortName} interior`} fill style={{ objectFit: 'cover' }} priority />
          </div>
          <div className={styles.heroOverlay}></div>
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <span
                  className={styles.heroBadgeDot}
                  data-open={openStatus?.isOpen ? 'true' : 'false'}
                  style={
                    openStatus
                      ? {
                          background: openStatus.isOpen ? '#22c55e' : '#a8a29e',
                          boxShadow: openStatus.isOpen ? '0 0 8px rgba(34,197,94,0.5)' : 'none',
                        }
                      : undefined
                  }
                />
                {openStatus?.label || hero.badge}
              </div>
              <h1>
                {hero.titleBefore}
                <em style={{ color: 'var(--clr-amber-400)' }}>{hero.titleEm}</em>
                {hero.titleAfter}
              </h1>
              <p className={styles.heroDesc}>
                {hero.description}
              </p>
              <div className={styles.heroButtons}>
                <button type="button" className="btn btn-primary" onClick={() => scrollToSection('menu')}>View Our Menu</button>
                <button type="button" className="btn btn-outline" onClick={() => scrollToSection('reserve')}>Book a Table</button>
              </div>
              <div className={styles.heroStats}>
                {hero.stats.map((s) => (
                  <div key={s.label}>
                    <div className={styles.statValue}>{s.value}</div>
                    <div className={styles.statLabel}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.heroFloatImages}>
            <img className={styles.heroFloatImg} src={images.pizzaHero} alt="Pizza" />
            <img className={styles.heroFloatImg} src={images.pastaHero} alt="Pasta" style={{ animationDelay: '-2s', marginLeft: '40px' }} />
            <img className={styles.heroFloatImg} src={images.burgerHero} alt="Burger" style={{ animationDelay: '-4s' }} />
          </div>
        </div>
      </section>

      <MenuSection />
      <ReserveSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
