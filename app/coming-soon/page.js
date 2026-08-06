'use client';

import Link from 'next/link';
import { useRestaurant } from '@/lib/RestaurantContext';
import { getWhatsAppLink } from '@/lib/whatsapp';
import styles from './coming-soon.module.css';

export default function ComingSoonPage() {
  const restaurant = useRestaurant();
  const message =
    restaurant.payments?.message ||
    'Currently we are accepting order via whatsapp or call only.';

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <div className={styles.badge}>Coming soon</div>
        <h1 className={styles.title}>Online card payments</h1>
        <p className={styles.lead}>{message}</p>
        <p className={styles.sub}>
          Browse the menu, build your order, then send it on WhatsApp or give us a call. Card checkout on the website will be available soon.
        </p>
        <div className={styles.actions}>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Order via WhatsApp
          </a>
          <a href={`tel:${restaurant.phone.e164}`} className="btn btn-outline">
            Call {restaurant.phone.display}
          </a>
          <Link href="/#menu" className="btn btn-outline">
            View Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
