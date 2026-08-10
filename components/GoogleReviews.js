'use client';

import { useEffect, useState } from 'react';
import { useRestaurant } from '@/lib/RestaurantContext';
import {
  fallbackFromConfig,
  prepareReviewsForDisplay,
} from '@/lib/googleReviews';
import styles from '@/app/home.module.css';

/**
 * Live Google reviews — fetches on mount, re-sorts:
 * 5★ first (newest), then by rating, then by date.
 * Falls back to config snapshots if the API is unavailable.
 */
export default function GoogleReviews() {
  const restaurant = useRestaurant();
  const fallback = fallbackFromConfig(restaurant.content?.testimonials || []);
  const [reviews, setReviews] = useState(fallback);
  const [meta, setMeta] = useState({ rating: null, total: null, source: 'fallback' });
  const [status, setStatus] = useState('loading'); // loading | live | fallback

  useEffect(() => {
    let cancelled = false;
    const apiUrl =
      restaurant.google?.reviewsApiUrl ||
      process.env.NEXT_PUBLIC_REVIEWS_API_URL ||
      '/api/googleReviews';

    const placeId = restaurant.google?.placeId;
    const url = placeId
      ? `${apiUrl}${apiUrl.includes('?') ? '&' : '?'}placeId=${encodeURIComponent(placeId)}`
      : apiUrl;

    async function load() {
      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: { Accept: 'application/json' },
          // Prefer network so reviews stay fresh; browser may still use short HTTP cache
          cache: 'no-store',
        });
        if (!res.ok) throw new Error(`reviews ${res.status}`);
        const data = await res.json();
        if (cancelled) return;

        const list = prepareReviewsForDisplay(data.reviews || [], data.limit || 6);
        if (list.length) {
          setReviews(list);
          setMeta({
            rating: data.rating ?? null,
            total: data.userRatingsTotal ?? data.total ?? null,
            source: data.source || 'live',
          });
          setStatus('live');
        } else {
          setReviews(fallback);
          setStatus('fallback');
        }
      } catch {
        if (cancelled) return;
        setReviews(fallback);
        setStatus('fallback');
      }
    }

    load();
    // Refresh periodically while the page is open (15 min)
    const timer = setInterval(load, 15 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- load once per placeId
  }, [restaurant.google?.placeId, restaurant.google?.reviewsApiUrl]);

  const subtitleBits = [];
  if (meta.rating != null) subtitleBits.push(`${Number(meta.rating).toFixed(1)}★ on Google`);
  if (meta.total != null) subtitleBits.push(`${meta.total} review${meta.total === 1 ? '' : 's'}`);
  subtitleBits.push(`${restaurant.name} on Academy Street`);
  if (status === 'live') subtitleBits.push('updated live');

  return (
    <div className="section-padding" style={{ background: 'var(--clr-bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Google Reviews</div>
          <h2 className="section-title">Loved by Locals & Visitors Alike</h2>
          <p className="section-subtitle">{subtitleBits.join(' · ')}</p>
        </div>

        {status === 'loading' && reviews.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--clr-text-muted)' }}>Loading reviews…</p>
        ) : (
          <div className={styles.testimonialsGrid}>
            {reviews.map((t) => (
              <div key={`${t.name}-${t.time}-${t.text.slice(0, 24)}`} className={styles.testimonialCard}>
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1.5rem',
                    fontSize: '4rem',
                    fontFamily: 'var(--ff-heading)',
                    color: 'var(--clr-amber-800)',
                    opacity: 0.3,
                    lineHeight: 1,
                  }}
                >
                  &quot;
                </div>
                <p
                  style={{
                    color: 'var(--clr-text-secondary)',
                    lineHeight: 1.8,
                    fontStyle: 'italic',
                    marginBottom: '1.5rem',
                  }}
                >
                  &quot;{t.text}&quot;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: 'var(--gradient-amber)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1.125rem',
                      color: 'var(--clr-bg-primary)',
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <strong>{t.name}</strong>
                    <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {restaurant.maps?.reviewsUrl ? (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a
              href={restaurant.maps.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--clr-amber-400)' }}
            >
              Read more reviews on Google
            </a>
          </p>
        ) : null}
      </div>
    </div>
  );
}
