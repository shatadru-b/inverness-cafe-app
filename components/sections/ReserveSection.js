'use client';

import { useState } from 'react';
import styles from './reserve.module.css';

export default function ReserveSection() {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', date: '', time: '', partySize: '2', specialRequests: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const timeSlots = [];
  for (let h = 11; h <= 22; h++) {
    timeSlots.push(`${h}:00`);
    if (h < 22) timeSlots.push(`${h}:30`);
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    if (!formData.date) newErrors.date = 'Required';
    if (!formData.time) newErrors.time = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log('Reservation:', formData);
    setSubmitted(true);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="reserve" className="site-section section-padding" style={{ background: 'var(--clr-bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Reservations</div>
          <h2 className="section-title">Book a Table</h2>
          <p className="section-subtitle">Reserve your spot for a wonderful dining experience</p>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>📅</div>
            <h3 style={{ fontFamily: 'var(--ff-heading)', fontSize: '2rem', marginBottom: '1rem' }}>
              Thank You, {formData.name}!
            </h3>
            <div className={styles.confirmCard}>
              <div className={styles.confirmRow}><span>📅 Date</span><strong>{formData.date}</strong></div>
              <div className={styles.confirmRow}><span>🕐 Time</span><strong>{formData.time}</strong></div>
              <div className={styles.confirmRow}><span>👥 Party Size</span><strong>{formData.partySize} guests</strong></div>
              <div className={styles.confirmRow}><span>📞 Phone</span><strong>{formData.phone}</strong></div>
            </div>
            <p style={{ color: 'var(--clr-text-muted)', marginTop: '1.5rem', marginBottom: '2rem' }}>
              We&apos;ll confirm your reservation shortly. If you need to make changes, please call us.
            </p>
            <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Make Another Reservation</button>
          </div>
        ) : (
          <div className={styles.reserveGrid}>
            <form onSubmit={handleSubmit} className={styles.reserveForm}>
              <h3 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Reservation Details</h3>

              <div className={styles.formRow}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Your Name *</label>
                  <input type="text" name="name" className="form-input" placeholder="John Smith" value={formData.name} onChange={handleChange} />
                  {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Phone *</label>
                  <input type="tel" name="phone" className="form-input" placeholder="+44 7700 900000" value={formData.phone} onChange={handleChange} />
                  {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email (optional)</label>
                <input type="email" name="email" className="form-input" placeholder="john@example.com" value={formData.email} onChange={handleChange} />
              </div>

              <div className={styles.formRow}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Date *</label>
                  <input type="date" name="date" className="form-input" min={today} value={formData.date} onChange={handleChange} />
                  {errors.date && <span className={styles.error}>{errors.date}</span>}
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Time *</label>
                  <select name="time" className="form-input" value={formData.time} onChange={handleChange}>
                    <option value="">Select a time</option>
                    {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.time && <span className={styles.error}>{errors.time}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Party Size</label>
                <select name="partySize" className="form-input" value={formData.partySize} onChange={handleChange}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                  ))}
                  <option value="10+">10+ guests (call us)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Special Requests</label>
                <textarea name="specialRequests" className="form-input" placeholder="High chair needed, birthday celebration, dietary requirements..." value={formData.specialRequests} onChange={handleChange} />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
                📅 Confirm Reservation
              </button>
            </form>

            <div className={styles.reserveInfo}>
              <div className={styles.infoCard}>
                <span style={{ fontSize: '2rem', marginBottom: '0.75rem', display: 'block' }}>🕐</span>
                <h3>Opening Hours</h3>
                <p>Mon – Thu: 11:00 – 22:00</p>
                <p>Fri – Sat: 11:00 – 23:00</p>
                <p>Sunday: 12:00 – 21:00</p>
              </div>
              <div className={styles.infoCard}>
                <span style={{ fontSize: '2rem', marginBottom: '0.75rem', display: 'block' }}>📞</span>
                <h3>Prefer to Call?</h3>
                <p>Ring us directly on</p>
                <a href="tel:+447554284033" style={{ color: 'var(--clr-amber-400)', fontWeight: 600, fontSize: '1.125rem' }}>+44 7554 284 033</a>
              </div>
              <div className={styles.infoCard}>
                <span style={{ fontSize: '2rem', marginBottom: '0.75rem', display: 'block' }}>👨‍👩‍👧‍👦</span>
                <h3>Large Groups?</h3>
                <p>For parties of 10+, please call us to discuss arrangements and special menus.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
