'use client';

import styles from '../admin.module.css';

export default function AdminDashboard() {
  return (
    <>
      <div className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Dashboard Overview</h1>
        <div style={{ color: 'var(--clr-text-muted)' }}>{new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Today's Orders</div>
          <div className={styles.statValue}>14</div>
          <div style={{ color: 'var(--clr-green-500)', fontSize: '0.875rem', marginTop: '0.5rem' }}>↑ 12% vs yesterday</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Pending Reservations</div>
          <div className={styles.statValue}>5</div>
          <div style={{ color: 'var(--clr-text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>For tonight</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Active Menu Items</div>
          <div className={styles.statValue}>32</div>
          <div style={{ color: 'var(--clr-text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Across 5 categories</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Revenue (Today)</div>
          <div className={styles.statValue}>£342.50</div>
          <div style={{ color: 'var(--clr-green-500)', fontSize: '0.875rem', marginTop: '0.5rem' }}>↑ 5% vs yesterday</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.25rem', marginBottom: '1rem' }}>Recent Orders</h2>
          <div className={styles.tableContainer}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Type</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD-092</td>
                  <td>Delivery</td>
                  <td>£24.50</td>
                  <td><span className={`${styles.statusBadge} ${styles['status-pending']}`}>Preparing</span></td>
                </tr>
                <tr>
                  <td>#ORD-091</td>
                  <td>Collection</td>
                  <td>£12.95</td>
                  <td><span className={`${styles.statusBadge} ${styles['status-confirmed']}`}>Ready</span></td>
                </tr>
                <tr>
                  <td>#ORD-090</td>
                  <td>Delivery</td>
                  <td>£45.00</td>
                  <td><span className={`${styles.statusBadge} ${styles['status-confirmed']}`}>Delivered</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div>
          <h2 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.25rem', marginBottom: '1rem' }}>Upcoming Reservations</h2>
          <div className={styles.tableContainer}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Name</th>
                  <th>Party</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>18:30</td>
                  <td>John Smith</td>
                  <td>4</td>
                  <td><span className={`${styles.statusBadge} ${styles['status-confirmed']}`}>Confirmed</span></td>
                </tr>
                <tr>
                  <td>19:00</td>
                  <td>Emma Wilson</td>
                  <td>2</td>
                  <td><span className={`${styles.statusBadge} ${styles['status-pending']}`}>Pending</span></td>
                </tr>
                <tr>
                  <td>20:00</td>
                  <td>David Brown</td>
                  <td>6</td>
                  <td><span className={`${styles.statusBadge} ${styles['status-confirmed']}`}>Confirmed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
