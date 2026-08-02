'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getActiveRestaurant } from '@/lib/restaurants';

const CartContext = createContext();

/** Unique cart line key so same dish with different options is separate */
export function buildCartKey(item) {
  if (item.cartKey) return item.cartKey;
  const parts = [item.id];
  if (item.pastaType) parts.push(`pasta:${item.pastaType}`);
  if (item.toppings?.length) {
    const tops = [...item.toppings].map((t) => t.id || t).sort().join('+');
    parts.push(`tops:${tops}`);
  }
  return parts.join('|');
}

export function formatCartItemOptions(item) {
  const bits = [];
  if (item.pastaTypeName) bits.push(item.pastaTypeName);
  if (item.toppings?.length) {
    bits.push(`+ ${item.toppings.map((t) => t.name).join(', ')}`);
  }
  return bits.join(' · ');
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const key = getActiveRestaurant().cartStorageKey;
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load cart from localStorage:', e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(getActiveRestaurant().cartStorageKey, JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = useCallback((item) => {
    const cartKey = buildCartKey(item);
    const unitPrice = Number(item.price) || 0;
    setCartItems((prev) => {
      const existing = prev.find((i) => (i.cartKey || buildCartKey(i)) === cartKey);
      if (existing) {
        return prev.map((i) =>
          (i.cartKey || buildCartKey(i)) === cartKey
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [
        ...prev,
        {
          ...item,
          cartKey,
          price: unitPrice,
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((cartKey) => {
    setCartItems((prev) => prev.filter((i) => (i.cartKey || i.id) !== cartKey));
  }, []);

  const updateQuantity = useCallback((cartKey, quantity) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((i) => (i.cartKey || i.id) !== cartKey));
      return;
    }
    setCartItems((prev) =>
      prev.map((i) =>
        (i.cartKey || i.id) === cartKey ? { ...i, quantity } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
