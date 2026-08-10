# Live Google reviews setup

The site loads reviews dynamically from Google Places (newest first from Google), then **re-sorts** them:

1. **5★ first** (newest among 5★)
2. Then **rating** (high → low)
3. Then **date** (newest first)

## 1. Enable Google Places API

1. Open [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable **Places API** (legacy Place Details is used for `reviews_sort=newest`)
4. Create an **API key**
5. Restrict the key (recommended):
   - API restriction: Places API only
   - Or IP restriction for Cloud Functions (if fixed egress)

## 2. Configure the Cloud Function (server-only secret)

**Never** put the Places API key in:

- client/Next code
- `NEXT_PUBLIC_*` env vars
- committed files (repo, docs, screenshots)

Put it only in **`functions/.env`** (already gitignored):

```bash
GOOGLE_PLACES_API_KEY=your_secret_key_here
GOOGLE_PLACE_ID=ChIJX6sDqiVxj0gR9MQnrSXXgrk
```

`GOOGLE_PLACE_ID` defaults to Inverness Cafe & Pizzeria if omitted.

Firebase loads `functions/.env` for `defineString` params on deploy — the browser only talks to `/api/googleReviews` and never receives the key.

## 3. Deploy functions + hosting

```bash
npm run deploy:functions
# or full:
npm run deploy:all
```

Hosting rewrites `/api/googleReviews` → `googleReviews` function (staging + production).

## 4. Behaviour

| Situation | Result |
|-----------|--------|
| API key set, function deployed | Live reviews every page load (5‑min server cache) |
| API down / no key | Static fallback testimonials from restaurant config |
| Client open for a while | Client re-fetches every 15 minutes |

## Endpoint

`GET /api/googleReviews?placeId=ChIJ...`

Response shape:

```json
{
  "rating": 5,
  "userRatingsTotal": 3,
  "reviews": [
    {
      "authorName": "…",
      "rating": 5,
      "text": "…",
      "time": 1710000000,
      "relativeTime": "2 weeks ago"
    }
  ],
  "source": "google-places",
  "limit": 6
}
```
