'use client';

import { useEffect, useRef, useState } from 'react';
import { getSquarePublicConfig } from '@/lib/squareConfig';
import { useRestaurant } from '@/lib/RestaurantContext';
import styles from './SquareCardPayment.module.css';

function loadSquareSdk(sdkUrl) {
  if (typeof window === 'undefined') return Promise.reject(new Error('No window'));
  if (window.Square) return Promise.resolve(window.Square);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${sdkUrl}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(window.Square));
      existing.addEventListener('error', () => reject(new Error('Failed to load Square SDK')));
      return;
    }
    const script = document.createElement('script');
    script.src = sdkUrl;
    script.async = true;
    script.onload = () => resolve(window.Square);
    script.onerror = () => reject(new Error('Failed to load Square SDK'));
    document.body.appendChild(script);
  });
}

/**
 * On-site card payment (Square Web Payments SDK).
 * Customer never leaves this site.
 */
export default function SquareCardPayment({
  amount,
  orderPayload,
  disabled,
  onSuccess,
  onError,
}) {
  const restaurant = useRestaurant();
  const paymentsEnabled = Boolean(restaurant.payments?.enabled);
  const config = getSquarePublicConfig();
  const cardRef = useRef(null);
  const cardInstance = useRef(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [initError, setInitError] = useState('');

  useEffect(() => {
    if (!paymentsEnabled) return undefined;
    let cancelled = false;

    async function init() {
      if (!config.isConfigured) {
        setInitError(
          'Square is not configured yet. Add NEXT_PUBLIC_SQUARE_APPLICATION_ID and NEXT_PUBLIC_SQUARE_LOCATION_ID, then rebuild.'
        );
        return;
      }
      try {
        setStatus('Loading secure payment form…');
        const Square = await loadSquareSdk(config.sdkUrl);
        if (cancelled) return;
        if (!Square) throw new Error('Square SDK unavailable');

        const payments = Square.payments(config.applicationId, config.locationId);
        const card = await payments.card({
          style: {
            '.input-container': {
              borderColor: '#44403c',
              borderRadius: '12px',
            },
            '.input-container.is-focus': {
              borderColor: '#f59e0b',
            },
            input: {
              color: '#fafaf9',
              backgroundColor: '#1c1917',
              fontSize: '16px',
            },
            'input::placeholder': {
              color: '#a8a29e',
            },
            '.message-text': {
              color: '#fca5a5',
            },
          },
        });
        await card.attach(cardRef.current);
        cardInstance.current = card;
        if (!cancelled) {
          setReady(true);
          setStatus('');
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setInitError(err.message || 'Could not start card form');
          setStatus('');
        }
      }
    }

    init();
    return () => {
      cancelled = true;
      try {
        cardInstance.current?.destroy?.();
      } catch (_) {
        /* ignore */
      }
      cardInstance.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.applicationId, config.locationId, config.sdkUrl]);

  const handlePay = async () => {
    if (!paymentsEnabled || !cardInstance.current || busy || disabled) return;
    setBusy(true);
    setStatus('Processing payment…');
    onError?.('');

    try {
      const tokenResult = await cardInstance.current.tokenize();
      if (tokenResult.status !== 'OK') {
        const msg =
          tokenResult.errors?.[0]?.message ||
          'Card details could not be verified. Please check and try again.';
        throw new Error(msg);
      }

      const res = await fetch(config.paymentApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceId: tokenResult.token,
          amount,
          currency: 'GBP',
          order: orderPayload,
          idempotencyKey: crypto.randomUUID(),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Payment failed');
      }

      setStatus('Payment successful!');
      onSuccess?.(data);
    } catch (err) {
      console.error(err);
      const message = err.message || 'Payment failed';
      setStatus('');
      onError?.(message);
    } finally {
      setBusy(false);
    }
  };

  // Online payments disabled (coming soon)
  if (!paymentsEnabled) return null;

  if (!config.isConfigured || initError) {
    return (
      <div className={styles.box}>
        <h3 className={styles.title}>Pay by card</h3>
        <p className={styles.hint}>
          {initError ||
            'Card payments will appear here once Square keys are connected (see SQUARE_SETUP.md).'}
        </p>
        <p className={styles.sandboxNote}>
          You can still place orders via WhatsApp below while card payments are being set up.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.box}>
      <h3 className={styles.title}>Pay by card</h3>
      <p className={styles.hint}>
        Secure payment powered by Square. You stay on this website — no redirect to Square Online.
      </p>
      {config.environment !== 'production' && (
        <p className={styles.sandboxNote}>
          Sandbox mode — use test card <strong>4111 1111 1111 1111</strong>, any future expiry, any CVV.
        </p>
      )}
      <div className={styles.cardMount} ref={cardRef} id="square-card-container" />
      {status && <p className={styles.status}>{status}</p>}
      <button
        type="button"
        className={`btn btn-primary ${styles.payBtn}`}
        onClick={handlePay}
        disabled={!ready || busy || disabled || amount <= 0}
      >
        {busy ? 'Processing…' : `Pay £${Number(amount).toFixed(2)} securely`}
      </button>
    </div>
  );
}
