'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/CartContext';

export default function CartFloat() {
  const pathname = usePathname();
  const { cartCount } = useCart();

  if (pathname?.startsWith('/admin')) return null;
  // Already on cart — no need for a second entry point
  if (pathname === '/cart' || pathname === '/cart/') return null;

  return (
    <Link
      href="/cart"
      className="cart-float"
      aria-label={cartCount > 0 ? `Cart, ${cartCount} items` : 'Cart'}
      title="View cart"
    >
      <svg
        viewBox="0 0 24 24"
        width="28"
        height="28"
        aria-hidden="true"
        focusable="false"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1" fill="currentColor" stroke="none" />
        <circle cx="20" cy="21" r="1" fill="currentColor" stroke="none" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      {cartCount > 0 && (
        <span className="cart-float-badge">{cartCount > 99 ? '99+' : cartCount}</span>
      )}
    </Link>
  );
}
