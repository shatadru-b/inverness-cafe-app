/**
 * Menu data facade — loads from the active restaurant config.
 * Existing imports (`@/lib/menuData`) keep working unchanged.
 */

import { getActiveRestaurant } from '@/lib/restaurants';

const menu = getActiveRestaurant().menu;

export const defaultMenuData = menu.data;
export const PIZZA_TOPPINGS = menu.PIZZA_TOPPINGS;
export const PASTA_TYPES = menu.PASTA_TYPES;
export const TOPPING_PRICE = menu.TOPPING_PRICE;

export function getAllMenuItems() {
  const items = [];
  Object.values(defaultMenuData).forEach((category) => {
    if (category.items) {
      items.push(...category.items.filter((i) => !i.isOption));
    }
    if (category.subcategories) {
      category.subcategories.forEach((sub) => {
        items.push(...sub.items.filter((i) => !i.isOption));
      });
    }
  });
  return items;
}
