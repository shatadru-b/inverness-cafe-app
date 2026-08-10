/**
 * Square payment Cloud Function
 * Client tokenizes card on-site; this function charges it securely.
 *
 * Configure via functions/.env (never commit):
 *   SQUARE_ACCESS_TOKEN=...
 *   SQUARE_LOCATION_ID=...
 *   SQUARE_ENVIRONMENT=sandbox|production
 */

const { onRequest } = require('firebase-functions/v2/https');
const { setGlobalOptions } = require('firebase-functions/v2');
const { defineString } = require('firebase-functions/params');
const { randomUUID } = require('crypto');
const { SquareClient, SquareEnvironment } = require('square');

setGlobalOptions({ region: 'europe-west2', maxInstances: 10 });

// Loaded from functions/.env on deploy (defineString — no Secret Manager required)
const squareAccessToken = defineString('SQUARE_ACCESS_TOKEN', { default: '' });
const squareLocationId = defineString('SQUARE_LOCATION_ID', { default: '' });
const squareEnvironment = defineString('SQUARE_ENVIRONMENT', { default: 'sandbox' });

function cors(res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
}

function formatOrderNote(order) {
  if (!order) return 'Inverness Cafe order';
  const lines = [];
  lines.push(`Type: ${order.orderType || 'collection'}`);
  if (order.customer?.name) lines.push(`Customer: ${order.customer.name}`);
  if (order.customer?.phone) lines.push(`Phone: ${order.customer.phone}`);
  if (order.customer?.address) lines.push(`Address: ${order.customer.address}`);
  if (order.items?.length) {
    lines.push('Items:');
    order.items.forEach((item, i) => {
      let line = `${i + 1}. ${item.name} x${item.quantity || 1}`;
      if (item.pastaTypeName) line += ` (${item.pastaTypeName})`;
      if (item.toppings?.length) {
        line += ` + ${item.toppings.map((t) => t.name || t).join(', ')}`;
      }
      line += ` £${Number(item.price || 0).toFixed(2)}`;
      lines.push(line);
    });
  }
  if (order.customer?.notes) lines.push(`Notes: ${order.customer.notes}`);
  return lines.join('\n').slice(0, 500);
}

exports.createPayment = onRequest(
  {
    cors: true,
    invoker: 'public',
  },
  async (req, res) => {
    cors(res);
    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    // Card checkout is disabled until online payments go live
    if (process.env.PAYMENTS_ENABLED !== 'true') {
      res.status(503).json({
        success: false,
        error:
          'Currently we are accepting order via whatsapp or call only. Online card payment is coming soon.',
      });
      return;
    }

    try {
      const { sourceId, amount, currency = 'GBP', order, idempotencyKey } = req.body || {};

      if (!sourceId || typeof sourceId !== 'string') {
        res.status(400).json({ error: 'Missing card token (sourceId)' });
        return;
      }

      const amountPence = Math.round(Number(amount) * 100);
      if (!Number.isFinite(amountPence) || amountPence < 1) {
        res.status(400).json({ error: 'Invalid amount' });
        return;
      }
      if (amountPence > 500000) {
        res.status(400).json({ error: 'Amount too large' });
        return;
      }

      const accessToken =
        squareAccessToken.value() || process.env.SQUARE_ACCESS_TOKEN || '';
      if (!accessToken) {
        res.status(500).json({
          error: 'Square is not configured. Set SQUARE_ACCESS_TOKEN in functions/.env',
        });
        return;
      }

      const locationId =
        squareLocationId.value() || process.env.SQUARE_LOCATION_ID || '';
      const envName = (
        squareEnvironment.value() ||
        process.env.SQUARE_ENVIRONMENT ||
        'sandbox'
      ).toLowerCase();

      const client = new SquareClient({
        token: accessToken,
        environment:
          envName === 'production'
            ? SquareEnvironment.Production
            : SquareEnvironment.Sandbox,
      });

      const paymentBody = {
        sourceId,
        idempotencyKey: idempotencyKey || randomUUID(),
        amountMoney: {
          amount: BigInt(amountPence),
          currency: currency.toUpperCase(),
        },
        autocomplete: true,
        note: formatOrderNote(order),
      };

      if (locationId) paymentBody.locationId = locationId;
      if (order?.customer?.phone) {
        paymentBody.referenceId = String(order.customer.phone).slice(0, 40);
      }

      const result = await client.payments.create(paymentBody);
      const payment = result.payment;

      res.status(200).json({
        success: true,
        paymentId: payment?.id,
        status: payment?.status,
        receiptUrl: payment?.receiptUrl || null,
        amount: amountPence / 100,
        currency: currency.toUpperCase(),
      });
    } catch (err) {
      console.error('Square payment error:', err);
      const message =
        err?.errors?.[0]?.detail ||
        err?.body?.errors?.[0]?.detail ||
        err?.message ||
        'Payment failed';
      res.status(400).json({
        success: false,
        error: message,
      });
    }
  }
);

exports.paymentConfig = onRequest(
  {
    cors: true,
    invoker: 'public',
  },
  async (req, res) => {
    cors(res);
    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }
    res.status(200).json({
      ok: true,
      environment: squareEnvironment.value() || process.env.SQUARE_ENVIRONMENT || 'sandbox',
      locationConfigured: Boolean(
        squareLocationId.value() || process.env.SQUARE_LOCATION_ID
      ),
      currency: 'GBP',
    });
  }
);

// ---------------------------------------------------------------------------
// Google reviews (live) — Places Details API
// Configure in functions/.env (never commit):
//   GOOGLE_PLACES_API_KEY=...
//   GOOGLE_PLACE_ID=ChIJX6sDqiVxj0gR9MQnrSXXgrk   (optional override)
// ---------------------------------------------------------------------------

const googlePlacesApiKey = defineString('GOOGLE_PLACES_API_KEY', { default: '' });
const googlePlaceId = defineString('GOOGLE_PLACE_ID', {
  default: 'ChIJX6sDqiVxj0gR9MQnrSXXgrk',
});

/** Short in-memory cache so we don't burn Places quota on every page view */
const reviewsCache = {
  key: '',
  expires: 0,
  payload: null,
};
const REVIEWS_CACHE_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Sort: 5★ first (newest among them), then by rating desc, then date desc.
 */
function sortReviewsFiveStarFirst(reviews) {
  const withText = (reviews || []).filter((r) => (r.text || '').trim());
  const byDateDesc = (a, b) => (b.time || 0) - (a.time || 0);
  const five = withText.filter((r) => Number(r.rating) === 5).sort(byDateDesc);
  const rest = withText
    .filter((r) => Number(r.rating) !== 5)
    .sort((a, b) => {
      const ra = Number(a.rating) || 0;
      const rb = Number(b.rating) || 0;
      if (rb !== ra) return rb - ra;
      return byDateDesc(a, b);
    });
  return [...five, ...rest];
}

async function fetchPlaceReviewsFromGoogle(placeId, apiKey) {
  // Legacy Place Details supports reviews_sort=newest (latest first from Google)
  const params = new URLSearchParams({
    place_id: placeId,
    fields: 'name,rating,user_ratings_total,reviews',
    reviews_sort: 'newest',
    language: 'en',
    key: apiKey,
  });
  const url = `https://maps.googleapis.com/maps/api/place/details/json?${params}`;
  const resp = await fetch(url);
  const json = await resp.json();
  if (json.status !== 'OK' && json.status !== 'ZERO_RESULTS') {
    const err = new Error(json.error_message || `Places API status: ${json.status}`);
    err.code = json.status;
    throw err;
  }
  const result = json.result || {};
  const reviews = (result.reviews || []).map((r) => ({
    authorName: r.author_name || 'Google reviewer',
    rating: Number(r.rating) || 0,
    text: r.text || '',
    time: Number(r.time) || 0, // unix seconds
    relativeTime: r.relative_time_description || '',
    language: r.language || '',
    profilePhotoUrl: r.profile_photo_url || '',
  }));
  return {
    name: result.name || null,
    rating: result.rating ?? null,
    userRatingsTotal: result.user_ratings_total ?? null,
    reviews: sortReviewsFiveStarFirst(reviews),
    source: 'google-places',
    fetchedAt: new Date().toISOString(),
  };
}

function reviewsCors(res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.set('Cache-Control', 'public, max-age=300, s-maxage=300');
}

exports.googleReviews = onRequest(
  {
    cors: true,
    invoker: 'public',
  },
  async (req, res) => {
    reviewsCors(res);
    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const apiKey =
      googlePlacesApiKey.value() || process.env.GOOGLE_PLACES_API_KEY || '';
    const placeId =
      (req.query && (req.query.placeId || req.query.place_id)) ||
      googlePlaceId.value() ||
      process.env.GOOGLE_PLACE_ID ||
      'ChIJX6sDqiVxj0gR9MQnrSXXgrk';

    if (!apiKey) {
      res.status(503).json({
        error:
          'Google Places API key not configured. Set GOOGLE_PLACES_API_KEY in functions/.env and redeploy functions.',
        reviews: [],
        source: 'unconfigured',
      });
      return;
    }

    const cacheKey = `${placeId}`;
    if (
      reviewsCache.payload &&
      reviewsCache.key === cacheKey &&
      Date.now() < reviewsCache.expires
    ) {
      res.status(200).json({ ...reviewsCache.payload, cached: true, limit: 6 });
      return;
    }

    try {
      const payload = await fetchPlaceReviewsFromGoogle(placeId, apiKey);
      reviewsCache.key = cacheKey;
      reviewsCache.expires = Date.now() + REVIEWS_CACHE_MS;
      reviewsCache.payload = payload;
      res.status(200).json({ ...payload, cached: false, limit: 6 });
    } catch (err) {
      console.error('googleReviews error:', err);
      res.status(502).json({
        error: err.message || 'Failed to fetch Google reviews',
        code: err.code || null,
        reviews: [],
        source: 'error',
      });
    }
  }
);
