import { buildMetadata } from '@/lib/restaurants';
import AdminShell from './AdminShell';

export const metadata = buildMetadata(undefined, {
  title: 'Admin',
  description: 'Admin area',
  path: '/admin/',
  noIndex: true,
});

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
