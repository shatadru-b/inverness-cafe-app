/**
 * Restaurant registry.
 * Always loads Inverness Cafe today. Add another config + switch ACTIVE_RESTAURANT_ID later.
 * No multi-tenant routing yet.
 */

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

/** Next.js metadata from restaurant config */
export function buildMetadata(restaurant = getActiveRestaurant()) {
  const { seo } = restaurant;
  return {
    title: {
      default: seo.titleDefault,
      template: seo.titleTemplate,
    },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: restaurant.name }],
    icons: {
      icon: [
        { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icon.png', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
    openGraph: {
      ...seo.openGraph,
    },
  };
}

/** schema.org Restaurant JSON-LD */
export function buildJsonLd(restaurant = getActiveRestaurant()) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.name,
    image: restaurant.images.hero,
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
      url: '/#menu',
    },
  };
}

export { invernessCafe };
