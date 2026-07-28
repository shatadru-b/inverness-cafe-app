'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import styles from './home.module.css';
import MenuSection from '@/components/sections/MenuSection';
import ReserveSection from '@/components/sections/ReserveSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function HomePage() {
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
      {/* HOME */}
      <section id="home" className="site-section">
        <div className={styles.hero}>
          <div className={styles.heroBg}>
            <Image src="/images/hero-banner.png" alt="Inverness Cafe interior" fill style={{ objectFit: 'cover' }} priority />
          </div>
          <div className={styles.heroOverlay}></div>
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <span className={styles.heroBadgeDot}></span>
                Now Open — Welcome to Inverness
              </div>
              <h1>Authentic <em style={{ color: 'var(--clr-amber-400)' }}>Italian</em> Flavours in the Scottish Highlands</h1>
              <p className={styles.heroDesc}>
                From our wood-fired pizzas to freshly made pasta and gourmet burgers, every dish is crafted with love using the finest local and imported ingredients.
              </p>
              <div className={styles.heroButtons}>
                <button type="button" className="btn btn-primary" onClick={() => scrollToSection('menu')}>🍽️ View Our Menu</button>
                <button type="button" className="btn btn-outline" onClick={() => scrollToSection('reserve')}>📅 Book a Table</button>
              </div>
              <div className={styles.heroStats}>
                <div>
                  <div className={styles.statValue}>4.8★</div>
                  <div className={styles.statLabel}>Google Rating</div>
                </div>
                <div>
                  <div className={styles.statValue}>30+</div>
                  <div className={styles.statLabel}>Menu Items</div>
                </div>
                <div>
                  <div className={styles.statValue}>Fresh</div>
                  <div className={styles.statLabel}>Daily Ingredients</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.heroFloatImages}>
            <img className={styles.heroFloatImg} src="/images/pizza-hero.png" alt="Pizza" />
            <img className={styles.heroFloatImg} src="/images/pasta-hero.png" alt="Pasta" style={{ animationDelay: '-2s', marginLeft: '40px' }} />
            <img className={styles.heroFloatImg} src="/images/burger-hero.png" alt="Burger" style={{ animationDelay: '-4s' }} />
          </div>
        </div>

        <section className={styles.about}>
          <div className="container">
            <div className={styles.aboutGrid}>
              <div className={`${styles.aboutImage} reveal`}>
                <Image src="/images/about-interior.png" alt="Restaurant interior" width={640} height={500} style={{ objectFit: 'cover', width: '100%', height: '500px', borderRadius: 'var(--radius-2xl)' }} />
                <div className={styles.aboutBadge}>
                  <span style={{ fontSize: '1.875rem' }}>🔥</span>
                  <div>
                    <strong>Wood-Fired</strong>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--clr-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Authentic Oven</span>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <h2 style={{ fontFamily: 'var(--ff-heading)', fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.15 }}>
                  Where <em style={{ color: 'var(--clr-amber-400)' }}>Scotland</em> Meets Italy
                </h2>
                <p style={{ fontSize: '1.125rem', color: 'var(--clr-text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  Nestled in the heart of Inverness, our cafe brings together the warmth of Italian cooking with the rich traditions of Scottish hospitality.
                </p>
                <p style={{ fontSize: '1.125rem', color: 'var(--clr-text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                  Whether you&apos;re craving a classic Margherita, a hearty Carbonara, or our famous Scottish scampi and chips, we&apos;ve got something to make every visit special.
                </p>
                <div className={styles.features}>
                  {[
                    ['🍕', 'Hand-Stretched Dough'],
                    ['🌿', 'Fresh Ingredients'],
                    ['🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'Scottish Produce'],
                    ['👨‍🍳', 'Experienced Chefs']
                  ].map(([icon, text]) => (
                    <div key={text} className={styles.feature}>
                      <span>{icon}</span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ background: 'var(--clr-bg-primary)' }}>
          <div className="container">
            <div className="section-header reveal">
              <div className="section-tag">Popular Picks</div>
              <h2 className="section-title">What Our Customers Love</h2>
              <p className="section-subtitle">Here are some of our most-ordered dishes. Explore the full menu to find your new favourite.</p>
            </div>
            <div className={styles.featuredGrid}>
              {[
                { name: 'Margherita Pizza', desc: 'Tomato base, creamy mozzarella, fresh basil', price: '£13.95', img: '/images/pizza-hero.png' },
                { name: 'Carbonara', desc: 'Bacon, soft cheese & cream — our signature', price: '£11.95', img: '/images/pasta-hero.png' },
                { name: 'Cheese Burger Combo', desc: 'Juicy cheese burger with fries & drink', price: '£13.45', img: '/images/burger-hero.png' },
                { name: 'Fish & Chips', desc: 'Golden battered fish, chips & tartar sauce', price: 'From £8.45', img: '/images/fish-chips-hero.png' },
              ].map((item, i) => (
                <div key={item.name} className={`${styles.featuredCard} reveal`} style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className={styles.featuredImg}>
                    <Image src={item.img} alt={item.name} width={400} height={250} style={{ objectFit: 'cover', width: '100%', height: '220px' }} />
                  </div>
                  <div className={styles.featuredContent}>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                    <div className={styles.featuredFooter}>
                      <span className={styles.featuredPrice}>{item.price}</span>
                      <button type="button" className="btn btn-sm btn-primary" onClick={() => scrollToSection('menu')}>View Menu</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ background: 'var(--clr-bg-secondary)' }}>
          <div className="container">
            <div className="section-header reveal">
              <div className="section-tag">What People Say</div>
              <h2 className="section-title">Loved by Locals & Visitors Alike</h2>
            </div>
            <div className={styles.testimonialsGrid}>
              {[
                { text: "Absolutely fantastic pizza! The Nduja Meat Feast was bursting with flavour. Best pizzeria in Inverness, hands down.", name: 'Sarah M.', role: 'Local Regular', avatar: 'S' },
                { text: "The carbonara was authentic and creamy — reminded me of restaurants in Rome. We'll definitely be back!", name: 'James K.', role: 'Visitor from Edinburgh', avatar: 'J' },
                { text: "Great value! The burger combos are generous, and the scampi was perfectly cooked. Love the warm vibe.", name: 'Emma T.', role: 'Google Review', avatar: 'E' },
              ].map((t, i) => (
                <div key={t.name} className={`${styles.testimonialCard} reveal`} style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div style={{ position: 'absolute', top: '1rem', right: '1.5rem', fontSize: '4rem', fontFamily: 'var(--ff-heading)', color: 'var(--clr-amber-800)', opacity: 0.3, lineHeight: 1 }}>&quot;</div>
                  <div style={{ color: 'var(--clr-amber-400)', marginBottom: '1rem', fontSize: '1.125rem' }}>⭐⭐⭐⭐⭐</div>
                  <p style={{ color: 'var(--clr-text-secondary)', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '1.5rem' }}>&quot;{t.text}&quot;</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--gradient-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.125rem', color: 'var(--clr-bg-primary)' }}>{t.avatar}</div>
                    <div>
                      <strong>{t.name}</strong>
                      <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)' }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ background: 'var(--clr-bg-primary)' }}>
          <div className="container">
            <div className={styles.infoGrid}>
              {[
                { icon: '🚗', title: 'Takeaway & Delivery', desc: "Order your favourites for takeaway or delivery. Call us, WhatsApp, or order online!" },
                { icon: '👨‍👩‍👧‍👦', title: 'Family Friendly', desc: "Kid-friendly portions and a welcoming atmosphere — everyone is welcome at our table." },
                { icon: '🎉', title: 'Private Events', desc: "Celebrating something special? Ask about group bookings and private dining options." },
              ].map((c, i) => (
                <div key={c.title} className={`${styles.infoCard} reveal`} style={{ transitionDelay: `${i * 0.1}s` }}>
                  <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>{c.icon}</span>
                  <h3 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>{c.title}</h3>
                  <p style={{ color: 'var(--clr-text-secondary)', lineHeight: 1.7, fontSize: '0.875rem' }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
            <div className="reveal">
              <h2 style={{ fontFamily: 'var(--ff-heading)', fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>
                Ready to Taste the <em style={{ color: 'var(--clr-amber-400)' }}>Difference</em>?
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--clr-text-secondary)', marginBottom: '2rem', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
                Order online, book a table, or pop in and visit us. We can&apos;t wait to serve you!
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button type="button" className="btn btn-primary" onClick={() => scrollToSection('menu')}>🍕 Order Online</button>
                <button type="button" className="btn btn-outline" onClick={() => scrollToSection('reserve')}>📅 Book a Table</button>
              </div>
            </div>
          </div>
        </section>
      </section>

      <MenuSection />
      <ReserveSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
