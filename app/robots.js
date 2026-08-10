import { RESERVATIONS_ENABLED } from '@/lib/features';
import { getActiveRestaurant } from '@/lib/restaurants';

export const dynamic = 'force-static';

export default function robots() {
  const restaurant = getActiveRestaurant();
  const base = restaurant.siteUrl.replace(/\/$/, '');
  const disallow = ['/admin/', '/cart/', '/coming-soon/'];
  if (!RESERVATIONS_ENABLED) disallow.push('/reserve/');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
