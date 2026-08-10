# Deploy workflow (always follow this order)

**Canonical process — do not skip steps.**

1. **Update `development`**
   - Commit all intended changes on `development`
   - Push `development` to origin

2. **Merge into `main`**
   - Checkout `main`, pull latest
   - Merge `development` into `main` (no force-push)
   - Push `main` to origin

3. **Deploy**
   - **Staging:** `npm run deploy:staging`
   - **Production:** `npm run deploy:production`

4. **Functions** (only after Firebase **Blaze** is active)
   - See `TODO_BLAZE_GOOGLE_REVIEWS.md`
   - `npm run deploy:functions` (or `npm run deploy:all` if hosting was already built)

## Notes

- Never deploy production from uncommitted / unmerged local-only work when the team expects git as source of truth.
- Secrets stay in `functions/.env` / `.env.local` (gitignored) — never commit API keys.
- Hosting rewrites for `/api/*` need the matching Cloud Functions deployed to work live.
