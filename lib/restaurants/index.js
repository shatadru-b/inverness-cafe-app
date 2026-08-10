/**
 * Restaurant registry.
 * Always loads Inverness Cafe today. Add another config + switch ACTIVE_RESTAURANT_ID later.
 * No multi-tenant routing yet.
 */

import { RESERVATIONS_ENABLED } from '@/lib/features';
import { invernessCafe } from './inverness-cafe';

/** @type {Record<string, typeof invernessCafe>} */
export const restaurants = {
  [invernessCafe.id]: invernessCafe,
  // [otherRestaurant.id]: otherRestaurant,
};

/** Currently active restaurant — single-tenant default */
export const ACTIVE_RESTAURANT_ID = 'inverness-cafe';

export function getActiveRestaurant() {
  return restaurants[ACTIVE_RESTAURANT_ID] || invernessCafe;
}

export function getRestaurant(id) {
  return restaurants[id] || getActiveRestaurant();
}

/** Absolute URL helper. Page paths get a trailing slash; asset paths do not. */
export function absoluteUrl(path = '/', restaurant = getActiveRestaurant()) {
  const base = (restaurant.siteUrl || 'https://invernesscafe.dinego.co.uk').replace(/\/$/, '');
  if (!path || path === '/') return `${base}/`;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  // Static assets (images, icons) — no trailing slash
  if (/\.[a-zA-Z0-9]+$/.test(normalized)) return `${base}${normalized}`;
  // Prefer trailing slash to match next.config + Firebase cleanUrls
  const withSlash = normalized.endsWith('/') ? normalized : `${normalized}/`;
  return `${base}${withSlash}`;
}

/**
 * Next.js metadata from restaurant config.
 * @param {object} [page] Optional page overrides: { title, description, path, noIndex, ogImage }
 */
export function buildMetadata(restaurant = getActiveRestaurant(), page = {}) {
  const { seo } = restaurant;
  const path = page.path ?? '/';
  const canonical = absoluteUrl(path, restaurant);
  const title = page.title
    ? page.title
    : {
        default: seo.titleDefault,
        template: seo.titleTemplate,
      };
  const description = page.description || seo.description;
  const ogImage = page.ogImage || seo.openGraph?.images?.[0]?.url || restaurant.images.hero;
  const ogImageAbs = ogImage.startsWith('http') ? ogImage : absoluteUrl(ogImage, restaurant);

  /** @type {import('next').Metadata} */
  const meta = {
    metadataBase: new URL(restaurant.siteUrl.replace(/\/$/, '') + '/'),
    title,
    description,
    keywords: seo.keywords,
    authors: [{ name: restaurant.name }],
    icons: {
      icon: [
        { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icon.png', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
    alternates: {
      canonical,
    },
    openGraph: {
      // Match resolved document title (template applied by Next for string titles)
      title:
        typeof title === 'string'
          ? `${title} | ${restaurant.name}`
          : seo.openGraph.title || seo.titleDefault,
      description,
      type: seo.openGraph.type || 'website',
      locale: seo.openGraph.locale || restaurant.locale || 'en_GB',
      siteName: seo.openGraph.siteName || restaurant.name,
      url: canonical,
      images: [
        {
          url: ogImageAbs,
          alt: `${restaurant.name} – Italian restaurant on Academy Street, Inverness`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title:
        typeof title === 'string'
          ? `${title} | ${restaurant.name}`
          : seo.titleDefault,
      description,
      images: [ogImageAbs],
    },
  };

  if (page.noIndex) {
    meta.robots = { index: false, follow: false };
  }

  return meta;
}

/** schema.org Restaurant JSON-LD — only genuine business fields */
export function buildJsonLd(restaurant = getActiveRestaurant()) {
  const site = absoluteUrl('/', restaurant);
  const menuUrl = absoluteUrl('/menu/', restaurant);
  const hero = restaurant.images.hero.startsWith('http')
    ? restaurant.images.hero
    : `${restaurant.siteUrl.replace(/\/$/, '')}${restaurant.images.hero}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.name,
    url: site,
    image: hero,
    telephone: restaurant.phone.e164 || restaurant.phone.display,
    email: restaurant.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: restaurant.address.street,
      addressLocality: restaurant.address.locality,
      addressRegion: restaurant.address.region,
      postalCode: restaurant.address.postalCode,
      addressCountry: restaurant.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: restaurant.geo.latitude,
      longitude: restaurant.geo.longitude,
    },
    hasMap: restaurant.maps.url,
    servesCuisine: restaurant.servesCuisine,
    priceRange: restaurant.priceRange,
    openingHoursSpecification: restaurant.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    hasMenu: {
      '@type': 'Menu',
      name: 'Main Menu',
      url: menuUrl,
    },
  };
}

/** BreadcrumbList JSON-LD for SEO landing pages */
export function buildBreadcrumbJsonLd(items, restaurant = getActiveRestaurant()) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : absoluteUrl(item.url, restaurant),
    })),
  };
}

/** Public indexable paths for sitemap (trailing slash) */
export const PUBLIC_SITEMAP_PATHS = [
  '/',
  '/menu/',
  '/menu/pizza/',
  '/menu/pasta/',
  '/menu/burgers/',
  '/takeaway/',
  '/about/',
  '/contact/',
  ...(RESERVATIONS_ENABLED ? ['/reserve/'] : []),
];

export { invernessCafe };
