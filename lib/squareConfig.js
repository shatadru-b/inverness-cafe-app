/**
 * Public Square Web Payments config (safe for the browser).
 * Values come from the active restaurant config (env-backed today).
 */

import { getActiveRestaurant } from '@/lib/restaurants';

export function getSquarePublicConfig() {
  const { square } = getActiveRestaurant();
  const applicationId = square.applicationId || '';
  const locationId = square.locationId || '';
  const environment = (square.environment || 'sandbox').toLowerCase();
  const paymentApiUrl = square.paymentApiUrl || '/api/createPayment';

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
