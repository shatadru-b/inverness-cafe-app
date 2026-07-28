'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // If on login page, don't show the sidebar
  if (pathname === '/admin') {
    return <div className={styles.adminBase}>{children}</div>;
  }

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.adminSidebar}>
        <div className={styles.sidebarHeader}>
          <div className="nav-brand-icon" style={{ width: 40, height: 40, fontSize: '1.25rem' }}>🍕</div>
          <div>
            <div style={{ fontFamily: 'var(--ff-heading)', fontWeight: 700, lineHeight: 1.1 }}>Inverness</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--clr-amber-400)' }}>Admin Panel</div>
          </div>
        </div>
        
        <nav className={styles.sidebarNav}>
          <Link href="/admin/dashboard" className={`${styles.navItem} ${pathname === '/admin/dashboard' ? styles.active : ''}`}>
            📊 Dashboard
          </Link>
          <Link href="/admin/orders" className={`${styles.navItem} ${pathname === '/admin/orders' ? styles.active : ''}`}>
            🛒 Orders
          </Link>
          <Link href="/admin/reservations" className={`${styles.navItem} ${pathname === '/admin/reservations' ? styles.active : ''}`}>
            📅 Reservations
          </Link>
          <Link href="/admin/menu" className={`${styles.navItem} ${pathname === '/admin/menu' ? styles.active : ''}`}>
            🍔 Menu Manager
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/" className="btn btn-outline btn-sm" style={{ width: '100%' }}>View Site</Link>
          <button className="btn btn-outline btn-sm" style={{ width: '100%', marginTop: '0.5rem', color: 'var(--clr-red-500)', borderColor: 'rgba(239,68,68,0.2)' }}>Logout</button>
        </div>
      </aside>

      <main className={styles.adminMain}>
        {children}
      </main>
    </div>
  );
}
