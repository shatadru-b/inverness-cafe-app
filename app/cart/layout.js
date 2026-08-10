import { buildMetadata } from '@/lib/restaurants';

export const metadata = buildMetadata(undefined, {
  title: 'Your Cart',
  description: 'Review your order at Inverness Cafe & Pizzeria.',
  path: '/cart/',
  noIndex: true,
});

export default function CartLayout({ children }) {
  return children;
}
