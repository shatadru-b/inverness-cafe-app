# Square card payments (on your site)

Customers browse the menu and pay **on your Firebase site**. They never visit Square Online.

## Architecture

1. Cart page loads **Square Web Payments SDK** (card form on your page)
2. Card is tokenized in the browser
3. Firebase **Cloud Function** `createPayment` charges the card with Square
4. Success screen stays on your site

## Prerequisites

1. **Square Developer account** — https://developer.squareup.com  
2. **Firebase Blaze plan** (pay-as-you-go) — required for Cloud Functions outbound calls  
   - Free monthly quota usually covers small cafes  
   - https://console.firebase.google.com/project/inverness-cafe-app/usage/details  
3. Enable APIs if prompted: Cloud Functions, Cloud Build, Artifact Registry

## Step 1 — Square Sandbox credentials

1. Open [Square Developer Dashboard](https://developer.squareup.com/apps)
2. Create an application (or open existing)
3. Open **Sandbox** credentials:
   - **Sandbox Application ID**
   - **Sandbox Access Token**
4. **Locations** → copy **Sandbox Location ID**

## Step 2 — Frontend env (this app)

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SQUARE_APPLICATION_ID=sandbox-sq0idb-...
NEXT_PUBLIC_SQUARE_LOCATION_ID=L...
NEXT_PUBLIC_SQUARE_ENVIRONMENT=sandbox
```

Rebuild hosting after changing env vars:

```bash
npm run build
npx firebase-tools deploy --only hosting --project inverness-cafe-app
```

## Step 3 — Backend secrets (Cloud Function)

```bash
# Set access token as a secret
echo -n "YOUR_SANDBOX_ACCESS_TOKEN" | npx firebase-tools functions:secrets:set SQUARE_ACCESS_TOKEN --project inverness-cafe-app

# Set location + environment as params (or .env in functions)
npx firebase-tools functions:config:set square.location_id="YOUR_LOCATION_ID" square.environment="sandbox" --project inverness-cafe-app
```

With Functions v2 params, you can also set:

```bash
# Optional: create functions/.env (do NOT commit)
SQUARE_LOCATION_ID=L...
SQUARE_ENVIRONMENT=sandbox
```

Deploy functions:

```bash
cd functions && npm install && cd ..
npx firebase-tools deploy --only functions --project inverness-cafe-app
```

Deploy both:

```bash
npm run deploy:all
```

## Step 4 — Test

1. Open https://inverness-cafe-app.web.app/cart/
2. Add items, enter name + phone
3. Sandbox test card:
   - Number: `4111 1111 1111 1111`
   - Expiry: any future date
   - CVV: any 3 digits
   - Postal: any
4. Payment appears in Square **Sandbox** dashboard

## Go live (production)

1. In Square Developer Dashboard → **Production** credentials  
2. Update:
   - `NEXT_PUBLIC_SQUARE_APPLICATION_ID` (production)
   - `NEXT_PUBLIC_SQUARE_LOCATION_ID` (production location)
   - `NEXT_PUBLIC_SQUARE_ENVIRONMENT=production`
   - `SQUARE_ACCESS_TOKEN` secret (production token)
3. Redeploy hosting + functions

## Security notes

- **Never** put the Access Token in the frontend or git  
- Only Application ID + Location ID are public  
- Payment amount is re-validated on the server  

## WhatsApp orders

Still available as a fallback if card payment is not configured yet.
