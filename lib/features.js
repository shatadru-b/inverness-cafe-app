/**
 * Feature flags — flip one value to re-enable a dormant UI feature.
 *
 * Reservations: currently OFF in the live UI (not deleted).
 * Live code: components/sections/ReserveSection.js, app/reserve/page.js
 * Archive:   archive/reservation-section.html  (restore checklist + HTML snapshot)
 *
 * To re-enable in one step:
 *   RESERVATIONS_ENABLED = true
 * Then re-check archive/reservation-section.html if anything was removed elsewhere.
 */
export const RESERVATIONS_ENABLED = false;
