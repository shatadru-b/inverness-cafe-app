'use client';

import styles from '../admin.module.css';

export default function AdminOrdersPage() {
  return (
    <>
      <div className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Orders Management</h1>
      </div>

      <div className={styles.tableContainer}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--clr-border)', display: 'flex', gap: '1rem' }}>
          <select className="form-input" style={{ width: '200px', padding: '0.5rem 1rem' }}>
            <option value="today">Today's Orders</option>
            <option value="active">Active Orders</option>
            <option value="completed">Completed</option>
            <option value="all">All Orders</option>
          </select>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search by ID or customer..." 
            style={{ flex: 1, padding: '0.5rem 1rem' }} 
          />
        </div>

        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Order ID / Time</th>
              <th>Customer</th>
              <th>Type / Items</th>
              <th>Total</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>#ORD-092</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>18:45 (5 mins ago)</div>
              </td>
              <td>
                <strong>Sarah Jenkins</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>07700 900123</div>
              </td>
              <td>
                <span style={{ fontSize: '0.875rem' }}>🚗 Delivery</span>
                <div style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>2x Margherita, 1x Fries</div>
              </td>
              <td>£24.50</td>
              <td><span className={`${styles.statusBadge} ${styles['status-pending']}`}>Preparing</span></td>
              <td style={{ textAlign: 'right' }}>
                <button className="btn btn-outline btn-sm" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>Mark Ready</button>
              </td>
            </tr>
            <tr>
              <td>
                <strong>#ORD-091</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>18:20 (30 mins ago)</div>
              </td>
              <td>
                <strong>Mike Thomas</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>07700 900456</div>
              </td>
              <td>
                <span style={{ fontSize: '0.875rem' }}>🏪 Collection</span>
                <div style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>1x Cheese Burger Combo</div>
              </td>
              <td>£12.95</td>
              <td><span className={`${styles.statusBadge} ${styles['status-confirmed']}`}>Ready</span></td>
              <td style={{ textAlign: 'right' }}>
                <button className="btn btn-outline btn-sm" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>Complete</button>
              </td>
            </tr>
            <tr>
              <td>
                <strong>#ORD-090</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>17:15</div>
              </td>
              <td>
                <strong>Laura White</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>07700 900789</div>
              </td>
              <td>
                <span style={{ fontSize: '0.875rem' }}>🚗 Delivery</span>
                <div style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>3x Carbonara, 2x Garlic Bread</div>
              </td>
              <td>£45.00</td>
              <td><span className={`${styles.statusBadge} ${styles['status-confirmed']}`} style={{ background: 'transparent', borderColor: 'var(--clr-text-muted)', color: 'var(--clr-text-muted)' }}>Delivered</span></td>
              <td style={{ textAlign: 'right' }}>
                <button className="btn btn-outline btn-sm" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
