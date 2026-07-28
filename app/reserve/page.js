'use client';

import { useEffect } from 'react';

/** Legacy route → single-page section */
export default function ReserveRedirect() {
  useEffect(() => {
    window.location.replace('/#reserve');
  }, []);

  return (
    <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clr-text-muted)' }}>
      Opening reservations…
    </div>
  );
}
