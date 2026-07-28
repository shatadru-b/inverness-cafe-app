'use client';

import Image from 'next/image';

export default function AboutSection() {
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
            <p className="section-subtitle">Bringing a slice of Italy to the Scottish Highlands</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--ff-heading)', fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.2 }}>
                A Passion for <em style={{ color: 'var(--clr-amber-400)' }}>Great Food</em> and Hospitality
              </h3>
              <p style={{ color: 'var(--clr-text-secondary)', fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                At Inverness Cafe & Pizzeria, we believe that great food brings people together. Nestled in the heart of the Scottish Highlands, our restaurant is a labour of love, born from a desire to share authentic Italian recipes with our local community.
              </p>
              <p style={{ color: 'var(--clr-text-secondary)', fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Our journey began with a simple idea: hand-stretched pizza dough, baked in a traditional wood-fired oven, using the finest San Marzano tomatoes and creamy mozzarella. Over time, we expanded our menu to include fresh homemade pasta, hearty Scottish classics, and gourmet burgers, ensuring there&apos;s something to delight every palate.
              </p>
              <p style={{ color: 'var(--clr-text-secondary)', fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                We pride ourselves on sourcing the freshest local Scottish produce while importing authentic Italian ingredients, creating a unique fusion of flavours that you won&apos;t find anywhere else in Inverness.
              </p>

              <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid var(--clr-border)', paddingTop: '2rem' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '2rem', fontFamily: 'var(--ff-heading)', color: 'var(--clr-amber-400)', fontWeight: 700 }}>10+</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)' }}>Years Experience</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '2rem', fontFamily: 'var(--ff-heading)', color: 'var(--clr-amber-400)', fontWeight: 700 }}>100%</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)' }}>Fresh Ingredients</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ position: 'relative', height: '400px', borderRadius: 'var(--radius-2xl)', overflow: 'hidden' }}>
                <Image src="/images/about-interior.png" alt="Restaurant Interior" fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ position: 'relative', height: '200px', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <Image src="/images/pizza-hero.png" alt="Wood-fired Pizza" fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'relative', height: '200px', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <Image src="/images/pasta-hero.png" alt="Fresh Pasta" fill style={{ objectFit: 'cover' }} />
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
            {[
              { icon: '🌱', title: 'Quality Ingredients', desc: 'We never compromise on the quality of our ingredients, sourcing locally whenever possible and importing the best from Italy.' },
              { icon: '🔥', title: 'Authentic Methods', desc: 'From our wood-fired oven to our hand-rolled pasta, we stick to traditional methods that guarantee superior taste.' },
              { icon: '🤝', title: 'Warm Hospitality', desc: 'Every guest is treated like family. We want you to feel at home from the moment you walk through our doors.' },
              { icon: '🌍', title: 'Community Focus', desc: 'We are proud to be part of the Inverness community, supporting local suppliers and contributing to the local economy.' }
            ].map((value) => (
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
            Come Experience It <em style={{ color: 'var(--clr-amber-400)' }}>Yourself</em>
          </h3>
          <p style={{ color: 'var(--clr-text-secondary)', fontSize: '1.125rem', marginBottom: '2rem' }}>
            The best way to understand our story is to taste our food. Whether you&apos;re a local or just visiting the Highlands, we&apos;d love to welcome you.
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
