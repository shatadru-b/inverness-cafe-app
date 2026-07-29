/**
 * Public Square Web Payments config (safe for the browser).
 * Set these in .env.local / Firebase Hosting env / build env:
 *
 *   NEXT_PUBLIC_SQUARE_APPLICATION_ID=sandbox-sq0idb-...
 *   NEXT_PUBLIC_SQUARE_LOCATION_ID=L...
 *   NEXT_PUBLIC_SQUARE_ENVIRONMENT=sandbox   // or production
 *   NEXT_PUBLIC_PAYMENT_API_URL=             // optional override; default uses Hosting rewrite
 */

export function getSquarePublicConfig() {
  const applicationId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID || '';
  const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || '';
  const environment = (process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT || 'sandbox').toLowerCase();
  const paymentApiUrl =
    process.env.NEXT_PUBLIC_PAYMENT_API_URL ||
    // Same-origin rewrite when Functions + Hosting are deployed together
    '/api/createPayment';

  return {
    applicationId,
    locationId,
    environment,
    paymentApiUrl,
    isConfigured: Boolean(applicationId && locationId),
    sdkUrl:
      environment === 'production'
        ? 'https://web.squarecdn.com/v1/square.js'
        : 'https://sandbox.web.squarecdn.com/v1/square.js',
  };
}
