'use client';

import styles from '../admin.module.css';

export default function AdminReservationsPage() {
  return (
    <>
      <div className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Reservations Management</h1>
        <button className="btn btn-primary btn-sm">+ New Booking</button>
      </div>

      <div className={styles.tableContainer}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--clr-border)', display: 'flex', gap: '1rem' }}>
          <input 
            type="date" 
            className="form-input" 
            style={{ width: '200px', padding: '0.5rem 1rem' }} 
            defaultValue={new Date().toISOString().split('T')[0]}
          />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search by name or phone..." 
            style={{ flex: 1, padding: '0.5rem 1rem' }} 
          />
        </div>

        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Time</th>
              <th>Guest Info</th>
              <th>Party Size</th>
              <th>Special Requests</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>18:30</strong>
              </td>
              <td>
                <strong>John Smith</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>07700 900111</div>
              </td>
              <td>4 guests</td>
              <td><span style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)' }}>Window seat if possible</span></td>
              <td><span className={`${styles.statusBadge} ${styles['status-confirmed']}`}>Confirmed</span></td>
              <td style={{ textAlign: 'right' }}>
                <button className="btn btn-outline btn-sm" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', marginRight: '0.5rem' }}>Edit</button>
                <button className="btn btn-outline btn-sm" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', color: 'var(--clr-red-500)', borderColor: 'rgba(239,68,68,0.2)' }}>Cancel</button>
              </td>
            </tr>
            <tr>
              <td>
                <strong>19:00</strong>
              </td>
              <td>
                <strong>Emma Wilson</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>07700 900222</div>
              </td>
              <td>2 guests</td>
              <td><span style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)' }}>-</span></td>
              <td><span className={`${styles.statusBadge} ${styles['status-pending']}`}>Pending</span></td>
              <td style={{ textAlign: 'right' }}>
                <button className="btn btn-outline btn-sm" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', color: '#4ade80', borderColor: 'rgba(34,197,94,0.2)' }}>Confirm</button>
              </td>
            </tr>
            <tr>
              <td>
                <strong>20:00</strong>
              </td>
              <td>
                <strong>David Brown</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>07700 900333</div>
              </td>
              <td>6 guests</td>
              <td><span style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)' }}>Birthday celebration</span></td>
              <td><span className={`${styles.statusBadge} ${styles['status-confirmed']}`}>Confirmed</span></td>
              <td style={{ textAlign: 'right' }}>
                <button className="btn btn-outline btn-sm" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', marginRight: '0.5rem' }}>Edit</button>
                <button className="btn btn-outline btn-sm" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', color: 'var(--clr-red-500)', borderColor: 'rgba(239,68,68,0.2)' }}>Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
