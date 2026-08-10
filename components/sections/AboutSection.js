'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '@/app/home.module.css';
import { useRestaurant } from '@/lib/RestaurantContext';
import { RESERVATIONS_ENABLED } from '@/lib/features';
import GoogleReviews from '@/components/GoogleReviews';

export default function AboutSection({ hideIntroHeader = false } = {}) {
  const restaurant = useRestaurant();
  const router = useRouter();
  const { about, homeAbout, featured, infoCards } = restaurant.content;
  const { images } = restaurant;

  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (id === 'menu') router.push('/menu/');
    else if (id === 'reserve') router.push(RESERVATIONS_ENABLED ? '/reserve/' : '/contact/');
    else if (id === 'contact') router.push('/contact/');
    else router.push(`/#${id}`);
  };

  return (
    <section id="about" className="site-section">
      <div className="section-padding" style={{ background: 'var(--clr-bg-primary)' }}>
        <div className="container">
          {!hideIntroHeader && (
            <div className="section-header">
              <div className="section-tag">About Us</div>
              <h2 className="section-title">Our Story</h2>
              <p className="section-subtitle">{about.subtitle}</p>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--ff-heading)', fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.2 }}>
                {about.headingBefore}<em style={{ color: 'var(--clr-amber-400)' }}>{about.headingEm}</em>{about.headingAfter}
              </h3>
              {about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  style={{
                    color: 'var(--clr-text-secondary)',
                    fontSize: '1.125rem',
                    lineHeight: 1.8,
                    marginBottom: i === about.paragraphs.length - 1 ? '2rem' : '1.5rem',
                  }}
                >
                  {p}
                </p>
              ))}

              <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid var(--clr-border)', paddingTop: '2rem' }}>
                {about.stats.map((s) => (
                  <div key={s.label}>
                    <span style={{ display: 'block', fontSize: '2rem', fontFamily: 'var(--ff-heading)', color: 'var(--clr-amber-400)', fontWeight: 700 }}>{s.value}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)' }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ position: 'relative', height: '400px', borderRadius: 'var(--radius-2xl)', overflow: 'hidden' }}>
                <Image src={images.about} alt={`${restaurant.name} interior on Academy Street, Inverness`} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ position: 'relative', height: '200px', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <Image src={images.pizzaHero} alt={`Wood-fired pizza at ${restaurant.name}`} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'relative', height: '200px', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <Image src={images.pastaHero} alt={`Fresh pasta at ${restaurant.name}`} fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Teaser / Scotland meets Italy (was under home) */}
      <div className={styles.about}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutImage}>
              <Image src={images.about} alt={`${restaurant.name} dining room, Academy Street Inverness`} width={640} height={500} style={{ objectFit: 'cover', width: '100%', height: '500px', borderRadius: 'var(--radius-2xl)' }} />
              <div className={styles.aboutBadge}>
                <div>
                  <strong>{homeAbout.badgeTitle}</strong>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--clr-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{homeAbout.badgeSub}</span>
                </div>
              </div>
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--ff-heading)', fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.15 }}>
                {homeAbout.titleBefore}
                <em style={{ color: 'var(--clr-amber-400)' }}>{homeAbout.titleEm}</em>
                {homeAbout.titleAfter}
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--clr-text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                {homeAbout.paragraphs[0]}
              </p>
              <p style={{ fontSize: '1.125rem', color: 'var(--clr-text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                {homeAbout.paragraphs[1]}
              </p>
              <div className={styles.features}>
                {homeAbout.features.map(([, text]) => (
                  <div key={text} className={styles.feature}>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-padding" style={{ background: 'var(--clr-bg-secondary)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '3rem' }}>
            <h3 className="section-title">Our Core Values</h3>
            <p className="section-subtitle">What drives us every single day.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {about.values.map((value) => (
              <div key={value.title} style={{ background: 'var(--gradient-card)', padding: '2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--clr-border)', textAlign: 'center' }}>
                <h4 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>{value.title}</h4>
                <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured dishes (was under home) */}
      <div className="section-padding" style={{ background: 'var(--clr-bg-primary)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Popular Picks</div>
            <h2 className="section-title">What Our Customers Love</h2>
            <p className="section-subtitle">Here are some of our most-ordered dishes. Explore the full menu to find your new favourite.</p>
          </div>
          <div className={styles.featuredGrid}>
            {featured.map((item) => (
              <div key={item.name} className={styles.featuredCard}>
                <div className={styles.featuredImg}>
                  <Image src={images[item.imgKey]} alt={`${item.name} at ${restaurant.name}`} width={400} height={250} style={{ objectFit: 'cover', width: '100%', height: '220px' }} />
                </div>
                <div className={styles.featuredContent}>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  <div className={styles.featuredFooter}>
                    <span className={styles.featuredPrice}>{item.price}</span>
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => goTo('menu')}>View Menu</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link href="/menu/pizza/" style={{ color: 'var(--clr-amber-400)' }}>View our pizza menu</Link>
            {' · '}
            <Link href="/menu/pasta/" style={{ color: 'var(--clr-amber-400)' }}>Fresh pasta</Link>
            {' · '}
            <Link href="/takeaway/" style={{ color: 'var(--clr-amber-400)' }}>Takeaway in Inverness</Link>
          </p>
        </div>
      </div>

      {/* Live Google reviews (5★ first → rating → date). See components/GoogleReviews.js */}
      <GoogleReviews />

      {/* Info cards (was under home) */}
      <div className="section-padding" style={{ background: 'var(--clr-bg-primary)' }}>
        <div className="container">
          <div className={styles.infoGrid}>
            {infoCards.map((c) => (
              <div key={c.title} className={styles.infoCard}>
                <h3 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>{c.title}</h3>
                <p style={{ color: 'var(--clr-text-secondary)', lineHeight: 1.7, fontSize: '0.875rem' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA (was under home) */}
      <div className={styles.cta}>
        <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
          <h2 style={{ fontFamily: 'var(--ff-heading)', fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>
            Ready to Taste the <em style={{ color: 'var(--clr-amber-400)' }}>Difference</em>?
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--clr-text-secondary)', marginBottom: '2rem', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
            Order online, book a table, or pop in and visit us. We can&apos;t wait to serve you!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-primary" onClick={() => goTo('menu')}>Order Online</button>
            {RESERVATIONS_ENABLED ? (
              <button type="button" className="btn btn-outline" onClick={() => goTo('reserve')}>Book a Table</button>
            ) : (
              <button type="button" className="btn btn-outline" onClick={() => goTo('contact')}>Contact Us</button>
            )}
          </div>
        </div>
      </div>

      <div className="section-padding" style={{ background: 'var(--clr-bg-primary)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h3 style={{ fontFamily: 'var(--ff-heading)', fontSize: '2.5rem', marginBottom: '1rem' }}>
            {about.ctaTitleBefore}<em style={{ color: 'var(--clr-amber-400)' }}>{about.ctaTitleEm}</em>
          </h3>
          <p style={{ color: 'var(--clr-text-secondary)', fontSize: '1.125rem', marginBottom: '2rem' }}>
            {about.ctaBody}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {RESERVATIONS_ENABLED ? (
              <button type="button" className="btn btn-primary" onClick={() => goTo('reserve')}>Book a Table</button>
            ) : (
              <button type="button" className="btn btn-primary" onClick={() => goTo('contact')}>Contact Us</button>
            )}
            <button type="button" className="btn btn-outline" onClick={() => goTo('menu')}>Explore Menu</button>
          </div>
        </div>
      </div>
    </section>
  );
}
