# TODO: After Firebase Blaze upgrade — live Google reviews

**Deploy order reminder (always):** see `DEPLOY.md`  
1. Update `development` → 2. Merge to `main` → 3. Deploy staging + production → 4. Functions (this file) when Blaze is on.

**Why this exists:** Functions deploy failed because project `inverness-cafe-app` was on the free Spark plan. Artifact Registry / Cloud Build require **Blaze (pay-as-you-go)**. Hosting was deployed without the `googleReviews` function.

**Do not forget:** the Places API key lives only in local `functions/.env` (gitignored). It is **not** live on Google Cloud until functions deploy succeeds.

---

## Checklist (run in order)

### 1. Upgrade billing
- [ ] Open https://console.firebase.google.com/project/inverness-cafe-app/usage/details
- [ ] Upgrade project **inverness-cafe-app** to **Blaze**
- [ ] Confirm billing account is attached

### 2. Confirm secrets (local, never commit)
- [ ] Open `functions/.env` (gitignored)
- [ ] Confirm these lines exist (values present, not empty):
  - `GOOGLE_PLACES_API_KEY=...`
  - `GOOGLE_PLACE_ID=ChIJX6sDqiVxj0gR9MQnrSXXgrk`
- [ ] Confirm key is **not** in any `NEXT_PUBLIC_*` var or client code
- [ ] Optional but recommended: in Google Cloud Console, restrict the key to **Places API** only

### 3. Enable Google Cloud APIs (if not auto-enabled on deploy)
- [ ] Places API (legacy Place Details / Maps Places) for the Cloud project
- [ ] Cloud Functions, Cloud Build, Artifact Registry (Firebase usually enables these on first Blaze deploy)

### 4. Deploy Cloud Functions
```bash
npm run deploy:functions
```
Expect functions including:
- `createPayment`
- `paymentConfig`
- `googleReviews`  ← required for live reviews

### 5. Confirm hosting rewrite (already in `firebase.json`)
- [ ] `/api/googleReviews` → function `googleReviews` (staging + production targets)
- [ ] If hosting was deployed before the rewrite existed, redeploy hosting once:
```bash
npm run deploy:production
```

### 6. Verify live
- [ ] Open: `https://invernesscafe.dinego.co.uk/api/googleReviews`
  - Expect JSON with `reviews`, `rating`, `source: "google-places"`
  - **Must not** return the API key in the body
- [ ] Open homepage / about → **Google Reviews** section
  - Should show live reviews (5★ first, then rating, then date)
  - Subtitle may say “updated live”
- [ ] Hard-refresh if CDN caches old JS

### 7. Optional full deploy later
```bash
npm run deploy:all
```
(builds site + hosting:production + functions)

---

## Quick reference

| Item | Value / location |
|------|------------------|
| Function name | `googleReviews` |
| Public URL path | `/api/googleReviews` |
| Server secret file | `functions/.env` only |
| Place ID | `ChIJX6sDqiVxj0gR9MQnrSXXgrk` |
| Sort rules | 5★ first (newest), then rating ↓, then date ↓ |
| Setup doc | `GOOGLE_REVIEWS_SETUP.md` |
| Fallback UI | Static testimonials in `lib/restaurants/inverness-cafe.js` until API works |

## Done when
- [ ] `npm run deploy:functions` succeeds on Blaze
- [ ] `/api/googleReviews` returns live Google data
- [ ] Site review cards update without relying only on static fallback
- [ ] This file can be checked off / archived
