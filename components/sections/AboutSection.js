'use client';

import Image from 'next/image';
import { useRestaurant } from '@/lib/RestaurantContext';

export default function AboutSection() {
  const restaurant = useRestaurant();
  const { about } = restaurant.content;
  const { images } = restaurant;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="site-section">
      <div className="section-padding" style={{ background: 'var(--clr-bg-primary)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">About Us</div>
            <h2 className="section-title">Our Story</h2>
            <p className="section-subtitle">{about.subtitle}</p>
          </div>

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
                <Image src={images.about} alt="Restaurant Interior" fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ position: 'relative', height: '200px', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <Image src={images.pizzaHero} alt="Wood-fired Pizza" fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'relative', height: '200px', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <Image src={images.pastaHero} alt="Fresh Pasta" fill style={{ objectFit: 'cover' }} />
                </div>
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
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>{value.icon}</span>
                <h4 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>{value.title}</h4>
                <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{value.desc}</p>
              </div>
            ))}
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
            <button type="button" className="btn btn-primary" onClick={() => scrollTo('reserve')}>Book a Table</button>
            <button type="button" className="btn btn-outline" onClick={() => scrollTo('menu')}>Explore Menu</button>
          </div>
        </div>
      </div>
    </section>
  );
}
