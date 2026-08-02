'use client';

import { createContext, useContext } from 'react';
import { getActiveRestaurant } from '@/lib/restaurants';

const RestaurantContext = createContext(null);

/**
 * Lightweight provider: one restaurant config for the whole app.
 * Defaults to the active restaurant (Inverness Cafe).
 */
export function RestaurantProvider({ children, restaurant }) {
  const value = restaurant || getActiveRestaurant();
  return (
    <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const ctx = useContext(RestaurantContext);
  if (!ctx) {
    // Fallback for safety outside provider (e.g. tests)
    return getActiveRestaurant();
  }
  return ctx;
}
