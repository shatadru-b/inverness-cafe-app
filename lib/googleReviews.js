/**
 * Google reviews helpers — sort + normalize for the UI.
 *
 * Sort rule (requested):
 *  1. 5-star reviews first (newest among them)
 *  2. Then remaining by rating (desc)
 *  3. Then by date (desc)
 */

/** @typedef {{ text: string, name: string, role: string, avatar: string, rating: number, time: number }} DisplayReview */

/**
 * @param {Array<{ text?: string, authorName?: string, name?: string, rating?: number, time?: number, relativeTime?: string }>} reviews
 * @returns {DisplayReview[]}
 */
export function sortGoogleReviews(reviews = []) {
  const withText = reviews.filter((r) => (r.text || '').trim().length > 0);

  const byDateDesc = (a, b) => (b.time || 0) - (a.time || 0);
  const byRatingThenDate = (a, b) => {
    const ra = Number(a.rating) || 0;
    const rb = Number(b.rating) || 0;
    if (rb !== ra) return rb - ra;
    return byDateDesc(a, b);
  };

  const fiveStar = withText
    .filter((r) => Number(r.rating) === 5)
    .sort(byDateDesc);
  const rest = withText
    .filter((r) => Number(r.rating) !== 5)
    .sort(byRatingThenDate);

  return [...fiveStar, ...rest];
}

/**
 * Map API / fallback items into UI testimonial shape.
 * @param {object} r
 * @returns {DisplayReview}
 */
export function toDisplayReview(r) {
  const name = r.authorName || r.name || 'Google reviewer';
  const rating = Number(r.rating) || 0;
  const stars = rating > 0 ? `${rating}★` : '';
  const relative = r.relativeTime || r.relativeTimeDescription || '';
  const roleParts = ['Google Review'];
  if (stars) roleParts.push(stars);
  if (relative) roleParts.push(relative);

  return {
    text: (r.text || '').trim(),
    name,
    role: roleParts.join(' · '),
    avatar: (name.trim()[0] || 'G').toUpperCase(),
    rating,
    time: Number(r.time) || 0,
  };
}

/**
 * Full pipeline: sort then map for UI.
 * @param {object[]} reviews
 * @param {number} [limit=6]
 */
export function prepareReviewsForDisplay(reviews, limit = 6) {
  return sortGoogleReviews(reviews).slice(0, limit).map(toDisplayReview);
}

/**
 * Fallback list from restaurant config testimonials (static snapshot).
 * @param {Array<{ text: string, name: string, role?: string, avatar?: string, rating?: number, time?: number }>} testimonials
 */
export function fallbackFromConfig(testimonials = []) {
  return prepareReviewsForDisplay(
    testimonials.map((t) => ({
      text: t.text,
      authorName: t.name,
      rating: t.rating ?? (String(t.role || '').includes('5') ? 5 : 0),
      time: t.time || 0,
      relativeTime: undefined,
    }))
  );
}
