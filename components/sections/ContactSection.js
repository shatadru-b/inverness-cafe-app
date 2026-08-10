'use client';

import { useState } from 'react';
import { useRestaurant } from '@/lib/RestaurantContext';
import styles from './contact.module.css';

export default function ContactSection({ hideHeader = false } = {}) {
  const restaurant = useRestaurant();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', _gotcha: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    setSubmitError('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Honeypot — bots only
    if (formData._gotcha) {
      setSubmitted(true);
      return;
    }

    setSending(true);
    setSubmitError('');

    const to = restaurant.email; // invernesscafe@dinego.co.uk
    const subject = formData.subject.trim()
      ? `Contact: ${formData.subject.trim()}`
      : `Contact form — ${formData.name.trim()}`;

    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim() || 'Website enquiry',
            message: formData.message.trim(),
            _replyto: formData.email.trim(),
            _subject: subject,
            _template: 'table',
            _captcha: 'false',
          }),
        }
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === 'false' || data.success === false) {
        const msg = data.message || data.error || 'Failed to send message';
        // First-time FormSubmit activation is emailed to the restaurant inbox
        if (/activat/i.test(msg)) {
          throw new Error(
            'Please check the restaurant inbox once and confirm FormSubmit activation, then try again.'
          );
        }
        throw new Error(msg);
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '', _gotcha: '' });
    } catch (err) {
      setSubmitError(
        err?.message ||
          `Could not send message. Email us directly at ${restaurant.email}.`
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="site-section">
      <div className="section-padding" style={{ background: 'var(--clr-bg-primary)' }}>
        <div className="container">
          {!hideHeader && (
            <div className="section-header">
              <div className="section-tag">Contact</div>
              <h2 className="section-title">Get in Touch</h2>
              <p className="section-subtitle">We&apos;d love to hear from you</p>
            </div>
          )}

          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h3 style={{ fontFamily: 'var(--ff-heading)', fontSize: '2rem', marginBottom: '1.5rem' }}>Contact Information</h3>
              <p style={{ color: 'var(--clr-text-secondary)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
                Visit us on Academy Street in Inverness, or get in touch if you have a question about our Italian menu, want to book a large party, or just want to say hello.
              </p>

              <div className={styles.infoBlocks}>
                <div className={styles.infoBlock}>
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
                  <div>
                    <h4 className={styles.infoTitle}>Phone & WhatsApp</h4>
                    <p className={styles.infoText}>
                      <a href={`tel:${restaurant.phone.e164}`} style={{ color: 'var(--clr-amber-400)' }}>{restaurant.phone.display}</a>
                    </p>
                  </div>
                </div>

                <div className={styles.infoBlock}>
                  <div>
                    <h4 className={styles.infoTitle}>Email</h4>
                    <p className={styles.infoText}>
                      <a href={`mailto:${restaurant.email}`} style={{ color: 'var(--clr-amber-400)' }}>{restaurant.email}</a>
                    </p>
                  </div>
                </div>

                <div className={styles.infoBlock}>
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

                  <h3 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.5rem', marginBottom: '1rem' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--clr-text-secondary)', marginBottom: '2rem' }}>
                    Thanks for reaching out, {formData.name}. We&apos;ll get back to you as soon as possible.
                  </p>
                  <button className="btn btn-outline" onClick={() => setSubmitted(false)}>Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Send a Message</h3>

                  {/* Honeypot — hidden from real users */}
                  <input
                    type="text"
                    name="_gotcha"
                    value={formData._gotcha}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', height: 0, width: 0, opacity: 0 }}
                  />

                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} placeholder="Your name" disabled={sending} />
                    {errors.name && <span className={styles.error}>{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} placeholder="your@email.com" disabled={sending} />
                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input type="text" name="subject" className="form-input" value={formData.subject} onChange={handleChange} placeholder="What is this regarding?" disabled={sending} />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea name="message" className="form-input" value={formData.message} onChange={handleChange} placeholder="How can we help you?" style={{ minHeight: '150px' }} disabled={sending} />
                    {errors.message && <span className={styles.error}>{errors.message}</span>}
                  </div>

                  {submitError && (
                    <p className={styles.error} style={{ marginBottom: '1rem' }} role="alert">
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '1rem' }}
                    disabled={sending}
                  >
                    {sending ? 'Sending…' : 'Send Message'}
                  </button>
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
