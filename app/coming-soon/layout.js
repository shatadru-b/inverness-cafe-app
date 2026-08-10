import { buildMetadata } from '@/lib/restaurants';

export const metadata = buildMetadata(undefined, {
  title: 'Coming Soon',
  description: 'Online card payments coming soon.',
  path: '/coming-soon/',
  noIndex: true,
});

export default function ComingSoonLayout({ children }) {
  return children;
}
