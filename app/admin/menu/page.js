'use client';

import { getAllMenuItems } from '@/lib/menuData';
import styles from '../admin.module.css';

export default function AdminMenuPage() {
  const items = getAllMenuItems();

  return (
    <>
      <div className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Menu Manager</h1>
        <button className="btn btn-primary btn-sm">+ Add New Item</button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Featured</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.slice(0, 10).map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.name}</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>{item.description.substring(0, 40)}...</div>
                </td>
                <td>£{item.price.toFixed(2)}</td>
                <td>
                  {item.available
                    ? <span className={`${styles.statusBadge} ${styles['status-confirmed']}`}>Available</span>
                    : <span className={`${styles.statusBadge} ${styles['status-cancelled']}`}>Sold Out</span>
                  }
                </td>
                <td>{item.featured ? 'Yes' : '-'}</td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn btn-outline btn-sm" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', marginRight: '0.5rem' }}>Edit</button>
                  <button className="btn btn-outline btn-sm" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', color: 'var(--clr-red-500)', borderColor: 'rgba(239,68,68,0.2)' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ padding: '1rem 1.5rem', textAlign: 'center', color: 'var(--clr-text-muted)', fontSize: '0.875rem' }}>
          Showing 10 of {items.length} items (Mock View)
        </div>
      </div>
    </>
  );
}
