'use client';

import { useState } from 'react';
import { defaultMenuData, getAllMenuItems } from '@/lib/menuData';
import styles from '../admin.module.css';

export default function AdminMenuPage() {
  const [items, setItems] = useState(getAllMenuItems());
  const [filter, setFilter] = useState('all');

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(i => {
        // Simple logic since items don't have explicit category fields in flat array, 
        // we'd normally filter by a 'category' field in Firestore
        return true; 
      });

  return (
    <>
      <div className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Menu Manager</h1>
        <button className="btn btn-primary btn-sm">+ Add New Item</button>
      </div>

      <div className={styles.tableContainer}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--clr-border)', display: 'flex', gap: '1rem' }}>
          <select 
            className="form-input" 
            style={{ width: '200px', padding: '0.5rem 1rem' }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="pizza">Pizza</option>
            <option value="pasta">Pasta</option>
            <option value="burgers">Burgers</option>
            <option value="kitchen">Kitchen Food</option>
            <option value="sides">Sides</option>
          </select>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search items..." 
            style={{ flex: 1, padding: '0.5rem 1rem' }} 
          />
        </div>

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
            {filteredItems.slice(0, 10).map((item) => (
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
                <td>{item.featured ? '⭐' : '-'}</td>
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
