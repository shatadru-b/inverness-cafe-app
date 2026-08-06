'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRestaurant } from '@/lib/RestaurantContext';
import styles from './admin.module.css';

export default function AdminLoginPage() {
  const restaurant = useRestaurant();
  const { demoEmail, demoPassword } = restaurant.admin;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple mock authentication for now
    if (email === demoEmail && password === demoPassword) {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={styles.loginCard}>
      <div className={styles.loginHeader}>
        <div className="nav-brand-icon" style={{ margin: '0 auto 1rem', width: 72, height: 72 }}>
          <img src="/icon.png" alt={restaurant.name} />
        </div>
        <h1 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.75rem', marginBottom: '0.5rem' }}>Admin Login</h1>
        <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.875rem' }}>Enter your credentials to access the dashboard</p>
      </div>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-input"
            placeholder={demoEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div style={{ color: 'var(--clr-red-500)', fontSize: '0.875rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>Login to Dashboard</button>
      </form>

      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>
        Demo Credentials: {demoEmail} / {demoPassword}
      </div>
    </div>
  );
}
