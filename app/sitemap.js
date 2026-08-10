import { absoluteUrl, getActiveRestaurant, PUBLIC_SITEMAP_PATHS } from '@/lib/restaurants';

export const dynamic = 'force-static';

export default function sitemap() {
  const restaurant = getActiveRestaurant();
  const lastModified = new Date();

  return PUBLIC_SITEMAP_PATHS.map((path) => ({
    url: absoluteUrl(path, restaurant),
    lastModified,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/menu') ? 0.9 : 0.7,
  }));
}
