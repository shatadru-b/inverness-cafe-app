'use client';

import { useState } from 'react';
import { useRestaurant } from '@/lib/RestaurantContext';
import styles from './contact.module.css';

export default function ContactSection() {
  const restaurant = useRestaurant();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.message.trim()) newErrors.message = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="site-section">
      <div className="section-padding" style={{ background: 'var(--clr-bg-primary)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Contact</div>
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-subtitle">We&apos;d love to hear from you</p>
          </div>

          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h3 style={{ fontFamily: 'var(--ff-heading)', fontSize: '2rem', marginBottom: '1.5rem' }}>Contact Information</h3>
              <p style={{ color: 'var(--clr-text-secondary)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
                Whether you have a question about our menu, want to book a large party, or just want to say hello, we&apos;re here for you.
              </p>

              <div className={styles.infoBlocks}>
                <div className={styles.infoBlock}>
                  <div className={styles.infoIcon}>📍</div>
                  <div>
                    <h4 className={styles.infoTitle}>Location</h4>
                    <p className={styles.infoText}>
                      {restaurant.address.lines.map((line, i) => (
                        <span key={line}>
                          {line}
                          {i < restaurant.address.lines.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                    <p className={styles.infoText} style={{ marginTop: '0.5rem' }}>
                      <a
                        href={restaurant.maps.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--clr-amber-400)' }}
                      >
                        Get directions →
                      </a>
                    </p>
                  </div>
                </div>

                <div className={styles.infoBlock}>
                  <div className={styles.infoIcon}>📞</div>
                  <div>
                    <h4 className={styles.infoTitle}>Phone & WhatsApp</h4>
                    <p className={styles.infoText}>
                      <a href={`tel:${restaurant.phone.e164}`} style={{ color: 'var(--clr-amber-400)' }}>{restaurant.phone.display}</a>
                    </p>
                  </div>
                </div>

                <div className={styles.infoBlock}>
                  <div className={styles.infoIcon}>✉️</div>
                  <div>
                    <h4 className={styles.infoTitle}>Email</h4>
                    <p className={styles.infoText}>
                      <a href={`mailto:${restaurant.email}`} style={{ color: 'var(--clr-amber-400)' }}>{restaurant.email}</a>
                    </p>
                  </div>
                </div>

                <div className={styles.infoBlock}>
                  <div className={styles.infoIcon}>🕐</div>
                  <div>
                    <h4 className={styles.infoTitle}>Hours</h4>
                    <p className={styles.infoText}>
                      {restaurant.hours.map((h, i) => (
                        <span key={h.label}>
                          {h.shortLabel}: {h.opens} - {h.closes}
                          {i < restaurant.hours.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formContainer}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                  <h3 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.5rem', marginBottom: '1rem' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--clr-text-secondary)', marginBottom: '2rem' }}>
                    Thanks for reaching out, {formData.name}. We&apos;ll get back to you as soon as possible.
                  </p>
                  <button className="btn btn-outline" onClick={() => setSubmitted(false)}>Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Send a Message</h3>

                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} placeholder="Your name" />
                    {errors.name && <span className={styles.error}>{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} placeholder="your@email.com" />
                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input type="text" name="subject" className="form-input" value={formData.subject} onChange={handleChange} placeholder="What is this regarding?" />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea name="message" className="form-input" value={formData.message} onChange={handleChange} placeholder="How can we help you?" style={{ minHeight: '150px' }} />
                    {errors.message && <span className={styles.error}>{errors.message}</span>}
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: '400px', background: 'var(--clr-bg-secondary)', position: 'relative' }}>
        <iframe
          src={restaurant.maps.embed}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.35) contrast(1.1) opacity(0.95)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${restaurant.name} — ${restaurant.address.street}, ${restaurant.address.locality}`}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', background: 'linear-gradient(to bottom, var(--clr-bg-primary) 0%, transparent 15%, transparent 85%, var(--clr-bg-primary) 100%)' }} />
      </div>
    </section>
  );
}
